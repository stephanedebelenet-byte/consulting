import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SystemTier {
  label: string
  title: string
  desc: string
  price: string
  duration: string
}

interface System {
  id: string
  icon: string
  name: string
  fullName: string
  tiers: SystemTier[]
  results: string
}

const systems: System[] = [
  {
    id: 'wms',
    icon: '🏭',
    name: 'WMS',
    fullName: "WMS — Gestion d'entrepôt",
    tiers: [
      {
        label: '🔹 Mini',
        title: 'WMS Mini',
        desc: "1 entrepôt — 5 utilisateurs\nSolution SaaS clé en main (Logiwa, MetaWMS, Odoo)",
        price: '80 000 – 130 000 MAD HT',
        duration: '6 à 10 semaines',
      },
      {
        label: '🔸 Pilote ★',
        title: 'WMS Pilote',
        desc: "1-2 entrepôts • 1 500-5 000 m² • 5-15 utilisateurs\nAMOA complet + RFP + change management",
        price: '180 000 – 320 000 MAD HT',
        duration: '3 à 5 mois',
      },
      {
        label: '🔷 Pro',
        title: 'WMS Pro',
        desc: "ETI multi-sites • plus de 5 000 m² • plus de 15 utilisateurs\nAudit + RFP + AMOA full + intégration ERP",
        price: 'À partir de 450 000 MAD HT',
        duration: '6 à 10 mois',
      },
    ],
    results: "✓ Réduction des écarts d'inventaire de 80 à 95%  •  ✓ Productivité préparation +25 à 40%  •  ✓ Erreurs d'expédition −70 à 90%",
  },
  {
    id: 'tms',
    icon: '🚚',
    name: 'TMS',
    fullName: 'TMS — Gestion du transport',
    tiers: [
      {
        label: '🔹 Mini',
        title: 'TMS Mini',
        desc: "Moins de 10 véhicules ou 50 expéditions/jour\nSaaS léger + paramétrage + formation",
        price: '70 000 – 120 000 MAD HT',
        duration: '6 à 10 semaines',
      },
      {
        label: '🔸 Pilote ★',
        title: 'TMS Pilote',
        desc: "Flotte mixte • multi-clients\nAMOA + RFP + déploiement complet",
        price: '160 000 – 280 000 MAD HT',
        duration: '3 à 5 mois',
      },
      {
        label: '🔷 Pro',
        title: 'TMS Pro',
        desc: "ETI • flotte importante • multi-modes\nAudit + RFP + AMOA full + intégrations",
        price: 'À partir de 400 000 MAD HT',
        duration: '5 à 9 mois',
      },
    ],
    results: '✓ Réduction coûts transport 8 à 15%  •  ✓ Productivité dispatch +30 à 50%  •  ✓ Facturation transport ÷ 3 à 5',
  },
  {
    id: 'aps',
    icon: '📊',
    name: 'APS / S&OP',
    fullName: 'APS / Demand Planning / S&OP',
    tiers: [
      {
        label: '🔹 Mini',
        title: 'Planning Mini',
        desc: "PME mono-produit • moins de 500 SKU\nNetStock, EazyStock + paramétrage",
        price: '60 000 – 100 000 MAD HT',
        duration: '6 à 8 semaines',
      },
      {
        label: '🔸 Pilote ★',
        title: 'Planning Pilote',
        desc: "PME multi-canal • 500-3 000 SKU\nRefonte process + APS + S&OP",
        price: '150 000 – 260 000 MAD HT',
        duration: '3 à 5 mois',
      },
      {
        label: '🔷 Pro',
        title: 'Planning Pro (DDMRP)',
        desc: "ETI multi-sites • plus de 3 000 SKU\nAudit + IBP + AMOA + COPIL S&OP",
        price: 'À partir de 380 000 MAD HT',
        duration: '6 à 9 mois',
      },
    ],
    results: '✓ Réduction ruptures 40 à 60%  •  ✓ Réduction surstocks 20 à 30%  •  ✓ BFR libéré 15 à 30% du stock',
  },
  {
    id: 'procurement',
    icon: '🛒',
    name: 'e-Procurement',
    fullName: 'e-Procurement / Source-to-Pay',
    tiers: [
      {
        label: '🔹 Mini',
        title: 'Achats Mini',
        desc: "TPE/PME • moins de 50 fournisseurs actifs\nPO + catalogue + workflow validation",
        price: '55 000 – 95 000 MAD HT',
        duration: '6 à 8 semaines',
      },
      {
        label: '🔸 Pilote ★',
        title: 'Achats Pilote',
        desc: "PME • achats stratégiques + contrats\ne-RFx + gestion contrats + reporting",
        price: '140 000 – 240 000 MAD HT',
        duration: '3 à 5 mois',
      },
      {
        label: '🔷 Pro',
        title: 'Achats Pro (S2P)',
        desc: "ETI • multi-entités • directs + indirects\nS2P complet + ERP + risk management",
        price: 'À partir de 350 000 MAD HT',
        duration: '5 à 9 mois',
      },
    ],
    results: '✓ Visibilité 100% spend  •  ✓ Cycle achat ÷ 2 à 4  •  ✓ Économies 3 à 8% sur le spend traité',
  },
  {
    id: 'tower',
    icon: '📈',
    name: 'Control Tower',
    fullName: 'Control Tower & BI Supply Chain',
    tiers: [
      {
        label: '🔹 Mini',
        title: 'Control Tower Mini',
        desc: "3-5 dashboards clés sur Power BI\nOTIF, stocks, cash dormant, KPI fournisseurs",
        price: '45 000 – 75 000 MAD HT',
        duration: '4 à 6 semaines',
      },
      {
        label: '🔸 Pilote ★',
        title: 'Control Tower Pilote',
        desc: "8-12 dashboards + alertes + rituel COPIL\nDécisions Comex basées sur données",
        price: '110 000 – 180 000 MAD HT',
        duration: '2 à 3 mois',
      },
      {
        label: '🔷 Pro',
        title: 'Control Tower Pro',
        desc: "ETI • multi-sites • AI/ML embarqué\nPortail dirigeant mobile + alertes proactives",
        price: 'À partir de 280 000 MAD HT',
        duration: '4 à 6 mois',
      },
    ],
    results: '✓ Détection anomalies ÷ 5 à 10  •  ✓ Économies 2 à 5% marge supply chain  •  ✓ Plus de reportings manuels',
  },
]

export default function Systemes() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=600',
        pin: true,
        pinSpacing: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="systemes"
      ref={sectionRef}
      style={{ background: 'var(--dark-3)', padding: '6rem 4rem' }}
    >
      <div className="section-inner">
        <div className="section-tag" style={{ color: 'rgba(212,168,67,0.9)' }}>Systèmes & Digital</div>
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
          Déploiement de solutions SCM
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--dark-muted)',
            maxWidth: 640,
            marginBottom: '3rem',
            lineHeight: 1.8,
          }}
        >
          Sélection indépendante et déploiement AMOA des meilleures solutions — adaptées à votre taille
          et secteur. Aucune commission éditeur. Jamais.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2px',
          }}
        >
          {systems.map((sys, i) => (
            <motion.div
              key={sys.id}
              className="sys-card-item"
              onClick={() => setActive(i)}
              whileHover={{ y: -2 }}
              style={{
                background: active === i ? 'var(--gold)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === i ? 'var(--gold)' : 'rgba(255,255,255,0.07)'}`,
                padding: '2rem 1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: active === i ? 'var(--dark)' : 'var(--dark-text)',
              }}
            >
              <span style={{ fontSize: '1.8rem', marginBottom: '0.75rem', display: 'block' }}>
                {sys.icon}
              </span>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {sys.name}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--dark)',
              color: 'var(--dark-text)',
              padding: '3rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--paper)',
                marginBottom: '1.5rem',
              }}
            >
              {systems[active].fullName}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {systems[active].tiers.map((tier, i) => (
                <div
                  key={tier.title}
                  style={{
                    padding: '1.5rem',
                    border: `1px solid ${i === 1 ? 'rgba(184,146,42,0.4)' : 'rgba(255,255,255,0.1)'}`,
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
                    {tier.label}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--paper)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {tier.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(227,226,226,0.65)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {tier.desc}
                  </p>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.2rem',
                      color: 'var(--gold-light)',
                      fontWeight: 700,
                      marginTop: '1rem',
                    }}
                  >
                    {tier.price}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(227,226,226,0.4)', marginTop: '0.5rem' }}>
                    {tier.duration}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p style={{ fontSize: '0.85rem', color: 'rgba(227,226,226,0.6)' }}>
                {systems[active].results}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
