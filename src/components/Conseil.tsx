import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Offre {
  tier: string
  name: string
  desc: string
  price: string
  duration: string
  features: string[]
  cta: string
  featured?: boolean
}

interface Tab {
  id: string
  label: string
  offres: Offre[]
}

const tabs: Tab[] = [
  {
    id: 'diagnostic',
    label: 'Diagnostic Express',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'Diagnostic Flash',
        desc: "Pour PME voulant un premier regard extérieur sans engagement fort.",
        price: '35 000 – 55 000 MAD HT',
        duration: '⏱ 2 semaines',
        features: [
          '2 jours terrain + interviews clés',
          'Rapport synthèse (15-20 pages)',
          '3-5 leviers prioritaires chiffrés',
          'Session restitution dirigeant',
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'Diagnostic Stratégique',
        desc: "Pour ETI souhaitant une photographie complète avant transformation.",
        price: '80 000 – 130 000 MAD HT',
        duration: '⏱ 4 à 6 semaines',
        features: [
          'Audit terrain + interviews toutes fonctions',
          'Cartographie complète flux & systèmes',
          'Benchmarks sectoriels',
          'Roadmap transformation chiffrée',
          'Présentation Comex',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'Diagnostic Multi-sites',
        desc: "Pour groupes avec plusieurs entités / pays à aligner.",
        price: 'Sur devis',
        duration: '⏱ 6 à 12 semaines',
        features: [
          'Périmètre multi-entités / international',
          'Benchmark entre sites',
          'Plan de mutualisation / standardisation',
          'Business case détaillé',
          'Accompagnement arbitrage Comex',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
  {
    id: 'stocks',
    label: 'Optimisation Stocks',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'Stock Quick Win',
        desc: "Pour PME avec stock dormant ou ruptures répétées.",
        price: '45 000 – 75 000 MAD HT',
        duration: '⏱ 4 à 6 semaines',
        features: [
          "Analyse ABC/XYZ de votre portefeuille SKU",
          "Identification du stock dormant (cash libérable)",
          "Paramétrage points de commande sur ERP",
          "Plan d'action 90 jours",
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'Refonte Politique Stocks',
        desc: "Pour PME/ETI voulant structurer leur planification durablement.",
        price: '100 000 – 180 000 MAD HT',
        duration: '⏱ 3 à 4 mois',
        features: [
          'Audit complet politique de stocks',
          'Mise en place S&OP mensuel',
          'Modèles de prévision calibrés',
          'Formation planificateurs',
          'Suivi 3 premiers cycles S&OP inclus',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'DDMRP / IBP',
        desc: "Pour ETI complexes avec volatilité forte et multi-sites.",
        price: 'Sur devis',
        duration: '⏱ 5 à 9 mois',
        features: [
          'Implémentation DDMRP (méthode COVID-proven)',
          "Intégration IBP avec votre ERP",
          'Gouvernance S&OP complète',
          'Part de rémunération indexée sur le BFR libéré',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
  {
    id: 'achats',
    label: 'Performance Achats',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'Achats Quick Wins',
        desc: "Identifier les économies immédiates sur votre portefeuille fournisseurs.",
        price: '50 000 – 80 000 MAD HT',
        duration: '⏱ 4 à 6 semaines',
        features: [
          'Analyse spend par famille / fournisseur',
          'Matrice Kraljic de vos achats',
          'Identification des leviers de négociation',
          "Plan d'action priorisé",
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'Structuration Achats',
        desc: "Professionnaliser la fonction achat avec contrats et gouvernance.",
        price: '120 000 – 200 000 MAD HT',
        duration: '⏱ 3 à 5 mois',
        features: [
          'Mise en place contrats cadres',
          'Panel fournisseurs & scoring',
          "Processus appel d'offres formalisé",
          'KPIs achats & reporting mensuel',
          'Économies cibles 3 à 8% du spend traité',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'Performance Achats ETI',
        desc: "Direction des Achats intérimaire ou à temps partagé.",
        price: 'Sur devis',
        duration: '⏱ 6 à 12 mois',
        features: [
          'Transformation complète fonction Achats',
          "Déploiement outil e-Procurement",
          'Risk management fournisseurs',
          'Rémunération partielle indexée sur économies',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
  {
    id: 'logistique',
    label: 'Schéma Logistique',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'Audit Logistique',
        desc: "Radiographie de votre schéma logistique actuel.",
        price: '60 000 – 90 000 MAD HT',
        duration: '⏱ 4 à 6 semaines',
        features: [
          'Cartographie flux physiques & informationnels',
          'Analyse coûts de service',
          'Benchmarks sectoriels',
          'Recommandations priorisées',
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'Redéfinition Schéma',
        desc: "Conception d'un nouveau schéma logistique optimisé.",
        price: '150 000 – 250 000 MAD HT',
        duration: '⏱ 3 à 5 mois',
        features: [
          'Modélisation réseau logistique',
          'Simulations scénarios (make/buy, outsourcing)',
          'Business case chiffré par scénario',
          "Appel d'offres prestataires logistiques",
          'Accompagnement transition',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'Greenfield / Expansion',
        desc: "Conception de nouveaux sites ou expansion géographique.",
        price: 'Sur devis',
        duration: '⏱ 6 à 12 mois',
        features: [
          'Conception greenfield (référence Renault-Nissan)',
          "Optimisation implantation d'entrepôt",
          'Standards et processus groupe',
          'Pilotage prestataires BTP & équipementiers',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
  {
    id: 'faisabilite',
    label: 'Étude de Faisabilité SI',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'Cadrage SI',
        desc: "Avant d'acheter un logiciel, comprendre ce dont vous avez vraiment besoin.",
        price: '40 000 – 65 000 MAD HT',
        duration: '⏱ 3 à 5 semaines',
        features: [
          'Expression de besoins fonctionnels',
          "Cartographie de l'existant SI",
          '3 éditeurs recommandés en short-list',
          'Estimation budget projet',
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'Étude de Faisabilité',
        desc: "Dossier de décision complet pour arbitrage Comex / DAF.",
        price: '90 000 – 160 000 MAD HT',
        duration: '⏱ 5 à 8 semaines',
        features: [
          'Cahier des charges fonctionnel complet',
          'RFP formalisé + organisation démos',
          'Scoring objectif 5 axes',
          'Business case ROI sur 5 ans',
          'Recommandation motivée + plan de déploiement',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'Due Diligence SI',
        desc: "Pour les grands projets ERP / SCM avec plusieurs millions en jeu.",
        price: 'Sur devis',
        duration: '⏱ 8 à 16 semaines',
        features: [
          'Audit SI existant complet',
          'Architecture cible recommandée',
          'Négociation contrats éditeurs',
          'Sélection et contractualisation intégrateur',
          'Gouvernance de projet',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
  {
    id: 'pilotage',
    label: 'Pilotage de Projet SI',
    offres: [
      {
        tier: '🔹 Mini',
        name: 'AMOA Légère',
        desc: "Accompagnement partiel sur un projet déjà lancé.",
        price: '70 000 – 120 000 MAD HT',
        duration: '⏱ 2 à 4 mois',
        features: [
          'Contrôle qualité livrables intégrateur',
          'Recette fonctionnelle',
          'Formation utilisateurs clés',
          'Accompagnement go-live',
        ],
        cta: 'En savoir plus',
      },
      {
        tier: '🔸 Pilote',
        name: 'AMOA Complète',
        desc: "Représentation totale du maître d'ouvrage tout au long du projet.",
        price: '180 000 – 350 000 MAD HT',
        duration: '⏱ 3 à 8 mois',
        features: [
          'Pilotage intégrateur en votre nom',
          'Comité de pilotage mensuel',
          'Gestion des avenants et du scope',
          'Change management équipes',
          'Stabilisation post go-live 4 semaines',
        ],
        cta: 'Réserver un échange',
        featured: true,
      },
      {
        tier: '🔷 Pro',
        name: 'AMOA Multi-projets',
        desc: "Pour ETI menant plusieurs chantiers SI simultanément.",
        price: 'Sur devis',
        duration: '⏱ 6 à 18 mois',
        features: [
          'Programme management multi-projets',
          'PMO Supply Chain dédié',
          'Architecture de gouvernance projet',
          'Coordination éditeurs + intégrateurs + DSI',
        ],
        cta: 'Demander un devis',
      },
    ],
  },
]

function OffreCard({ offre }: { offre: Offre }) {
  const dark = offre.featured
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
      style={{
        background: dark ? 'var(--dark)' : 'var(--card-bg)',
        border: `1px solid ${dark ? 'var(--gold)' : 'var(--border)'}`,
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        color: dark ? 'var(--dark-text)' : 'var(--ink)',
      }}
    >
      {offre.featured && <div className="offer-badge">★ Le plus choisi</div>}
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: dark ? 'var(--gold-light)' : 'var(--gold)',
          marginBottom: '0.75rem',
        }}
      >
        {offre.tier}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        {offre.name}
      </div>
      <div
        style={{
          fontSize: '0.88rem',
          color: dark ? 'var(--dark-muted)' : 'var(--mid)',
          marginBottom: '1.75rem',
          lineHeight: 1.7,
        }}
      >
        {offre.desc}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: '0.25rem',
          color: dark ? 'var(--gold-light)' : 'var(--ink)',
        }}
      >
        {offre.price}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: dark ? 'rgba(227,226,226,0.45)' : 'var(--mid)',
          marginBottom: '1.75rem',
        }}
      >
        {offre.duration}
      </div>
      <ul className="feature-list" style={{ marginBottom: '2rem' }}>
        {offre.features.map((f) => (
          <li
            key={f}
            style={{
              borderBottomColor: dark ? 'rgba(255,255,255,0.08)' : 'var(--border)',
              color: dark ? 'rgba(227,226,226,0.8)' : 'inherit',
            }}
          >
            {f}
          </li>
        ))}
      </ul>
      <a href="#contact" className={`card-cta${dark ? ' gold' : ''}`}>
        {offre.cta}
      </a>
    </motion.div>
  )
}

export default function Conseil() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="conseil" style={{ background: 'var(--paper)', padding: '6rem 4rem' }}>
      <div className="section-inner">
        <div className="section-tag">Conseil & AMOA</div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          Nos offres Conseil
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--mid)',
            maxWidth: 640,
            marginBottom: '3rem',
            lineHeight: 1.8,
          }}
        >
          Chaque mission est cadrée en livrables fermes + délai engagé + résultat cible chiffré.
          Pas de régie sans fin. Pas de jargon qui rassure plus le consultant que le client.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === i ? 'var(--ink)' : 'var(--mid)',
                borderBottom: `2px solid ${activeTab === i ? 'var(--gold)' : 'transparent'}`,
                marginBottom: '-1px',
                transition: 'all 0.2s',
                letterSpacing: '0.02em',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
          >
            {tabs[activeTab].offres.map((offre) => (
              <OffreCard key={offre.name} offre={offre} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
