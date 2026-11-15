import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import { FAMILLES, missionsDe } from '../data/missions'

// Catalogue des missions (/missions), regroupées par ce qui les déclenche.
export default function MissionsPage() {
  return (
    <>
      <PageMeta
        title="Missions de conseil achats et logistique au Maroc"
        description="Conformité, normes, exigences clients, filiales de groupes, coûts, investissement et audit : 42 missions de conseil, avec durée et budget indicatif."
        canonical="https://nextinotech.com/missions"
      />
      <PageHero
        num="M"
        title="Missions de conseil."
        subtitle="Classées selon ce qui vous amène : une échéance, un client, un coût, un projet."
        tag="NEXTINOTECH CONSEIL"
        bg="var(--paper)"
        breadcrumb={{ label: 'Conseil', to: '/conseil' }}
      />
      {FAMILLES.map((f, i) => (
        <section key={f.id} id={f.id} style={{ background: i % 2 ? '#fff' : 'var(--cream, #f3f0e9)', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
          <div className="section-inner" style={{ maxWidth: 1000 }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 0.75rem' }}>
              {f.label}.
            </h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300, margin: '0 0 2rem', maxWidth: 720 }}>{f.accroche}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
              {missionsDe(f.id).map((x) => (
                <Link key={x.id} to={`/missions/${x.id}`} style={{ background: '#fff', padding: '1.4rem 1.5rem', textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.02rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem' }}>{x.titre}</div>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--mid)', fontWeight: 300, marginBottom: '0.75rem' }}>{x.accroche}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'var(--blue-bright)' }}>{x.duree} · {x.prix}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner" style={{ maxWidth: 1000, fontFamily: 'Jost, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300 }}>
          Aussi : <Link to="/diagnostic-supply-chain">diagnostic supply chain</Link>, <Link to="/conseil">stocks, achats et schéma logistique</Link>,{' '}
          <Link to="/accompagnement-oea">statut OEA</Link>, <Link to="/direction-supply-chain-temps-partage">direction supply chain à temps partagé</Link> et{' '}
          <Link to="/formation">formations finançables CSF / GIAC</Link>. Prix indicatifs hors taxes.
        </div>
      </section>
    </>
  )
}
