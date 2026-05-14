import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" style={{ background: 'var(--cream)', padding: '6rem 4rem' }}>
      <div className="section-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Prenons contact</div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Prêt à transformer votre Supply Chain en avantage compétitif ?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--mid)', lineHeight: 1.8 }}>
            Le premier échange est gratuit, dure 30 minutes, et n&apos;engage à rien.
          </p>

          <div
            style={{
              background: 'var(--dark)',
              color: 'var(--dark-text)',
              padding: '2.5rem',
              marginTop: '3rem',
              textAlign: 'left',
            }}
          >
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Vous repartez avec :
            </h3>
            <ul className="arrow-list">
              <li>Un premier diagnostic de vos enjeux Supply Chain</li>
              <li>2 à 3 leviers concrets à activer rapidement</li>
              <li>Une orientation claire sur les prochaines étapes — avec ou sans nous</li>
            </ul>
          </div>

          <motion.a
            href="mailto:contact@cabinet-sc.ma"
            whileHover={{ scale: 1.02 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--gold)',
              color: 'var(--paper)',
              padding: '1.1rem 2.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              borderRadius: '2px',
              marginTop: '2rem',
              transition: 'background 0.25s',
              letterSpacing: '0.02em',
            }}
          >
            🗓 Réserver mon échange découverte
          </motion.a>

          <ul
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
              listStyle: 'none',
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              📧{' '}
              <a
                href="mailto:contact@cabinet-sc.ma"
                style={{ color: 'var(--ink)', textDecoration: 'none' }}
              >
                contact@cabinet-sc.ma
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              📞{' '}
              <a href="tel:+212600000000" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                +212 6 00 00 00 00
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              📍 Casablanca, Maroc
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
