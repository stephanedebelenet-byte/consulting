"""Outils communs du job éditorial (Cloud Run Jobs) : git, GitHub, Telegram, données du site.

Aucun secret n'est écrit dans ce dépôt : GITHUB_TOKEN, TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID sont injectés par Secret Manager comme variables d'environnement du job.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import unicodedata
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo


REPO = os.environ.get("GITHUB_REPO", "stephanedebelenet-byte/consulting")
BRANCH_MAIN = os.environ.get("GITHUB_MAIN_BRANCH", "main")
WORKDIR = Path(os.environ.get("WORKDIR", "/tmp/site"))
TZ = ZoneInfo("Africa/Casablanca")
GIT_NAME = os.environ.get("GIT_AUTHOR_NAME", "Nextinotech Éditorial (bot)")
GIT_EMAIL = os.environ.get("GIT_AUTHOR_EMAIL", "editorial-bot@users.noreply.github.com")


def today() -> date:
    return datetime.now(TZ).date()


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess:
    """Exécute une commande en masquant le jeton GitHub dans les journaux."""
    token = os.environ.get("GITHUB_TOKEN", "")
    shown = " ".join(cmd).replace(token, "***") if token else " ".join(cmd)
    print(f"$ {shown}", flush=True)
    res = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    out = (res.stdout + res.stderr).replace(token, "***") if token else res.stdout + res.stderr
    if out.strip():
        print(out[-4000:], flush=True)
    if check and res.returncode != 0:
        raise RuntimeError(f"Échec ({res.returncode}) : {shown}")
    return res


def clone() -> Path:
    """Clone le dépôt (branche principale) dans WORKDIR et configure l'auteur des commits."""
    token = os.environ["GITHUB_TOKEN"]
    if WORKDIR.exists():
        run(["rm", "-rf", str(WORKDIR)])
    url = f"https://x-access-token:{token}@github.com/{REPO}.git"
    run(["git", "clone", "--depth", "50", "--branch", BRANCH_MAIN, url, str(WORKDIR)])
    run(["git", "config", "user.name", GIT_NAME], cwd=WORKDIR)
    run(["git", "config", "user.email", GIT_EMAIL], cwd=WORKDIR)
    return WORKDIR


def has_changes(repo: Path) -> bool:
    return bool(run(["git", "status", "--porcelain"], cwd=repo).stdout.strip())


def telegram(message: str) -> None:
    """Notification Telegram (silencieuse si non configurée)."""
    token, chat = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat:
        print("[telegram] non configuré :", message[:300])
        return
    import requests  # importé ici : la routine Claude Code utilise ce module sans requests

    try:
        requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={"chat_id": chat, "text": message[:4000], "disable_web_page_preview": True},
            timeout=20,
        ).raise_for_status()
    except requests.RequestException as e:  # la notification ne doit jamais faire échouer le job
        print(f"[telegram] échec : {e}")


def create_pull_request(branch: str, title: str, body: str) -> str:
    """Ouvre une pull request vers la branche principale et renvoie son adresse."""
    import requests

    r = requests.post(
        f"https://api.github.com/repos/{REPO}/pulls",
        headers={
            "Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        json={"title": title, "head": branch, "base": BRANCH_MAIN, "body": body},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()["html_url"]


# ── Données du site ──────────────────────────────────────────────────────────

def slugify(title: str, max_length: int = 60) -> str:
    """Même algorithme que src/utils/slugify.ts (l'adresse FR en dépend)."""
    s = unicodedata.normalize("NFD", title.lower())
    s = re.sub(r"[̀-ͯ]", "", s)
    s = re.sub(r"['’‘`]", "-", s)
    s = re.sub(r"[^a-z0-9\s-]", "", s).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    if len(s) > max_length:
        cut = s[:max_length]
        last = cut.rfind("-")
        s = cut[:last] if last > max_length * 0.5 else cut
    return s


def frontmatter(md: str) -> dict:
    src = md.lstrip("﻿")
    end = src.find("\n---", 3)
    fm: dict = {}
    for line in src[3:end].splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm


def published_posts(repo: Path) -> list[dict]:
    """Articles publiés (index généré du blog) : file, slug, title, date."""
    t = (repo / "src/data/blogIndex.ts").read_text(encoding="utf-8")
    return json.loads(t[t.index("["): t.rindex("]") + 1])


def draft_posts(repo: Path) -> list[dict]:
    out = []
    for p in sorted((repo / "content/drafts/fr").glob("*.md")):
        fm = frontmatter(p.read_text(encoding="utf-8"))
        out.append({"file": p.stem, "slug": fm.get("slug", ""), "title": fm.get("title", ""), "date": fm.get("date", "")})
    return out


def mission_ids(repo: Path) -> list[tuple[str, str]]:
    """(id, titre) des missions du catalogue."""
    t = (repo / "src/data/missions.ts").read_text(encoding="utf-8").replace("\r\n", "\n")
    found = re.findall(r"\n    id: '([^']+)',\n    famille: '[^']+',\n    titre: (?:'([^']+)'|\"([^\"]+)\"),\n", t)
    return [(i, a or b) for i, a, b in found]


def next_article_number(repo: Path) -> int:
    nums = []
    for folder in ("public/blog", "content/drafts/fr"):
        for p in (repo / folder).glob("*.md"):
            m = re.match(r"^(\d{3})-", p.name)
            if m:
                nums.append(int(m.group(1)))
    return max([650] + nums) + 1


def free_publication_dates(repo: Path, count: int, weekdays: tuple[int, ...] = (1, 3)) -> list[str]:
    """Prochaines dates libres (par défaut mardi et jeudi, jours laissés libres par le calendrier)."""
    taken = {d["date"] for d in draft_posts(repo)}
    out, d = [], today() + timedelta(days=1)
    while len(out) < count:
        if d.weekday() in weekdays and d.isoformat() not in taken:
            out.append(d.isoformat())
        d += timedelta(days=1)
    return out
