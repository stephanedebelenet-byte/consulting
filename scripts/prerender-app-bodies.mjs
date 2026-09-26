#!/usr/bin/env node
/**
 * Remplit le <body> des pages "app" prérendues (accueil, /conseil, /formation,
 * pages villes et programmes, offres...) avec leur vrai contenu React, rendu
 * côté serveur au build.
 *
 * Contexte (audit GEO du 25/09/2026) : le plugin de prérendu de vite.config.ts
 * écrit un <head> correct par page, mais le <body> des pages "app" restait
 * <div id="root"></div>, vide. Les crawlers IA qui n'exécutent pas de JS
 * (GPTBot, ClaudeBot, PerplexityBot...) — pourtant explicitement autorisés dans
 * robots.txt — ne voyaient donc aucun contenu sur ces pages. Le blog est déjà
 * couvert séparément (bodyHtml via parseMarkdown dans vite.config.ts).
 *
 * Fonctionnement :
 *   1. Charge le bundle SSR produit par `vite build --ssr src/entry-server.tsx
 *      --outDir dist-ssr` (voir package.json → "build").
 *   2. Pour chaque URL du sitemap dont la page prérendue a encore un
 *      <div id="root"></div> vide, rend la route et injecte le HTML obtenu.
 *   3. Une route qui échoue au rendu garde son body vide (état d'avant) et est
 *      signalée — elle n'interrompt jamais le traitement des autres pages.
 *
 * Sûr : src/main.tsx utilise createRoot (pas hydrateRoot), qui remplace ce
 * HTML statique dès que le bundle client s'exécute. Aucun risque d'hydratation.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://nextinotech.com'
const ROOT = resolve(import.meta.dirname, '..')
const DIST_DIR = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')
const EMPTY_ROOT = '<div id="root"></div>'

if (!existsSync(SSR_ENTRY)) {
  console.error(`[prerender-app-bodies] bundle SSR introuvable : ${SSR_ENTRY}`)
  console.error('Lance "npm run build" (qui construit aussi dist-ssr/) avant ce script.')
  process.exit(1)
}

const { render, primeMarkdown } = await import(pathToFileURL(SSR_ENTRY).href)

// Markdown fourni d'avance aux composants qui le chargent par fetch() dans le
// navigateur (pages événements) — voir src/data/markdownPreload.ts.
const BLOG_DIR = join(ROOT, 'public', 'blog')
for (const f of readdirSync(BLOG_DIR)) {
  if (f.endsWith('.md')) primeMarkdown(f.replace(/\.md$/, ''), readFileSync(join(BLOG_DIR, f), 'utf-8'))
}

// ── Déduplication des données structurées ──────────────────────────────────
// SchemaScript écrit le JSON-LD de la page dans le <body> rendu. Certaines
// routes ont déjà la même donnée dans le <head> (champ jsonLd de
// src/data/routeMeta.ts) : on retire alors la copie du <body>, pour ne pas
// déclarer deux fois un FAQPage ou un Course (Google le signale en erreur).
// Le bloc global du site (graphe #organization, présent sur toutes les pages
// via index.html) est ignoré dans la comparaison : ses types génériques
// (Service, BreadcrumbList…) ne doivent pas faire disparaître ceux d'une page.
const LD_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g

function ldTypes(json) {
  try {
    const j = JSON.parse(json.replace(/\\u003c/g, '<'))
    const nodes = Array.isArray(j) ? j : j['@graph'] || [j]
    return nodes.map((n) => n['@type']).flat().filter(Boolean)
  } catch {
    return []
  }
}

// Le bloc global est celui qui DÉFINIT l'organisation (nœud ProfessionalService
// d'@id #organization, issu d'index.html). Les schémas de page qui y font
// seulement référence (provider, publisher…) ne sont pas concernés.
function isSiteGraph(json) {
  try {
    const j = JSON.parse(json.replace(/\\u003c/g, '<'))
    const nodes = Array.isArray(j) ? j : j['@graph'] || [j]
    return nodes.some((n) => n['@id'] === `${SITE}/#organization` && n['@type'] === 'ProfessionalService')
  } catch {
    return false
  }
}

function dedupeJsonLd(html) {
  const headEnd = html.indexOf('</head>')
  const head = html.slice(0, headEnd)
  const body = html.slice(headEnd)
  const headTypes = new Set(
    [...head.matchAll(LD_RE)].filter((m) => !isSiteGraph(m[1])).flatMap((m) => ldTypes(m[1]))
  )
  let removed = 0
  const newBody = body.replace(LD_RE, (block, json) => {
    const types = ldTypes(json)
    if (types.length && types.every((t) => headTypes.has(t))) {
      removed++
      return ''
    }
    return block
  })
  return { html: head + newBody, removed }
}

function distPathFor(urlPath) {
  if (urlPath === '/' || urlPath === '') return join(DIST_DIR, 'index.html')
  return join(DIST_DIR, urlPath.replace(/^\//, '').replace(/\/$/, ''), 'index.html')
}

const sitemap = readFileSync(join(DIST_DIR, 'sitemap.xml'), 'utf-8')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim().slice(SITE.length) || '/')
  .filter((p) => !/\.(txt|xml|pdf|json)$/i.test(p))

let filled = 0
let alreadyFilled = 0
let dedupedBlocks = 0
const failures = []

for (const path of paths) {
  const file = distPathFor(path)
  if (!existsSync(file)) continue
  const html = readFileSync(file, 'utf-8')
  if (!html.includes(EMPTY_ROOT)) {
    alreadyFilled++ // articles de blog, déjà remplis par vite.config.ts
    continue
  }
  try {
    const body = render(path)
    const { html: out, removed } = dedupeJsonLd(html.replace(EMPTY_ROOT, `<div id="root">${body}</div>`))
    dedupedBlocks += removed
    writeFileSync(file, out, 'utf-8')
    filled++
  } catch (e) {
    failures.push(`${path} — ${e.message}`)
  }
}

// Page 404 (dist/404.html, générée par vite.config.ts) : rendue via une
// adresse volontairement inexistante, qui tombe sur la route "*" → NotFoundPage.
const notFoundFile = join(DIST_DIR, '404.html')
if (existsSync(notFoundFile)) {
  try {
    const html = readFileSync(notFoundFile, 'utf-8')
    if (html.includes(EMPTY_ROOT)) {
      writeFileSync(notFoundFile, html.replace(EMPTY_ROOT, `<div id="root">${render('/__page-introuvable__')}</div>`), 'utf-8')
      filled++
    }
  } catch (e) {
    failures.push(`/404.html — ${e.message}`)
  }
}

console.log(`\n[prerender-app-bodies] ${filled} page(s) app remplie(s) par rendu SSR`)
console.log(`[prerender-app-bodies] ${alreadyFilled} page(s) déjà remplie(s) (blog)`)
console.log(`[prerender-app-bodies] ${dedupedBlocks} bloc(s) JSON-LD en double retiré(s) du body (déjà dans le head)`)
if (failures.length) {
  console.warn(`[prerender-app-bodies] ${failures.length} échec(s), body vide conservé :`)
  for (const f of failures) console.warn(`  - ${f}`)
}
console.log('')
