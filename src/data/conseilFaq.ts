// FAQ de la page /conseil. Extrait de src/components/Conseil.tsx (qui
// l'importe désormais depuis ici) pour que src/data/routeMeta.ts — module
// pur, sans React — puisse le réutiliser afin de générer le JSON-LD FAQPage
// de la page /faq au moment du build, sans dupliquer ces questions/réponses.

export const servicesFAQ = [
  {
    q: 'Combien coûte un diagnostic Supply Chain?',
    a: 'Entre 35 000 et 130 000 MAD HT selon la complexité. Diagnostic Flash (35k–55k, 2 sem) pour audit rapide. Diagnostic Stratégique (80k–130k, 4–6 sem) pour analyse complète. Livrable: rapport synthèse + leviers chiffrés + session restitution.',
  },
  {
    q: 'Qu\'est-ce que DDMRP et pourquoi l\'implémenter?',
    a: 'Demand Driven Material Requirements Planning. Méthode moderne de gestion des stocks basée sur la demande réelle vs prévisions. Réduit les ruptures de 40–60%, surstocks de 20–30%, libère 15–30% du BFR. Certification requise pour bon déploiement.',
  },
  {
    q: 'Combien de temps pour déployer un WMS?',
    a: 'WMS Mini (SaaS): 6–10 semaines (80k–130k). WMS Pilote: 3–5 mois avec AMOA (180k–320k). WMS Pro (ETI): 6–10 mois (450k+). Durée = scope + nombre sites + intégrations ERP.',
  },
  {
    q: 'Avez-vous des références clients?',
    a: 'Oui. 110+ missions réalisées. Clients majeurs: Renault-Nissan, L\'Oréal Maroc, Nestlé, P&G, DHL, Huawei, J&J, Addoha, OCP. Résultats: réductions coûts 3–11%, erreurs −70–90%, productivité +25–50%.',
  },
  {
    q: 'Combien de temps dure un accompagnement Systèmes SI & IA ?',
    a: "De 4 semaines à 10 mois selon le système et le palier. Control Tower Mini : 4 à 6 semaines. APS/S&OP et e-Procurement : 6 à 8 semaines (Mini) à 9 mois (Pro). TMS : 6 à 10 semaines (Mini) à 9 mois (Pro). WMS : voir la question dédiée ci-dessus (6 semaines à 10 mois). La durée dépend du scope, du nombre de sites et des intégrations ERP nécessaires.",
  },
  {
    q: 'Rédigez-vous des cahiers des charges pour autre chose que les systèmes SI (WMS/TMS/APS) ?',
    a: "Oui. Au-delà des systèmes (WMS, TMS, APS, Control Tower, intégration IA au pilotage), nous rédigeons des cahiers des charges pour l'externalisation (entreposage en open book ou closed book, transport), les opérations spéciales (co-packing, fardelage, gestion d'inventaire RFID, vidéosurveillance) et les équipements (rayonnage conventionnel ou à accumulation, engins de manutention thermiques et électriques avec dimensionnement). De 25 000 à 80 000 MAD HT selon le nombre de lots couverts, ou sur devis pour un périmètre multi-sites.",
  },
  {
    q: 'Proposez-vous un accompagnement après le déploiement WMS/TMS/APS ?',
    a: "Oui, via notre offre AMOA & Pilotage Projet — nous représentons vos intérêts face à l'intégrateur, avec gestion des avenants, comité de pilotage, change management des équipes et stabilisation post go-live. De l'accompagnement léger (2 à 4 mois) au programme management multi-projets (sur devis, 6 à 18 mois).",
  },
  {
    q: "Qu'est-ce qui différencie l'Accompagnement Régimes Douaniers Suspensifs d'un cabinet de transit classique ?",
    a: "Notre angle est la réconciliation stock théorique (vu par la douane) vs stock réel (vu par la logistique), en lien direct avec notre expertise DDMRP et gestion de stock — pas seulement la formalité déclarative qu'un cabinet de transit classique traite. Particulièrement pertinent en automobile et aéronautique, où cet écart devient vite un risque de redressement s'il n'est pas traité en amont.",
  },
  {
    q: "Qu'est-ce que le statut OEA et combien de temps prend son obtention ?",
    a: "L'Opérateur Économique Agréé (OEA) est un statut délivré par l'ADII qui accorde des simplifications douanières (catégorie A ou B) aux entreprises jugées fiables et conformes. L'accompagnement se déroule en 3 phases — diagnostic et cadrage, mise en conformité documentaire, assistance à l'audit ADII — pour une durée totale de 8 à 15 mois selon les écarts constatés lors du diagnostic initial. L'objectif contractuel est la notification formelle d'agrément par l'ADII.",
  },
]
