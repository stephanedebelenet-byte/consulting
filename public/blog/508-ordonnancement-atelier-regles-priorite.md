---
title: "Ordonnancement d'Atelier : les Règles de Priorité Simples"
date: "2026-09-25"
author: "Youssef B"
schema: "Article"
image: "/images/charts.webp"
keywords: "ordonnancement atelier, règles de priorité production, planning atelier, séquencement commandes, diagramme de Gantt production"
description: "Ordonnancer un atelier sans logiciel complexe : règles de priorité (FIFO, date due, plus court temps), séquencement des séries et suivi quotidien."
---

# Ordonnancement d'Atelier : les Règles de Priorité Simples

![Graphiques de planification et de prévision supply chain](/images/charts.webp)

**Le plan de production dit quoi fabriquer cette semaine. L'ordonnancement dit dans quel ordre, sur quelle machine, à quelle heure. C'est le niveau le plus concret de la planification, et celui où les décisions se prennent souvent à l'instinct, au pied des machines, avec une question qui revient chaque matin : « Qu'est-ce qu'on lance maintenant ? »**

Des règles simples permettent de répondre à cette question de façon cohérente, sans logiciel d'ordonnancement avancé.

## Les règles de priorité classiques

**Premier arrivé, premier servi (FIFO).** Les ordres sont traités dans leur ordre d'arrivée. Équitable et simple, mais ignore les dates promises et les durées.

**Date due la plus proche (EDD).** On traite d'abord l'ordre dont la date de livraison est la plus proche. C'est la règle la plus intuitive pour tenir les délais clients.

**Temps opératoire le plus court (SPT).** On traite d'abord les ordres les plus courts. Cette règle minimise le temps moyen d'attente et le nombre d'ordres en cours, mais peut laisser un gros ordre attendre indéfiniment.

**Marge la plus faible.** On calcule pour chaque ordre la marge = temps restant avant la date due − temps de travail restant. On traite d'abord les ordres à plus faible marge. Plus fine que la date due, car elle tient compte du travail restant.

**Ratio critique.** Temps restant avant la date due / temps de travail restant. Un ratio inférieur à 1 signifie que l'ordre est déjà en retard potentiel.

::stat:: Ratio critique < 1 — l'ordre ne peut plus être livré à temps sans action particulière

## Un exemple

| Ordre | Temps de travail (h) | Date due (dans x heures) | Marge |
|---|---|---|---|
| A | 6 | 20 | 14 |
| B | 2 | 8 | 6 |
| C | 8 | 10 | 2 |
| D | 3 | 30 | 27 |

- Selon la date due : B, C, A, D.
- Selon le temps le plus court : B, D, A, C.
- Selon la marge : C, B, A, D.

Avec l'ordre « date due », C commence après B, à 2 heures, et se termine à 10 heures : juste à temps. Avec l'ordre « temps le plus court », C passe en dernier et finit à 19 heures, avec 9 heures de retard. La règle choisie change le résultat.

## Le poids des changements de série

Dans beaucoup d'ateliers, l'enjeu principal n'est pas la règle de priorité, mais le **séquencement des séries** : l'ordre des produits détermine la durée des changements. Passer d'une couleur claire à une couleur foncée est rapide, l'inverse demande un nettoyage complet. Passer d'un format à un format proche prend moins de temps qu'un changement complet.

On construit alors des **cycles de production** : une séquence type qui minimise les changements (du clair au foncé, du petit au grand format), répétée à intervalle régulier. Les règles de priorité s'appliquent à l'intérieur du cycle. Réduire les temps de changement de série élargit la marge de manœuvre : voir [l'IA et le SMED](/blog/ia-et-changements-de-serie-smed-reduire-les-temps-de).

> **Une règle de priorité n'est utile que si elle est la même pour tout le monde.** Le vrai problème de beaucoup d'ateliers n'est pas le choix de la règle, mais l'absence de règle : chaque chef d'équipe fait ses propres arbitrages, et le commercial le plus insistant obtient la priorité. Écrire la règle et la faire respecter est déjà un immense progrès.

## Les outils

- **Le tableau de planning visuel** (magnétique ou papier), par machine, avec les ordres en cours et à venir. Simple, visible par tous, très efficace dans les petits ateliers.
- **Le diagramme de Gantt** dans un tableur, pour visualiser l'occupation des machines dans le temps.
- **Les logiciels d'ordonnancement** (APS, MES), utiles quand le nombre d'ordres, de machines et de contraintes devient trop grand pour un pilotage manuel. Voir [MES et IA](/blog/mes-et-ia-ce-que-l-intelligence-artificielle-ajoute-a-l) et [l'IA et l'ordonnancement de production](/blog/ia-et-ordonnancement-de-production-arbitrer-les-priorites).

## Le suivi quotidien

L'ordonnancement se pilote en réunion courte, chaque jour, au pied de l'atelier : ce qui a été fait la veille, les écarts, les priorités du jour, les problèmes à remonter. Dix minutes suffisent, à condition d'avoir les informations sous les yeux.

## Ce qu'il faut retenir

L'ordonnancement fixe l'ordre de passage des ordres sur les machines. La règle « date due » ou « marge la plus faible » protège les délais, le séquencement réduit les changements de série, et une règle unique vaut mieux que des arbitrages au cas par cas. Pour la vue d'ensemble, voir notre article pilier sur [le plan directeur de production](/blog/plan-directeur-de-production-construire-un-pdp-realiste) et, pour la capacité, [le goulot d'étranglement](/blog/goulot-d-etranglement-la-theorie-des-contraintes-appliquee).

Vous voulez organiser le pilotage de votre atelier ? [Découvrez notre offre de conseil](/conseil).

**Un besoin précis ?** Le premier échange est gratuit et sans engagement : contact@nextinotech.com, +212 06 63 44 92 00.

---

*110+ missions menées sur le terrain marocain. 0 commission éditeur, uniquement l'intérêt du client.*
