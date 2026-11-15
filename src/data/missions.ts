// Catalogue des missions de conseil, une page par mission (/missions/<id>).
//
// Module pur (aucun React) : lu par routeMeta.ts (prérendu, sitemap, JSON-LD),
// par offerLinks.ts (maillage depuis le blog) et par les pages /missions.
// Les prix affichés sont des fourchettes publiques HT ; le détail des jours et
// les prix planchers restent internes (fiches missions, hors dépôt).
//
// `motif` sert au maillage : il est testé sur les slugs d'articles (texte sans
// accents, en minuscules) pour lister les articles liés sur la page mission,
// et sur le texte des articles pour proposer la mission dans « Pour aller plus loin ».

export type FamilleId =
  | 'conformite'
  | 'normes'
  | 'export'
  | 'groupes'
  | 'performance'
  | 'couts'
  | 'investissement'
  | 'audit'

export interface Famille {
  id: FamilleId
  label: string
  accroche: string
}

export const FAMILLES: Famille[] = [
  { id: 'conformite', label: 'Conformité & réglementation', accroche: "Une échéance légale, une déclaration, un contrôle : se mettre en règle sans désorganiser l'entreprise." },
  { id: 'normes', label: 'Normes & certifications', accroche: "Préparer le volet achats et logistique d'un audit de certification ou d'un audit client." },
  { id: 'export', label: 'Exigences des clients & export', accroche: "Répondre à ce que vos clients européens et internationaux exigent de leurs fournisseurs." },
  { id: 'groupes', label: 'Filiales de groupes internationaux', accroche: "Aligner la filiale sur les exigences du siège : politique achats, contrôle interne, conformité." },
  { id: 'performance', label: 'Performance & cash', accroche: 'Réduire les coûts, libérer de la trésorerie, sécuriser les grands contrats.' },
  { id: 'couts', label: 'Coûts, prix de revient & contrôle de gestion', accroche: 'Connaître le vrai coût de la logistique, du transport et de chaque client, et le piloter chaque mois.' },
  { id: 'investissement', label: 'Investissement & business plans', accroche: 'Chiffrer un projet avant de s’engager : nouvelle activité, nouvel entrepôt, nouvelle flotte.' },
  { id: 'audit', label: 'Audit opérationnel', accroche: 'Vérifier factures, contrats, stocks et coûts, et récupérer ce qui doit l’être.' },
]

export interface MissionVersion {
  nom: string
  contenu: string
  duree: string
  prix: string
}

export interface Mission {
  id: string
  famille: FamilleId
  titre: string
  /** Titre court pour les listes et le fil d'Ariane. */
  court: string
  /** Titre SEO (60 caractères au plus) quand le titre dépasse. */
  seoTitre?: string
  accroche: string
  declencheurs: string[]
  pourQui: string
  duree: string
  prix: string
  livrables: string[]
  etapes: string[]
  versions?: MissionVersion[]
  limites?: string
  formations?: { to: string; label: string }[]
  liens?: { to: string; label: string }[]
  /** Motif testé sur les slugs et le texte (sans accents, minuscules) des articles. */
  motif: RegExp
  faq: { q: string; a: string }[]
}

const FORM_CATALOGUE = { to: '/formation', label: 'Catalogue des formations (financement CSF / GIAC possible)' }
const FORM_DOUANE = { to: '/formation/douane-import-export', label: 'Formation Douane & logistique internationale' }
const FORM_IMPORT = { to: '/formation-import', label: 'Formation Réussir sa première importation' }
const FORM_STOCKS = { to: '/formation/gestion-stocks-approvisionnements', label: 'Formation Gestion des stocks et des approvisionnements' }
const FORM_SRM = { to: '/formation/performance-risques-fournisseurs-srm', label: 'Formation Performance et risques fournisseurs (SRM)' }
const FORM_NEGO = { to: '/formation/negociation-achats', label: 'Formation Négociation achats' }
const FORM_CG = { to: '/formation/controle-gestion', label: 'Formation Contrôle de gestion pour non-financiers' }
const FORM_BC = { to: '/formation/business-case', label: 'Formation Business case & ROI' }
const FORM_CHIFFRES = { to: '/formation/finance-chiffres', label: 'Formation Lire et analyser les chiffres clés' }
const FORM_FROID = { to: '/formation/logistique-chaine-froid-produits-sensibles', label: 'Formation Logistique de la chaîne du froid' }
const FORM_TRANSPORT = { to: '/formation/transport-routier-couts-performance', label: 'Formation Transport routier : coûts, flotte et performance' }
const FORM_HSE = { to: '/formation/hse-entrepot', label: 'Formation HSE entrepôt & logistique' }
const FORM_RISQUES = { to: '/formation/risques-continuite-supply-chain', label: 'Formation Risques et continuité de la supply chain' }
const FORM_SOP = { to: '/formation/sop', label: 'Formation S&OP et planification' }

const L_OEA = { to: '/accompagnement-oea', label: 'Accompagnement au statut OEA' }
const L_DIAG = { to: '/diagnostic-supply-chain', label: 'Diagnostic supply chain' }
const L_CONSEIL = { to: '/conseil', label: 'Conseil supply chain, achats et schéma logistique' }
const L_DSC = { to: '/direction-supply-chain-temps-partage', label: 'Direction supply chain à temps partagé' }
const L_DA = { to: '/directeur-achats-mi-temps', label: 'Directeur achats à temps partagé' }
const L_PRESTA = { to: '/prestations', label: 'Pack Inventaire et prestations logistiques' }
const L_SIM_DIM = { to: '/outils/dimensionnement-entrepot', label: "Simulateur de dimensionnement d'entrepôt" }
const L_SIM_COUT = { to: '/outils/cout-global-entrepot', label: "Simulateur de coût global d'entrepôt" }
const L_SIM_PROD = { to: '/outils/productivite-engins-main-doeuvre', label: 'Simulateur de productivité entrepôt' }
const L_INGE = { to: '/ingenierie-formation', label: 'Ingénierie de formation et financement CSF / GIAC' }

const m = (id: string) => ({ to: `/missions/${id}`, label: '' })

export const MISSIONS: Mission[] = [
  // ── CONFORMITÉ ─────────────────────────────────────────────────────────
  {
    id: 'conformite-delais-de-paiement-loi-69-21',
    famille: 'conformite',
    titre: 'Conformité aux délais de paiement (loi 69-21)',
    court: 'Délais de paiement (loi 69-21)',
    accroche: "Mettre l'entreprise en règle avec la loi 69-21, côté client comme côté fournisseur, et faire de la contrainte un levier de trésorerie.",
    declencheurs: [
      'Déclaration périodique des délais de paiement à la DGI, désormais exigée des entreprises de plus de 2 M MAD de chiffre d’affaires',
      'Amendes pour retard de paiement et sanctions en cas de déclaration absente ou inexacte',
      'Fournisseurs payés en retard faute de réception ou de bon à payer à temps',
    ],
    pourQui: 'DAF, comptables, directeurs achats de PME et d’ETI',
    duree: '2 à 8 semaines',
    prix: '35 000 – 130 000 MAD HT',
    livrables: [
      'Cartographie des retards de paiement sur 12 mois, par fournisseur, famille et motif',
      "Estimation de l'exposition aux amendes",
      'Diagnostic du circuit commande → réception → facture → bon à payer → paiement',
      'Procédure de déclaration et tableau de bord de suivi',
      'En version complète : renégociation des conditions avec les principaux fournisseurs et formation des équipes',
    ],
    etapes: ['Extraction et analyse des factures', 'Entretiens et diagnostic du processus', 'Plan d’action, procédure et tableau de bord', 'Restitution à la direction'],
    versions: [
      { nom: 'Essentiel', contenu: 'Analyse des factures, diagnostic du processus, procédure, tableau de bord', duree: '2 à 3 semaines', prix: '35 000 – 50 000 MAD HT' },
      { nom: 'Complète', contenu: 'Essentiel + renégociation de 20 fournisseurs, première déclaration accompagnée, formation', duree: '6 à 8 semaines', prix: '90 000 – 130 000 MAD HT' },
    ],
    limites: 'Pas de conseil juridique ni fiscal opposable : l’état des impayés reste visé par le professionnel comptable de l’entreprise.',
    formations: [FORM_CATALOGUE],
    liens: [m('programme-bfr-cash-stocks'), m('facturation-electronique-circuit-achats')],
    motif: /delai[s]?-de-paiement|69-21|retard[s]?-de-paiement|bon-a-payer/,
    faq: [
      { q: 'Quelles entreprises sont concernées par la déclaration des délais de paiement ?', a: "Les personnes physiques et morales dont le chiffre d'affaires dépasse 2 millions de dirhams, y compris depuis 2025 les entreprises réalisant entre 2 et 10 millions de dirhams. Le diagnostic commence par vérifier votre situation et votre calendrier de déclaration." },
      { q: 'La mission peut-elle réduire les amendes déjà dues ?', a: "Non, la mission ne revient pas sur une amende due. Elle réduit les retards futurs en traitant leurs causes : réceptions non saisies, factures bloquées, validations qui traînent, conditions de paiement mal négociées." },
      { q: 'Combien de temps faut-il pour voir un effet sur les délais ?', a: "Les premiers effets apparaissent en général dès le trimestre suivant, lorsque les factures bloquées sont traitées et que le circuit de validation est raccourci. L'indicateur suivi est la part de factures payées dans les délais." },
    ],
  },
  {
    id: 'inventaire-fin-exercice',
    famille: 'conformite',
    titre: "Inventaire de fin d'exercice & fiabilisation des stocks",
    court: "Inventaire de fin d'exercice",
    accroche: 'Un inventaire annuel préparé, compté et justifié, qui passe sans réserve devant le commissaire aux comptes, puis un stock fiable toute l’année.',
    declencheurs: [
      "Inventaire obligatoire au moins une fois par exercice (loi 9-88, article 5)",
      'Réserves ou observations du commissaire aux comptes',
      'Écarts d’inventaire inexpliqués et dépréciations subies en fin d’année',
    ],
    pourQui: 'DAF, contrôleurs de gestion, responsables logistique, experts-comptables',
    duree: '1 à 8 semaines',
    prix: '35 000 – 150 000 MAD HT',
    livrables: [
      'Rétroplanning, procédure d’inventaire et plan de comptage par zone',
      'Formation des équipes de comptage',
      'Supervision du jour J : comptage, double comptage, recomptages',
      'Analyse et justification des écarts, proposition de dépréciation des stocks dormants',
      'Dossier prêt pour le commissaire aux comptes',
    ],
    etapes: ['Préparation (6 semaines avant)', 'Formation et répétition', 'Comptage et supervision', 'Écarts, valorisation et rapport'],
    versions: [
      { nom: 'Préparé & supervisé', contenu: 'Vos équipes comptent, nous préparons, formons, supervisons et analysons', duree: '1 à 3 semaines', prix: '35 000 – 60 000 MAD HT' },
      { nom: 'Clé en main', contenu: 'Nos équipes de comptage, encadrées par nos consultants', duree: '1 à 3 semaines', prix: '75 000 – 150 000 MAD HT' },
      { nom: 'Fiabilisation annuelle', contenu: "Mise en place de l'inventaire tournant et des indicateurs de fiabilité", duree: '4 à 8 semaines', prix: '45 000 – 75 000 MAD HT' },
    ],
    formations: [FORM_STOCKS],
    liens: [L_PRESTA, m('audit-stocks-demarque')],
    motif: /inventaire|depreci|stock-dormant|obsolete/,
    faq: [
      { q: "Faut-il arrêter l'activité pendant l'inventaire ?", a: "Un inventaire annuel complet suppose de geler les mouvements sur la zone comptée. Le plan de comptage réduit cette durée en découpant l'entrepôt par zones et en organisant les expéditions avant et après. L'inventaire tournant permet ensuite d'éviter l'arrêt annuel." },
      { q: 'Travaillez-vous avec le commissaire aux comptes ?', a: "Oui. Le commissaire aux comptes assiste en général au comptage ou en contrôle la méthode. Nous préparons la procédure et le dossier d'écarts dans le format qu'il attend, sans nous substituer à sa mission de certification." },
      { q: 'Quand faut-il commencer à préparer un inventaire de fin décembre ?', a: "Idéalement six semaines avant : il faut le temps de nettoyer les données, de traiter les en-cours, de former les compteurs et de planifier les expéditions. Une préparation en deux semaines reste possible pour un seul site." },
    ],
  },
  {
    id: 'facturation-electronique-circuit-achats',
    famille: 'conformite',
    titre: 'Facturation électronique : préparer le circuit achats et réception',
    court: 'Facturation électronique',
    accroche: 'Préparer la commande, la réception et la facture fournisseur avant la facture électronique obligatoire, pour ne pas perdre la déductibilité des charges.',
    declencheurs: [
      'Généralisation progressive de la facture électronique par la DGI : grandes entreprises d’abord, puis PME et ETI',
      'Factures non conformes qui exposent au rejet de la déductibilité des charges',
      'Fichier fournisseurs incomplet ou en doublon',
    ],
    pourQui: 'DAF, DSI, directeurs achats',
    duree: '3 à 10 semaines',
    prix: '35 000 – 140 000 MAD HT',
    livrables: [
      'État de préparation du processus de la commande au paiement',
      'Contrôle qualité du fichier fournisseurs',
      'Règles de rapprochement commande, réception et facture',
      'Cahier des charges de la solution et accompagnement du choix (sans revente de logiciel)',
    ],
    etapes: ['Diagnostic du circuit', 'Nettoyage des données fournisseurs', 'Cahier des charges', 'Sélection et bascule'],
    versions: [
      { nom: 'État de préparation', contenu: 'Diagnostic du circuit, fichier fournisseurs, plan d’action', duree: '3 à 4 semaines', prix: '35 000 – 50 000 MAD HT' },
      { nom: 'Préparation complète', contenu: "État de préparation + cahier des charges + sélection de l'éditeur + bascule", duree: '8 à 10 semaines', prix: '80 000 – 140 000 MAD HT' },
    ],
    limites: "Nextinotech n'est ni éditeur ni intégrateur : le volet fiscal reste chez l'expert-comptable de l'entreprise.",
    liens: [m('conformite-delais-de-paiement-loi-69-21'), m('controle-interne-achats')],
    motif: /facturation-electronique|facture-electronique|rapprochement/,
    faq: [
      { q: 'Pourquoi un cabinet supply chain sur la facture électronique ?', a: "Parce que la majorité des factures rejetées ou bloquées le sont à cause du circuit amont : commande absente, réception non saisie, fournisseur mal référencé. Ce circuit relève des achats et de la logistique avant de relever de la comptabilité." },
      { q: 'Choisissez-vous le logiciel à notre place ?', a: "Non. Nous rédigeons le cahier des charges et organisons la comparaison des offres. Le cabinet ne revend aucune licence et ne perçoit aucune commission d'éditeur." },
      { q: 'Quand faut-il commencer ?', a: "Au moins six mois avant l'échéance qui vous concerne : le nettoyage du fichier fournisseurs et la mise en place du rapprochement prennent du temps, indépendamment du choix de l'outil." },
    ],
  },
  {
    id: 'marches-publics-acheteur-public',
    famille: 'conformite',
    titre: "Marchés publics : organiser les achats d'un acheteur public",
    court: 'Achats publics (acheteurs)',
    accroche: 'Des procédures conformes, des délais tenus et un programme prévisionnel publié : la fonction achats d’un établissement public mise en ordre.',
    declencheurs: ['Application du décret 2-22-431 relatif aux marchés publics', 'Contrôles de la Cour des comptes ou de l’inspection', 'Appels d’offres infructueux ou délais de passation trop longs'],
    pourQui: 'Établissements et entreprises publics, collectivités territoriales',
    duree: '1 à 6 mois',
    prix: '60 000 – 260 000 MAD HT',
    livrables: ['Diagnostic de conformité des procédures et des délais', 'Manuel de procédures et modèles de cahiers des prescriptions spéciales', 'Programme prévisionnel des achats', 'Tableau de bord et formation des acheteurs'],
    etapes: ['Diagnostic', 'Procédures et modèles', 'Programme prévisionnel', 'Formation et accompagnement'],
    versions: [
      { nom: 'Diagnostic', contenu: 'Conformité, délais, infructuosité, risques', duree: '4 à 6 semaines', prix: '60 000 – 90 000 MAD HT' },
      { nom: 'Organisation complète', contenu: 'Diagnostic + procédures, modèles, programme, formation', duree: '3 à 6 mois', prix: '150 000 – 260 000 MAD HT' },
    ],
    liens: [m('marches-publics-cellule-appels-d-offres'), m('audit-fonction-achats')],
    motif: /marches-publics|marche-public|achats-publics|commande-publique|appel-d-offres-public/,
    faq: [
      { q: 'Intervenez-vous dans le cadre d’un appel d’offres ?', a: 'Oui. Les acheteurs publics recrutent leurs conseils par consultation : nous répondons aux appels d’offres et aux consultations avec les dossiers administratifs requis.' },
      { q: 'La mission couvre-t-elle la rédaction des CPS ?', a: 'Elle fournit des modèles de cahiers des prescriptions spéciales par famille d’achats et forme les acheteurs à les adapter. La rédaction d’un CPS précis peut être ajoutée en option.' },
      { q: 'Travaillez-vous aussi pour les entreprises qui répondent aux marchés ?', a: 'Oui, avec une offre distincte : la mise en place d’une cellule appels d’offres pour les PME soumissionnaires.' },
    ],
  },
  {
    id: 'marches-publics-cellule-appels-d-offres',
    famille: 'conformite',
    titre: "Marchés publics : la cellule appels d'offres d'une PME",
    court: "Répondre aux appels d'offres publics",
    accroche: 'Moins de dossiers rejetés pour vice de forme, des offres mieux chiffrées et une équipe autonome pour répondre aux marchés publics.',
    declencheurs: ['Ouverture de la commande publique aux PME, TPE et auto-entrepreneurs', 'Dossiers écartés pour pièce manquante', 'Offres perdues sur le prix sans savoir pourquoi'],
    pourQui: 'PME fournisseurs de l’État, des collectivités et des établissements publics',
    duree: '2 à 4 semaines',
    prix: '30 000 – 45 000 MAD HT',
    livrables: ['Dispositif de veille ciblée', 'Dossier administratif type et check-list', 'Méthode de chiffrage', 'Bibliothèque de mémoires techniques', 'Formation de l’équipe'],
    etapes: ['Analyse des dossiers passés', 'Outils et modèles', 'Réponse accompagnée à un premier appel d’offres', 'Passage de relais'],
    limites: 'Option : assistance à la réponse, de 8 000 à 15 000 MAD HT par dossier selon la complexité.',
    liens: [m('marches-publics-acheteur-public'), L_INGE],
    motif: /appel-d-offres-public|soumission|soumissionn|caution-provisoire/,
    faq: [
      { q: 'Peut-on vous confier la réponse complète à un appel d’offres ?', a: "Oui, en option, par dossier. L'objectif de la mission reste toutefois de rendre votre équipe autonome." },
      { q: 'Quels documents faut-il préparer à l’avance ?', a: 'Les pièces administratives à jour (attestations fiscale et sociale, registre de commerce, statuts, références) et une bibliothèque de mémoires techniques réutilisables. La mission les organise une fois pour toutes.' },
      { q: 'Comment savoir si un appel d’offres vaut la peine ?', a: 'La méthode inclut une grille de décision : adéquation technique, références exigées, cautionnement, délai de paiement attendu et marge visée.' },
    ],
  },
  {
    id: 'bonnes-pratiques-distribution-pharmaceutique',
    famille: 'conformite',
    titre: 'Bonnes pratiques de distribution pharmaceutique (BPD)',
    court: 'BPD pharmaceutiques',
    accroche: 'Un entrepôt et un transport de produits de santé conformes à la ligne directrice BPD, prêts pour l’inspection.',
    declencheurs: ['Ligne directrice BPD publiée par l’AMMPS', 'Inspection annoncée ou audit d’un laboratoire donneur d’ordre', 'Excursions de température, réclamations, rappels de lots'],
    pourQui: 'Grossistes-répartiteurs, laboratoires, prestataires logistiques santé',
    duree: '3 à 12 semaines',
    prix: '50 000 – 170 000 MAD HT',
    livrables: ['Audit d’écart BPD de l’entrepôt et du transport', 'Plan d’action priorisé', 'Procédures (réception, stockage, préparation, retours, rappels, falsifications)', 'Plan de cartographie des températures et qualification des transporteurs', 'Formation et audit à blanc'],
    etapes: ['Audit d’écart', 'Plan d’action', 'Procédures et qualification', 'Formation et audit à blanc'],
    versions: [
      { nom: "Audit d'écart", contenu: 'Écarts BPD et plan d’action', duree: '3 à 4 semaines', prix: '50 000 – 75 000 MAD HT' },
      { nom: 'Mise en conformité', contenu: 'Audit + procédures + qualification + formation + audit à blanc', duree: '8 à 12 semaines', prix: '110 000 – 170 000 MAD HT' },
    ],
    limites: 'La cartographie des températures avec enregistreurs étalonnés est réalisée par un laboratoire de métrologie partenaire, refacturée au coût.',
    formations: [FORM_FROID],
    liens: [m('entrepot-agroalimentaire-froid-ifs-brcgs')],
    motif: /pharma|medicament|(^|-)bpd(-|$)|(^|-)gdp(-|$)|produits-de-sante|cartographie-des-temperatures/,
    faq: [
      { q: 'Nextinotech délivre-t-il une attestation de conformité BPD ?', a: "Non. Le cabinet prépare l'entreprise ; la conformité est appréciée par l'autorité lors de l'inspection et par les laboratoires lors de leurs audits." },
      { q: 'La mission couvre-t-elle le transport ?', a: 'Oui : qualification des transporteurs, maîtrise de la température pendant le transport, documentation et gestion des incidents.' },
      { q: 'Faut-il refaire la cartographie des températures chaque année ?', a: 'La fréquence dépend de la procédure de l’entreprise et des modifications de l’entrepôt (équipements, saison, implantation). La mission fixe une règle documentée et justifiée.' },
    ],
  },
  {
    id: 'transport-matieres-dangereuses-loi-30-05',
    famille: 'conformite',
    titre: 'Transport de matières dangereuses : conformité à la loi 30-05',
    court: 'Matières dangereuses (loi 30-05)',
    accroche: 'Des expéditions de matières dangereuses conformes : classement, emballage, étiquetage, documents et organisation.',
    declencheurs: ['Obligations de l’expéditeur et du transporteur au titre de la loi 30-05', 'Désignation d’un conseiller à la sécurité', 'Contrôle routier ou incident'],
    pourQui: 'Chimie, énergie, mines, distributeurs de produits dangereux',
    duree: '2 à 4 semaines',
    prix: '25 000 – 40 000 MAD HT',
    livrables: ['Cartographie des flux et des matières', 'Écarts sur emballage, étiquetage et documentation', 'Procédures d’expédition', 'Sensibilisation du personnel'],
    etapes: ['Inventaire des flux', 'Diagnostic de conformité', 'Procédures', 'Sensibilisation'],
    limites: 'La fonction de conseiller à la sécurité est confiée à un partenaire certifié.',
    formations: [FORM_HSE],
    motif: /matieres-dangereuses|30-05|(^|-)adr(-|$)/,
    faq: [
      { q: 'Faites-vous office de conseiller à la sécurité ?', a: "Non. Cette fonction est confiée à un conseiller certifié, partenaire du cabinet. Nextinotech prépare l'organisation et les procédures." },
      { q: "L'expéditeur est-il responsable même s'il sous-traite le transport ?", a: "Oui, l'expéditeur conserve des obligations propres : classement des marchandises, emballage, marquage et documents. Le diagnostic les distingue de celles du transporteur." },
      { q: 'La mission couvre-t-elle le stockage ?', a: 'Elle traite les points de contact entre stockage et expédition (zones de préparation, compatibilités). Le stockage relève aussi de la réglementation des installations, à vérifier séparément.' },
    ],
  },

  // ── NORMES & CERTIFICATIONS ────────────────────────────────────────────
  {
    id: 'preparation-audit-iso-achats-logistique',
    famille: 'normes',
    titre: "Préparer l'audit ISO : volet achats et logistique (ISO 9001, 28000, 37001, 22301)",
    court: 'Préparation audit ISO',
    accroche: "Arriver à l'audit de certification avec des achats et une logistique maîtrisés : sélection des fournisseurs, sûreté, anticorruption, continuité.",
    declencheurs: ['Certification à obtenir ou à renouveler', 'Non-conformité relevée sur les fournisseurs ou les prestataires', 'Exigence d’un client'],
    pourQui: 'Industriels, distributeurs, prestataires logistiques',
    duree: '1 à 12 semaines',
    prix: '20 000 – 120 000 MAD HT',
    livrables: ['Diagnostic d’écart par référentiel', 'Procédures de sélection, d’évaluation et de surveillance des fournisseurs', 'Analyse des risques (sûreté, corruption ou continuité selon la norme)', 'Formation et audit à blanc'],
    etapes: ['Diagnostic d’écart', 'Procédures', 'Formation', 'Audit à blanc'],
    versions: [
      { nom: "Diagnostic d'écart", contenu: 'Un référentiel, volet achats et logistique', duree: '1 à 2 semaines', prix: '20 000 – 35 000 MAD HT' },
      { nom: 'Audit à blanc', contenu: 'Audit simulé et rapport de constats', duree: '1 semaine', prix: '15 000 – 25 000 MAD HT' },
      { nom: 'Préparation complète', contenu: 'Diagnostic, procédures, formation, audit à blanc', duree: '6 à 12 semaines', prix: '60 000 – 120 000 MAD HT' },
    ],
    limites: "Nextinotech prépare l'entreprise ; il ne certifie pas. La certification est délivrée par un organisme accrédité.",
    formations: [FORM_SRM, FORM_RISQUES],
    liens: [m('surete-entrepot-tapa-iso-28000'), L_OEA],
    motif: /iso-9001|iso-28000|iso-37001|iso-22301|(^|-)normes?(-|$)|audit-de-certification|plan-de-continuite/,
    faq: [
      { q: "Pouvez-vous nous certifier ISO 9001 ?", a: "Non. La certification est délivrée par un organisme certificateur accrédité. Nextinotech prépare le volet achats et logistique et réalise des audits à blanc." },
      { q: "Que demande l'ISO 9001 sur les fournisseurs ?", a: "La norme demande de déterminer et d'appliquer des critères d'évaluation, de sélection, de surveillance des performances et de réévaluation des prestataires externes, et d'en conserver les preuves." },
      { q: "Quand faire l'audit à blanc ?", a: "Deux à trois mois avant l'audit de certification, pour laisser le temps de corriger les constats." },
    ],
  },
  {
    id: 'fournisseur-automobile-mmog-le-iatf',
    famille: 'normes',
    titre: 'Fournisseur automobile : MMOG/LE et volet logistique de l’IATF 16949',
    court: 'Fournisseur automobile (MMOG/LE)',
    accroche: 'Une autoévaluation logistique MMOG/LE argumentée et un plan de progrès crédible devant le constructeur.',
    declencheurs: ['Autoévaluation MMOG/LE demandée par le client', 'Audit fournisseur ou baisse de la note logistique', 'Démarrage d’un nouveau programme véhicule'],
    pourQui: 'Équipementiers de rangs 1 et 2 (Tanger, Kénitra, Casablanca)',
    duree: '3 semaines à 4 mois',
    prix: '50 000 – 200 000 MAD HT',
    livrables: ['Autoévaluation argumentée, preuves rassemblées', 'Plan de progrès : flux, emballages, prévisions, échanges EDI, traçabilité', "Préparation de l'audit client"],
    etapes: ['Autoévaluation accompagnée', 'Plan de progrès', 'Mise en œuvre', 'Préparation de l’audit'],
    versions: [
      { nom: 'Autoévaluation accompagnée', contenu: 'Grille, preuves, plan d’action', duree: '3 à 4 semaines', prix: '50 000 – 80 000 MAD HT' },
      { nom: 'Montée en niveau', contenu: "Autoévaluation + mise en œuvre du plan + préparation de l'audit client", duree: '3 à 4 mois', prix: '120 000 – 200 000 MAD HT' },
    ],
    formations: [FORM_STOCKS, FORM_SOP],
    motif: /automobile|mmog|iatf|equipementier|flux-synchrone/,
    faq: [
      { q: 'Qu’est-ce que la MMOG/LE ?', a: "Une grille d'évaluation de la logistique fournisseur utilisée par les constructeurs automobiles : stratégie, organisation, planification, interface client, flux physiques, interface fournisseurs." },
      { q: 'Couvrez-vous toute l’IATF 16949 ?', a: "Non, uniquement les exigences qui touchent les achats, les approvisionnements et la logistique. Le système qualité complet relève de votre service qualité ou d'un consultant qualité." },
      { q: 'Combien de temps pour progresser d’un niveau ?', a: 'Cela dépend des écarts relevés. Les actions d’organisation produisent souvent des résultats en quelques mois ; celles qui supposent un outil (EDI, système) prennent plus de temps.' },
    ],
  },
  {
    id: 'aeronautique-en-9100-en-9120-achats-tracabilite',
    famille: 'normes',
    titre: 'Aéronautique : achats et traçabilité selon l’EN 9100 / EN 9120',
    court: 'Aéronautique (EN 9100 / 9120)',
    accroche: 'Maîtrise des fournisseurs, traçabilité des lots et prévention des pièces contrefaites au niveau attendu par les donneurs d’ordre aéronautiques.',
    declencheurs: ['Certification EN 9120 d’un distributeur', 'Constat d’audit sur la maîtrise des fournisseurs', 'Exigence d’un donneur d’ordre'],
    pourQui: 'Sous-traitants et distributeurs aéronautiques',
    duree: '4 semaines à 4 mois',
    prix: '45 000 – 180 000 MAD HT',
    livrables: ['Diagnostic achats et traçabilité', 'Procédures de qualification et de surveillance des fournisseurs', 'Dispositif de prévention des pièces contrefaites', 'Formation et audit à blanc'],
    etapes: ['Diagnostic', 'Procédures', 'Formation', 'Audit à blanc'],
    versions: [
      { nom: 'Diagnostic', contenu: 'Fournisseurs, traçabilité, contrefaçon, obsolescence', duree: '4 à 6 semaines', prix: '45 000 – 70 000 MAD HT' },
      { nom: 'Mise en conformité', contenu: 'Diagnostic + procédures + formation + audit à blanc', duree: '3 à 4 mois', prix: '100 000 – 180 000 MAD HT' },
    ],
    limites: 'Le contrôle des exportations (ITAR, EAR) est traité avec un juriste spécialisé partenaire.',
    motif: /aeronautique|en-9100|en-9120|contrefa/,
    faq: [
      { q: "Quelle différence entre l'EN 9100 et l'EN 9120 ?", a: "L'EN 9100 vise les organismes qui conçoivent ou fabriquent ; l'EN 9120 vise les distributeurs et stockistes. Toutes deux renforcent l'ISO 9001 sur la maîtrise des fournisseurs et la traçabilité." },
      { q: 'Préparez-vous aussi aux audits des donneurs d’ordre ?', a: 'Oui, sur le volet achats, traçabilité et gestion des stocks.' },
      { q: 'Que faire contre le risque de pièces contrefaites ?', a: 'Limiter les achats aux sources autorisées, exiger les certificats de conformité, contrôler à réception, isoler et signaler les pièces suspectes. La mission formalise ces règles.' },
    ],
  },
  {
    id: 'surete-entrepot-tapa-iso-28000',
    famille: 'normes',
    titre: "Sûreté d'entrepôt : préparation TAPA FSR et ISO 28000",
    court: 'Sûreté entrepôt (TAPA, ISO 28000)',
    accroche: 'Un entrepôt de marchandises de valeur aux standards de sûreté attendus par les chargeurs internationaux.',
    declencheurs: ['Exigence d’un chargeur (électronique, pharma, luxe)', 'Vols ou intrusions', "Préparation de l'OEA"],
    pourQui: 'Prestataires logistiques, entrepôts de distribution',
    duree: '2 semaines à 3 mois',
    prix: '30 000 – 140 000 MAD HT',
    livrables: ['Diagnostic d’écart au niveau visé', 'Plan de sûreté', 'Procédures (accès, clés, quais, vidéosurveillance, personnel)', 'Formation et audit à blanc'],
    etapes: ['Diagnostic', 'Plan de sûreté', 'Procédures et formation', 'Audit à blanc'],
    versions: [
      { nom: "Diagnostic d'écart", contenu: 'Périmètre, accès, vidéo, procédures, personnel', duree: '2 à 3 semaines', prix: '30 000 – 50 000 MAD HT' },
      { nom: 'Préparation', contenu: 'Diagnostic + plan de sûreté + procédures + audit à blanc', duree: '2 à 3 mois', prix: '80 000 – 140 000 MAD HT' },
    ],
    limites: "Les travaux et équipements de sûreté sont chiffrés à part par les installateurs. La certification TAPA est délivrée par un organisme d'audit agréé.",
    liens: [L_OEA, m('preparation-audit-iso-achats-logistique')],
    motif: /(^|-)tapa(-|$)|surete|securite-de-l-entrepot/,
    faq: [
      { q: 'Quels sont les niveaux TAPA FSR ?', a: 'Trois niveaux, de A (le plus exigeant) à C. Le niveau visé dépend des exigences du chargeur et de la valeur des marchandises.' },
      { q: "L'OEA et l'ISO 28000 se recoupent-ils ?", a: "Oui, en partie : la sûreté de la chaîne logistique est un critère de l'OEA. Construire un seul dispositif évite de doubler procédures et contrôles." },
      { q: 'Faut-il des investissements lourds ?', a: "Pas toujours. Une partie des écarts se corrige par l'organisation (accès, clés, procédures). Le diagnostic distingue ce qui relève de l'organisation et ce qui demande un équipement." },
    ],
  },
  {
    id: 'entrepot-agroalimentaire-froid-ifs-brcgs',
    famille: 'normes',
    titre: 'Entrepôt agroalimentaire et froid : IFS Logistics, BRCGS, ONSSA',
    court: 'Entrepôt agroalimentaire',
    accroche: 'Un entrepôt sous température conforme aux exigences de la grande distribution et de l’ONSSA : chaîne du froid, FEFO, traçabilité, rappels.',
    declencheurs: ['Exigence d’un distributeur européen ou britannique', 'Agrément sanitaire', 'Pertes de lots, ruptures de la chaîne du froid, rappels'],
    pourQui: 'Exportateurs agroalimentaires, entrepôts sous température, prestataires agro',
    duree: '3 semaines à 4 mois',
    prix: '35 000 – 150 000 MAD HT',
    livrables: ['Diagnostic au référentiel visé', 'Procédures : réception, température, FEFO, nettoyage, rappels', 'Tests de traçabilité et de rappel', 'Formation et audit à blanc'],
    etapes: ['Diagnostic', 'Procédures', 'Tests de traçabilité', 'Audit à blanc'],
    versions: [
      { nom: 'Diagnostic', contenu: 'Écarts, chaîne du froid, FEFO, traçabilité', duree: '3 à 4 semaines', prix: '35 000 – 55 000 MAD HT' },
      { nom: 'Préparation complète', contenu: 'Diagnostic + procédures + tests + formation + audit à blanc', duree: '2 à 4 mois', prix: '90 000 – 150 000 MAD HT' },
    ],
    formations: [FORM_FROID],
    liens: [m('bonnes-pratiques-distribution-pharmaceutique')],
    motif: /agroalimentaire|onssa|haccp|(^|-)ifs(-|$)|brcgs|fefo|froid|frigorifique|rappel-de-produit/,
    faq: [
      { q: 'IFS Logistics ou BRCGS : lequel choisir ?', a: "C'est souvent le client qui décide : la grande distribution britannique se réfère plutôt au BRCGS, de nombreux distributeurs européens à l'IFS. Le diagnostic part de la liste de vos clients." },
      { q: 'Préparez-vous aussi l’agrément sanitaire ?', a: "Nous préparons l'organisation et les procédures logistiques. Le dossier d'agrément relève de l'exploitant et de l'autorité." },
      { q: 'Qu’est-ce qu’un test de rappel ?', a: "Une simulation : à partir d'un numéro de lot, retrouver en un temps limité toutes les quantités reçues, stockées et expédiées, et les clients concernés." },
    ],
  },

  // ── EXPORT & CLIENTS ───────────────────────────────────────────────────
  {
    id: 'exigences-clients-europeens-export',
    famille: 'export',
    titre: 'Exigences des clients européens : EUDR, emballages, carbone, questionnaires RSE',
    court: 'Exigences des clients européens',
    accroche: "Savoir ce que vos clients européens vont réellement exiger d'ici 2028, et y répondre sans y passer six mois.",
    declencheurs: ['Questionnaire RSE ou demande de notation EcoVadis', 'Règlement européen sur la déforestation (EUDR), applicable au 30 décembre 2026', 'Règlement emballages (PPWR), données carbone (CBAM), travail forcé (décembre 2027)'],
    pourQui: 'Exportateurs agroalimentaires, textile, emballages, métallurgie, chimie, automobile',
    duree: '2 semaines à 4 mois',
    prix: '25 000 – 120 000 MAD HT',
    livrables: ['Carte des textes qui vous concernent, via quels clients, à quelle date', 'Dossier de réponse aux questionnaires et préparation de la section achats responsables', 'Collecte des données fournisseurs (traçabilité, émissions, emballages)'],
    etapes: ['Diagnostic des exigences', 'Priorisation', 'Dossier fournisseur', 'Collecte des données'],
    versions: [
      { nom: 'Diagnostic exigences UE', contenu: 'Textes, clients, échéances, preuves à produire', duree: '2 à 3 semaines', prix: '35 000 – 55 000 MAD HT' },
      { nom: 'Dossier fournisseur', contenu: 'Questionnaires clients, achats responsables, charte', duree: '2 à 3 semaines', prix: '25 000 – 45 000 MAD HT' },
      { nom: 'Collecte des données', contenu: 'Traçabilité amont, émissions, conformité des emballages', duree: '2 à 4 mois', prix: '60 000 – 120 000 MAD HT' },
    ],
    limites: "Pas de vérification d'émissions (réservée aux vérificateurs accrédités) ni de notation (c'est l'organisme de notation qui note).",
    liens: [m('audit-social-smeta-bsci')],
    motif: /eudr|deforestation|ppwr|reglement-emballages|cbam|carbone|csrd|csddd|vigilance|(^|-)rse(-|$)|ecovadis|travail-force/,
    faq: [
      { q: 'Une PME marocaine est-elle directement soumise à ces règlements européens ?', a: "Rarement : après la réforme européenne de 2026, les obligations les plus lourdes visent de grands groupes. Mais ces groupes répercutent leurs exigences sur leurs fournisseurs par contrat et par questionnaire. La question devient : que demande votre client, et quand ?" },
      { q: 'Quels produits sont visés par le règlement déforestation ?', a: "Le bois, le cacao, le café, l'huile de palme, le soja, le caoutchouc et les bovins, ainsi que certains produits dérivés listés en annexe du règlement. Le diagnostic vérifie vos codes douaniers un par un." },
      { q: 'Remplissez-vous les questionnaires à notre place ?', a: 'Nous construisons le dossier de preuves et rédigeons les réponses avec vous. Les engagements signés restent ceux de l’entreprise.' },
    ],
  },
  {
    id: 'audit-social-smeta-bsci',
    famille: 'export',
    titre: 'Préparer un audit social SMETA ou amfori BSCI',
    court: 'Audit social SMETA / BSCI',
    accroche: 'Un site préparé à l’audit social demandé par les marques : temps de travail, sécurité, registres, sous-traitance.',
    declencheurs: ['Audit demandé par une marque ou un distributeur', 'Note insuffisante à un précédent audit', "Plan d'actions correctives à clôturer"],
    pourQui: 'Ateliers textiles, exportateurs agroalimentaires, sous-traitants industriels',
    duree: '2 à 6 semaines',
    prix: '30 000 – 60 000 MAD HT',
    livrables: ['Audit préalable du site', "Plan d'actions correctives", 'Procédures et registres', "Préparation de l'équipe"],
    etapes: ['Audit préalable', 'Actions correctives', 'Préparation de l’audit'],
    limites: "L'audit officiel est réalisé par une société agréée par Sedex ou amfori ; Nextinotech prépare le site.",
    liens: [m('exigences-clients-europeens-export')],
    motif: /smeta|bsci|audit-social|textile/,
    faq: [
      { q: 'Pouvez-vous réaliser l’audit SMETA ?', a: 'Non. Seules les sociétés d’audit agréées par Sedex peuvent réaliser un audit SMETA. Nous préparons le site en amont.' },
      { q: 'Quelle différence entre SMETA et amfori BSCI ?', a: "Les deux s'appuient sur les normes de l'Organisation internationale du travail. L'audit amfori BSCI attribue une note de A à E ; le rapport SMETA ne donne pas de note globale. Le choix dépend de la marque cliente." },
      { q: 'Combien de temps avant l’audit faut-il commencer ?', a: "Quatre à six semaines permettent de corriger la plupart des écarts documentaires et d'organisation." },
    ],
  },

  // ── FILIALES DE GROUPES ────────────────────────────────────────────────
  {
    id: 'filiale-prete-audit-siege',
    famille: 'groupes',
    titre: "Filiale prête pour l'audit du siège",
    court: "Filiale prête pour l'audit du siège",
    accroche: 'En trois semaines, mesurer achats, stocks et logistique de la filiale contre la politique du groupe, et arriver à l’audit avec un plan déjà engagé.',
    declencheurs: ['Audit interne du groupe annoncé', 'Nouveau directeur général ou nouveau référentiel groupe', 'Intégration après rachat'],
    pourQui: 'DG et DAF de filiales marocaines de groupes internationaux',
    duree: '3 semaines',
    prix: '75 000 – 110 000 MAD HT',
    livrables: ['Écarts entre politique achats du groupe et pratiques réelles', 'Contrôle interne de la commande au paiement', 'Inventaire et dépréciation des stocks (CGNC et normes du groupe)', 'Indicateurs de reporting', 'Plan d’action priorisé'],
    etapes: ['Lecture des référentiels du groupe', 'Diagnostic sur site', 'Plan d’action', 'Restitution'],
    liens: [m('evaluation-fournisseurs-sapin-2'), m('controle-interne-achats'), L_DSC],
    motif: /filiale|groupe-international|(^|-)siege(-|$)|ias-2|ifrs/,
    faq: [
      { q: 'Travaillez-vous avec l’audit interne du groupe ?', a: "Nous préparons la filiale ; nous n'intervenons pas à la place de l'audit du groupe. Le livrable est construit pour être partagé avec lui." },
      { q: 'La mission couvre-t-elle la conformité anticorruption ?', a: 'Elle en vérifie le volet achats (évaluation des fournisseurs, validations). Un programme complet fait l’objet d’une mission dédiée.' },
      { q: 'Peut-on la réaliser en anglais ?', a: 'Oui, les livrables peuvent être rédigés en français ou en anglais.' },
    ],
  },
  {
    id: 'evaluation-fournisseurs-sapin-2',
    famille: 'groupes',
    titre: 'Évaluer ses fournisseurs face au risque de corruption (Sapin II)',
    court: 'Évaluation des fournisseurs (Sapin II)',
    accroche: 'Le volet achats du programme anticorruption du groupe, appliqué à la filiale marocaine : cartographie des risques et évaluation des tiers.',
    declencheurs: ['Programme anticorruption du groupe à déployer dans la filiale', 'Contrôle ou audit de conformité', 'Nouveaux fournisseurs ou intermédiaires à risque'],
    pourQui: 'Filiales de groupes français et européens',
    duree: '4 à 8 semaines',
    prix: '70 000 – 120 000 MAD HT',
    livrables: ['Cartographie des risques de corruption sur les achats', 'Procédure d’évaluation des tiers', 'Évaluation de 30 fournisseurs prioritaires', 'Clauses contractuelles et formation des acheteurs'],
    etapes: ['Cartographie', 'Procédure', 'Évaluations', 'Formation'],
    limites: "Le volet juridique (code de conduite, dispositif d'alerte) est traité avec le service juridique du groupe ou un avocat partenaire.",
    liens: [m('filiale-prete-audit-siege'), m('controle-interne-achats')],
    motif: /sapin|corruption|evaluation-des-tiers|ethique|iso-37001/,
    faq: [
      { q: 'Une filiale marocaine est-elle concernée par Sapin II ?', a: "Oui lorsque la société mère française atteint les seuils de la loi : le programme anticorruption s'apprécie au niveau du groupe et couvre les filiales contrôlées, y compris à l'étranger." },
      { q: 'Faut-il évaluer tous les fournisseurs ?', a: "L'évaluation est proportionnée au risque : la cartographie détermine quels fournisseurs et intermédiaires évaluer en priorité et avec quelle profondeur." },
      { q: 'Utilisez-vous un outil de filtrage ?', a: "Un outil peut aider à la collecte d'informations, mais l'évaluation reste une analyse : activité, pays, intermédiaires, montants, conditions de paiement." },
    ],
  },
  {
    id: 'controle-interne-achats',
    famille: 'groupes',
    titre: 'Contrôle interne du processus achats',
    court: 'Contrôle interne des achats',
    accroche: 'Une matrice risques et contrôles de la commande au paiement, testée, qui tient devant l’audit interne et le commissaire aux comptes.',
    declencheurs: ['Filiale d’un groupe coté soumise à un référentiel de contrôle interne', "Constats de l'audit interne ou du commissaire aux comptes", 'Soupçon de fraude'],
    pourQui: 'Filiales, ETI, entreprises publiques',
    duree: '4 à 8 semaines',
    prix: '60 000 – 110 000 MAD HT',
    livrables: ['Matrice des risques et des contrôles', 'Tests sur échantillon', 'Plan de remédiation', 'Procédure achats mise à jour'],
    etapes: ['Cartographie du processus', 'Matrice risques-contrôles', 'Tests', 'Remédiation'],
    liens: [m('audit-fonction-achats'), m('filiale-prete-audit-siege')],
    motif: /controle-interne|fraude|separation-des-taches|procedure-achats|sox/,
    faq: [
      { q: 'Quels contrôles sont prioritaires ?', a: 'La création et la modification des fournisseurs, la séparation entre commande, réception et paiement, les délégations de pouvoir et le rapprochement des factures.' },
      { q: 'Testez-vous les contrôles ?', a: 'Oui, sur échantillon, pour vérifier qu’ils fonctionnent réellement et pas seulement sur le papier.' },
      { q: 'Que se passe-t-il si une fraude est découverte ?', a: 'Nous informons la direction et documentons les faits ; l’enquête et les suites relèvent de l’entreprise et de ses conseils.' },
    ],
  },
  {
    id: 'prix-de-transfert-analyse-fonctionnelle-supply-chain',
    famille: 'groupes',
    titre: 'Prix de transfert : analyse fonctionnelle achats et logistique',
    court: 'Prix de transfert (volet opérationnel)',
    accroche: 'Décrire précisément les fonctions, les risques et les flux achats et logistique intra-groupe pour une documentation de prix de transfert solide.',
    declencheurs: ['Documentation obligatoire dès 50 M MAD de chiffre d’affaires ou d’actif brut', 'Centrale d’achats ou refacturations logistiques intra-groupe', 'Contrôle fiscal'],
    pourQui: 'Filiales de groupes internationaux',
    duree: '3 à 6 semaines',
    prix: '40 000 – 80 000 MAD HT',
    livrables: ['Description des fonctions, risques et actifs achats et logistique', 'Cartographie des flux intra-groupe', 'Données pour l’analyse économique'],
    etapes: ['Entretiens', 'Cartographie des flux', 'Rédaction de l’analyse fonctionnelle'],
    limites: 'Mission menée avec un cabinet fiscal partenaire, qui porte la méthode de prix de transfert et la documentation.',
    liens: [m('filiale-prete-audit-siege')],
    motif: /prix-de-transfert|intra-groupe|centrale-d-achats/,
    faq: [
      { q: 'Rédigez-vous la documentation de prix de transfert ?', a: 'Non, elle est portée par un cabinet fiscal. Nous apportons l’analyse fonctionnelle opérationnelle des achats et de la logistique.' },
      { q: 'Pourquoi une analyse opérationnelle ?', a: 'Parce que la rémunération des flux intra-groupe dépend de qui achète, qui stocke, qui porte le risque de stock et de transport. Une description imprécise fragilise toute la documentation.' },
      { q: 'Qui est concerné au Maroc ?', a: "Les entreprises qui réalisent des opérations avec des entreprises liées à l'étranger et dont le chiffre d'affaires ou l'actif brut atteint 50 millions de dirhams doivent tenir un fichier principal et un fichier local." },
    ],
  },

  // ── PERFORMANCE ────────────────────────────────────────────────────────
  {
    id: 'programme-bfr-cash-stocks',
    famille: 'performance',
    titre: 'Programme BFR : libérer le cash des stocks',
    court: 'Programme BFR stocks',
    accroche: 'Mesurer la trésorerie immobilisée dans les stocks, fixer des objectifs par famille et la libérer sans dégrader le service.',
    declencheurs: ['Tension de trésorerie', 'Délais fournisseurs raccourcis par la loi 69-21', 'Demande de la banque ou des actionnaires'],
    pourQui: 'DG et DAF de PME et ETI industrielles ou de distribution',
    duree: '4 semaines à 4 mois',
    prix: '45 000 – 180 000 MAD HT',
    livrables: ['Trésorerie immobilisée par famille', 'Stocks dormants et plan de déstockage', 'Politique de stock et objectifs de couverture', 'Pilotage mensuel'],
    etapes: ['Diagnostic BFR stocks', 'Politique de stock', 'Déstockage', 'Pilotage'],
    versions: [
      { nom: 'Diagnostic BFR stocks', contenu: 'Cash immobilisé, dormants, couverture, objectifs', duree: '4 à 6 semaines', prix: '45 000 – 75 000 MAD HT' },
      { nom: 'Programme complet', contenu: 'Diagnostic + politique de stock + déstockage + pilotage sur 3 mois', duree: '3 à 4 mois', prix: '100 000 – 180 000 MAD HT' },
    ],
    limites: 'Option : rémunération partiellement indexée sur le cash libéré au-delà d’un objectif convenu.',
    formations: [FORM_STOCKS],
    liens: [m('conformite-delais-de-paiement-loi-69-21'), L_CONSEIL],
    motif: /bfr|tresorerie|rotation|couverture-de-stock|stock-de-securite|surstock|cash/,
    faq: [
      { q: 'Réduire les stocks ne risque-t-il pas de créer des ruptures ?', a: "C'est le risque principal ; la méthode fixe des objectifs par famille selon la variabilité de la demande et des délais, et suit le taux de service pendant toute la baisse." },
      { q: 'En combien de temps voit-on le cash revenir ?', a: 'Les stocks dormants se traitent en quelques semaines ; la baisse des stocks actifs suit le rythme des réapprovisionnements, en général sur plusieurs mois.' },
      { q: 'Le lien avec la loi 69-21 ?', a: 'Les délais fournisseurs sont désormais encadrés : le levier de trésorerie se déplace vers les stocks et les délais clients.' },
    ],
  },
  {
    id: 'audit-fonction-achats',
    famille: 'performance',
    titre: 'Audit de la fonction achats',
    court: 'Audit de la fonction achats',
    accroche: 'Une grille de maturité en 40 points, une cartographie des dépenses et une feuille de route chiffrée sur 12 mois.',
    declencheurs: ['Nouveau directeur général', 'Conseil d’administration ou commissaire aux comptes', 'Dérive des coûts d’achat'],
    pourQui: 'DG, DAF, directeurs achats',
    duree: '3 à 4 semaines',
    prix: '50 000 – 80 000 MAD HT',
    livrables: ['Grille de maturité', 'Cartographie des dépenses', 'Organisation, processus et risques', 'Gains potentiels chiffrés', 'Feuille de route sur 12 mois'],
    etapes: ['Données de dépenses', 'Entretiens', 'Analyse', 'Restitution'],
    formations: [FORM_NEGO, FORM_SRM],
    liens: [m('reduction-couts-achats-categories'), L_DA],
    motif: /achats|acheteur|fournisseur|sourcing|negociation|srm/,
    faq: [
      { q: "Faut-il des données parfaites pour l'audit ?", a: 'Non. Un extrait des factures ou des commandes sur 12 mois suffit pour une première cartographie des dépenses.' },
      { q: 'L’audit débouche-t-il sur des économies chiffrées ?', a: 'Oui, sous forme de gisements estimés par catégorie, qui servent à prioriser la feuille de route.' },
      { q: 'Combien de personnes sont interrogées ?', a: 'En général la direction, l’équipe achats et les principaux prescripteurs internes, soit une dizaine d’entretiens.' },
    ],
  },
  {
    id: 'reduction-couts-achats-categories',
    famille: 'performance',
    titre: 'Réduction des coûts achats par catégorie',
    court: 'Réduction des coûts achats',
    accroche: 'Analyse des dépenses, consultations, renégociations : des économies signées et mesurées contre une base validée par écrit.',
    declencheurs: ['Pression sur la marge', 'Hausse des prix des matières', 'Contrats non renégociés depuis plusieurs années'],
    pourQui: 'DG, directeurs achats',
    duree: '3 à 5 mois',
    prix: '80 000 – 200 000 MAD HT',
    livrables: ['Analyse des dépenses par catégorie', 'Stratégie par catégorie', 'Consultations et négociations', 'Économies signées et suivi'],
    etapes: ['Analyse des dépenses', 'Stratégies par catégorie', 'Consultations', 'Négociation et contrats'],
    limites: 'Deux modes : forfait, ou forfait réduit avec une part indexée sur les économies signées, plafonnée.',
    formations: [FORM_NEGO],
    liens: [m('audit-fonction-achats')],
    motif: /reduction-des-couts|economies|negociation|appel-d-offres|categorie/,
    faq: [
      { q: 'Comment mesurez-vous les économies ?', a: 'Contre une base de prix et de volumes validée par écrit avant le démarrage. Seules les économies signées sont comptées.' },
      { q: 'Remplacez-vous nos acheteurs ?', a: 'Non, nous travaillons avec eux et leur laissons les méthodes et les outils.' },
      { q: 'Sur quelles catégories commencer ?', a: "Celles qui pèsent le plus et dont le marché fournisseur est ouvert : l'analyse des dépenses les identifie." },
    ],
  },
  {
    id: 'appel-d-offres-transport-prestataire-logistique',
    famille: 'performance',
    titre: "Appel d'offres transport et prestataire logistique",
    court: "Appel d'offres transport & 3PL",
    accroche: 'Un cahier des charges précis, une consultation comparable et un contrat avec des indicateurs et des pénalités qui protègent.',
    declencheurs: ['Contrat en fin d’échéance', 'Hausse des tarifs', 'Qualité de service dégradée', 'Projet d’externalisation'],
    pourQui: 'Directeurs logistique et achats',
    duree: '6 à 12 semaines',
    prix: '70 000 – 160 000 MAD HT',
    livrables: ['Analyse des flux', 'Cahier des charges', 'Consultation et grille de comparaison', 'Négociation', 'Contrat, indicateurs et pénalités'],
    etapes: ['Analyse des flux', 'Cahier des charges', 'Consultation', 'Négociation et contrat'],
    versions: [
      { nom: 'Transport', contenu: 'Flux, cahier des charges, consultation, négociation, contrat', duree: '6 à 8 semaines', prix: '70 000 – 120 000 MAD HT' },
      { nom: 'Prestataire logistique (3PL)', contenu: 'Idem + visites de sites, modèle de coût, plan de transfert', duree: '8 à 12 semaines', prix: '90 000 – 160 000 MAD HT' },
    ],
    formations: [FORM_TRANSPORT],
    liens: [m('faire-ou-faire-faire-externalisation-logistique'), m('audit-contrat-facturation-prestataire-logistique')],
    motif: /appel-d-offres|transporteur|3pl|prestataire-logistique|externalis|contrat-logistique/,
    faq: [
      { q: 'Combien de prestataires faut-il consulter ?', a: 'En général quatre à six, pour comparer sans diluer l’effort des candidats ni le vôtre.' },
      { q: 'Le contrat est-il rédigé par vous ?', a: 'Nous rédigeons les annexes opérationnelles (cahier des charges, indicateurs, pénalités, prix). La relecture juridique reste conseillée.' },
      { q: 'Peut-on garder le prestataire actuel ?', a: 'Oui, il peut être consulté comme les autres. La consultation sert souvent aussi à renégocier avec lui.' },
    ],
  },
  {
    id: 'due-diligence-supply-chain',
    famille: 'performance',
    titre: 'Due diligence supply chain (rachat, investissement)',
    court: 'Due diligence supply chain',
    accroche: 'Stocks, fournisseurs critiques, capacité logistique et risques opérationnels passés au crible avant de signer.',
    declencheurs: ['Rachat d’entreprise', 'Entrée au capital', 'Financement'],
    pourQui: 'Fonds d’investissement, acquéreurs industriels, banques d’affaires',
    duree: '2 à 4 semaines',
    prix: '90 000 – 160 000 MAD HT',
    livrables: ['Qualité et valorisation des stocks', 'Dépendance aux fournisseurs critiques', 'Capacité logistique', 'Risques opérationnels', 'Plan des 100 premiers jours'],
    etapes: ['Data room', 'Visites de sites', 'Analyse', 'Rapport'],
    limites: 'Majoration possible pour un rendu en moins de dix jours.',
    liens: [m('audit-stocks-demarque')],
    motif: /due-diligence|rachat|acquisition|investisseur/,
    faq: [
      { q: 'Travaillez-vous avec les autres conseils de la transaction ?', a: 'Oui, notre rapport complète les due diligences financière, juridique et fiscale.' },
      { q: 'Faut-il visiter les sites ?', a: 'C’est fortement recommandé : l’état des stocks et des entrepôts ne se lit pas entièrement dans une data room.' },
      { q: 'Le rapport est-il confidentiel ?', a: 'Oui, sous engagement de confidentialité signé avant l’accès aux données.' },
    ],
  },

  // ── COÛTS & CONTRÔLE DE GESTION ────────────────────────────────────────
  {
    id: 'cout-logistique-complet-cost-to-serve',
    famille: 'couts',
    titre: 'Coût logistique complet et rentabilité par client (cost-to-serve)',
    court: 'Coût logistique & cost-to-serve',
    accroche: 'Ce que coûte réellement de servir chaque client, chaque canal et chaque produit, et ce que l’on gagne vraiment avec eux.',
    declencheurs: ['Marge en baisse alors que le chiffre d’affaires monte', 'Clients jugés rentables qui ne le sont pas', 'Négociation commerciale : franco, minimum de commande, remises'],
    pourQui: 'DG, DAF, directeurs commerciaux et supply chain',
    duree: '3 à 8 semaines',
    prix: '35 000 – 110 000 MAD HT',
    livrables: ['Coût logistique complet : entrepôt, transport, stock, structure, systèmes', 'Coût en % du CA, par palette, par commande, par ligne', 'En version cost-to-serve : rentabilité par client, canal et référence', 'Règles commerciales recommandées', 'Modèle maintenable par le contrôle de gestion'],
    etapes: ['Reconstitution des coûts', 'Unités d’œuvre', 'Affectation aux clients et produits', 'Restitution et règles'],
    versions: [
      { nom: 'Coût logistique complet', contenu: 'Coûts reconstitués depuis la comptabilité, ratios par unité', duree: '3 à 4 semaines', prix: '35 000 – 55 000 MAD HT' },
      { nom: 'Cost-to-serve', contenu: 'Coût complet + rentabilité par client, canal et référence', duree: '6 à 8 semaines', prix: '70 000 – 110 000 MAD HT' },
    ],
    formations: [FORM_CG, FORM_CHIFFRES],
    liens: [m('controle-de-gestion-supply-chain'), m('benchmark-audit-couts-logistiques')],
    motif: /cout-logistique|cost-to-serve|rentabilite|cout-complet|unites-d-oeuvre/,
    faq: [
      { q: 'Faut-il une comptabilité analytique ?', a: 'Non. Le coût complet est reconstitué à partir de la comptabilité générale, des volumes et de quelques mesures terrain.' },
      { q: 'Le modèle reste-t-il chez nous ?', a: 'Oui : un modèle Excel documenté, que le contrôle de gestion peut mettre à jour chaque mois.' },
      { q: 'Que fait-on d’un client non rentable ?', a: 'On revoit ses conditions : minimum de commande, fréquence de livraison, franco, prix. L’objectif est de rendre la relation rentable, pas de perdre le client.' },
    ],
  },
  {
    id: 'prix-de-revient-transport-routier',
    famille: 'couts',
    titre: 'Prix de revient transport routier et grille tarifaire',
    court: 'Prix de revient transport',
    accroche: 'Le coût complet au kilomètre et à l’heure de chaque véhicule, une grille tarifaire défendable et une clause d’indexation gasoil.',
    declencheurs: ['Transporteur qui ne connaît pas son coût au kilomètre', 'Flotte propre d’un industriel ou d’un distributeur', 'Appel d’offres à chiffrer, hausse du gasoil'],
    pourQui: 'Transporteurs, entreprises à flotte propre, distributeurs',
    duree: '2 à 4 semaines',
    prix: '30 000 – 50 000 MAD HT',
    livrables: ['Coût complet par véhicule', 'Coût au kilomètre et à l’heure, seuil de rentabilité', 'Grille tarifaire par zone ou par tournée', "Clause d'indexation gasoil", 'Calculateur mis à jour chaque mois'],
    etapes: ['Collecte des coûts', 'Modèle de prix de revient', 'Grille tarifaire', 'Clause et outil'],
    formations: [FORM_TRANSPORT],
    liens: [m('investissement-flotte-porteur-achat-leasing'), m('appel-d-offres-transport-prestataire-logistique')],
    motif: /cout-de-revient|prix-de-revient|transport-routier|gasoil|tarif|cout-au-kilometre/,
    faq: [
      { q: "Quels coûts entrent dans le prix de revient d'un camion ?", a: "Les coûts fixes (amortissement ou loyer, assurance, vignette, salaire du chauffeur, structure) et les coûts variables (carburant, pneus, entretien, péages). Le prix de revient au kilomètre dépend fortement du kilométrage annuel." },
      { q: 'Comment fonctionne une clause d’indexation gasoil ?', a: 'Le prix est révisé selon l’évolution d’un indice ou d’un prix de référence du gasoil, appliquée à la part du carburant dans le coût total.' },
      { q: 'L’outil est-il adapté aux flottes propres ?', a: 'Oui : il sert aussi à comparer le coût de la flotte propre avec celui de la sous-traitance.' },
    ],
  },
  {
    id: 'prix-de-revient-importation-cout-rendu',
    famille: 'couts',
    titre: "Prix de revient à l'importation (coût rendu) et prix de vente",
    court: "Coût rendu à l'importation",
    accroche: 'Le vrai coût d’un produit importé, frais d’approche compris, et des prix de vente qui protègent la marge.',
    declencheurs: ['Marges fausses parce que les frais d’approche sont mal affectés', 'Hausse du fret, des droits ou du change', 'Nouvelle loi de finances'],
    pourQui: 'Importateurs, distributeurs, industriels qui importent leurs matières',
    duree: '2 à 6 semaines',
    prix: '30 000 – 90 000 MAD HT',
    livrables: ['Modèle de coût rendu : achat, Incoterm, fret, assurance, droits et taxes, transit, magasinage, financement, change', 'Méthode d’affectation des frais d’approche', 'En version complète : mise à jour des prix de revient et des prix de vente cibles'],
    etapes: ['Dossiers d’importation', 'Modèle', 'Affectation', 'Prix de vente'],
    versions: [
      { nom: 'Modèle de coût rendu', contenu: 'Modèle et méthode d’affectation', duree: '2 à 3 semaines', prix: '30 000 – 50 000 MAD HT' },
      { nom: 'Coût rendu & politique de prix', contenu: 'Modèle + prix de revient du catalogue + prix de vente cibles + scénarios', duree: '4 à 6 semaines', prix: '60 000 – 90 000 MAD HT' },
    ],
    formations: [FORM_IMPORT, FORM_DOUANE],
    liens: [m('audit-couts-importation'), L_OEA],
    motif: /cout-rendu|frais-d-approche|importation|landed|incoterm|valeur-en-douane/,
    faq: [
      { q: 'La TVA à l’importation entre-t-elle dans le coût rendu ?', a: 'Non lorsqu’elle est récupérable : elle pèse sur la trésorerie mais pas sur le coût. Les droits de douane, eux, font partie du coût.' },
      { q: 'Comment répartir un fret commun à plusieurs produits ?', a: 'Avec une clé explicite et reproductible : poids taxable, volume ou valeur selon la nature du frais.' },
      { q: 'À quelle fréquence mettre à jour les prix de revient ?', a: 'À chaque variation significative du fret, du change ou des droits, et au minimum à chaque nouvelle loi de finances.' },
    ],
  },
  {
    id: 'tarification-prestataire-logistique-3pl',
    famille: 'couts',
    titre: 'Tarification d’un prestataire logistique (3PL)',
    court: 'Tarification 3PL',
    accroche: 'Chiffrer un appel d’offres sans se tromper et savoir quels contrats gagnent de l’argent.',
    declencheurs: ['Appel d’offres d’un chargeur à chiffrer', 'Contrats déficitaires', 'Renégociation'],
    pourQui: 'Prestataires logistiques, transitaires, entrepôts',
    duree: '1 à 5 semaines',
    prix: '25 000 – 80 000 MAD HT',
    livrables: ['Modèle de coût par activité : réception, stockage, préparation, expédition', 'Hypothèses de productivité', 'Prix unitaires et marge', 'Rentabilité par client et grille tarifaire type'],
    etapes: ['Données de volumes', 'Modèle par activité', 'Prix et marge', 'Rentabilité'],
    versions: [
      { nom: "Chiffrage d'un appel d'offres", contenu: 'Modèle de coût, hypothèses, prix unitaires', duree: '1 à 2 semaines', prix: '25 000 – 40 000 MAD HT' },
      { nom: 'Modèle de tarification', contenu: 'Tous sites, rentabilité par client, grille type, livre ouvert', duree: '4 à 5 semaines', prix: '50 000 – 80 000 MAD HT' },
    ],
    liens: [L_SIM_PROD, L_SIM_COUT],
    motif: /3pl|prestataire-logistique|tarification|open-book|livre-ouvert|chiffrage/,
    faq: [
      { q: 'Quelle unité de facturation choisir ?', a: 'Celle qui suit le coût réel : palette stockée par semaine, ligne ou colis préparé, palette expédiée. Le modèle vérifie la cohérence entre prix et coûts.' },
      { q: 'Pouvez-vous chiffrer en urgence ?', a: "Oui, un chiffrage d'appel d'offres se fait en une à deux semaines si les volumes sont disponibles." },
      { q: 'Qu’est-ce qu’un contrat en livre ouvert ?', a: 'Un contrat où le prestataire facture ses coûts réels justifiés plus une marge convenue. Il demande un modèle de coût transparent.' },
    ],
  },
  {
    id: 'faire-ou-faire-faire-externalisation-logistique',
    famille: 'couts',
    titre: 'Faire ou faire faire : faut-il externaliser la logistique ?',
    court: 'Externaliser la logistique ?',
    accroche: 'Comparer, chiffres à l’appui sur cinq ans, la logistique internalisée optimisée et l’externalisation totale ou partielle.',
    declencheurs: ['Entrepôt saturé', 'Bail à renouveler', 'Coûts qui dérapent', 'Proposition commerciale d’un prestataire'],
    pourQui: 'DG, DAF, directeurs supply chain',
    duree: '4 à 6 semaines',
    prix: '60 000 – 95 000 MAD HT',
    livrables: ['Coût complet actuel', 'Scénarios : internalisé optimisé, externalisation totale ou partielle, mutualisation', 'Coûts et risques de transfert', 'Comparaison sur 5 ans et recommandation'],
    etapes: ['Coût actuel', 'Scénarios', 'Comparaison', 'Recommandation'],
    liens: [m('appel-d-offres-transport-prestataire-logistique'), L_SIM_COUT],
    motif: /externalis|make-or-buy|sous-traitance-logistique|faire-ou-faire-faire/,
    faq: [
      { q: 'Êtes-vous favorables à l’externalisation ?', a: 'Ni pour ni contre : le cabinet ne touche aucune commission de prestataire. La recommandation dépend des chiffres et des risques.' },
      { q: 'Quels coûts oublie-t-on souvent ?', a: 'Les coûts de transfert, le pilotage du prestataire, les systèmes et les coûts de sortie du bail ou du contrat.' },
      { q: 'Et si l’externalisation est retenue ?', a: 'La suite naturelle est l’appel d’offres auprès des prestataires.' },
    ],
  },
  {
    id: 'controle-de-gestion-supply-chain',
    famille: 'couts',
    titre: 'Mise en place du contrôle de gestion supply chain',
    court: 'Contrôle de gestion supply chain',
    accroche: 'Des coûts logistiques suivis chaque mois, des unités d’œuvre, un tableau de bord et une revue de performance qui sert à décider.',
    declencheurs: ['Coûts logistiques connus seulement en fin d’année', 'Budget logistique sans base solide', 'Demande du siège ou de la banque'],
    pourQui: 'DAF, contrôleurs de gestion, directeurs supply chain',
    duree: '3 semaines à 4 mois',
    prix: '40 000 – 150 000 MAD HT',
    livrables: ['Tableau de bord des coûts et de la performance', 'Plan analytique et centres de coûts logistiques', 'Unités d’œuvre et clés de répartition', 'Clôture mensuelle des coûts', 'Formation de l’équipe'],
    etapes: ['Indicateurs', 'Plan analytique', 'Clôture mensuelle', 'Revue de performance'],
    versions: [
      { nom: 'Tableau de bord des coûts', contenu: 'Indicateurs, sources de données, tableau mensuel', duree: '3 à 4 semaines', prix: '40 000 – 60 000 MAD HT' },
      { nom: 'Contrôle de gestion complet', contenu: 'Tableau de bord + plan analytique + clôture mensuelle + formation', duree: '3 à 4 mois', prix: '90 000 – 150 000 MAD HT' },
    ],
    limites: 'Option pour les industriels : coûts standards et analyse des écarts (matière, main-d’œuvre, rendement).',
    formations: [FORM_CG, FORM_CHIFFRES],
    liens: [m('budget-achats-logistique-couts-standards'), m('controleur-de-gestion-supply-chain-temps-partage')],
    motif: /controle-de-gestion|tableau-de-bord|kpi|indicateur|unites-d-oeuvre|budget/,
    faq: [
      { q: 'Quels indicateurs suivre en priorité ?', a: 'Le coût par unité d’œuvre (palette, commande, ligne), la productivité, le taux de service et la valeur du stock : quatre familles qui se lisent ensemble.' },
      { q: 'Faut-il un outil de BI ?', a: 'Pas au départ. Un tableau de bord fiable dans un tableur vaut mieux qu’un outil alimenté par des données douteuses.' },
      { q: 'Qui tient le tableau de bord ensuite ?', a: 'Votre contrôle de gestion, formé pendant la mission, ou un contrôleur à temps partagé.' },
    ],
  },
  {
    id: 'budget-achats-logistique-couts-standards',
    famille: 'couts',
    titre: 'Budget achats et logistique, coûts standards',
    court: 'Budget achats & logistique',
    accroche: 'Un budget construit sur des volumes et des coûts standards, suivi chaque mois, au lieu d’une reconduction de l’année précédente.',
    declencheurs: ['Préparation du budget annuel', 'Budget du groupe à remplir par la filiale', 'Écarts budgétaires inexpliqués'],
    pourQui: 'DAF, directeurs achats et logistique',
    duree: '3 à 5 semaines',
    prix: '40 000 – 65 000 MAD HT',
    livrables: ['Procédure budgétaire', 'Hypothèses de volumes', 'Prix standards d’achat et coûts standards logistiques', 'Budget par centre de coûts', 'Suivi mensuel des écarts'],
    etapes: ['Hypothèses', 'Standards', 'Budget', 'Suivi des écarts'],
    formations: [FORM_CG],
    liens: [m('controle-de-gestion-supply-chain')],
    motif: /budget|cout-standard|ecarts-budgetaires|prix-standard/,
    faq: [
      { q: 'Quand faut-il lancer la mission ?', a: 'En septembre ou en octobre, pour un budget arrêté avant la fin de l’année.' },
      { q: "Qu'est-ce qu'un prix standard d'achat ?", a: 'Un prix de référence fixé pour l’année, qui permet de séparer dans les écarts l’effet prix de l’effet volume.' },
      { q: 'La mission convient-elle à une PME ?', a: 'Oui, avec une version allégée centrée sur les principaux postes.' },
    ],
  },
  {
    id: 'controleur-de-gestion-supply-chain-temps-partage',
    famille: 'couts',
    titre: 'Contrôleur de gestion supply chain à temps partagé',
    court: 'Contrôleur de gestion à temps partagé',
    accroche: 'Un contrôleur de gestion expérimenté, 4 à 8 jours par mois, pour clôturer les coûts, tenir le tableau de bord et préparer le budget.',
    declencheurs: ['Pas de contrôleur de gestion dédié aux opérations', 'Poste vacant', 'Période de transformation'],
    pourQui: 'DG et DAF de PME et ETI',
    duree: '6 mois minimum',
    prix: '28 000 – 56 000 MAD HT par mois',
    livrables: ['Clôture mensuelle des coûts', 'Tableau de bord', 'Revue de performance avec la direction', 'Budget', 'Analyses ponctuelles (rentabilité, investissement)'],
    etapes: ['Mise en place', 'Rythme mensuel', 'Revue trimestrielle', 'Passage de relais'],
    liens: [L_DSC, m('controle-de-gestion-supply-chain')],
    motif: /controleur-de-gestion|temps-partage|controle-de-gestion/,
    faq: [
      { q: 'Combien de jours par mois faut-il prévoir ?', a: 'Quatre jours suffisent souvent pour une PME ; huit jours pour une ETI ou pendant la mise en place.' },
      { q: 'Peut-on recruter ensuite ?', a: 'Oui. La mission peut se terminer par la définition du poste et la passation au contrôleur recruté.' },
      { q: 'Travaillez-vous sur site ?', a: 'En partie : la clôture et la revue de performance se font sur site, les analyses à distance.' },
    ],
  },

  // ── INVESTISSEMENT ─────────────────────────────────────────────────────
  {
    id: 'business-plan-nouvelle-activite',
    famille: 'investissement',
    titre: "Business plan d'une nouvelle activité",
    court: 'Business plan',
    accroche: 'Un business plan bancable, chiffré par des opérationnels, pour lancer une activité, ouvrir un site, créer une filiale ou s’implanter au Maroc.',
    declencheurs: ['Demande de crédit ou de garantie', 'Dossier de primes à l’investissement (dispositif TPME de la Charte de l’investissement)', 'Levée de fonds, décision d’actionnaires', 'Implantation d’un investisseur étranger'],
    pourQui: 'Porteurs de projet, PME en diversification, groupes étrangers, investisseurs',
    duree: '3 à 10 semaines',
    prix: '40 000 – 160 000 MAD HT',
    livrables: ['Marché et hypothèses', 'Modèle opérationnel : achats, stocks, logistique, effectifs', 'Investissements et plan de financement', 'Comptes prévisionnels sur 5 ans, trésorerie, seuil de rentabilité', 'Scénarios et, en version investisseur, VAN et TRI'],
    etapes: ['Cadrage', 'Hypothèses opérationnelles', 'Modèle financier', 'Dossier et présentation'],
    versions: [
      { nom: 'Business plan bancable', contenu: 'Projet de 1 à 20 M MAD', duree: '3 à 5 semaines', prix: '40 000 – 65 000 MAD HT' },
      { nom: 'Business plan investisseur', contenu: 'ETI, implantation étrangère, projet de plus de 20 M MAD', duree: '6 à 10 semaines', prix: '90 000 – 160 000 MAD HT' },
    ],
    limites: "Les comptes prévisionnels à attester le sont par l'expert-comptable de l'entreprise ou un expert-comptable partenaire.",
    formations: [FORM_BC],
    liens: [m('dossier-financement-primes-investissement'), m('nouvelle-plateforme-logistique-faisabilite')],
    motif: /business-plan|creation-d-entreprise|nouvelle-activite/,
    faq: [
      { q: 'Qu’apporte un cabinet supply chain à un business plan ?', a: 'Des hypothèses opérationnelles chiffrées par des praticiens : prix d’achat, stocks nécessaires, coûts logistiques, productivité. Ce sont elles que le banquier conteste en premier.' },
      { q: 'Le business plan sert-il pour la demande de primes ?', a: 'Oui, il est construit pour être repris dans le dossier déposé auprès du centre régional d’investissement et de la banque.' },
      { q: 'Pouvez-vous présenter le projet à la banque ?', a: 'Nous pouvons accompagner le porteur de projet aux rendez-vous ; la présentation reste la sienne.' },
    ],
  },
  {
    id: 'nouvelle-plateforme-logistique-faisabilite',
    famille: 'investissement',
    titre: 'Nouvelle plateforme logistique : opportunité et faisabilité',
    court: 'Nouvelle plateforme logistique',
    accroche: 'Dimensionner, localiser et chiffrer un nouvel entrepôt avant de signer un bail, d’acheter un terrain ou de lancer une construction.',
    declencheurs: ['Entrepôt saturé, croissance', 'Regroupement de sites', 'Implantation en zone logistique', 'Construire, acheter ou louer'],
    pourQui: 'DG, DAF, directeurs supply chain, promoteurs logistiques',
    duree: '2 semaines à 3 mois',
    prix: '40 000 – 180 000 MAD HT',
    livrables: ['Besoin à 5 ans', 'Scénarios de localisation', 'Dimensionnement et implantation', 'Investissement et coûts d’exploitation', 'VAN, TRI, retour sur investissement et plan de transfert'],
    etapes: ['Besoin', 'Scénarios', 'Dimensionnement', 'Business case'],
    versions: [
      { nom: "Note d'opportunité", contenu: 'Besoin, 2 ou 3 scénarios, ordre de grandeur des coûts, recommandation', duree: '2 à 3 semaines', prix: '40 000 – 60 000 MAD HT' },
      { nom: 'Étude de faisabilité', contenu: 'Dimensionnement détaillé, automatisation, construire-acheter-louer, business case, cahier des charges', duree: '2 à 3 mois', prix: '110 000 – 180 000 MAD HT' },
    ],
    liens: [L_SIM_DIM, L_SIM_COUT, m('business-case-automatisation-entrepot')],
    motif: /nouvel-entrepot|plateforme-logistique|implantation|zone[s]?-logistique[s]?|dimensionn/,
    faq: [
      { q: 'Faut-il acheter ou louer son entrepôt ?', a: "Cela dépend de la durée d'engagement, du coût du capital et de la spécificité du bâtiment. L'étude compare les scénarios sur la même durée." },
      { q: 'Peut-on démarrer avec les simulateurs du site ?', a: 'Oui : ils donnent un premier ordre de grandeur de la surface et du coût, que la note d’opportunité vient affiner.' },
      { q: 'Accompagnez-vous la construction ?', a: 'La suite possible est une assistance à maîtrise d’ouvrage, chiffrée sur devis.' },
    ],
  },
  {
    id: 'investissement-flotte-porteur-achat-leasing',
    famille: 'investissement',
    titre: 'Investissement flotte : nouveau porteur, renouvellement, achat ou leasing',
    court: 'Investissement flotte',
    accroche: 'Comparer achat, crédit-bail, location longue durée et sous-traitance sur toute la durée de vie, avant d’acheter un camion.',
    declencheurs: ['Achat d’un ou plusieurs porteurs ou tracteurs', 'Flotte vieillissante', 'Choix entre achat, crédit-bail, location et sous-traitance', 'Passage à une autre énergie'],
    pourQui: 'Transporteurs, distributeurs et industriels à flotte propre',
    duree: '1 à 5 semaines',
    prix: '25 000 – 80 000 MAD HT',
    livrables: ['Coût total de possession par option', 'Comparaison sur 5 à 7 ans', 'En version flotte : calendrier de renouvellement, financement, flotte cible'],
    etapes: ['Usage et coûts actuels', 'Options', 'Comparaison', 'Recommandation'],
    versions: [
      { nom: 'Coût total de possession', contenu: '1 à 5 véhicules, 4 options comparées', duree: '1 à 2 semaines', prix: '25 000 – 40 000 MAD HT' },
      { nom: 'Plan de renouvellement', contenu: 'Flotte de 10 véhicules ou plus', duree: '3 à 5 semaines', prix: '50 000 – 80 000 MAD HT' },
    ],
    limites: "Le traitement fiscal (amortissement, crédit-bail) est à valider par l'expert-comptable de l'entreprise.",
    formations: [FORM_TRANSPORT],
    liens: [m('prix-de-revient-transport-routier')],
    motif: /flotte|porteur|camion|vehicule|leasing|credit-bail|location-longue-duree/,
    faq: [
      { q: 'Le crédit-bail est-il toujours plus intéressant ?', a: "Non. Il préserve la trésorerie mais son coût total dépend du taux, de la durée et de la valeur de rachat. L'étude compare les options sur la même durée et le même usage." },
      { q: 'Faut-il sous-traiter plutôt qu’acheter ?', a: "Quand le véhicule roule peu ou de façon irrégulière, la sous-traitance est souvent moins chère. L'étude calcule le kilométrage à partir duquel la flotte propre devient rentable." },
      { q: 'Prenez-vous en compte la revente ?', a: 'Oui, la valeur résiduelle estimée fait partie du coût total de possession.' },
    ],
  },
  {
    id: 'dossier-financement-primes-investissement',
    famille: 'investissement',
    titre: 'Dossier de financement et de primes à l’investissement',
    court: 'Dossier de financement & primes',
    accroche: 'Mettre le projet au format attendu par le centre régional d’investissement et la banque, pièces opérationnelles comprises.',
    declencheurs: ['Projet d’au moins 1 M MAD éligible au dispositif TPME de la Charte de l’investissement', 'Demande de crédit garanti'],
    pourQui: 'Porteurs de projet, PME',
    duree: '2 à 3 semaines',
    prix: '20 000 – 35 000 MAD HT',
    livrables: ['Business plan mis au format du dossier', 'Pièces justificatives opérationnelles', 'Accompagnement aux rendez-vous'],
    etapes: ['Liste des pièces', 'Mise au format', 'Dépôt et suivi'],
    limites: 'Proposé uniquement en complément d’un business plan ou d’une étude d’investissement réalisés par le cabinet.',
    liens: [m('business-plan-nouvelle-activite')],
    motif: /primes-a-l-investissement|charte-de-l-investissement|tamwilcom|(^|-)cri(-|$)/,
    faq: [
      { q: 'Quel montant de prime peut-on espérer ?', a: "Le dispositif TPME prévoit des primes cumulables pouvant atteindre 30 % de l'investissement selon les critères du projet. Le montant exact dépend de l'éligibilité, vérifiée par le centre régional d'investissement." },
      { q: 'Prenez-vous un pourcentage sur la prime ?', a: 'Non. La mission est facturée au forfait.' },
      { q: 'Où se dépose le dossier ?', a: 'Sur la plateforme des centres régionaux d’investissement, qui instruisent les dossiers et préparent les conventions.' },
    ],
  },
  {
    id: 'business-case-automatisation-entrepot',
    famille: 'investissement',
    titre: "Business case d'automatisation d'entrepôt",
    court: 'Automatisation d’entrepôt',
    accroche: 'Vérifier, chiffres à l’appui, le retour sur investissement promis par un intégrateur avant de signer.',
    declencheurs: ['Proposition d’un intégrateur : convoyeurs, transstockeurs, robots', 'Pénurie de main-d’œuvre', 'Pics d’activité'],
    pourQui: 'Directeurs supply chain, DAF',
    duree: '3 à 5 semaines',
    prix: '45 000 – 80 000 MAD HT',
    livrables: ['Situation actuelle : volumes, productivité, coûts', "Scénarios d'automatisation", 'Investissement, gains, retour sur investissement, risques', "Avis indépendant sur l'offre de l'intégrateur"],
    etapes: ['Mesures', 'Scénarios', 'Business case', 'Avis'],
    liens: [m('nouvelle-plateforme-logistique-faisabilite'), L_CONSEIL],
    motif: /automatisation-d-entrepot|automatiser-son-entrepot|robot|convoyeur|transstockeur|retour-sur-investissement/,
    faq: [
      { q: 'Êtes-vous liés à un intégrateur ?', a: "Non. Le cabinet ne touche aucune commission d'intégrateur ou d'éditeur." },
      { q: 'Quels gains vérifier en priorité ?', a: "Les gains de productivité annoncés, rapportés à vos volumes réels et à leur saisonnalité, et les coûts de maintenance sur la durée." },
      { q: 'Et pour un projet WMS ou TMS ?', a: 'Il existe une étude de faisabilité dédiée aux systèmes.' },
    ],
  },

  // ── AUDIT ──────────────────────────────────────────────────────────────
  {
    id: 'audit-factures-transport-logistique',
    famille: 'audit',
    titre: 'Audit des factures transport et logistique',
    court: 'Audit des factures transport',
    accroche: 'Contrôler les factures de transport contre les tarifs contractuels, récupérer les surfacturations et éviter qu’elles reviennent.',
    declencheurs: ['Coûts de transport qui dérivent', 'Nombreux transporteurs', 'Facturation complexe : surcharges, gasoil, attentes, retours'],
    pourQui: 'DAF, directeurs logistique',
    duree: '3 à 6 semaines',
    prix: '20 000 – 70 000 MAD HT',
    livrables: ['Contrôle des factures sur 12 mois', 'Doublons, erreurs de tarif, surcharges non prévues', 'Sommes à récupérer, chiffrées', 'Règles de contrôle pour l’avenir'],
    etapes: ['Collecte', 'Contrôle', 'Réclamations', 'Règles de contrôle'],
    limites: 'Deux modes : forfait, ou forfait réduit plus une part des sommes effectivement récupérées.',
    liens: [m('audit-contrat-facturation-prestataire-logistique'), m('prix-de-revient-transport-routier')],
    motif: /facture[s]?-de-transport|facturation-transport|surfacturation|audit-des-factures/,
    faq: [
      { q: 'Sur quelle période portent les contrôles ?', a: 'En général les 12 derniers mois, selon les délais de réclamation prévus dans les contrats.' },
      { q: 'Qui réclame les sommes aux transporteurs ?', a: "L'entreprise, avec le dossier de preuves préparé pendant la mission." },
      { q: 'Faut-il tout contrôler ?', a: 'Pas forcément : un échantillon bien construit suffit souvent à repérer les erreurs systématiques.' },
    ],
  },
  {
    id: 'audit-contrat-facturation-prestataire-logistique',
    famille: 'audit',
    titre: "Audit du contrat et de la facturation d'un prestataire logistique",
    court: 'Audit prestataire logistique',
    accroche: 'Vérifier que le prestataire facture ce qui a été convenu, tient ses engagements et applique les pénalités prévues.',
    declencheurs: ['Factures du prestataire en hausse', 'Indicateurs non tenus', 'Renouvellement du contrat', 'Contrat en livre ouvert jamais vérifié'],
    pourQui: 'DAF, directeurs supply chain et achats',
    duree: '3 à 5 semaines',
    prix: '35 000 – 60 000 MAD HT',
    livrables: ['Conformité de la facturation au contrat', 'Contrôle des unités d’œuvre facturées', 'Vérification des coûts en livre ouvert', 'Indicateurs, pénalités et recommandations'],
    etapes: ['Lecture du contrat', 'Contrôle des factures', 'Visite du site', 'Recommandations'],
    liens: [m('appel-d-offres-transport-prestataire-logistique'), m('audit-factures-transport-logistique')],
    motif: /prestataire-logistique|3pl|contrat-logistique|penalites|open-book/,
    faq: [
      { q: 'Le prestataire doit-il être prévenu ?', a: "C'est préférable : une partie des contrôles nécessite ses données et l'accès au site." },
      { q: "Que faire si le contrat ne prévoit pas d'indicateurs ?", a: "L'audit propose des indicateurs et des pénalités à intégrer lors du prochain avenant ou du renouvellement." },
      { q: 'Peut-on en profiter pour renégocier ?', a: 'Oui, les constats de l’audit sont la meilleure base de renégociation.' },
    ],
  },
  {
    id: 'audit-stocks-demarque',
    famille: 'audit',
    titre: 'Audit des stocks et de la démarque',
    court: 'Audit des stocks & démarque',
    accroche: 'Comprendre d’où viennent les écarts de stock et la démarque inconnue, et mettre en place les contrôles qui les arrêtent.',
    declencheurs: ['Démarque inconnue', 'Écarts récurrents', 'Soupçon de vol ou de fraude', 'Demande du commissaire aux comptes ou rachat'],
    pourQui: 'DG, DAF, audit interne',
    duree: '3 à 6 semaines',
    prix: '50 000 – 85 000 MAD HT',
    livrables: ['Rapprochement stock physique, stock informatique et comptabilité', 'Analyse des flux : réceptions, retours, ajustements, destructions', 'Droits d’accès au système', 'Cartographie des causes', 'Recommandations de contrôle'],
    etapes: ['Rapprochements', 'Analyse des flux', 'Causes', 'Contrôles'],
    liens: [m('inventaire-fin-exercice'), m('controle-interne-achats')],
    motif: /demarque|ecart[s]?-de-stock|(^|-)vols?(-|$)|fiabilite-des-stocks/,
    faq: [
      { q: 'Quelle différence avec un inventaire ?', a: "L'inventaire constate le stock. L'audit cherche pourquoi il diffère des chiffres et comment l'éviter." },
      { q: 'Les écarts viennent-ils toujours de vols ?', a: 'Non. Une grande partie vient souvent d’erreurs de saisie, de réceptions mal enregistrées, de retours non traités ou d’unités de mesure incohérentes.' },
      { q: 'Analysez-vous les droits informatiques ?', a: 'Oui : qui peut ajuster un stock, créer un article ou valider un retour fait partie du diagnostic.' },
    ],
  },
  {
    id: 'benchmark-audit-couts-logistiques',
    famille: 'audit',
    titre: 'Benchmark et audit des coûts logistiques',
    court: 'Benchmark des coûts logistiques',
    accroche: 'Répondre à la question « sommes-nous chers ? » avec des ratios comparables et des gisements d’économies chiffrés.',
    declencheurs: ['Question du DG, de l’actionnaire ou du siège', 'Préparation du budget', 'Renégociation avec les prestataires'],
    pourQui: 'DG, DAF',
    duree: '3 à 5 semaines',
    prix: '45 000 – 70 000 MAD HT',
    livrables: ['Coûts ramenés à des ratios comparables : % du CA, par palette, par commande, par m², par tonne-kilomètre', 'Comparaison à des repères sectoriels', 'Écarts expliqués', 'Gisements d’économies chiffrés'],
    etapes: ['Reconstitution des coûts', 'Ratios', 'Comparaison', 'Gisements'],
    liens: [m('cout-logistique-complet-cost-to-serve'), L_DIAG],
    motif: /benchmark-(des-)?couts|ratios-logistiques|couts-logistiques/,
    faq: [
      { q: "D'où viennent les repères de comparaison ?", a: 'De sources publiques sectorielles et de données de missions agrégées et anonymisées. Les sources sont citées dans le rapport.' },
      { q: 'Un benchmark suffit-il pour décider ?', a: 'Il indique où regarder. Les écarts doivent ensuite être expliqués : une logistique plus chère peut servir un niveau de service plus élevé.' },
      { q: 'Combien de temps pour un premier résultat ?', a: 'Trois semaines si les données comptables et les volumes sont disponibles.' },
    ],
  },
  {
    id: 'audit-interne-co-sourcing-supply-chain',
    famille: 'audit',
    titre: 'Audit interne en co-sourcing : achats, stocks, transport',
    court: 'Audit interne en co-sourcing',
    accroche: 'Des auditeurs spécialistes de la supply chain pour exécuter les missions du plan d’audit interne sur les achats, les stocks et la logistique.',
    declencheurs: ['Direction de l’audit interne sans spécialiste supply chain', 'Plan d’audit annuel à exécuter', 'Demande du comité d’audit'],
    pourQui: "Directions de l'audit interne de groupes, entreprises publiques et institutions",
    duree: '6 à 12 jours par mission',
    prix: '45 000 – 90 000 MAD HT par mission',
    livrables: ['Programme de travail', 'Tests', 'Constats et recommandations au format de l’audit interne'],
    etapes: ['Programme', 'Travaux', 'Constats', 'Rapport'],
    limites: 'Contrat-cadre possible pour 3 à 5 missions par an. Pas d’audit légal des comptes, réservé aux commissaires aux comptes.',
    liens: [m('controle-interne-achats'), m('audit-stocks-demarque')],
    motif: /audit-interne|co-sourcing|comite-d-audit/,
    faq: [
      { q: 'Utilisez-vous notre méthodologie ?', a: "Oui, les missions suivent la méthodologie et le format de rapport de votre direction de l'audit interne." },
      { q: 'Pouvez-vous auditer un fournisseur ou un prestataire ?', a: 'Oui, dans le cadre d’une clause d’audit prévue au contrat.' },
      { q: 'Faites-vous de l’audit légal ?', a: 'Non. L’audit légal des comptes est réservé aux commissaires aux comptes.' },
    ],
  },
  {
    id: 'audit-couts-importation',
    famille: 'audit',
    titre: "Audit des coûts d'importation : frais d'approche, surestaries, droits",
    court: "Audit des coûts d'importation",
    accroche: 'Repérer les droits payés à tort, les surestaries évitables et les frais de transit injustifiés sur 12 mois de dossiers.',
    declencheurs: ['Frais de transit et de port en hausse', 'Surestaries répétées', 'Droits payés sans vérifier l’origine préférentielle ou les régimes suspensifs'],
    pourQui: 'Importateurs, industriels',
    duree: '3 à 5 semaines',
    prix: '35 000 – 55 000 MAD HT',
    livrables: ['Revue de 12 mois de dossiers d’importation', 'Droits payés à tort et récupérations possibles', 'Surestaries et magasinage évitables', 'Recommandations'],
    etapes: ['Collecte des dossiers', 'Contrôles', 'Récupérations', 'Recommandations'],
    limites: 'Option : forfait réduit plus une part des sommes récupérées.',
    formations: [FORM_DOUANE, FORM_IMPORT],
    liens: [L_OEA, m('prix-de-revient-importation-cout-rendu')],
    motif: /surestaries|magasinage|droits-de-douane|eur1|origine|regime[s]?-suspensif|transitaire/,
    faq: [
      { q: 'Peut-on récupérer des droits déjà payés ?', a: "Dans certains cas, si l'origine préférentielle pouvait être justifiée ou si une erreur est démontrée, dans les délais prévus par la réglementation douanière. L'audit identifie les cas et prépare les dossiers." },
      { q: 'Les surestaries sont-elles négociables ?', a: 'Une partie l’est, notamment avec les armateurs pour les franchises. Le reste s’évite par l’anticipation du dédouanement.' },
      { q: 'Travaillez-vous avec notre transitaire ?', a: 'Oui, ses données sont nécessaires et ses pratiques font partie des recommandations.' },
    ],
  },
]

// Libellés des liens vers d'autres missions : complétés depuis le catalogue.
for (const mission of MISSIONS) {
  mission.liens = mission.liens?.map((l) => {
    if (l.label) return l
    const id = l.to.replace('/missions/', '')
    const target = MISSIONS.find((x) => x.id === id)
    if (!target) throw new Error(`Mission liée introuvable : ${id} (depuis ${mission.id})`)
    return { to: l.to, label: target.court }
  })
}

const SEO_TITRES: Record<string, string> = {
  "inventaire-fin-exercice": "Inventaire de fin d'exercice et fiabilité des stocks",
  "facturation-electronique-circuit-achats": "Facturation électronique au Maroc : le circuit achats",
  "marches-publics-acheteur-public": "Marchés publics : organiser les achats publics",
  "marches-publics-cellule-appels-d-offres": "Répondre aux marchés publics : la cellule d'une PME",
  "bonnes-pratiques-distribution-pharmaceutique": "Bonnes pratiques de distribution pharmaceutique au Maroc",
  "transport-matieres-dangereuses-loi-30-05": "Matières dangereuses : conformité à la loi 30-05",
  "preparation-audit-iso-achats-logistique": "Préparer un audit ISO : volet achats et logistique",
  "fournisseur-automobile-mmog-le-iatf": "Fournisseur automobile au Maroc : MMOG/LE et IATF",
  "aeronautique-en-9100-en-9120-achats-tracabilite": "Aéronautique : achats et traçabilité EN 9100 / EN 9120",
  "surete-entrepot-tapa-iso-28000": "Sûreté d'entrepôt : préparer TAPA FSR et ISO 28000",
  "entrepot-agroalimentaire-froid-ifs-brcgs": "Entrepôt agroalimentaire : IFS Logistics, BRCGS, ONSSA",
  "exigences-clients-europeens-export": "Exigences des clients européens : EUDR, PPWR, CBAM, RSE",
  "evaluation-fournisseurs-sapin-2": "Sapin II : évaluer ses fournisseurs au Maroc",
  "prix-de-transfert-analyse-fonctionnelle-supply-chain": "Prix de transfert : analyse achats et logistique",
  "cout-logistique-complet-cost-to-serve": "Coût logistique complet et cost-to-serve au Maroc",
  "prix-de-revient-transport-routier": "Prix de revient transport routier et grille tarifaire",
  "prix-de-revient-importation-cout-rendu": "Prix de revient à l'importation : le coût rendu",
  "faire-ou-faire-faire-externalisation-logistique": "Externaliser sa logistique ? L'étude faire ou faire faire",
  "nouvelle-plateforme-logistique-faisabilite": "Nouvel entrepôt : étude d'opportunité et de faisabilité",
  "investissement-flotte-porteur-achat-leasing": "Investir dans un camion : achat, leasing ou location ?",
  "dossier-financement-primes-investissement": "Dossier de primes et de financement à l'investissement",
  "audit-contrat-facturation-prestataire-logistique": "Audit d'un prestataire logistique : contrat et factures",
  "audit-interne-co-sourcing-supply-chain": "Audit interne supply chain en co-sourcing",
  "audit-couts-importation": "Audit des coûts d'importation : droits et surestaries"
}
for (const mission of MISSIONS) mission.seoTitre = SEO_TITRES[mission.id]

export function missionsDe(famille: FamilleId): Mission[] {
  return MISSIONS.filter((x) => x.famille === famille)
}

export function getMission(id: string | undefined): Mission | undefined {
  return MISSIONS.find((x) => x.id === id)
}

export function missionDescription(x: Mission): string {
  const base = `${x.accroche} ${x.duree}, ${x.prix}.`
  return base.length > 158 ? base.slice(0, 155).trimEnd() + '…' : base
}

/** <title> de la page : le titre de la mission s'il tient en 60 caractères, sinon son titre SEO. */
export function missionTitle(x: Mission): string {
  const full = `${x.titre} au Maroc`
  return full.length <= 60 ? full : x.seoTitre ?? x.titre
}

export function buildMissionSchema(x: Mission): unknown[] {
  const url = `https://nextinotech.com/missions/${x.id}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: x.titre,
      description: x.accroche,
      url,
      serviceType: FAMILLES.find((f) => f.id === x.famille)?.label,
      areaServed: { '@type': 'Country', name: 'Maroc' },
      provider: { '@id': 'https://nextinotech.com/#organization' },
      offers: { '@type': 'Offer', priceCurrency: 'MAD', description: x.prix },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: x.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
}
