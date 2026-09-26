---
title: "Stock de Sécurité : Formule, Exemple Chiffré et Pièges"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/charts.webp"
keywords: "stock de sécurité, formule stock de sécurité, calcul stock de sécurité, stock de sécurité exemple, écart-type demande, taux de service"
description: "La formule du stock de sécurité pas à pas, un exemple chiffré en dirhams, le choix du coefficient de service et les 4 erreurs qui faussent le calcul."
---

# Stock de Sécurité : Formule, Exemple Chiffré et Pièges

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Le stock de sécurité est l'article le plus mal compris de la gestion des stocks. Dans beaucoup d'entreprises que j'accompagne, il est fixé « à un mois de consommation » pour toutes les références, sans distinction. C'est à la fois trop pour les articles réguliers et pas assez pour les articles capricieux. Résultat : on paie le surstock et on subit quand même les ruptures.**

Il existe pourtant une formule, connue depuis des décennies, qui fait le travail correctement dans la grande majorité des cas. Elle demande trois données que vous avez déjà, ou presque.

## La formule, sans intimidation

La version la plus utilisée, quand le délai fournisseur est à peu près stable, est la suivante :

**Stock de sécurité = z × σ × √L**

- **z** est le coefficient lié au taux de service visé (la probabilité de ne pas être en rupture pendant le délai de réapprovisionnement) ;
- **σ** (sigma) est l'écart-type de la demande sur une période (jour, semaine) ;
- **L** est le délai de réapprovisionnement, exprimé dans la même unité de période.

Le coefficient z se lit dans une table de loi normale. Les valeurs à retenir :

| Taux de service visé | Coefficient z |
|---|---|
| 90% | 1,28 |
| 95% | 1,65 |
| 98% | 2,05 |
| 99% | 2,33 |
| 99,9% | 3,09 |

Regardez l'écart entre 95% et 99,9% : le coefficient presque double. C'est ce qui explique pourquoi viser « zéro rupture » coûte si cher. Les derniers points de service sont les plus chers à acheter.

## Un exemple chiffré

Prenons un distributeur de pièces détachées à Casablanca. Une référence de filtre se vend en moyenne 200 unités par semaine, avec un écart-type de 60 unités. Le fournisseur livre en 4 semaines. L'entreprise vise 95% de taux de service.

- z = 1,65
- σ = 60
- √L = √4 = 2

Stock de sécurité = 1,65 × 60 × 2 = **198 unités**, soit environ une semaine de vente.

Si l'entreprise avait appliqué la règle « un mois de stock de sécurité », elle aurait gardé 800 unités. Sur une pièce à 150 dirhams, la différence représente près de 90 000 dirhams immobilisés pour rien, sur une seule référence.

::stat:: ×1,9 — écart de coefficient entre un taux de service de 95% et de 99,9%

## Quand le délai fournisseur varie aussi

Si votre fournisseur livre tantôt en 3 semaines, tantôt en 6, la formule simple sous-estime le risque. On utilise alors la version qui combine les deux incertitudes :

**SS = z × √(L × σd² + D² × σL²)**

où D est la demande moyenne et σL l'écart-type du délai. C'est typiquement le cas des importations maritimes depuis l'Asie, où la variabilité du délai pèse souvent plus lourd que celle de la demande. Je le constate très régulièrement chez les importateurs marocains : ils calculent un stock de sécurité sur la demande, alors que leur vrai problème, c'est le bateau.

> **Dans la plupart des PME, la variabilité du délai fournisseur coûte plus cher que la variabilité de la demande.** Mesurez vos délais réels de livraison sur les douze derniers mois avant de toucher à la formule. Vous serez souvent surpris.

## Les quatre erreurs qui faussent tout

**1. Calculer l'écart-type sur des ventes plutôt que sur la demande.** Si vous avez été en rupture pendant trois semaines, vos ventes étaient nulles, mais la demande ne l'était pas. Les ruptures passées écrasent artificiellement la variabilité.

**2. Mélanger les unités de temps.** Écart-type hebdomadaire et délai en jours : l'erreur classique, qui donne un stock de sécurité multiplié ou divisé par 2,6 sans que personne ne s'en rende compte.

**3. Appliquer le même taux de service partout.** Un article A stratégique mérite 98% ; un article C de faible valeur peut se contenter de 90%. C'est tout l'intérêt de croiser avec [la méthode ABC](/blog/methode-abc-classer-ses-stocks-en-une-apres-midi) et [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande).

**4. Ne jamais recalculer.** La demande change, les fournisseurs changent. Un recalcul trimestriel est un minimum ; mensuel pour les articles A.

## Ce que le stock de sécurité ne fait pas

Il ne protège pas contre les ruptures d'approvisionnement majeures (fermeture d'usine, grève portuaire). Pour cela, il faut un stock stratégique décidé explicitement, ce qui relève plutôt de la [cartographie des risques](/blog/cartographier-les-risques-de-sa-supply-chain-la-methode-en). Il ne compense pas non plus un stock informatique faux : si le système croit que vous avez 200 filtres et qu'il y en a 120 en rayon, le calcul ne sert à rien.

## En pratique, par où commencer

Prenez vos 20 premières références en valeur. Pour chacune, sortez la demande hebdomadaire sur 52 semaines, calculez moyenne et écart-type dans Excel (fonctions MOYENNE et ECARTYPE), mesurez le délai réel du fournisseur, et appliquez la formule. Comparez ensuite avec le stock de sécurité actuel. Dans la plupart des cas, vous trouverez à la fois des références surprotégées et d'autres sous-protégées.

Le stock de sécurité alimente directement [le calcul du point de commande](/blog/point-de-commande-le-calculer-sans-se-tromper). Et pour situer ces méthodes dans l'ensemble, repartez de notre [guide des méthodes de gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees).

Vous souhaitez que vos équipes maîtrisent ces calculs sur vos propres données ? Découvrez [nos formations](/formation).

Pour en discuter concrètement, contactez Nextinotech : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Nextinotech accompagne les entreprises marocaines en supply chain depuis plus de 20 ans, sans commission sur les outils recommandés.*
