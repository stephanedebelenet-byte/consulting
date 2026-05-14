import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pilliers = [
  {
    icon: '🧠',
    title: "Le métier d'abord",
    desc: "Comprendre ce que fait vraiment votre supply chain avant de la transformer. Pas de diagnostic en 48h, pas de template générique.",
  },
  {
    icon: '⚙️',
    title: 'Les processus avant les outils',
    desc: "Décider ce qu'on doit faire différemment AVANT d'acheter un outil. Trop d'entreprises ont investi dans des logiciels qui ont amplifié leurs dysfonctionnements.",
  },
  {
    icon: '💻',
    title: 'La technologie adaptée, jamais surdimensionnée',
    desc: "Choisir et déployer la techno qui colle au reste, pas l'inverse. Pour une PME marocaine, Tier 1 ou Tier 2 dans 95% des cas.",
  },
]

const steps = [
  { num: '01', title: 'Assess', desc: 'Diagnostiquer en faits, pas en opinions' },
  { num: '02', title: 'Design', desc: 'Concevoir la cible avant de choisir les outils' },
  { num: '03', title: 'Digitize', desc: 'Sélectionner la technologie adaptée' },
  { num: '04', title: 'Transform', desc: 'Embarquer les équipes, ancrer les pratiques' },
  { num: '05', title: 'Optimize', desc: 'Mesurer, ajuster, faire vivre' },
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
  return (
    <section id="pourquoi" style={{ background: 'var(--cream)', padding: '6rem 4rem' }}>
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
            }}
          >
            La place vide que nous avons décidé d&apos;occuper
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
            La majorité des projets Supply Chain dérapent. Pas par manque d&apos;outils — il n&apos;en a
            jamais autant existé. Mais parce que personne, dans la chaîne, ne représente vraiment le client.
          </p>
        </FadeUp>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          <div>
            {pilliers.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.12}>
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      background: 'var(--ink)',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div
              style={{
                background: 'var(--dark)',
                color: 'var(--dark-text)',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  opacity: 0.06,
                }}
              />
              <blockquote
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'rgba(227,226,226,0.9)',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                « L&apos;éditeur vend sa solution. L&apos;intégrateur vend ses heures. La DSI gère sa
                technique. Et au milieu, le dirigeant de PME prend une décision à 500 000 MAD sans
                contre-pouvoir, sans benchmark indépendant, sans pilotage métier. »
              </blockquote>

              <div style={{ position: 'relative', zIndex: 2 }}>
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: i < steps.length - 1 ? '1rem' : 0,
                      paddingBottom: i < steps.length - 1 ? '1rem' : 0,
                      borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.72rem',
                        color: 'var(--gold)',
                        minWidth: 32,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {s.num}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(227,226,226,0.8)' }}>
                      <strong style={{ color: 'var(--dark-text)' }}>{s.title}</strong> — {s.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
