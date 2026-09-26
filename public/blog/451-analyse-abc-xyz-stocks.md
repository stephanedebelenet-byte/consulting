---
title: "Analyse ABC-XYZ : Croiser Valeur et Régularité de la Demande"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/analytics.webp"
keywords: "analyse ABC XYZ, matrice ABC XYZ, classification XYZ, coefficient de variation demande, segmentation stocks"
description: "L'analyse ABC-XYZ croise valeur et régularité de la demande. Calcul du coefficient de variation et politique à appliquer à chacune des 9 cases."
---

# Analyse ABC-XYZ : Croiser Valeur et Régularité de la Demande

![Analyse de données et indicateurs de pilotage logistique](/images/analytics.webp)

**La méthode ABC dit ce qui compte. Elle ne dit pas ce qui est prévisible. Or deux articles de classe A peuvent se comporter de façon opposée : l'un se vend 500 unités chaque semaine, l'autre zéro pendant un mois puis 2 000 d'un coup. Les gérer avec les mêmes règles, c'est garantir soit un surstock, soit une rupture. L'analyse XYZ ajoute cette seconde dimension.**

## Le principe du XYZ

On mesure la régularité de la demande de chaque référence avec le **coefficient de variation** :

**CV = écart-type de la demande / demande moyenne**

On le calcule sur des périodes homogènes, idéalement des semaines ou des mois, sur au moins un an. Plus le CV est bas, plus la demande est stable.

| Classe | Coefficient de variation | Profil de demande |
|---|---|---|
| X | inférieur à 0,5 | Régulière, facile à prévoir |
| Y | entre 0,5 et 1 | Variable, tendances ou saisonnalité |
| Z | supérieur à 1 | Erratique, sporadique |

Là encore, les seuils sont des conventions. Certains praticiens placent la frontière X/Y à 0,25 ou 0,3 pour des données hebdomadaires. Ce qui compte, c'est la cohérence d'une analyse à l'autre.

## La matrice à neuf cases

En croisant ABC et XYZ, on obtient neuf segments. Voici comment je les traite en général :

| | X (régulier) | Y (variable) | Z (erratique) |
|---|---|---|---|
| **A** | Flux tendu, réapprovisionnement fréquent, stock de sécurité faible | Prévision soignée, revue mensuelle en S&OP | Gestion à la commande ou stock décidé explicitement, arbitrage de direction |
| **B** | Réapprovisionnement automatique | Révision périodique standard | Stock minimal, délai client négocié |
| **C** | Automatique, grosses quantités | Automatique, stock confortable | Commande à la demande ou suppression du catalogue |

La case **AX** est la plus confortable : forte valeur, demande stable. C'est là que le flux tendu fonctionne vraiment. La case **AZ** est la plus dangereuse : forte valeur, demande imprévisible. Aucune formule ne la gère seule, il faut une décision humaine, souvent en lien avec le commercial qui connaît les clients concernés.

La case **CZ** mérite une attention particulière : ce sont souvent des articles qu'on garde « au cas où » et qui finissent en [stock dormant](/blog/stock-dormant-et-obsolete-le-detecter-et-s-en-liberer). Poser la question de leur maintien au catalogue fait partie de l'exercice.

::stat:: 9 segments — au lieu d'une règle unique appliquée à toutes les références

## Pourquoi le XYZ change le calcul du stock de sécurité

[La formule du stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges) repose sur l'écart-type de la demande. Pour les articles X, elle fonctionne très bien. Pour les articles Z, elle devient fragile : quand la demande est sporadique (beaucoup de périodes à zéro), l'hypothèse de loi normale ne tient plus, et le calcul donne des résultats absurdes, parfois un stock de sécurité supérieur à un an de consommation.

Pour les Z, je préfère raisonner autrement : quelle quantité faut-il pour servir la prochaine commande type ? Combien de temps le client accepte-t-il d'attendre ? Peut-on s'engager sur un délai plutôt que sur une disponibilité immédiate ?

> **Un article erratique n'est pas forcément un article imprévisible.** Souvent, sa demande dépend de quelques gros clients dont on pourrait connaître les intentions en décrochant le téléphone. Le problème de prévision est parfois un problème de communication avec le commercial.

## Les pièges de calcul

- **Les ruptures passées** : une semaine à zéro parce qu'il n'y avait pas de stock n'est pas une semaine sans demande. Il faut corriger ou exclure ces périodes.
- **Les nouveautés** : un article lancé il y a trois mois n'a pas d'historique suffisant. On le classe à part.
- **La saisonnalité** : un article très saisonnier mais parfaitement répétitif d'une année sur l'autre sortira en Y ou en Z alors qu'il est prévisible. Il faut le repérer et le traiter avec une prévision saisonnière, pas comme de l'erratique. Les méthodes sont détaillées dans [la prévision de la demande](/blog/prevision-de-la-demande-4-methodes-simples-qui-marchent).
- **Le choix de la période** : un CV calculé en semaines est toujours plus élevé qu'en mois. Ne comparez jamais deux analyses faites sur des granularités différentes.

## Dans Excel

Ajoutez au fichier ABC douze colonnes de consommation mensuelle, puis deux colonnes : MOYENNE et ECARTYPE sur ces douze mois, et une troisième pour le rapport. Une formule SI donne X, Y ou Z. Un tableau croisé ABC × XYZ, en nombre de références et en valeur, vous donne votre matrice.

## Ce qu'il faut retenir

L'ABC-XYZ transforme une règle unique en neuf politiques adaptées. Il éclaire le calcul du stock de sécurité, la prévision et les discussions avec les commerciaux sur les articles erratiques. Il se construit à partir de [la méthode ABC](/blog/methode-abc-classer-ses-stocks-en-une-apres-midi) et s'insère dans l'ensemble décrit dans notre [guide des méthodes de gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees). Pour le lien avec la planification commerciale, voir aussi notre article sur [le S&OP](/blog/sop-au-maroc-comment-aligner-ventes-et-operations-pour).

Envie de segmenter vos stocks avec un regard extérieur ? [Parlons de votre situation](/contact).

**Nextinotech** — contact@nextinotech.com | +212 06 63 44 92 00

---

*20+ ans de missions terrain, 110+ références, 0 commission sur les solutions recommandées.*
