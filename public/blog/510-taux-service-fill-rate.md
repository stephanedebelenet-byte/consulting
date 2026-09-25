---
title: "Taux de Service ou Fill Rate : Deux Mesures à ne pas Confondre"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/analytics.webp"
keywords: "taux de service, fill rate, taux de remplissage commande, cycle service level, niveau de service logistique"
description: "Taux de service ou fill rate ? Deux mesures souvent confondues, qui ne disent pas la même chose. Définitions, calculs, exemple et usages."
---

# Taux de Service ou Fill Rate : Deux Mesures à ne pas Confondre

![Analyse de données et indicateurs de pilotage logistique](/images/analytics.webp)

**« Notre taux de service est de 95%. » Cette phrase ne veut rien dire tant qu'on ne précise pas de quel taux de service on parle. Selon la définition, la même entreprise peut afficher 95%, 88% ou 70% sur la même période. Et la confusion ne se limite pas aux présentations : elle fausse le calcul des stocks de sécurité.**

## Trois mesures différentes

**1. Le taux de service « cycle » (probabilité de non-rupture).** C'est la probabilité de ne pas être en rupture pendant un cycle de réapprovisionnement. C'est ce taux qui apparaît dans [la formule du stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges) : viser 95% signifie accepter une rupture, même brève, dans 5% des cycles.

**2. Le taux de remplissage (fill rate).** C'est la part de la demande servie immédiatement à partir du stock. On le mesure en quantité (unités servies / unités demandées), en lignes (lignes servies complètes / lignes commandées) ou en commandes (commandes servies complètes / commandes).

**3. L'OTIF**, qui ajoute la dimension du délai et se mesure en général au niveau de la livraison. Voir [l'OTIF](/blog/otif-definition-calcul-et-pieges-de-l-indicateur-roi).

## Un exemple pour voir la différence

Un client passe 10 commandes de 5 lignes chacune, soit 50 lignes et 1 000 unités au total. Il manque 60 unités, réparties sur 4 lignes, dans 3 commandes différentes.

| Mesure | Calcul | Résultat |
|---|---|---|
| Fill rate en quantités | 940 / 1 000 | 94% |
| Fill rate en lignes | 46 / 50 | 92% |
| Fill rate en commandes | 7 / 10 | 70% |

Même situation, trois chiffres très différents. Le client, lui, retient souvent le dernier : trois commandes sur dix n'étaient pas complètes.

::stat:: 94%, 92% ou 70% — trois mesures de la même réalité, selon le niveau de calcul

## Taux de service cycle et fill rate ne se correspondent pas

C'est la source d'erreur la plus technique. Un taux de service cycle de 95% ne donne pas un fill rate de 95%. Quand une rupture survient, elle ne touche souvent qu'une petite partie de la demande du cycle, en fin de cycle. Le fill rate est donc généralement **plus élevé** que le taux de service cycle.

Conséquence pratique : si l'on vise un fill rate de 95% et qu'on dimensionne le stock de sécurité avec un coefficient de service cycle de 95%, on surdimensionne souvent le stock. Les logiciels de planification avancés savent calculer le stock de sécurité à partir d'un objectif de fill rate ; avec un tableur, on garde en tête que le coefficient de la formule classique correspond au service cycle.

> **Choisissez l'indicateur qui correspond à ce que ressent le client, puis réglez vos paramètres en conséquence.** Dans la distribution, où le client commande de nombreuses lignes, le fill rate en lignes ou en commandes est souvent le plus pertinent. Dans l'industrie, pour un composant critique, c'est la probabilité de non-rupture qui compte, parce qu'une seule rupture arrête la ligne.

## Quel indicateur pour quel usage

| Usage | Indicateur recommandé |
|---|---|
| Dimensionner les stocks de sécurité | Taux de service cycle ou fill rate cible, selon l'outil |
| Mesurer la disponibilité en entrepôt | Fill rate en lignes |
| Mesurer l'expérience client B2B | Fill rate en commandes, ou OTIF |
| Contrat avec la grande distribution | Définition du client, souvent un OTIF |
| Pièces critiques d'une usine | Taux de service cycle élevé |

## Les bonnes pratiques

- **Écrire la définition** exacte de chaque indicateur de service et la partager avec le commercial, la logistique et la finance.
- **Mesurer à partir de la demande réelle**, en conservant les commandes non servies, et pas seulement ce qui a été facturé.
- **Segmenter** : un objectif de service différent par classe ABC. Voir [la méthode ABC](/blog/methode-abc-classer-ses-stocks-en-une-apres-midi).
- **Mettre en regard** le service et le stock : améliorer le service de quelques points peut coûter très cher. Voir [le coût d'une rupture de stock](/blog/cout-d-une-rupture-de-stock-le-chiffrer-pour-arbitrer).

## Ce qu'il faut retenir

Taux de service cycle, fill rate en quantités, en lignes ou en commandes, OTIF : ce sont des mesures différentes, qui donnent des chiffres différents. Le choix dépend de ce qu'on veut piloter et de ce que vit le client. Pour la vue d'ensemble, voir notre article pilier sur [l'OTIF](/blog/otif-definition-calcul-et-pieges-de-l-indicateur-roi), et pour les stocks, notre [guide de la gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees).

Vous voulez clarifier vos indicateurs de service ? [Contactez-nous](/contact).

**Nextinotech** — contact@nextinotech.com | +212 06 63 44 92 00

---

*20+ ans de missions terrain, 110+ références, 0 commission sur les solutions recommandées.*
