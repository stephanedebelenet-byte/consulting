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
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                viewBox="0 0 300 400"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Background */}
                <rect width="300" height="400" fill="var(--dark)" />

                {/* Overlapping geometric hexagons — logistics/industrial aesthetic */}
                <polygon
                  points="150,30 210,65 210,135 150,170 90,135 90,65"
                  fill="none"
                  stroke="rgba(184,146,42,0.12)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="150,10 225,52.5 225,147.5 150,190 75,147.5 75,52.5"
                  fill="none"
                  stroke="rgba(184,146,42,0.07)"
                  strokeWidth="1"
                />
                <polygon
                  points="150,220 200,248 200,304 150,332 100,304 100,248"
                  fill="none"
                  stroke="rgba(184,146,42,0.10)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="80,260 120,282 120,326 80,348 40,326 40,282"
                  fill="none"
                  stroke="rgba(184,146,42,0.08)"
                  strokeWidth="1"
                />
                <polygon
                  points="230,240 265,260 265,300 230,320 195,300 195,260"
                  fill="none"
                  stroke="rgba(184,146,42,0.08)"
                  strokeWidth="1"
                />

                {/* Subtle grid */}
                <defs>
                  <pattern id="profil-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M30 0 L0 0 0 30" fill="none" stroke="rgba(184,146,42,0.04)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="300" height="400" fill="url(#profil-grid)" />

                {/* Stylized abstract person — circle head + rectangle body */}
                <circle
                  cx="150"
                  cy="145"
                  r="28"
                  fill="none"
                  stroke="rgba(184,146,42,0.4)"
                  strokeWidth="2"
                />
                <rect
                  x="118"
                  y="180"
                  width="64"
                  height="72"
                  rx="6"
                  fill="none"
                  stroke="rgba(184,146,42,0.4)"
                  strokeWidth="2"
                />
                {/* Collar line */}
                <path
                  d="M132 180 L150 200 L168 180"
                  fill="none"
                  stroke="rgba(184,146,42,0.3)"
                  strokeWidth="1.5"
                />

                {/* Supply chain floating icons */}

                {/* Truck — top left area */}
                <g transform="translate(38, 68)" stroke="rgba(184,146,42,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <rect x="0" y="4" width="22" height="14" rx="1.5" />
                  <path d="M22 8 L30 8 L34 14 L34 18 L22 18 Z" />
                  <circle cx="7" cy="20" r="3" />
                  <circle cx="27" cy="20" r="3" />
                </g>

                {/* Warehouse box — top right area */}
                <g transform="translate(228, 60)" stroke="rgba(184,146,42,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <rect x="0" y="6" width="28" height="20" rx="1.5" />
                  <path d="M0 6 L14 0 L28 6" />
                  <line x1="14" y1="0" x2="14" y2="6" />
                  <line x1="7" y1="14" x2="21" y2="14" />
                </g>

                {/* Chart — bottom right area */}
                <g transform="translate(222, 310)" stroke="rgba(184,146,42,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <polyline points="0,22 8,14 14,18 24,6" />
                  <polyline points="20,6 24,6 24,10" />
                  <line x1="0" y1="26" x2="26" y2="26" />
                  <line x1="0" y1="0" x2="0" y2="26" />
                </g>

                {/* Ship — bottom left area */}
                <g transform="translate(32, 310)" stroke="rgba(184,146,42,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <path d="M4 16 Q14 22 26 16" />
                  <rect x="8" y="8" width="16" height="10" rx="1" />
                  <line x1="16" y1="2" x2="16" y2="8" />
                  <path d="M10 8 L16 4 L22 8" />
                </g>

                {/* Connecting dots between person and icons */}
                <circle cx="60" cy="120" r="1.5" fill="rgba(184,146,42,0.2)" />
                <circle cx="240" cy="120" r="1.5" fill="rgba(184,146,42,0.2)" />
                <circle cx="60" cy="290" r="1.5" fill="rgba(184,146,42,0.2)" />
                <circle cx="240" cy="290" r="1.5" fill="rgba(184,146,42,0.2)" />
                <line x1="60" y1="120" x2="118" y2="155" stroke="rgba(184,146,42,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="240" y1="120" x2="182" y2="155" stroke="rgba(184,146,42,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="290" x2="118" y2="245" stroke="rgba(184,146,42,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="240" y1="290" x2="182" y2="245" stroke="rgba(184,146,42,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
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
