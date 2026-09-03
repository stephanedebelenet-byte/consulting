# Agent WhatsApp — leads publicités Facebook / Instagram

`api/whatsapp.ts` = webhook déployé automatiquement par Vercel sur
`https://nextinotech.com/api/whatsapp`. Il répond aux messages WhatsApp avec Claude,
garde le fil de discussion dans Upstash Redis, et prévient le propriétaire quand un
lead veut être rappelé ou envoie une preuve de paiement.

Le discours de l'agent s'édite dans les constantes en haut de `api/whatsapp.ts`.

---

## Mise en route (une fois)

### 1. Upstash Redis (gratuit)

1. Créer un compte sur https://upstash.com → **Create Database** (type *Redis*, région Europe).
2. Copier `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` (onglet *REST API*).

### 2. Clé Anthropic

https://console.anthropic.com → **API Keys** → *Create Key* → `ANTHROPIC_API_KEY`.
Ajouter ~5 $ de crédit (usage réel : ~1–15 $/mois selon le volume de leads).

### 3. WhatsApp Cloud API (Meta)

1. https://developers.facebook.com → **Create App** → type *Business*.
2. Ajouter le produit **WhatsApp**. Meta fournit un **numéro de test** + un
   **Phone number ID** + un token temporaire (24 h).
3. Pour la prod : ajouter **votre propre numéro** (⚠️ il ne pourra plus servir dans
   l'appli WhatsApp normale) → vérification par SMS/appel.
4. Générer un **token permanent** : *Business Settings → Users → System Users* →
   créer un system user *Admin* → *Generate token* → app WhatsApp → permissions
   `whatsapp_business_messaging` + `whatsapp_business_management`.
5. Récupérer : `WHATSAPP_TOKEN` (le token permanent), `WHATSAPP_PHONE_NUMBER_ID`.
6. Choisir librement `WHATSAPP_VERIFY_TOKEN` (n'importe quelle chaîne).

### 4. Variables d'environnement Vercel

Project Settings → **Environment Variables** → ajouter les 7 clés de `.env.example`
(voir ce fichier) en *Production* **et** *Preview*. Redéployer.

### 5. Brancher le webhook côté Meta

App Meta → **WhatsApp → Configuration → Webhook** :
- **Callback URL** : `https://nextinotech.com/api/whatsapp`
- **Verify token** : la valeur de `WHATSAPP_VERIFY_TOKEN`
- Cliquer *Verify and save* (doit passer au vert).
- **Webhook fields** : cocher **`messages`**.

### 6. Tester

Envoyer un message WhatsApp au numéro → l'agent doit répondre.
Logs : Vercel → Deployments → *Functions* → `api/whatsapp`.

---

## Côté publicité

Gestionnaire de publicités Meta → objectif **Contacts / Messages**, destination
**WhatsApp**. Message pré-rempli du bouton, ex. :
`Bonjour, je viens de la publicité pour la formation Responsable Logistique.`

Quand quelqu'un clique, le message arrive avec un bloc `referral` (nom de la pub) —
l'agent le détecte, ouvre par le message d'accueil, puis enchaîne avec Claude.
