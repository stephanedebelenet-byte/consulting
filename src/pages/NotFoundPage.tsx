import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

// Page servie pour toute adresse inexistante. Côté serveur, Vercel la renvoie
// avec un vrai statut HTTP 404 (dist/404.html, voir vite.config.ts et
// scripts/prerender-app-bodies.mjs) au lieu de l'ancienne page d'accueil en
// 200 — ce qui créait des "soft 404" : des milliers d'URLs potentielles
// dupliquant l'accueil aux yeux de Google.

const LINKS = [
  { to: '/', label: 'Accueil', desc: 'Le cabinet, nos offres et nos références.' },
  { to: '/conseil', label: 'Conseil', desc: 'Diagnostic, stocks et DDMRP, achats, schéma logistique, AMOA.' },
  { to: '/formation', label: 'Formations', desc: '30 programmes Supply Chain, Lean, Management, Finance, Projet.' },
  { to: '/prestations', label: 'Prestations', desc: 'Inventaires, services logistiques à valeur ajoutée, Control Tower.' },
  { to: '/blog', label: 'Blog', desc: 'Plus de 400 articles Supply Chain, Logistique et Achats au Maroc.' },
  { to: '/contact', label: 'Contact', desc: 'Un échange sous 24h, Casablanca.' },
]

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        num="404"
        title="Page"
        titleItalic="introuvable."
        subtitle="Cette adresse n'existe pas ou n'existe plus. Voici les rubriques principales du site."
        tag="ERREUR · 404"
        bg="var(--paper)"
      />
      <section style={{ background: 'var(--paper)', padding: '2rem 4rem 8rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 900 }}>
            {LINKS.map((l) => (
              <li key={l.to} style={{ borderTop: '1px solid var(--border)' }}>
                <Link
                  to={l.to}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '2rem',
                    padding: '1.75rem 0',
                    color: 'var(--navy)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600 }}>{l.label}</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', fontWeight: 300, textAlign: 'right' }}>{l.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
