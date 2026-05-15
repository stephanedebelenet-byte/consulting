import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const formations = [
  {
    num: '01',
    type: 'Formation intra-entreprise',
    title: 'Supply Chain Fondamentaux',
    desc: "Destiné aux équipes opérationnelles et managers non spécialistes. Couvre les flux, les stocks, le transport, les achats et les KPI essentiels. Format 1 à 2 jours en présentiel.",
    duration: '1–2 jours',
    audience: 'Équipes opérationnelles',
  },
  {
    num: '02',
    type: 'Formation intra-entreprise',
    title: 'S&OP & Planification Avancée',
    desc: "Pour les équipes planification, supply chain et commerce. Méthodologie S&OP classique + introduction au DDMRP. Cas pratiques tirés de votre entreprise si disponibles.",
    duration: '2 jours',
    audience: 'Équipes planification',
  },
  {
    num: '03',
    type: 'Atelier dirigeants',
    title: 'Supply Chain pour Décideurs',
    desc: "Séminaire d'une journée pour CODIR / DG / DAF. Comprendre les enjeux SC sans maîtriser le technique. Arbitrer un projet WMS/TMS/APS. Lire un business case. Poser les bonnes questions.",
    duration: '1 jour',
    audience: 'CODIR — DG — DAF',
  },
  {
    num: '04',
    type: 'Coaching individuel',
    title: 'Montée en compétence DSC',
    desc: "Pour les Directeurs Supply Chain ou Responsables Logistique souhaitant structurer leurs pratiques. Sessions mensuelles individualisées. Revue de vos KPIs, organisation, projets en cours.",
    duration: 'Sessions mensuelles',
    audience: 'DSC — Responsable Logistique',
  },
]

export default function Formation() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="formation"
      style={{ background: 'var(--ink)', padding: '8rem 4rem 0' }}
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag" style={{ color: 'rgba(212,168,67,0.9)' }}>
            Formation
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: 'var(--dark-text)',
            }}
          >
            Former les équipes qui font tourner votre Supply Chain
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--dark-muted)',
              maxWidth: 640,
              marginBottom: '5rem',
              lineHeight: 1.8,
            }}
          >
            15 ans d&apos;enseignement dans les meilleures écoles marocaines (TBS, ISCAE, HEM, ENCG, EMI).
            Des formations ancrées dans la réalité terrain marocaine.
          </p>
        </motion.div>

        {/* Sticky-stack cards */}
        <div>
          {formations.map((item, i) => (
            <StickyCard key={item.num} item={item} index={i} total={formations.length} />
          ))}
        </div>
      </div>

      {/* Bottom spacer to ensure last card is visible before next section */}
      <div style={{ height: '6rem' }} />
    </section>
  )
}

function StickyCard({
  item,
  index,
  total,
}: {
  item: (typeof formations)[0]
  index: number
  total: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      style={{
        position: 'sticky',
        top: `${80 + index * 24}px`,
        zIndex: index + 1,
        marginBottom: 2,
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: index % 2 === 0 ? 'var(--dark-2)' : 'var(--dark)',
          borderTop: index === 0 ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.07)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          borderBottom: index === total - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          padding: '3rem',
          display: 'grid',
          gridTemplateColumns: '220px 1fr auto',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Background watermark number */}
        <div
          style={{
            position: 'absolute',
            right: '3rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(5rem, 10vw, 9rem)',
            fontWeight: 900,
            color: 'rgba(184,146,42,0.05)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {item.num}
        </div>

        {/* Left: meta */}
        <div>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            {item.type}
          </div>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--dark-text)',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            {item.title}
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
            }}
          >
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                color: 'rgba(227,226,226,0.4)',
                textTransform: 'uppercase',
              }}
            >
              ⏱ {item.duration}
            </div>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                color: 'rgba(227,226,226,0.4)',
                textTransform: 'uppercase',
              }}
            >
              ↗ {item.audience}
            </div>
          </div>
        </div>

        {/* Center: description */}
        <p
          style={{
            fontSize: '0.92rem',
            color: 'var(--dark-muted)',
            lineHeight: 1.75,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {item.desc}
        </p>

        {/* Right: CTA */}
        <div style={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <a
            href="#contact"
            className="btn-outline"
            style={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'var(--dark-text)',
              whiteSpace: 'nowrap',
              fontSize: '0.82rem',
            }}
          >
            En savoir plus
          </a>
        </div>
      </motion.div>
    </div>
  )
}
