---
title: "Codes-Barres GS1 et Étiquette Logistique : l'Essentiel"
date: "2026-09-25"
author: "Youssef Bahaida"
schema: "Article"
image: "/images/hero-warehouse.webp"
keywords: "codes-barres GS1, étiquette logistique GS1, SSCC, GS1-128, GTIN, GS1 Maroc"
description: "GTIN, SSCC, GS1-128 : l'essentiel des standards GS1 pour étiqueter produits, cartons et palettes, et répondre aux exigences de la grande distribution."
---

# Codes-Barres GS1 et Étiquette Logistique : l'Essentiel

![Allées de stockage et opérations dans un entrepôt](/images/hero-warehouse.webp)

**Le jour où un grand distributeur ou un client export vous demande des « palettes étiquetées GS1 avec SSCC », beaucoup d'entreprises découvrent un vocabulaire qu'elles n'ont jamais eu besoin de connaître. Pourtant, derrière ces sigles, il y a une idée simple : un langage commun pour que chaque produit, chaque carton et chaque palette soit identifiable en un scan, par n'importe quel acteur de la chaîne.**

## GS1, c'est quoi ?

GS1 est l'organisation internationale qui gère les standards de codification utilisés dans le commerce : le code-barres du produit en magasin, les étiquettes logistiques des palettes, les échanges de données. Elle est représentée par des organisations nationales, dont GS1 Maroc, auprès de laquelle une entreprise obtient son **préfixe entreprise**, la base de tous ses codes.

## Les trois identifiants à connaître

**Le GTIN (Global Trade Item Number)** identifie un article commercial. C'est le code que vous voyez sous le code-barres d'un produit en magasin, le plus souvent sur 13 chiffres (GTIN-13, anciennement EAN-13). Un même produit a un GTIN différent pour chaque niveau d'emballage : l'unité, le carton de 12, le pack de 6. Le carton peut être identifié par un GTIN-14.

**Le SSCC (Serial Shipping Container Code)** identifie une unité logistique précise : cette palette-là, ce colis-là. C'est un numéro de 18 chiffres, unique et jamais réutilisé. Deux palettes identiques du même produit ont le même GTIN mais deux SSCC différents.

**Le GLN (Global Location Number)** identifie un lieu ou une entité : un entrepôt, un quai, un magasin. Utile dans les échanges de données.

| Identifiant | Ce qu'il identifie | Exemple d'usage |
|---|---|---|
| GTIN | Un type d'article (à chaque niveau d'emballage) | Passage en caisse, référencement |
| SSCC | Une unité logistique unique | Suivi d'une palette de l'usine au magasin |
| GLN | Un lieu, une entité | Adresse de livraison dans les échanges EDI |

::stat:: 18 chiffres — longueur du SSCC, l'identifiant unique de chaque palette ou colis

## L'étiquette logistique GS1

C'est l'étiquette collée sur la palette ou le carton d'expédition. Elle combine :

- une partie lisible en clair (expéditeur, destinataire, désignation) ;
- un ou plusieurs codes-barres **GS1-128**, une symbologie capable de coder plusieurs informations à la fois, chacune précédée d'un **identifiant d'application** (AI) qui dit ce que c'est : (00) pour le SSCC, (02) ou (01) pour le GTIN, (10) pour le numéro de lot, (15) ou (17) pour la date, (37) pour la quantité.

Le SSCC est l'information obligatoire. Le reste dépend des exigences du client et du secteur. Dans l'alimentaire et la pharmacie, le lot et la date sont en pratique indispensables : c'est ce qui permet d'appliquer [le FEFO](/blog/fifo-fefo-lifo-quelle-regle-de-sortie-pour-vos-stocks) et de gérer un rappel de produit.

> **L'étiquette GS1 ne sert à rien si personne ne la scanne.** Son vrai bénéfice apparaît quand la réception du client scanne le SSCC et récupère automatiquement tout le contenu de la palette, grâce à un avis d'expédition électronique. C'est ce qui rend possible le [cross-docking](/blog/cross-docking-quand-il-a-vraiment-du-sens-au-maroc) à grande échelle.

## Pourquoi c'est devenu incontournable

- **Les exigences des clients** : grande distribution, export vers l'Europe, donneurs d'ordres industriels imposent souvent l'étiquetage GS1.
- **La traçabilité** : en cas de problème qualité, retrouver en quelques minutes quelles palettes de quel lot sont parties chez quels clients.
- **La fiabilité de la réception** : un scan au lieu d'un comptage manuel et d'une saisie. Voir [la réception des marchandises](/blog/reception-des-marchandises-la-procedure-en-7-etapes).
- **L'automatisation** : tout système de tri, de convoyage ou de WMS s'appuie sur ces identifiants.

## Les erreurs fréquentes

1. **Réutiliser un SSCC** : il doit être unique, toujours.
2. **Même GTIN pour l'unité et le carton** : chaque niveau d'emballage a le sien.
3. **Étiquettes mal imprimées ou mal placées** : illisibles au scanner, collées sur le film étirable qui se déchire, ou sur un seul côté de la palette. Les recommandations GS1 prévoient un placement précis, idéalement sur deux côtés adjacents.
4. **Créer ses propres codes « maison »** en format similaire, sans préfixe GS1 : ils finiront par entrer en collision avec des codes officiels.

## Par où commencer

1. Adhérer à GS1 Maroc et obtenir un préfixe entreprise.
2. Attribuer des GTIN à vos articles et à leurs niveaux d'emballage.
3. Paramétrer l'impression d'étiquettes logistiques avec SSCC depuis votre ERP ou WMS.
4. Tester avec un client pilote, qui scanne à réception.

## Ce qu'il faut retenir

GTIN pour l'article, SSCC pour la palette, GLN pour le lieu, GS1-128 pour tout coder sur l'étiquette. C'est le langage commun de la chaîne logistique, et un prérequis pour travailler avec la grande distribution ou à l'export. Pour la suite du dossier entrepôt, voir [la palettisation](/blog/palettisation-normes-plan-de-chargement-et-erreurs-courantes) et notre article pilier sur [la préparation de commandes](/blog/preparation-de-commandes-les-methodes-de-picking-comparees).

Besoin d'accompagnement pour mettre en place l'étiquetage GS1 ? [Contactez-nous](/contact).

**Nextinotech** — contact@nextinotech.com | +212 06 63 44 92 00

---

*20+ ans de missions terrain, 110+ références, 0 commission sur les solutions recommandées.*

**Sources consultées pour cet article :**
- [GS1 Belgium & Luxembourg — Étiquette logistique GS1](https://www.gs1belu.org/en/gs1-logistics-label)
- [GS1 Suisse — La symbologie GS1-128](https://www.gs1.ch/fr/media/1114)
- [GS1 Maroc — FAQ](https://www.gs1ma.org/index.php/11-nos-service/94-faqs)
