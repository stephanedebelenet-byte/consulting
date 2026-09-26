#!/usr/bin/env node
/**
 * Garde-fou SEO post-build — vérifie exactement la classe de bug qui a causé
 * l'incident /formation-rl (octobre 2026) : une URL du sitemap qui ne
 * correspond pas telle quelle à la balise canonique de la page prérendue
 * correspondante, ce qui déclenche une redirection Vercel contradictoire.
 *
 * Vérifie pour chaque <loc> du sitemap :
 *   1. La page prérendue correspondante existe dans dist/ (pas d'URL fantôme).
 *   2. Sa balise <link rel="canonical"> est identique, au caractère près, à
 *      l'URL du sitemap (donc pas de mismatch de slash final ou autre).
 *   3. Le slash final est cohérent avec la convention du site (aucun, sauf
 *      la racine "/").
 *   4. Aucune balise noindex n'est présente.
 *
 * Vérifie aussi la complétude de public/llms.txt et public/llms-full.txt :
 * toute page marquée `isOffer` (et non `hidden`) dans src/data/routeMeta.ts
 * doit être référencée par son URL dans les deux fichiers — voir
 * .offers-manifest.json, généré par le plugin de prérendu (vite.config.ts).
 * Objectif : qu'une offre ajoutée au site ne puisse plus être oubliée de ces
 * fichiers en silence (audit UI/UX, question "comment ne rater aucune offre").
 *
 * Usage : node scripts/check-seo-consistency.mjs   (après `npm run build`)
 * Code de sortie : 1 si une incohérence est trouvée, 0 sinon.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SITE = 'https://nextinotech.com'
const ROOT = resolve(import.meta.dirname, '..')
const DIST_DIR = join(ROOT, 'dist')
const SITEMAP_PATH = join(DIST_DIR, 'sitemap.xml')
const OFFERS_MANIFEST_PATH = join(ROOT, '.offers-manifest.json')
const LLMS_PATH = join(ROOT, 'public', 'llms.txt')
const LLMS_FULL_PATH = join(ROOT, 'public', 'llms-full.txt')

function fail(msg) {
  problems.push(msg)
}

function distPathFor(urlPath) {
  // urlPath: chemin sans domaine, ex "/formation-rl", "/blog/xxx", "/"
  if (urlPath === '/' || urlPath === '') return join(DIST_DIR, 'index.html')
  const rel = urlPath.replace(/^\//, '').replace(/\/$/, '')
  return join(DIST_DIR, rel, 'index.html')
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)"/i)
  return m ? m[1] : null
}

function extractRobotsMeta(html) {
  const m = html.match(/<meta name="robots" content="([^"]*)"/i)
  return m ? m[1] : null
}

// Détecte la régression du 22/09/2026 : une page prérendue dont le <body>
// est vide (seulement <div id="root"></div>), lisible par <head> correct
// mais aucun contenu réel — cause directe du blocage d'indexation Google
// et de l'invisibilité totale pour les crawlers IA qui ne rendent pas le JS
// (GPTBot, ClaudeBot, PerplexityBot...). Appliqué à toutes les pages du
// sitemap (blog et pages "app").
const MIN_BODY_TEXT_LENGTH = 200

function extractBodyText(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (!m) return ''
  return m[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function hasH1(html) {
  return /<h1[\s>]/i.test(html)
}

// Règle 6 (25/09/2026) : longueurs affichées sans troncature dans Google.
// Mêmes seuils que MAX_TITLE / MAX_DESCRIPTION dans src/data/routeMeta.ts.
// Non appliquée aux articles de blog : leur <title> est leur titre éditorial,
// dont dérive aussi l'URL (slugify) — le raccourcir changerait leurs URLs.
const MAX_TITLE = 60
const MAX_DESCRIPTION = 160

function decodeEntities(s) {
  return s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i)
  return m ? decodeEntities(m[1].trim()) : ''
}

function extractDescription(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/i)
  return m ? decodeEntities(m[1]) : ''
}

const problems = []

if (!existsSync(SITEMAP_PATH)) {
  console.error(`sitemap introuvable: ${SITEMAP_PATH}`)
  process.exit(1)
}
if (!existsSync(DIST_DIR)) {
  console.error(`dist/ introuvable — lance "npm run build" avant ce script.`)
  process.exit(1)
}

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf-8')
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())

if (locs.length === 0) {
  console.error('Aucune <loc> trouvée dans le sitemap — vérifie le fichier.')
  process.exit(1)
}

let checked = 0

for (const loc of locs) {
  if (!loc.startsWith(SITE)) {
    fail(`URL hors domaine dans le sitemap : ${loc}`)
    continue
  }
  const urlPath = loc.slice(SITE.length) || '/'

  // Les ressources non-HTML (llms.txt etc.) ne sont pas prérendues, on les ignore.
  if (/\.(txt|xml|pdf|json)$/i.test(urlPath)) continue

  // Règle 3 : pas de slash final sauf racine.
  if (urlPath !== '/' && urlPath.endsWith('/')) {
    fail(`Slash final incohérent dans le sitemap : ${loc} (convention du site = pas de slash sauf "/")`)
  }

  const distFile = distPathFor(urlPath)
  if (!existsSync(distFile)) {
    fail(`URL du sitemap sans page prérendue correspondante : ${loc} (attendu ${distFile})`)
    continue
  }

  checked++
  const html = readFileSync(distFile, 'utf-8')

  // Règle 2 : canonical == URL exacte du sitemap.
  const canonical = extractCanonical(html)
  if (!canonical) {
    fail(`Aucune balise canonical trouvée pour ${loc}`)
  } else if (canonical !== loc) {
    fail(`Mismatch canonical/sitemap pour ${loc} → canonical déclaré = ${canonical}`)
  }

  // Règle 4 : pas de noindex.
  const robots = extractRobotsMeta(html)
  if (robots && /noindex/i.test(robots)) {
    fail(`Balise noindex trouvée sur une page listée dans le sitemap : ${loc}`)
  }

  // Règle 5 : toute page du sitemap doit avoir un <body> non vide, avec au
  // moins un H1 et un texte réel — pas seulement un <div id="root"></div>.
  // Blog : rempli par vite.config.ts (bodyHtml, 22/09/2026). Pages "app" :
  // remplies par scripts/prerender-app-bodies.mjs (rendu SSR, 25/09/2026).
  // C'est le garde-fou qui aurait empêché la régression de passer inaperçue.
  const bodyText = extractBodyText(html)
  if (!hasH1(html)) {
    fail(`Page sans <h1> dans le <body> prérendu : ${loc}`)
  }
  if (bodyText.length < MIN_BODY_TEXT_LENGTH) {
    fail(`Page avec un <body> quasi vide (${bodyText.length} caractères de texte, minimum ${MIN_BODY_TEXT_LENGTH}) : ${loc}`)
  }

  // Règle 8 (25/09/2026) : données structurées valides et sans doublon. Le
  // JSON-LD est désormais écrit dans le HTML par le rendu serveur
  // (SchemaScript) en plus du <head> (routeMeta.ts) ; prerender-app-bodies.mjs
  // retire les copies redondantes. On vérifie que le résultat est propre.
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  const pageTypes = {}
  for (const [, json] of ldBlocks) {
    let parsed
    try {
      parsed = JSON.parse(json.replace(/\\u003c/g, '<'))
    } catch {
      fail(`JSON-LD invalide sur ${loc}`)
      continue
    }
    const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed]
    const isSiteGraph = nodes.some((n) => n['@id'] === `${SITE}/#organization` && n['@type'] === 'ProfessionalService')
    if (isSiteGraph) continue
    for (const t of nodes.map((n) => n['@type']).flat().filter(Boolean)) pageTypes[t] = (pageTypes[t] || 0) + 1
  }
  for (const t of ['FAQPage', 'Course', 'Event', 'Article', 'Service', 'ItemList']) {
    if (pageTypes[t] > 1) fail(`JSON-LD "${t}" déclaré ${pageTypes[t]} fois sur ${loc} (doublon)`)
  }

  // Règle 6 : longueurs title / description (hors blog, voir plus haut).
  if (!urlPath.startsWith('/blog/')) {
    const title = extractTitle(html)
    const description = extractDescription(html)
    if (title.length > MAX_TITLE) {
      fail(`<title> trop long (${title.length} > ${MAX_TITLE}, tronqué dans Google) : ${loc} — ajuste SEO_OVERRIDES dans src/data/routeMeta.ts`)
    }
    if (description.length > MAX_DESCRIPTION) {
      fail(`Meta description trop longue (${description.length} > ${MAX_DESCRIPTION}) : ${loc} — ajuste SEO_OVERRIDES dans src/data/routeMeta.ts`)
    }
  }
}

console.log(`\n[check-seo-consistency] ${checked}/${locs.length} URL du sitemap vérifiées.\n`)

// ── Règle 9 : nom public du fondateur (26/09/2026) ─────────────────────────
// Le site présente le fondateur sous le nom "Youssef B" (décision du
// 26/09/2026). Le nom de famille complet ne doit apparaître dans aucune page
// publiée ni dans llms.txt / llms-full.txt. Les articles écrits ailleurs
// (autres branches, anciens scripts) doivent utiliser author: "Youssef B".
{
  const FULL_NAME = /bahaida/i
  const offenders = []
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(html|txt|xml)$/.test(e.name) && FULL_NAME.test(readFileSync(p, 'utf-8'))) offenders.push(p.slice(DIST_DIR.length))
    }
  }
  walk(DIST_DIR)
  if (offenders.length) {
    fail(`Nom de famille complet du fondateur publié dans ${offenders.length} fichier(s), utiliser "Youssef B" : ${offenders.slice(0, 5).join(', ')}${offenders.length > 5 ? '…' : ''}`)
  }
}

// ── Règle 10 : aucun article dépublié dans public/ (26/09/2026) ────────────
// Tout .md de public/blog/ est servi tel quel sur le site (…/blog/xxx.md).
// Un fichier absent du registre src/data/blogFiles.ts n'a pas de page, mais
// reste téléchargeable en brut : c'était le cas des 11 études de cas
// dépubliées le 21/08/2026. Un article retiré du registre doit être déplacé
// dans archives/blog-depublie/.
{
  const registrySrc = readFileSync(join(ROOT, 'src', 'data', 'blogFiles.ts'), 'utf-8')
  const registry = new Set(new Function('return ' + registrySrc.slice(registrySrc.indexOf('= [') + 2))())
  const evenements = [...readFileSync(join(ROOT, 'src', 'data', 'evenements.ts'), 'utf-8').matchAll(/file: '([^']+)'/g)].map((m) => m[1])
  const orphans = readdirSync(join(ROOT, 'public', 'blog'))
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.slice(0, -3))
    .filter((f) => !registry.has(f) && !evenements.includes(f))
  if (orphans.length) {
    fail(`${orphans.length} article(s) hors registre encore dans public/blog/ (servis en .md brut) : ${orphans.slice(0, 5).join(', ')} — les ajouter à src/data/blogFiles.ts ou les déplacer dans archives/blog-depublie/`)
  }
}

// ── Règle 11 : aucune redirection vers une page inexistante (26/09/2026) ───
// Chaque redirection interne de vercel.json doit mener à une page publiée
// (présente au sitemap), et non à une 404 ni à une autre redirection. Le
// 26/09, la dépublication de 17 articles a laissé 6 anciennes variantes
// d'URLs rediriger vers des pages disparues.
{
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf-8'))
  const published = new Set(locs.map((l) => l.slice(SITE.length) || '/'))
  const sources = new Set((vercel.redirects || []).map((r) => r.source))
  for (const r of vercel.redirects || []) {
    const d = r.destination
    if (/^https?:/.test(d) || d.includes(':')) continue // externe ou paramétrée
    const p = d.split(/[?#]/)[0] || '/'
    if (published.has(p)) continue
    fail(sources.has(p)
      ? `Redirection en chaîne : ${r.source} → ${p}, elle-même redirigée — pointer directement vers la destination finale`
      : `Redirection vers une page inexistante : ${r.source} → ${p} (404)`)
  }
}

// ── Règle 7 : vraie page 404 (25/09/2026) ─────────────────────────────────
// vercel.json ne réécrit plus toute adresse vers index.html : Vercel sert
// dist/404.html avec un statut 404. Elle doit exister, porter noindex, ne
// déclarer aucune canonical, et avoir un contenu lisible.
const NOT_FOUND = join(DIST_DIR, '404.html')
if (!existsSync(NOT_FOUND)) {
  fail('dist/404.html absent : les adresses inexistantes renverraient la page 404 générique de Vercel')
} else {
  const html = readFileSync(NOT_FOUND, 'utf-8')
  const robots = extractRobotsMeta(html)
  if (!robots || !/noindex/i.test(robots)) fail('dist/404.html sans meta robots noindex')
  if (extractCanonical(html)) fail('dist/404.html déclare une canonical : elle serait prise pour une vraie page')
  if (!hasH1(html) || extractBodyText(html).length < MIN_BODY_TEXT_LENGTH) fail('dist/404.html sans H1 ou sans contenu')
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf-8'))
  if ((vercel.rewrites || []).some((r) => r.destination === '/index.html')) {
    fail('vercel.json réécrit des adresses vers /index.html : les pages inexistantes redeviendraient des "soft 404" en 200')
  }
}

// ── Complétude llms.txt / llms-full.txt ────────────────────────────────────
if (!existsSync(OFFERS_MANIFEST_PATH)) {
  fail(`Manifeste des offres introuvable : ${OFFERS_MANIFEST_PATH} (relance "npm run build" pour le régénérer)`)
} else {
  const offerPaths = JSON.parse(readFileSync(OFFERS_MANIFEST_PATH, 'utf-8'))
  const llmsTxt = existsSync(LLMS_PATH) ? readFileSync(LLMS_PATH, 'utf-8') : ''
  const llmsFullTxt = existsSync(LLMS_FULL_PATH) ? readFileSync(LLMS_FULL_PATH, 'utf-8') : ''

  let offersChecked = 0
  for (const path of offerPaths) {
    const url = SITE + path
    offersChecked++
    const inLlms = llmsTxt.includes(url) || llmsTxt.includes(path)
    const inLlmsFull = llmsFullTxt.includes(url) || llmsFullTxt.includes(path)
    if (!inLlms) fail(`Offre absente de llms.txt : ${path} (ajoute son URL, ou marque la route "hidden: true" dans routeMeta.ts si c'est volontaire)`)
    if (!inLlmsFull) fail(`Offre absente de llms-full.txt : ${path} (ajoute son URL, ou marque la route "hidden: true" dans routeMeta.ts si c'est volontaire)`)
  }
  console.log(`[check-seo-consistency] ${offersChecked} offre(s) vérifiée(s) dans llms.txt / llms-full.txt.\n`)
}

if (problems.length > 0) {
  console.error(`❌ ${problems.length} incohérence(s) détectée(s) :\n`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('\nCorrige ces points avant de déployer — ce sont exactement les symptômes')
  console.error('qui provoquent des rapports "Page avec redirection" ou "non indexée" dans')
  console.error('Google Search Console.\n')
  process.exit(1)
} else {
  console.log('✅ Aucune incohérence sitemap/canonical/noindex détectée.\n')
  process.exit(0)
}
