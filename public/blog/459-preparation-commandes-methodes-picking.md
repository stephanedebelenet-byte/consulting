---
title: "Préparation de Commandes : les Méthodes de Picking Comparées"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/hero-warehouse.webp"
keywords: "préparation de commandes, méthodes de picking, picking entrepôt, order picking, organisation préparation commandes"
description: "La préparation de commandes pèse jusqu'à 55% des coûts d'un entrepôt. Les méthodes de picking comparées, et comment choisir selon votre profil."
---

# Préparation de Commandes : les Méthodes de Picking Comparées

![Allées de stockage et opérations dans un entrepôt](/images/hero-warehouse.webp)

**La préparation de commandes est l'activité la plus coûteuse d'un entrepôt. La revue de littérature de référence de De Koster, Le-Duc et Roodbergen l'estime jusqu'à 55% des coûts d'exploitation. Et dans ce coût, la part du lion n'est pas le geste de prendre le produit : c'est le temps passé à marcher d'un emplacement à l'autre.**

Quand je visite un entrepôt, je passe toujours une heure à suivre un préparateur. Pas pour le chronométrer, pour regarder où passe son temps. Il marche, il cherche, il attend un chariot, il revient sur ses pas. Le geste de prélèvement proprement dit n'occupe souvent qu'une petite partie de sa journée. Toutes les méthodes de picking visent au fond la même chose : réduire ce qui n'est pas du prélèvement.

## Les grandes familles de méthodes

**Le picking à la commande (order picking).** Un préparateur prend une commande et parcourt l'entrepôt pour la compléter. C'est la méthode la plus simple, adaptée aux petits volumes et aux commandes de nombreuses lignes. Elle devient inefficace dès que le nombre de commandes augmente : chaque préparateur refait les mêmes trajets.

**Le picking par lot (batch picking).** Un préparateur prélève en une tournée les articles de plusieurs commandes à la fois, puis on les répartit. On mutualise les trajets. C'est très efficace pour le e-commerce, où les commandes ont peu de lignes.

**Le picking par zone.** L'entrepôt est découpé en zones, chaque préparateur reste dans la sienne. La commande passe de zone en zone ou est consolidée à la fin. On réduit fortement les déplacements, au prix d'une coordination plus exigeante.

**Le picking par vague.** On libère les commandes par vagues, calées sur les heures de départ des camions ou des transporteurs. C'est une logique d'ordonnancement qui se combine avec les méthodes précédentes.

Le comparatif détaillé de ces trois dernières approches fait l'objet de notre article sur [le picking par zone, par vague ou par lot](/blog/picking-par-zone-par-vague-ou-par-lot-lequel-choisir).

| Méthode | Déplacements | Complexité | Profil adapté |
|---|---|---|---|
| À la commande | Élevés | Faible | Peu de commandes, beaucoup de lignes |
| Par lot | Réduits | Moyenne (tri à prévoir) | Beaucoup de petites commandes |
| Par zone | Très réduits | Élevée (consolidation) | Grand entrepôt, gros volumes |
| Par vague | Selon la méthode combinée | Élevée (ordonnancement) | Départs transport cadencés |

::stat:: jusqu'à 55% — part de la préparation de commandes dans les coûts d'exploitation d'un entrepôt

## Les technologies d'aide au picking

- **Liste papier** : encore très répandue dans les PME marocaines. Elle fonctionne, mais elle génère des erreurs de lecture et ne met pas le stock à jour en temps réel.
- **Terminal radiofréquence avec scan** : le préparateur est guidé, chaque prélèvement est validé par scan. C'est le standard dès qu'on a un WMS.
- **Picking vocal** : le préparateur reçoit les instructions dans un casque et confirme à la voix. Mains et yeux libres.
- **Pick-to-light / put-to-light** : des voyants lumineux indiquent l'emplacement et la quantité. Très rapide sur les zones à forte densité.
- **Goods-to-person** : ce n'est plus le préparateur qui se déplace, c'est le stock qui vient à lui (convoyeurs, navettes, robots). C'est l'automatisation au sens fort, abordée dans notre article sur [l'automatisation d'entrepôt au Maroc](/blog/automatisation-d-entrepot-au-maroc-solutions-couts-et-roi).

> **La technologie ne corrige pas une mauvaise implantation.** Un terminal dernier cri qui envoie le préparateur au fond de l'entrepôt pour l'article le plus demandé reste un mauvais système. L'emplacement des produits compte davantage que l'outil.

## L'implantation, levier numéro un

Avant d'investir dans quoi que ce soit, je regarde toujours où sont placés les articles les plus fréquemment prélevés. Dans une bonne partie des entrepôts, l'emplacement a été attribué à la première réception, et personne ne l'a jamais remis en cause. Placer les articles qui sortent le plus près des quais, à hauteur d'homme, est souvent le gain le plus rapide et le moins cher. C'est tout le sujet du [slotting](/blog/slotting-placer-le-bon-article-au-bon-emplacement).

## Mesurer avant de changer

Trois indicateurs suffisent pour démarrer :

1. **Lignes préparées par heure et par préparateur**, à comparer entre zones et entre périodes. Voir [la productivité en entrepôt](/blog/productivite-en-entrepot-mesurer-sans-demotiver-les-equipes).
2. **Taux d'erreur de préparation** : lignes erronées, manquantes, en trop.
3. **Délai entre la libération de la commande et sa mise à quai.**

Un entrepôt qui ne mesure pas ces trois chiffres ne peut pas savoir si un changement de méthode a amélioré quoi que ce soit.

## Choisir sa méthode : quelques règles simples

- Moins de quelques centaines de commandes par jour et beaucoup de lignes par commande : picking à la commande, bien implanté.
- Beaucoup de commandes de une à trois lignes (e-commerce) : picking par lot, avec tri en fin de tournée.
- Grand entrepôt avec des familles de produits distinctes (froid, sec, vrac) : picking par zone.
- Plusieurs départs de camions dans la journée : ordonnancement par vagues, quelle que soit la méthode de base.

## Ce qu'il faut retenir

La préparation de commandes concentre l'essentiel des coûts d'un entrepôt, et l'essentiel de ce coût est du déplacement. Avant la technologie, regardez l'implantation et la méthode. Les articles de ce dossier détaillent chaque levier : [réception](/blog/reception-des-marchandises-la-procedure-en-7-etapes), [adressage](/blog/adressage-des-emplacements-d-entrepot-le-systeme-qui-tient), [étiquetage GS1](/blog/codes-barres-gs1-et-etiquette-logistique-l-essentiel), [palettisation](/blog/palettisation-normes-plan-de-chargement-et-erreurs-courantes), [sécurité des chariots](/blog/securite-des-chariots-elevateurs-les-regles-qui-sauvent), [systèmes de stockage](/blog/rayonnage-accumulation-ou-mezzanine-choisir-son-stockage), [emballage](/blog/emballage-d-expedition-reduire-la-casse-et-le-cout) et [cross-docking](/blog/cross-docking-quand-il-a-vraiment-du-sens-au-maroc). Pour la conception d'ensemble, voir aussi notre article sur [le layout d'entrepôt](/blog/layout-entrepot-les-5-principes-d-une-conception-efficace).

Vous voulez un diagnostic de votre préparation de commandes ? [Découvrez nos prestations](/prestations).

Contactez-moi pour en parler : contact@nextinotech.com | +212 06 63 44 92 00.

---

*Youssef Bahaida, fondateur de Nextinotech — 20+ ans d'expérience supply chain au Maroc et en Afrique francophone.*

**Sources consultées pour cet article :**
- [De Koster, Le-Duc, Roodbergen — Design and control of warehouse order picking: A literature review (European Journal of Operational Research)](https://www.sciencedirect.com/science/article/abs/pii/S0377221706006473)
