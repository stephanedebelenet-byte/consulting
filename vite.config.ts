import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { getPrerenderRoutes, type PrerenderRoute } from './src/data/routeMeta'
import { slugify } from './src/utils/slugify'
import { EVENEMENTS } from './src/data/evenements'
import { BLOG_PRIORITY_OVERRIDES } from './src/data/blogSitemapOverrides'
import { parseMarkdown } from './src/utils/markdownParser'
import { BLOG_FILES } from './src/data/blogFiles'

// Registre des articles publiés (source unique, voir src/data/blogFiles.ts).
const PUBLISHED_BLOG_FILES = new Set(BLOG_FILES)

const SITE = 'https://nextinotech.com'

// Fichiers .md exclus du prérendu /blog/* car déplacés vers /evenements/
// (voir src/data/evenements.ts et l'audit UI/UX — ce sont des pages
// d'inscription à un webinaire, pas des articles éditoriaux).
const EVENEMENT_FILES = new Set(EVENEMENTS.map((e) => e.file))

// Ressources hors routes React (fichiers texte statiques) mais qui doivent
// tout de même figurer dans le sitemap généré.
const SITEMAP_EXTRAS: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [
  { loc: '/llms.txt', lastmod: '2026-08-05', changefreq: 'monthly', priority: 0.6 },
  { loc: '/llms-full.txt', lastmod: '2026-08-05', changefreq: 'monthly', priority: 0.6 },
]

/* ── Articles de blog : scan des .md + génération d'un HTML statique par article ── */

function blogSlug(title: string): string {
  return slugify(title)
}

function parseFrontmatter(md: string): Record<string, string> {
  const fm: Record<string, string> = {}
  const src = md.replace(/^﻿/, '')
  if (!src.startsWith('---')) return fm
  const end = src.indexOf('\n---', 3)
  if (end < 0) return fm
  for (const line of src.slice(3, end).split('\n')) {
    const i = line.indexOf(':')
    if (i < 0) continue
    const k = line.slice(0, i).trim()
    const v = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (k) fm[k] = v
  }
  return fm
}

export function getBlogRoutes(): PrerenderRoute[] {
  const dir = resolve('public/blog')
  const out: PrerenderRoute[] = []
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue
    if (EVENEMENT_FILES.has(file.replace(/\.md$/, ''))) continue
    // Article absent du registre = dépublié : ni page, ni sitemap, ni contenu
    // statique. Sans ce filtre, les 11 études de cas retirées le 21/08/2026
    // pour risque juridique restaient servies en texte intégral.
    if (!PUBLISHED_BLOG_FILES.has(file.replace(/\.md$/, ''))) continue
    const raw = readFileSync(join(dir, file), 'utf-8')
    const fm = parseFrontmatter(raw)
    if (!fm.title) continue
    // Corps de l'article converti en HTML au build (même parseur que celui
    // utilisé côté client dans Blog.tsx), pour l'injecter dans le <body> de
    // la page prérendue — voir bodyHtml sur PrerenderRoute. Sans ça, la page
    // prérendue de l'article n'a aucun texte, seulement son <head> : c'est la
    // cause du blocage d'indexation Google identifié le 22/09/2026 (359+
    // pages en "Détectée, actuellement non indexée").
    const { htmlContent } = parseMarkdown(raw)
    const slug = blogSlug(fm.title)
    const url = `${SITE}/blog/${slug}`
    const image = fm.image ? (fm.image.startsWith('http') ? fm.image : SITE + fm.image) : `${SITE}/logo-full.png`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${url}#article`,
          headline: fm.title,
          description: fm.description || '',
          datePublished: fm.date || undefined,
          dateModified: fm.date || undefined,
          author: {
            '@type': 'Person',
            '@id': `${SITE}/#youssef-b`,
            name: fm.author || 'Youssef B',
            jobTitle: 'Fondateur',
            worksFor: { '@id': `${SITE}/#organization` },
            url: `${SITE}/#profil`,
          },
          publisher: { '@id': `${SITE}/#organization` },
          image,
          inLanguage: 'fr',
          mainEntityOfPage: url,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
            { '@type': 'ListItem', position: 3, name: fm.title, item: url },
          ],
        },
        // Articles question/réponse (frontmatter schema: "FAQPage") : même
        // FAQPage que celui construit côté client par Blog.tsx
        // (buildArticleSchema), jusqu'ici absent du HTML prérendu.
        ...(fm.schema === 'FAQPage'
          ? [{
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: [{
                '@type': 'Question',
                name: fm.title,
                acceptedAnswer: { '@type': 'Answer', text: fm.quickAnswer || fm.description || fm.title },
              }],
            }]
          : []),
      ],
    }
    out.push({
      path: `/blog/${slug}`,
      title: fm.title.length <= 52 ? `${fm.title} | Nextinotech` : fm.title,
      description: fm.description || fm.title,
      jsonLd: [jsonLd],
      priority: BLOG_PRIORITY_OVERRIDES[slug] ?? 0.7,
      changefreq: 'yearly',
      lastmod: fm.date || undefined,
      bodyHtml: htmlContent,
    })
  }
  return out
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function canonicalFor(path: string): string {
  return SITE + (path === '/' ? '/' : path)
}

function setMetaTag(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const esc = escapeHtml(content)
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${esc}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n</head>`)
}

function setLinkTag(html: string, rel: string, href: string): string {
  const re = new RegExp(`<link rel="${rel}"[^>]*>`, 'i')
  const tag = `<link rel="${rel}" href="${href}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n</head>`)
}

function setHreflang(html: string, lang: string, href: string): string {
  const re = new RegExp(`<link rel="alternate" hreflang="${lang}"[^>]*>`, 'i')
  const tag = `<link rel="alternate" hreflang="${lang}" href="${href}" />`
  return re.test(html) ? html.replace(re, tag) : html
}

function renderRoute(shell: string, route: PrerenderRoute): string {
  let html = shell
  const url = canonicalFor(route.path)
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  html = setMetaTag(html, 'name', 'description', route.description)
  html = setLinkTag(html, 'canonical', url)
  html = setHreflang(html, 'fr-MA', url)
  html = setHreflang(html, 'fr', url)
  html = setHreflang(html, 'x-default', url)
  html = setMetaTag(html, 'property', 'og:title', route.title)
  html = setMetaTag(html, 'property', 'og:description', route.description)
  html = setMetaTag(html, 'property', 'og:url', url)
  html = setMetaTag(html, 'name', 'twitter:title', route.title)
  html = setMetaTag(html, 'name', 'twitter:description', route.description)
  if (route.jsonLd && route.jsonLd.length) {
    const blocks = route.jsonLd
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
      .join('\n')
    html = html.replace('</head>', `${blocks}\n</head>`)
  }
  if (route.bodyHtml) {
    // Contenu statique pour les crawlers qui ne rendent pas le JS (GPTBot,
    // ClaudeBot, PerplexityBot, Bytespider — explicitement autorisés dans
    // robots.txt — et Googlebot en première passe). Sans risque de mismatch
    // d'hydratation : src/main.tsx utilise createRoot (pas hydrateRoot), qui
    // remplace intégralement ce contenu dès que le bundle React s'exécute.
    // Classe "blog-content" alignée sur celle utilisée par Blog.tsx (rendu
    // client réel) — stylée dans src/index.css — pour un rendu correct avant
    // hydratation, et non un simple mur de texte non stylé. Le H1 de
    // l'article vient de bodyHtml lui-même (chaque .md du blog commence par
    // "# Titre" dans son corps, converti en <h1 class="blog-h1"> par
    // parseMarkdown) : ne pas ajouter de second H1 ici.
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><article><div class="blog-content">${route.bodyHtml}</div></article></div>`
    )
  }
  // Les pages "app" (sans bodyHtml) gardent ici un <div id="root"></div> vide :
  // leur body est rempli après coup par scripts/prerender-app-bodies.mjs, à
  // partir du bundle SSR (vite build --ssr src/entry-server.tsx). Voir
  // package.json → "build".
  return html
}

function render404(shell: string): string {
  let html = shell
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Page introuvable | Nextinotech</title>')
  html = setMetaTag(html, 'name', 'description', "Cette adresse n'existe pas ou n'existe plus sur nextinotech.com.")
  html = setMetaTag(html, 'name', 'robots', 'noindex, follow')
  html = html.replace(/\s*<link rel="canonical"[^>]*>/gi, '')
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/gi, '')
  html = html.replace(/\s*<meta property="og:url"[^>]*>/gi, '')
  return html
}

/* ── Sitemap : généré depuis la même liste de routes que le prérendu, pour
   qu'aucune page réelle ne puisse manquer au sitemap (voir audit UI/UX —
   avant ce changement, public/sitemap.xml était un fichier statique
   recopié à la main, à l'origine de plusieurs oublis constatés). ── */

function formatPriority(p: number | undefined): string {
  const n = p ?? 0.6
  // Number.toFixed(1) arrondirait 0.85 → "0.8" et 0.95 → "0.9" (perte de
  // précision sur les valeurs à 2 décimales reprises telles quelles du
  // sitemap précédent) — on préserve donc la valeur exacte, en ne forçant
  // qu'un ".0" pour les entiers (1 → "1.0", comme la convention du site).
  return Number.isInteger(n) ? n.toFixed(1) : String(n)
}

function generateSitemapXML(routes: PrerenderRoute[]): string {
  const urlTag = (loc: string, lastmod: string | undefined, changefreq: string | undefined, priority: number | undefined) => {
    const parts = [`<loc>${escapeHtml(loc)}</loc>`]
    if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`)
    parts.push(`<changefreq>${changefreq ?? 'monthly'}</changefreq>`)
    parts.push(`<priority>${formatPriority(priority)}</priority>`)
    return `  <url>${parts.join('')}</url>`
  }

  const routeUrls = routes.map((r) =>
    urlTag(canonicalFor(r.path), r.lastmod, r.changefreq, r.priority)
  )
  const extraUrls = SITEMAP_EXTRAS.map((e) =>
    urlTag(SITE + e.loc, e.lastmod, e.changefreq, e.priority)
  )

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...routeUrls, ...extraUrls].join('\n')}\n</urlset>\n`
}

/* ── Complétude llms.txt : toute page isOffer (et non hidden) doit être
   référencée par son URL dans public/llms.txt et public/llms-full.txt.
   Exporté pour être réutilisé par scripts/check-seo-consistency.mjs. ── */
export function getOfferRoutes(): PrerenderRoute[] {
  return [...getPrerenderRoutes(), ...getBlogRoutes()].filter((r) => r.isOffer && !r.hidden)
}

function prerenderHeads(): Plugin {
  return {
    name: 'nxt-prerender-heads',
    // Build client uniquement : le build SSR (src/entry-server.tsx, voir
    // package.json) ne doit pas relancer le prérendu ni régénérer le sitemap.
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
    closeBundle() {
      const dist = resolve('dist')
      let shell: string
      try {
        shell = readFileSync(join(dist, 'index.html'), 'utf-8')
      } catch {
        this.warn('prerender-heads: dist/index.html introuvable, prérendu ignoré')
        return
      }
      let count = 0
      const routes = [...getPrerenderRoutes(), ...getBlogRoutes()]
      for (const route of routes) {
        try {
          const html = renderRoute(shell, route)
          const rel = route.path.replace(/^\//, '').replace(/\/$/, '')
          const outDir = rel === '' ? dist : join(dist, rel)
          mkdirSync(outDir, { recursive: true })
          writeFileSync(join(outDir, 'index.html'), html, 'utf-8')
          count++
        } catch (e) {
          this.warn(`prerender-heads: échec sur ${route.path} — ${(e as Error).message}`)
        }
      }
      // Page d'erreur servie par Vercel avec un vrai statut 404 pour toute
      // adresse inexistante (plus de réécriture "tout vers index.html" dans
      // vercel.json). noindex, et ni canonical ni hreflang : elle ne doit
      // jamais être prise pour une page du site. Son <body> est rempli par
      // scripts/prerender-app-bodies.mjs (rendu de NotFoundPage).
      writeFileSync(join(dist, '404.html'), render404(shell), 'utf-8')

      this.info?.(`prerender-heads: ${count} pages générées`)
      // eslint-disable-next-line no-console
      console.log(`\n[prerender-heads] ${count} pages HTML générées avec <head> statique`)

      const sitemap = generateSitemapXML(routes)
      writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf-8')
      const urlCount = routes.length + SITEMAP_EXTRAS.length
      // eslint-disable-next-line no-console
      console.log(`[prerender-heads] sitemap.xml généré (${urlCount} URLs)`)

      // Liste des pages « offre » (isOffer && !hidden), matérialisée en JSON pour
      // que scripts/check-seo-consistency.mjs (Node pur, sans support TS) puisse
      // vérifier leur présence dans llms.txt / llms-full.txt sans réimporter ce
      // fichier de config. Écrit hors de dist/ : artefact de build interne, pas
      // un fichier à déployer (voir .gitignore).
      const offerPaths = getOfferRoutes().map((r) => r.path)
      writeFileSync(resolve('.offers-manifest.json'), JSON.stringify(offerPaths, null, 2), 'utf-8')
    },
  }
}

// Bibliothèques stables isolées dans leurs propres fichiers (build client
// uniquement). Le site est redéployé plusieurs fois par jour : sans ce
// découpage, chaque déploiement changeait le hash de l'unique bundle de
// 1,2 Mo et forçait les visiteurs à tout retélécharger. Désormais seul le
// code applicatif change de hash ; ces fichiers restent en cache navigateur
// (Cache-Control immutable sur /assets/, voir vercel.json).
// Les dépendances chargées à la demande (jspdf, html2canvas) ne sont pas
// listées ici, pour ne pas les faire entrer dans le chargement initial.
const VENDOR_GROUPS = [
  { name: 'vendor-react', test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
  { name: 'vendor-motion', test: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
  { name: 'vendor-gsap', test: /[\\/]node_modules[\\/](gsap|lenis)[\\/]/ },
  { name: 'vendor-icons', test: /[\\/]node_modules[\\/]@tabler[\\/]/ },
]

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), prerenderHeads()],
  build: isSsrBuild
    ? {}
    : { rolldownOptions: { output: { codeSplitting: { groups: VENDOR_GROUPS } } } },
}))
