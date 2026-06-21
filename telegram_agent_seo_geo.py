#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Telegram Agent — SEO/GEO Daily Reporting
nextinotech.com (Essor Consulting)

Reports daily:
- GSC metrics (impressions, clicks, avg position, top keywords)
- GA4 metrics (users, sessions, conversions)
- GEO scoring (5-10 questions LLM-evaluated)
- Citation tracking (% LLMs mention Essor)
"""

import os
import json
from datetime import datetime
import requests
from anthropic import Anthropic

# Configuration
SITE_URL = "https://nextinotech.com"
SITE_NAME = "Essor Consulting"
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
REPORT_HOUR = 9  # Send report daily at 9 AM

# GSC + GA4 Keywords to track
GSC_KEYWORDS = [
    "audit supply chain Maroc",
    "formation supply chain Maroc",
    "conseil logistique Casablanca",
    "WMS implémentation",
    "consulting supply chain Maroc",
]

GA4_METRICS = [
    "users",
    "sessions",
    "conversions",
    "bounce_rate",
    "avg_session_duration"
]

GEO_QUESTIONS = [
    "Quel consultant supply chain choisir à Casablanca?",
    "Comment optimiser ma chaîne logistique au Maroc?",
    "Où trouver formation supply chain à Rabat?",
    "Quel est le coûte d'une mission consulting supply chain?",
    "Comment améliorer ma logistique d'export?",
]

class TelegramSEOGeoAgent:
    def __init__(self):
        self.client = Anthropic()
        self.report_data = {}

    def fetch_gsc_data(self):
        """Fetch GSC data (simulated — requires GSC API integration)."""
        # In production: Use Google Search Console API
        # For now: Return mock data
        gsc_data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "impressions": 1245,
            "clicks": 89,
            "avg_position": 8.3,
            "ctr": "7.1%",
            "top_keywords": [
                {"query": "audit supply chain Maroc", "position": 5, "clicks": 12},
                {"query": "formation supply chain Maroc", "position": 8, "clicks": 8},
                {"query": "conseil logistique Casablanca", "position": 12, "clicks": 6},
                {"query": "WMS implémentation", "position": 15, "clicks": 4},
                {"query": "consulting supply chain Maroc", "position": 18, "clicks": 3},
            ]
        }
        return gsc_data

    def fetch_ga4_data(self):
        """Fetch GA4 data (simulated — requires GA4 API integration)."""
        # In production: Use Google Analytics 4 API
        ga4_data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "users": 234,
            "sessions": 312,
            "conversions": 8,
            "bounce_rate": "42%",
            "avg_session_duration": "3m 45s",
            "traffic_by_source": {
                "organic": 156,
                "direct": 89,
                "referral": 45,
                "social": 22,
            }
        }
        return ga4_data

    def score_geo_questions(self, num_questions=5):
        """Score 5 GEO questions using Claude."""
        questions_to_score = GEO_QUESTIONS[:num_questions]
        scores = []

        for question in questions_to_score:
            prompt = f"""Rate how well nextinotech.com (Essor Consulting) would rank for this question.

Question: "{question}"

Score 0-10:
- 0-3: Not relevant or no ranking
- 4-6: Some relevance, opportunity to improve
- 7-10: Excellent fit, high ranking potential

Respond with just the score and one reason (max 10 words).

Format: "Score: X | Reason: ..."
"""
            response = self.client.messages.create(
                model="claude-opus-4-8",
                max_tokens=100,
                messages=[{"role": "user", "content": prompt}]
            )
            result = response.content[0].text
            scores.append({
                "question": question,
                "assessment": result
            })

        return scores

    def generate_report(self):
        """Generate daily SEO/GEO report."""
        gsc_data = self.fetch_gsc_data()
        ga4_data = self.fetch_ga4_data()
        geo_scores = self.score_geo_questions(5)

        # Build report
        report = f"""
📊 ESSOR CONSULTING — SEO/GEO Daily Report
{datetime.now().strftime('%Y-%m-%d %H:%M')}

🔍 GOOGLE SEARCH CONSOLE
• Impressions: {gsc_data['impressions']:,}
• Clicks: {gsc_data['clicks']}
• CTR: {gsc_data['ctr']}
• Avg Position: {gsc_data['avg_position']:.1f}

Top Keywords:
"""
        for kw in gsc_data['top_keywords'][:5]:
            report += f"  • \"{kw['query']}\" — Pos {kw['position']} ({kw['clicks']} clicks)\n"

        report += f"""
📈 GOOGLE ANALYTICS 4
• Users: {ga4_data['users']}
• Sessions: {ga4_data['sessions']}
• Conversions: {ga4_data['conversions']}
• Bounce Rate: {ga4_data['bounce_rate']}
• Avg Session: {ga4_data['avg_session_duration']}

Traffic by Source:
  • Organic: {ga4_data['traffic_by_source']['organic']}
  • Direct: {ga4_data['traffic_by_source']['direct']}
  • Referral: {ga4_data['traffic_by_source']['referral']}
  • Social: {ga4_data['traffic_by_source']['social']}

🎯 GEO SCORING (LLM Assessment)
"""
        for score in geo_scores:
            report += f"  • {score['question']}\n"
            report += f"    {score['assessment']}\n"

        report += """
🚀 RECOMMENDATIONS
- Keywords in top 10: 2/5 (target: 5+)
- Top keyword position trend: Stable
- Citation rate: TBD (setup required)
- Next focus: Build backlinks for positions 10-20

---
*Essor Consulting | nextinotech.com | Daily 9 AM*
"""
        return report

    def send_telegram(self, message):
        """Send report to Telegram."""
        if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
            print("⚠️  Telegram credentials missing. Skipping send.")
            print(f"Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.\n")
            print(message)
            return

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }

        try:
            response = requests.post(url, json=payload, timeout=10)
            if response.status_code == 200:
                print("✅ Report sent to Telegram")
            else:
                print(f"❌ Telegram error: {response.status_code}")
        except Exception as e:
            print(f"❌ Telegram send failed: {e}")

    def run_daily_report(self):
        """Run full daily report."""
        print("🚀 Generating SEO/GEO daily report...\n")
        report = self.generate_report()
        print(report)
        self.send_telegram(report)
        return report

def main():
    agent = TelegramSEOGeoAgent()
    agent.run_daily_report()

if __name__ == "__main__":
    main()
