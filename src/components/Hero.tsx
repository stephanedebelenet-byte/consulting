import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function SplitReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

const stats = [
  { num: '15+', label: "Années d'expérience" },
  { num: '3', label: 'Dimensions couvertes' },
  { num: '100%', label: 'Indépendant' },
  { num: '0', label: 'Commission éditeurs' },
]

export default function Hero() {
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(rightRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        paddingTop: 80,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 4rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          className="section-tag"
          style={{ marginBottom: '2rem' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Cabinet de conseil indépendant — Maroc
        </motion.div>

        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ display: 'block' }}>
            <SplitReveal text="Nous ne vendons aucun logiciel." delay={0.3} />
          </span>
          <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--gold)', marginTop: '0.2rem' }}>
            <SplitReveal text="Nous représentons les vôtres." delay={0.7} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            fontSize: '1.05rem',
            color: 'var(--mid)',
            maxWidth: 420,
            marginBottom: '3rem',
            lineHeight: 1.8,
          }}
        >
          Cabinet indépendant de conseil et d&apos;AMOA en Supply Chain, dédié aux PME et ETI marocaines.
          Notre seule allégeance est à votre business case. Pas à un éditeur, pas à un intégrateur.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <a href="#contact" className="btn-primary">🗓 Réserver un échange gratuit →</a>
          <a href="#conseil" className="btn-outline">Nos offres</a>
        </motion.div>
      </div>

      <div
        ref={rightRef}
        style={{
          position: 'relative',
          background: 'var(--dark)',
          padding: '4rem',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cross" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L20 40 M0 20 L40 20" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cross)" />
        </svg>

        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'var(--gold)',
            opacity: 0.07,
            filter: 'blur(60px)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: '-0.8rem',
              }}
            >
              &ldquo;
            </div>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'rgba(227,226,226,0.9)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              La technologie n&apos;est jamais la solution. C&apos;est un amplificateur. Elle amplifie une
              organisation saine vers la performance, ou une organisation chaotique vers la catastrophe.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {stats.map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(227,226,226,0.55)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontFamily: 'DM Mono, monospace',
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
