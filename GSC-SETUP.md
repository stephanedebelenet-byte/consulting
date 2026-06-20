# Google Search Console Setup — Essor Consulting nextinotech.com

## Initial Setup

### Step 1: Add Property
- Go to [search.google.com/search-console](https://search.google.com/search-console)
- Click "Add Property"
- URL: `https://nextinotech.com`
- Verify ownership (DNS TXT record or HTML file upload)

### Step 2: Verify Site
**Via DNS TXT:**
```
TXT record: google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXX
```
Add to domain DNS provider (OVH, Namecheap, etc.)

**Via HTML File:**
- Download google-site-verification HTML file
- Upload to root `/` of website
- Verify in GSC

### Step 3: Submit Sitemap
```
URL: https://nextinotech.com/sitemap.xml
```
Submit in GSC → Sitemaps section

---

## Initial Configuration

### Settings
- **Crawl Rate:** Default (let Google decide)
- **User-Agent:** Allow all (default)
- **HTTPS:** Preferred (if SSL cert valid)
- **Country:** Morocco (if applicable)

### Verify Links
- Internal linking structure
- External links (quality backlinks)

---

## Baseline Metrics (Week 1-2)

### Capture Initial State
```
Date: 2026-06-21
- Total pages indexed: ___
- Keyword impressions (30 days): ___
- CTR average: ___
- Average position: ___
- Mobile usability issues: ___
```

### KPI to Track
- **Impressions:** Target +50% in 4 weeks
- **Clicks:** Target +200% in 8 weeks
- **CTR:** Target 15-20% (depends keywords)
- **Avg Position:** Top 10 target for 5+ keywords

---

## Content Indexing (Articles)

### Submit Articles URLs Manually
```
Week 1: blog/01-audit-*.md to blog/07-formation-*.md
Week 2: blog/08-consulting-*.md to blog/13-supply-chain-*.md
```

**Process:**
1. GSC → URL Inspection
2. Enter article URL
3. Click "Request Indexing"
4. Wait 24-48 hours for indexing

### Monitor Indexing Status
- GSC → Coverage
- Green = Indexed
- Yellow = Processing
- Red = Error (check robots.txt, canonical, etc)

---

## Keyword Monitoring Setup

### Add Keywords to Track (Manual for now)
```
Primary Keywords:
- "audit supply chain Maroc"
- "formation supply chain Maroc"
- "conseil logistique Casablanca"
- "WMS implémentation"
- "consulting supply chain Maroc"

Secondary Keywords (Regional):
- "consultant supply chain Rabat"
- "formation logistique Tanger"
- "supply chain Fès Meknès"
- "logistique Marrakech"
- "supply chain Afrique francophone"
```

### GSC Tracking
- GSC → Performance
- Filter by query
- Track ranking position + impressions/clicks

---

## Backlink Monitoring

### External Links to Build
```
Week 2-4: Reach out to
- Local business directories (Morocco)
- Supply chain associations
- B2B platforms
- Industry blogs
```

**Target:** 10-15 quality backlinks month 1

---

## Mobile & Core Web Vitals

### Check Mobile Usability
- GSC → Mobile Usability
- Ensure no errors
- Test with mobile emulator

### Core Web Vitals
- GSC → Core Web Vitals
- Monitor LCP, FID, CLS
- Target: All "Good"

---

## Monthly Reporting

### KPI Dashboard Template
```
Month: June 2026

Impressions: _____ (+___ vs baseline)
Clicks: _____ (+___ vs baseline)
CTR: ____% (vs __% baseline)
Top Keywords Ranking:
- audit supply chain: Position __
- formation supply chain: Position __
- conseil logistique: Position __

Indexed Pages: _____ (vs ____ baseline)
Coverage Issues: _____
Backlinks: _____

Next Month Focus:
- [ ] Publish __ articles
- [ ] Build __ backlinks
- [ ] Optimize __ pages for target keywords
- [ ] Fix __ mobile issues
```

---

## Tools Integration

### GA4 Integration
- GSC linked to GA4 property
- Track: Organic traffic, landing pages, conversions
- Events: Newsletter signup, contact form, calendar booking

### API Access (For Automation)
```bash
# GSC API endpoint
https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fnextinotech.com/searchanalytics/query

# Requires: OAuth 2.0 credential
```

---

## Automation Scripts (Python)

### Fetch GSC Data Weekly
```python
# fetch_gsc_data.py
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Load credentials from service account JSON
SCOPES = ['https://www.googleapis.com/auth/webmasters']
creds = Credentials.from_service_account_file('service_account.json', scopes=SCOPES)
webmasters = build('webmasters', 'v3', credentials=creds)

# Query GSC API for search analytics
request = {
    'startDate': '2026-06-21',
    'endDate': '2026-06-27',
    'dimensions': ['query', 'page', 'country'],
    'rowLimit': 25000,
}

response = webmasters.searchanalytics().query(siteUrl='https://nextinotech.com', body=request).execute()

# Export to CSV/JSON for reporting
for row in response.get('rows', []):
    print(f"Query: {row['keys'][0]}, Clicks: {row['clicks']}, Impressions: {row['impressions']}")
```

---

## Deadlines & Milestones

- **Week 1:** GSC property setup + verification + sitemap submission
- **Week 2:** Initial articles indexed + baseline metrics captured
- **Week 3-4:** Backlink building + keyword optimization
- **Week 8:** Publish landing pages + monitor rankings
- **Week 12:** Review 3-month performance vs target

---

## Next Steps

1. ✅ Setup GSC property & verify
2. ✅ Submit sitemap
3. ✅ Submit articles for indexing (manual or automated)
4. ✅ Monitor coverage & crawl stats
5. ✅ Track keyword rankings weekly
6. ✅ Report monthly performance

