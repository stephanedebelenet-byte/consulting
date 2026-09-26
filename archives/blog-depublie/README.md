# Articles dépubliés — non servis par le site

Ces fichiers sont hors de `public/` : ils ne sont ni publiés, ni dans le
sitemap, ni accessibles en `.md` brut sur nextinotech.com. Ils sont conservés
dans le dépôt, conformément aux décisions de dépublication d'origine.

- **11 études de cas** (`20-` à `30-case-study-*`), dépubliées le 21/08/2026
  (commit f2a81af) : entreprises réelles citées avec des métriques non
  vérifiées et, pour deux d'entre elles, des témoignages attribués à des
  employés réels (Bosch, Casanet). Risque juridique : ne pas republier sans
  validation écrite des entreprises concernées.
- **6 articles fusionnés** le 10/08/2026 (commit 1b4af97) dans un article
  jumeau. Leurs anciennes URLs redirigent en 301 via `vercel.json`.

Jusqu'au 26/09/2026, ces fichiers restaient dans `public/blog/` : le prérendu
leur générait une page (texte intégral depuis le 22/09) et une entrée de
sitemap, et le `.md` brut était téléchargeable. Le registre unique
`src/data/blogFiles.ts` empêche désormais toute page hors registre.
