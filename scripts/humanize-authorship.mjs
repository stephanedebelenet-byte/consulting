#!/usr/bin/env node
/**
 * Humanize authorship signals across public/blog/*.md
 *
 * Contexte : 411 articles partagent le même auteur frontmatter ("Nextinotech",
 * une marque, pas une personne) et 250 d'entre eux se terminent par un
 * paragraphe de clôture strictement identique au caractère près (pattern A :
 * "Directeur des Achats" signé "Nextinotech" — 15 fichiers ; pattern B :
 * "Contact : ... / 20+ ans d'expertise..." — 235 fichiers). C'est un signal
 * de contenu généré en masse que Google (helpful content / E-E-A-T) et un
 * lecteur humain détectent facilement.
 *
 * Ce script :
 *   1. Remplace `author: "Nextinotech"` par `author: "Youssef B"`
 *      (le vrai fondateur, cf. CLAUDE.md) dans le frontmatter YAML.
 *   2. Remplace le sign-off "Directeur des Achats" (titre inventé, jamais
 *      utilisé ailleurs sur le site) par un signature exacte et cohérente
 *      avec CLAUDE.md.
 *   3. Remplace le footer identique (Contact/20+ ans) par une rotation de 5
 *      variantes qui gardent exactement les mêmes faits (20+ ans, 110+
 *      missions, 0 commission, contact@nextinotech.com, +212 06 63 44 92 00)
 *      mais avec une formulation différente — pour casser la duplication de
 *      contenu sans jamais inventer un chiffre ou un fait.
 *
 * Idempotent : peut être relancé sans dupliquer les changements.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { createHash } from 'node:crypto'

const ROOT = resolve(import.meta.dirname, '..')
const BLOG_DIR = join(ROOT, 'public', 'blog')

const PHONE = '+212 06 63 44 92 00'
const EMAIL = 'contact@nextinotech.com'

const NL = '\\r?\\n'
const PATTERN_A = new RegExp(
  `\\*\\*Nextinotech\\*\\*  ${NL}Directeur des Achats \\| Expert Supply Chain & Transformation Digitale  ${NL}Nextinotech — Casablanca, Maroc  ${NL}📧 contact@nextinotech\\.com \\| 📞 \\+212 663 449 200`
)

function patternAReplacement() {
  return [
    '**Youssef B**',
    'Fondateur, Nextinotech — Expert Supply Chain & Transformation Digitale',
    'Casablanca, Maroc',
    `📧 ${EMAIL} | 📞 ${PHONE}`,
  ].join('  \r\n')
}

const PATTERN_B = new RegExp(
  `\\*\\*Contact :\\*\\* ${EMAIL.replace('.', '\\.')} \\| \\+212 06 63 44 92 00${NL}${NL}---${NL}${NL}\\*20\\+ ans d'expertise terrain\\. 110\\+ missions\\. 0 commission\\.\\*`
)

function crlf(s) {
  return s.replace(/\n/g, '\r\n')
}

const FOOTER_VARIANTS = [
  crlf(`**Une question sur votre situation ?** Écrivez-moi directement : ${EMAIL} ou ${PHONE}.\n\n---\n\n*Youssef B — 20+ ans de terrain, 110+ missions, 0 commission éditeur.*`),
  crlf(`Pour en discuter concrètement, contactez Nextinotech : ${EMAIL} | ${PHONE}.\n\n---\n\n*Nextinotech accompagne les entreprises marocaines en supply chain depuis plus de 20 ans, sans commission sur les outils recommandés.*`),
  crlf(`**Un besoin précis ?** Le premier échange est gratuit et sans engagement : ${EMAIL} — ${PHONE}.\n\n---\n\n*110+ missions menées sur le terrain marocain. 0 commission éditeur, uniquement l'intérêt du client.*`),
  crlf(`Contactez-moi pour en parler : ${EMAIL} | ${PHONE}.\n\n---\n\n*Youssef B, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*`),
  crlf(`**Nextinotech** — ${EMAIL} | ${PHONE}\n\n---\n\n*20+ ans de missions terrain, 110+ références, 0 commission sur les solutions recommandées.*`),
]

function variantFor(filename) {
  const hash = createHash('sha1').update(filename).digest()
  return hash[0] % FOOTER_VARIANTS.length
}

function processFile(filename) {
  const path = join(BLOG_DIR, filename)
  let content = readFileSync(path, 'utf8')
  let changed = false

  // 1. Author frontmatter
  if (content.includes('author: "Nextinotech"')) {
    content = content.replace('author: "Nextinotech"', 'author: "Youssef B"')
    changed = true
  }

  // 2. Pattern A sign-off
  if (PATTERN_A.test(content)) {
    content = content.replace(PATTERN_A, patternAReplacement())
    changed = true
  }

  // 3. Pattern B footer, rotated deterministically per file
  if (PATTERN_B.test(content)) {
    const variant = FOOTER_VARIANTS[variantFor(filename)]
    content = content.replace(PATTERN_B, variant)
    changed = true
  }

  // 4. Loose variants of the pattern-A sign-off (older articles, 01-15):
  //    fix the invented job title and the standalone brand-as-signature line.
  const jobTitleLine = /Directeur des Achats \| Expert Supply Chain & Transformation Digitale/g
  if (jobTitleLine.test(content)) {
    content = content.replace(jobTitleLine, 'Fondateur, Nextinotech — Expert Supply Chain & Transformation Digitale')
    changed = true
  }
  const brandCityLine = /Nextinotech — Casablanca, Maroc/g
  if (brandCityLine.test(content)) {
    content = content.replace(brandCityLine, 'Youssef B — Casablanca, Maroc')
    changed = true
  }
  const standaloneBrandSignoff = /^\*\*Nextinotech\*\*[ \t]*$/gm
  if (standaloneBrandSignoff.test(content)) {
    content = content.replace(standaloneBrandSignoff, '**Youssef B**')
    changed = true
  }

  // 5. Old internal link bug: /formation-rl/ (trailing slash) triggers an
  //    unnecessary internal 308 redirect — the canonical form has no slash
  //    (see AUDIT_INDEXATION_REEL.md). Fix leftover links in article bodies.
  if (content.includes('/formation-rl/')) {
    content = content.split('/formation-rl/').join('/formation-rl')
    changed = true
  }

  if (changed) {
    writeFileSync(path, content, 'utf8')
  }
  return changed
}

function main() {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
  let authorFixed = 0
  let footerRotated = 0
  let touched = 0

  for (const filename of files) {
    const path = join(BLOG_DIR, filename)
    const before = readFileSync(path, 'utf8')
    const hadAuthorIssue = before.includes('author: "Nextinotech"')
    const hadFooterIssue = PATTERN_A.test(before) || PATTERN_B.test(before)

    const didChange = processFile(filename)
    if (didChange) touched++
    if (hadAuthorIssue) authorFixed++
    if (hadFooterIssue) footerRotated++
  }

  console.log(`[humanize-authorship] ${files.length} articles scannés.`)
  console.log(`[humanize-authorship] ${authorFixed} bylines corrigés (Nextinotech -> Youssef B).`)
  console.log(`[humanize-authorship] ${footerRotated} footers dé-dupliqués / signature corrigée.`)
  console.log(`[humanize-authorship] ${touched} fichiers modifiés au total.`)
}

main()
