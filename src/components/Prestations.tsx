import { useRef, useState } from 'react'
import { IS_SERVER } from '../utils/ssr'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { IconPackage, IconStack2, IconTags, IconPuzzle, IconBoxSeam, IconEyeCheck, IconLayersIntersect } from '@tabler/icons-react'
import { SchemaScript } from './SchemaHelper'
import { generateFAQSchema } from '../utils/seoData'
import { useLocale } from '../i18n/locale'

const ease = [0.16, 1, 0.3, 1] as const

export const prestationsFAQ = [
  {
    q: 'Le Pack Inventaire inclut-il le matériel de comptage ?',
    a: "Oui. Chaque palier du Pack Inventaire inclut le matériel de scan et de saisie (Palier 1 et 2) ou le matériel complet (Palier 3), en plus de l'équipe de comptage. Le dimensionnement exact — effectif, jours, matériel — est affiné avec vous avant devis selon la complexité réelle du site.",
  },
  {
    q: 'Peut-on commander une seule prestation (ex: fardelage seul) sans passer par un pack complet ?',
    a: "Oui. Les 7 Services Logistiques à Valeur Ajoutée (co-packing, fardelage, étiquetage/marquage, kitting, mise en carton/reconditionnement, contrôle qualité visuel, palettisation sur mesure) sont présentés et facturés individuellement, sur devis — aucun pack imposé. Seul le Pack Inventaire (comptage physique) est structuré en paliers de volume.",
  },
  {
    q: 'Intervenez-vous en dehors de Casablanca pour les prestations opérationnelles ?',
    a: "Notre zone d'action couvre le Maroc, en plus de la France et l'Europe. Les conditions logistiques précises (délai, déplacement d'équipe et de matériel) pour un site hors Casablanca sont à valider au cas par cas — contactez-nous avec votre localisation pour un devis adapté.",
  },
  {
    q: 'Qui réalise les projets IT, RFID ou ERP présentés dans cette offre ?',
    a: "Nextinotech réalise elle-même le cadrage, l'intégration ERP et le déploiement RFID/Track & Trace, de bout en bout, sans sous-traitance — la même équipe qui a mené le diagnostic pilote la réalisation technique.",
  },
  {
    q: 'Le Pack Inventaire peut-il servir à la certification des comptes en fin d\'exercice ?',
    a: "Oui. Au-delà du comptage pour les entreprises, le Pack Inventaire est utilisé par des experts comptables comme appui indépendant à la certification de l'inventaire physique de fin d'exercice : méthode tracée, écarts documentés poste par poste, et un procès-verbal d'inventaire signé remis à l'expert comptable. Nextinotech agit ici comme tiers de comptage indépendant, sans lien avec la valorisation comptable elle-même.",
  },
]

export const prestationsFAQ_EN = [
  {
    q: 'Does the Inventory Pack include counting equipment?',
    a: "Yes. Every Inventory Pack tier includes scanning/entry equipment (Tiers 1 and 2) or full equipment (Tier 3), on top of the counting team. The exact sizing — headcount, days, equipment — is refined with you before quoting, based on the site's actual complexity.",
  },
  {
    q: 'Can we order a single service (e.g. bundling only) without a full pack?',
    a: 'Yes. The 7 Value-Added Logistics Services (co-packing, bundling, labeling/marking, kitting, repackaging, visual quality control, custom palletizing) are presented and billed individually, on quote — no forced pack. Only the Inventory Pack (physical counting) is structured in volume tiers.',
  },
  {
    q: 'Do you operate outside Casablanca for operational services?',
    a: "Our coverage spans Morocco, as well as France and Europe. Precise logistics conditions (lead time, team and equipment travel) for a site outside Casablanca are confirmed case by case — contact us with your location for a tailored quote.",
  },
  {
    q: 'Who delivers the IT, RFID or ERP projects presented in this offer?',
    a: 'Nextinotech itself handles scoping, ERP integration and RFID/Track & Trace deployment, end to end, with no subcontracting — the same team that ran the diagnosis leads the technical build.',
  },
  {
    q: 'Can the Inventory Pack support year-end account certification?',
    a: "Yes. Beyond counting for companies, the Inventory Pack is used by accounting firms as an independent counting party to certify the year-end physical inventory: a traced method, discrepancies documented line by line, and a signed inventory report handed to the accountant. Nextinotech acts here as an independent counting third party, with no link to the accounting valuation itself.",
  },
]

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(IS_SERVER)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.75rem 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, paddingBottom: '1.75rem', maxWidth: 760 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const VALEUR_AJOUTEE = [
  { icon: IconPackage, name: 'Co-packing', desc: 'Assemblage et conditionnement de packs promotionnels ou multi-produits, à la demande.' },
  { icon: IconStack2, name: 'Fardelage', desc: 'Regroupement et filmage de plusieurs unités en un seul colis prêt à expédier.' },
  { icon: IconTags, name: 'Étiquetage / Marquage', desc: 'Pose d’étiquettes, codes-barres ou marquages réglementaires sur vos produits.' },
  { icon: IconPuzzle, name: 'Kitting', desc: 'Assemblage de kits multi-composants prêts à la vente ou à l’installation.' },
  { icon: IconBoxSeam, name: 'Mise en carton / Reconditionnement', desc: 'Reconditionnement de produits dans un nouvel emballage, adapté à votre marché ou client.' },
  { icon: IconEyeCheck, name: 'Contrôle Qualité Visuel', desc: 'Vérification visuelle avant expédition — conformité, état, complétude.' },
  { icon: IconLayersIntersect, name: 'Palettisation sur Mesure', desc: 'Constitution de palettes selon vos contraintes clients, transporteur ou stockage.' },
]

const VALEUR_AJOUTEE_EN = [
  { icon: IconPackage, name: 'Co-packing', desc: 'Assembly and packaging of promotional or multi-product packs, on demand.' },
  { icon: IconStack2, name: 'Bundling', desc: 'Grouping and shrink-wrapping several units into one ready-to-ship parcel.' },
  { icon: IconTags, name: 'Labeling / Marking', desc: 'Applying labels, barcodes or regulatory markings to your products.' },
  { icon: IconPuzzle, name: 'Kitting', desc: 'Assembling multi-component kits ready for sale or installation.' },
  { icon: IconBoxSeam, name: 'Repackaging', desc: 'Repackaging products into new packaging, tailored to your market or client.' },
  { icon: IconEyeCheck, name: 'Visual Quality Control', desc: 'Visual check before shipping — compliance, condition, completeness.' },
  { icon: IconLayersIntersect, name: 'Custom Palletizing', desc: 'Building pallets to your customer, carrier or storage constraints.' },
]

function ServicesValeurAjoutee() {
  const { locale, tr, href } = useLocale()
  const services = locale === 'en' ? VALEUR_AJOUTEE_EN : VALEUR_AJOUTEE
  return (
    <div id="services-valeur-ajoutee">
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          {tr('Opéré en interne · Équipe & matériel propres', 'Run in-house · Our own team & equipment')}
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          {tr('Services Logistiques à Valeur Ajoutée', 'Value-Added Logistics Services')}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {tr(
            'Sept prestations opérées directement par nos équipes, avec notre propre matériel — pas sous-traitées à un tiers.',
            'Seven services run directly by our teams, with our own equipment — never subcontracted.'
          )}
        </p>
      </div>

      <div className="valeur-ajoutee-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'var(--border)', maxWidth: 1100 }}>
        {services.map((s) => (
          <div key={s.name} style={{ background: '#fff', padding: '2rem 1.75rem' }}>
            <s.icon size={22} stroke={1.6} color="var(--blue-bright)" style={{ marginBottom: '1rem' }} />
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.98rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
              {s.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.55, fontWeight: 300 }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)' }}>
            {tr('Prix · ', 'Price · ')}
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>{tr('Sur devis', 'On quote')}</span>
        </div>
        <a
          href={href('/contact')}
          className="btn-primary"
        >
          {tr('Discuter de votre besoin →', 'Discuss your needs →')}
        </a>
      </div>
    </div>
  )
}

const PACK_INVENTAIRE = {
  title: 'Pack Inventaire',
  tagline: 'Comptage physique + ressources incluses.',
  desc: "Le dimensionnement réel — nombre de personnes, jours, matériel — dépend de la complexité du site, pas seulement du nombre d'emplacements. Chaque palier ci-dessous est un point de départ, affiné avec vous avant devis. Deux publics : les entreprises qui pilotent leur propre inventaire, et les experts comptables qui ont besoin d'un tiers de comptage indépendant pour certifier l'inventaire physique de fin d'exercice.",
  tiers: [
    {
      name: 'Palier 1 — Petit site',
      tag: "Jusqu'à 500 emplacements",
      price: 'Sur devis',
      duration: 'À définir',
      includes: ['Équipe de comptage (effectif à définir)', 'Matériel de scan / saisie', "Rapport d'écarts"],
    },
    {
      name: 'Palier 2 — Site moyen',
      tag: '500 à 2 000 emplacements',
      price: 'Sur devis',
      duration: 'À définir',
      featured: true,
      includes: [
        'Équipe de comptage renforcée',
        'Matériel de scan / saisie',
        'Coordination multi-zones',
        "Rapport détaillé avec analyse des causes d'écart",
      ],
    },
    {
      name: 'Palier 3 — Grand site',
      tag: '2 000+ emplacements',
      price: 'Sur devis',
      duration: 'À définir',
      includes: [
        'Équipe dimensionnée sur devis',
        'Matériel complet',
        'Méthodologie multi-équipes en parallèle',
        "Rapport + plan d'action correctif",
      ],
    },
  ],
}

const PACK_INVENTAIRE_EN = {
  title: 'Inventory Pack',
  tagline: 'Physical counting + included resources.',
  desc: "The actual sizing — headcount, days, equipment — depends on the site's complexity, not just the number of locations. Each tier below is a starting point, refined with you before quoting. Two audiences: companies running their own inventory, and accounting firms who need an independent counting party to certify the year-end physical inventory.",
  tiers: [
    {
      name: 'Tier 1 — Small site',
      tag: 'Up to 500 locations',
      price: 'On quote',
      duration: 'To be defined',
      includes: ['Counting team (headcount to be defined)', 'Scanning / entry equipment', 'Discrepancy report'],
    },
    {
      name: 'Tier 2 — Mid-size site',
      tag: '500 to 2,000 locations',
      price: 'On quote',
      duration: 'To be defined',
      featured: true,
      includes: [
        'Reinforced counting team',
        'Scanning / entry equipment',
        'Multi-zone coordination',
        'Detailed report with root-cause analysis',
      ],
    },
    {
      name: 'Tier 3 — Large site',
      tag: '2,000+ locations',
      price: 'On quote',
      duration: 'To be defined',
      includes: [
        'Team sized on quote',
        'Full equipment',
        'Parallel multi-team methodology',
        'Report + corrective action plan',
      ],
    },
  ],
}

function PackInventaire() {
  const { locale, tr, href } = useLocale()
  const pack = locale === 'en' ? PACK_INVENTAIRE_EN : PACK_INVENTAIRE
  return (
    <div id="pack-inventaire" style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          {tr('Comptage physique', 'Physical counting')}
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          {pack.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {pack.desc}
        </p>
      </div>

      <div className="pack-inventaire-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {pack.tiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              background: tier.featured ? 'var(--ink)' : '#fff',
              border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.35)' : 'rgba(27,53,84,0.1)'}`,
              padding: '2.5rem',
              position: 'relative',
              boxShadow: tier.featured ? '0 24px 60px rgba(10,20,32,0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            {tier.featured && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />
            )}

            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tier.featured ? 'rgba(47,111,181,0.75)' : 'rgba(95,102,114,0.6)',
                marginBottom: '0.6rem',
              }}
            >
              {tier.tag}
            </div>

            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: tier.featured ? '#ffffff' : 'var(--ink)',
                marginBottom: '1.5rem',
              }}
            >
              {tier.name}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '2rem',
                margin: '0 0 1.75rem',
                paddingBottom: '1.5rem',
                borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.07)' : 'rgba(27,53,84,0.08)'}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tier.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {tr('Prix', 'Price')}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: tier.featured ? '#ffffff' : 'var(--ink)' }}>
                  {tier.price}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tier.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {tr('Durée', 'Duration')}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 500, color: tier.featured ? 'rgba(235,232,225,0.8)' : 'var(--ink)' }}>
                  {tier.duration}
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: tier.featured ? 'rgba(227,226,226,0.35)' : 'rgba(95,102,114,0.5)',
                marginBottom: '0.75rem',
              }}
            >
              {tr('Inclus', 'Included')}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {tier.includes.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.5rem 0',
                    borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.05)' : 'rgba(27,53,84,0.06)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    color: tier.featured ? 'rgba(235,232,225,0.65)' : 'var(--mid)',
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={href('/contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: tier.featured ? 'var(--blue-bright)' : 'var(--ink)',
                fontFamily: 'DM Mono, monospace',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              {tr('Demander un devis Pack Inventaire →', 'Request an Inventory Pack quote →')}
            </a>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '2rem',
          maxWidth: 1100,
          background: 'var(--paper)',
          border: '1px solid rgba(27,53,84,0.1)',
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(47,111,181,0.65)',
              marginBottom: '0.6rem',
            }}
          >
            {tr('Vous êtes expert comptable ?', 'Are you an accounting firm?')}
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
            {tr(
              "Le Pack Inventaire sert aussi de tiers de comptage indépendant pour la certification de l'inventaire physique de fin d'exercice de vos clients : méthode tracée, écarts documentés, procès-verbal d'inventaire signé — sans lien avec la valorisation comptable.",
              "The Inventory Pack also serves as an independent counting party for certifying your clients' year-end physical inventory: a traced method, documented discrepancies, a signed inventory report — with no link to the accounting valuation."
            )}
          </p>
        </div>
        <a
          href={href('/contact')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--ink)',
            fontFamily: 'DM Mono, monospace',
            whiteSpace: 'nowrap',
            borderBottom: '1px solid rgba(27,53,84,0.3)',
            paddingBottom: '2px',
          }}
        >
          {tr('Nous consulter pour un exercice comptable →', 'Consult us for a fiscal year engagement →')}
        </a>
      </div>
    </div>
  )
}

const PARTENAIRE_IT = {
  positioning: "Nextinotech conçoit et intègre elle-même les solutions digitales de la Supply Chain, de bout en bout — applications métier, connexion des équipements et systèmes existants (ERP, IoT, capteurs), puis exploitation de la donnée pour piloter la décision. Nous intervenons sans sous-traitance sur les missions qui exigent du développement logiciel, de l'intégration ERP, un déploiement RFID/IoT sur le terrain ou de la data intelligence — avec la même équipe qui a mené le diagnostic.",
  pillars: [
    {
      label: 'Solutions métier',
      title: 'Applications métier & workflows',
      items: [
        'Gestion d\'entrepôt (WMS) — stocks, réceptions, préparation, expédition, inventaires',
        'Gestion du transport (TMS) — planification, exécution, suivi et preuve de livraison',
        'Gestion des actifs (AMS) — immobilisations, équipements, localisation et traçabilité',
        'Gestion des inventaires (IMS) — inventaires physiques, mobilité, contrôle et rapprochement',
      ],
    },
    {
      label: 'Industrie 4.0 & IoT',
      title: 'Automatisation & équipements connectés',
      items: [
        'RFID — identification et traçabilité sans contact',
        'Track & Trace — suivi des flux, actifs, palettes et équipements',
        'Pick / Put to Light — guidage opérateur et réduction des erreurs',
        'DWS / Vision — dimensioning, weighing, scanning et contrôle qualité',
        'Marquage intelligent (smart marking) et intégration industrielle',
      ],
    },
    {
      label: 'Data & IA',
      title: 'De la donnée brute à la décision',
      items: [
        'Connexion des systèmes existants — ERP, IoT, API',
        'Capture des événements — scans, capteurs, transactions',
        'Orchestration — règles métier et workflows',
        'Analyse — KPI, BI et alertes en temps réel',
        'Optimisation — IA prédictive et recommandations',
      ],
    },
  ],
  methode: [
    { num: '01', title: 'Cadrer', desc: 'Process mapping & objectifs' },
    { num: '02', title: 'Concevoir', desc: 'Architecture & interfaces' },
    { num: '03', title: 'Prototyper', desc: 'PoC / MVP sur le terrain' },
    { num: '04', title: 'Déployer', desc: 'Intégration & conduite du changement' },
    { num: '05', title: 'Améliorer', desc: 'Support, data & optimisation continue' },
  ],
  references: [
    { name: 'Fondation Mohammed V', file: '/images/logos/fondation-mohammed-v.svg', height: 40, natW: 89, natH: 89 },
    { name: 'L\'Oréal', file: '/images/logos/loreal.svg', height: 20, natW: 800, natH: 145 },
    { name: 'OCP', file: '/images/logos/ocp.svg', height: 42, natW: 251, natH: 320 },
    { name: 'ALINA', file: '/images/logos/alina-distribution.png', height: 16, natW: 347, natH: 48 },
    { name: 'TIRSO', file: '/images/logos/tirso.png', height: 26, natW: 1080, natH: 360 },
    { name: 'GIZ', file: '/images/logos/giz.svg', height: 22, natW: 105, natH: 29 },
    { name: 'SAPRESS', file: '/images/logos/sapress.png', height: 24, natW: 350, natH: 100 },
    { name: 'LOGIPHAR', file: '/images/logos/logiphar.jpg', height: 44, natW: 200, natH: 200 },
    { name: 'ECU World', file: '/images/logos/ecu-worldwide.png', height: 40, natW: 1028, natH: 481 },
    { name: 'Nigerian Ports Authority', file: '/images/logos/nigerian-ports-authority.png', height: 36, natW: 304, natH: 136 },
  ],
}

const PARTENAIRE_IT_EN = {
  positioning: "Nextinotech designs and integrates Supply Chain digital solutions itself, end to end — business applications, connecting existing equipment and systems (ERP, IoT, sensors), then turning data into decisions. We work with no subcontracting on missions requiring software development, ERP integration, RFID/IoT field deployment or data intelligence — with the same team that ran the diagnosis.",
  pillars: [
    {
      label: 'Business solutions',
      title: 'Business applications & workflows',
      items: [
        'Warehouse Management (WMS) — stock, receiving, picking, shipping, inventory',
        'Transport Management (TMS) — planning, execution, tracking and proof of delivery',
        'Asset Management (AMS) — fixed assets, equipment, location and traceability',
        'Inventory Management (IMS) — physical inventories, mobility, control and reconciliation',
      ],
    },
    {
      label: 'Industry 4.0 & IoT',
      title: 'Automation & connected equipment',
      items: [
        'RFID — contactless identification and traceability',
        'Track & Trace — tracking flows, assets, pallets and equipment',
        'Pick / Put to Light — operator guidance and error reduction',
        'DWS / Vision — dimensioning, weighing, scanning and quality control',
        'Smart marking and industrial integration',
      ],
    },
    {
      label: 'Data & AI',
      title: 'From raw data to decisions',
      items: [
        'Connecting existing systems — ERP, IoT, API',
        'Event capture — scans, sensors, transactions',
        'Orchestration — business rules and workflows',
        'Analysis — KPIs, BI and real-time alerts',
        'Optimization — predictive AI and recommendations',
      ],
    },
  ],
  methode: [
    { num: '01', title: 'Scope', desc: 'Process mapping & objectives' },
    { num: '02', title: 'Design', desc: 'Architecture & interfaces' },
    { num: '03', title: 'Prototype', desc: 'PoC / MVP in the field' },
    { num: '04', title: 'Deploy', desc: 'Integration & change management' },
    { num: '05', title: 'Improve', desc: 'Support, data & continuous optimization' },
  ],
  references: PARTENAIRE_IT.references,
}

function PartenaireITOffer() {
  const { locale, tr, href } = useLocale()
  const it = locale === 'en' ? PARTENAIRE_IT_EN : PARTENAIRE_IT
  return (
    <div id="solutions-it" style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          {tr('Partenaire technique · IT, RFID & Data', 'Technical partner · IT, RFID & Data')}
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          {tr('Solutions IT, RFID & Data', 'IT, RFID & Data Solutions')}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {tr(
            <>Nextinotech s&apos;appuie sur un partenaire technique pour les projets Supply Chain
            nécessitant du développement logiciel, de l&apos;intégration ERP, du déploiement RFID/Track &amp; Trace
            ou de la data intelligence.</>,
            <>Nextinotech relies on a technical partner for Supply Chain projects requiring software
            development, ERP integration, RFID/Track &amp; Trace deployment or data intelligence.</>
          )}
        </p>
        <Link
          to={href('/control-tower')}
          style={{
            display: 'inline-block',
            marginTop: '1.25rem',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--blue-bright)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--blue-bright)',
          }}
        >
          {tr(
            "Voir l'offre Control Tower complète (WMS, TMS, IMS, AMS, IoT, IA) →",
            'See the full Control Tower offer (WMS, TMS, IMS, AMS, IoT, AI) →'
          )}
        </Link>
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(27,53,84,0.1)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 960,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--blue-bright)' }} />

        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(47,111,181,0.6)',
            marginBottom: '1.5rem',
          }}
        >
          {tr('Partenaire technique', 'Technical partner')}
        </div>

        <p style={{ fontSize: '1.02rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.75rem', maxWidth: 720 }}>
          {it.positioning}
        </p>

        <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '2.75rem' }}>
          {it.pillars.map((p) => (
            <div key={p.label}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.6)', marginBottom: '0.5rem' }}>
                {p.label}
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.9rem', lineHeight: 1.25 }}>
                {p.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.45rem 0',
                      borderBottom: '1px solid rgba(27,53,84,0.06)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      color: 'var(--mid)',
                      lineHeight: 1.5,
                      fontWeight: 300,
                    }}
                  >
                    <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(27,53,84,0.08)', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '1.25rem' }}>
            {tr('Méthode de déploiement', 'Deployment method')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {it.methode.map((m) => (
              <div key={m.num} style={{ flex: '1 1 150px', minWidth: 140 }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--blue-bright)', marginBottom: '0.4rem' }}>
                  {m.num}
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.92rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--mid)', lineHeight: 1.5, fontWeight: 300 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(27,53,84,0.08)', paddingTop: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '1.1rem' }}>
            {tr('Références terrain du partenaire · industrie, logistique & institutions', "Partner's field references · industry, logistics & institutions")}
          </div>
          <div
            className="partenaire-references-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '2px',
              background: 'var(--border)',
            }}
          >
            {it.references.map((r) => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 80,
                  background: '#fff',
                  padding: '1rem',
                }}
              >
                <img
                  src={r.file}
                  alt={r.name}
                  width={r.natW}
                  height={r.natH}
                  style={{
                    height: r.height,
                    maxWidth: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    opacity: 0.6,
                    transition: 'filter 0.3s ease, opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)'
                    e.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)'
                    e.currentTarget.style.opacity = '0.6'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>
              {tr('Prix', 'Price')}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
              {tr('Sur devis — selon le périmètre technique du projet', "On quote — based on the project's technical scope")}
            </div>
          </div>

          <a
            href={href('/contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--ink)',
              fontFamily: 'DM Mono, monospace',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            {tr("Discuter d'un projet IT / RFID / Data →", 'Discuss an IT / RFID / Data project →')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Prestations() {
  const { locale, tr, href } = useLocale()
  const faq = locale === 'en' ? prestationsFAQ_EN : prestationsFAQ
  return (
    <section id="prestations" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <SchemaScript schema={generateFAQSchema(faq)} />
      <div className="section-inner">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          marginBottom: '6rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(47,111,181,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              {tr('01 / Prestations Opérationnelles', '01 / Operational Services')}
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.8rem, 5vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              {tr("Ce qu'on exécute pour vous.", 'What we execute for you.')}
            </h2>
          </div>
          <p style={{
            fontSize: '1rem',
            color: 'var(--mid)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 440,
          }}>
            {tr(
              "Pas du conseil — de l'exécution. Nos propres équipes, notre propre matériel, sur devis, sans sous-traitance cachée.",
              'Not advisory — execution. Our own teams, our own equipment, on quote, with no hidden subcontracting.'
            )}
          </p>
        </div>

        <ServicesValeurAjoutee />

        <PackInventaire />

        <PartenaireITOffer />

        <div style={{ marginTop: '6rem' }}>
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {tr('Questions fréquentes', 'Frequently Asked Questions')}
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
              {tr('Vos questions, nos réponses.', 'Your questions, our answers.')}
            </h3>
          </div>
          <div style={{ maxWidth: 900 }}>
            {faq.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <a href={href('/contact')} className="btn-primary">{tr('Discuter de votre besoin →', 'Discuss your needs →')}</a>
          <a href={href('/conseil')} className="btn-outline">{tr('Voir nos offres Conseil', 'See our Consulting offers')}</a>
        </div>
      </div>
    </section>
  )
}
