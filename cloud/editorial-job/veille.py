"""Tâche « veille » : articles d'actualité FR + AR, proposés en pull request, jamais publiés seuls.

Déroulé :
  1. clone de la branche principale ;
  2. collecte des titres de la semaine (Google News RSS) pour chaque pilier de sources.json ;
  3. Claude choisit les sujets, vérifie les faits par recherche web, rédige chaque article
     (français + arabe) et l'enregistre par l'outil `enregistrer_article` ;
  4. chaque article est contrôlé (longueur, liens internes, doublons) avant d'être écrit dans
     content/drafts/, daté sur les prochains mardis et jeudis libres ;
  5. push d'une branche veille/AAAA-MM-JJ et ouverture d'une pull request ;
  6. notification Telegram avec le lien : la publication n'a lieu qu'après fusion de la PR,
     puis par la tâche « publish » à la date de chaque article.
"""
from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import quote

import anthropic
import requests
from anthropic import beta_tool

from common import (
    clone, create_pull_request, draft_posts, free_publication_dates, mission_ids,
    next_article_number, published_posts, run, slugify, telegram, today,
)

HERE = Path(__file__).parent
CONFIG = json.loads((HERE / "sources.json").read_text(encoding="utf-8"))
MODEL = "claude-opus-5-5"


# ── 1. Collecte des titres ───────────────────────────────────────────────────

def google_news(query: str, days: int) -> list[dict]:
    url = f"https://news.google.com/rss/search?q={quote(query)}+when:{days}d&hl=fr&gl=MA&ceid=MA:fr"
    try:
        r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0 (veille éditoriale)"})
        r.raise_for_status()
        root = ET.fromstring(r.content)
    except (requests.RequestException, ET.ParseError) as e:
        print(f"[rss] {query} : {e}")
        return []
    since = datetime.now(timezone.utc) - timedelta(days=days)
    items = []
    for it in root.iter("item"):
        try:
            when = parsedate_to_datetime(it.findtext("pubDate", ""))
        except (TypeError, ValueError):
            continue
        if when < since:
            continue
        items.append({
            "titre": (it.findtext("title") or "").strip(),
            "source": (it.findtext("source") or "").strip(),
            "date": when.date().isoformat(),
            "lien": (it.findtext("link") or "").strip(),
        })
    return items[:8]


def collect_headlines() -> str:
    days = CONFIG["jours_recherche"]
    blocks, seen = [], set()
    for pilier, queries in CONFIG["piliers"].items():
        lines = []
        for q in queries:
            for it in google_news(q, days):
                key = it["titre"].lower()[:80]
                if key in seen:
                    continue
                seen.add(key)
                lines.append(f"- [{it['date']}] {it['titre']} ({it['source']}) {it['lien']}")
        if lines:
            blocks.append(f"### {pilier}\n" + "\n".join(lines[:25]))
    return "\n\n".join(blocks)


# ── 2. Contrôle et écriture des articles ─────────────────────────────────────

class Workspace:
    def __init__(self, repo: Path, max_articles: int):
        self.repo = repo
        self.max_articles = max_articles
        self.saved: list[dict] = []
        self.published = published_posts(repo)
        self.drafts = draft_posts(repo)
        self.slugs = {p["slug"] for p in self.published}
        self.all_slugs = self.slugs | {d["slug"] for d in self.drafts}
        self.missions = dict(mission_ids(repo))
        self.dates = free_publication_dates(repo, max_articles)
        self.next_num = next_article_number(repo)

    def check_links(self, body: str, lang: str) -> list[str]:
        errors = []
        for link in re.findall(r"\]\((/[^)\s]+)\)", body):
            path = link.split("#")[0]
            if path.startswith("/blog/") and path[6:] not in self.slugs:
                errors.append(f"lien {lang} vers un article non publié : {path}")
            elif path.startswith("/missions/") and path[10:] not in self.missions:
                errors.append(f"mission inconnue : {path}")
            elif path.startswith("/ar/blog/"):
                errors.append(f"lien {lang} vers une page arabe : {path} (utiliser les pages françaises ou /ar/conseil)")
        return errors

    def save(self, a: dict) -> str:
        if len(self.saved) >= self.max_articles:
            return "Nombre maximal d'articles atteint : terminez sans en enregistrer d'autre."
        title = a["titre_fr"].strip()
        slug = slugify(title)
        errors = []
        if "œ" in title or "Œ" in title:
            errors.append("le titre FR contient « œ », qui disparaît de l'adresse : reformulez")
        if not 20 <= len(title) <= 90:
            errors.append(f"titre FR de {len(title)} caractères (20 à 90 attendus)")
        if slug in self.all_slugs:
            errors.append(f"un article existe déjà avec l'adresse {slug} : choisissez un autre angle ou un autre titre")
        for key in ("description_fr", "description_ar"):
            if not 80 <= len(a[key]) <= 158:
                errors.append(f"{key} de {len(a[key])} caractères (80 à 158 attendus)")
        words_fr = len(re.findall(r"\w+", a["corps_fr"]))
        words_ar = len(re.findall(r"\w+", a["corps_ar"]))
        if words_fr < 700:
            errors.append(f"corps FR de {words_fr} mots (700 au minimum)")
        if words_ar < 450:
            errors.append(f"corps AR de {words_ar} mots (450 au minimum)")
        if len(a["sources"]) < 2:
            errors.append("au moins deux sources vérifiées sont exigées")
        if a["mission_id"] and a["mission_id"] not in self.missions:
            errors.append(f"mission_id inconnu : {a['mission_id']}")
        errors += self.check_links(a["corps_fr"], "FR") + self.check_links(a["corps_ar"], "AR")
        if errors:
            return "Article refusé, corrigez puis rappelez l'outil :\n- " + "\n- ".join(errors)

        num = self.next_num + len(self.saved)
        file = f"{num}-{slug[:48].rstrip('-')}"
        pub_date = self.dates[len(self.saved)]
        sources_md = "\n".join(f"- [{s['titre']}]({s['url']})" for s in a["sources"])
        esc = lambda s: s.replace('"', "'")
        fr = (
            f'---\ntitle: "{esc(title)}"\nslug: "{slug}"\ndate: "{pub_date}"\nauthor: "Youssef B"\n'
            f'image: "/images/{a["image"]}.webp"\nschema: "Article"\nkeywords: "{esc(a["mots_cles"])}"\n'
            f'description: "{esc(a["description_fr"])}"\n---\n\n# {title}\n\n'
            f"[Lire en arabe](/ar/blog/{file})\n\n{a['corps_fr'].strip()}\n\n## Sources\n\n{sources_md}\n"
        )
        ar = (
            f'---\ntitle: "{esc(a["titre_ar"])}"\ndescription: "{esc(a["description_ar"])}"\ndate: "{pub_date}"\n---\n\n'
            f"# {a['titre_ar']}\n\n{a['corps_ar'].strip()}\n\n## المصادر\n\n{sources_md}\n\n"
            f"[اقرأوا المقال بالفرنسية](/blog/{slug}) · [الاستشارات](/ar/conseil) · [تواصلوا مع الفريق](/contact)\n"
        )
        (self.repo / "content/drafts/fr" / f"{file}.md").write_text(fr, encoding="utf-8")
        (self.repo / "content/drafts/ar" / f"{file}.md").write_text(ar, encoding="utf-8")
        self.all_slugs.add(slug)
        self.saved.append({"file": file, "title": title, "date": pub_date, "sources": a["sources"]})
        return f"Article enregistré : {file}, publication prévue le {pub_date}."


# ── 3. Rédaction par Claude ──────────────────────────────────────────────────

SYSTEM = """Tu es le rédacteur en chef de « Nextinotech Insights », le blog d'un cabinet indépendant de conseil et de formation en achats, logistique et supply chain basé à Casablanca. Lecteurs : dirigeants, directeurs financiers, acheteurs et logisticiens d'entreprises marocaines et de filiales de groupes internationaux.

Ta mission cette semaine : choisir les sujets d'actualité qui intéressent le plus ces lecteurs et qui peuvent attirer du trafic de recherche, puis écrire un article de décryptage par sujet, en français et en arabe.

Règles de choix :
- Priorité aux actualités qui changent une décision pour une entreprise : loi de finances et mesures fiscales ou douanières, nouvelles obligations, investissements logistiques et portuaires, décisions des grands acteurs marocains (OCP, Renault, Stellantis, Tanger Med, Marsa Maroc, distributeurs, transporteurs) et internationaux (armateurs, intégrateurs, industriels implantés au Maroc), tendances qui modifient les coûts (fret, carburant, change).
- Évite un sujet déjà traité : la liste des articles existants est fournie. Un nouvel angle sur un sujet existant est possible si l'actualité apporte un fait nouveau.
- Varie les piliers d'une semaine à l'autre.

Règles de vérification, non négociables :
- Vérifie chaque fait avec la recherche web avant de l'écrire. N'écris aucun chiffre, aucune date, aucune citation que tu n'as pas trouvés dans une source consultée. Préfère les sources officielles (DGI, ADII, ministère des Finances, Bulletin officiel, AMDL, ports, communiqués des entreprises) et la presse économique reconnue.
- Quand une mesure n'est qu'un projet (projet de loi de finances, consultation), dis-le clairement ; ne la présente jamais comme adoptée.
- Sur les entreprises : faits publics uniquement, ton neutre, aucune spéculation sur leur situation, aucun jugement. N'attribue aucune déclaration sans source.
- Si tu ne trouves pas au moins deux sources fiables pour un sujet, abandonne-le.

Règles d'écriture (français) :
- Article de 900 à 1 300 mots, en Markdown, sans titre de niveau 1 (il est ajouté automatiquement) et sans section « Sources » (ajoutée à partir du champ sources).
- Premier paragraphe en gras qui répond à la question « qu'est-ce qui change et pour qui ? ».
- Ensuite : contexte, ce que dit précisément la mesure ou l'annonce, ce que cela change pour une entreprise marocaine (achats, logistique, finance), ce qu'il faut faire, puis une section « ## Questions fréquentes » avec deux ou trois questions en gras suivies de leur réponse.
- Un tableau au moins quand c'est utile.
- Ton de praticien, phrases claires, pas de jargon creux, aucune formule promotionnelle. Une seule mention du cabinet au plus, en fin d'article, par un lien vers une mission pertinente.
- Liens internes autorisés uniquement : /missions/<id> (liste fournie) et /blog/<adresse> d'un article publié (liste fournie). Aucun autre lien interne.

Règles d'écriture (arabe) :
- Version arabe complète de 500 à 900 mots, en arabe standard clair, même structure, mêmes faits, mêmes liens /missions/ que la version française (ajouter « (بالفرنسية) » après le lien de mission). Pas de lien vers une page arabe /ar/blog/.

Enregistre chaque article avec l'outil enregistrer_article. Si l'outil refuse un article, corrige exactement ce qui est signalé et rappelle-le. Quand tu as enregistré le nombre d'articles demandé, ou abandonné les sujets sans sources suffisantes, termine par un court bilan."""


def write_articles(ws: Workspace, headlines: str) -> anthropic.types.beta.BetaMessage | None:
    client = anthropic.Anthropic()

    @beta_tool
    def enregistrer_article(
        titre_fr: str, description_fr: str, mots_cles: str, corps_fr: str,
        titre_ar: str, description_ar: str, corps_ar: str,
        sources: list[dict], mission_id: str, image: str, pilier: str,
    ) -> str:
        """Enregistre un article de décryptage d'actualité (français + arabe) comme brouillon.

        Args:
            titre_fr: Titre français de 20 à 90 caractères, formulé comme la question du lecteur, sans la lettre « œ ».
            description_fr: Description française de 80 à 158 caractères.
            mots_cles: Cinq expressions de recherche séparées par des virgules.
            corps_fr: Corps de l'article en Markdown français (900 à 1 300 mots), sans titre de niveau 1 ni section Sources.
            titre_ar: Titre arabe.
            description_ar: Description arabe de 80 à 158 caractères.
            corps_ar: Corps de l'article en Markdown arabe (500 à 900 mots).
            sources: Liste d'au moins deux sources consultées, chacune {"titre": "...", "url": "https://..."}.
            mission_id: Identifiant de la mission la plus pertinente parmi la liste fournie, ou chaîne vide.
            image: Une valeur parmi office, transport, agro, pharma, charts, analytics, business, construction, hero-warehouse.
            pilier: Le pilier de veille dont relève l'article.
        """
        if not isinstance(sources, list) or not all(isinstance(s, dict) and s.get("url", "").startswith("http") for s in sources):
            return "Article refusé : sources doit être une liste d'objets {titre, url} avec des adresses https."
        if image not in {"office", "transport", "agro", "pharma", "charts", "analytics", "business", "construction", "hero-warehouse"}:
            image = "business"
        return ws.save({
            "titre_fr": titre_fr, "description_fr": description_fr, "mots_cles": mots_cles, "corps_fr": corps_fr,
            "titre_ar": titre_ar, "description_ar": description_ar, "corps_ar": corps_ar,
            "sources": sources, "mission_id": mission_id, "image": image,
        })

    existing = "\n".join(f"- {p['title']} (/blog/{p['slug']})" for p in ws.published[:400])
    drafts = "\n".join(f"- {d['title']} (brouillon, à paraître le {d['date']})" for d in ws.drafts)
    missions = "\n".join(f"- {i} : {t}" for i, t in ws.missions.items())
    user = (
        f"Date du jour : {today():%d/%m/%Y}. Écris {ws.max_articles} articles.\n\n"
        f"## Titres d'actualité de la semaine (point de départ, à vérifier)\n\n{headlines or '(aucun titre collecté : cherche toi-même l’actualité de la semaine)'}\n\n"
        f"## Missions du cabinet (liens autorisés /missions/<id>)\n\n{missions}\n\n"
        f"## Articles publiés (liens autorisés /blog/<adresse> ; sujets à ne pas répéter)\n\n{existing}\n\n"
        f"## Brouillons à paraître (sujets à ne pas répéter, ne pas lier)\n\n{drafts}"
    )

    runner = client.beta.messages.tool_runner(
        model=MODEL,
        max_tokens=16000,
        max_iterations=40,
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
        thinking={"type": "adaptive"},
        output_config={"effort": "high"},
        system=SYSTEM,
        tools=[
            {"type": "web_search_20260209", "name": "web_search", "max_uses": 25,
             "user_location": {"type": "approximate", "country": "MA", "city": "Casablanca", "timezone": "Africa/Casablanca"}},
            {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": 20},
            enregistrer_article,
        ],
        messages=[{"role": "user", "content": user}],
    )
    final = runner.until_done()
    if final.stop_reason == "refusal":
        print(f"[claude] refus : {getattr(final, 'stop_details', None)}")
    elif final.stop_reason == "pause_turn":
        print("[claude] arrêt en pause (limite d'itérations atteinte)")
    return final


# ── 4. Orchestration ─────────────────────────────────────────────────────────

def main() -> int:
    repo = clone()
    ws = Workspace(repo, CONFIG["articles_par_semaine"])
    headlines = collect_headlines()
    print(f"[veille] {headlines.count(chr(10)) + 1 if headlines else 0} titres collectés")

    try:
        final = write_articles(ws, headlines)
    except anthropic.APIStatusError as e:
        telegram(f"❌ Veille du {today():%d/%m/%Y} : erreur de l'API Claude ({e.status_code}). Aucun article proposé.")
        raise
    except anthropic.APIConnectionError:
        telegram(f"❌ Veille du {today():%d/%m/%Y} : API Claude injoignable. Aucun article proposé.")
        raise

    if not ws.saved:
        bilan = next((b.text for b in final.content if b.type == "text"), "") if final else ""
        telegram(f"ℹ️ Veille du {today():%d/%m/%Y} : aucun article retenu cette semaine.\n{bilan[:800]}")
        return 0

    branch = f"veille/{today().isoformat()}"
    run(["git", "checkout", "-b", branch], cwd=repo)
    run(["git", "add", "content/drafts"], cwd=repo)
    lines = "\n".join(f"- {s['date']} : {s['title']}" for s in ws.saved)
    run(["git", "commit", "-m", f"Veille d'actualité du {today():%d/%m/%Y} : {len(ws.saved)} article(s) FR + AR\n\n{lines}"], cwd=repo)
    run(["git", "push", "origin", branch], cwd=repo)

    body_lines = []
    for s in ws.saved:
        src = "\n".join(f"  - [{x['titre']}]({x['url']})" for x in s["sources"])
        body_lines.append(f"### {s['title']}\nPublication prévue le **{s['date']}** · `content/drafts/fr/{s['file']}.md` et `content/drafts/ar/{s['file']}.md`\n\nSources :\n{src}")
    body = (
        "Articles d'actualité rédigés par la veille automatique (Claude, avec vérification par recherche web). "
        "**Relire les faits et les chiffres avant de fusionner.** Après fusion, chaque article est publié à sa date "
        "par la tâche de publication planifiée ; sans fusion, rien n'est publié.\n\n"
        + "\n\n".join(body_lines)
        + "\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)"
    )
    url = create_pull_request(branch, f"Veille d'actualité du {today():%d/%m/%Y} ({len(ws.saved)} articles)", body)
    telegram(f"📰 Veille du {today():%d/%m/%Y} : {len(ws.saved)} article(s) FR + AR à relire.\n{lines}\n\nValider (fusionner) : {url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
