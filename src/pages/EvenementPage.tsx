import { useParams, Navigate, Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Evenement from '../components/Evenement'
import { EVENEMENTS } from '../data/evenements'

export default function EvenementPage() {
  const { slug } = useParams<{ slug: string }>()
  const meta = EVENEMENTS.find((e) => e.slug === slug)

  if (!meta) return <Navigate to="/blog" replace />

  const canonical = `https://nextinotech.com/evenements/${meta.slug}`

  return (
    <>
      <PageMeta title={meta.title} description={meta.description} canonical={canonical} />
      <PageHero
        num="16"
        title="Événement"
        titleItalic="Nextinotech."
        subtitle={meta.description}
        tag="WEBINAIRE GRATUIT · EN LIGNE"
        bg="var(--paper)"
      />
      <Evenement file={meta.file} canonical={canonical} />

      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
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
              Une question avant de vous inscrire ?
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300 }}>
              Écrivez-nous — réponse sous 24h.
            </div>
          </div>
          <Link to="/contact" className="btn-primary">
            Nous contacter →
          </Link>
        </div>
      </div>
    </>
  )
}
