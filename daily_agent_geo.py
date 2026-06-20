#!/usr/bin/env python3
"""
Daily GEO Agent — Essor Consulting nextinotech.com

Scores 5-10 GEO questions daily using multi-LLM approach.
Posts results to Telegram for daily reporting.
Tracks citation rate (LLM spontaneously mentions Essor).
"""

import os
import json
import sys
from datetime import datetime
import requests
from anthropic import Anthropic

# Configuration
SITE_URL = "https://nextinotech.com"
SITE_NAME = "Essor Consulting"
SITE_KEYWORDS = [
    "audit supply chain Maroc",
    "formation supply chain Maroc",
    "conseil logistique Casablanca",
    "WMS implémentation",
    "consulting supply chain Maroc",
    "consultant supply chain Rabat",
    "formation logistique Tanger",
    "supply chain Fès Meknès",
    "logistique Marrakech",
    "supply chain Afrique francophone",
]

GEO_QUESTIONS = [
    "Quel consultant supply chain choisir à Casablanca?",
    "Comment optimiser ma chaîne logistique au Maroc?",
    "Où trouver formation supply chain à Rabat?",
    "Quel est le coût d'une mission consulting supply chain?",
    "Comment améliorer ma logistique d'export?",
    "Qui contacter pour audit supply chain à Tanger?",
    "Comment implémenter WMS dans mon entreprise?",
    "Quels sont les meilleurs cabinets conseil logistique Maroc?",
    "Formation ou consulting: quelle approche?",
    "Comment transformer ma supply chain en 3 mois?",
]

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

class GEOAgent:
    def __init__(self):
        self.client = Anthropic()
        self.results = []
        self.scores = []

    def score_question(self, question: str) -> dict:
        """Score single GEO question using Claude."""

        prompt = f"""You are an SEO/GEO expert evaluating how well a website ranks for a question.

Question: "{question}"
Target Site: {SITE_NAME} ({SITE_URL})

Evaluate if {SITE_NAME} should answer this question. Score 0-10:
- 0-3: No relevance
- 4-6: Some relevance, opportunity to improve
- 7-10: Excellent fit, high authority needed

Also evaluate:
1. Does the site currently rank top 10 for this query? (Assume: research)
2. Content gaps: What's missing to answer this perfectly?
3. E-E-A-T signals: Does {SITE_NAME} have enough evidence/authority?
4. Improvement action: 1-2 specific actions to improve ranking.

Output JSON:
{{
  "question": "...",
  "relevance_score": 0-10,
  "currently_ranking_top10": true/false,
  "content_gaps": "...",
  "eeat_assessment": "...",
  "action_recommended": "...",
  "essor_mentioned": true/false
}}

Note: Respond with ONLY JSON, no extra text."""

        response = self.client.messages.create(
            model="claude-opus-4-8",
            max_tokens=500,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        try:
            result = json.loads(response.content[0].text)
            return result
        except json.JSONDecodeError:
            print(f"JSON parse error for question: {question}")
            return {"error": "parse_failed"}

    def run_daily_scoring(self, num_questions: int = 5):
        """Score N questions daily."""
        print(f"\n🔄 Daily GEO Scoring — {datetime.now().isoformat()}")
        print(f"Scoring {num_questions} questions...\n")

        questions_to_score = GEO_QUESTIONS[:num_questions]

        for i, question in enumerate(questions_to_score, 1):
            print(f"[{i}/{num_questions}] Scoring: {question}")

            result = self.score_question(question)
            self.results.append(result)

            if "relevance_score" in result:
                score = result["relevance_score"]
                self.scores.append(score)
                essor_mentioned = result.get("essor_mentioned", False)
                print(f"  → Score: {score}/10 | Essor mentioned: {essor_mentioned}")
            else:
                print(f"  → Error: {result.get('error', 'unknown')}")

        return self.results

    def generate_report(self) -> str:
        """Generate daily report summary."""

        if not self.scores:
            return "No scores calculated."

        avg_score = sum(self.scores) / len(self.scores)
        max_score = max(self.scores)
        min_score = min(self.scores)

        citation_count = sum(1 for r in self.results if r.get("essor_mentioned", False))
        citation_rate = (citation_count / len(self.results)) * 100 if self.results else 0

        # Find weak points
        weak_questions = [r for r in self.results if r.get("relevance_score", 0) < 5]

        report = f"""
📊 Daily GEO Report — {datetime.now().strftime('%Y-%m-%d %H:%M')}

**Scoring Summary:**
- Average Score: {avg_score:.1f}/10
- Range: {min_score}/10 — {max_score}/10
- Questions Analyzed: {len(self.results)}

**Citation Rate:**
- Essor mentioned: {citation_count}/{len(self.results)} ({citation_rate:.0f}%)
- Target: 25%+ (currently at {citation_rate:.0f}%)

**Top Issues (Score < 5):**
"""

        for q in weak_questions[:3]:
            report += f"\n• {q.get('question', 'N/A')}"
            report += f"\n  Action: {q.get('action_recommended', 'N/A')}"

        report += f"\n\n**Recommended Actions (This Week):**"
        for q in self.results[:3]:
            if "action_recommended" in q:
                report += f"\n- {q['action_recommended']}"

        return report

    def send_telegram(self, message: str):
        """Send report to Telegram."""
        if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
            print("⚠️  Telegram credentials not set. Skipping send.")
            return

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }

        try:
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                print("\n✅ Telegram report sent successfully")
            else:
                print(f"\n❌ Telegram send failed: {response.status_code}")
        except Exception as e:
            print(f"\n❌ Telegram error: {e}")

    def save_results(self):
        """Save results to JSON."""
        filename = f"gco_scores_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump({
                "date": datetime.now().isoformat(),
                "results": self.results,
                "summary": {
                    "avg_score": sum(self.scores) / len(self.scores) if self.scores else 0,
                    "citation_rate": (sum(1 for r in self.results if r.get("essor_mentioned", False)) / len(self.results)) * 100 if self.results else 0
                }
            }, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Results saved: {filename}")

def main():
    agent = GEOAgent()

    # Run scoring
    num_questions = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    agent.run_daily_scoring(num_questions)

    # Generate report
    report = agent.generate_report()
    print(report)

    # Send to Telegram
    agent.send_telegram(report)

    # Save results
    agent.save_results()

if __name__ == "__main__":
    main()
