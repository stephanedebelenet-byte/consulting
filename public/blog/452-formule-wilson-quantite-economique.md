---
title: "Formule de Wilson : la Quantité Économique Est-elle Dépassée ?"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/charts.webp"
keywords: "formule de Wilson, quantité économique de commande, EOQ, calcul Wilson stock, coût de passation commande"
description: "La formule de Wilson calcule la quantité économique de commande. Exemple chiffré, limites réelles (remises, camion complet, péremption) et bon usage."
---

# Formule de Wilson : la Quantité Économique Est-elle Dépassée ?

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**La formule de Wilson a plus d'un siècle. On la dit dépassée à chaque génération de logiciels, et pourtant je continue à m'en servir. Pas comme une vérité à appliquer au chiffre près, mais comme un garde-fou : elle montre en une ligne si l'on commande beaucoup trop souvent ou beaucoup trop gros.**

## Ce que la formule arbitre

Chaque commande coûte quelque chose : le temps de l'acheteur, la saisie, le suivi, la réception, le contrôle, le paiement. C'est le **coût de passation**. À l'inverse, chaque unité en stock coûte : loyer, capital immobilisé, assurance, risque d'obsolescence. C'est le **coût de possession**.

Commander souvent en petites quantités minimise le stock mais multiplie les commandes. Commander rarement en grosses quantités fait l'inverse. La quantité économique est le point où la somme des deux coûts est la plus basse.

**Q* = √(2 × D × Cc / Cp)**

- D : demande annuelle en unités ;
- Cc : coût de passation d'une commande ;
- Cp : coût de possession annuel d'une unité (souvent exprimé comme un taux × le prix unitaire).

## Un exemple chiffré

Un industriel consomme 12 000 cartons d'emballage par an. Chaque commande lui coûte environ 600 dirhams en temps administratif, réception et contrôle. Un carton vaut 25 dirhams, et le taux de possession annuel est estimé à 25%, soit 6,25 dirhams par carton et par an.

Q* = √(2 × 12 000 × 600 / 6,25) = √2 304 000 ≈ **1 518 cartons**

Soit environ 8 commandes par an, une toutes les six à sept semaines. Si l'entreprise commandait jusqu'ici chaque semaine 230 cartons, elle payait 52 commandes par an. Si elle commandait une fois par an 12 000 cartons, elle portait un stock moyen de 6 000 cartons.

| Politique | Commandes/an | Coût de passation | Stock moyen | Coût de possession | Total |
|---|---|---|---|---|---|
| Hebdomadaire | 52 | 31 200 MAD | 115 | 720 MAD | 31 920 MAD |
| Wilson | ≈ 8 | 4 740 MAD | 759 | 4 740 MAD | 9 480 MAD |
| Annuelle | 1 | 600 MAD | 6 000 | 37 500 MAD | 38 100 MAD |

Au point optimal, coût de passation et coût de possession sont égaux : c'est une propriété de la formule, et un bon moyen de vérifier son calcul.

::stat:: ÷3 — coût total de la politique Wilson comparé aux deux extrêmes, dans cet exemple

## Les limites que tout le monde connaît

**La demande n'est pas constante.** Wilson suppose une consommation régulière. Pour les articles saisonniers ou erratiques (les Y et Z de [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande)), il faut l'utiliser avec prudence.

**Les remises sur quantité.** Si le fournisseur offre 5% au-delà de 3 000 unités, la quantité économique change. On compare alors le coût total à chaque palier de prix.

**Les contraintes physiques.** Un camion complet, une palette complète, un conteneur. En pratique, on arrondit la quantité de Wilson à l'unité logistique la plus proche.

**La péremption.** Dans l'agroalimentaire ou la pharmacie, la quantité maximale est souvent limitée par la durée de vie, bien avant Wilson.

## La vraie difficulté : estimer les coûts

C'est là que la formule devient intéressante. Pour l'appliquer, il faut estimer le coût d'une commande et le coût de possession. La plupart des entreprises n'ont jamais fait ce calcul. Le simple fait de le faire change les discussions.

Le coût de possession est détaillé dans notre article sur [le coût de possession du stock](/blog/cout-de-possession-du-stock-ce-que-coute-vraiment-un-article). Pour le coût de passation, prenez le coût annuel du service achats-approvisionnement et de la réception, divisé par le nombre de commandes passées. Le résultat surprend souvent : plusieurs centaines de dirhams par commande.

> **La bonne nouvelle est que la courbe du coût total est très plate autour de l'optimum.** Se tromper de 20% sur la quantité ne change le coût total que de quelques pourcents. Wilson n'a pas besoin de données parfaites pour être utile : il a besoin d'un ordre de grandeur juste.

## Comment je l'utilise en 2026

1. Je calcule Wilson sur les articles B et C à demande régulière, pour lesquels on commande souvent sans réfléchir.
2. Je compare avec les quantités réellement commandées ces douze derniers mois.
3. Je cherche les écarts d'un facteur 2 ou plus : c'est là que se trouvent les gains.
4. J'arrondis à l'unité logistique et je vérifie la cohérence avec les contraintes de péremption et de stockage.

Les logiciels de planification modernes font ce calcul automatiquement, parfois avec des modèles plus sophistiqués. Mais comprendre Wilson reste le meilleur moyen de savoir si le logiciel est bien paramétré.

## Ce qu'il faut retenir

La formule de Wilson n'est pas dépassée : elle est simplement mal utilisée quand on la prend au pied de la lettre. Utilisée comme garde-fou, elle révèle des politiques de commande aberrantes en quelques minutes. Elle complète [le point de commande](/blog/point-de-commande-le-calculer-sans-se-tromper), qui dit quand commander, et s'inscrit dans notre [guide des méthodes de gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees).

Vous voulez revoir vos politiques de commande ? [Découvrez notre accompagnement](/conseil).

**Une question sur votre situation ?** Écrivez-moi directement : contact@nextinotech.com ou +212 06 63 44 92 00.

---

*Youssef Bahaida — 20+ ans de terrain, 110+ missions, 0 commission éditeur.*
