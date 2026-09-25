import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import { IconPrinter, IconRadar2, IconBarcode } from '@tabler/icons-react'

const POINTS = [
  {
    icon: IconPrinter,
    title: 'Marquage & codage industriel',
    desc: "Conseil et fourniture d'imprimantes à jet d'encre continu pour le marquage réglementaire — dates de péremption, numéros de lot, codes-barres. Agroalimentaire, pharmacie, industrie.",
  },
  {
    icon: IconRadar2,
    title: 'RFID & traçabilité',
    desc: "Identification et suivi sans contact des actifs, palettes et équipements — de la réception à l'expédition, en temps réel.",
  },
  {
    icon: IconBarcode,
    title: 'Intégration au terrain',
    desc: "Conseil sur le choix du matériel adapté à votre cadence, votre secteur et vos contraintes d'hygiène, fourniture et installation.",
  },
]

export default function MarquageTracabilitePage() {
  return (
    <>
      <PageMeta
        title="Marquage Industriel & Traçabilité RFID au Maroc | Nextinotech"
        description="Conseil, fourniture et intégration de solutions de marquage industriel et de traçabilité RFID pour entrepôts et sites de production au Maroc."
        canonical="https://nextinotech.com/solutions/marquage-et-tracabilite"
      />
      <PageHero
        num="17"
        title="Marquage &"
        titleItalic="traçabilité."
        subtitle="Imprimantes de codage industriel et solutions RFID — conseil, fourniture et mise en œuvre, pour vos exigences de traçabilité terrain."
        tag="SOLUTIONS · MARQUAGE & RFID"
        bg="var(--paper)"
      />

      <div style={{ background: 'var(--paper)', padding: '0 var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              background: 'var(--border)',
              maxWidth: 1100,
            }}
          >
            {POINTS.map((p) => (
              <div key={p.title} style={{ background: '#fff', padding: '2.5rem 2rem' }}>
                <p.icon size={24} stroke={1.6} color="var(--blue-bright)" style={{ marginBottom: '1.25rem' }} />
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.6rem' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--dark)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div
          className="section-inner"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'var(--ink)',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
              }}
            >
              Un besoin de marquage ou de traçabilité ?
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300 }}>
              Décrivez-nous votre site et votre cadence — devis sous 48h.
            </div>
          </div>
          <Link to="/contact" className="btn-primary">
            Nous consulter →
          </Link>
        </div>
      </div>
    </>
  )
}
