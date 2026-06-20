# GA4 + GSC Setup — nextinotech.com

## Part 1: Google Search Console (GSC) Verification

### Step 1: Create GSC Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://nextinotech.com`
4. Choose verification method

### Step 2: Verify Ownership (Choose One)

**Method A: DNS TXT Record (Recommended)**
```
TXT Record: google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXX
```
- Add to domain registrar DNS settings
- Wait 24-48 hours for propagation
- Return to GSC → Click "Verify"

**Method B: HTML File Upload**
- Download verification HTML file
- Upload to website root directory `/`
- Return to GSC → Click "Verify"

**Method C: Google Tag Manager**
- If GTM already setup, can verify via GTM container

### Step 3: Submit Sitemap
```
URL: https://nextinotech.com/sitemap.xml
```
- GSC → Sitemaps section
- Paste URL → Submit
- Wait 24-48 hours for indexing

### Step 4: Configure Settings
- **Preferred Domain:** nextinotech.com (non-www)
- **Crawl Rate:** Leave default (Google optimizes)
- **User-Agent Blocking:** None
- **HTTPS:** Preferred (if SSL cert valid)

---

## Part 2: Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Fill in details:
   - Property name: `Essor Consulting (nextinotech.com)`
   - Reporting timezone: Africa/Casablanca
   - Currency: MAD
   - Industry: Professional Services
   - Business size: Small (50-499 employees)

### Step 2: Create Data Stream
1. Property → Data Streams
2. Click "Add Stream"
3. Select: **Web**
4. Enter details:
   - Website URL: `https://nextinotech.com`
   - Stream name: `nextinotech.com`
5. Click "Create Stream"

### Step 3: Install GA4 Tracking Code

**Tracking ID:** Copy from Data Stream (format: G-XXXXXXXXXX)

**Option A: Google Tag Manager (Recommended)**
```
Tag Manager Container ID: GTM-XXXXXXXX
```
Install GTM snippet in `<head>` of all pages

**Option B: Direct Installation**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Add to `<head>` of every page or in React `_app.tsx` / `main.tsx`

**Option C: React Integration (Preferred for Vite)**
```bash
npm install @react-google-analytics/core
```

In `main.tsx`:
```typescript
import { GoogleAnalytics } from '@react-google-analytics/core';

ReactDOM.render(
  <GoogleAnalytics trackingId="G-XXXXXXXXXX">
    <App />
  </GoogleAnalytics>,
  document.getElementById('root')
);
```

### Step 4: Test Installation
1. GA4 → DebugView
2. Open website in new tab
3. Should see real-time sessions appearing
4. If not: Check JS console for errors

---

## Part 3: Connect GA4 to GSC

### Step 1: GSC Integration in GA4
1. GA4 Admin → Data Streams
2. Select nextinotech.com stream
3. Scroll to "Enhanced Measurement"
4. Enable all events:
   - Page views ✓
   - Scrolls ✓
   - Outbound clicks ✓
   - Site search ✓
   - Video engagement ✓
   - File downloads ✓
   - Form submissions ✓

### Step 2: Link GSC to GA4
1. GA4 Admin → Product Links
2. Click "Link" → Search Console
3. Select GSC property (nextinotech.com)
4. Confirm linking
5. Wait 24 hours for data sync

---

## Part 4: Setup Conversion Tracking

### Conversion 1: Contact Form Submission
```javascript
// Fire when contact form submitted
gtag('event', 'contact_form_submit', {
  'event_category': 'engagement',
  'event_label': 'Contact Form',
  'value': 1
});
```

### Conversion 2: Webinaire Registration
```javascript
gtag('event', 'webinaire_signup', {
  'event_category': 'engagement',
  'event_label': 'Webinaire Signup',
  'value': 1,
  'webinaire_name': 'Transformation 90J'
});
```

### Conversion 3: Case Study Download
```javascript
gtag('event', 'case_study_download', {
  'event_category': 'engagement',
  'event_label': 'Case Study: Textile PME',
  'value': 1
});
```

### Conversion 4: Blog Article Read (Session > 2min)
```javascript
// Auto-tracked via Enhanced Measurement
// Or custom event if needed:
gtag('event', 'blog_read', {
  'event_category': 'engagement',
  'event_label': document.title,
  'value': 1
});
```

### Setup Conversion Goals
1. GA4 Admin → Conversions
2. Click "New Conversion Event"
3. Add each event name:
   - `contact_form_submit`
   - `webinaire_signup`
   - `case_study_download`
   - `blog_read`

---

## Part 5: Setup Custom Events

### Event 1: Blog Article Engagement
```javascript
// Track time on blog article
window.addEventListener('scroll', function() {
  if (scrollPercentage > 50) {
    gtag('event', 'blog_scroll_50', {
      'event_category': 'engagement',
      'event_label': 'Article: ' + document.title,
      'scroll_depth': scrollPercentage
    });
  }
});
```

### Event 2: Newsletter Signup
```javascript
gtag('event', 'newsletter_signup', {
  'event_category': 'engagement',
  'event_label': 'Newsletter',
  'value': 1
});
```

### Event 3: Outbound Link Click (External)
```javascript
// Auto-tracked with Enhanced Measurement
// Or manual:
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function() {
    gtag('event', 'outbound_click', {
      'event_category': 'engagement',
      'event_label': this.href,
      'value': 1
    });
  });
});
```

---

## Part 6: Setup Audiences

### Audience 1: Blog Readers
- Event: `blog_read`
- Duration: Last 30 days
- Purpose: Remarketing

### Audience 2: Webinaire Interested
- Event: `webinaire_signup` OR visit `/webinaire/*`
- Duration: Last 60 days

### Audience 3: Contact Form Submitters
- Event: `contact_form_submit`
- Duration: Last 90 days
- Purpose: Sales follow-up

---

## Part 7: Dashboard Setup

### Dashboard 1: Overview
Widgets:
- Total Users (vs last month)
- Sessions (vs last month)
- Bounce Rate
- Avg. Session Duration
- Conversion Rate (all goals)
- Top Pages
- Top Referrers
- Traffic by Device

### Dashboard 2: Content Performance
- Page Views by Article
- Avg. Engagement Time per Article
- Blog Scroll Depth (50%+)
- Downloads (Case Studies)
- Exit Pages

### Dashboard 3: Conversions
- Conversion Events (all types)
- Conversion Rate by Source
- Top Converting Pages
- Conversion Funnel (Contact Form)

### Dashboard 4: Organic Search
- Organic Traffic
- Top Organic Keywords (from GSC)
- Landing Pages (organic)
- Avg. Position (from GSC)

---

## Part 8: Integration with Marketing Tools

### Mailchimp (Email Marketing)
1. GA4 Admin → Data Import
2. Setup user list import
3. Export newsletter subscribers from Mailchimp → Import to GA4
4. Create audience: Newsletter Subscribers

### Calendly (Webinaire Signups)
1. Calendly → Integrations
2. Connect to Zapier
3. Zapier → GA4 Event: `webinaire_signup`

### GitHub (Article Publishing)
1. On new article published
2. Trigger event: `blog_published`
3. Track article performance from day 1

---

## Part 9: Monthly Reporting

### KPI Dashboard (Template)
```
Month: June 2026

USERS & SESSIONS:
- Total Users: _____ (vs ___ last month)
- New Users: _____ (% of total)
- Sessions: _____ (avg __ per user)
- Bounce Rate: _____ (target: <50%)
- Avg. Session Duration: _____ min

TRAFFIC SOURCE:
- Organic: _____ (%)
- Direct: _____ (%)
- Referral: _____ (%)
- Social: _____ (%)

CONVERSIONS:
- Contact Forms: _____
- Webinaire Signups: _____
- Case Study Downloads: _____
- Newsletter Signups: _____
- Conversion Rate: _____ (target: 2-5%)

CONTENT PERFORMANCE:
- Top Article: _____ (_____ views)
- Avg. Time on Article: _____ min
- Blog Scroll Depth (50%): _____ %
- Most Shared Page: _____

ORGANIC SEARCH (from GSC):
- Impressions: _____
- Clicks: _____
- Avg. Position: _____ (target: <10)
- CTR: _____ % (target: 15-20%)

GOALS & TARGETS:
- Organic Traffic Growth: Target +50% (vs baseline)
- Conversion Rate: Target 2-5%
- Cost per Lead: Estimate _____ MAD
- Revenue Potential: _____ (leads × avg deal size)
```

---

## Part 10: Troubleshooting

### Issue: GA4 Not Tracking
**Solution:**
1. Check GA4 Measurement ID (G-XXXXXXXX)
2. Verify tracking code installed in `<head>`
3. Check browser console for JS errors
4. Test in DebugView (GA4 → DebugView)
5. Wait 24 hours for initial data

### Issue: GSC Shows Errors
**Common errors:**
- **404 Not Found:** Fix broken links
- **Crawl Anomaly:** Check server logs
- **Indexing Issue:** Check robots.txt, canonical tags
- **Mobile Usability:** Test on mobile device

### Issue: GA4 Data Not Matching GSC
**Cause:** Different counting methodologies
- GA4 counts sessions (user activity)
- GSC counts indexing (Google crawler view)
- Slight mismatches normal (±10%)

---

## Checklist: Implementation

### Week 1
- [ ] GSC property created & verified
- [ ] Sitemap submitted
- [ ] GA4 property created
- [ ] GA4 tracking code installed
- [ ] DebugView shows real-time data
- [ ] GSC linked to GA4

### Week 2
- [ ] Conversion tracking setup (4 goals)
- [ ] Custom events configured (blog, newsletter, etc)
- [ ] Audiences created
- [ ] Dashboards built
- [ ] First week of data collected

### Week 3-4
- [ ] Historical baseline documented
- [ ] Monthly reporting template ready
- [ ] Integrations (Mailchimp, Calendly) connected
- [ ] Team trained on GA4 interface
- [ ] Alerts/notifications setup

---

## Success Metrics (Target W4)

- [ ] GA4 tracking 100% pages
- [ ] Conversion events firing correctly
- [ ] GSC index: 25-30 pages
- [ ] Organic traffic: Baseline captured
- [ ] Setup complete & verified

---

**Next:** Go live with tracking. Monitor daily. Weekly report template.
