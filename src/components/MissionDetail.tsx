import { Link } from 'react-router-dom'
import { type Mission, FAMILLES } from '../data/missions'
import { BLOG_INDEX } from '../data/blogIndex'
import { foldText } from '../data/offerLinks'

// Page d'une mission (/missions/<id>). Le JSON-LD Service + FAQPage est écrit
// dans le <head> par routeMeta.ts ; la FAQ est rendue ici en clair pour que
// les robots qui ne lisent pas le JavaScript la trouvent dans le HTML prérendu.

const h2: React.CSSProperties = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  lineHeight: 0.98,
  letterSpacing: '-0.025em',
  color: 'var(--navy)',
  margin: '0 0 1.75rem',
}
const eyebrow: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--blue-bright)',
  marginBottom: '1rem',
}
const body: React.CSSProperties = { fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.85, color: 'var(--ink)', fontWeight: 300 }
const list: React.CSSProperties = { ...body, margin: 0, paddingLeft: '1.2rem' }

function section(bg: string): React.CSSProperties {
  return { background: bg, padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }
}

/** Articles du blog dont l'adresse correspond au motif de la mission (6 au plus). */
function relatedArticles(x: Mission, max = 6) {
  return BLOG_INDEX.filter((post) => x.motif.test(foldText(post.slug))).slice(0, max)
}

export default function MissionDetail({ x }: { x: Mission }) {
  const famille = FAMILLES.find((f) => f.id === x.famille)
  const articles = relatedArticles(x)
  const contact = `/contact?sujet=${encodeURIComponent(x.court)}`

  return (
    <>
      <section style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <p style={{ ...body, fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', margin: 0 }}>{x.accroche}</p>
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { label: 'Pour qui', val: x.pourQui },
              { label: 'Durée', val: x.duree },
              { label: 'Budget', val: x.prix },
            ].map((c) => (
              <div key={c.label} style={{ background: '#fff', padding: '1.1rem 1.3rem' }}>
                <div style={{ ...eyebrow, fontSize: '0.52rem', marginBottom: '0.35rem' }}>{c.label}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', fontWeight: 500, color: 'var(--navy)' }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={section('#fff')}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <div style={eyebrow}>Ce qui déclenche la mission</div>
          <h2 style={h2}>Pourquoi maintenant.</h2>
          <ul style={list}>{x.declencheurs.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      </section>

      <section style={section('var(--cream, #f3f0e9)')}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <div style={eyebrow}>Livrables</div>
          <h2 style={h2}>Ce que vous obtenez.</h2>
          <ul style={list}>{x.livrables.map((d) => <li key={d}>{d}</li>)}</ul>
          <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', margin: '2.25rem 0 0.75rem' }}>Déroulé</h3>
          <ol style={list}>{x.etapes.map((d) => <li key={d}>{d}</li>)}</ol>
        </div>
      </section>

      {x.versions && (
        <section style={section('#fff')}>
          <div className="section-inner" style={{ maxWidth: 860 }}>
            <div style={eyebrow}>Formules</div>
            <h2 style={h2}>Choisir le périmètre.</h2>
            <div style={{ display: 'grid', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
              {x.versions.map((v) => (
                <div key={v.nom} style={{ background: '#fff', padding: '1.4rem clamp(1.25rem, 3vw, 2rem)' }}>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>{v.nom}</div>
                  <p style={{ ...body, margin: '0.4rem 0' }}>{v.contenu}</p>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--blue-bright)' }}>{v.duree} · {v.prix}</div>
                </div>
              ))}
            </div>
            <p style={{ ...body, fontSize: '0.9rem', marginTop: '1.25rem', color: 'var(--mid)' }}>
              Prix indicatifs hors taxes, ajustés au périmètre (sites, références, fournisseurs). Devis ferme après un premier échange.
            </p>
          </div>
        </section>
      )}

      {(x.limites || x.formations?.length || x.liens?.length) && (
        <section style={section('var(--paper)')}>
          <div className="section-inner" style={{ maxWidth: 860 }}>
            {x.limites && (
              <p style={{ ...body, margin: '0 0 2rem' }}><strong style={{ fontWeight: 600 }}>À savoir.</strong> {x.limites}</p>
            )}
            {!!x.formations?.length && (
              <>
                <div style={eyebrow}>Former les équipes</div>
                <ul style={{ ...list, marginBottom: '2rem' }}>
                  {x.formations.map((f) => <li key={f.to}><Link to={f.to}>{f.label}</Link></li>)}
                </ul>
              </>
            )}
            {!!x.liens?.length && (
              <>
                <div style={eyebrow}>Missions complémentaires</div>
                <ul style={list}>{x.liens.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
              </>
            )}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section style={section('#fff')}>
          <div className="section-inner" style={{ maxWidth: 860 }}>
            <div style={eyebrow}>À lire</div>
            <h2 style={h2}>Pour approfondir le sujet.</h2>
            <ul style={list}>
              {articles.map((a) => <li key={a.slug}><Link to={`/blog/${a.slug}`}>{a.title}</Link></li>)}
            </ul>
          </div>
        </section>
      )}

      <section style={section('var(--cream, #f3f0e9)')}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <div style={eyebrow}>Questions fréquentes</div>
          <h2 style={h2}>FAQ — {x.court}.</h2>
          {x.faq.map((f) => (
            <div key={f.q} style={{ borderTop: '1px solid var(--border)', padding: '1.6rem 0' }}>
              <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.02rem', fontWeight: 600, color: 'var(--navy)', margin: '0 0 0.5rem' }}>{f.q}</h3>
              <p style={{ ...body, fontSize: '0.96rem', color: 'var(--mid)', margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 860 }}>
          <h2 style={{ ...h2, color: '#fff', margin: '0 0 1.25rem' }}>En parler 30 minutes.</h2>
          <p style={{ ...body, color: 'rgba(235,232,225,0.65)', margin: '0 0 2rem' }}>
            Un premier échange gratuit pour préciser le périmètre et le calendrier. Réponse sous 24 heures.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={contact} style={{ display: 'inline-flex', padding: '1rem 2.25rem', background: 'var(--blue-bright)', color: '#fff', fontFamily: 'Jost, sans-serif', fontWeight: 600, textDecoration: 'none' }}>
              Demander un échange →
            </Link>
            <Link to="/missions" style={{ display: 'inline-flex', padding: '1rem 2.25rem', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontFamily: 'Jost, sans-serif', fontWeight: 600, textDecoration: 'none' }}>
              Toutes les missions
            </Link>
          </div>
          {famille && (
            <p style={{ ...body, fontSize: '0.9rem', color: 'rgba(235,232,225,0.5)', marginTop: '2rem' }}>
              Famille : {famille.label}. {famille.accroche}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
