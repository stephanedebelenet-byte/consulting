// Données de l'offre Control Tower (Nextinotech Digital), partagées par la page
// (src/components/ControlTower.tsx) et par ses données structurées
// (src/data/routeMeta.ts) : le balisage Service / FAQPage reprend exactement
// les paliers, tarifs et questions affichés. Module pur, sans React.

export const OFFER_TIERS = [
  { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
  { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
  { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · IA/ML · portail mobile dirigeant' },
]

// Démonstration de la plateforme (section « En exploitation » et VideoObject /
// ImageObject). Captures recadrées : ni nom de client, ni nom de conducteur.
export const CONTROL_TOWER_VIDEO = {
  src: '/videos/control-tower-demo.mp4',
  poster: '/images/control-tower/video-poster.webp',
  name: 'Tour de contrôle transport Nextinotech Digital : démonstration',
  description:
    "Parcours de la tour de contrôle d'une flotte de transport de matériaux au Maroc : carte temps réel des porteurs, statut de chaque véhicule, trajet, chargement, niveau de carburant, puis GMAO 3D avec les organes à maintenir.",
  duration: 'PT34S',
  uploadDate: '2026-09-27',
  width: 1600,
  height: 772,
}

export const CONTROL_TOWER_SCREENS = [
  { src: '/images/control-tower/carte-flotte-temps-reel.webp', w: 1600, h: 774, title: 'Carte temps réel de la flotte', alt: "Tour de contrôle : carte du Maroc avec la position et le statut de chaque camion (en route, en chargement, immobilisé), disponibilité du parc et alertes géofencing" },
  { src: '/images/control-tower/detail-trajet-vehicule.webp', w: 1600, h: 774, title: 'Trajet, carburant et rotations par véhicule', alt: "Fiche véhicule dans la tour de contrôle : alerte de ralenti, trajet de la centrale à béton au chantier, distance, durée, niveau de carburant et rotations du jour" },
  { src: '/images/control-tower/tableau-direction.webp', w: 1262, h: 1014, title: 'Tableau de bord direction', alt: "Tableau de bord direction : tonnage livré, rotations, disponibilité du parc, production sur 7 jours, alertes à traiter et temps d'attente par site" },
  { src: '/images/control-tower/gmao-3d-maintenance.webp', w: 1600, h: 774, title: 'GMAO 3D : organes à maintenir', alt: "GMAO 3D d'un camion : batterie, pneus, filtres et circuit hydraulique signalés selon le kilométrage restant avant maintenance" },
  { src: '/images/control-tower/citernes-gasoil.webp', w: 1600, h: 774, title: 'Citernes de gasoil sur sites', alt: "Suivi des citernes de gasoil par site : stock total, taux de remplissage, consommation sur 30 jours, autonomie et écarts entre consommation théorique et sonde" },
  { src: '/images/control-tower/dispatch-board-gantt.webp', w: 1360, h: 772, title: 'Dispatch board : planification par glisser-déposer', alt: "Dispatch board : ordres de transport à servir, Gantt camions par heure et flotte disponible, affectation par glisser-déposer" },
]

export const CONTROL_TOWER_FAQ = [
  { q: 'Faut-il avoir déjà un WMS et un TMS avant de déployer un control tower ?', a: "Non, mais c'est l'ordre le plus efficace. Un control tower consomme les données de vos systèmes existants ; sans WMS ni TMS, il démarre avec un périmètre plus restreint (ERP, fichiers manuels), ce qui limite la valeur des premières alertes. Le palier Mini est conçu pour démarrer même avec des systèmes sources encore basiques." },
  { q: "Quelle est la différence entre le control tower et l'intégration ERP-WMS-TMS ?", a: "L'intégration connecte techniquement vos systèmes entre eux. Le control tower va plus loin : il ajoute les seuils d'alerte, la priorisation des exceptions et la gouvernance de décision qui transforment ces données connectées en pilotage temps réel." },
  { q: 'Combien de temps pour voir un premier résultat ?', a: 'Le palier Mini (4 à 6 semaines) livre un premier périmètre de 3 à 5 dashboards. Le premier retour sur investissement visible, généralement sur les coûts de transport, arrive typiquement 3 à 6 mois après la fin du déploiement initial.' },
  { q: "L'IA est-elle obligatoire dans un control tower ?", a: "Non. Un control tower de niveau Mini ou Pilote fonctionne avec des seuils et des alertes configurés manuellement, sans IA. L'IA (détection d'anomalies, priorisation automatique) est le niveau de maturité le plus avancé, pertinent une fois la gouvernance de base stabilisée." },
]
