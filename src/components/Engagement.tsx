import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    icon: '⚖️',
    title: 'Indépendance totale',
    desc: 'Nous ne touchons aucune commission de tout éditeur, intégrateur ou fournisseur. Notre rémunération vient exclusivement de vous.',
  },
  {
    icon: '💡',
    title: 'Transparence des prix',
    desc: 'Toutes nos offres standardisées sont affichées publiquement avec leur tarif. Pas de "nous reviendrons vers vous après évaluation interne".',
  },
  {
    icon: '🎯',
    title: 'Engagement sur résultats',
    desc: 'Sur les missions à fort enjeu (Achats, Stocks), nous proposons une part de rémunération indexée sur le gain réel mesuré.',
  },
  {
    icon: '🔒',
    title: 'Confidentialité absolue',
    desc: 'Aucun nom de client ne sera jamais cité sans accord écrit. Les références publiques sont celles que nos clients souhaitent rendre publiques.',
  },
]

export default function Engagement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="engagement" style={{ background: 'var(--dark)', color: 'var(--dark-text)', padding: '6rem 4rem' }}>
      <div className="section-inner" ref={ref}>
        <div className="section-tag" style={{ color: 'rgba(212,168,67,0.9)' }}>
          Notre engagement éthique
        </div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '3rem',
            color: 'var(--dark-text)',
          }}
        >
          Ce qui nous distingue vraiment
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              style={{
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '1.25rem', display: 'block' }}>
                {item.icon}
              </span>
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--dark-text)',
                  marginBottom: '0.75rem',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(227,226,226,0.6)', lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
