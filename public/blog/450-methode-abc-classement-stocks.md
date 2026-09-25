---
title: "Méthode ABC : Classer ses Stocks en une Après-Midi"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/analytics.webp"
keywords: "méthode ABC, classification ABC stocks, analyse ABC Pareto, méthode ABC gestion des stocks, loi 80/20 stock"
description: "La méthode ABC appliquée aux stocks : extraire, trier, fixer les seuils et surtout en tirer des décisions. Guide pas à pas avec un exemple Excel."
---

# Méthode ABC : Classer ses Stocks en une Après-Midi

![Analyse de données et indicateurs de pilotage logistique](/images/analytics.webp)

**Si je ne devais garder qu'un seul outil de gestion des stocks, ce serait la méthode ABC. Elle ne demande ni logiciel, ni consultant, ni budget : un export de l'ERP, un tableur et une après-midi. Et elle change la façon dont une équipe regarde son stock, parce qu'elle montre noir sur blanc que toutes les références ne se valent pas.**

Le principe vient de la loi de Pareto : une minorité d'articles concentre la majorité de la valeur consommée. Les proportions exactes varient d'une entreprise à l'autre, mais le déséquilibre est presque toujours là.

## Les étapes, dans l'ordre

**1. Extraire la consommation annuelle par référence.** Quantité sortie sur les douze derniers mois, et coût unitaire. Attention à prendre les sorties réelles (ventes, consommations en production), pas les achats.

**2. Calculer la valeur consommée.** Quantité × coût unitaire, pour chaque référence.

**3. Trier par valeur décroissante.** La référence qui pèse le plus en haut.

**4. Calculer le pourcentage cumulé.** Pour chaque ligne, la part cumulée de la valeur totale.

**5. Fixer les seuils.** Les seuils les plus courants :

| Classe | Part de la valeur cumulée | Part typique des références |
|---|---|---|
| A | jusqu'à 80% | 10 à 20% |
| B | de 80 à 95% | 20 à 30% |
| C | de 95 à 100% | 50 à 70% |

Ces seuils ne sont pas sacrés. Dans une entreprise où la distribution est moins déséquilibrée, on peut placer la coupure A à 70%. L'important est de décider, puis de s'y tenir.

::stat:: 10 à 20% — part des références qui concentre typiquement 80% de la valeur consommée

## À quoi ressemble le résultat

Prenons un distributeur de matériel électrique avec 3 000 références. Le profil que l'on obtient le plus souvent : quelques centaines de références portent l'essentiel de la valeur sortie, tandis qu'une bonne moitié du catalogue sort moins de dix fois par an. Ce qui frappe, en général, c'est que personne dans l'entreprise n'avait cette image en tête. Le magasin consacre autant d'énergie aux petites références qu'aux grosses.

## Transformer le classement en décisions

C'est là que la plupart des analyses ABC meurent : on fait le tableau, on le présente, et rien ne change. Le classement n'a de valeur que s'il modifie les pratiques.

| Levier | Articles A | Articles B | Articles C |
|---|---|---|---|
| Fréquence de comptage | Mensuelle | Trimestrielle | Annuelle |
| Révision des paramètres | Mensuelle | Trimestrielle | Semestrielle |
| Taux de service visé | 97-98% | 95% | 90-92% |
| Mode de réapprovisionnement | Point de commande suivi de près | Révision périodique | Grosses quantités, peu de commandes |
| Emplacement en entrepôt | Proche des quais | Zone intermédiaire | Zones éloignées, hauteur |

Deux remarques. D'abord, pour l'emplacement physique, on raisonne plutôt sur un ABC en nombre de sorties (fréquence de picking) que sur la valeur. C'est le principe du [slotting](/blog/slotting-placer-le-bon-article-au-bon-emplacement). Ensuite, pour les articles C, l'objectif n'est pas de les ignorer mais de les gérer avec peu d'effort : commandes groupées, stocks un peu plus confortables, peu de suivi individuel.

> **L'erreur la plus fréquente est de classer une fois et de ne jamais reclasser.** Une référence peut passer de C à A en six mois avec un nouveau client. Je recommande de relancer l'analyse chaque trimestre ; une fois le fichier construit, c'est dix minutes de travail.

## Les limites de la méthode

L'ABC ne dit rien de la régularité de la demande. Un article A peut être parfaitement stable ou totalement erratique, et ces deux cas n'appellent pas la même gestion. C'est pourquoi on le complète avec [l'analyse ABC-XYZ](/blog/analyse-abc-xyz-croiser-valeur-et-regularite-de-la-demande).

Il ne dit rien non plus de la criticité. Une pièce de rechange classée C en valeur peut arrêter une ligne de production entière si elle manque. Dans l'industrie, on ajoute souvent un critère de criticité manuel pour ces références.

## Faire son ABC dans Excel en 30 minutes

1. Colonnes : référence, désignation, quantité sortie 12 mois, coût unitaire.
2. Colonne E : valeur = quantité × coût.
3. Tri décroissant sur la colonne E.
4. Colonne F : cumul de la valeur ; colonne G : cumul / total.
5. Colonne H : formule SI (G ≤ 80% → « A » ; G ≤ 95% → « B » ; sinon « C »).
6. Tableau croisé : nombre de références et valeur par classe.

## Ce qu'il faut retenir

La méthode ABC est l'étape zéro de toute démarche de gestion des stocks : elle dit où concentrer l'effort. Elle ne vaut que si elle modifie la fréquence de comptage, les paramètres de réapprovisionnement et le rangement. La suite logique : [calculer le stock de sécurité](/blog/stock-de-securite-formule-exemple-chiffre-et-pieges) de vos articles A, puis situer l'ensemble dans notre [guide des méthodes de gestion des stocks](/blog/gestion-des-stocks-les-12-methodes-essentielles-expliquees).

Vous voulez que vos équipes sachent construire et exploiter cette analyse ? Voir [nos formations](/formation).

Contactez-moi pour en parler : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Youssef Bahaida, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*
