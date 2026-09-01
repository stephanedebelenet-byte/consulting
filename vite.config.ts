import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { getPrerenderRoutes, type PrerenderRoute } from './src/data/routeMeta'

const SITE = 'https://nextinotech.com'

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

function renderRoute(shell: string, route: PrerenderRoute): string {
  let html = shell
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  html = setMetaTag(html, 'name', 'description', route.description)
  html = setLinkTag(html, 'canonical', canonicalFor(route.path))
  html = setMetaTag(html, 'property', 'og:title', route.title)
  html = setMetaTag(html, 'property', 'og:description', route.description)
  html = setMetaTag(html, 'property', 'og:url', canonicalFor(route.path))
  html = setMetaTag(html, 'name', 'twitter:title', route.title)
  html = setMetaTag(html, 'name', 'twitter:description', route.description)
  if (route.jsonLd && route.jsonLd.length) {
    const blocks = route.jsonLd
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
      .join('\n')
    html = html.replace('</head>', `${blocks}\n</head>`)
  }
  return html
}

function prerenderHeads(): Plugin {
  return {
    name: 'nxt-prerender-heads',
    apply: 'build',
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
      for (const route of getPrerenderRoutes()) {
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
      this.info?.(`prerender-heads: ${count} pages générées`)
      // eslint-disable-next-line no-console
      console.log(`\n[prerender-heads] ${count} pages HTML générées avec <head> statique`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderHeads()],
})
