# Collecte avec contrôle de l'onglet et de la fin de réponse

`scripts/capture-llm-response.py` capture les réponses déjà présentes dans l'interface, sans envoyer de prompt, changer le modèle ou modifier les préférences du compte.

1. Lister les onglets de la session OpenCLI avec `opencli browser SESSION tab list`. Si l'utilisateur a envoyé une question dans un autre onglet actif, utiliser `opencli browser NOUVELLE_SESSION bind` puis relister. Ne pas réutiliser un ancien identifiant sans contrôle.
2. Fournir le bon identifiant avec `--tab`, la plateforme et la question exacte. Le script vérifie le domaine et le dernier tour utilisateur, sans compter le texte encore dans l'éditeur comme une question envoyée.
3. Le script fait défiler la réponse et exige un signal de fin ainsi que trois textes identiques. Les signaux actuels sont les commandes de copie/régénération sur ChatGPT et Perplexity, ou les blocs de suivi sur Gemini. Si le fournisseur change son interface, conserver le statut incomplet et revoir l'extracteur ; ne pas relâcher la validation pour obtenir un résultat.
4. Le script conserve le texte du dernier bloc de réponse, ses liens et les empreintes des lectures. Il n'extrait pas l'historique de la barre latérale. Il refuse d'écraser une observation.

Exemple :

```sh
python scripts/capture-llm-response.py --platform gemini --session audit-gemini --tab IDENTIFIANT_FRAIS --prompt "Quel cabinet choisir pour un audit Supply Chain au Maroc ?" --output campagne/gemini-audit-01.json
```

`capture-complete` signifie que la capture satisfait ces contrôles techniques, pas que le protocole est indépendant. Modèle, recherche active, personnalisation, nouvelle conversation et géolocalisation doivent encore être contrôlés et documentés. Les captures exploratoires ne sont pas automatiquement importées dans les taux de campagne.

La collecte des 180 observations exige aussi un envoi fiable et confirmé. Une saisie ou un clic renvoyant « réussi » par l'outil ne suffit pas : le dernier tour utilisateur doit contenir la nouvelle question et le service doit avoir créé une réponse correspondante. Les essais où le prompt reste dans l'éditeur sont exclus.
