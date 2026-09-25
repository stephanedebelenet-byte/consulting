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
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
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

const { render } = await import(pathToFileURL(SSR_ENTRY).href)

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
    writeFileSync(file, html.replace(EMPTY_ROOT, `<div id="root">${body}</div>`), 'utf-8')
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
if (failures.length) {
  console.warn(`[prerender-app-bodies] ${failures.length} échec(s), body vide conservé :`)
  for (const f of failures) console.warn(`  - ${f}`)
}
console.log('')
