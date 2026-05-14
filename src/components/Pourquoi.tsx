import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pilliers = [
  {
    num: '01',
    title: "Le métier d'abord",
    desc: "Comprendre ce que fait vraiment votre supply chain avant de la transformer. Pas de diagnostic en 48h, pas de template générique.",
  },
  {
    num: '02',
    title: 'Les processus avant les outils',
    desc: "Décider ce qu'on doit faire différemment AVANT d'acheter un outil. Trop d'entreprises ont investi dans des logiciels qui ont amplifié leurs dysfonctionnements.",
  },
  {
    num: '03',
    title: 'La technologie adaptée, jamais surdimensionnée',
    desc: "Choisir et déployer la techno qui colle au reste, pas l'inverse. Pour une PME marocaine, Tier 1 ou Tier 2 dans 95% des cas.",
  },
]

const steps = [
  {
    num: '01',
    title: 'Assess',
    sub: 'Diagnostiquer en faits',
    desc: "Cartographier l'existant, identifier les vraies causes racines, mesurer l'écart entre le potentiel et la réalité terrain.",
    accent: false,
  },
  {
    num: '02',
    title: 'Design',
    sub: 'Concevoir la cible',
    desc: "Définir le schéma cible processus, organisation et SI — avant de choisir les outils. La cible d'abord, la technologie ensuite.",
    accent: false,
  },
  {
    num: '03',
    title: 'Digitize',
    sub: 'Sélectionner la technologie',
    desc: "Rédiger le cahier des charges, animer les RFP, recommander sans aucune commission éditeur. Notre seule allégeance est au business case.",
    accent: true,
  },
  {
    num: '04',
    title: 'Transform',
    sub: "Embarquer les équipes",
    desc: "AMOA, conduite du changement, pilotage intégrateur, tests de recette, go-live maîtrisé. Nous représentons vos intérêts à chaque étape.",
    accent: false,
  },
  {
    num: '05',
    title: 'Optimize',
    sub: 'Mesurer et faire vivre',
    desc: "KPIs, revues S&OP, ajustements continus — parce que la transformation ne s'arrête pas au go-live. Elle commence vraiment là.",
    accent: false,
  },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Pourquoi() {
  const methodRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = methodRef.current
      const track = trackRef.current
      if (!section || !track) return

      const scrollDist = track.scrollWidth - window.innerWidth + 160

      if (scrollDist <= 0) return

      gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDist}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Three pilliers ── */}
      <section id="pourquoi" style={{ background: 'var(--cream)', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag">Pourquoi nous</div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1rem',
                maxWidth: 700,
              }}
            >
              La place vide que nous avons décidé d&apos;occuper
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--mid)',
                maxWidth: 580,
                marginBottom: '5rem',
                lineHeight: 1.8,
              }}
            >
              La majorité des projets Supply Chain dérapent. Pas par manque d&apos;outils — il
              n&apos;en a jamais autant existé. Mais parce que personne, dans la chaîne, ne représente
              vraiment le client.
            </p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
            }}
          >
            {pilliers.map((p, i) => (
              <FadeUp key={p.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: i === 1 ? 'var(--ink)' : 'var(--card-bg)',
                    color: i === 1 ? 'var(--dark-text)' : 'var(--ink)',
                    padding: '3rem 2.5rem',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderTop: i === 1 ? '3px solid var(--gold)' : '3px solid transparent',
                    cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--gold)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {p.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: '1rem',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: i === 1 ? 'var(--dark-muted)' : 'var(--mid)',
                      lineHeight: 1.7,
                    }}
                  >
                    {p.desc}
                  </p>
                  {i === 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -40,
                        right: -40,
                        width: 160,
                        height: 160,
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        opacity: 0.05,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Méthode 5 étapes — horizontal-on-vertical ── */}
      <div ref={methodRef} style={{ background: 'var(--dark)' }}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 5rem',
            overflow: 'hidden',
          }}
        >
          {/* Section header */}
          <div style={{ marginBottom: '3.5rem', flexShrink: 0 }}>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span
                style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)', flexShrink: 0 }}
              />
              Notre méthode
            </div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: 'var(--dark-text)',
                marginBottom: '0.3em',
              }}
            >
              Assess · Design · Digitize
            </h2>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                fontWeight: 900,
                fontStyle: 'italic',
                color: 'var(--gold)',
              }}
            >
              Transform · Optimize
            </div>
          </div>

          {/* Horizontal track */}
          <div style={{ overflow: 'visible', flexShrink: 0 }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                gap: '2px',
                width: 'max-content',
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    width: '36vw',
                    minWidth: 360,
                    background: step.accent ? 'var(--gold)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${step.accent ? 'var(--gold)' : 'rgba(255,255,255,0.07)'}`,
                    padding: '3rem',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Large background number */}
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(5rem, 10vw, 8rem)',
                      fontWeight: 900,
                      color: step.accent ? 'rgba(18,20,20,0.1)' : 'rgba(184,146,42,0.06)',
                      lineHeight: 1,
                      position: 'absolute',
                      top: '1rem',
                      right: '1.5rem',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: step.accent ? 'rgba(18,20,20,0.55)' : 'var(--gold)',
                      textTransform: 'uppercase',
                      marginBottom: '2rem',
                    }}
                  >
                    Étape {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      color: step.accent ? 'var(--dark)' : 'var(--dark-text)',
                      marginBottom: '0.4rem',
                      lineHeight: 1.1,
                    }}
                  >
                    {step.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: step.accent ? 'rgba(18,20,20,0.6)' : 'rgba(227,226,226,0.5)',
                      marginBottom: '1.25rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {step.sub}
                  </div>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: step.accent ? 'rgba(18,20,20,0.65)' : 'var(--dark-muted)',
                      lineHeight: 1.75,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}

              {/* Terminal CTA card */}
              <div
                style={{
                  width: '36vw',
                  minWidth: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '3rem',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: 'var(--dark-text)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.3,
                  }}
                >
                  Prêt à diagnostiquer votre supply chain ?
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--dark-muted)',
                    marginBottom: '2rem',
                    lineHeight: 1.7,
                  }}
                >
                  Un premier échange de 45 minutes, sans engagement, pour qualifier votre situation.
                </p>
                <a
                  href="#contact"
                  className="btn-primary"
                  style={{ background: 'var(--gold)', color: 'var(--dark)', width: 'fit-content' }}
                >
                  Réserver un échange gratuit →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
