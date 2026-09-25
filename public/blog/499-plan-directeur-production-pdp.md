---
title: "Plan Directeur de Production : Construire un PDP Réaliste"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/charts.webp"
keywords: "plan directeur de production, PDP, MPS master production schedule, planification production PME, programme de production"
description: "Le plan directeur de production (PDP) traduit la demande en programme de fabrication réaliste. Construction, horizon, zones figées et erreurs fréquentes."
---

# Plan Directeur de Production : Construire un PDP Réaliste

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Dans beaucoup d'usines, il n'existe pas vraiment de plan de production. Il existe une liste d'urgences, réordonnée chaque matin selon le client qui a crié le plus fort la veille. Les changements de série se multiplient, les matières manquent au mauvais moment, et le responsable de production passe ses journées à éteindre des incendies. Le plan directeur de production sert précisément à sortir de ce mode.**

## Ce qu'est le PDP

Le plan directeur de production (PDP, ou MPS pour Master Production Schedule) indique, **par produit fini et par période** (souvent la semaine), les quantités à produire sur un horizon de quelques semaines à quelques mois. Il se situe entre deux niveaux :

- **au-dessus**, le plan industriel et commercial (S&OP), qui raisonne par familles de produits et en volumes mensuels. Voir [le S&OP au Maroc](/blog/sop-au-maroc-comment-aligner-ventes-et-operations-pour) ;
- **en dessous**, le calcul des besoins en composants et matières (MRP) et l'ordonnancement de l'atelier. Voir [le calcul des besoins nets](/blog/calcul-des-besoins-nets-mrp-explique-simplement) et [l'ordonnancement d'atelier](/blog/ordonnancement-d-atelier-les-regles-de-priorite-simples).

C'est le point de rencontre entre ce que le marché demande et ce que l'usine peut faire.

## Les données d'entrée

1. **La demande** : commandes fermes et prévisions. Voir [la prévision de la demande](/blog/prevision-de-la-demande-4-methodes-simples-qui-marchent).
2. **Le stock disponible** de produits finis.
3. **Les stocks de sécurité** visés.
4. **Les règles de lotissement** : taille de lot minimale, multiple, contraintes de changement de série.
5. **La capacité** des ressources clés : lignes, machines goulots, personnel.

## Le calcul de base

Pour chaque produit et chaque semaine :

**Stock prévisionnel fin de semaine = stock début + production planifiée − demande**

Quand ce stock prévisionnel passe sous le stock de sécurité, on planifie une production, arrondie selon la règle de lot. Le résultat est ensuite confronté à la capacité : si la charge dépasse la capacité certaines semaines, on anticipe, on lisse, on arbitre.

| Semaine | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| Demande (commandes + prévisions) | 400 | 450 | 500 | 380 | 420 |
| Production planifiée (lot de 1 000) | 0 | 1 000 | 0 | 0 | 1 000 |
| Stock prévisionnel fin (départ 600, sécurité 200) | 200 | 750 | 250 | −130 → à corriger | ... |

Dans cet exemple, la semaine 4 passe sous zéro : il faut avancer le lot de la semaine 5 à la semaine 4. C'est exactement le genre d'alerte que le PDP fait apparaître à l'avance, au lieu de la découvrir le jour de la rupture.

::stat:: 3 zones — figée, négociable, libre : la règle qui protège l'atelier des changements permanents

## Les zones temporelles : la clé de la stabilité

Un PDP qui change tous les jours ne sert à rien. On définit donc des zones :

- **Zone figée** (par exemple les deux premières semaines) : on ne modifie plus, sauf décision exceptionnelle de la direction. Les matières sont commandées, l'atelier est organisé.
- **Zone négociable** : les changements sont possibles, sous réserve de disponibilité des matières et de la capacité.
- **Zone libre** : le plan peut évoluer librement avec les prévisions.

La longueur de la zone figée dépend des délais d'approvisionnement et de la réactivité de l'usine.

> **La zone figée protège l'usine, mais elle doit être défendue par la direction.** Si un commercial peut obtenir une modification de la zone figée en appelant directement le chef d'atelier, il n'y a plus de zone figée. La règle doit être écrite, connue et arbitrée au bon niveau.

## Les erreurs fréquentes

- **Un PDP irréaliste**, qui ne tient pas compte de la capacité réelle. Voir [capacité et charge](/blog/capacite-et-charge-equilibrer-son-atelier-sans-surprise).
- **Un PDP construit uniquement sur les commandes fermes**, sans prévision : on subit en permanence.
- **Un PDP par référence trop détaillé** sur tout l'horizon, impossible à tenir à jour.
- **Pas de lien avec les achats** : les matières ne suivent pas.
- **Des stocks de sécurité fixés au hasard**. Voir [le stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges).

## Le rythme de mise à jour

Une mise à jour hebdomadaire est le standard : on intègre les nouvelles commandes, on ajuste les prévisions de la zone libre, on vérifie la charge, on valide le plan en réunion courte avec la production, les achats et le commercial. Cette réunion hebdomadaire est souvent le premier pas vers un vrai processus S&OP.

## Ce qu'il faut retenir

Le PDP traduit la demande en quantités à produire par produit et par semaine, confrontées à la capacité, avec une zone figée qui protège l'atelier. Il est le pivot de la planification : les articles de ce dossier traitent du [MRP](/blog/calcul-des-besoins-nets-mrp-explique-simplement), du [Kanban](/blog/kanban-en-production-la-mise-en-place-pas-a-pas), des [prévisions](/blog/prevision-de-la-demande-4-methodes-simples-qui-marchent) et de [leur précision](/blog/precision-des-previsions-mesurer-le-mape-et-le-biais), de la [capacité](/blog/capacite-et-charge-equilibrer-son-atelier-sans-surprise), de la [TPM](/blog/tpm-en-pme-la-maintenance-productive-totale-sans-jargon), du [juste-à-temps](/blog/juste-a-temps-hors-automobile-applicable-ou-illusion), des [goulots](/blog/goulot-d-etranglement-la-theorie-des-contraintes-appliquee) et de [l'ordonnancement](/blog/ordonnancement-d-atelier-les-regles-de-priorite-simples). Pour les compétences associées, voir notre [formation planificateur supply chain](/blog/formation-planificateur-supply-chain-au-maroc-ddmrp-sop-et).

Vous voulez structurer votre planification de production ? [Découvrez notre offre de conseil](/conseil).

Contactez-moi pour en parler : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Youssef Bahaida, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*
