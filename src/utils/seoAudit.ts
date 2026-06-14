// SEO Audit Checklist & Utilities

export interface SEOAuditReport {
  headingHierarchy: string[]
  metaTags: { [key: string]: string }
  schemas: string[]
  images: Array<{ src: string; alt: string; isDecorative: boolean }>
  internalLinks: string[]
  issues: string[]
}

export function auditPageSEO(): SEOAuditReport {
  const report: SEOAuditReport = {
    headingHierarchy: [],
    metaTags: {},
    schemas: [],
    images: [],
    internalLinks: [],
    issues: [],
  }

  // Check heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headings.forEach(h => {
    report.headingHierarchy.push(`${h.tagName}: ${h.textContent?.substring(0, 50)}`)
  })

  // Check meta tags
  const metaTags = document.querySelectorAll('meta')
  metaTags.forEach(tag => {
    const name = tag.getAttribute('name') || tag.getAttribute('property')
    const content = tag.getAttribute('content')
    if (name && content) {
      report.metaTags[name] = content
    }
  })

  // Check JSON-LD schemas
  const schemas = document.querySelectorAll('script[type="application/ld+json"]')
  schemas.forEach(s => {
    try {
      const data = JSON.parse(s.textContent || '{}')
      report.schemas.push(data['@type'] || 'unknown')
    } catch (e) {
      report.issues.push(`Invalid JSON-LD schema: ${e}`)
    }
  })

  // Check images
  const images = document.querySelectorAll('img')
  images.forEach(img => {
    const alt = img.getAttribute('alt') || ''
    const isDecorative = img.getAttribute('aria-hidden') === 'true'
    report.images.push({
      src: img.src,
      alt,
      isDecorative,
    })
    if (!isDecorative && !alt) {
      report.issues.push(`Missing alt text: ${img.src}`)
    }
  })

  // Check internal links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    const href = link.getAttribute('href') || ''
    report.internalLinks.push(href)
  })

  // Check for h1
  const h1s = document.querySelectorAll('h1')
  if (h1s.length === 0) {
    report.issues.push('Missing h1 tag')
  } else if (h1s.length > 1) {
    report.issues.push(`Multiple h1 tags (${h1s.length}) - should be only one`)
  }

  // Check canonical
  const canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    report.issues.push('Missing canonical tag')
  }

  return report
}

export function logSEOReport(report: SEOAuditReport) {
  console.group('📊 SEO Audit Report')
  console.log('Headings:', report.headingHierarchy)
  console.log('Schemas detected:', report.schemas)
  console.log('Meta tags:', report.metaTags)
  console.log('Images:', report.images.length, 'total')
  console.log('Internal links:', report.internalLinks)
  if (report.issues.length > 0) {
    console.warn('⚠️  Issues found:', report.issues)
  } else {
    console.log('✅ No issues found')
  }
  console.groupEnd()
}

export const SEO_CHECKLIST = {
  'Meta Tags': [
    '✓ Title tag (50-60 chars)',
    '✓ Meta description (120-160 chars)',
    '✓ Viewport tag',
    '✓ Canonical tag',
    '✓ Robots meta',
    '✓ Open Graph tags',
    '✓ Twitter Card tags',
    '✓ hreflang tags',
  ],
  'Structured Data': [
    '✓ Organization schema',
    '✓ Breadcrumb schema',
    '✓ WebPage schema',
    '✓ Service/Product schema',
    '✓ LocalBusiness schema (optional)',
  ],
  'Semantic HTML': [
    '✓ Single h1 per page',
    '✓ Proper h2-h6 hierarchy',
    '✓ Section tags for major content',
    '✓ Nav, main, article tags',
    '✓ Proper list markup',
  ],
  'Images': [
    '✓ Descriptive alt text (non-decorative)',
    '✓ Proper image formats (WebP, lazy loading)',
    '✓ Image compression & optimization',
    '✓ Title attributes where helpful',
  ],
  'Links': [
    '✓ Descriptive anchor text',
    '✓ Internal linking structure',
    '✓ No broken internal links',
    '✓ External links to quality sites',
  ],
  'Performance': [
    '✓ Core Web Vitals optimized',
    '✓ Mobile responsiveness',
    '✓ Page speed (lighthouse)',
  ],
  'Sitemap & Robots': [
    '✓ Sitemap.xml submitted',
    '✓ robots.txt configured',
    '✓ All sections included',
  ],
}
