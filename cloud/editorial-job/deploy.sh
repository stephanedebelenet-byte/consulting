#!/usr/bin/env bash
# Déploiement unique du job de publication sur Google Cloud, à lancer depuis Cloud Shell (navigateur, sans PC configuré).
#   git clone https://github.com/stephanedebelenet-byte/consulting.git && cd consulting/cloud/editorial-job
#   PROJECT_ID=mon-projet bash deploy.sh
# Relancer le script est sans danger : il met à jour ce qui existe déjà.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:?Indiquez PROJECT_ID=<identifiant du projet Google Cloud>}"
REGION="${REGION:-europe-west1}"
REPO_AR="editorial"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_AR}/editorial-job:latest"
SA_NAME="editorial-job"
SA="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
SECRETS=(GITHUB_TOKEN TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID)

gcloud config set project "$PROJECT_ID" >/dev/null
echo "▶ Activation des API"
gcloud services enable run.googleapis.com cloudscheduler.googleapis.com secretmanager.googleapis.com \
  artifactregistry.googleapis.com cloudbuild.googleapis.com

echo "▶ Compte de service"
gcloud iam service-accounts describe "$SA" >/dev/null 2>&1 \
  || gcloud iam service-accounts create "$SA_NAME" --display-name="Job éditorial nextinotech"

echo "▶ Secrets (saisie masquée ; Entrée vide = conserver la valeur existante)"
for s in "${SECRETS[@]}"; do
  gcloud secrets describe "$s" >/dev/null 2>&1 || gcloud secrets create "$s" --replication-policy=automatic
  read -r -s -p "  $s : " value; echo
  if [ -n "$value" ]; then printf '%s' "$value" | gcloud secrets versions add "$s" --data-file=- >/dev/null; fi
  gcloud secrets add-iam-policy-binding "$s" --member="serviceAccount:$SA" \
    --role=roles/secretmanager.secretAccessor >/dev/null
done

echo "▶ Image du conteneur (Cloud Build)"
gcloud artifacts repositories describe "$REPO_AR" --location="$REGION" >/dev/null 2>&1 \
  || gcloud artifacts repositories create "$REPO_AR" --repository-format=docker --location="$REGION"
gcloud builds submit --tag "$IMAGE" .

SECRET_FLAGS=$(IFS=,; for s in "${SECRETS[@]}"; do printf '%s=%s:latest,' "$s" "$s"; done)
SECRET_FLAGS="${SECRET_FLAGS%,}"

deploy_job() {  # nom, MODE, timeout, mémoire
  gcloud run jobs deploy "$1" --image="$IMAGE" --region="$REGION" --service-account="$SA" \
    --set-env-vars="MODE=$2" --set-secrets="$SECRET_FLAGS" \
    --task-timeout="$3" --memory="$4" --cpu=2 --max-retries=1
}
echo "▶ Jobs Cloud Run"
deploy_job editorial-publish publish 1800s 4Gi

echo "▶ Planification (Cloud Scheduler, heure de Casablanca)"
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:$SA" \
  --role=roles/run.invoker >/dev/null
schedule() {  # nom tâche, job, cron
  local uri="https://run.googleapis.com/v2/projects/${PROJECT_ID}/locations/${REGION}/jobs/$2:run"
  local args=(--location="$REGION" --schedule="$3" --time-zone="Africa/Casablanca" --uri="$uri"
              --http-method=POST --oauth-service-account-email="$SA")
  if gcloud scheduler jobs describe "$1" --location="$REGION" >/dev/null 2>&1; then
    gcloud scheduler jobs update http "$1" "${args[@]}"
  else
    gcloud scheduler jobs create http "$1" "${args[@]}"
  fi
}
schedule publish-quotidien editorial-publish "0 6 * * 1-5"

echo
echo "✅ Terminé."
echo "   Publication : du lundi au vendredi à 6 h (articles dont la date est arrivée)."
echo "   Veille d'actualité : routine Claude Code (abonnement), voir README.md."
echo "   Test immédiat : gcloud run jobs execute editorial-publish --region=$REGION"
