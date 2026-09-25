---
title: "Calcul des Besoins Nets (MRP) : Expliqué Simplement"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/charts.webp"
keywords: "calcul des besoins nets, MRP, nomenclature, besoins bruts besoins nets, planification des matières"
description: "Le calcul des besoins nets (MRP) expliqué simplement : nomenclature, besoins bruts, stocks, délais, lots. Un exemple pas à pas et les conditions de réussite."
---

# Calcul des Besoins Nets (MRP) : Expliqué Simplement

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Le MRP a la réputation d'une mécanique informatique obscure, enfermée dans l'ERP. En réalité, le principe tient en une question que tout planificateur se pose : pour fabriquer ce que prévoit le plan de production, de quoi ai-je besoin, en quelle quantité, et quand dois-je le commander ? Le MRP répond à cette question pour des milliers de composants à la fois, à condition qu'on lui donne des données justes.**

## Les trois données d'entrée

**1. Le plan directeur de production** : quels produits finis, combien, quand. Voir [le plan directeur de production](/blog/plan-directeur-de-production-construire-un-pdp-realiste).

**2. La nomenclature** : la « recette » de chaque produit, c'est-à-dire la liste des composants et leurs quantités. Un vélo = 1 cadre + 2 roues + 1 selle… Et une roue = 1 jante + 36 rayons + 1 pneu…

**3. L'état des stocks** : stock disponible, commandes fournisseurs en cours, réservations.

Plus deux paramètres par composant : **le délai d'obtention** (d'approvisionnement ou de fabrication) et **la règle de lotissement** (quantité minimale, multiple, lot économique).

## Le calcul, étape par étape

**Besoin brut** = quantité de composant nécessaire pour réaliser le plan (quantité de produits finis × quantité par unité dans la nomenclature).

**Besoin net** = besoin brut − stock disponible − commandes en cours + stock de sécurité.

Si le besoin net est positif, on génère une **proposition de commande**, arrondie selon la règle de lot, **décalée dans le temps** du délai d'obtention.

## Un exemple simple

Une usine doit produire 500 tables en semaine 6. Chaque table utilise 4 pieds. Le stock de pieds est de 800, une commande de 400 pieds est attendue en semaine 3, le stock de sécurité est de 100. Le fournisseur livre en 3 semaines, par lots de 500.

- Besoin brut en semaine 6 : 500 × 4 = 2 000 pieds.
- Disponible : 800 + 400 = 1 200.
- Besoin net : 2 000 − 1 200 + 100 = 900.
- Arrondi au lot : 1 000 pieds.
- Date de commande : semaine 6 − 3 semaines = **semaine 3**.

Le MRP propose donc une commande de 1 000 pieds à passer en semaine 3. Multipliez ce calcul par des centaines de composants et plusieurs niveaux de nomenclature, et vous comprenez pourquoi on a besoin d'un logiciel.

::stat:: 3 entrées — plan de production, nomenclature, état des stocks : sans elles, le MRP calcule faux

## Pourquoi le MRP « ne marche pas » dans beaucoup d'entreprises

Le calcul est mathématiquement simple. Quand les résultats sont absurdes, la cause est presque toujours dans les données :

| Donnée fausse | Symptôme |
|---|---|
| Nomenclature incomplète ou périmée | Composants manquants à la production |
| Stock informatique faux | Commandes inutiles ou ruptures surprises |
| Délais fournisseurs non mis à jour | Commandes trop tardives |
| Plan de production irréaliste ou instable | Propositions qui changent chaque jour (« nervosité ») |
| Règles de lot inadaptées | Surstocks de composants |

> **Un MRP calcule exactement ce qu'on lui demande, avec les données qu'on lui donne.** Quand les planificateurs finissent par ignorer ses propositions et gérer leurs approvisionnements dans un tableur à côté, ce n'est pas le MRP qui a échoué : ce sont les données. Avant de changer de logiciel, fiabilisez les nomenclatures, les stocks et les délais.

## Les conditions de réussite

1. **Des nomenclatures justes à plus de 98-99%**, avec un processus de modification maîtrisé.
2. **Un stock informatique fiable**, grâce à [l'inventaire tournant](/blog/inventaire-tournant-en-finir-avec-l-inventaire-annuel).
3. **Des délais mesurés**, pas déclarés. Voir [le lead time fournisseur](/blog/lead-time-fournisseur-decomposer-le-delai-pour-le-reduire).
4. **Un plan de production stable** dans sa zone figée.
5. **Des planificateurs qui traitent les messages** du MRP (avancer, reporter, annuler) chaque jour.

## MRP et DDMRP

Le MRP classique répercute toute variation du plan sur l'ensemble de la chaîne de composants, ce qui crée de la nervosité quand la demande est instable. Le DDMRP propose d'y ajouter des stocks tampons positionnés stratégiquement pour découpler les niveaux. Voir notre article sur [la formation DDMRP au Maroc](/blog/formation-ddmrp-au-maroc-certification-practitioner-et). Et pour les composants à consommation régulière, un système plus simple comme le [Kanban](/blog/kanban-en-production-la-mise-en-place-pas-a-pas) est souvent préférable.

## Ce qu'il faut retenir

Le MRP transforme le plan de production en besoins de composants datés, grâce à la nomenclature, aux stocks et aux délais. La mécanique est simple ; la qualité des données fait tout. Pour la vue d'ensemble de la planification, voir notre article pilier sur [le plan directeur de production](/blog/plan-directeur-de-production-construire-un-pdp-realiste).

Vous voulez fiabiliser votre MRP ? [Découvrez notre accompagnement](/conseil).

**Nextinotech** — contact@nextinotech.com | +212 06 63 44 92 00

---

*20+ ans de missions terrain, 110+ références, 0 commission sur les solutions recommandées.*
