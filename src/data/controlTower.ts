// Données de l'offre Control Tower (Nextinotech Digital), partagées par la page
// (src/components/ControlTower.tsx) et par ses données structurées
// (src/data/routeMeta.ts) : le balisage Service / FAQPage reprend exactement
// les paliers, tarifs et questions affichés. Module pur, sans React.

export const OFFER_TIERS = [
  { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
  { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
  { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · IA/ML · portail mobile dirigeant' },
]

export const CONTROL_TOWER_FAQ = [
  { q: 'Faut-il avoir déjà un WMS et un TMS avant de déployer un control tower ?', a: "Non, mais c'est l'ordre le plus efficace. Un control tower consomme les données de vos systèmes existants ; sans WMS ni TMS, il démarre avec un périmètre plus restreint (ERP, fichiers manuels), ce qui limite la valeur des premières alertes. Le palier Mini est conçu pour démarrer même avec des systèmes sources encore basiques." },
  { q: "Quelle est la différence entre le control tower et l'intégration ERP-WMS-TMS ?", a: "L'intégration connecte techniquement vos systèmes entre eux. Le control tower va plus loin : il ajoute les seuils d'alerte, la priorisation des exceptions et la gouvernance de décision qui transforment ces données connectées en pilotage temps réel." },
  { q: 'Combien de temps pour voir un premier résultat ?', a: 'Le palier Mini (4 à 6 semaines) livre un premier périmètre de 3 à 5 dashboards. Le premier retour sur investissement visible, généralement sur les coûts de transport, arrive typiquement 3 à 6 mois après la fin du déploiement initial.' },
  { q: "L'IA est-elle obligatoire dans un control tower ?", a: "Non. Un control tower de niveau Mini ou Pilote fonctionne avec des seuils et des alertes configurés manuellement, sans IA. L'IA (détection d'anomalies, priorisation automatique) est le niveau de maturité le plus avancé, pertinent une fois la gouvernance de base stabilisée." },
]
