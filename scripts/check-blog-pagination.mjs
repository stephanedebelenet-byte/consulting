import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BLOG_INDEX } from '../src/data/blogIndex.ts'
import { BLOG_PAGE_COUNT, BLOG_PAGE_SIZE, blogPagePath, validBlogPage } from '../src/data/blogPagination.ts'
import { FEATURED_BLOG } from '../src/data/featuredBlog.ts'
import { trainingContactLink } from '../src/utils/trainingContactLink.ts'

const root = resolve(import.meta.dirname, '..')
const reachable = new Set()
for (let page = 1; page <= BLOG_PAGE_COUNT; page++) {
  const path = blogPagePath(page)
  const html = readFileSync(resolve(root, 'dist', path.slice(1), 'index.html'), 'utf8')
  assert.ok(html.includes(`rel="canonical" href="https://nextinotech.com${path}"`), `Canonical ${path}`)
  const expected = BLOG_INDEX.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE)
  assert.equal((html.match(/<article[ >]/g) || []).length, expected.length, `Nombre de cartes ${path}`)
  for (const post of expected) {
    assert.ok(html.includes(`href="/blog/${post.slug}"`), `Lien manquant ${post.slug}`)
    reachable.add(post.slug)
  }
  if (page < BLOG_PAGE_COUNT) assert.ok(html.includes(`href="${blogPagePath(page + 1)}"`), `Page suivante ${path}`)
  if (page > 1) assert.ok(html.includes(`href="${blogPagePath(page - 1)}"`), `Page précédente ${path}`)
  for (const post of FEATURED_BLOG) assert.ok(html.includes(`href="/blog/${post.slug}"`), 'Article mis en avant')
}
assert.equal(reachable.size, BLOG_INDEX.length, 'Tous les articles restent accessibles')
for (const invalid of ['0', '1', '-1', '01', '2.5', 'abc', String(BLOG_PAGE_COUNT + 1)]) assert.equal(validBlogPage(invalid), null)
assert.equal(validBlogPage(undefined), 1)
const audit = BLOG_INDEX.find((post) => post.file === '01-audit-supply-chain-2026')
const auditHtml = readFileSync(resolve(root, 'dist/blog', audit.slug, 'index.html'), 'utf8')
assert.ok(!auditHtml.includes('Audit Gratuit 2-3 Jours'))
assert.ok(auditHtml.includes('35–55k MAD HT'))
const wa = new URL(trainingContactLink('https://wa.me/212663449200?text=ancien', 'DDMRP & S&OP'))
assert.ok(wa.searchParams.get('text').includes('DDMRP & S&OP'))
const mail = new URL(trainingContactLink('mailto:contact@nextinotech.com?subject=ancien', 'Achats / Import', 'en'))
assert.ok(mail.searchParams.get('subject').includes('Achats / Import'))
assert.ok(mail.searchParams.get('body').startsWith('Hello'))
assert.equal(trainingContactLink('/formation/ddmrp', 'DDMRP'), '/formation/ddmrp')
console.log(JSON.stringify({ checkedPages: BLOG_PAGE_COUNT, linkedArticles: reachable.size,
  firstPageHtmlBytes: Buffer.byteLength(readFileSync(resolve(root, 'dist/blog/index.html'), 'utf8')), status: 'passed' }))
