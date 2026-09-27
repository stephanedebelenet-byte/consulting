// Données des pages « Formation Logistique & Supply Chain à <Ville> ».
// Une entrée = une page à /formation-logistique-<slug>.
// Le contenu est volontairement différencié par ville (contexte économique,
// secteurs, programmes recommandés) pour éviter les pages « doorway ».

export interface ProgrammeReco {
  titre: string
  pourquoi: string
}

export interface VilleFormation {
  slug: string
  nom: string
  region: string
  heroTitre: string
  heroItalic: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
  intro: string
  secteurs: string[]
  programmes: ProgrammeReco[]
  formats: string
  blog: { label: string; post: string }
  faq: { q: string; a: string }[]
}

export const VILLES: VilleFormation[] = [
  {
    slug: 'casablanca',
    nom: 'Casablanca',
    region: 'Casablanca-Settat',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Casablanca.',
    heroSubtitle:
      "Premier pôle économique du Maroc, Casablanca concentre le port, les grandes zones industrielles et les sièges de la distribution et de l'industrie. Nos sessions inter-entreprise s'y tiennent en présentiel, en hôtel 5★.",
    metaTitle: 'Formation Logistique & Supply Chain à Casablanca | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Casablanca : responsable logistique, WMS/TMS, achats, DDMRP. Sessions présentiel hôtel 5★ + intra-entreprise. Financement CSF/GIAC.",
    intro:
      "Casablanca est le premier bassin d'emploi supply chain du pays : port de Casablanca, zones industrielles d'Aïn Sebaâ, Sidi Bernoussi et Bouskoura, plateformes des grands distributeurs et des industriels FMCG. La demande porte sur des profils capables de piloter un entrepôt, structurer une politique de stocks et professionnaliser les achats. C'est à Casablanca que nous organisons l'essentiel de nos sessions inter-entreprise en présentiel.",
    secteurs: [
      'Grande distribution & FMCG',
      'Industrie & agroalimentaire',
      'Import-export & transit portuaire',
      'Prestataires logistiques (3PL)',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: 'Le programme phare, en présentiel à Casablanca — structurer son pilotage en une journée.' },
      { titre: 'WMS · TMS · ERP — Maîtriser les Outils', pourquoi: 'Pour les entrepôts et plateformes de distribution qui déploient ou exploitent un système.' },
      { titre: 'Techniques de Négociation Achats & Supply Chain', pourquoi: 'Pour les fonctions achats des industriels et distributeurs de la région.' },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca (hôtel 5★, 8 à 16 participants). Format intra-entreprise dans vos locaux pour 5 participants ou plus, avec cas pratique adapté à votre activité.",
    blog: { label: 'Conseil & supply chain à Casablanca', post: 'conseil-supply-chain-a-casablanca-expert-logistique-maroc' },
    faq: [
      {
        q: 'Où se déroulent les formations à Casablanca ?',
        a: "Les sessions inter-entreprise se tiennent dans une salle équipée d'un hôtel 5 étoiles à Casablanca, précisé à l'inscription. Déjeuner et pauses inclus.",
      },
      {
        q: 'Proposez-vous des formations intra-entreprise à Casablanca ?',
        a: "Oui. Pour 5 participants ou plus d'une même entreprise, nous intervenons dans vos locaux à Casablanca, avec un contenu adapté à votre secteur (distribution, industrie, 3PL).",
      },
      {
        q: "Combien coûte une formation logistique à Casablanca ?",
        a: "La formation « Devenir Responsable Logistique » coûte 1 500 MAD TTC par participant, tout inclus, en hôtel 5 étoiles à Casablanca. Les autres sessions inter-entreprise vont de 1 800 à 9 500 MAD TTC par participant selon la durée. En intra-entreprise, comptez de 12 000 à 48 000 MAD HT par groupe selon le programme.",
      },
      {
        q: "Quelle formation choisir pour un entrepôt ou une plateforme de distribution à Casablanca ?",
        a: "Pour le responsable du site, « Devenir Responsable Logistique » (1 jour) ; pour l'équipe qui exploite un WMS ou un TMS, « WMS · TMS · ERP — Maîtriser les Outils » (2 jours en intra) ; pour les opérateurs, la formation Préparateur de Commandes. Les zones d'Aïn Sebaâ, Sidi Bernoussi et Bouskoura sont couvertes en intra.",
      },
      {
        q: "Proposez-vous aussi du conseil supply chain à Casablanca ?",
        a: "Oui. Le cabinet est installé au Technopark de Casablanca : diagnostic supply chain dès 35 000 MAD HT, projets stocks, achats et schéma logistique, direction supply chain à temps partagé. La formation peut compléter une mission de conseil pour ancrer les nouvelles méthodes.",
      },
      {
        q: "Comment faire financer une formation à Casablanca ?",
        a: "Par le Contrat Spécial de Formation de l'OFPPT (jusqu'à 70 % des coûts pédagogiques, dans la limite de la taxe de formation professionnelle versée) ou par le GIAC de votre secteur. Une convention de formation est remise à l'inscription et nous accompagnons la DRH dans le montage du dossier.",
      },
    ],
  },
  {
    slug: 'rabat',
    nom: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Rabat & Kénitra.',
    heroSubtitle:
      "Capitale administrative, la région Rabat-Salé-Kénitra abrite aussi l'Atlantic Free Zone de Kénitra et la plaine agro-industrielle du Gharb — deux moteurs de demande en planification et en achats.",
    metaTitle: 'Formation Logistique & Supply Chain à Rabat-Kénitra | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Rabat et Kénitra : responsable logistique, S&OP, DDMRP, achats. Présentiel Casablanca + intra-entreprise sur site. Financement CSF/GIAC.",
    intro:
      "La région Rabat-Salé-Kénitra combine une forte fonction publique et administrative avec un tissu industriel en croissance rapide : l'Atlantic Free Zone de Kénitra concentre Stellantis et ses équipementiers automobiles, tandis que la plaine du Gharb structure une filière agro-industrielle exportatrice. Les besoins de formation portent sur la planification cadencée, la gestion des flux fournisseurs et la structuration des achats.",
    secteurs: [
      'Automobile (Atlantic Free Zone, Kénitra)',
      'Agro-industrie & export (Gharb)',
      'Administration & institutionnels',
      'Distribution régionale',
    ],
    programmes: [
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Pour les équipementiers automobiles de Kénitra qui pilotent en flux tendu." },
      { titre: 'S&OP & Planification Avancée', pourquoi: "Pour aligner ventes, production et approvisionnements dans l'agro-industrie du Gharb." },
      { titre: 'Devenir Responsable Logistique', pourquoi: "Le socle de pilotage, en présentiel à Casablanca ou en intra sur site." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca (1h en train de Rabat). Format intra-entreprise dans vos locaux à Rabat, Salé ou Kénitra pour 5 participants ou plus.",
    blog: { label: 'Formation supply chain à Rabat', post: 'formation-supply-chain-a-rabat-expert-logistique-maroc' },
    faq: [
      {
        q: 'Les formations ont-elles lieu à Rabat ?',
        a: "Les sessions inter-entreprise se tiennent à Casablanca, à environ 1h de Rabat en train. Pour un groupe de 5 personnes ou plus, nous organisons la formation en intra-entreprise directement à Rabat, Salé ou Kénitra.",
      },
      {
        q: 'Avez-vous une offre pour les équipementiers automobiles de Kénitra ?',
        a: "Oui. Les programmes DDMRP et S&OP sont adaptés au pilotage cadencé et aux exigences des donneurs d'ordre. Le contenu intra est ajusté à votre plan de production et à vos flux EDI.",
      },
      {
        q: "Combien coûte une formation supply chain pour une entreprise de Rabat ou Kénitra ?",
        a: "En inter-entreprise à Casablanca : 1 500 MAD TTC pour « Devenir Responsable Logistique », 5 500 MAD TTC pour le DDMRP Practitioner. En intra-entreprise à Rabat, Salé ou Kénitra : le S&OP & Planification Avancée coûte de 28 000 à 42 000 MAD HT par groupe.",
      },
      {
        q: "Quelle formation pour un équipementier de l'Atlantic Free Zone ?",
        a: "Le DDMRP Practitioner pour piloter les approvisionnements en flux tendu, et le S&OP pour aligner programme client, production et achats. Pour les ateliers, le Lean Management & 5S cible la performance attendue par les donneurs d'ordre automobiles.",
      },
      {
        q: "Formez-vous les administrations et établissements publics de Rabat ?",
        a: "Oui, en intra-entreprise : fondamentaux supply chain, achats et gestion des stocks, adaptés aux procédures d'achat public. Le contenu est bâti sur vos processus réels (marchés, magasins, inventaires).",
      },
      {
        q: "Les entreprises agro-industrielles du Gharb sont-elles concernées ?",
        a: "Oui. Le S&OP aide à arbitrer entre récolte, capacité de transformation et commandes export ; la gestion des stocks et la planification sont adaptées à la saisonnalité de la filière. Formation organisée sur site pour 5 participants ou plus.",
      },
    ],
  },
  {
    slug: 'tanger',
    nom: 'Tanger',
    region: 'Tanger-Tétouan-Al Hoceïma',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Tanger.',
    heroSubtitle:
      "Tanger Med, premier port à conteneurs d'Afrique, et les zones franches (TFZ, Tanger Automotive City) font de Tanger l'un des écosystèmes logistiques et industriels les plus denses du continent.",
    metaTitle: 'Formation Logistique & Supply Chain à Tanger | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Tanger : responsable logistique, DDMRP, WMS/TMS, Lean. Écosystème Tanger Med et automobile. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "Tanger est un hub logistique de rang mondial : Tanger Med traite plusieurs millions de conteneurs par an, les zones franches accueillent Renault et un large tissu d'équipementiers, et le textile y reste très présent. Les entreprises recherchent des profils capables de tenir des standards automobiles (qualité, cadence, traçabilité) et d'exploiter des plateformes logistiques de grande taille.",
    secteurs: [
      'Automobile (Renault, TAC, équipementiers)',
      'Logistique portuaire & transit (Tanger Med)',
      'Zones franches & industrie exportatrice',
      'Textile & habillement',
    ],
    programmes: [
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Standard de planification dans l'écosystème automobile de la région." },
      { titre: 'WMS · TMS · ERP — Maîtriser les Outils', pourquoi: "Pour les plateformes logistiques et 3PL adossés à Tanger Med." },
      { titre: 'Lean Management & 5S', pourquoi: "Pour les usines et entrepôts qui visent les standards de performance automobile." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Tanger, en zone franche ou à Tétouan pour 5 participants ou plus.",
    blog: { label: 'Formation logistique Tanger & Kénitra', post: 'formation-logistique-a-tanger-et-kenitra-hub-automobile-et' },
    faq: [
      {
        q: 'Organisez-vous des formations en zone franche à Tanger ?',
        a: "Oui, en format intra-entreprise. Nous intervenons dans vos locaux en TFZ, Tanger Automotive City ou sur la zone de Tanger Med, avec un cas pratique bâti sur vos flux réels.",
      },
      {
        q: 'Le contenu est-il adapté aux exigences automobiles ?',
        a: "Oui. Les modules DDMRP, Lean et pilotage de la performance intègrent les standards de qualité et de cadence attendus par les constructeurs et leurs donneurs d'ordre.",
      },
      {
        q: "Combien coûte une formation logistique pour une entreprise de Tanger ?",
        a: "En inter-entreprise à Casablanca : 1 500 MAD TTC pour « Devenir Responsable Logistique », 5 500 MAD TTC pour le DDMRP Practitioner. En intra-entreprise à Tanger : le Lean Management & 5S coûte de 18 000 à 28 000 MAD HT par groupe, la formation WMS · TMS · ERP de 32 000 à 48 000 MAD HT.",
      },
      {
        q: "Quelle formation pour une plateforme logistique ou un transitaire de Tanger Med ?",
        a: "La formation WMS · TMS · ERP pour exploiter les systèmes de la plateforme, la formation Douane & Logistique Internationale (2 jours, 3 200 MAD TTC) pour le transit et les incoterms, et « Devenir Responsable Logistique » pour l'encadrement.",
      },
      {
        q: "Avez-vous l'expérience de l'écosystème automobile de Tanger ?",
        a: "Oui. Le fondateur de Nextinotech a conçu la logistique greenfield du site industriel Renault-Nissan de Tanger — logistique amont, flux d'assemblage, standards du groupe. Les cas pratiques des formations intra s'appuient sur ce type de flux.",
      },
      {
        q: "Accompagnez-vous le statut OEA pour les entreprises de la zone franche ?",
        a: "Oui. Les entreprises exportatrices de Tanger, souvent sous régime suspensif, ont intérêt au statut d'Opérateur Économique Agréé de l'ADII. Nous les accompagnons du diagnostic d'éligibilité jusqu'à l'audit de l'ADII, en 8 à 15 mois.",
      },
    ],
  },
  {
    slug: 'marrakech',
    nom: 'Marrakech',
    region: 'Marrakech-Safi',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Marrakech.',
    heroSubtitle:
      "Tourisme, hôtellerie, agroalimentaire et distribution régionale : Marrakech a des besoins logistiques marqués par la saisonnalité et l'approvisionnement de haute saison.",
    metaTitle: 'Formation Logistique & Supply Chain à Marrakech | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Marrakech : responsable logistique, fondamentaux, préparation de commandes. Présentiel + intra-entreprise. Financement CSF/GIAC.",
    intro:
      "L'économie de Marrakech est portée par le tourisme et l'hôtellerie, avec un enjeu fort d'approvisionnement sans rupture en haute saison, une agro-industrie active dans la région et une distribution régionale à structurer. Les besoins de formation vont des fondamentaux supply chain pour des équipes non spécialistes jusqu'au pilotage d'entrepôt et à la préparation de commandes.",
    secteurs: [
      'Tourisme & hôtellerie (approvisionnement haute saison)',
      'Agroalimentaire & terroir',
      'Distribution régionale',
      'Événementiel & logistique de service',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: "Pour structurer le pilotage d'un site ou d'un groupe hôtelier." },
      { titre: 'Supply Chain Fondamentaux', pourquoi: "Pour donner des bases communes à des équipes non spécialistes (achats, F&B, exploitation)." },
      { titre: 'Formation Préparateur de Commandes', pourquoi: "Pour fiabiliser la préparation et la manutention dans les entrepôts de la région." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Marrakech pour 5 participants ou plus, avec cas pratique adapté (hôtellerie, distribution, agro).",
    blog: { label: 'Formation logistique à Marrakech', post: 'formation-logistique-a-marrakech-opportunites-et-programme' },
    faq: [
      {
        q: 'Formez-vous les équipes hôtelières à Marrakech ?',
        a: "Oui, en intra-entreprise. Les fondamentaux supply chain et la gestion des stocks sont adaptés au contexte hôtelier : achats F&B, économat, saisonnalité, pilotage des ruptures en haute saison.",
      },
      {
        q: 'Faut-il se déplacer à Casablanca ?',
        a: "Pour les sessions inter-entreprise, oui. Pour un groupe de 5 personnes ou plus, nous venons animer la formation directement à Marrakech.",
      },
      {
        q: "Combien coûte une formation logistique pour une entreprise de Marrakech ?",
        a: "En intra-entreprise à Marrakech : Supply Chain Fondamentaux de 18 000 à 28 000 MAD HT par groupe, Préparateur de Commandes de 20 000 à 30 000 MAD HT. En inter-entreprise à Casablanca, « Devenir Responsable Logistique » coûte 1 500 MAD TTC par participant.",
      },
      {
        q: "Comment éviter les ruptures d'approvisionnement en haute saison touristique ?",
        a: "En anticipant : prévision de la demande par saison et par établissement, stocks de sécurité recalculés avant les pics, et contrats fournisseurs avec capacités garanties. Ces méthodes sont au cœur des formations Fondamentaux et S&OP, adaptées au contexte hôtelier.",
      },
      {
        q: "Quelle formation pour les équipes F&B et économat d'un hôtel ?",
        a: "Supply Chain Fondamentaux, en intra : gestion des stocks (ABC, couverture, point de commande), achats et évaluation des fournisseurs, indicateurs. Le contenu est bâti sur vos références et vos saisons, pour des équipes qui ne sont pas des logisticiens de métier.",
      },
      {
        q: "Intervenez-vous aussi en conseil logistique à Marrakech ?",
        a: "Oui, sur site : diagnostic supply chain, politique de stocks, organisation d'un entrepôt ou d'une plateforme de distribution régionale. Le premier échange de cadrage est gratuit.",
      },
    ],
  },
  {
    slug: 'agadir',
    nom: 'Agadir',
    region: 'Souss-Massa',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Agadir.',
    heroSubtitle:
      "Premier port de pêche du Maroc, capitale des primeurs et des agrumes d'export : la région Souss-Massa vit au rythme de la chaîne du froid et des fenêtres d'export européennes.",
    metaTitle: 'Formation Logistique & Supply Chain à Agadir | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Agadir : responsable logistique, S&OP, DDMRP, chaîne du froid. Souss-Massa, export et pêche. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "La région Souss-Massa est un pôle d'export agricole majeur : agrumes, primeurs et produits de la mer transitent par le port et l'aéroport d'Agadir vers l'Europe, sous forte contrainte de chaîne du froid et de calendrier. Les entreprises cherchent des profils capables de planifier une offre incertaine (récolte, météo) face à une demande à fenêtres étroites, et de sécuriser la qualité tout au long du flux.",
    secteurs: [
      'Agrumes & primeurs à l’export (Souss-Massa)',
      'Pêche & produits de la mer',
      'Chaîne du froid & conditionnement',
      'Transport frigorifique & transit',
    ],
    programmes: [
      { titre: 'S&OP & Planification Avancée', pourquoi: "Pour arbitrer entre disponibilité récolte et programmes clients européens." },
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Pour dimensionner les stocks tampons sous forte volatilité." },
      { titre: 'Devenir Responsable Logistique', pourquoi: "Le socle de pilotage pour les stations de conditionnement et exportateurs." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Agadir ou dans la zone d'Aït Melloul pour 5 participants ou plus.",
    blog: { label: 'Formation logistique à Agadir', post: 'formation-logistique-a-agadir-supply-chain-export-et-region' },
    faq: [
      {
        q: 'Le contenu couvre-t-il la chaîne du froid et l’export ?',
        a: "Oui. Les modules planification et gestion des stocks sont adaptés aux filières d'export du Souss-Massa : saisonnalité, fenêtres d'expédition, exigences des distributeurs européens, transport frigorifique.",
      },
      {
        q: 'Venez-vous former à Agadir ?',
        a: "En intra-entreprise, oui — dans vos locaux à Agadir ou à Aït Melloul. Les sessions inter-entreprise restent à Casablanca.",
      },
      {
        q: "Combien coûte une formation logistique pour une entreprise d'Agadir ?",
        a: "En intra-entreprise à Agadir ou Aït Melloul : le S&OP & Planification Avancée coûte de 28 000 à 42 000 MAD HT par groupe. En inter-entreprise à Casablanca : 1 500 MAD TTC pour « Devenir Responsable Logistique », 5 500 MAD TTC pour le DDMRP Practitioner.",
      },
      {
        q: "Quelle formation pour une station de conditionnement d'agrumes ou de primeurs ?",
        a: "Le S&OP pour arbitrer entre disponibilité de la récolte et programmes des clients européens, le DDMRP pour dimensionner les stocks d'emballages et d'intrants face à la volatilité, et « Devenir Responsable Logistique » pour l'encadrement du site.",
      },
      {
        q: "Les formations couvrent-elles la logistique des produits de la mer ?",
        a: "Oui, en intra-entreprise : chaîne du froid, traçabilité des lots, rotation des stocks et coordination avec le transport frigorifique. Les cas pratiques sont bâtis sur vos flux, du débarquement à l'expédition.",
      },
      {
        q: "Faut-il marquer les lots et dates sur les produits exportés depuis Agadir ?",
        a: "Oui : l'agroalimentaire exige l'identification du lot et une date limite pour permettre le rappel de produits, et les distributeurs européens l'imposent. Nous conseillons et installons des imprimantes de codage industriel adaptées à votre cadence.",
      },
    ],
  },
  {
    slug: 'fes',
    nom: 'Fès',
    region: 'Fès-Meknès',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Fès & Meknès.',
    heroSubtitle:
      "Pôle agro-industriel autour de Meknès, industrie et artisanat à Fès, position de carrefour au centre du pays : la région Fès-Meknès a des besoins logistiques concrets et sous-outillés.",
    metaTitle: 'Formation Logistique & Supply Chain à Fès-Meknès | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Fès et Meknès : responsable logistique, Lean, fondamentaux. Agro-industrie et industrie. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "La région Fès-Meknès associe un pôle agro-industriel structuré autour de Meknès (Agropolis), une industrie et un artisanat encore largement pilotés à la main à Fès, et une position de carrefour logistique au centre du Maroc. Les besoins de formation sont d'abord ceux des fondamentaux : structurer un entrepôt, fiabiliser les stocks, éliminer les gaspillages.",
    secteurs: [
      'Agro-industrie (Agropolis Meknès)',
      'Industrie & sous-traitance',
      'Artisanat & terroir',
      'Distribution & plateformes centre-Maroc',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: "Pour structurer le pilotage d'un site agro-industriel ou d'une PME industrielle." },
      { titre: 'Lean Management & 5S', pourquoi: "Pour éliminer les gaspillages dans des ateliers et entrepôts peu structurés." },
      { titre: 'Supply Chain Fondamentaux', pourquoi: "Pour aligner des équipes non spécialistes sur un langage commun." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Fès ou Meknès pour 5 participants ou plus.",
    blog: { label: 'Conseil & supply chain à Fès-Meknès', post: 'conseil-supply-chain-fesmeknes-expert-logistique-centre' },
    faq: [
      {
        q: 'Intervenez-vous à Fès et à Meknès ?',
        a: "Oui, en intra-entreprise, dans vos locaux à Fès, Meknès ou sur la zone d'Agropolis. Les sessions inter-entreprise ont lieu à Casablanca.",
      },
      {
        q: 'Par quel programme commencer pour un site peu structuré ?',
        a: "« Devenir Responsable Logistique » pour le pilotage d'ensemble, puis « Lean Management & 5S » pour l'organisation du terrain. Les deux se complètent bien sur un site en cours de structuration.",
      },
      {
        q: "Combien coûte une formation logistique à Fès ou Meknès ?",
        a: "En intra-entreprise dans vos locaux : Lean Management & 5S et Supply Chain Fondamentaux de 18 000 à 28 000 MAD HT par groupe. En inter-entreprise à Casablanca, « Devenir Responsable Logistique » coûte 1 500 MAD TTC par participant, tout inclus.",
      },
      {
        q: "Quelle formation pour une entreprise agro-industrielle d'Agropolis ?",
        a: "Supply Chain Fondamentaux pour donner un langage commun aux équipes, puis le Lean Management & 5S pour organiser les ateliers et entrepôts. Si la production suit une saisonnalité forte, le S&OP aide à planifier récolte, transformation et ventes.",
      },
      {
        q: "Comment structurer un entrepôt encore géré à la main ?",
        a: "En trois étapes : adressage des emplacements et règles de rangement, fiabilisation du stock par des inventaires tournants, puis indicateurs simples (taux de service, écarts de stock). « Devenir Responsable Logistique » donne la méthode ; un WMS ne vient qu'ensuite.",
      },
      {
        q: "La formation est-elle finançable pour une PME de Fès-Meknès ?",
        a: "Oui, comme partout au Maroc : Contrat Spécial de Formation de l'OFPPT (jusqu'à 70 % des coûts pédagogiques, dans la limite de la taxe de formation professionnelle versée) ou GIAC de votre secteur. Une convention est remise à l'inscription.",
      },
    ],
  },
]

export function findVille(slug: string | undefined): VilleFormation | undefined {
  return VILLES.find((v) => v.slug === slug)
}

export function buildVilleSchema(v: VilleFormation) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Nextinotech Académie', item: 'https://nextinotech.com/formation' },
          { '@type': 'ListItem', position: 3, name: `Formation logistique à ${v.nom}`, item: `https://nextinotech.com/formation-logistique-${v.slug}` },
        ],
      },
      {
        '@type': 'Course',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#course`,
        name: `Formation Logistique & Supply Chain à ${v.nom}`,
        description: v.metaDescription,
        provider: { '@id': 'https://nextinotech.com/#academie' },
        inLanguage: 'fr',
        educationalCredentialAwarded: 'Attestation de formation Nextinotech',
        areaServed: { '@type': 'City', name: v.nom },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          location: {
            '@type': 'Place',
            name: `${v.nom}, Maroc`,
            address: { '@type': 'PostalAddress', addressLocality: v.nom, addressRegion: v.region, addressCountry: 'MA' },
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#faq`,
        mainEntity: v.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}
