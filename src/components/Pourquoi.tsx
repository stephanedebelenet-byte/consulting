import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../i18n/locale'

gsap.registerPlugin(ScrollTrigger)

const pilliers = [
  {
    num: '01',
    title: "Le métier d'abord.",
    desc: "Comprendre ce que fait vraiment votre supply chain avant de la transformer. Pas de diagnostic en 48h, pas de template générique appliqué à la va-vite.",
  },
  {
    num: '02',
    title: 'Les processus avant les outils.',
    desc: "Décider ce qu'on doit faire différemment AVANT d'acheter un outil. Trop d'entreprises ont investi dans des logiciels qui ont amplifié leurs dysfonctionnements.",
  },
  {
    num: '03',
    title: 'La technologie adaptée, jamais surdimensionnée.',
    desc: "Choisir et déployer la techno qui colle au réel, pas l'inverse. Pour une PME marocaine, Tier 1 ou Tier 2 dans 95% des cas. Jamais SAP quand Odoo suffit.",
  },
]

const pilliers_en = [
  {
    num: '01',
    title: 'The business first.',
    desc: "Understanding what your supply chain actually does before transforming it. No 48-hour diagnosis, no generic template applied in a rush.",
  },
  {
    num: '02',
    title: 'Process before tools.',
    desc: "Deciding what needs to change BEFORE buying a tool. Too many companies have invested in software that amplified their dysfunctions.",
  },
  {
    num: '03',
    title: 'Technology that fits, never oversized.',
    desc: "Choosing and deploying tech that matches reality, not the other way round. For a Moroccan SME, Tier 1 or Tier 2 in 95% of cases. Never SAP when Odoo is enough.",
  },
]

const steps = [
  {
    num: '01',
    title: 'Assess',
    sub: 'Diagnostiquer en faits',
    desc: "Cartographier l'existant, identifier les vraies causes racines, mesurer l'écart entre le potentiel et la réalité terrain.",
  },
  {
    num: '02',
    title: 'Design',
    sub: 'Concevoir la cible',
    desc: "Définir le schéma cible processus, organisation et SI — avant de choisir les outils. La cible d'abord, la technologie ensuite.",
  },
  {
    num: '03',
    title: 'Digitize',
    sub: 'Sélectionner la technologie',
    desc: "Rédiger le cahier des charges, animer les RFP, recommander en toute indépendance. Notre seule allégeance est au business case.",
  },
  {
    num: '04',
    title: 'Transform',
    sub: "Embarquer les équipes",
    desc: "AMOA, conduite du changement, pilotage intégrateur, tests de recette, go-live maîtrisé. Nous représentons vos intérêts à chaque étape.",
  },
  {
    num: '05',
    title: 'Optimize',
    sub: 'Mesurer et faire vivre',
    desc: "KPIs, revues S&OP, ajustements continus — parce que la transformation ne s'arrête pas au go-live. Elle commence vraiment là.",
  },
]

const steps_en = [
  {
    num: '01',
    title: 'Assess',
    sub: 'Diagnose with facts',
    desc: "Mapping the current state, identifying real root causes, measuring the gap between potential and reality on the ground.",
  },
  {
    num: '02',
    title: 'Design',
    sub: 'Design the target',
    desc: "Defining the target process, organization and IS blueprint — before choosing tools. The target first, technology second.",
  },
  {
    num: '03',
    title: 'Digitize',
    sub: 'Select the technology',
    desc: "Drafting the specification, running the RFPs, recommending with full independence. Our only allegiance is to the business case.",
  },
  {
    num: '04',
    title: 'Transform',
    sub: 'Bring teams on board',
    desc: "Project management assistance, change management, integrator oversight, acceptance testing, controlled go-live. We represent your interests at every step.",
  },
  {
    num: '05',
    title: 'Optimize',
    sub: 'Measure and sustain',
    desc: "KPIs, S&OP reviews, continuous adjustments — because transformation doesn't stop at go-live. That's really where it begins.",
  },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Pourquoi() {
  const methodRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { locale, tr, href } = useLocale()
  const displayPilliers = locale === 'en' ? pilliers_en : pilliers
  const displaySteps = locale === 'en' ? steps_en : steps

  useEffect(() => {
    // Le scroll-jack horizontal pinné est un pattern desktop — sous 640px il
    // fuit hors de son conteneur (débordement horizontal constaté sur toute
    // la page) et l'UX de scroll-jack au toucher est de toute façon mauvaise.
    // Le CSS mobile (index.css) bascule la piste en scroll horizontal natif à la place.
    if (window.innerWidth < 640) return
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
      {/* ── Pilliers ── */}
      <section id="pourquoi" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(47,111,181,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              {tr('01 / Notre approche', '01 / Our approach')}
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                marginBottom: '2rem',
                maxWidth: 16,
              }}
            >
              {tr("La place vide que nous avons décidé d'occuper.", 'The empty seat we decided to fill.')}
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--mid)',
                maxWidth: 540,
                marginBottom: '6rem',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              {tr(
                "La majorité des projets Supply Chain dérapent. Pas par manque d'outils — il n'en a jamais autant existé. Mais parce que personne, dans la chaîne, ne représente vraiment le client.",
                "Most Supply Chain projects go off track. Not for lack of tools — there have never been more of them. But because no one in the chain truly represents the client."
              )}
            </p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayPilliers.map((p, i) => (
              <FadeUp key={p.num} delay={i * 0.1}>
                <div
                  className="pilliers-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 1.8fr',
                    gap: '3rem',
                    alignItems: 'start',
                    padding: '3rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    color: 'rgba(47,111,181,0.5)',
                    textTransform: 'uppercase',
                    paddingTop: '0.35rem',
                  }}>
                    {p.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.8rem)',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: '-0.015em',
                      color: 'var(--ink)',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--mid)',
                      lineHeight: 1.8,
                      fontWeight: 300,
                      maxWidth: 480,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement line ── */}
      <div style={{
        background: 'var(--dark-2)',
        padding: 'var(--sp-y-sm) var(--sp-x)',
        overflow: 'hidden',
      }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 6.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: 'var(--blue-bright)',
            }}
          >
            {tr(<>110 missions. Un seul parti pris&nbsp;: votre résultat.</>, <>110 missions. One single conviction&nbsp;: your results.</>)}
          </motion.div>
        </div>
      </div>

      {/* ── Méthode 5 étapes — horizontal scroll ── */}
      <div ref={methodRef} style={{ background: 'var(--navy)' }}>
        <div
          className="method-outer"
          style={{
            height: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 5rem',
            overflow: 'hidden',
          }}
        >
          <div style={{ marginBottom: '3rem', flexShrink: 0 }}>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(192,154,47,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              {tr('02 / Notre méthode', '02 / Our method')}
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--paper)',
              }}
            >
              Assess · Design · Digitize
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>
                Transform · Optimize.
              </span>
            </h2>
          </div>

          <div className="method-track-wrap" style={{ overflow: 'visible', flexShrink: 0 }}>
            <div ref={trackRef} className="method-track" style={{ display: 'flex', gap: '1px', width: 'max-content' }}>
              {displaySteps.map((step, idx) => (
                <div
                  key={step.num}
                  style={{
                    width: '34vw',
                    minWidth: 340,
                    background: idx === 2 ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                    borderTop: `2px solid ${idx === 2 ? 'var(--gold)' : 'rgba(255,255,255,0.06)'}`,
                    padding: '3rem',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    color: idx === 2 ? 'rgba(10,20,32,0.55)' : 'rgba(192,154,47,0.55)',
                    textTransform: 'uppercase',
                    marginBottom: '3rem',
                  }}>
                    {tr(`Étape ${step.num}`, `Step ${step.num}`)}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 'clamp(2.5rem, 3.5vw, 4.5rem)',
                      fontWeight: 800,
                      lineHeight: 0.92,
                      letterSpacing: '-0.02em',
                      color: idx === 2 ? '#0e1f30' : 'var(--paper)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: idx === 2 ? 'rgba(10,20,32,0.5)' : 'rgba(192,154,47,0.5)',
                    marginBottom: '2rem',
                  }}>
                    {step.sub}
                  </div>
                  <p style={{
                    fontSize: '0.92rem',
                    color: idx === 2 ? 'rgba(10,20,32,0.65)' : 'rgba(245,243,238,0.65)',
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}

              <div style={{
                width: '34vw',
                minWidth: 340,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '3rem',
                flexShrink: 0,
              }}>
                <h3 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.8rem, 2.5vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--paper)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                }}>
                  {tr(<>Prêt à diagnostiquer votre supply chain&nbsp;?</>, <>Ready to diagnose your supply chain&nbsp;?</>)}
                </h3>
                <p style={{
                  fontSize: '0.92rem',
                  color: 'rgba(245,243,238,0.65)',
                  marginBottom: '2.5rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}>
                  {tr(
                    'Un premier échange de 30 minutes, sans engagement, pour qualifier votre situation.',
                    'A first 30-minute conversation, no commitment, to assess your situation.'
                  )}
                </p>
                <a href={href('/contact')} className="btn-primary-gold" style={{ width: 'fit-content' }}>
                  {tr('Réserver un échange gratuit →', 'Book a free conversation →')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
