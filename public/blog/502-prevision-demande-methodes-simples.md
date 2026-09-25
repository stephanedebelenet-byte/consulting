---
title: "Prévision de la Demande : 4 Méthodes Simples qui Marchent"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/charts.webp"
keywords: "prévision de la demande, méthodes de prévision, moyenne mobile, lissage exponentiel, prévision des ventes Excel"
description: "Moyenne mobile, lissage exponentiel, saisonnalité, jugement commercial : 4 méthodes simples de prévision de la demande, avec leurs usages et limites."
---

# Prévision de la Demande : 4 Méthodes Simples qui Marchent

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**« Nos prévisions sont toujours fausses, donc ça ne sert à rien d'en faire. » Je l'entends régulièrement. Oui, une prévision est toujours fausse : c'est sa nature. La question n'est pas d'avoir raison, mais de se tromper moins, et de savoir de combien on se trompe. Et pour cela, pas besoin d'un data scientist : quatre méthodes simples couvrent l'essentiel des besoins d'une PME.**

## Méthode 1 : la moyenne mobile

On prévoit la période suivante par la moyenne des N dernières périodes. Par exemple, la prévision de juillet est la moyenne des ventes d'avril, mai et juin.

**Avantages** : très simple, lisse les variations aléatoires.
**Limites** : réagit lentement aux changements de tendance, ignore la saisonnalité. Plus N est grand, plus la prévision est stable mais lente à réagir.

**Usage** : articles réguliers, sans tendance ni saisonnalité marquées.

## Méthode 2 : le lissage exponentiel

La nouvelle prévision est un mélange entre la dernière prévision et la dernière valeur réelle :

**Prévision(t+1) = α × Réel(t) + (1 − α) × Prévision(t)**

Le coefficient α, entre 0 et 1, règle la réactivité. Avec α = 0,2, on donne 20% de poids à la dernière observation : prévision stable. Avec α = 0,5, prévision plus réactive.

Exemple : prévision de mai = 1 000, ventes réelles de mai = 1 200, α = 0,2. Prévision de juin = 0,2 × 1 200 + 0,8 × 1 000 = **1 040**.

**Avantages** : simple, ne nécessite de garder que la dernière prévision, donne plus de poids au récent.
**Limites** : dans sa forme simple, ignore tendance et saisonnalité. Des variantes (Holt, Holt-Winters) les intègrent.

::stat:: α = 0,2 — un point de départ raisonnable pour un lissage exponentiel simple sur des ventes mensuelles

## Méthode 3 : les coefficients saisonniers

Beaucoup de produits ont une saisonnalité forte et répétitive : ventes de boissons en été, produits alimentaires avant le Ramadan, fournitures scolaires en septembre. La méthode :

1. Calculer, sur deux ou trois ans d'historique, la moyenne mensuelle.
2. Calculer pour chaque mois un coefficient : ventes du mois / moyenne mensuelle.
3. Prévoir le niveau moyen de l'année (par tendance ou jugement).
4. Multiplier ce niveau par le coefficient de chaque mois.

Attention au Ramadan, qui se décale d'environ onze jours chaque année dans le calendrier grégorien : un coefficient « mars » calculé sur les années passées n'est pas valable si le Ramadan tombe en février. Il faut raisonner en semaines relatives au Ramadan, pas en mois calendaires. Voir [la logistique du Ramadan et de l'Aïd](/blog/logistique-du-ramadan-et-de-l-aid-anticiper-les-pics).

## Méthode 4 : le jugement structuré

Les chiffres ne voient pas le nouveau client signé la semaine dernière, la promotion prévue le mois prochain, le concurrent en rupture. Les commerciaux, si. La méthode consiste à partir de la prévision statistique, puis à laisser les commerciaux l'**ajuster explicitement**, en justifiant chaque ajustement significatif.

**La règle d'or** : mesurer séparément la précision de la prévision statistique et celle de la prévision ajustée. Si les ajustements dégradent la précision (ce qui arrive plus souvent qu'on ne le croit, par optimisme), on le saura. Voir [la précision des prévisions](/blog/precision-des-previsions-mesurer-le-mape-et-le-biais).

| Méthode | Pour quels produits | Effort |
|---|---|---|
| Moyenne mobile | Réguliers, sans tendance | Très faible |
| Lissage exponentiel | Réguliers, évolution lente | Faible |
| Coefficients saisonniers | Saisonnalité répétitive | Moyen |
| Jugement structuré | Promotions, lancements, gros clients | Moyen, mais essentiel |

> **La meilleure méthode de prévision est celle qu'on utilise vraiment, qu'on mesure chaque mois et qu'on améliore.** Une moyenne mobile suivie avec rigueur bat un modèle sophistiqué que personne ne comprend et que tout le monde contourne.

## Quelques règles de bon sens

- **Prévoir la demande, pas les ventes** : corriger les périodes de rupture.
- **Prévoir au bon niveau d'agrégation** : une famille de produits se prévoit mieux qu'une référence isolée, un mois mieux qu'un jour.
- **Segmenter** : pas besoin de soigner la prévision des articles C. Voir [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande).
- **Réviser régulièrement**, dans un processus S&OP. Voir [le S&OP au Maroc](/blog/sop-au-maroc-comment-aligner-ventes-et-operations-pour).

Pour aller plus loin avec des modèles avancés, voir [l'IA prédictive et la prévision de la demande](/blog/ia-predictive-et-prevision-de-la-demande-reduire-ses-stocks) et [le choix d'un logiciel de prévision](/blog/choisir-un-logiciel-de-prevision-de-la-demande-les-criteres).

## Ce qu'il faut retenir

Quatre méthodes simples couvrent l'essentiel : moyenne mobile, lissage exponentiel, coefficients saisonniers et jugement structuré. Le vrai progrès vient de la mesure systématique de l'erreur. Pour la vue d'ensemble de la planification, voir notre article pilier sur [le plan directeur de production](/blog/plan-directeur-de-production-construire-un-pdp-realiste), et pour le métier, [le demand planner](/blog/metier-de-demand-planner-prevoir-pour-que-tout-suive).

Vous voulez structurer votre processus de prévision ? [Découvrez nos formations](/formation).

Pour en discuter concrètement, contactez Nextinotech : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Nextinotech accompagne les entreprises marocaines en supply chain depuis plus de 20 ans, sans commission sur les outils recommandés.*
