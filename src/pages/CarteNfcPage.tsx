import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import { IconNfc, IconShare2, IconQrcode } from '@tabler/icons-react'

const POINTS = [
  {
    icon: IconNfc,
    title: 'Un tap, un profil complet',
    desc: 'Approchez la carte d’un téléphone : coordonnées, LinkedIn, portfolio et calendrier de rendez-vous s’ouvrent instantanément, sans application à installer.',
  },
  {
    icon: IconQrcode,
    title: 'QR code de secours',
    desc: 'Un QR code imprimé au dos couvre les téléphones sans NFC activé — la carte fonctionne dans tous les cas.',
  },
  {
    icon: IconShare2,
    title: 'Mise à jour à distance',
    desc: 'Changez de poste, de numéro ou de lien sans réimprimer une seule carte : le contenu se met à jour en ligne.',
  },
]

export default function CarteNfcPage() {
  return (
    <>
      <PageMeta
        title="Carte de Visite Digitale NFC au Maroc | Nextinotech"
        description="Carte de visite digitale NFC avec QR code de secours : partagez vos coordonnées et votre profil professionnel en un tap. Pour consultants, commerciaux et cadres supply chain."
        canonical="https://nextinotech.com/solutions/carte-visite-digitale-nfc"
      />
      <PageHero
        num="18"
        title="Carte de visite"
        titleItalic="digitale."
        subtitle="Un tap suffit à partager vos coordonnées, votre profil et vos liens professionnels — sans jamais être à court de cartes."
        tag="SOLUTIONS · NETWORKING NFC"
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
                color: '#f0ede8',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
              }}
            >
              Envie d'essayer ?
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(235,232,225,0.55)', fontWeight: 300 }}>
              Pour vous-même ou pour toute une équipe — sur devis.
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
