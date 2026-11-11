import { readFileSync } from 'node:fs'
import { parseMarkdown } from '../src/utils/markdownParser.ts'
import { arabicPages } from '../src/data/arabicPages.ts'

const site = 'https://nextinotech.com'

function escapeHtml(value: string) {
  return value.replace(/[&<">]/g, char => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' })[char]!)
}

export function renderArabicPage(page: typeof arabicPages[number]) {
  const article = parseMarkdown(readFileSync('content/ar/' + page.file + '.md', 'utf8'))
  const titles: Record<string, string> = {
    'plf-2027-avance-importation': 'مشروع مالية 2027: محاكاة التسبيق عند الاستيراد',
  }
  const fullTitle = titles[page.file] ?? article.title
  const title = escapeHtml(fullTitle.length <= 60 ? fullTitle : fullTitle.slice(0, 57).replace(/\s+\S*$/, '') + '…')
  const description = escapeHtml(article.description ?? article.title)
  const url = site + page.ar
  const french = site + page.fr
  const isArticle = page.ar.startsWith('/ar/blog/')
  const structured = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'WebPage',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: url,
    inLanguage: 'ar',
    ...(isArticle ? { datePublished: article.date } : {}),
    publisher: { '@type': 'Organization', name: 'Nextinotech' },
  }).replaceAll('<', '\\u003c')

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ar" href="${url}">
<link rel="alternate" hreflang="fr" href="${french}">
<link rel="alternate" hreflang="fr-MA" href="${french}">
<link rel="alternate" hreflang="x-default" href="${french}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<script type="application/ld+json">${structured}</script>
<style>
:root{font-family:Tahoma,Arial,sans-serif;color:#173254;background:#f8f7f3;line-height:1.9}
body{margin:0}header,footer{background:#142e4d;color:#fff}nav,main{max-width:52rem;margin:auto;padding:1.25rem}
nav{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}nav strong{margin-inline-end:auto}
main{padding-block:2.5rem}h1{font-size:clamp(2rem,5vw,3.25rem);line-height:1.35}h2{line-height:1.5}
p,li{font-size:1.075rem}a{color:#175c99}nav a{color:inherit}a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
</style>
</head>
<body>
<header><nav aria-label="التنقل"><strong lang="en" dir="ltr">Nextinotech</strong><a href="/ar/conseil">الاستشارات</a><a href="/ar/formation">التكوين</a><a href="${french}" hreflang="fr" lang="fr">Français</a></nav></header>
<main><article>${article.htmlContent}</article></main>
<footer><nav aria-label="روابط إضافية"><a href="/ar/formation/douane-import-export">التكوين في الجمارك واللوجستيك الدولي</a><a href="/contact" hreflang="fr">تواصل مع الفريق</a></nav></footer>
</body>
</html>`
}
