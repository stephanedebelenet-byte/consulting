# Suivi de visibilité au Maroc

Panel figé : 20 intentions × 3 assistants × 3 répétitions = 180 observations par campagne. Une conversation neuve par observation, recherche activée, langue française et contexte Maroc. Consigner le modèle réellement affiché et le mode de recherche ; conserver réponse intégrale, sources et date. Les réponses sont variables ; ce panel ne démontre pas un rang universel.

Les tests sont à réaliser dans les services concernés ou avec leurs API autorisées. Un résultat Google classique ou la réponse de l'agent qui développe le site ne remplace pas une observation de ces assistants. Aucun appel API payant ni test multi-LLM n'est lancé par ce script.

Créer un tableau JSON d'observations de cette forme (exemple de structure à remplir, jamais une mesure) :

```json
{
  "promptId": "audit-01",
  "platform": "ChatGPT Search",
  "repetition": 1,
  "recordedAt": "DATE_ISO_DE_LA_MESURE",
  "country": "MA",
  "model": "MODELE_AFFICHE",
  "searchMode": "MODE_DE_RECHERCHE_AFFICHE",
  "status": "complete",
  "answerText": "REPONSE_INTEGRALE",
  "sourceUrls": [],
  "recommendedNextinotech": null
}
```

`sourceUrls` contient les liens effectivement affichés comme sources ; une simple URL écrite dans la réponse n'est pas forcément une citation. Annoter `recommendedNextinotech` à true si l'assistant recommande explicitement le cabinet pour le besoin, false après examen sans recommandation, null si non évalué. Pour un échec technique, utiliser status error ; ne pas transformer l'échec en absence de visibilité. Archiver séparément les marques concurrentes et les erreurs factuelles pour l'analyse qualitative.

```sh
node scripts/llm-visibility-report.mjs observations.json campagne-2026-11.json
```

Sans fichier d'entrée, le script produit un état **not-measured**, avec taux null et 180 observations en attente. Aucun zéro fictif. Conserver un fichier d'observations et un rapport nouveaux par campagne. Refaire à J30/J60/J90 après le premier état complet ; vérifier également l'exactitude des prix, offres, lieux et références dans les réponses. Suivre AI Overviews séparément quand cette interface est disponible pour les requêtes et le contexte concernés.
