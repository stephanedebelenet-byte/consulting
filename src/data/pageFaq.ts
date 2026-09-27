// FAQ des pages qui n'avaient pas de questions-réponses (audit SEO/GEO du
// 27/09/2026). Source unique : la section visible (src/components/PageFaq.tsx,
// rendue par Layout sous le contenu de la page) et le JSON-LD FAQPage
// (src/data/routeMeta.ts) lisent ce même tableau.
//
// Règles de rédaction :
// - tout prix cité est celui déjà affiché sur le site (grilles Conseil,
//   Systèmes, DSC, formations.ts, controlTower.ts) — jamais un chiffre nouveau ;
//   une offre « sur devis » le reste, avec ce qui fait varier le montant ;
// - une question = une intention de recherche, propre à la page (pas de
//   question recopiée d'une page à l'autre : check-seo-consistency le vérifie) ;
// - réponse autonome en 40 à 90 mots, lisible hors contexte par un moteur de
//   réponse, suivie si utile d'un lien vers la page qui approfondit.
// Module pur, sans React.

export interface PageFaqItem {
  q: string
  a: string
  link?: { label: string; to: string }
}

export const PAGE_FAQ: Record<string, PageFaqItem[]> = {
  '/': [
    {
      q: 'Que fait Nextinotech ?',
      a: "Nextinotech est un cabinet indépendant de conseil, de formation et de solutions digitales en Supply Chain, Logistique et Achats, basé au Technopark de Casablanca. Il est organisé en trois unités : Nextinotech Conseil (diagnostic, stocks, achats, AMOA, direction supply chain à temps partagé, statut OEA), Nextinotech Académie (formations et ingénierie de formation) et Nextinotech Digital (control tower, intégration de systèmes, simulateurs).",
    },
    {
      q: 'Combien coûte un cabinet de conseil supply chain au Maroc ?',
      a: "Chez Nextinotech, les tarifs sont publics. Un diagnostic supply chain coûte de 35 000 à 130 000 MAD HT selon sa profondeur, un projet stocks, achats ou schéma logistique de 45 000 à 250 000 MAD HT, une AMOA de 70 000 à 350 000 MAD HT, et un mandat de direction supply chain à temps partagé de 180 000 à 550 000 MAD HT. Les formations commencent à 1 500 MAD par participant.",
      link: { label: 'Voir toutes les offres Conseil', to: '/conseil' },
    },
    {
      q: 'Pour quelles entreprises intervenez-vous ?',
      a: "Principalement des PME et ETI marocaines de 50 à 800 personnes, dans l'industrie, la grande distribution, l'agroalimentaire, la pharmacie, le BTP et le transport-logistique (3PL). Les grands groupes font appel à nous pour des programmes sur mesure. Nous intervenons partout au Maroc — Casablanca, Rabat, Tanger, Marrakech, Agadir, Fès — et en Europe.",
    },
    {
      q: 'Que veut dire « cabinet indépendant » ?',
      a: "Nextinotech ne revend aucune licence et ne touche aucune commission d'éditeur de logiciel (WMS, TMS, ERP) ni de prestataire. Notre rémunération vient uniquement du client. Quand nous recommandons un système ou un transporteur, c'est parce qu'il sert votre business case, pas parce qu'il nous rapporte.",
    },
    {
      q: 'Quelles références clients avez-vous ?',
      a: "Plus de 110 missions en 20 ans, dont la conception logistique greenfield du site Renault-Nissan de Tanger, une plateforme 3PL de 21 000 m² pour L'Oréal, Nestlé et Mars (productivité +35 %, taux de service 98,5 %) et la transformation achats du Groupe Addoha (710 millions MAD d'achats, 11 % d'économies).",
      link: { label: 'Voir les références', to: '/references' },
    },
    {
      q: 'Par où commencer quand on ne sait pas ce qui cloche dans sa supply chain ?',
      a: "Par un diagnostic. Le Diagnostic Flash (35 000 à 55 000 MAD HT, 2 semaines) identifie les écarts majeurs et les gains rapides ; le Diagnostic Stratégique (80 000 à 130 000 MAD HT, 4 à 6 semaines) chiffre chaque levier et livre une feuille de route. Le premier échange de cadrage est gratuit.",
      link: { label: 'Découvrir le diagnostic', to: '/conseil' },
    },
    {
      q: 'Proposez-vous aussi des formations et des outils ?',
      a: "Oui. Nextinotech Académie propose 30 programmes (logistique, stocks, S&OP, DDMRP, achats, lean, management), en inter-entreprise à Casablanca ou en intra dans vos locaux, finançables CSF/GIAC. Nextinotech Digital propose une control tower, des démonstrations WMS, TMS et APS, et trois simulateurs gratuits pour l'entrepôt.",
      link: { label: 'Voir les formations', to: '/formation' },
    },
    {
      q: 'Comment se passe le premier contact ?',
      a: "Par un échange gratuit et sans engagement, en visio, par téléphone ou au Technopark de Casablanca. Nous cadrons votre problématique, vous indiquons si nous pouvons réellement vous aider et, si oui, avec quelle offre et quel budget. Réponse à toute demande sous 24 heures.",
      link: { label: 'Prendre contact', to: '/contact' },
    },
  ],

  '/references': [
    {
      q: 'Quels résultats avez-vous obtenus chez vos clients ?',
      a: "Trois exemples publics : une plateforme 3PL de 21 000 m² et 120 collaborateurs gérée pour L'Oréal, Nestlé et Mars, avec une productivité en hausse de 35 % et un taux de service de 98,5 % ; la transformation de la fonction achats du Groupe Addoha, 31 chantiers et 710 millions MAD d'achats annuels, avec 11 % d'économies réalisées ; la conception greenfield de la logistique du site Renault-Nissan de Tanger.",
    },
    {
      q: 'Dans quels secteurs avez-vous travaillé ?',
      a: "Automobile, grande consommation (FMCG), grande distribution, agroalimentaire, santé et pharmacie, immobilier et construction, transport et logistique 3PL, ainsi que la chaîne du froid nationale de la vaccination COVID-19, en tant qu'expert bénévole de la Task Force.",
    },
    {
      q: 'Pouvez-vous citer d\'autres clients que ceux du site ?',
      a: "Les entreprises citées sur le site le sont avec leur accord ; aucun autre nom de client n'est donné sans autorisation écrite. Lors d'un échange, nous pouvons décrire des missions comparables à la vôtre sans nommer l'entreprise.",
    },
    {
      q: 'Les résultats annoncés sont-ils mesurés ?',
      a: "Oui. Chaque mission démarre avec des indicateurs convenus à l'avance — économies achats, niveau de stock, taux de service, productivité — et une valeur de départ. Le résultat est mesuré sur ces mêmes indicateurs à la fin. Sur les missions achats et stocks, une part de notre rémunération peut être indexée sur le gain réel.",
    },
    {
      q: 'Travaillez-vous avec des PME ou seulement avec des grands groupes ?',
      a: "Majoritairement avec des PME et ETI marocaines : la plupart de nos 110+ missions concernent des entreprises de 50 à 800 personnes. Les grandes références citées montrent la méthode ; les offres (diagnostic, projets, mandats à temps partagé) sont dimensionnées et tarifées pour les PME.",
      link: { label: 'Voir les offres Conseil', to: '/conseil' },
    },
    {
      q: 'Combien de temps faut-il pour obtenir des résultats comparables ?',
      a: "Les premiers gains rapides (stocks dormants, renégociations, réorganisation d'un flux) apparaissent souvent dans les 3 premiers mois. Une transformation complète — processus, systèmes, équipes autonomes — prend de 4 à 10 mois, selon la taille de l'entreprise et le point de départ mesuré au diagnostic.",
    },
  ],

  '/a-propos': [
    {
      q: 'Qui a fondé Nextinotech ?',
      a: "Nextinotech a été fondé par Youssef B, expert supply chain avec plus de 20 ans de missions terrain au Maroc et en Europe, certifié DDMRP. Son parcours couvre la conception logistique industrielle (Renault-Nissan Tanger), la gestion d'une plateforme 3PL de 21 000 m² et la transformation achats d'un groupe immobilier de 31 chantiers.",
    },
    {
      q: 'Combien de consultants compte le cabinet ?',
      a: "Une équipe d'environ 5 consultants — seniors certifiés DDMRP et juniors formés en interne — appuyée par une équipe administrative qui gère chaque mission du devis au bilan.",
    },
    {
      q: 'Où se trouve Nextinotech ?',
      a: "Au Technopark de Casablanca, 3e étage, route de Nouaceur. Nos consultants interviennent sur site partout au Maroc (Casablanca, Rabat, Kénitra, Tanger, Marrakech, Agadir, Fès, Meknès) et en Europe, et à distance quand la mission le permet.",
      link: { label: 'Nous contacter', to: '/contact' },
    },
    {
      q: 'Qu\'est-ce qui distingue Nextinotech d\'un grand cabinet de conseil ?',
      a: "Quatre engagements : l'indépendance totale vis-à-vis des éditeurs, des prix publics pour toutes les offres standard, une part de rémunération indexée sur le gain réel pour les missions achats et stocks, et des consultants qui ont eux-mêmes dirigé des entrepôts, des achats et des projets SI, pas seulement audité.",
    },
    {
      q: 'Quelles certifications détenez-vous ?',
      a: "Nos consultants seniors sont certifiés DDMRP (Demand Driven Material Requirements Planning). Le cabinet intervient aussi auprès de l'enseignement supérieur (ENSA Agadir, KEDGE / UM6P) et a travaillé avec la European Training Foundation.",
    },
    {
      q: 'Nextinotech recrute-t-il ?',
      a: "Les offres ouvertes et les candidatures spontanées en supply chain, logistique et achats passent par la page Carrière, qui décrit aussi le processus de recrutement.",
      link: { label: 'Voir la page Carrière', to: '/carriere' },
    },
  ],

  '/contact': [
    {
      q: 'Le premier échange est-il vraiment gratuit ?',
      a: "Oui, gratuit et sans engagement. Il sert à comprendre votre problématique et à vous dire honnêtement si nous pouvons vous aider. Vous repartez avec des premières pistes concrètes, même si vous ne donnez pas suite.",
    },
    {
      q: 'Sous quel délai répondez-vous ?',
      a: "Sous 24 heures pour toute demande envoyée par le formulaire, par e-mail (contact@nextinotech.com) ou par WhatsApp. Pour une urgence opérationnelle, appelez directement le +212 06 63 44 92 00.",
    },
    {
      q: 'Comment préparer le premier rendez-vous ?',
      a: "Quelques éléments suffisent : votre activité et la taille de l'entreprise, le problème constaté (ruptures, surstocks, coûts de transport, retards, projet de système), et si possible deux ou trois indicateurs chiffrés. Nous venons préparés sur votre secteur.",
    },
    {
      q: 'Peut-on vous rencontrer en personne ?',
      a: "Oui, au Technopark de Casablanca (3e étage, route de Nouaceur), ou directement sur votre site, partout au Maroc. Le premier échange peut aussi se faire en visioconférence ou par téléphone.",
    },
    {
      q: 'Recevez-vous des demandes de devis pour des formations ?',
      a: "Oui. Indiquez le programme visé, le nombre de participants et la ville : nous vous envoyons un devis intra-entreprise et la convention de formation nécessaire à un financement CSF ou GIAC.",
      link: { label: 'Voir le catalogue des formations', to: '/formation' },
    },
    {
      q: 'Mes informations restent-elles confidentielles ?',
      a: "Oui. Les informations transmises ne servent qu'à répondre à votre demande et ne sont ni revendues ni partagées. Le détail figure dans notre politique de confidentialité.",
      link: { label: 'Politique de confidentialité', to: '/confidentialite' },
    },
  ],

  '/direction-supply-chain-temps-partage': [
    {
      q: 'Qu\'est-ce qu\'un directeur supply chain à temps partagé ?',
      a: "Un directeur supply chain expérimenté qui dirige votre fonction supply chain 2 à 3 jours par semaine, dans le cadre d'un mandat à durée définie, sans être salarié de l'entreprise. Il pilote stocks, achats, logistique et systèmes, installe les indicateurs et les rituels, puis forme un responsable interne pour prendre le relais.",
    },
    {
      q: 'Combien coûte une direction supply chain à temps partagé au Maroc ?',
      a: "Chez Nextinotech, le Mandat Pilotage (PME de 50 à 200 personnes, 4 à 6 mois, 2 jours par semaine) coûte de 180 000 à 280 000 MAD HT. Le Mandat Stratégique (ETI de 200 à 800 personnes, 7 à 10 mois, 2 à 3 jours par semaine) coûte de 320 000 à 550 000 MAD HT. Les grands groupes relèvent d'un mandat sur mesure.",
    },
    {
      q: 'Temps partagé, management de transition, freelance : quelle différence ?',
      a: "Le management de transition remplace un dirigeant à temps plein pendant une absence. Le freelance vend des jours sans engagement de résultat. Le temps partagé Nextinotech est un mandat en 3 phases — état des lieux, pilotage, passation — avec un livrable de sortie : une équipe interne autonome et outillée.",
    },
    {
      q: 'En combien de temps le mandat démarre-t-il ?',
      a: "En 2 semaines après la signature, contre 4 à 6 mois pour recruter un directeur supply chain en CDI. La première phase, l'état des lieux, dure 4 semaines et se conclut par un plan de transformation validé en comité de direction.",
    },
    {
      q: 'Que se passe-t-il à la fin du mandat ?',
      a: "La phase de passation (4 à 6 semaines) forme le responsable supply chain interne, documente les processus clés et livre un tableau de bord autonome. Le mandat se clôt par une session avec la direction générale. Sa durée est définie dès la signature : l'objectif est que la fonction tourne sans nous, pas un abonnement sans fin.",
    },
    {
      q: 'Faut-il un directeur supply chain complet, ou seulement logistique ou achats ?',
      a: "Si le problème est concentré sur les entrepôts et le transport, un directeur logistique à temps partagé suffit ; s'il porte sur les coûts d'achat et les fournisseurs, un directeur achats à temps partagé. La direction supply chain complète s'impose quand stocks, achats, logistique et systèmes sont liés. Les trois mandats ont la même grille de prix.",
      link: { label: 'Voir le directeur logistique à temps partagé', to: '/directeur-logistique-mi-temps' },
    },
    {
      q: 'Le directeur à temps partagé a-t-il autorité sur les équipes ?',
      a: "Oui, dans le périmètre défini avec la direction générale au démarrage du mandat : il dirige les équipes supply chain, arbitre les priorités et rend compte chaque mois au comité de direction. Dans le Mandat Stratégique, il peut aussi représenter la fonction au CODIR ou au Comex.",
    },
  ],

  '/directeur-logistique-mi-temps': [
    {
      q: 'Que fait un directeur logistique à temps partagé ?',
      a: "Il dirige vos entrepôts, votre transport et vos flux physiques 2 jours par semaine : organisation et adressage de l'entrepôt, choix des transporteurs, indicateurs terrain (OTIF, taux de service, coût par expédition), projets WMS ou TMS, et montée en compétences des chefs d'équipe. Il ne couvre pas les achats ni la planification.",
    },
    {
      q: 'Combien coûte un directeur logistique à temps partagé ?',
      a: "De 180 000 à 280 000 MAD HT pour un Mandat Pilotage en PME (4 à 6 mois, 2 jours par semaine), et de 320 000 à 550 000 MAD HT pour un Mandat Stratégique en ETI (7 à 10 mois), accompagnement WMS/TMS inclus. À comparer aux 600 000 à 900 000 MAD annuels d'un directeur logistique en CDI.",
    },
    {
      q: 'Dans quels cas choisir un directeur logistique plutôt qu\'un directeur supply chain ?',
      a: "Quand les difficultés viennent de l'exécution physique : entrepôt saturé, erreurs de préparation, retards de livraison, coûts de transport qui dérapent, projet d'extension ou de nouveau site. Si les ruptures viennent des prévisions ou des achats, la direction supply chain complète est plus adaptée.",
      link: { label: 'Voir la direction supply chain à temps partagé', to: '/direction-supply-chain-temps-partage' },
    },
    {
      q: 'Le mandat peut-il inclure la mise en place d\'un WMS ou d\'un TMS ?',
      a: "Oui. Dans le Mandat Stratégique, l'accompagnement WMS/TMS est inclus : cahier des charges, sélection de l'éditeur sans commission, pilotage du déploiement. Dans le Mandat Pilotage, le directeur cadre le projet ; le déploiement peut alors faire l'objet d'une offre Systèmes dédiée.",
      link: { label: 'Voir la démo WMS', to: '/demo/wms' },
    },
    {
      q: 'Intervenez-vous sur plusieurs entrepôts ou sites ?',
      a: "Oui. Le Mandat Stratégique est prévu pour les ETI multi-sites, avec un rythme de 2 à 3 jours par semaine réparti entre les sites. Pour dimensionner un nouvel entrepôt, notre simulateur gratuit donne une première estimation de surface, de baies et de quais.",
      link: { label: 'Simulateur de dimensionnement', to: '/outils/dimensionnement-entrepot' },
    },
    {
      q: 'Quelle expérience ont vos directeurs logistiques ?',
      a: "Plus de 20 ans de terrain : conception greenfield de la logistique du site Renault-Nissan de Tanger, et direction d'une plateforme 3PL de 21 000 m² pour L'Oréal, Nestlé et Mars, avec une productivité en hausse de 35 % et un taux de service de 98,5 %.",
    },
  ],

  '/directeur-achats-mi-temps': [
    {
      q: 'Que fait un directeur achats à temps partagé ?',
      a: "Il structure votre stratégie de sourcing, cartographie vos dépenses par catégorie, renégocie les contrats-cadres, rationalise le panel fournisseurs et forme vos acheteurs, 2 jours par semaine. Il installe les indicateurs achats (économies réalisées, délais, conformité) et prépare un responsable achats interne à prendre le relais.",
    },
    {
      q: 'Combien coûte un directeur achats à temps partagé au Maroc ?',
      a: "De 180 000 à 280 000 MAD HT pour un Mandat Pilotage en PME (4 à 6 mois), et de 320 000 à 550 000 MAD HT pour un Mandat Stratégique en ETI (7 à 10 mois), structuration du panel fournisseurs incluse. Un directeur achats en CDI coûte 600 000 à 900 000 MAD par an.",
    },
    {
      q: 'Quelles économies peut-on attendre sur les achats ?',
      a: "Elles dépendent du point de départ mesuré au diagnostic. Référence publique : la transformation achats du Groupe Addoha (710 millions MAD d'achats annuels) a produit 11 % d'économies sur la dépense achats. Sur ce type de mission, une part de notre rémunération peut être indexée sur les économies réellement mesurées.",
    },
    {
      q: 'Le mandat est-il rentable pour une PME ?',
      a: "Il l'est dès que la dépense achats est significative : sur 20 millions MAD d'achats annuels, 3 % d'économies représentent 600 000 MAD par an, soit plus que le coût d'un Mandat Pilotage. Le diagnostic des 4 premières semaines chiffre ce potentiel avant la suite du mandat.",
    },
    {
      q: 'Faut-il un logiciel achats pour démarrer ?',
      a: "Non. Le mandat démarre avec vos outils existants (ERP, tableurs). Si un outil e-achats (e-RFx, gestion des contrats) se justifie, nous le cadrons et sélectionnons l'éditeur sans commission ; ce projet relève alors de notre offre Systèmes Achats, à partir de 55 000 MAD HT.",
    },
    {
      q: 'Vos acheteurs sont-ils formés pendant le mandat ?',
      a: "Oui. La montée en compétences des acheteurs fait partie de la phase de pilotage, et la passation forme le futur responsable achats. Pour approfondir la négociation, la formation Négociation Achats & Supply Chain peut être organisée en intra-entreprise.",
      link: { label: 'Formation Négociation Achats', to: '/formation/negociation-achats' },
    },
  ],

  '/dsc-vs-recrutement-cdi': [
    {
      q: 'Quel est le salaire d\'un directeur supply chain au Maroc ?',
      a: "Un directeur supply chain en CDI représente de 600 000 à 900 000 MAD par an selon la taille de l'entreprise et le secteur. Les charges patronales au Maroc (CNSS, AMO, prestations familiales, taxe de formation professionnelle) représentent environ 21 % du salaire brut.",
    },
    {
      q: 'Combien de temps faut-il pour recruter un directeur supply chain ?',
      a: "De 4 à 6 mois en moyenne au Maroc : définition du poste, recherche d'un profil senior rare, entretiens, puis préavis du candidat chez son employeur actuel. Un mandat à temps partagé démarre en 2 semaines.",
    },
    {
      q: 'Le temps partagé revient-il moins cher qu\'un CDI ?',
      a: "Sur la durée d'une transformation, oui : 180 000 à 280 000 MAD HT pour un mandat PME de 4 à 6 mois, 320 000 à 550 000 MAD HT pour un mandat ETI de 7 à 10 mois, sans charges sociales ni coût de rupture. Sur un besoin permanent de plusieurs années, le CDI redevient logique.",
    },
    {
      q: 'Quand faut-il plutôt recruter en CDI ?',
      a: "Quand le besoin de direction supply chain est permanent, que la fonction est déjà structurée et que le budget le permet. Le mandat convient à une transformation à mener — après quoi la fonction doit tourner sans un directeur à temps plein, ou avec un profil interne formé pendant le mandat.",
    },
    {
      q: 'Peut-on combiner mandat et recrutement ?',
      a: "Oui, et c'est fréquent. Le Mandat Stratégique inclut le recrutement ou la formation du futur directeur supply chain interne : le directeur à temps partagé structure la fonction, définit le profil, participe à la sélection puis assure la passation.",
      link: { label: 'Voir le Mandat Stratégique', to: '/direction-supply-chain-temps-partage' },
    },
    {
      q: 'Quels sont les risques d\'un mauvais recrutement de directeur supply chain ?',
      a: "Plusieurs mois de salaire, les frais de recrutement, une rupture de contrat coûteuse et surtout 6 à 12 mois de transformation perdus. Le mandat réduit ce risque : durée définie, livrables à chaque phase, et un plan de transformation validé en comité de direction dès la 4e semaine.",
    },
  ],

  '/accompagnement-oea': [
    {
      q: 'Qu\'est-ce que le statut OEA au Maroc ?',
      a: "Le statut d'Opérateur Économique Agréé (OEA) est délivré par l'Administration des Douanes et Impôts Indirects (ADII) aux entreprises fiables et sûres dans leurs opérations import-export. La catégorie « Simplifications Douanières » (A ou B) donne accès à des procédures allégées, à moins de contrôles physiques et à un dédouanement plus rapide.",
    },
    {
      q: 'Combien coûte l\'obtention du statut OEA ?',
      a: "L'ADII ne facture aucun frais, taxe ou redevance pour l'octroi du statut. Le coût réel est celui de la préparation : audit externe obligatoire, mise en conformité et accompagnement. Notre accompagnement est sur devis, car il dépend des écarts constatés au diagnostic, du nombre de sites et de la documentation déjà en place.",
    },
    {
      q: 'Combien de temps faut-il pour obtenir le statut OEA ?',
      a: "De 8 à 15 mois avec notre accompagnement : 3 à 5 semaines de diagnostic, 3 à 6 mois de mise en conformité et de documentation, puis 2 à 4 mois d'assistance à l'audit de l'ADII jusqu'à la signature de la convention. Une entreprise déjà certifiée ISO part généralement avec moins d'écarts à combler.",
    },
    {
      q: 'Quelles entreprises sont éligibles au statut OEA ?',
      a: "Toute entreprise marocaine intervenant dans la chaîne logistique internationale — importateur, exportateur, industriel sous régime suspensif, transitaire, transporteur, entrepositaire — qui justifie d'un historique de conformité douanière et fiscale, d'une solvabilité financière et d'une gestion des stocks et de la sûreté conformes au référentiel de l'ADII.",
    },
    {
      q: 'Pourquoi une demande de statut OEA est-elle refusée ?',
      a: "Le plus souvent à cause d'écarts entre stock théorique et stock réel, d'une traçabilité insuffisante des flux, de procédures écrites mais non appliquées, ou d'un historique d'infractions douanières. Notre diagnostic d'éligibilité (gap analysis) identifie ces écarts avant le dépôt, et un pré-audit à blanc simule l'audit de l'ADII.",
    },
    {
      q: 'Une certification ISO aide-t-elle à obtenir l\'OEA ?',
      a: "Oui. Les exigences OEA de maîtrise des processus et de sûreté s'intègrent dans un système ISO 9001, EN 9100 ou ISO 14001 existant. Notre diagnostic évalue ce qui est déjà couvert par vos certifications pour ne documenter que l'écart.",
    },
    {
      q: 'Accompagnez-vous aussi les régimes douaniers suspensifs ?',
      a: "Oui. Nous accompagnons l'admission temporaire et l'entrepôt industriel franc, où l'écart entre stock théorique et stock réel est justement le point de contrôle de la douane. Pour les équipes, la formation Douane & Logistique Internationale (2 jours, 3 200 MAD TTC) couvre les bases.",
      link: { label: 'Formation Douane & Logistique Internationale', to: '/formation/douane-import-export' },
    },
  ],

  '/outils/dimensionnement-entrepot': [
    {
      q: 'Comment calculer la surface d\'un entrepôt ?',
      a: "À partir du nombre d'emplacements palettes nécessaires (stock moyen majoré d'une marge de pointe), du type de stockage (rack simple, double profondeur ou masse), puis en ajoutant allées, zones de réception, de préparation et d'expédition. En rack simple profondeur, les allées occupent une part importante de la surface, souvent de l'ordre de 40 à 50 %.",
    },
    {
      q: 'Combien de quais de chargement faut-il prévoir ?',
      a: "Le nombre de quais dépend du volume de lignes ou de palettes expédiées par jour, de la plage horaire de chargement et du temps moyen de chargement d'un camion. Le simulateur l'estime à partir de vos lignes de commande quotidiennes ; une étude de flux affine ensuite les pointes saisonnières.",
    },
    {
      q: 'Le simulateur remplace-t-il une étude de dimensionnement ?',
      a: "Non. Il donne une estimation directionnelle en 2 minutes pour cadrer un budget ou comparer des options. Une étude d'implantation tient compte de la hauteur sous poutre, des contraintes incendie, de la saisonnalité et de la croissance ; elle fait partie de notre offre schéma directeur logistique.",
      link: { label: 'Voir l\'offre schéma logistique', to: '/conseil' },
    },
    {
      q: 'Rack ou stockage de masse : que choisir ?',
      a: "Le stockage de masse convient à peu de références en gros volumes, empilables ; il économise l'investissement en racks mais limite l'accès aux palettes. Le rack simple profondeur donne accès à chaque palette, idéal pour beaucoup de références ; la double profondeur gagne de la place au prix d'un accès sélectif réduit.",
    },
    {
      q: 'Combien coûte un entrepôt par mois au Maroc ?',
      a: "Cela dépend de la surface, de la ville, de l'effectif et des engins. Notre simulateur de coût global d'entrepôt l'estime à partir de ces paramètres, avec la répartition entre bâtiment, main-d'œuvre et équipements.",
      link: { label: 'Simulateur de coût global', to: '/outils/cout-global-entrepot' },
    },
    {
      q: 'Mes données saisies sont-elles enregistrées ?',
      a: "Non. Le calcul se fait dans votre navigateur ; les paramètres saisis ne sont ni envoyés ni conservés par Nextinotech. Le simulateur est gratuit et sans inscription.",
    },
  ],

  '/outils/productivite-engins-main-doeuvre': [
    {
      q: 'Comment mesurer la productivité d\'un entrepôt ?',
      a: "Par le nombre d'unités traitées par heure travaillée pour chaque activité : lignes préparées par heure en préparation, palettes par heure en réception ou en expédition. On la compare ensuite à un standard par type d'engin et de tâche pour savoir si l'effectif est sous- ou surdimensionné.",
    },
    {
      q: 'Combien de préparateurs de commandes faut-il pour mon volume ?',
      a: "Divisez le volume quotidien de lignes par la productivité horaire d'un préparateur et par la durée effective du poste. Le simulateur fait ce calcul selon l'engin utilisé (manuel, transpalette électrique, préparateur de commandes, chariot élévateur) et la tâche dominante.",
    },
    {
      q: 'Quelle productivité attendre d\'un cariste ?',
      a: "Elle varie fortement selon la hauteur de stockage, les distances et l'organisation des missions. Le simulateur applique des standards génériques du secteur pour donner un ordre de grandeur ; un chronométrage sur site permet ensuite de fixer vos propres standards.",
    },
    {
      q: 'Comment augmenter la productivité sans recruter ?',
      a: "Les leviers les plus rapides : réimplanter les références à forte rotation près des quais, regrouper les commandes en vagues, réduire les déplacements à vide des engins, et former les opérateurs. Sur une plateforme 3PL de 21 000 m² gérée pour L'Oréal, Nestlé et Mars, ce type de leviers a accompagné une hausse de productivité de 35 %.",
      link: { label: 'Formation Préparateur de Commandes', to: '/formation/preparateur-commandes' },
    },
    {
      q: 'Le simulateur est-il fiable pour budgéter des recrutements ?',
      a: "Il donne une estimation directionnelle, utile pour vérifier un ordre de grandeur. Pour une décision d'effectif ou d'investissement en engins, un audit logistique (60 000 à 90 000 MAD HT, 4 à 6 semaines) mesure la productivité réelle de votre site.",
      link: { label: 'Voir l\'audit logistique', to: '/conseil' },
    },
    {
      q: 'Faut-il une formation CACES pour les caristes au Maroc ?',
      a: "Le CACES est un référentiel français ; au Maroc, beaucoup d'employeurs s'appuient sur ses référentiels pour former et autoriser leurs caristes. Notre formation préparatoire aux référentiels CACES R489 (3 à 5 jours) les forme sur le chariot de votre site, avec une attestation.",
      link: { label: 'Formation CACES cariste', to: '/formation/caces-cariste' },
    },
  ],

  '/outils/cout-global-entrepot': [
    {
      q: 'Quel est le coût d\'un entrepôt au mètre carré au Maroc ?',
      a: "Le loyer varie selon la ville et la zone. Le simulateur distingue trois niveaux — Casablanca, puis l'axe Rabat-Kénitra-Mohammedia, puis Tanger, Marrakech, Agadir, Fès et Meknès — et applique une fourchette par région et ajoute la main-d'œuvre et les engins pour donner le coût mensuel complet.",
    },
    {
      q: 'Quels postes composent le coût global d\'un entrepôt ?',
      a: "Trois grands postes : le bâtiment (loyer ou amortissement, charges), la main-d'œuvre (effectif multiplié par le coût horaire chargé) et les équipements (engins de manutention en achat amorti ou en location). La main-d'œuvre est souvent le premier poste d'un entrepôt de préparation de commandes.",
    },
    {
      q: 'Vaut-il mieux acheter ou louer ses chariots élévateurs ?',
      a: "L'achat coûte en général moins cher sur la durée si l'engin est bien utilisé et entretenu ; la location tout compris (maintenance incluse) sécurise la disponibilité et le budget. Le simulateur compare les deux à partir de coûts mensualisés génériques : 5 000 à 9 000 MAD par mois en achat, 8 000 à 14 000 MAD en location.",
    },
    {
      q: 'Comment réduire le coût de mon entrepôt ?',
      a: "En augmentant le taux d'occupation (réimplantation, hauteur), en réduisant les stocks dormants qui occupent des emplacements, et en améliorant la productivité par ligne traitée. Un audit logistique chiffre ces leviers ; notre offre Stock Quick Win (45 000 à 75 000 MAD HT) cible les stocks dormants.",
      link: { label: 'Voir les offres stocks et logistique', to: '/conseil' },
    },
    {
      q: 'Externaliser à un prestataire 3PL coûte-t-il moins cher ?',
      a: "Pas toujours. Comparez votre coût global par palette stockée et par ligne préparée aux tarifs 3PL, en ajoutant le coût de pilotage du prestataire. Le simulateur donne votre coût actuel ; nous réalisons aussi des études internalisation/externalisation dans le cadre d'un schéma directeur logistique.",
    },
    {
      q: 'Le résultat du simulateur est-il un devis ?',
      a: "Non. C'est une estimation directionnelle fondée sur des catégories de coûts universelles du secteur, sans grille propriétaire. Elle sert à cadrer un budget ou une comparaison ; vos données restent dans votre navigateur.",
    },
  ],

  '/solutions/marquage-et-tracabilite': [
    {
      q: 'Quelle imprimante pour marquer les dates de péremption et les numéros de lot ?',
      a: "Pour le marquage en ligne sur emballages (bouteilles, sachets, cartons), l'imprimante à jet d'encre continu est la solution de référence : elle imprime date, lot et code-barres à haute cadence sans contact. Le choix du modèle dépend de votre cadence, du support et de vos contraintes d'hygiène.",
    },
    {
      q: 'Faut-il marquer les numéros de lot sur ses produits au Maroc ?',
      a: "Dans l'agroalimentaire et la pharmacie, l'étiquetage réglementaire exige l'identification du lot et une date limite de consommation ou de péremption, indispensables pour rappeler un produit. Les exigences de vos clients export (Europe notamment) renforcent souvent ces obligations.",
    },
    {
      q: 'RFID ou code-barres : que choisir ?',
      a: "Le code-barres est peu coûteux et suffit quand les articles sont lus un par un. La RFID lit plusieurs étiquettes à la fois, sans visée directe, ce qui accélère les inventaires et le suivi des palettes, des actifs ou des équipements — au prix d'étiquettes et de lecteurs plus chers.",
    },
    {
      q: 'Fournissez-vous le matériel et l\'installation ?',
      a: "Oui : conseil sur le matériel adapté, fourniture et installation sur site. Décrivez votre site et votre cadence ; le devis est envoyé sous 48 heures.",
      link: { label: 'Demander un devis', to: '/contact' },
    },
    {
      q: 'La traçabilité RFID peut-elle alimenter une control tower ?',
      a: "Oui. Les lectures RFID donnent en temps réel la position et le statut des palettes et des actifs ; reliées à une control tower, elles déclenchent des alertes sur les écarts. C'est l'une des sources IoT de notre offre Nextinotech Digital.",
      link: { label: 'Voir la control tower', to: '/control-tower' },
    },
  ],

  '/solutions/carte-visite-digitale-nfc': [
    {
      q: 'Comment fonctionne une carte de visite NFC ?',
      a: "La carte contient une puce NFC : il suffit de l'approcher d'un smartphone pour ouvrir un profil en ligne avec vos coordonnées, votre LinkedIn, votre site et un lien de prise de rendez-vous. Aucune application n'est nécessaire côté destinataire.",
    },
    {
      q: 'La carte fonctionne-t-elle avec tous les téléphones ?',
      a: "Oui. Les iPhone récents et la plupart des Android lisent le NFC directement ; pour les autres, un QR code imprimé au dos de la carte ouvre le même profil.",
    },
    {
      q: 'Peut-on modifier ses informations sans réimprimer la carte ?',
      a: "Oui. Le contenu du profil se met à jour en ligne : un changement de poste, de numéro ou de lien est visible immédiatement, sur la même carte.",
    },
    {
      q: 'Proposez-vous des cartes pour toute une équipe ?',
      a: "Oui, pour une personne comme pour une équipe commerciale entière, avec une présentation homogène aux couleurs de l'entreprise. Le prix est sur devis, selon le nombre de cartes et la personnalisation.",
      link: { label: 'Nous consulter', to: '/contact' },
    },
  ],

  '/demo/wms': [
    {
      q: 'Qu\'est-ce qu\'un WMS ?',
      a: "Un WMS (Warehouse Management System) est le logiciel qui pilote l'entrepôt : réception, rangement par emplacement, stock en temps réel, préparation de commandes et expédition. Il remplace l'adressage de mémoire et les fichiers Excel par une traçabilité de chaque mouvement.",
    },
    {
      q: 'Combien coûte la mise en place d\'un WMS au Maroc ?',
      a: "L'accompagnement Nextinotech, logiciel sélectionné sans commission, va de 80 000 à 130 000 MAD HT pour un WMS Mini (1 entrepôt, SaaS), de 180 000 à 320 000 MAD HT pour un WMS Pilote (1 à 2 entrepôts, AMOA complète) et à partir de 450 000 MAD HT pour une ETI multi-sites. Selon l'offre retenue, les licences de l'éditeur peuvent s'y ajouter.",
    },
    {
      q: 'Combien de temps dure un projet WMS ?',
      a: "De 6 à 10 semaines pour un WMS SaaS sur un seul entrepôt, 3 à 5 mois pour un projet avec cahier des charges, appel d'offres et conduite du changement, et 6 à 10 mois pour un déploiement multi-sites intégré à l'ERP.",
    },
    {
      q: 'Peut-on tester la démo avec ses propres données ?',
      a: "Oui. Le bouton « Importer mes données » charge vos références et emplacements dans la démo, qui fonctionne dans votre navigateur. Les données fournies par défaut sont fictives.",
    },
    {
      q: 'Quel WMS choisir pour une PME ?',
      a: "Celui qui couvre vos processus réels au moindre coût d'intégration, pas le plus complet. Nous rédigeons le cahier des charges, consultons plusieurs éditeurs et comparons les offres sur votre business case, sans commission d'aucun éditeur.",
      link: { label: 'Formation WMS · TMS · ERP', to: '/formation/wms' },
    },
  ],

  '/demo/tms': [
    {
      q: 'Qu\'est-ce qu\'un TMS ?',
      a: "Un TMS (Transport Management System) planifie et suit le transport : construction des tournées, affectation des véhicules, suivi des livraisons en temps réel et calcul des coûts. Il sert autant à une flotte propre qu'au pilotage de transporteurs sous-traitants.",
    },
    {
      q: 'Combien coûte un TMS au Maroc ?',
      a: "L'accompagnement Nextinotech va de 70 000 à 120 000 MAD HT pour un TMS Mini (moins de 10 véhicules, SaaS léger), de 160 000 à 280 000 MAD HT pour un TMS Pilote (flotte mixte, multi-clients) et à partir de 400 000 MAD HT pour une ETI multi-modes. Selon l'offre retenue, l'abonnement de l'éditeur peut s'y ajouter.",
    },
    {
      q: 'Un TMS réduit-il les coûts de transport ?',
      a: "Oui, par l'optimisation des tournées (moins de kilomètres), un meilleur remplissage des véhicules, moins de retours à vide et le contrôle des factures transporteurs. L'ampleur du gain dépend de votre point de départ, que l'on mesure avant le projet.",
    },
    {
      q: 'Quelle différence entre un TMS et un GPS de suivi de flotte ?',
      a: "Le GPS montre où sont les véhicules. Le TMS planifie ce qu'ils doivent faire, compare le plan à la réalité, alerte sur les retards et calcule le coût de chaque livraison. Relié à une control tower, il devient un outil de pilotage en temps réel.",
      link: { label: 'Voir la control tower', to: '/control-tower' },
    },
    {
      q: 'La démo TMS utilise-t-elle de vraies données ?',
      a: "Non, les tournées et commandes par défaut sont fictives, sur des quartiers de Casablanca. Vous pouvez importer vos propres données ; tout reste dans votre navigateur.",
    },
  ],

  '/demo/aps': [
    {
      q: 'Qu\'est-ce qu\'un APS ?',
      a: "Un APS (Advanced Planning System) est un logiciel de planification avancée : prévision de la demande, calcul des besoins d'approvisionnement, stocks de sécurité et processus S&OP. Il remplace les prévisions sur tableur par des scénarios comparables en temps réel.",
    },
    {
      q: 'Combien coûte un outil de planification de la demande ?',
      a: "L'accompagnement Nextinotech va de 60 000 à 100 000 MAD HT pour un Planning Mini (PME mono-produit, moins de 500 références), de 150 000 à 260 000 MAD HT pour un Planning Pilote (500 à 3 000 références, S&OP complet) et à partir de 380 000 MAD HT pour un Planning Pro en DDMRP multi-sites.",
    },
    {
      q: 'Comment calculer un stock de sécurité ?',
      a: "Il dépend de la variabilité de la demande, du délai fournisseur et du taux de service visé. La démo montre comment un délai plus long ou une demande plus volatile augmente le stock de sécurité recommandé et le risque de rupture.",
    },
    {
      q: 'APS, DDMRP ou S&OP : quelle différence ?',
      a: "Le S&OP est un processus mensuel de décision qui aligne ventes, production et achats. L'APS est l'outil qui calcule les plans. Le DDMRP est une méthode de planification par stocks tampons, adaptée aux demandes volatiles. Ils se combinent.",
      link: { label: 'Formation DDMRP', to: '/formation/ddmrp' },
    },
    {
      q: 'Faut-il un APS pour une PME ?',
      a: "Pas toujours. Sous quelques centaines de références stables, un processus S&OP rigoureux sur tableur suffit souvent. L'APS devient rentable quand le nombre de références, la saisonnalité ou la multiplicité des sites rendent le calcul manuel peu fiable.",
      link: { label: 'Formation S&OP', to: '/formation/sop' },
    },
  ],

  '/ingenierie-formation/catalogue': [
    {
      q: 'À quoi sert ce catalogue de formation par métier ?',
      a: "Il liste, métier par métier, les domaines et thèmes de formation utiles à la supply chain, au transport et à la logistique. Il sert de base au diagnostic des besoins en compétences d'une mission d'ingénierie de formation et au plan de formation financé.",
      link: { label: 'Voir l\'ingénierie de formation', to: '/ingenierie-formation' },
    },
    {
      q: 'Sur quels référentiels le catalogue est-il construit ?',
      a: "Sur des référentiels publics — OFPPT, GIAC — et des référentiels internationaux reconnus : World Economic Forum, LinkedIn, le répertoire ROME de France Travail et la classification européenne ESCO.",
    },
    {
      q: 'Les thèmes du catalogue sont-ils finançables ?',
      a: "Oui, dès lors qu'ils figurent dans un plan de formation. Le Contrat Spécial de Formation de l'OFPPT rembourse jusqu'à 70 % des coûts pédagogiques, dans la limite de la taxe de formation professionnelle versée, et le GIAC de votre secteur peut financer l'ingénierie elle-même.",
    },
    {
      q: 'Peut-on commander une formation directement depuis ce catalogue ?',
      a: "Le catalogue métier sert à construire un plan de formation. Pour une formation prête à l'emploi, avec prix et dates, consultez le catalogue des 30 programmes de Nextinotech Académie.",
      link: { label: 'Catalogue des formations', to: '/formation' },
    },
  ],
}

// Ingénierie de formation : FAQ affichée par la page elle-même
// (src/components/IngenierieFormation.tsx), balisée par routeMeta.ts.
export const INGENIERIE_FAQ: PageFaqItem[] = [
  {
    q: "Qu'est-ce qu'une ingénierie de formation, concrètement ?",
    a: "C'est une méthode structurée qui part des vrais besoins de votre entreprise — stratégie, dysfonctionnements terrain, écarts de compétences — pour construire un plan de formation chiffré et priorisé, plutôt que d'acheter des formations au hasard des catalogues.",
  },
  {
    q: 'Est-ce finançable ?',
    a: "Oui. Au Maroc, une partie du coût peut être pris en charge par le GIAC de votre secteur (GIAC TRANSLOG pour le transport et la logistique, ou l'organisme équivalent de votre branche) et par l'OFPPT via la Taxe de Formation Professionnelle. Nous montons le dossier de prise en charge avec vous.",
  },
  {
    q: 'Combien de temps dure la mission ?',
    a: 'Comptez 6 à 8 semaines pour une entreprise de 50 à 150 collaborateurs, du premier entretien à la remise du rapport final — variable selon le nombre de sites et de départements à couvrir.',
  },
  {
    q: 'Faut-il ensuite passer par Nextinotech pour les formations ?',
    a: "Non. Le plan de formation vous appartient. Vous êtes libre de le déployer avec l'organisme de formation de votre choix. Notre seule obligation contractuelle porte sur le diagnostic et le plan — c'est aussi pour cela que nous ne touchons aucune commission sur les formations recommandées.",
  },
  {
    q: 'Que se passe-t-il si le dossier de financement est refusé ?',
    a: "À ce jour, 100% des dossiers de financement que nous avons accompagnés ont été acceptés — parce que nous vérifions votre éligibilité réelle (adhésion GIAC, situation TFP/CNSS) dès le premier échange, avant tout engagement, et que nous ne montons pas de dossier qui n'a pas de chances raisonnables d'aboutir.",
  },
  {
    q: 'Mes données RH et financières sont-elles protégées ?',
    a: "Oui. Le diagnostic implique des données sensibles (masse salariale, organisation, pyramide des âges). Elles sont traitées de façon confidentielle, conformément à la loi 09-08 sur la protection des données personnelles, et l'accès à votre dossier sur NextiSuivi est réservé à votre équipe et à votre consultant.",
  },
  {
    q: 'Quelle part du coût de la formation peut être remboursée au Maroc ?',
    a: "Deux mécanismes se cumulent. Le GIAC de votre secteur peut prendre en charge jusqu'à 80 % du coût de l'ingénierie de formation quand elle suit un diagnostic (70 % sinon), avec un plafond de 100 000 MAD HT renouvelable chaque année. Le Contrat Spécial de Formation de l'OFPPT rembourse ensuite jusqu'à 70 % des coûts pédagogiques du plan, dans la limite de la taxe de formation professionnelle déclarée.",
  },
  {
    q: "Qu'est-ce que la taxe de formation professionnelle (TFP) ?",
    a: "Chaque entreprise marocaine verse une taxe de formation professionnelle égale à 1,6 % de sa masse salariale, qu'elle forme ses salariés ou non. Un plan de formation déposé dans les règles et dans les délais permet d'en récupérer une partie via le Contrat Spécial de Formation de l'OFPPT ; sans dossier, cette taxe reste une charge sèche.",
  },
  {
    q: "Faut-il avancer tout le coût avant d'être remboursé ?",
    a: "Pas nécessairement. Nextinotech est reconnu tiers payant auprès des organismes financeurs (GIAC, OFPPT) : la part prise en charge peut être réglée directement par l'organisme, sans que vous avanciez l'intégralité de la facture en attendant le remboursement.",
  },
  {
    q: 'Quel GIAC pour une entreprise de transport ou de logistique ?',
    a: "Le GIAC TRANSLOG couvre le transport et la logistique. Les autres branches ont leur propre GIAC sectoriel. L'adhésion au GIAC de votre branche conditionne la prise en charge de l'ingénierie : nous la vérifions dès le premier échange, avant tout engagement.",
  },
]
