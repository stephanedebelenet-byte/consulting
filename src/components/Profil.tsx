import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    year: 'Depuis 2024',
    role: 'Fondateur du Cabinet',
    org: 'Cabinet Conseil Supply Chain — Maroc',
    desc: "Conseil indépendant et AMOA en Supply Chain pour PME et ETI marocaines. Aucune commission éditeur. Tarifs transparents. Résultats mesurés.",
  },
  {
    year: '2020 — Mission Nationale',
    role: 'Expert Supply Chain COVID-19',
    org: 'Task Force Vaccination — Maroc',
    desc: "Expert métier bénévole pour la Task Force vaccination nationale. DDMRP, AMOA SI, gouvernance risques, cold chain national à l'échelle du Royaume.",
  },
  {
    year: 'Groupe Addoha',
    role: 'Directeur Supply Chain Trade',
    org: 'Groupe Addoha — Maroc',
    desc: "31 chantiers simultanés. 710 millions MAD d'achats annuels. Économies réalisées : 11%. Transformation complète de la fonction supply chain groupe.",
  },
  {
    year: 'DHL Supply Chain',
    role: 'Directeur de Site & Ingénieur Solutions',
    org: 'DHL Supply Chain — Maroc',
    desc: "Direction de site (21 000 m², 120 personnes, P&L complet). Ingénierie des solutions logistiques pour L'Oréal, Nestlé, Mars, Renault, Huawei, OCP, Marjane.",
  },
  {
    year: 'Renault-Nissan',
    role: 'Conception Greenfield Logistique',
    org: 'Renault-Nissan — Tanger',
    desc: "Conception greenfield du site industriel de Tanger. Logistique amont, flux assemblage, standards SPR Groupe Renault. Référence rare au Maroc.",
  },
  {
    year: '15 ans en parallèle',
    role: 'Enseignant en Grandes Écoles',
    org: 'TBS, ISCAE, HEM, ENCG, EMI, EHTP, ENSA, ENSAM',
    desc: "Formation des futures générations de supply chain managers marocains. Une double culture — terrain et académique — rare dans l'écosystème conseil.",
  },
  {
    year: 'Expert International',
    role: 'Expert National',
    org: 'European Training Foundation',
    desc: "Expert national pour la réforme de la gouvernance logistique régionale au Maroc. Reconnaissance internationale du niveau d'expertise.",
  },
]

function TimelineItem({ item, index }: { item: (typeof timeline)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      style={{ position: 'relative', marginBottom: '2.5rem' }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-2rem',
          top: 8,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--gold)',
          transform: 'translateX(-3.5px)',
        }}
      />
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}
      >
        {item.year}
      </div>
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.05rem',
          fontWeight: 700,
          marginBottom: '0.25rem',
        }}
      >
        {item.role}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--mid)', marginBottom: '0.5rem' }}>{item.org}</div>
      <div style={{ fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.7 }}>{item.desc}</div>
    </motion.div>
  )
}

export default function Profil() {
  const leftRef = useRef(null)
  const inView = useInView(leftRef, { once: true })

  return (
    <section id="profil" style={{ background: 'var(--paper)', padding: '6rem 4rem' }}>
      <div className="section-inner">
        <div className="section-tag">À propos</div>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '3rem',
          }}
        >
          L&apos;expérience qui compte
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'sticky', top: '6rem' }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'var(--dark)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40 L40 0 M-10 10 L10 -10 M30 50 L50 30" stroke="#fff" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag)" />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  color: 'rgba(245,243,238,0.25)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>👤</span>
                Photo professionnelle
              </div>
            </div>

            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '0.25rem',
              }}
            >
              [Prénom Nom]
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              Fondateur — Cabinet Conseil Supply Chain
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['ENSA Agadir', 'KEDGE / UM6P', 'DDMRP Certified', '15+ ans terrain'].map((b) => (
                <span key={b} className="badge">{b}</span>
              ))}
            </div>
          </motion.div>

          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 8,
                bottom: 0,
                width: 1,
                background: 'var(--border)',
              }}
            />
            {timeline.map((item, i) => (
              <TimelineItem key={`${item.role}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
