import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const formules = [
  {
    name: 'Formule Essentielle',
    title: 'DSC Découverte',
    price: '18 000 MAD HT',
    period: '/ mois — 1 jour/semaine',
    features: [
      'Pilotage des indicateurs clés',
      'Réunion opérationnelle hebdomadaire',
      'Reporting mensuel direction',
      'Disponibilité 2h/semaine hors présentiel',
    ],
    cta: 'En savoir plus',
    featured: false,
  },
  {
    name: 'Formule Standard',
    title: 'DSC Opérationnel',
    price: '35 000 MAD HT',
    period: '/ mois — 2 jours/semaine',
    features: [
      'Pilotage complet de la fonction SC',
      "Encadrement équipes logistique/achats",
      "Gestion des projets d'amélioration",
      'Reporting CODIR mensuel',
      'Disponibilité 5h/semaine hors présentiel',
    ],
    cta: 'Réserver un échange',
    featured: true,
  },
  {
    name: 'Formule Premium',
    title: 'DSC Stratégique',
    price: '55 000 MAD HT',
    period: '/ mois — 3 jours/semaine',
    features: [
      'Direction stratégique Supply Chain',
      'Transformation et projets SI',
      'Représentation Comex / CA',
      'Recrutement et formation équipes',
      'Disponibilité quasi-full (hors engagement)',
    ],
    cta: 'Demander un devis',
    featured: false,
  },
]

function DSCCard({ formule, index }: { formule: (typeof formules)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const dark = formule.featured

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      style={{
        background: dark ? 'var(--dark)' : 'var(--card-bg)',
        border: `1px solid ${dark ? 'var(--dark)' : 'var(--border)'}`,
        padding: '2.5rem',
        position: 'relative',
        color: dark ? 'var(--dark-text)' : 'var(--ink)',
        transition: 'box-shadow 0.2s',
      }}
    >
      {dark && <div className="offer-badge">★ Le plus choisi</div>}
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: dark ? 'var(--gold-light)' : 'var(--gold)',
          marginBottom: '0.5rem',
        }}
      >
        {formule.name}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.4rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        {formule.title}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.8rem',
          color: dark ? 'var(--gold-light)' : 'var(--gold)',
          fontWeight: 900,
          margin: '1.25rem 0 0.25rem',
        }}
      >
        {formule.price}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: dark ? 'rgba(227,226,226,0.45)' : 'var(--mid)',
          marginBottom: '1.5rem',
        }}
      >
        {formule.period}
      </div>

      <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
        {formule.features.map((f) => (
          <li
            key={f}
            style={{
              fontSize: '0.88rem',
              padding: '0.5rem 0',
              borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              color: dark ? 'rgba(227,226,226,0.8)' : 'inherit',
            }}
          >
            <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>
            {f}
          </li>
        ))}
      </ul>

      <a href="#contact" className={`card-cta${dark ? ' gold' : ''}`}>
        {formule.cta}
      </a>
    </motion.div>
  )
}

export default function DSC() {
  return (
    <section id="dsc" style={{ background: 'var(--cream)', padding: '6rem 4rem' }}>
      <div className="section-inner">
        <div className="section-tag">Direction Supply Chain à Temps Partagé</div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          Un Directeur Supply Chain senior — sans le coût d&apos;un CDI
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--mid)',
            maxWidth: 640,
            marginBottom: '3.5rem',
            lineHeight: 1.8,
          }}
        >
          La solution idéale pour les PME et ETI qui ont besoin d&apos;un pilotage stratégique de leur
          supply chain sans recruter un DSC à temps plein.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {formules.map((f, i) => (
            <DSCCard key={f.title} formule={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
