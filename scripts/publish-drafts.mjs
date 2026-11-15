#!/usr/bin/env node
/**
 * Publie les brouillons d'articles arrivés à échéance (calendrier éditorial).
 *
 *   node scripts/publish-drafts.mjs                 # publie tout brouillon daté d'aujourd'hui ou avant
 *   node scripts/publish-drafts.mjs --until 2027-01-15
 *   node scripts/publish-drafts.mjs --dry-run       # liste sans rien modifier
 *
 * Un brouillon est une paire de fichiers :
 *   content/drafts/fr/<file>.md  → public/blog/<file>.md   (article français)
 *   content/drafts/ar/<file>.md  → content/ar/<file>.md    (version arabe, optionnelle)
 *
 * À la publication, le script :
 *   1. déplace les fichiers ;
 *   2. ajoute <file> au registre src/data/blogFiles.ts (source unique des articles publiés) ;
 *   3. ajoute { file, title } à arabicArticles (src/data/arabicPages.ts) si la version arabe existe,
 *      ce qui crée la page /ar/blog/<file> et les liens hreflang FR ↔ AR ;
 *   4. régénère l'index du blog (scripts/generate-blog-index.mjs) ;
 *   5. met à jour le total d'articles et le catalogue numéroté de public/llms.txt et llms-full.txt.
 *
 * Les brouillons sont rédigés pour ne renvoyer qu'à des pages déjà publiées ou à des articles
 * antérieurs du calendrier : publier dans l'ordre des dates ne crée aucun lien cassé.
 * Lancer ensuite `npm run build` : le contrôle SEO (postbuild) vérifie l'ensemble.
 */
import { readFileSync, writeFileSync, renameSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { execFileSync } from 'node:child_process'

const ROOT = resolve(import.meta.dirname, '..')
const DRAFTS_FR = join(ROOT, 'content', 'drafts', 'fr')
const DRAFTS_AR = join(ROOT, 'content', 'drafts', 'ar')
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const untilIdx = args.indexOf('--until')
const until = untilIdx >= 0 ? args[untilIdx + 1] : new Date().toISOString().slice(0, 10)
if (!/^\d{4}-\d{2}-\d{2}$/.test(until)) throw new Error(`Date --until invalide : ${until}`)

function frontmatter(md) {
  const src = md.replace(/^﻿/, '')
  const end = src.indexOf('\n---', 3)
  const fm = {}
  for (const line of src.slice(3, end).split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
  return fm
}

const due = existsSync(DRAFTS_FR)
  ? readdirSync(DRAFTS_FR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const file = f.slice(0, -3)
        const fm = frontmatter(readFileSync(join(DRAFTS_FR, f), 'utf8'))
        return { file, title: fm.title, slug: fm.slug, date: fm.date, hasAr: existsSync(join(DRAFTS_AR, f)) }
      })
      .filter((d) => d.date && d.date <= until)
      .sort((a, b) => a.date.localeCompare(b.date) || a.file.localeCompare(b.file))
  : []

if (!due.length) {
  console.log(`[publish-drafts] aucun brouillon à publier jusqu'au ${until}`)
  process.exit(0)
}
for (const d of due) console.log(`[publish-drafts] ${d.date}  ${d.file}${d.hasAr ? '  (+ AR)' : ''}`)
if (dryRun) process.exit(0)

// 1. Déplacer les fichiers.
for (const d of due) {
  renameSync(join(DRAFTS_FR, `${d.file}.md`), join(ROOT, 'public', 'blog', `${d.file}.md`))
  if (d.hasAr) renameSync(join(DRAFTS_AR, `${d.file}.md`), join(ROOT, 'content', 'ar', `${d.file}.md`))
}

// 2. Registre des articles publiés.
const filesPath = join(ROOT, 'src', 'data', 'blogFiles.ts')
let files = readFileSync(filesPath, 'utf8')
const newFiles = due.filter((d) => !files.includes(`'${d.file}'`))
if (newFiles.length) {
  const i = files.lastIndexOf(']')
  files = files.slice(0, i).replace(/\s*$/, '\n') + newFiles.map((d) => `    '${d.file}',\n`).join('') + files.slice(i)
  writeFileSync(filesPath, files)
}

// 3. Pages arabes et hreflang.
const arPath = join(ROOT, 'src', 'data', 'arabicPages.ts')
let ar = readFileSync(arPath, 'utf8')
// Fin de la liste arabicArticles (fins de ligne LF ou CRLF selon le poste).
const anchor = /\]\r?\n\r?\nexport const arabicPages/
const newAr = due.filter((d) => d.hasAr && !ar.includes(`file: '${d.file}'`))
if (newAr.length) {
  if (!anchor.test(ar)) throw new Error('arabicPages.ts : fin de arabicArticles introuvable')
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const block = newAr.map((d) => `  { file: '${d.file}', title: '${esc(d.title)}' },\n`).join('')
  ar = ar.replace(anchor, (m) => block + m)
  writeFileSync(arPath, ar)
}

// 4. Index du blog.
execFileSync(process.execPath, [join(ROOT, 'scripts', 'generate-blog-index.mjs')], { cwd: ROOT, stdio: 'inherit' })

// 5. llms.txt et llms-full.txt : total et catalogue numéroté (partie 24 : articles 601 et suivants,
// y compris ceux de la veille d'actualité, numérotés à partir de 651).
const count = Number(readFileSync(join(ROOT, 'src', 'data', 'blogCount.ts'), 'utf8').match(/BLOG_POST_COUNT = (\d+)/)[1])
const registry = readFileSync(filesPath, 'utf8')
const HEAD = '### PARTIE 24 : Conformité, stocks, coûts, formation et actualité (601 et suivants)'
const published24 = [...registry.matchAll(/'([6-9]\d\d-[^']+)'/g)].map((m) => m[1])
for (const name of ['llms.txt', 'llms-full.txt']) {
  const p = join(ROOT, 'public', name)
  let t = readFileSync(p, 'utf8')
  t = t.replace(/(## Blog — Ressources Supply Chain \()\d+( articles\))/, `$1${count}$2`)
  t = t.replace(/(## Catalogue Blog — )\d+( Articles)/, `$1${count}$2`)
  if (name === 'llms-full.txt') {
    const lines = published24
      .map((file) => {
        const fm = frontmatter(readFileSync(join(ROOT, 'public', 'blog', `${file}.md`), 'utf8'))
        const arUrl = existsSync(join(ROOT, 'content', 'ar', `${file}.md`)) ? ` (version arabe : https://nextinotech.com/ar/blog/${file})` : ''
        return `- ${Number(file.slice(0, 3))} : ${fm.title} — https://nextinotech.com/blog/${fm.slug}${arUrl}\n`
      })
      .join('')
    const block = `${HEAD}\n\n${lines}\n`
    // Tout titre « PARTIE 24 » déjà présent est remplacé, quel que soit son libellé précédent.
    const re = /### PARTIE 24 : [^\r\n]*\r?\n\r?\n(?:- .*\r?\n)*\r?\n/
    t = re.test(t) ? t.replace(re, () => block) : t.replace("## Autorisation d'indexation", block + "## Autorisation d'indexation")
  }
  writeFileSync(p, t)
}
console.log(`[publish-drafts] ${due.length} article(s) publié(s) ; ${count} articles au total. Lancer npm run build pour vérifier.`)
