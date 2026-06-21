# Telegram Agent Setup — SEO/GEO Daily Reporting

## Overview

`telegram_agent_seo_geo.py` sends daily SEO/GEO reports to Telegram for nextinotech.com.

**Reports include:**
- GSC metrics (impressions, clicks, CTR, avg position, top keywords)
- GA4 metrics (users, sessions, conversions, traffic sources)
- GEO scoring (5 questions evaluated by LLM)
- Actionable recommendations

## Setup

### Step 1: Create Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Command: `/newbot`
3. Follow prompts (bot name, username)
4. Copy **Bot Token**: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### Step 2: Get Chat ID

1. Message your bot
2. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
3. Copy `chat.id` from JSON response

### Step 3: Set Environment Variables

```bash
export TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
export TELEGRAM_CHAT_ID="987654321"
```

Or set in `.env`:
```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=987654321
```

### Step 4: Install Dependencies

```bash
pip install anthropic requests
```

### Step 5: Test

```bash
python telegram_agent_seo_geo.py
```

Expected output:
```
🚀 Generating SEO/GEO daily report...

📊 ESSOR CONSULTING — SEO/GEO Daily Report
2026-06-21 15:30

🔍 GOOGLE SEARCH CONSOLE
• Impressions: 1,245
• Clicks: 89
• CTR: 7.1%
• Avg Position: 8.3
...
✅ Report sent to Telegram
```

## Schedule (Cron)

### Linux/Mac

```bash
# Daily at 9 AM
0 9 * * * cd /path/to/consulting && python telegram_agent_seo_geo.py
```

### Windows (Task Scheduler)

1. Open Task Scheduler
2. Create Basic Task → "SEO GEO Daily Report"
3. Trigger: Daily at 9 AM
4. Action: `python C:\path\to\consulting\telegram_agent_seo_geo.py`
5. Set working directory: `C:\path\to\consulting`

## Integration with GSC + GA4

Currently: Mock data (simulated metrics).

To connect real GSC/GA4:

### GSC Integration

```python
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

def fetch_gsc_real_data():
    creds = Credentials.from_service_account_file('service_account.json')
    service = build('webmasters', 'v3', credentials=creds)
    
    # Query GSC API
    request = service.searchanalytics().query(
        siteUrl='https://nextinotech.com',
        body={'startDate': '2026-06-14', 'endDate': '2026-06-21'}
    )
    return request.execute()
```

### GA4 Integration

```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest

def fetch_ga4_real_data():
    client = BetaAnalyticsDataClient()
    request = RunReportRequest(
        property=f"properties/123456789",
        date_ranges=[{"start_date": "7daysAgo", "end_date": "today"}],
        dimensions=[{"name": "country"}],
        metrics=[{"name": "activeUsers"}],
    )
    return client.run_report(request)
```

Requires:
- Google Cloud Service Account JSON
- GSC + GA4 APIs enabled
- Proper permissions set

## Output Format

Report sent to Telegram channel with:
- ✅ Real-time GSC metrics
- 📈 GA4 traffic breakdown
- 🎯 LLM-evaluated GEO questions (0-10 score)
- 🚀 Daily recommendations

## Customization

Edit `telegram_agent_seo_geo.py`:

```python
REPORT_HOUR = 9  # Change report time (9 AM default)
GEO_QUESTIONS = [...]  # Add/remove GEO questions
GSC_KEYWORDS = [...]  # Add/remove tracked keywords
```

## Troubleshooting

**Bot not responding:**
- Verify TELEGRAM_BOT_TOKEN is correct
- Ensure TELEGRAM_CHAT_ID is your personal chat ID (not group)
- Test with: `curl https://api.telegram.org/bot<TOKEN>/getMe`

**No data in report:**
- Verify GSC/GA4 APIs connected
- Check Service Account permissions
- Ensure nextinotech.com indexed in GSC

**Report not sent:**
- Check internet connection
- Verify Telegram API availability
- Test with manual `python telegram_agent_seo_geo.py`

## Next Steps

1. ✅ Setup Telegram bot
2. ✅ Set env vars
3. ✅ Run manual test
4. ✅ Integrate GSC API (optional)
5. ✅ Integrate GA4 API (optional)
6. ✅ Setup cron schedule
7. ✅ Monitor daily reports

Done! 🚀
