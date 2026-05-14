import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const formations = [
  {
    type: 'Formation intra-entreprise',
    title: 'Supply Chain Fondamentaux',
    desc: "Destiné aux équipes opérationnelles et managers non spécialistes. Couvre les flux, les stocks, le transport, les achats et les KPI essentiels. Format 1 à 2 jours en présentiel.",
  },
  {
    type: 'Formation intra-entreprise',
    title: 'S&OP & Planification Avancée',
    desc: "Pour les équipes planification, supply chain et commerce. Méthodologie S&OP classique + introduction au DDMRP. Cas pratiques tirés de votre entreprise si disponibles.",
  },
  {
    type: 'Atelier dirigeants',
    title: 'Supply Chain pour Décideurs',
    desc: "Séminaire d'une journée pour CODIR / DG / DAF. Comprendre les enjeux SC sans maîtriser le technique. Arbitrer un projet WMS/TMS/APS. Lire un business case. Poser les bonnes questions.",
  },
  {
    type: 'Coaching individuel',
    title: 'Montée en compétence DSC',
    desc: "Pour les Directeurs Supply Chain ou Responsables Logistique souhaitant structurer leurs pratiques. Sessions mensuelles individualisées. Revue de vos KPIs, organisation, projets en cours.",
  },
]

function Card({ item, index }: { item: (typeof formations)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        padding: '2.5rem',
      }}
    >
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.75rem',
        }}
      >
        {item.type}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
        }}
      >
        {item.title}
      </div>
      <div style={{ fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.7 }}>{item.desc}</div>
    </motion.div>
  )
}

export default function Formation() {
  return (
    <section id="formation" style={{ background: 'var(--paper)', padding: '6rem 4rem' }}>
      <div className="section-inner">
        <div className="section-tag">Formation</div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          Former les équipes qui font tourner votre Supply Chain
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
          15 ans d&apos;enseignement dans les meilleures écoles marocaines (TBS, ISCAE, HEM, ENCG, EMI).
          Des formations ancrées dans la réalité terrain marocaine.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {formations.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
