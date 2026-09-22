import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { IconPackage, IconStack2, IconTags, IconPuzzle, IconBoxSeam, IconEyeCheck, IconLayersIntersect } from '@tabler/icons-react'
import { SchemaScript } from './SchemaHelper'
import { generateFAQSchema } from '../utils/seoData'

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
  {
    q: 'Faut-il avoir déjà un WMS et un TMS avant de déployer un control tower ?',
    a: "Non, mais c'est l'ordre le plus efficace. Un control tower consomme les données de vos systèmes existants ; sans WMS ni TMS, il démarre avec un périmètre plus restreint (ERP, fichiers manuels), ce qui limite la valeur des premières alertes. Le palier Mini est conçu pour démarrer même avec des systèmes sources encore basiques.",
  },
  {
    q: "Quelle est la différence entre le control tower et l'intégration ERP-WMS-TMS ?",
    a: "L'intégration connecte techniquement vos systèmes entre eux. Le control tower va plus loin : il ajoute les seuils d'alerte, la priorisation des exceptions et la gouvernance de décision qui transforment ces données connectées en pilotage temps réel.",
  },
  {
    q: 'Combien de temps pour voir un premier résultat sur un projet Control Tower ?',
    a: 'Le palier Mini (4 à 6 semaines) livre un premier périmètre de 3 à 5 dashboards. Le premier retour sur investissement visible, généralement sur les coûts de transport, arrive typiquement 3 à 6 mois après la fin du déploiement initial.',
  },
  {
    q: "L'IA est-elle obligatoire dans un control tower ?",
    a: "Non. Un control tower de niveau Mini ou Pilote fonctionne avec des seuils et des alertes configurés manuellement, sans IA. L'IA (détection d'anomalies, priorisation automatique) est le niveau de maturité le plus avancé, pertinent une fois la gouvernance de base stabilisée.",
  },
]

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
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

function ServicesValeurAjoutee() {
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
          Opéré en interne · Équipe & matériel propres
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
          Services Logistiques à Valeur Ajoutée
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          Sept prestations opérées directement par nos équipes, avec notre propre matériel — pas sous-traitées à un tiers.
        </p>
      </div>

      <div className="valeur-ajoutee-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'var(--border)', maxWidth: 1100 }}>
        {VALEUR_AJOUTEE.map((s) => (
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
            Prix ·&nbsp;
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>Sur devis</span>
        </div>
        <a
          href="/contact"
          className="btn-primary"
        >
          Discuter de votre besoin →
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

function PackInventaire() {
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
          Comptage physique
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
          {PACK_INVENTAIRE.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {PACK_INVENTAIRE.desc}
        </p>
      </div>

      <div className="pack-inventaire-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {PACK_INVENTAIRE.tiers.map((tier) => (
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
                  Prix
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
                  Durée
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
              Inclus
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
              href="/contact"
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
              Demander un devis Pack Inventaire →
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
            Vous êtes expert comptable ?
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
            Le Pack Inventaire sert aussi de tiers de comptage indépendant pour la certification de l'inventaire physique de fin d'exercice de vos clients : méthode tracée, écarts documentés, procès-verbal d'inventaire signé — sans lien avec la valorisation comptable.
          </p>
        </div>
        <a
          href="/contact"
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
          Nous consulter pour un exercice comptable →
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

function PartenaireITOffer() {
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
          Partenaire technique · IT, RFID & Data
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
          Solutions IT, RFID & Data
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          Nextinotech s&apos;appuie sur un partenaire technique pour les projets Supply Chain
          nécessitant du développement logiciel, de l&apos;intégration ERP, du déploiement RFID/Track &amp; Trace
          ou de la data intelligence.
        </p>
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
          Partenaire technique
        </div>

        <p style={{ fontSize: '1.02rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.75rem', maxWidth: 720 }}>
          {PARTENAIRE_IT.positioning}
        </p>

        <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '2.75rem' }}>
          {PARTENAIRE_IT.pillars.map((p) => (
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
            Méthode de déploiement
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {PARTENAIRE_IT.methode.map((m) => (
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
            Références terrain du partenaire · industrie, logistique & institutions
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
            {PARTENAIRE_IT.references.map((r) => (
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
              Prix
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
              Sur devis — selon le périmètre technique du projet
            </div>
          </div>

          <a
            href="/contact"
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
            Discuter d&apos;un projet IT / RFID / Data →
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Control Tower — WMS, TMS, IMS, AMS, IoT, IA ────────────── */

interface SystemDef {
  num: string
  name: string
  fullName: string
  definition: string
  role: string
  dataFeed: string[]
  link?: { label: string; to: string }
}

const CT_SYSTEMS: SystemDef[] = [
  {
    num: '01',
    name: 'WMS',
    fullName: "Gestion d'Entrepôt",
    definition:
      "Le WMS pilote la réalité physique de l'entrepôt : réceptions, emplacements, préparation de commandes, expéditions, inventaires. C'est le système de vérité sur ce qui se trouve où, et sur ce qui reste à faire aujourd'hui.",
    role:
      "Dans un control tower, le WMS ne remonte pas chaque mouvement de palette — il transmet les niveaux de stock des références critiques, les commandes en retard sur leur SLA, les écarts d'inventaire et le taux de service par site.",
    dataFeed: ['Stock par référence critique', 'Commandes en retard de préparation', "Écarts d'inventaire", 'Taux de service par site'],
    link: { label: 'Voir la démo WMS', to: '/demo/wms' },
  },
  {
    num: '02',
    name: 'TMS',
    fullName: 'Gestion du Transport',
    definition:
      "Le TMS planifie et optimise les tournées, le choix transporteur et le suivi de livraison. Il raisonne sur un plan établi à l'avance : itinéraires, chargements, créneaux de livraison.",
    role:
      "Le control tower consomme l'écart entre ce plan et la réalité du terrain : position et ETA réactualisées, retards au-delà d'un seuil défini, statut des livraisons à enjeu client fort.",
    dataFeed: ['Position et ETA en temps réel', 'Écarts au plan de tournée', 'Statut des livraisons prioritaires', 'Coût transport express engagé'],
    link: { label: 'Voir la démo TMS', to: '/demo/tms' },
  },
  {
    num: '03',
    name: 'IMS',
    fullName: 'Gestion des Inventaires',
    definition:
      "L'IMS (Inventory Management System) calcule les niveaux de stock consolidés, les seuils de réapprovisionnement et les prévisions de rupture — une vue par référence, tous sites confondus, distincte de la localisation physique gérée par le WMS.",
    role:
      "C'est l'IMS qui fournit au control tower la matière première de la majorité de ses alertes de rupture. Des seuils mal calibrés dans l'IMS sont la première cause de fausses alertes dans un control tower.",
    dataFeed: ['Stock de sécurité recalculé', 'Point de commande actualisé', 'Probabilité de rupture à N jours', 'Écarts de comptage tournant'],
  },
  {
    num: '04',
    name: 'AMS',
    fullName: 'Gestion des Actifs',
    definition:
      "L'AMS (Asset Management System) gère les immobilisations et équipements de la chaîne logistique — flotte, engins de manutention, matériel de stockage : localisation, statut, maintenance et traçabilité tout au long de leur cycle de vie.",
    role:
      "Le control tower s'appuie sur l'AMS pour détecter un équipement immobilisé, anticiper une maintenance préventive avant la panne, et objectiver le taux d'utilisation réel du parc face au parc théorique.",
    dataFeed: ["Statut opérationnel des actifs", "Taux d'utilisation vs capacité théorique", 'Alertes de maintenance préventive', 'Localisation et traçabilité'],
  },
  {
    num: '05',
    name: 'IoT',
    fullName: 'Capteurs & Objets Connectés',
    definition:
      "Température, humidité, géolocalisation, charge, vibration : les capteurs IoT transforment un actif physique en source de données exploitable en continu — chaîne du froid, actifs mobiles à forte valeur, équipements critiques.",
    role:
      "Un capteur n'a de valeur pour le control tower que relié à un seuil d'action. Sans seuil, il ajoute un flux de plus à surveiller manuellement — l'inverse de l'objectif d'un pilotage centralisé.",
    dataFeed: ['Température / humidité (chaîne du froid)', 'Géolocalisation des actifs mobiles', 'Charge et vibration (maintenance)', 'Présence et comptage ciblé'],
  },
  {
    num: '06',
    name: 'IA',
    fullName: 'Intelligence Artificielle',
    definition:
      "L'IA transforme la visibilité consolidée par les 5 systèmes précédents en détection d'anomalies avant qu'elles ne deviennent visibles, en priorisation automatique des exceptions selon leur impact business réel, et en recommandations d'action.",
    role:
      "Seuls 7% des supply chains exécutent une décision en temps réel selon Gartner — l'IA comble cet écart, mais n'a de valeur que si la gouvernance de décision suit le même rythme que la détection.",
    dataFeed: ["Détection d'anomalies précoce", 'Priorisation des exceptions', "Recommandations d'action", 'Automatisation des décisions à faible risque'],
    link: { label: 'Voir la formation IA Générative', to: '/formation/ia-supply-chain' },
  },
]

function CTSystemRow({ s, index }: { s: SystemDef; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div style={{ borderBottom: '1px solid rgba(27,53,84,0.1)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="system-row-grid"
        style={{
          width: '100%', background: 'none', border: 'none', padding: '2.5rem 0',
          display: 'grid', gridTemplateColumns: '64px auto 1fr auto', gap: '2.5rem',
          alignItems: 'center', textAlign: 'left', cursor: 'pointer',
        }}
      >
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(47,111,181,0.45)', textTransform: 'uppercase' }}>{s.num}</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', whiteSpace: 'nowrap' }}>{s.name}</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 2.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{s.fullName}</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.1rem', color: open ? 'var(--blue-bright)' : 'rgba(27,53,84,0.3)', transition: 'color 0.2s, transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1, userSelect: 'none' }}>+</div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '3.5rem', paddingLeft: 64 + 40, maxWidth: 820 }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>{s.definition}</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
                <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Dans le control tower : </strong>{s.role}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: s.link ? '2rem' : 0 }}>
                {s.dataFeed.map((d) => (
                  <span key={d} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.75)', border: '1px solid rgba(47,111,181,0.3)', padding: '0.5rem 0.85rem' }}>{d}</span>
                ))}
              </div>
              {s.link && (
                <Link to={s.link.to} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '0.65rem 1.1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  {s.link.label} →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CT_OFFER_TIERS = [
  { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
  { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
  { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · IA/ML · portail mobile dirigeant' },
]

const CT_FORMATION_LINKS = [
  { title: 'WMS · TMS · ERP — Maîtriser les Outils', desc: "Choisir, paramétrer et piloter les systèmes d'information supply chain.", to: '/formation/wms' },
  { title: 'IA Générative Supply Chain & Achats', desc: 'Cas d\'usage LLM, prompts métier, gouvernance des données.', to: '/formation/ia-supply-chain' },
  { title: 'Ingénierie de Formation & Financement GIAC/OFPPT', desc: 'Diagnostic des besoins, plan de formation chiffré, dossier de financement.', to: '/ingenierie-formation' },
]

function ControlTowerOffer() {
  return (
    <div id="control-tower" style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Control Tower · WMS, TMS, IMS, AMS, IoT, IA
        </div>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 0 0.75rem' }}>
          Une tour de contrôle, six sources de vérité.
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          WMS, TMS, IMS, AMS, IoT et IA ne se remplacent pas — ils alimentent chacun une brique précise du pilotage
          temps réel. Le control tower ne les duplique pas, il en extrait ce qui déclenche une décision.
        </p>
      </div>

      <div>
        <div style={{ borderTop: '1px solid rgba(27,53,84,0.1)' }} />
        {CT_SYSTEMS.map((s, i) => (
          <CTSystemRow key={s.num} s={s} index={i} />
        ))}
      </div>

      {/* Formation d'abord */}
      <div style={{ marginTop: '5rem', marginBottom: '2rem', maxWidth: 640 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.6)', marginBottom: '0.75rem' }}>
          Formation
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
          Former les équipes qui exploiteront la tour de contrôle.
        </div>
      </div>
      <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {CT_FORMATION_LINKS.map((f) => (
          <Link key={f.to} to={f.to} style={{ display: 'block', padding: '1.75rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
            <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.6rem' }}>{f.title}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
          </Link>
        ))}
      </div>

      {/* Puis conseil */}
      <div style={{ marginBottom: '2rem', maxWidth: 640 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.6)', marginBottom: '0.75rem' }}>
          Conseil & Accompagnement
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
          Cadrer avant d&apos;intégrer.
        </div>
      </div>
      <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        <a href="/conseil" style={{ display: 'block', padding: '1.75rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.6rem' }}>Cahier des Charges Systèmes</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>WMS, TMS, APS, Control Tower, intégration IA — document formalisé et chiffré, prêt à diffuser aux prestataires.</div>
        </a>
        <a href="/direction-supply-chain-temps-partage" style={{ display: 'block', padding: '1.75rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.6rem' }}>Direction Supply Chain à Temps Partagé</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>Un pilote pour porter la gouvernance du control tower au quotidien, sans recrutement CDI.</div>
        </a>
        <Link to="/blog/control-tower-logistique-piloter-sa-supply-chain-en-temps" style={{ display: 'block', padding: '1.75rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.6rem' }}>Guide Control Tower Logistique</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>Mode d&apos;emploi complet : briques, gouvernance de décision, mise en place progressive.</div>
        </Link>
      </div>

      {/* Puis prestation (l'offre chiffrée) */}
      <div style={{ marginBottom: '2rem', maxWidth: 640 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.6)', marginBottom: '0.75rem' }}>
          Prestation
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
          Trois paliers, du diagnostic au pilotage assisté par IA.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '1.5rem' }} className="partenaire-pillars-grid">
        {CT_OFFER_TIERS.map((tier) => (
          <div key={tier.name} style={{
            background: tier.featured ? 'rgba(47,111,181,0.08)' : 'rgba(27,53,84,0.03)',
            border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.4)' : 'rgba(27,53,84,0.1)'}`,
            padding: '2rem', position: 'relative',
          }}>
            {tier.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />}
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: tier.featured ? 'rgba(47,111,181,0.8)' : 'rgba(27,53,84,0.5)', marginBottom: '0.75rem' }}>{tier.name}</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: tier.featured ? 'var(--blue-bright)' : 'var(--ink)', marginBottom: '0.6rem' }}>{tier.price}</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>{tier.duration}</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(27,53,84,0.7)', lineHeight: 1.6, fontWeight: 300 }}>{tier.desc}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, maxWidth: 640, marginBottom: '3rem' }}>
        Chaque palier inclut la sélection ou l&apos;intégration des systèmes sources nécessaires, la définition des
        seuils d&apos;alerte et la formation des équipes à leur exploitation.
      </p>

      <a href="/contact" className="btn-primary">Discuter de votre projet Control Tower →</a>
    </div>
  )
}

export default function Prestations() {
  return (
    <section id="prestations" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <SchemaScript schema={generateFAQSchema(prestationsFAQ)} />
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
              01 / Prestations Opérationnelles
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
              Ce qu'on exécute pour vous.
            </h2>
          </div>
          <p style={{
            fontSize: '1rem',
            color: 'var(--mid)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 440,
          }}>
            Pas du conseil — de l'exécution. Nos propres équipes, notre propre matériel, sur devis,
            sans sous-traitance cachée.
          </p>
        </div>

        <ServicesValeurAjoutee />

        <PackInventaire />

        <PartenaireITOffer />

        <ControlTowerOffer />

        <div style={{ marginTop: '6rem' }}>
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Questions fréquentes
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
              Vos questions, nos réponses.
            </h3>
          </div>
          <div style={{ maxWidth: 900 }}>
            {prestationsFAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <a href="/contact" className="btn-primary">Discuter de votre besoin →</a>
          <a href="/conseil" className="btn-outline">Voir nos offres Conseil</a>
        </div>
      </div>
    </section>
  )
}
