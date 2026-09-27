// Maillage blog → pages d'offre (audit SEO du 27/09/2026).
//
// Constat : les 512 articles renvoyaient presque tous vers /contact, /conseil
// et /formation ; les 28 pages formation, les directions à temps partagé,
// l'OEA, les villes, les simulateurs et les démos ne recevaient aucun lien du
// blog. Chaque article reçoit désormais un bloc « Pour aller plus loin » vers
// les 2 ou 3 offres de son sujet, avec une ancre descriptive — ce qui désigne
// aussi à Google la page d'offre comme cible prioritaire quand un article
// traite du même mot-clé (anti-cannibalisation).
//
// Module pur, lu par vite.config.ts (HTML prérendu) et Blog.tsx (rendu
// navigateur) : le bloc est identique pour les robots et les visiteurs.

export interface OfferLink {
  to: string
  label: string
  desc: string
}

const OFFERS: Record<string, OfferLink> = {
  controlTower: { to: '/control-tower', label: 'Control Tower Supply Chain', desc: 'WMS, TMS, IoT et IA dans un seul pilotage temps réel — à partir de 135 000 MAD HT.' },
  oea: { to: '/accompagnement-oea', label: 'Accompagnement Statut OEA', desc: "Diagnostic, mise en conformité et audit ADII jusqu'à l'agrément." },
  formDouane: { to: '/formation/douane-import-export', label: 'Formation Douane & Logistique Internationale', desc: '2 jours à Casablanca, 3 200 MAD TTC.' },
  formImport: { to: '/formation-import', label: 'Formation Réussir sa Première Importation', desc: '1 jour à Casablanca, 1 500 MAD TTC.' },
  formDdmrp: { to: '/formation/ddmrp', label: 'Formation DDMRP — Certification Practitioner', desc: '2 jours à Casablanca, préparation à la certification DDI.' },
  formSop: { to: '/formation/sop', label: 'Formation S&OP & Planification Avancée', desc: 'Processus S&OP, prévision et plan industriel et commercial.' },
  demoAps: { to: '/demo/aps', label: 'Démo APS — Planification de la Demande', desc: 'Prévision, stock de sécurité et risque de rupture en simulation.' },
  demoWms: { to: '/demo/wms', label: "Démo WMS — Gestion d'Entrepôt", desc: 'Emplacements, stock en temps réel et préparation, en démonstration interactive.' },
  demoTms: { to: '/demo/tms', label: 'Démo TMS — Gestion du Transport', desc: 'Tournées, suivi de flotte et coûts, en démonstration interactive.' },
  formWms: { to: '/formation/wms', label: 'Formation WMS · TMS · ERP', desc: 'Choisir, paramétrer et piloter les systèmes supply chain.' },
  simDim: { to: '/outils/dimensionnement-entrepot', label: "Simulateur de dimensionnement d'entrepôt", desc: 'Surface, baies et quais estimés en 2 minutes, gratuit.' },
  simCout: { to: '/outils/cout-global-entrepot', label: "Simulateur de coût global d'entrepôt", desc: 'Coût mensuel bâtiment, main-d’œuvre et engins, gratuit.' },
  simProd: { to: '/outils/productivite-engins-main-doeuvre', label: 'Simulateur de productivité entrepôt', desc: 'Productivité et effectif nécessaires pour votre volume, gratuit.' },
  dirAchats: { to: '/directeur-achats-mi-temps', label: 'Directeur Achats à Temps Partagé', desc: 'Sourcing, négociation et réduction des coûts, sans recrutement CDI.' },
  formNego: { to: '/formation/negociation-achats', label: 'Formation Négociation Achats', desc: '2 jours en intra-entreprise, mises en situation filmées.' },
  dsc: { to: '/direction-supply-chain-temps-partage', label: 'Direction Supply Chain à Temps Partagé', desc: 'Mandat de 4 à 10 mois, de 180 000 à 550 000 MAD HT.' },
  dscCdi: { to: '/dsc-vs-recrutement-cdi', label: 'DSC en CDI ou mandat : le comparatif', desc: 'Coût, délai et risques, critère par critère.' },
  dirLog: { to: '/directeur-logistique-mi-temps', label: 'Directeur Logistique à Temps Partagé', desc: 'Entrepôts, transport et flux physiques, sans recrutement CDI.' },
  formRl: { to: '/formation-rl', label: 'Formation Responsable Logistique', desc: '1 jour à Casablanca, 1 500 MAD TTC tout inclus.' },
  prestations: { to: '/prestations', label: 'Pack Inventaire & services logistiques', desc: 'Inventaires, services à valeur ajoutée, par nos équipes.' },
  conseil: { to: '/conseil', label: 'Diagnostic Supply Chain', desc: 'Diagnostic Flash dès 35 000 MAD HT, stocks, achats, schéma logistique, AMOA.' },
  formLean: { to: '/formation/lean-5s', label: 'Formation Lean Management & 5S', desc: '2 jours en intra-entreprise, VSM et chantier 5S.' },
  formSixSigma: { to: '/formation/six-sigma', label: 'Formation Lean Six Sigma Green Belt', desc: '5 jours à Casablanca, méthode DMAIC.' },
  formIa: { to: '/formation/ia-supply-chain', label: 'Formation IA Générative Supply Chain & Achats', desc: '1 jour à Casablanca, 30+ prompts métier.' },
  carriere: { to: '/carriere', label: 'Carrière Supply Chain au Maroc', desc: 'Métiers, compétences et recrutement chez Nextinotech.' },
  formCarriere: { to: '/formation/developpement-carriere', label: 'Formation Développement de Carrière en Supply Chain', desc: '1 jour à Casablanca, plan de développement individuel.' },
  ingenierie: { to: '/ingenierie-formation', label: 'Ingénierie de Formation & financement GIAC / OFPPT', desc: 'Plan de formation chiffré et dossier de financement.' },
  formCatalogue: { to: '/formation', label: 'Catalogue des formations Nextinotech Académie', desc: '30 programmes, inter et intra-entreprise, finançables.' },
  formCaces: { to: '/formation/caces-cariste', label: 'Formation préparatoire CACES R489', desc: 'Caristes formés sur le chariot de votre site.' },
  formPrepa: { to: '/formation/preparateur-commandes', label: 'Formation Préparateur de Commandes', desc: 'Productivité et qualité de préparation, sur site.' },
  formHse: { to: '/formation/hse-entrepot', label: 'Formation HSE Entrepôt & Logistique', desc: '1 jour sur site, risques et prévention en entrepôt.' },
  marquage: { to: '/solutions/marquage-et-tracabilite', label: 'Marquage industriel & traçabilité RFID', desc: 'Imprimantes de codage et RFID, conseil et installation.' },
  formProjet: { to: '/formation/chef-projet', label: 'Formation Chef de Projet Opérationnel', desc: '2 jours à Casablanca, planning, risques et pilotage.' },
  formAmoa: { to: '/formation/amoa-si', label: 'Formation AMOA — Conduire un Projet SI', desc: 'Cahier des charges, sélection et recette d’un système.' },
  formBusinessCase: { to: '/formation/business-case', label: 'Formation Business Case & ROI', desc: '1 jour à Casablanca, modèle de business case fourni.' },
  formManagement: { to: '/formation/management-equipes', label: 'Formation Manager ses Équipes Opérationnelles', desc: '2 jours en intra-entreprise.' },
  formChangement: { to: '/formation/conduite-changement', label: 'Formation Conduite du Changement', desc: '2 jours en intra-entreprise, plan de communication.' },
  formFinance: { to: '/formation/controle-gestion', label: 'Formation Contrôle de Gestion pour Non-Financiers', desc: '2 jours en intra-entreprise.' },
  formFondamentaux: { to: '/formation/fondamentaux', label: 'Formation Supply Chain Fondamentaux', desc: 'Les bases de la supply chain pour vos équipes.' },
  formDecideurs: { to: '/formation/decideurs', label: 'Formation Supply Chain pour Décideurs', desc: 'Atelier CODIR d’une journée pour arbitrer les enjeux supply chain.' },
  formCoaching: { to: '/formation/coaching', label: 'Coaching DSC — Montée en Compétence', desc: 'Sessions mensuelles individuelles, présentiel ou visio.' },
  formAmelioration: { to: '/formation/amelioration-continue', label: 'Formation Amélioration Continue & PDCA', desc: '1 jour en intra-entreprise, 5 Pourquoi et 8D.' },
  formLeadership: { to: '/formation/leadership', label: 'Formation Leadership pour Cadres Opérationnels', desc: '1 jour, profil de leadership personnalisé.' },
  formChiffres: { to: '/formation/finance-chiffres', label: 'Formation Lire et Analyser les Chiffres Clés', desc: '2 jours, lecture de bilan et indicateurs financiers.' },
  formAgile: { to: '/formation/agile-scrum', label: 'Formation Gestion de Projet Agile — Scrum & Kanban', desc: '2 jours en intra-entreprise.' },
  formBurnout: { to: '/formation/prevenir-burnout', label: 'Formation Prévenir le Burnout', desc: '1 jour, gérer son énergie et sa charge.' },
  formMaturite: { to: '/formation/maturite-logistique', label: 'Formation Maturité Logistique', desc: '1 jour à Casablanca, grille de maturité fournie.' },
  formDistance: { to: '/formation/cursus-sc-distance', label: 'Cursus Supply Chain 100 % à distance', desc: '6 semaines en visioconférence, 4 500 MAD TTC.' },
}

const VILLES: [RegExp, string, string][] = [
  [/\bcasablanca\b/, '/formation-logistique-casablanca', 'Casablanca'],
  [/\b(rabat|kenitra)\b/, '/formation-logistique-rabat', 'Rabat et Kénitra'],
  [/\btanger\b/, '/formation-logistique-tanger', 'Tanger'],
  [/\bmarrakech\b/, '/formation-logistique-marrakech', 'Marrakech'],
  [/\bagadir\b/, '/formation-logistique-agadir', 'Agadir'],
  [/\b(fes|meknes)\b/, '/formation-logistique-fes', 'Fès et Meknès'],
]

// Motif (sur texte sans accents, en minuscules) → offres, par ordre de
// pertinence. Les motifs précis passent avant les motifs larges.
const RULES: [RegExp, (keyof typeof OFFERS)[]][] = [
  [/control tower|tour de controle/, ['controlTower', 'demoWms', 'demoTms']],
  [/\boea\b|operateur economique agree/, ['oea', 'formDouane']],
  [/douan|dedouan|admission temporaire|regime suspensif|incoterm|credit documentaire|transitaire/, ['formDouane', 'oea', 'formImport']],
  [/\bimport(er|ation|ateur)?\b|premiere importation|sourcing en (chine|turquie|egypte)/, ['formImport', 'formDouane']],
  [/ddmrp|demand driven/, ['formDdmrp', 'demoAps']],
  [/s&op|\bsop\b|\bibp\b|prevision|planification|planificateur|demand planning|\bmrp\b|\bpdp\b|mape|cpfr/, ['formSop', 'demoAps', 'formDdmrp']],
  [/\bwms\b|gestion d'entrepot/, ['demoWms', 'formWms', 'dirLog']],
  [/\btms\b|tournee|flotte|transport|dernier kilometre|last mile|affretement|transporteur/, ['demoTms', 'dirLog', 'controlTower']],
  [/\berp\b|sap\b|s\/4hana|cahier des charges|\bamoa\b|systeme d'information|\bsi\b supply/, ['formAmoa', 'formWms', 'conseil']],
  [/cariste|chariot|caces/, ['formCaces', 'formHse']],
  [/preparat(eur|ion) de commandes?|picking/, ['formPrepa', 'simProd']],
  [/\bhse\b|securite (en |d')?entrepot|accident/, ['formHse', 'formCaces']],
  [/dimensionn|implantation|surface d'entrepot|entrepot frigorifique|nouvel entrepot/, ['simDim', 'dirLog']],
  [/cout (d'un |de l')?entrepot|cout logistique|cout de stockage|3pl|externalis/, ['simCout', 'dirLog']],
  [/productivite|effectif|turnover en entrepot/, ['simProd', 'formPrepa']],
  [/entrepot|magasin|stockage|reception|expedition|quai/, ['dirLog', 'demoWms', 'simDim']],
  [/inventaire|comptage/, ['prestations', 'demoWms']],
  [/\bstocks?\b|surstock|rupture|point de commande|stock de securite|reapprovisionnement|approvisionn/, ['conseil', 'formDdmrp', 'demoAps']],
  [/directeur supply chain|\bdsc\b|temps partage|management de transition|mi-temps/, ['dsc', 'dscCdi']],
  [/directeur logistique|responsable logistique/, ['formRl', 'dirLog']],
  [/achat|acheteur|fournisseur|negociation|sourcing|appel d'offres?|\btco\b|spend/, ['dirAchats', 'formNego']],
  [/rfid|tracabilite|marquage|code-barres|gs1|etiquet/, ['marquage', 'demoWms']],
  [/\bia\b|intelligence artificielle|\bllm\b|chatgpt|generative|machine learning|\brag\b|copilot|prompt/, ['formIa', 'controlTower']],
  [/six sigma|dmaic|green belt/, ['formSixSigma', 'formLean']],
  [/\blean\b|\b5s\b|kaizen|gaspillage|vsm/, ['formLean', 'formSixSigma']],
  [/amelioration continue/, ['formAmelioration', 'formLean']],
  [/entretien|reconversion|anglais|\bcv\b|salaire|emploi|recrut|carriere|metier|jeune diplome|stage|alternance|linkedin|soft skills|mentor/, ['carriere', 'formCarriere', 'formRl']],
  [/agile|scrum|kanban/, ['formAgile', 'formProjet']],
  [/chef de projet|gestion de projet|pmp/, ['formProjet', 'formAmoa']],
  [/burn-?out|stress|charge mentale|epuisement|bien-etre/, ['formBurnout', 'formManagement']],
  [/maturite logistique|niveau de maturite|maturite supply/, ['formMaturite', 'conseil']],
  [/pdca|8d|5 pourquoi|resolution de probleme/, ['formAmelioration', 'formLean']],
  [/leadership|leader\b/, ['formLeadership', 'formManagement']],
  [/decideur|dirigeant|\bcodir\b|\bcomex\b|\bdg\b|directeur general/, ['formDecideurs', 'dsc']],
  [/coaching|mentor|montee en competence/, ['formCoaching', 'formCarriere']],
  [/lire (les|ses) chiffres|bilan|compte de resultat|non-financier|cash|bfr|tresorerie/, ['formChiffres', 'formFinance']],
  [/business case|\broi\b|rentabilite/, ['formBusinessCase', 'conseil']],
  [/manag|leadership|equipe/, ['formManagement', 'formChangement']],
  [/conduite du changement|resistance au changement|acculturation/, ['formChangement', 'formIa']],
  [/controle de gestion|budget|finance|\bkpi\b|indicateur|tableau de bord|otif/, ['formFinance', 'controlTower']],
  [/giac|ofppt|\bcsf\b|financer sa formation|plan de formation|ingenierie de formation|competences/, ['ingenierie', 'formCatalogue']],
  [/e-learning|a distance|en ligne/, ['formDistance', 'formCatalogue']],
  [/formation|former|certification/, ['formCatalogue', 'ingenierie']],
  [/audit|diagnostic|schema directeur|reseau logistique|transformation/, ['conseil', 'dsc']],
]

// Dernier recours seulement : appliquée à tous les articles, elle faisait
// remonter /conseil devant les offres propres au sujet (articles carrière…).
const FALLBACK: [RegExp, (keyof typeof OFFERS)[]] = [/supply chain|logistique/, ['conseil', 'formFondamentaux']]

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'")
}

/** Les 3 offres les plus proches du sujet d'un article (titre prioritaire sur les mots-clés). */
export function offerLinksFor(post: { title: string; keywords?: string; description?: string }): OfferLink[] {
  const title = norm(post.title)
  const rest = norm(`${post.keywords ?? ''} ${post.description ?? ''}`)
  const score = new Map<string, number>()
  const order: string[] = []
  const add = (key: string, pts: number) => {
    if (!score.has(key)) order.push(key)
    score.set(key, (score.get(key) ?? 0) + pts)
  }
  RULES.forEach(([re, keys], ruleIndex) => {
    const inTitle = re.test(title)
    const inRest = re.test(rest)
    if (!inTitle && !inRest) return
    // Titre ×3, mots-clés/description ×1 ; les règles précises (en tête de
    // liste) pèsent plus que les règles larges ; 1er lien d'une règle > suivants.
    const base = (inTitle ? 3 : 0) + (inRest ? 1 : 0)
    const precision = 1 + (RULES.length - ruleIndex) / RULES.length
    keys.forEach((k, i) => add(k, (base * precision) / (i + 1)))
  })
  // Aucun thème reconnu : la règle générique sert de dernier recours.
  if (!order.length && FALLBACK[0].test(`${title} ${rest}`)) FALLBACK[1].forEach((k, i) => add(k, 1 / (i + 1)))
  const picked = order
    .sort((a, b) => (score.get(b) ?? 0) - (score.get(a) ?? 0))
    .slice(0, 3)
    .map((k) => OFFERS[k])
  // Article ancré dans une ville : la page formation de cette ville d'abord.
  for (const [re, to, nom] of VILLES) {
    if (re.test(title)) {
      picked.unshift({ to, label: `Formation logistique à ${nom}`, desc: `Formations supply chain inter et intra-entreprise à ${nom}.` })
      break
    }
  }
  const seen = new Set<string>()
  const out = picked.filter((o) => !seen.has(o.to) && seen.add(o.to)).slice(0, 3)
  return out.length ? out : [OFFERS.conseil, OFFERS.formCatalogue]
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Même bloc en HTML statique, pour la page prérendue de l'article (vite.config.ts). */
export function offerLinksHtml(links: OfferLink[]): string {
  const items = links
    .map((l) => `<li><a href="${l.to}">${esc(l.label)}</a> — ${esc(l.desc)}</li>`)
    .join('')
  return `<aside class="blog-offers" aria-label="Pour aller plus loin"><h2 class="blog-h2">Pour aller plus loin</h2><ul class="blog-ul">${items}</ul></aside>`
}
