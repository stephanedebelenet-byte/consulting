# Automatisation éditoriale nextinotech.com

Tout tourne dans le cloud, sans PC allumé et sans API Claude payante.

| Tâche | Où | Quand (Casablanca) | Ce qu'elle fait |
|---|---|---|---|
| Publication | Google Cloud Run Jobs (`editorial-publish`) | du lundi au vendredi à 6 h | Publie les brouillons de `content/drafts/` dont la date est arrivée. Le site est compilé avant tout envoi : si la compilation échoue, rien n'est poussé et une alerte Telegram part. Sinon, l'envoi se fait sur `main` et Vercel redéploie. Aucun appel à Claude. |
| Veille d'actualité | Routine Claude Code, incluse dans l'abonnement Claude | le dimanche à 7 h | Repère l'actualité de la semaine : loi de finances, douane, ports, champions marocains, leaders internationaux, tendances supply chain (voir `sources.json`). Vérifie les faits par recherche web. Rédige 3 articles FR + AR datés sur les prochains mardis et jeudis libres, puis ouvre une **pull request**. Rien n'est publié sans fusion. |

Validation hebdomadaire : GitHub vous prévient de la PR, par e-mail ou par l'application mobile. Vous relisez, puis vous cliquez sur « Merge ». Chaque article paraît ensuite à sa date.

## 1. Publication : déploiement unique depuis un navigateur

1. Ouvrez [Cloud Shell](https://shell.cloud.google.com). Il faut un projet Google Cloud avec un compte de facturation ; l'usage reste en principe dans les quotas gratuits.
2. Lancez :
   ```bash
   git clone https://github.com/stephanedebelenet-byte/consulting.git
   cd consulting/cloud/editorial-job
   PROJECT_ID=<votre-projet> bash deploy.sh
   ```
3. Le script demande trois secrets (saisie masquée) :
   - `GITHUB_TOKEN` : jeton GitHub *fine-grained* limité au dépôt `consulting`, avec le droit **Contents : Read and write**.
   - `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID` : facultatifs (Entrée vide = pas d'alerte Telegram).
4. Test immédiat : `gcloud run jobs execute editorial-publish --region=europe-west1`.

## 2. Veille : routine Claude Code

La routine se gère sur https://claude.ai/code/routines : exécution immédiate, pause, modification de l'heure ou des consignes.
Elle a besoin de l'application GitHub de Claude installée sur le dépôt `consulting`, pour cloner le dépôt et ouvrir la PR.

Elle s'appuie sur `drafts_tool.py`, qui applique à chaque article les mêmes contrôles qu'en local :

```bash
python3 cloud/editorial-job/drafts_tool.py contexte            # missions, articles publiés, brouillons, prochains numéros et dates
python3 cloud/editorial-job/drafts_tool.py titres              # titres d'actualité de la semaine (Google News)
python3 cloud/editorial-job/drafts_tool.py enregistrer a.json  # contrôle puis écrit content/drafts/fr|ar/NNN-*.md
```

Contrôles effectués :
- longueur du titre et de la description ;
- au moins 700 mots en FR et 450 en AR ;
- au moins deux sources ;
- adresse de page non encore prise ;
- liens internes limités aux articles publiés et aux missions existantes.

Si un contrôle échoue, rien n'est écrit et le script affiche les corrections à faire.

## Réglages

- **Sujets de veille** : modifiez `sources.json`. La routine relit ce fichier à chaque exécution.
- **Horaire de publication** : ligne `schedule` en fin de `deploy.sh`, puis relancez le script.
- **Mettre la publication en pause** : `gcloud scheduler jobs pause publish-quotidien --location=europe-west1`.

## Fichiers

- `main.py`, `publish.py`, `common.py` : publication (Cloud Run).
- `drafts_tool.py`, `sources.json` : veille (routine).
- `Dockerfile`, `deploy.sh` : déploiement.
