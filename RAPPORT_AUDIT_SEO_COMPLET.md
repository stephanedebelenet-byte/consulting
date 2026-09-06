# Rapport SEO complet — nextinotech.com

**Date :** 7 septembre 2026
**Auteur :** Claude Code, sur le dépôt réel (`chore/seo-consistency-guard`)
**Statut :** définitif — remplace toute analyse antérieure produite hors de ce dépôt

---

## 1. Résumé exécutif

Une session Claude distincte (claude.ai, sans accès au dépôt ni au site) a produit un audit SEO et un plan de correction basés sur des données inventées et sur une architecture serveur qui n'est pas celle de ce site. Trois fichiers issus de cette session (`PROMPT_VSCODE_CLAUDE.md`, `FICHIERS_POUR_CLAUDE.txt`, `⚡_POUR_VSCODE_CLAUDE_LIRE_MOI.txt`) demandent de faire exécuter par Claude Code une série de scripts Apache/Nginx sur un serveur qui n'existe pas.

Ce rapport :
- documente précisément pourquoi ces fichiers ne s'appliquent pas ;
- présente le diagnostic réel, obtenu en lisant le code, le build et l'historique Git du dépôt ;
- confirme par une vérification automatisée l'état actuel du site ;
- indique les seules actions qui restent à faire, et où les faire.

**Verdict :** le site n'a pas de bug SEO actif. Un bug a existé (`/formation-rl`), il est corrigé et mergé. Le nombre de pages « non indexées » dans Search Console reflète un site qui vient de publier 361 URLs d'un coup, pas une erreur de configuration.

---

## 2. Ce qui a été reçu, et pourquoi ça ne s'applique pas

| Fichier reçu | Contenu | Problème |
|---|---|---|
| `PROMPT_VSCODE_CLAUDE.md` | Prompt à coller dans « Claude VSCode », instructions d'installation d'une extension | Décrit un produit inexistant (« extension Claude », raccourci Cmd/Ctrl+Shift+C) ; l'outil réel est Claude Code, déjà en cours d'utilisation ici |
| `FICHIERS_POUR_CLAUDE.txt` | Liste de fichiers CSV (« Métadonnées.csv », « Problèmes_critiques.csv »…) censés venir de Search Console | Ces fichiers n'ont jamais été fournis ni vérifiés ; les chiffres qu'ils sont censés justifier (363 pages non indexées, 2 redirects 302/307, 1 canonical incorrect) proviennent de la session précédente, pas d'un export réel consulté ici |
| `⚡_POUR_VSCODE_CLAUDE_LIRE_MOI.txt` | Guide pas-à-pas pour exécuter des scripts sur un serveur | Suppose SSH, `/var/www/nextinotech/`, `.htaccess`, `sudo systemctl restart apache2` |

Le point commun aux trois : ils décrivent un site hébergé sur un serveur Apache ou Nginx classique. Or ce dépôt est :

- une SPA **React 19 + Vite**, prérendue statiquement route par route (`vite.config.ts`, `prerenderHeads`) ;
- déployée sur **Vercel** (`vercel.json`, `outputDirectory: dist`) ;
- sans `.htaccess`, sans `nginx.conf`, sans accès SSH à administrer.

Exécuter `bash fix-redirects.sh`, `sudo systemctl restart apache2` ou copier un `.htaccess` généré n'aurait ici strictement aucun effet : il n'y a ni service Apache/Nginx à redémarrer, ni fichier `.htaccess` lu par Vercel. Générer ces scripts aurait produit du travail inutile présenté comme une correction.

---

## 3. Vérification technique réelle effectuée aujourd'hui

Exécutée directement sur ce dépôt, après un build (`npm run build`) :

```
$ node scripts/check-seo-consistency.mjs

[check-seo-consistency] 359/361 URL du sitemap vérifiées.

✅ Aucune incohérence sitemap/canonical/noindex détectée.
```

Ce script (`scripts/check-seo-consistency.mjs`, lancé automatiquement en `postbuild`) vérifie pour chaque URL du sitemap :

1. qu'une page prérendue correspondante existe dans `dist/` (pas d'URL fantôme) ;
2. que sa balise `<link rel="canonical">` correspond au caractère près à l'URL du sitemap ;
3. que le slash final est cohérent avec la convention du site (aucun, sauf la racine) ;
4. qu'aucune balise `noindex` n'est présente.

Résultat concret sur l'état actuel du code :

| Vérification | Résultat |
|---|---|
| URLs du sitemap | 361 (359 pages HTML vérifiées + 2 fichiers `.txt` non prérendus, ignorés à raison) |
| Pages sans build correspondant | 0 |
| Mismatch canonical / sitemap | 0 |
| Balises `noindex` détectées | 0 |
| `robots.txt` | `Allow: /` partout, aucun `Disallow: /`, sitemap déclaré |

---

## 4. Chaque point du rapport Search Console original, traité individuellement

| Point signalé | Diagnostic réel | Statut |
|---|---|---|
| 1 page avec balise canonique incorrecte | C'est la catégorie neutre GSC « autre page avec canonique correcte déclarée » — pas une erreur, Google a juste indexé une autre version équivalente | Rien à corriger |
| 2 pages avec redirection | Page 1 : `/formation-rl/` (avec slash) était déclarée dans le sitemap, le JSON-LD et le canonical de 6 fichiers, alors que Vercel redirige en 308 toute URL avec slash final vers la version sans slash → boucle canonical/redirection auto-contradictoire | **Corrigé** — commit [8e3bd19](8e3bd19), mergé via PR #1 |
| | Page 2 (probable) : `/services` redirige côté client vers `/conseil` ou `/prestations` — c'est un routage de migration volontaire (l'offre a été scindée en août 2026), plus lié nulle part en interne | Comportement voulu, rien à corriger |
| 360 pages « détectée, actuellement non indexée » | Le sitemap est passé de quelques pages à 361 URLs entre le 5 août et le 1er septembre 2026 (voir chronologie ci-dessous). Le snapshot Search Console du 4 septembre capture un site qui vient tout juste de publier ce volume | Comportement standard de Google sur un nom de domaine jeune après une explosion de pages ; délai de plusieurs semaines, pas un bug |

### Chronologie qui explique le pic de pages non indexées

| Date | Événement |
|---|---|
| 14 mai 2026 | Lancement du site (quelques pages) |
| 5 août 2026 | Sitemap étendu à 208 articles |
| 7 août 2026 | +87 articles blog ajoutés au sitemap |
| 31 août – 1ᵉʳ sept. 2026 | +12 articles cluster IA, 6 pages villes, sitemap remanié à 361 URLs |
| 4 sept. 2026 | Snapshot Search Console : 1 page indexée, 360 non indexées |

---

## 5. Ce qui est déjà corrigé et mergé

| Commit | Description |
|---|---|
| `8e3bd19` | `fix(seo): supprime le slash final incohérent sur /formation-rl` — uniformise `routeMeta.ts`, `sitemap.xml`, `formations.ts` (JSON-LD), `FormationRL.tsx`, `FormationCatalogue.tsx`, `FormationProgramme.tsx`, `FormationProgrammePage.tsx`, `FormationStickyBar.tsx`, `FormationVille.tsx`, `analytics.ts` |
| `21c2449` | Merge PR #1 — intègre ce correctif dans `main` |
| `b6a22f7` | `chore(seo): garde-fou automatique sitemap/canonical/noindex post-build` — ajoute le script `scripts/check-seo-consistency.mjs`, exécuté à chaque `npm run build` via le hook `postbuild` |

Le garde-fou signifie qu'une régression de ce type (URL de sitemap dont le canonical ne correspond pas exactement, slash final incohérent, ou balise noindex oubliée) fera désormais échouer le build avant tout déploiement.

---

## 6. Ce qu'il reste réellement à faire

Aucune de ces actions n'est du code. Elles se font dans l'interface Google Search Console :

1. **Resoumettre le sitemap** mis à jour (Search Console → Sitemaps → re-tester `sitemap.xml`).
2. **Demander l'indexation manuelle** des pages à plus forte valeur d'abord — `/conseil`, `/formation`, `/prestations`, `/formation-rl` — plutôt que les 360 pages d'un coup : l'outil d'inspection d'URL est plafonné en usage quotidien.
3. **Repasser sur le rapport Couverture dans 2 à 4 semaines.** L'indexation progressive du volume publié fin août est le facteur dominant ; ce délai est normal et ne nécessite pas d'intervention technique supplémentaire.

---

## 7. Fichiers à ignorer

Les fichiers suivants, produits par la session claude.ai précédente, ne doivent pas être utilisés — ils ne correspondent ni aux vraies données du site ni à son infrastructure réelle :

- `PROMPT_VSCODE_CLAUDE.md`
- `FICHIERS_POUR_CLAUDE.txt`
- `⚡_POUR_VSCODE_CLAUDE_LIRE_MOI.txt`
- Les livrables mentionnés dans cette même session : présentation PowerPoint, classeur Excel et rapport Word d'« audit SEO », ainsi que `PLAN_ACTION_IMMEDIAT.md`, `CORRECTION_INDEXATION_URGENTE.md` et `DIAGNOSTIC_RAPIDE.sh` — ces trois derniers ne sont d'ailleurs jamais entrés dans ce dépôt, il n'y a donc rien à supprimer ici.

Le document de référence pour tout ce qui concerne l'indexation est [`AUDIT_INDEXATION_REEL.md`](AUDIT_INDEXATION_REEL.md), déjà présent dans ce dépôt et complété par le présent rapport.

---

## 8. Conclusion

| Sujet | État |
|---|---|
| robots.txt | Correct |
| Balises noindex | Aucune |
| Canonicals | Corrects sur les 359 pages vérifiées |
| Bug `/formation-rl` | Corrigé et mergé |
| Garde-fou anti-régression | En place (`postbuild`) |
| 360 pages « non indexées » | Délai normal, à surveiller dans Search Console, pas un bug de code |
| Scripts Apache/Nginx demandés | Non applicables — infrastructure Vercel |

Le site est techniquement propre. La seule action en attente est administrative (Search Console), pas du développement.
