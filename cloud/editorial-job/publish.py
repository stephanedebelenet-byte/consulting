"""Tâche « publish » : publie les brouillons arrivés à échéance, vérifie le site, pousse sur main.

Déroulé :
  1. clone de la branche principale ;
  2. `node scripts/publish-drafts.mjs` (brouillons datés d'aujourd'hui ou avant) ;
  3. s'il y a quelque chose à publier : `npm ci` puis `npm run build`, dont le contrôle SEO
     (postbuild) bloque tout lien cassé ou toute incohérence ;
  4. si la compilation passe : commit et push sur main, ce qui déclenche le déploiement Vercel ;
  5. notification Telegram du résultat, succès comme échec.

Si la compilation échoue, rien n'est poussé : le site reste dans son état précédent.
"""
from __future__ import annotations

from common import clone, has_changes, run, telegram, today


def main() -> int:
    repo = clone()
    plan = run(["node", "scripts/publish-drafts.mjs", "--dry-run"], cwd=repo).stdout
    due = [line for line in plan.splitlines() if line.startswith("[publish-drafts] 20")]
    if not due:
        print("Rien à publier aujourd'hui.")
        return 0

    run(["node", "scripts/publish-drafts.mjs"], cwd=repo)
    if not has_changes(repo):
        print("Aucun changement après publication.")
        return 0

    run(["npm", "ci", "--no-audit", "--no-fund"], cwd=repo)
    build = run(["npm", "run", "build"], cwd=repo, check=False)
    if build.returncode != 0:
        tail = (build.stdout + build.stderr)[-1500:]
        telegram(f"❌ Publication du {today():%d/%m/%Y} bloquée : la compilation ou le contrôle SEO a échoué. Rien n'a été mis en ligne.\n\n{tail}")
        return 1

    # Les fichiers générés par le build ne doivent pas être commités, sauf l'index et les données.
    run(["git", "add", "public/blog", "content", "src/data/blogFiles.ts", "src/data/arabicPages.ts",
         "src/data/blogIndex.ts", "src/data/blogCount.ts", "src/data/featuredBlog.ts",
         "public/llms.txt", "public/llms-full.txt"], cwd=repo)
    titles = "\n".join("• " + line.split("  ", 2)[-1].replace("(+ AR)", "").strip() for line in due)
    run(["git", "commit", "-m", f"Publier les articles du {today():%d/%m/%Y}\n\n{titles}"], cwd=repo)
    run(["git", "push", "origin", "HEAD"], cwd=repo)
    telegram(f"✅ {len(due)} article(s) publié(s) le {today():%d/%m/%Y} (FR + AR). Déploiement Vercel en cours.\n{titles}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
