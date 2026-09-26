#!/usr/bin/env node
/**
 * Notifie IndexNow (Bing, Yandex, Seznam, Naver…) des URLs du site.
 *
 * IndexNow est le protocole officiel de soumission instantanée de ces
 * moteurs. Bing alimente notamment ChatGPT Search et Copilot : c'est le
 * levier direct pour la visibilité dans les réponses IA (GEO). Google n'y
 * participe pas (sitemap + Search Console pour Google).
 *
 * À lancer APRÈS un déploiement en production (jamais au build : les
 * nouvelles pages doivent déjà être en ligne quand les moteurs passent) :
 *   npm run indexnow            → toutes les URLs du sitemap en ligne
 *   npm run indexnow -- <url>…  → seulement les URLs données
 *
 * La clé (public/<clé>.txt) est publique par conception : elle prouve
 * seulement la propriété du domaine.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const HOST = 'nextinotech.com'
const SITE = `https://${HOST}`
const ROOT = resolve(import.meta.dirname, '..')
const keyFile = readdirSync(join(ROOT, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) {
  console.error('[indexnow] clé introuvable : public/<32 caractères hex>.txt')
  process.exit(1)
}
const key = readFileSync(join(ROOT, 'public', keyFile), 'utf-8').trim()
const keyLocation = `${SITE}/${keyFile}`

// La clé doit être en ligne, sinon les moteurs rejettent la soumission.
const live = await fetch(keyLocation)
if (!live.ok || (await live.text()).trim() !== key) {
  console.error(`[indexnow] ${keyLocation} n'est pas en ligne ou ne contient pas la clé : déployer d'abord.`)
  process.exit(1)
}

let urlList = process.argv.slice(2)
if (urlList.length === 0) {
  const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text()
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
})
// 200 = reçu et traité, 202 = reçu, validation de la clé en cours.
console.log(`[indexnow] ${urlList.length} URL(s) soumise(s) → HTTP ${res.status} ${res.statusText}`)
if (res.status >= 400) {
  console.error(await res.text())
  process.exit(1)
}
