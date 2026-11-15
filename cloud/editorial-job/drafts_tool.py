"""Outils de la veille éditoriale, utilisés par la routine Claude Code (abonnement, sans API payante).

À lancer depuis la racine du dépôt :
  python3 cloud/editorial-job/drafts_tool.py contexte          # missions, articles publiés, brouillons, prochains numéros et dates
  python3 cloud/editorial-job/drafts_tool.py titres            # titres d'actualité de la semaine (Google News RSS, sources.json)
  python3 cloud/editorial-job/drafts_tool.py enregistrer a.json  # contrôle un article puis l'écrit dans content/drafts/fr et ar

Format de a.json : titre_fr, description_fr, mots_cles, corps_fr, titre_ar, description_ar, corps_ar,
sources [{titre, url}], mission_id, image, pilier. En cas de refus, le script affiche les corrections
à faire et renvoie le code 1 ; rien n'est écrit.
"""
from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).parent))
from common import (  # noqa: E402
    draft_posts, free_publication_dates, mission_ids, next_article_number, published_posts, slugify,
)

HERE = Path(__file__).parent
CONFIG = json.loads((HERE / "sources.json").read_text(encoding="utf-8"))
IMAGES = {"office", "transport", "agro", "pharma", "charts", "analytics", "business", "construction", "hero-warehouse"}


# ── 1. Collecte des titres ───────────────────────────────────────────────────

def google_news(query: str, days: int) -> list[dict]:
    url = f"https://news.google.com/rss/search?q={quote(query)}+when:{days}d&hl=fr&gl=MA&ceid=MA:fr"
    try:
        with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0 (veille editoriale)"}), timeout=20) as r:
            root = ET.fromstring(r.read())
    except (OSError, ET.ParseError) as e:
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


# ── 3. Ligne de commande ─────────────────────────────────────────────────────

def main(argv: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    repo = Path.cwd()
    if not (repo / "src/data/missions.ts").exists():
        sys.exit("Lancer depuis la racine du dépôt.")
    cmd = argv[1] if len(argv) > 1 else ""
    if cmd == "titres":
        print(collect_headlines() or "(aucun titre collecté : chercher l'actualité par recherche web)")
        return 0
    ws = Workspace(repo, CONFIG["articles_par_semaine"])
    if cmd == "contexte":
        print("## Missions (liens autorisés /missions/<id>)")
        print("\n".join(f"- {i} : {t}" for i, t in ws.missions.items()))
        print("\n## Articles publiés (liens autorisés /blog/<adresse>)")
        print("\n".join(f"- {p['title']} -> /blog/{p['slug']}" for p in ws.published))
        print("\n## Brouillons à paraître (ne pas lier, ne pas répéter)")
        print("\n".join(f"- {d['date']} {d['title']}" for d in ws.drafts))
        print(f"\n## Prochain numéro : {ws.next_num} ; prochaines dates libres : {', '.join(ws.dates)}")
        return 0
    if cmd == "enregistrer" and len(argv) == 3:
        a = json.loads(Path(argv[2]).read_text(encoding="utf-8"))
        missing = [k for k in ("titre_fr", "description_fr", "mots_cles", "corps_fr", "titre_ar",
                               "description_ar", "corps_ar", "sources") if not a.get(k)]
        if missing:
            print("Article refusé : champs manquants : " + ", ".join(missing))
            return 1
        if not all(isinstance(s, dict) and str(s.get("url", "")).startswith("http") for s in a["sources"]):
            print("Article refusé : sources doit être une liste d'objets {titre, url} avec des adresses https.")
            return 1
        a.setdefault("mission_id", "")
        if a.get("image") not in IMAGES:
            a["image"] = "business"
        msg = ws.save(a)
        print(msg)
        return 0 if msg.startswith("Article enregistré") else 1
    print(__doc__)
    return 2


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
