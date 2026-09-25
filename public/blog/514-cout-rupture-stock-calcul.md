---
title: "Coût d'une Rupture de Stock : le Chiffrer pour Arbitrer"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/analytics.webp"
keywords: "coût rupture de stock, calcul coût rupture, vente perdue, arbitrage stock service, coût de pénurie"
description: "Chiffrer le coût d'une rupture de stock : vente perdue, marge, client perdu, pénalités, arrêt de production. La méthode pour arbitrer entre stock et service."
---

# Coût d'une Rupture de Stock : le Chiffrer pour Arbitrer

![Analyse de données et indicateurs de pilotage logistique](/images/analytics.webp)

**Tout le monde sait qu'une rupture coûte cher. Peu d'entreprises savent combien. Or sans ce chiffre, l'arbitrage entre stock et service se fait à l'émotion : après une grosse rupture, on remplit l'entrepôt ; après une remarque du directeur financier sur le niveau de stock, on le vide. Chiffrer le coût d'une rupture, même approximativement, permet de sortir de ce balancier.**

## Ce que coûte une rupture : les cinq niveaux

**1. La vente reportée.** Le client attend et achète plus tard. Le coût est limité : un peu de mécontentement, parfois un coût de livraison supplémentaire.

**2. La vente perdue.** Le client achète ailleurs cette fois-ci. On perd la **marge** de cette vente (pas le chiffre d'affaires : les coûts variables ne sont pas engagés non plus).

**3. Le client perdu.** Après une ou plusieurs ruptures, le client change de fournisseur. On perd la marge de toutes ses commandes futures. C'est le coût le plus élevé, et le plus difficile à mesurer.

**4. Les coûts de rattrapage.** Livraison express, fret aérien, heures supplémentaires, production en urgence avec changements de série, achat au prix fort chez un concurrent pour dépanner un client. Voir [le fret aérien depuis Casablanca](/blog/fret-aerien-depuis-casablanca-quand-le-choisir-vraiment).

**5. Les pénalités et les coûts induits.** Pénalités contractuelles de la grande distribution, et dans l'industrie, l'arrêt d'une ligne de production faute d'un composant, dont le coût horaire peut être considérable.

::stat:: 5 niveaux — vente reportée, vente perdue, client perdu, rattrapage, pénalités

## Une méthode de calcul simple

On ne cherche pas la précision absolue, mais un ordre de grandeur par segment.

1. **Estimer la répartition** des ruptures entre vente reportée, vente perdue et client perdu, par segment de clientèle. Les commerciaux ont souvent une bonne intuition, qu'on peut affiner en analysant les commandes.
2. **Chiffrer chaque cas** : marge unitaire pour la vente perdue, valeur annuelle de la marge du client pour le client perdu, coûts de rattrapage moyens.
3. **Calculer un coût moyen par unité en rupture** pour chaque segment.

| Scénario | Probabilité (exemple) | Coût (exemple) |
|---|---|---|
| Vente reportée | 60% | Faible (frais de relance, livraison) |
| Vente perdue | 35% | Marge unitaire |
| Client perdu | 5% | Marge annuelle du client |

Le coût attendu est la somme des coûts pondérés par leur probabilité. Même avec 5% de probabilité, le scénario « client perdu » pèse souvent le plus lourd.

> **Le coût d'une rupture n'est jamais le même pour tous les produits ni pour tous les clients.** Un produit d'appel chez un client stratégique n'a rien à voir avec un article de fond de catalogue chez un client occasionnel. C'est pour cela qu'un taux de service uniforme sur tout le catalogue est presque toujours une erreur.

## Arbitrer entre stock et service

Une fois le coût de rupture estimé, l'arbitrage devient rationnel : on augmente le stock de sécurité tant que le coût supplémentaire du stock ([coût de possession](/blog/cout-de-possession-du-stock-ce-que-coute-vraiment-un-article)) est inférieur à la réduction du coût attendu des ruptures. En pratique :

- les articles à **coût de rupture élevé** (marge forte, clients stratégiques, composants critiques) justifient un taux de service élevé ;
- les articles à **coût de rupture faible** (substituables, faible marge, clients occasionnels) peuvent accepter un taux de service plus bas.

Cette logique rejoint la segmentation de [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande) et le choix du coefficient dans [la formule du stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges).

## Le cas de l'industrie

Pour un composant qui arrête une ligne, le calcul est plus direct : coût horaire de l'arrêt (production perdue, main-d'œuvre inactive, pénalités client) × durée probable de la rupture. Ce coût est souvent si élevé qu'il justifie un stock de sécurité important, voire un double approvisionnement. Voir [multi-sourcing ou fournisseur unique](/blog/sourcing-multi-fournisseurs-vs-fournisseur-unique-arbitrer).

## Ce qu'il faut retenir

Une rupture coûte une vente reportée, une marge perdue, parfois un client, plus les coûts de rattrapage et les pénalités. Chiffrer ce coût par segment permet d'arbitrer rationnellement entre stock et service, au lieu d'osciller entre surstock et pénurie. Pour la mesure des ruptures, voir [le taux de rupture](/blog/taux-de-rupture-le-mesurer-juste-et-le-faire-baisser), et pour la vue d'ensemble, notre article pilier sur [l'OTIF](/blog/otif-definition-calcul-et-pieges-de-l-indicateur-roi).

Vous voulez fixer des objectifs de service rationnels ? [Découvrez notre offre de conseil](/conseil).

Contactez-moi pour en parler : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Youssef B, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*
