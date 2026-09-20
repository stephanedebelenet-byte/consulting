// Source unique des méta-données par route, consommée par le plugin de prérendu
// (vite.config.ts) pour injecter <title>, meta description, canonical, OG et
// JSON-LD dans un fichier HTML statique par page — et pour générer le sitemap
// (voir generateSitemapXML dans vite.config.ts). Module pur (aucun React).
//
// `isOffer` marque une page qui vend un service réel (à distinguer des pages
// utilitaires/légales) : le script scripts/check-seo-consistency.mjs vérifie
// qu'elle est bien référencée par son URL dans public/llms.txt et
// public/llms-full.txt, pour qu'aucune offre ne soit oubliée de ces fichiers.
// `hidden` marque une page volontairement absente de la navigation et des
// fichiers llms.txt (voir audit UI/UX — vente indirecte par le contenu) :
// le contrôle de complétude l'ignore sciemment au lieu de la signaler.

import { VILLES, buildVilleSchema } from './villesFormation'
import { PROGRAMMES, buildProgrammeSchema, programmesSchema, rlCourseSchema, importCourseSchema, catalogueMeta } from './formations'

export interface PrerenderRoute {
  path: string
  title: string
  description: string
  jsonLd?: unknown[]
  /** Sitemap : 0 à 1, défaut 0.6 si omis. */
  priority?: number
  /** Sitemap : défaut 'monthly' si omis. */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  /** Sitemap : date ISO (YYYY-MM-DD). Défaut = date du build si omis. */
  lastmod?: string
  /** Page vendant un service réel — doit être référencée dans llms.txt/llms-full.txt. */
  isOffer?: boolean
  /** Page volontairement hors navigation et hors llms.txt — exclue du contrôle isOffer. */
  hidden?: boolean
}

const SUFFIX = ' | Nextinotech'

const STATIC: PrerenderRoute[] = [
  {
    path: '/',
    title: 'Nextinotech — Conseil & Formation Supply Chain, Logistique et Achats au Maroc',
    description:
      "Cabinet indépendant de conseil et de formation en Supply Chain, Logistique et Achats au Maroc. Diagnostic, optimisation des stocks (DDMRP), schéma logistique, AMOA WMS/TMS, 28 formations. 20+ ans de terrain.",
    priority: 1.0,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/conseil',
    title: 'Conseil Supply Chain au Maroc — Diagnostic, Stocks, Achats, Schéma Logistique' + SUFFIX,
    description:
      "Conseil Supply Chain et Logistique pour PME et ETI marocaines : diagnostic, optimisation des stocks et DDMRP, performance achats, schéma logistique, cahiers des charges, IA & automatisation, AMOA.",
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-08-31',
    isOffer: true,
  },
  {
    path: '/prestations',
    title: 'Prestations Logistiques Opérationnelles au Maroc' + SUFFIX,
    description:
      "Pack Inventaire (entreprises et experts comptables — certification d'inventaire de fin d'exercice), services logistiques à valeur ajoutée (co-packing, fardelage, étiquetage, kitting, contrôle qualité, palettisation). Prestations opérationnelles pour entrepôts au Maroc.",
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
    isOffer: true,
  },
  {
    path: '/references',
    title: 'Références & Missions — Renault, L’Oréal, Nestlé, OCP, DHL' + SUFFIX,
    description:
      "Plus de 110 missions de conseil et de formation Supply Chain au Maroc : Renault-Nissan, L’Oréal, Nestlé, Groupe Addoha, OCP, DHL, Huawei, J&J, P&G.",
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
  },
  {
    path: '/a-propos',
    title: 'À propos — Cabinet Supply Chain Indépendant au Maroc' + SUFFIX,
    description:
      "Nextinotech, cabinet indépendant de conseil et d’AMOA en Supply Chain dédié aux PME et ETI marocaines. 20+ ans d’expérience terrain, équipe certifiée DDMRP.",
    priority: 0.75,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
  },
  {
    path: '/blog',
    title: 'Blog Supply Chain, Logistique & Achats au Maroc' + SUFFIX,
    description:
      "Plus de 300 articles sur la Supply Chain, la Logistique et les Achats au Maroc : formation, métiers et salaires, méthodes (DDMRP, S&OP, Lean), douane, IA, e-commerce, secteurs.",
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-08-21',
  },
  {
    path: '/contact',
    title: 'Contact — Cabinet Conseil & Formation Supply Chain, Casablanca' + SUFFIX,
    description:
      "Contactez Nextinotech pour un diagnostic Supply Chain, une mission de conseil ou une formation. Échange sous 24h. Casablanca, Maroc — contact@nextinotech.com.",
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/carriere',
    title: 'Carrière en Supply Chain au Maroc — Métiers, Compétences, Évolution' + SUFFIX,
    description:
      "Construire sa carrière en Supply Chain, Logistique et Achats au Maroc : cartographie des métiers, compétences recherchées, salaires, plan de développement et formations.",
    priority: 0.75,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
  },
  {
    path: '/faq',
    title: 'FAQ — Conseil & Formation Supply Chain au Maroc' + SUFFIX,
    description:
      "Réponses aux questions fréquentes sur le conseil Supply Chain, les formations, les tarifs, le financement (CSF / GIAC), les délais et les résultats attendus.",
    priority: 0.75,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
  },
  {
    path: '/confidentialite',
    title: 'Politique de Confidentialité' + SUFFIX,
    description:
      "Données collectées par le site Nextinotech, finalités, cookies, sous-traitants et vos droits au titre de la loi 09-08.",
    priority: 0.2,
    changefreq: 'yearly',
    lastmod: '2026-09-02',
  },
  {
    path: '/formation',
    title: catalogueMeta.title,
    description: catalogueMeta.description,
    jsonLd: [programmesSchema],
    priority: 0.95,
    changefreq: 'weekly',
    lastmod: '2026-08-06',
    isOffer: true,
  },
  {
    path: '/formation-rl',
    title: 'Formation Responsable Logistique — Casablanca' + SUFFIX,
    description:
      "Formation Responsable Logistique de référence au Maroc : 1 journée intensive à Casablanca, 1 500 MAD tout inclus. Fondamentaux, stocks, transport, KPI, WMS/TMS. Financement CSF / GIAC.",
    jsonLd: [rlCourseSchema],
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-08-31',
    isOffer: true,
  },
  {
    path: '/formation-import',
    title: 'Formation Réussir sa Première Importation' + SUFFIX,
    description:
      "Formation import 1 jour à Casablanca pour porteurs de projet : prix de revient, fournisseurs, transport, douane, nomenclature, stockage. 1 500 MAD tout inclus.",
    jsonLd: [importCourseSchema],
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-09-08',
    isOffer: true,
  },
  {
    path: '/directeur-logistique-mi-temps',
    title: 'Directeur Logistique à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Direction opérationnelle de vos entrepôts, transport et flux physiques à temps partagé. Mandat 180k-550k MAD, opérationnel en 2 semaines. PME & ETI Maroc.",
    priority: 0.75,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
    isOffer: true,
  },
  {
    path: '/directeur-achats-mi-temps',
    title: 'Directeur Achats à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Sourcing, négociation fournisseurs et réduction des coûts d'achat à temps partagé. 11% d'économies chez Addoha. Mandat 180k-550k MAD, PME & ETI Maroc.",
    priority: 0.75,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
    isOffer: true,
  },
  {
    path: '/direction-supply-chain-temps-partage',
    title: 'Direction Supply Chain à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Direction supply chain à temps partagé pour PME et ETI marocaines. Mandat en 3 phases, 180k-550k MAD, opérationnel en 2 semaines — sans recrutement CDI.",
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
    isOffer: true,
  },
  {
    path: '/dsc-vs-recrutement-cdi',
    title: 'DSC en CDI ou Mandat à Temps Partagé ? Le Comparatif Complet' + SUFFIX,
    description:
      "Coût réel, délai de démarrage, engagement, résultat en sortie : le comparatif chiffré entre recruter un Directeur Supply Chain en CDI et un mandat à temps partagé.",
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-08-24',
    isOffer: true,
  },
  {
    path: '/accompagnement-oea',
    title: 'Accompagnement Statut OEA (Opérateur Économique Agréé) au Maroc' + SUFFIX,
    description:
      "Cabinet d'accompagnement pour l'obtention du statut OEA — Simplifications Douanières — auprès de l'ADII. Diagnostic, mise en conformité, dossier de candidature, audit à blanc, coaching le jour de l'audit.",
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-09-17',
    isOffer: true,
  },
  {
    path: '/outils/dimensionnement-entrepot',
    title: 'Simulateur de Dimensionnement d’Entrepôt' + SUFFIX,
    description:
      "Estimez la surface, le nombre d’emplacements et les allées de votre futur entrepôt à partir de vos volumes. Outil gratuit Nextinotech.",
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/outils/productivite-engins-main-doeuvre',
    title: 'Simulateur de Productivité — Engins & Main-d’œuvre Entrepôt' + SUFFIX,
    description:
      "Calculez le nombre d’engins de manutention et de préparateurs nécessaires selon votre activité entrepôt. Outil gratuit Nextinotech.",
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/outils/cout-global-entrepot',
    title: 'Simulateur de Coût Global d’Entrepôt' + SUFFIX,
    description:
      "Estimez le coût complet d’exploitation d’un entrepôt : loyer, main-d’œuvre, engins, énergie, système. Outil gratuit Nextinotech.",
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/evenements/transformation-supply-chain-en-90-jours',
    title: 'Webinaire Gratuit — Transformation Supply Chain en 90 Jours' + SUFFIX,
    description:
      'Webinaire gratuit 45 min : transformation supply chain réaliste en 90 jours, roadmap détaillée, risques mitigés, ROI calculé. Inscription gratuite.',
    priority: 0.8,
    changefreq: 'yearly',
    lastmod: '2026-06-21',
  },
  {
    // Page discrète : accessible par lien direct (articles de blog), pas de
    // navigation principale, pas de mention dans llms.txt — voir audit UI/UX.
    path: '/solutions/marquage-et-tracabilite',
    title: 'Marquage Industriel & Traçabilité RFID au Maroc' + SUFFIX,
    description:
      'Conseil, fourniture et intégration de solutions de marquage industriel et de traçabilité RFID pour entrepôts et sites de production au Maroc.',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2026-09-20',
    isOffer: true,
    hidden: true,
  },
  {
    // Idem : page discrète, hors navigation et hors llms.txt.
    path: '/solutions/carte-visite-digitale-nfc',
    title: 'Carte de Visite Digitale NFC au Maroc' + SUFFIX,
    description:
      'Carte de visite digitale NFC avec QR code de secours : partagez vos coordonnées et votre profil professionnel en un tap.',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2026-09-20',
    isOffer: true,
    hidden: true,
  },
  {
    path: '/evenements/formation-ou-consulting-quelle-approche',
    title: 'Webinaire Gratuit — Formation ou Consulting, Quelle Approche ?' + SUFFIX,
    description:
      'Webinaire gratuit 50 min : formation seule, consulting ou approche hybride. Guide de décision, comparaison ROI, cas réels.',
    priority: 0.8,
    changefreq: 'yearly',
    lastmod: '2026-06-21',
  },
  {
    path: '/ingenierie-formation',
    title: 'Ingénierie de Formation au Maroc — Diagnostic & Plan de Formation' + SUFFIX,
    description:
      "Diagnostic des besoins en compétences, plan de formation chiffré et dossier de financement GIAC/OFPPT pour les entreprises de la Supply Chain, du transport et de la logistique au Maroc.",
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-18',
    isOffer: true,
  },
  {
    path: '/ingenierie-formation/catalogue',
    title: 'Catalogue de Formation par Métier — Ingénierie de Formation' + SUFFIX,
    description:
      "Le catalogue complet des thèmes de formation par métier : Supply Chain, Management, Finance, RH, Marketing, Production, Qualité, IA et tendances. Nextinotech ou réseau de partenaires, sans commission éditeur.",
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2026-09-18',
  },
  {
    path: '/demo/wms',
    title: 'Démo WMS — Gestion d’Entrepôt' + SUFFIX,
    description: "Démonstration interactive d’un WMS : réception, mise en stock, préparation, expédition, inventaire.",
    priority: 0.65,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/demo/tms',
    title: 'Démo TMS — Gestion du Transport' + SUFFIX,
    description: "Démonstration interactive d’un TMS : planification des tournées, affrètement, suivi et coûts de transport.",
    priority: 0.65,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
  {
    path: '/demo/aps',
    title: 'Démo APS — Planification de la Demande' + SUFFIX,
    description: "Démonstration interactive d’un APS : prévision de la demande, plan industriel et commercial, S&OP.",
    priority: 0.65,
    changefreq: 'monthly',
    lastmod: '2026-08-05',
  },
]

function programmeDescription(subtitle: string, price: string, unit: string): string {
  const base = `${subtitle} ${price} ${unit}. Financement CSF / GIAC possible.`
  return base.length > 158 ? base.slice(0, 155).trimEnd() + '…' : base
}

export function getPrerenderRoutes(): PrerenderRoute[] {
  const villes: PrerenderRoute[] = VILLES.map((v) => ({
    path: `/formation-logistique-${v.slug}`,
    title: v.metaTitle,
    description: v.metaDescription,
    jsonLd: [buildVilleSchema(v)],
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-01',
    // Pas de isOffer ici : ce sont des déclinaisons de l'offre /formation,
    // déjà référencée par motif (formation-logistique-<ville>) dans llms.txt.
  }))

  const programmes: PrerenderRoute[] = PROGRAMMES.filter((p) => p.id !== 'rl' && p.id !== 'import').map((p) => ({
    path: `/formation/${p.id}`,
    title: `Formation ${p.title} au Maroc${SUFFIX}`,
    description: programmeDescription(p.subtitle, p.price, p.unit),
    jsonLd: [buildProgrammeSchema(p)],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-09-02',
    // Idem : déclinaisons de /formation, déjà couvertes par le motif
    // /formation/<id> dans llms.txt.
  }))

  return [...STATIC, ...villes, ...programmes]
}
