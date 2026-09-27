// Données de l'offre Control Tower (Nextinotech Digital), partagées par la page
// (src/components/ControlTower.tsx) et par ses données structurées
// (src/data/routeMeta.ts) : le balisage Service / FAQPage reprend exactement
// les paliers, tarifs et questions affichés. Module pur, sans React.

export const OFFER_TIERS = [
  { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
  { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
  { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · IA/ML · portail mobile dirigeant' },
]

export const OFFER_TIERS_EN = [
  { name: 'Control Tower Mini', price: 'From 135,000 MAD excl. VAT', duration: '4 to 6 weeks', desc: '3–5 key Power BI dashboards · OTIF, inventory, cash' },
  { name: 'Control Tower Pilot', price: 'From 330,000 MAD excl. VAT', duration: '2 to 3 months', desc: '8–12 dashboards + alerts + steering committee ritual', featured: true },
  { name: 'Control Tower Pro', price: 'From 840,000 MAD excl. VAT', duration: '4 to 6 months', desc: 'Mid-cap · multi-site · AI/ML · executive mobile portal' },
]

// Démonstration pédagogique de la plateforme (section « En exploitation » et
// VideoObject / ImageObject). Données fictives : noms, immatriculations et
// documents sont inventés. Seule la barre latérale portant le nom d'une
// organisation réelle est coupée des captures.
export const CONTROL_TOWER_VIDEO = {
  src: '/videos/control-tower-demo.mp4',
  poster: '/images/control-tower/video-poster.webp',
  name: 'Tour de contrôle transport Nextinotech Digital : démonstration',
  description:
    "Démonstration pédagogique d'une tour de contrôle pour une flotte de transport de matériaux au Maroc : carte temps réel des porteurs, statut de chaque véhicule, trajet, chargement, niveau de carburant, GMAO 3D avec les organes à maintenir, puis score d'éco-conduite du conducteur.",
  duration: 'PT45S',
  uploadDate: '2026-09-27',
  width: 1600,
  height: 772,
}

export const CONTROL_TOWER_VIDEO_EN = {
  ...CONTROL_TOWER_VIDEO,
  name: 'Nextinotech Digital transport control tower: demo',
  description:
    "A teaching demo of a control tower for a materials transport fleet in Morocco: real-time carrier map, status of each vehicle, trip, load, fuel level, 3D maintenance view of parts due for service, then the driver's eco-driving score.",
}

export const CONTROL_TOWER_SCREENS = [
  { src: '/images/control-tower/carte-flotte-temps-reel.webp', w: 1600, h: 774, title: 'Carte temps réel de la flotte', alt: "Tour de contrôle : carte du Maroc avec la position et le statut de chaque camion (en route, en chargement, immobilisé), disponibilité du parc et alertes géofencing" },
  { src: '/images/control-tower/detail-trajet-vehicule.webp', w: 1600, h: 774, title: 'Trajet, carburant et rotations par véhicule', alt: "Fiche véhicule dans la tour de contrôle : alerte de ralenti, trajet de la centrale à béton au chantier, distance, durée, niveau de carburant et rotations du jour" },
  { src: '/images/control-tower/tableau-direction.webp', w: 1263, h: 1600, title: 'Tableau de bord direction', alt: "Tableau de bord direction : tonnage livré, rotations, disponibilité du parc, production sur 7 jours, alertes à traiter, attente par site, niveaux des citernes, classement éco-conduite et véhicules immobilisés" },
  { src: '/images/control-tower/gmao-3d-maintenance.webp', w: 1600, h: 774, title: 'GMAO 3D : organes à maintenir', alt: "GMAO 3D d'un camion : batterie, pneus, filtres et circuit hydraulique signalés selon le kilométrage restant avant maintenance" },
  { src: '/images/control-tower/citernes-gasoil.webp', w: 1600, h: 774, title: 'Citernes de gasoil sur sites', alt: "Suivi des citernes de gasoil par site : stock total, taux de remplissage, consommation sur 30 jours, autonomie et écarts entre consommation théorique et sonde" },
  { src: '/images/control-tower/dispatch-board-gantt.webp', w: 1600, h: 773, title: 'Dispatch board : planification par glisser-déposer', alt: "Dispatch board : ordres de transport à servir, Gantt camions par heure et flotte disponible, affectation par glisser-déposer" },
  { src: '/images/control-tower/document-radar-conformite.webp', w: 1360, h: 772, title: 'Document radar : conformité conducteurs', alt: "Document radar : suivi de conformité des permis et documents de la flotte, documents en vigueur, valides et proches de l'expiration, fiche détaillée par conducteur" },
]

export const CONTROL_TOWER_SCREENS_EN = [
  { src: '/images/control-tower/carte-flotte-temps-reel.webp', w: 1600, h: 774, title: 'Real-time fleet map', alt: "Control tower: map of Morocco with the position and status of each truck (en route, loading, idle), fleet availability and geofencing alerts" },
  { src: '/images/control-tower/detail-trajet-vehicule.webp', w: 1600, h: 774, title: 'Trip, fuel and rotations per vehicle', alt: "Vehicle sheet in the control tower: idling alert, trip from the concrete plant to the site, distance, duration, fuel level and today's rotations" },
  { src: '/images/control-tower/tableau-direction.webp', w: 1263, h: 1600, title: 'Management dashboard', alt: "Management dashboard: tonnage delivered, rotations, fleet availability, 7-day production, alerts to handle, wait time per site, tank levels, eco-driving ranking and idle vehicles" },
  { src: '/images/control-tower/gmao-3d-maintenance.webp', w: 1600, h: 774, title: '3D CMMS: parts due for maintenance', alt: "3D maintenance view of a truck: battery, tires, filters and hydraulic circuit flagged by remaining mileage before service" },
  { src: '/images/control-tower/citernes-gasoil.webp', w: 1600, h: 774, title: 'Diesel tanks across sites', alt: "Diesel tank monitoring per site: total stock, fill rate, 30-day consumption, autonomy and gaps between theoretical consumption and sensor readings" },
  { src: '/images/control-tower/dispatch-board-gantt.webp', w: 1600, h: 773, title: 'Dispatch board: drag-and-drop planning', alt: "Dispatch board: transport orders to serve, hourly truck Gantt chart and available fleet, drag-and-drop assignment" },
  { src: '/images/control-tower/document-radar-conformite.webp', w: 1360, h: 772, title: 'Document radar: driver compliance', alt: "Document radar: compliance tracking for fleet licenses and documents, valid, expiring and expired, detailed sheet per driver" },
]

export const CONTROL_TOWER_FAQ_EN = [
  { q: 'What is a supply chain control tower?', a: 'A control tower is a command center that consolidates real-time data from your systems — WMS, TMS, inventory management, assets, IoT sensors — to detect deviations from plan, trigger alerts and prioritize decisions. It does not replace your software: it extracts what calls for action.' },
  { q: 'How much does a control tower cost in Morocco?', a: 'At Nextinotech, three tiers: Control Tower Mini from 135,000 MAD excl. VAT (4 to 6 weeks, 3 to 5 key dashboards), Control Tower Pilot from 330,000 MAD excl. VAT (2 to 3 months, 8 to 12 dashboards, alerts and steering committee ritual), Control Tower Pro from 840,000 MAD excl. VAT (4 to 6 months, multi-site, AI and executive mobile portal).' },
  { q: 'Which indicators does a control tower track?', a: 'Those that trigger a decision: service rate and OTIF, stockouts and coverage of critical SKUs, late orders, delivery position and ETA, fleet availability and downtime, fuel consumption, cash tied up in inventory. Choosing the indicators and their thresholds is the first step of every tier.' },
  { q: 'Is a control tower suited to an SME?', a: 'Yes, provided you start small. The Mini tier covers 3 to 5 dashboards on the topics that cost the most (customer service, inventory, cash), using data you already have. You then expand the scope once the first alerts have proven their value.' },
  { q: 'Can I see a control tower in action?', a: 'Yes: the video and screenshots on this page show a transport control tower (real-time map, vehicle sheet, maintenance, tanks, planning), on fictitious data. The interactive WMS and TMS demos on the site show the source systems that feed it.' },
  { q: 'Are you tied to a software vendor?', a: 'No. Nextinotech takes no vendor commission: we recommend and integrate whatever tools fit your context, whether Power BI dashboards, an off-the-shelf control tower platform, or custom development.' },
  { q: 'Do I need a WMS and a TMS before deploying a control tower?', a: "No, but it is the most efficient order. A control tower consumes data from your existing systems; without a WMS or TMS, it starts with a narrower scope (ERP, manual files), which limits the value of the first alerts. The Mini tier is designed to work even with still-basic source systems." },
  { q: 'What is the difference between a control tower and ERP-WMS-TMS integration?', a: 'Integration technically connects your systems to one another. A control tower goes further: it adds alert thresholds, exception prioritization and the decision governance that turn that connected data into real-time steering.' },
  { q: 'How long before seeing a first result?', a: 'The Mini tier (4 to 6 weeks) delivers an initial scope of 3 to 5 dashboards. The first visible return on investment, usually on transport costs, typically appears 3 to 6 months after the initial deployment ends.' },
  { q: 'Is AI mandatory in a control tower?', a: 'No. A Mini or Pilot-level control tower runs on manually configured thresholds and alerts, without AI. AI (anomaly detection, automatic prioritization) is the most advanced maturity level, relevant once basic governance is stable.' },
]

export const CONTROL_TOWER_FAQ = [
  { q: "Qu'est-ce qu'une control tower supply chain ?", a: "Une control tower (tour de contrôle) est un poste de pilotage qui consolide en temps réel les données de vos systèmes — WMS, TMS, gestion des stocks, actifs, capteurs IoT — pour détecter les écarts au plan, déclencher des alertes et prioriser les décisions. Elle ne remplace pas vos logiciels : elle en extrait ce qui appelle une action." },
  { q: 'Combien coûte une control tower au Maroc ?', a: "Chez Nextinotech, trois paliers : Control Tower Mini à partir de 135 000 MAD HT (4 à 6 semaines, 3 à 5 tableaux de bord clés), Control Tower Pilote à partir de 330 000 MAD HT (2 à 3 mois, 8 à 12 tableaux de bord, alertes et rituel COPIL), Control Tower Pro à partir de 840 000 MAD HT (4 à 6 mois, multi-sites, IA et portail mobile dirigeant)." },
  { q: 'Quels indicateurs suit une control tower ?', a: "Ceux qui déclenchent une décision : taux de service et OTIF, ruptures et couverture de stock des références critiques, commandes en retard de préparation, position et ETA des livraisons, disponibilité du parc et immobilisations, consommation de carburant, cash immobilisé en stock. Le choix des indicateurs et de leurs seuils est la première étape de chaque palier." },
  { q: 'Une control tower est-elle adaptée à une PME ?', a: "Oui, à condition de commencer petit. Le palier Mini couvre 3 à 5 tableaux de bord sur les sujets qui coûtent le plus (service client, stocks, cash), avec les données déjà disponibles. On étend ensuite le périmètre quand les premières alertes ont prouvé leur valeur." },
  { q: 'Peut-on voir une control tower en fonctionnement ?', a: "Oui : la vidéo et les captures de cette page montrent une tour de contrôle transport (carte temps réel, fiche véhicule, maintenance, citernes, planification), sur des données fictives. Les démonstrations interactives WMS et TMS du site montrent les systèmes sources qui l'alimentent." },
  { q: 'Êtes-vous liés à un éditeur de logiciel ?', a: "Non. Nextinotech ne touche aucune commission d'éditeur : nous recommandons et intégrons les outils qui conviennent à votre contexte, qu'il s'agisse de tableaux de bord Power BI, d'une plateforme de control tower du marché ou d'un développement sur mesure." },
  { q: 'Faut-il avoir déjà un WMS et un TMS avant de déployer un control tower ?', a: "Non, mais c'est l'ordre le plus efficace. Un control tower consomme les données de vos systèmes existants ; sans WMS ni TMS, il démarre avec un périmètre plus restreint (ERP, fichiers manuels), ce qui limite la valeur des premières alertes. Le palier Mini est conçu pour démarrer même avec des systèmes sources encore basiques." },
  { q: "Quelle est la différence entre le control tower et l'intégration ERP-WMS-TMS ?", a: "L'intégration connecte techniquement vos systèmes entre eux. Le control tower va plus loin : il ajoute les seuils d'alerte, la priorisation des exceptions et la gouvernance de décision qui transforment ces données connectées en pilotage temps réel." },
  { q: 'Combien de temps pour voir un premier résultat ?', a: 'Le palier Mini (4 à 6 semaines) livre un premier périmètre de 3 à 5 dashboards. Le premier retour sur investissement visible, généralement sur les coûts de transport, arrive typiquement 3 à 6 mois après la fin du déploiement initial.' },
  { q: "L'IA est-elle obligatoire dans un control tower ?", a: "Non. Un control tower de niveau Mini ou Pilote fonctionne avec des seuils et des alertes configurés manuellement, sans IA. L'IA (détection d'anomalies, priorisation automatique) est le niveau de maturité le plus avancé, pertinent une fois la gouvernance de base stabilisée." },
]
