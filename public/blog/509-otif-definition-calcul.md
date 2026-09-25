---
title: "OTIF : Définition, Calcul et Pièges de l'Indicateur Roi"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/analytics.webp"
keywords: "OTIF, on time in full, calcul OTIF, indicateur OTIF logistique, taux de service client"
description: "L'OTIF mesure les livraisons à l'heure et complètes. Définition, calcul, choix des règles (date, tolérance, niveau de mesure) et pièges qui le rendent trompeur."
---

# OTIF : Définition, Calcul et Pièges de l'Indicateur Roi

![Analyse de données et indicateurs de pilotage logistique](/images/analytics.webp)

**L'OTIF, « On Time In Full », est devenu l'indicateur roi du service client logistique. Une livraison compte comme réussie si elle arrive à l'heure et complète ; sinon, elle est ratée. Simple en apparence. Mais une étude de McKinsey menée avec le Trading Partner Alliance auprès de grands fabricants et distributeurs nord-américains a montré que chacun avait sa propre définition, et que 92% d'entre eux jugeaient qu'un standard commun créerait de la valeur. Deux entreprises qui affichent le même OTIF peuvent donc mesurer des choses très différentes.**

## La définition de base

**OTIF = nombre de livraisons à l'heure et complètes / nombre total de livraisons**

Une livraison à l'heure mais incomplète est un échec. Une livraison complète mais en retard est un échec. C'est ce qui rend l'OTIF exigeant : il combine deux conditions.

## Les choix qui changent tout

Avant de mesurer, il faut trancher cinq questions. Chacune peut faire varier le résultat de plusieurs points.

**1. À l'heure par rapport à quoi ?** La date demandée par le client, ou la date promise par l'entreprise lors de la confirmation ? La première mesure le service réel, la seconde la fiabilité de la promesse. Les deux sont utiles, mais ce ne sont pas les mêmes indicateurs.

**2. Avec quelle tolérance ?** Le jour exact, le créneau horaire, ou une fenêtre de plus ou moins un jour ?

**3. Complet à quel niveau ?** Au niveau de la commande entière, de chaque ligne, ou des quantités ? Une commande de 50 lignes avec une ligne manquante est à 0% au niveau commande, à 98% au niveau ligne.

**4. Mesuré où ?** À l'expédition (départ de l'entrepôt) ou à la livraison chez le client ? L'OTIF à l'expédition ignore les problèmes de transport.

**5. Quelle source de données ?** Déclarations du transporteur, preuves de livraison signées, réserves du client, données du client lui-même ?

| Choix | Version « généreuse » | Version « exigeante » |
|---|---|---|
| Date de référence | Date promise | Date demandée par le client |
| Tolérance | ± 1 jour | Créneau exact |
| Niveau de mesure | Ligne ou quantité | Commande entière |
| Point de mesure | Expédition | Livraison chez le client |

::stat:: 92% — des entreprises interrogées par McKinsey et la TPA jugent qu'un standard OTIF commun créerait de la valeur

## Pourquoi c'est important

Les grands distributeurs appliquent de plus en plus des pénalités aux fournisseurs dont l'OTIF est inférieur à un seuil contractuel, selon **leur** définition. Un fournisseur qui mesure en interne un OTIF « généreux » peut se croire à 95% et découvrir des pénalités calculées sur un OTIF « exigeant » de 80%. La première chose à faire est d'aligner sa mesure interne sur celle du client.

> **L'OTIF le plus utile n'est pas le plus flatteur, c'est celui qui ressemble à ce que vit le client.** Je recommande de mesurer au niveau de la commande entière, à la livraison, par rapport à la date demandée, puis d'analyser les causes d'échec. C'est plus dur à regarder, mais c'est là que se trouvent les améliorations.

## Analyser les causes d'échec

Un OTIF global ne sert à rien s'il n'est pas décomposé. On classe chaque échec par cause :

- **rupture de stock** (le produit n'était pas disponible) : voir [le taux de rupture](/blog/taux-de-rupture-le-mesurer-juste-et-le-faire-baisser) ;
- **erreur de préparation** (mauvais produit, mauvaise quantité) : voir [les méthodes de picking](/blog/preparation-de-commandes-les-methodes-de-picking-comparees) ;
- **retard de préparation** ou de chargement ;
- **retard de transport** ;
- **commande saisie tardivement ou mal** (problème d'ADV) : voir [le métier de responsable ADV](/blog/metier-de-responsable-adv-a-la-charniere-vente-logistique) ;
- **cause client** (client absent, refus, quai saturé).

Le diagramme de Pareto des causes montre en général que deux ou trois causes expliquent l'essentiel des échecs.

## OTIF et autres indicateurs de service

L'OTIF n'est pas le seul indicateur de service. Le **taux de service** et le **taux de remplissage** mesurent d'autres aspects, souvent confondus. Voir [taux de service ou fill rate](/blog/taux-de-service-ou-fill-rate-deux-mesures-a-ne-pas-confondre). Et le service a un coût : l'améliorer en ajoutant du stock partout dégrade la trésorerie. Voir [le cycle cash-to-cash](/blog/cycle-cash-to-cash-dso-dio-et-dpo-pour-la-supply-chain).

## Ce qu'il faut retenir

L'OTIF mesure la part des livraisons à l'heure et complètes, mais sa valeur dépend entièrement des règles choisies : date de référence, tolérance, niveau de mesure, point de mesure. Alignez-vous sur la définition de vos clients, mesurez au plus près de leur expérience et analysez les causes. Les articles de ce dossier traitent du [taux de service](/blog/taux-de-service-ou-fill-rate-deux-mesures-a-ne-pas-confondre), du [cash-to-cash](/blog/cycle-cash-to-cash-dso-dio-et-dpo-pour-la-supply-chain), du [coût logistique](/blog/cout-logistique-en-pourcentage-du-ca-calculer-le-sien), du [taux de rupture](/blog/taux-de-rupture-le-mesurer-juste-et-le-faire-baisser), du [coût d'une rupture](/blog/cout-d-une-rupture-de-stock-le-chiffrer-pour-arbitrer), du [lead time](/blog/lead-time-fournisseur-decomposer-le-delai-pour-le-reduire) et du [remplissage camion](/blog/taux-de-remplissage-camion-le-kpi-transport-oublie). Pour le tableau de bord complet, voir [les KPIs supply chain au Maroc](/blog/kpis-supply-chain-au-maroc-tableau-de-bord-et-indicateurs).

Vous voulez construire un OTIF qui reflète la réalité ? [Découvrez notre offre de conseil](/conseil).

Contactez-moi pour en parler : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Youssef Bahaida, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*

**Sources consultées pour cet article :**
- [McKinsey — Defining 'on-time, in-full' in the consumer sector](https://www.mckinsey.com/capabilities/operations/our-insights/defining-on-time-in-full-in-the-consumer-sector)
