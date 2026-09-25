---
title: "Point de Commande : le Calculer sans se Tromper"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/charts.webp"
keywords: "point de commande, calcul point de commande, seuil de réapprovisionnement, point de commande formule, réapprovisionnement stock"
description: "Point de commande = consommation pendant le délai + stock de sécurité. Le calcul pas à pas, un exemple et pourquoi il se déclenche souvent trop tard."
---

# Point de Commande : le Calculer sans se Tromper

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Le point de commande, c'est le moment où l'on doit passer commande pour ne pas tomber en rupture avant la livraison. La formule tient en une ligne. Pourtant, dans les entreprises où j'interviens, je trouve régulièrement des points de commande fixés il y a trois ans, jamais revus, et qui se déclenchent systématiquement trop tard.**

Le problème n'est presque jamais la formule. C'est la donnée qu'on met dedans.

## La formule de base

**Point de commande = (consommation moyenne par jour × délai de réapprovisionnement en jours) + stock de sécurité**

Tout est dans le mot « délai ». Il ne s'agit pas du délai annoncé par le fournisseur dans son devis, mais du délai total, depuis le moment où le stock franchit le seuil jusqu'au moment où la marchandise est rangée et disponible. Ce délai comprend :

- le temps de détection (si l'on ne vérifie les stocks que le lundi, on peut perdre jusqu'à six jours) ;
- le temps de traitement interne (validation de la demande, émission du bon de commande) ;
- le délai fournisseur proprement dit ;
- le transport, et le dédouanement en cas d'import ;
- la réception, le contrôle et le rangement.

Dans un cas que j'ai souvent rencontré chez des industriels importateurs, le fournisseur annonce 30 jours, mais le délai réel de bout en bout dépasse 50 jours une fois ajoutés la validation interne, le transit maritime et le passage en douane.

## Un exemple pas à pas

Une usine agroalimentaire de la région de Fès consomme 400 kg par jour d'un ingrédient. Le délai de bout en bout mesuré est de 12 jours. Le stock de sécurité, calculé selon [la formule du stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges), est de 1 500 kg.

Point de commande = 400 × 12 + 1 500 = **6 300 kg**.

Dès que le stock passe sous 6 300 kg, on commande. Si l'on avait utilisé le délai annoncé de 7 jours, le point de commande aurait été de 4 300 kg, et l'usine aurait consommé son stock de sécurité à chaque cycle.

::stat:: 2 000 kg — écart de point de commande entre délai annoncé et délai réel, dans cet exemple

## Point de commande ou révision périodique ?

Il existe deux grandes familles de pilotage :

| Système | Principe | Adapté à |
|---|---|---|
| Point de commande (quantité fixe) | On commande une quantité fixe dès que le seuil est franchi | Articles A, suivi informatique en continu |
| Révision périodique (date fixe) | On vérifie à date fixe et on complète jusqu'à un niveau cible | Commandes groupées par fournisseur, articles B et C |

La révision périodique est plus simple à organiser, notamment quand on veut grouper les commandes d'un même fournisseur pour remplir un camion. Mais elle demande un stock de sécurité plus élevé, parce qu'elle couvre la période de révision en plus du délai.

> **Un point de commande n'a de sens que si quelqu'un regarde le stock au moment où il est franchi.** Sans alerte automatique dans l'ERP ou le WMS, c'est une révision périodique qui s'ignore, avec le stock de sécurité d'un point de commande. C'est la configuration la plus risquée.

## Pourquoi le point de commande se déclenche trop tard

Voici les causes que je rencontre le plus souvent :

1. **Le délai n'a jamais été mesuré**, seulement déclaré.
2. **La consommation a augmenté** depuis le dernier paramétrage (nouveau client, saison).
3. **Les stocks réservés ne sont pas déduits** : le système voit 5 000 unités, mais 2 000 sont déjà promises à une commande en préparation.
4. **Les commandes en cours sont mal suivies** : on recommande une deuxième fois, ou pas du tout, faute de voir la commande déjà passée.
5. **Le stock informatique est faux**, ce qui ramène à la question de [l'inventaire tournant](/blog/inventaire-tournant-en-finir-avec-l-inventaire-annuel).

## La bonne fréquence de recalcul

Pour les articles A, un recalcul mensuel est raisonnable. Pour les B, trimestriel. Pour les C, semestriel suffit. Ce découpage vient directement de [la méthode ABC](/blog/methode-abc-classer-ses-stocks-en-une-apres-midi). L'effort de paramétrage se concentre là où il rapporte.

Dans les entreprises saisonnières (agroalimentaire, distribution avant le Ramadan), on paramètre des points de commande différents selon la période. Un seuil calculé sur la moyenne annuelle est systématiquement faux au moment où il compte le plus. Notre article sur [la logistique du Ramadan et de l'Aïd](/blog/logistique-du-ramadan-et-de-l-aid-anticiper-les-pics) revient sur ce point.

## Ce qu'il faut retenir

Le point de commande se calcule en une ligne, mais sa fiabilité dépend du délai réel de bout en bout et d'un stock informatique juste. Mesurez vos délais, déduisez les réservations, recalculez à un rythme adapté à la classe ABC. Pour la vue d'ensemble, voir notre [guide des 12 méthodes de gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees) ; pour la quantité à commander une fois le seuil atteint, voir [la formule de Wilson](/blog/formule-de-wilson-la-quantite-economique-est-elle-depassee).

Besoin de paramétrer correctement vos seuils dans votre ERP ? [Découvrez notre accompagnement](/conseil).

**Un besoin précis ?** Le premier échange est gratuit et sans engagement : contact@nextinotech.com, +212 06 63 44 92 00.

---

*110+ missions menées sur le terrain marocain. 0 commission éditeur, uniquement l'intérêt du client.*
