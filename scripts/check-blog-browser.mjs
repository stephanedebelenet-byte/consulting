// Démarrer npm run preview -- --host 127.0.0.1 --port 4173 avant ce test.
import { chromium } from 'playwright'
import assert from 'node:assert/strict'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
const markdownRequests = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('request', (request) => { if (/\/blog\/[^/]+\.md(?:\?|$)/.test(request.url())) markdownRequests.push(request.url()) })
try {
  await page.goto('http://127.0.0.1:4173/blog', { waitUntil: 'networkidle' })
  console.log('Liste initiale chargée')
  assert.equal(await page.locator('article').count(), 18)
  assert.equal(markdownRequests.length, 0, 'La liste ne télécharge aucun corps Markdown')
  await page.getByRole('navigation', { name: 'Pagination des articles' }).getByRole('link', { name: 'Page 2', exact: true }).click()
  await page.waitForURL('**/blog/page/2')
  await page.waitForLoadState('networkidle')
  console.log('Page 2 chargée')
  assert.equal(await page.locator('article').count(), 18)
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://nextinotech.com/blog/page/2')
  const article = page.locator('article h3 a').first()
  const articlePath = await article.getAttribute('href')
  await article.click()
  await page.waitForURL(`**${articlePath}`)
  await page.locator('.blog-content').first().waitFor()
  assert.ok((await page.locator('.blog-content').first().innerText()).trim().length > 100)
  console.log('Article chargé', articlePath)
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://nextinotech.com${articlePath}`)
  assert.equal(markdownRequests.length, 1, 'Un seul corps Markdown pour ouvrir un article')
  await page.getByRole('button', { name: 'Fermer', exact: true }).click()
  await page.waitForURL('**/blog/page/2')
  console.log('Retour page 2 confirmé')
  assert.equal(await page.locator('article').count(), 18)
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://nextinotech.com/blog/page/2')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:4173/blog', { waitUntil: 'networkidle' })
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Pas de débordement horizontal mobile')
  await page.locator('article').first().scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)
  await page.goto('http://127.0.0.1:4173/formation/ddmrp', { waitUntil: 'networkidle' })
  const wa = await page.getByRole('link', { name: 'Demander via WhatsApp →' }).getAttribute('href')
  assert.match(new URL(wa).searchParams.get('text'), /DDMRP/i)
  assert.deepEqual(errors, [], 'Aucune exception JavaScript')
  const result = { status: 'passed', listingCards: 18, markdownRequestsOnListing: 0, markdownRequestsToOpenArticle: 1,
    paginationBackNavigation: true, mobileHorizontalOverflow: false, trainingProgrammeInWhatsApp: true, javascriptErrors: errors }
  console.log(JSON.stringify(result))
} finally {
  await browser.close()
}
