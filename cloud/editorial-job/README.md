# Job éditorial nextinotech.com (Google Cloud)

Deux tâches tournent dans Google Cloud. Aucun PC n'a besoin d'être allumé.

| Tâche | Quand | Ce qu'elle fait |
|---|---|---|
| `editorial-publish` | du lundi au vendredi à 6 h (Casablanca) | Publie les brouillons de `content/drafts/` dont la date est arrivée, compile le site comme garde-fou, puis pousse sur `main`. Vercel redéploie ensuite. Si la compilation échoue, rien n'est poussé et une alerte Telegram est envoyée. |
| `editorial-veille` | le dimanche à 7 h | Collecte l'actualité de la semaine (loi de finances, douane, ports, champions marocains, leaders internationaux, tendances supply chain : voir `sources.json`). Claude vérifie les faits par recherche web et rédige 3 articles FR + AR datés sur les prochains mardis et jeudis libres. Il ouvre ensuite une **pull request**. Rien n'est publié tant que la PR n'est pas fusionnée. |

Validation hebdomadaire : vous recevez un message Telegram avec le lien de la PR. Vous relisez sur GitHub, depuis un téléphone si besoin, puis vous cliquez sur « Merge ». Les articles paraissent ensuite à leur date.

## Déploiement (une seule fois, depuis un navigateur)

1. Ouvrez [Cloud Shell](https://shell.cloud.google.com) (projet Google Cloud avec facturation active).
2. Lancez :
   ```bash
   git clone https://github.com/stephanedebelenet-byte/consulting.git
   cd consulting/cloud/editorial-job
   PROJECT_ID=<votre-projet> bash deploy.sh
   ```
3. Le script demande quatre secrets (saisie masquée) :
   - `GITHUB_TOKEN` : jeton GitHub *fine-grained*, limité au dépôt `consulting`, avec les droits **Contents : Read and write** et **Pull requests : Read and write**.
   - `ANTHROPIC_API_KEY` : clé API créée sur console.anthropic.com.
   - `TELEGRAM_BOT_TOKEN` : jeton fourni par @BotFather.
   - `TELEGRAM_CHAT_ID` : votre identifiant de conversation (envoyez un message au bot, puis ouvrez `https://api.telegram.org/bot<TOKEN>/getUpdates`).
4. Test immédiat : `gcloud run jobs execute editorial-publish --region=europe-west1`.

Pour changer une clé, relancez `deploy.sh` et appuyez sur Entrée pour les secrets à conserver.

## Réglages

- **Sujets de veille** : modifiez `sources.json` (piliers et requêtes, nombre d'articles par semaine), puis relancez `deploy.sh` pour reconstruire l'image.
- **Horaires** : variables `schedule` en fin de `deploy.sh`.
- **Mettre la veille en pause** : `gcloud scheduler jobs pause veille-hebdo --location=europe-west1`.

## Garde-fous de la veille

- Faits vérifiés par recherche web, au moins deux sources par article, et liste des sources en bas de page.
- Un projet de loi est toujours présenté comme un projet. Ton neutre sur les entreprises.
- Contrôles automatiques avant écriture : longueur du titre et de la description, nombre de mots, adresse déjà prise, liens internes limités aux articles publiés et aux missions existantes.
- Le modèle utilisé est `claude-opus-5-5`. Le repli de sécurité côté serveur est activé (`fallbacks="default"`) : si une requête est bloquée par les filtres de sécurité, l'API peut la réessayer sur un autre modèle.
- **La relecture humaine reste obligatoire** : la PR est le point de contrôle.

## Coûts

- **Cloud Run, Scheduler, Secret Manager** : l'usage décrit (environ 5 minutes par jour) reste en général dans les quotas gratuits. Vérifiez sur la page de facturation.
- **API Claude** : une exécution de veille par semaine (recherches web + 3 articles bilingues). Suivez le coût réel sur console.anthropic.com et fixez-y une limite de dépense mensuelle.

## Fichiers

`main.py` (point d'entrée, variable `MODE`), `publish.py`, `veille.py`, `common.py` (git, GitHub, Telegram, dates), `sources.json`, `Dockerfile`, `deploy.sh`.
