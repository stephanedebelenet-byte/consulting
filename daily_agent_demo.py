#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Daily GEO Agent DEMO — Mock Results for Essor Consulting nextinotech.com
"""

import json
from datetime import datetime

# Mock scoring results (realistic estimates)
MOCK_RESULTS = [
    {
        "question": "Quel consultant supply chain choisir à Casablanca?",
        "relevance_score": 9,
        "currently_ranking_top10": False,
        "content_gaps": "Besoin: témoignages clients, comparaison concurrents, success stories chiffrées",
        "eeat_assessment": "Excellent expertise (18 ans OCP/DHL), mais peu de proof visible en ligne",
        "action_recommended": "Ajouter 3 case studies Casablanca + testimonials vidéo clients",
        "essor_mentioned": True
    },
    {
        "question": "Combien coûte une mission consulting supply chain?",
        "relevance_score": 8,
        "currently_ranking_top10": False,
        "content_gaps": "Article 05-cout-mission-consulting.md couvre bien pricing, besoin backlinks",
        "eeat_assessment": "Strong (pricing transparent, models détaillés), manque authority externe",
        "action_recommended": "Build 5-10 backlinks depuis B2B platforms + industry forums",
        "essor_mentioned": False
    },
    {
        "question": "Comment optimiser ma supply chain en 90 jours?",
        "relevance_score": 7,
        "currently_ranking_top10": True,
        "content_gaps": "Articles existent, besoin internal linking + semantic keywords",
        "eeat_assessment": "Good (formation ROI article strong), besoin international citations",
        "action_recommended": "Update articles avec internal cross-linking + add schema markup",
        "essor_mentioned": False
    },
    {
        "question": "Formation supply chain Maroc: où et quel coût?",
        "relevance_score": 8,
        "currently_ranking_top10": False,
        "content_gaps": "Landing page Rabat/Casablanca existe, manque détails programme",
        "eeat_assessment": "Moderate (expert creds OK, besoin live training schedule)",
        "action_recommended": "Ajouter calendrier formations 2026-2027 + early bird pricing",
        "essor_mentioned": True
    },
    {
        "question": "WMS implémentation: timeline et coûts réalistes?",
        "relevance_score": 9,
        "currently_ranking_top10": False,
        "content_gaps": "Article 03 couvre bien, besoin comparer vs competition + demo video",
        "eeat_assessment": "Excellent (18 ans implémentations DHL/Renault), manque video proof",
        "action_recommended": "Créer video 3min 'WMS implementation reality vs myth' + upload YouTube",
        "essor_mentioned": True
    }
]

def generate_report():
    """Generate demo report."""

    scores = [r["relevance_score"] for r in MOCK_RESULTS]
    avg_score = sum(scores) / len(scores)

    citation_count = sum(1 for r in MOCK_RESULTS if r.get("essor_mentioned", False))
    citation_rate = (citation_count / len(MOCK_RESULTS)) * 100

    weak = [r for r in MOCK_RESULTS if r["relevance_score"] < 7]

    report = f"""
=== Daily GEO Report — {datetime.now().strftime('%Y-%m-%d %H:%M')} ===

SCORING SUMMARY:
- Average Score: {avg_score:.1f}/10
- Range: {min(scores)}/10 — {max(scores)}/10
- Questions: {len(MOCK_RESULTS)}

CITATION RATE:
- Essor mentioned: {citation_count}/{len(MOCK_RESULTS)} ({citation_rate:.0f}%)
- Target: 25%+ (currently: {citation_rate:.0f}%)
- Status: {"✓ ON TARGET" if citation_rate >= 25 else "⚠ BELOW TARGET"}

TOP ISSUES (Score < 7):
"""

    for q in weak:
        report += f"\n• {q['question']}"
        report += f"\n  → Score: {q['relevance_score']}/10"
        report += f"\n  → Gap: {q['content_gaps']}"
        report += f"\n  → Action: {q['action_recommended']}\n"

    report += f"\nRECOMMENDED ACTIONS (This Week):\n"
    for q in MOCK_RESULTS[:3]:
        report += f"1. {q['action_recommended']}\n"

    return report

def save_results():
    """Save mock results to JSON."""
    data = {
        "date": datetime.now().isoformat(),
        "questions_scored": len(MOCK_RESULTS),
        "average_score": sum(r["relevance_score"] for r in MOCK_RESULTS) / len(MOCK_RESULTS),
        "citation_rate": (sum(1 for r in MOCK_RESULTS if r.get("essor_mentioned", False)) / len(MOCK_RESULTS)) * 100,
        "results": MOCK_RESULTS
    }

    filename = f"gco_scores_demo_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Results saved: {filename}\n")
    return data

def main():
    print(generate_report())
    save_results()

if __name__ == "__main__":
    main()
