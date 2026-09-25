---
title: "Kanban en Production : la Mise en Place Pas à Pas"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/charts.webp"
keywords: "Kanban production, mise en place Kanban, calcul nombre de cartes Kanban, flux tiré, Lean production PME"
description: "Mettre en place un Kanban en production : conditions préalables, calcul du nombre de cartes, règles de fonctionnement et erreurs fréquentes."
---

# Kanban en Production : la Mise en Place Pas à Pas

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Le Kanban est l'un des outils les plus simples du Lean : des cartes, des bacs, une règle. Quand un bac est vide, la carte repart vers l'amont, qui produit ou réapprovisionne exactement ce qui a été consommé. Pas de calcul quotidien, pas de planification complexe. Pourtant, beaucoup de Kanban installés avec enthousiasme sont abandonnés six mois plus tard. Presque toujours pour les mêmes raisons.**

## Le principe du flux tiré

Dans un système « poussé », on produit selon un plan, en espérant que la demande suivra. Dans un système « tiré », on ne produit que pour remplacer ce qui a été consommé. Le Kanban est le signal qui déclenche ce remplacement : une carte, un bac vide, un emplacement au sol, ou un signal électronique.

Il limite naturellement les stocks : la quantité en circulation est plafonnée par le nombre de cartes.

## Quand le Kanban fonctionne

Le Kanban n'est pas universel. Il fonctionne bien quand :

- **la consommation est régulière** : les articles X de [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande) ;
- **les références sont répétitives** : on produit ou consomme les mêmes articles en permanence ;
- **les temps de changement de série sont courts**, sinon le poste amont ne peut pas répondre à des petits lots fréquents ;
- **le fournisseur (interne ou externe) est fiable** en délai.

Pour les articles à demande erratique, les produits spécifiques à la commande ou les composants à très long délai, d'autres méthodes sont préférables, comme le [calcul des besoins nets](/blog/calcul-des-besoins-nets-mrp-explique-simplement).

## Calculer le nombre de cartes

La formule la plus courante :

**Nombre de cartes = (consommation par période × délai de réapprovisionnement × (1 + coefficient de sécurité)) / quantité par carte**

Exemple : une ligne consomme 240 pièces par jour. Le délai de réapprovisionnement (temps pour que la carte revienne, soit traitée et que le bac plein revienne) est de 0,5 jour. Coefficient de sécurité : 20%. Un bac contient 30 pièces.

Nombre de cartes = (240 × 0,5 × 1,2) / 30 = 144 / 30 = 4,8, arrondi à **5 cartes**.

::stat:: 5 cartes — suffisent dans cet exemple à piloter un flux de 240 pièces par jour

## Les règles de fonctionnement

1. **Pas de production sans carte.** C'est la règle la plus importante et la plus souvent violée.
2. **On ne produit que la quantité indiquée sur la carte.**
3. **Les cartes circulent immédiatement** : un bac vide dont la carte reste dans une poche fait perdre tout le délai.
4. **Les cartes sont traitées dans l'ordre d'arrivée**, sauf règle de priorité visuelle (tableau avec zones vert, orange, rouge).
5. **Aucun article défectueux n'est envoyé à l'aval.**
6. **Le nombre de cartes est revu** quand la consommation change de manière durable.

> **Un Kanban échoue rarement à cause de la formule. Il échoue quand la discipline se relâche : un chef d'équipe produit « un peu d'avance » sans carte, une carte se perd, personne ne recalcule après une hausse de la demande.** Au bout de quelques mois, le système ne reflète plus la réalité et chacun revient à ses habitudes.

## Mettre en place pas à pas

1. **Choisir un périmètre pilote** : quelques références régulières, entre deux postes bien identifiés.
2. **Mesurer la consommation et le délai réels.**
3. **Calculer le nombre de cartes et la taille des bacs.**
4. **Concevoir le circuit physique** : où sont posés les bacs, où vont les cartes, qui les collecte, à quelle fréquence.
5. **Former les équipes** et expliquer le pourquoi, pas seulement le comment.
6. **Démarrer, observer, ajuster** pendant plusieurs semaines.
7. **Étendre** progressivement.

## Kanban fournisseur

Le même principe s'applique avec les fournisseurs : les cartes (ou des signaux électroniques) déclenchent les livraisons. C'est efficace avec des fournisseurs proches et fiables, et une relation de confiance. Pour des fournisseurs lointains, on combine souvent Kanban interne et approvisionnement planifié. Ce type de relation se formalise dans un [contrat-cadre](/blog/contrat-cadre-achat-securiser-prix-volumes-et-delais).

## Ce qu'il faut retenir

Le Kanban pilote simplement le réapprovisionnement des articles à consommation régulière, avec un stock plafonné. Sa réussite dépend moins de la formule que de la discipline et de la révision régulière du nombre de cartes. Pour la vue d'ensemble, voir notre article pilier sur [le plan directeur de production](/blog/plan-directeur-de-production-construire-un-pdp-realiste) et, pour la démarche Lean, [le Lean logistique au Maroc](/blog/lean-logistique-au-maroc-methodes-outils-et-resultats).

Vous voulez déployer un Kanban dans votre atelier ? [Découvrez nos formations](/formation).

**Une question sur votre situation ?** Écrivez-moi directement : contact@nextinotech.com ou +212 06 63 44 92 00.

---

*Youssef Bahaida — 20+ ans de terrain, 110+ missions, 0 commission éditeur.*
