import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Pourquoi from '../components/Pourquoi'
import Conseil from '../components/Conseil'
import DimensionnementCTA from '../components/DimensionnementCTA'
import Systemes from '../components/Systemes'
import DSCTeaser from '../components/DSCTeaser'
import Methode from '../components/Methode'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PRESTATIONS_ANCHORS } from '../components/ServicesRedirect'
import { useLocale } from '../i18n/locale'
import ServiceAnswers from '../components/ServiceAnswers'
import { FAMILLES, MISSIONS, missionsDe } from '../data/missions'

export default function ConseilPage() {
  // Anciens liens /services#pack-inventaire etc. : le 301 serveur
  // /services -> /conseil conserve l'ancre, on la renvoie vers /prestations.
  const { hash } = useLocation()
  const navigate = useNavigate()
  const { tr, locale, href } = useLocale()
  useEffect(() => {
    if (PRESTATIONS_ANCHORS.includes(hash)) navigate(`/prestations${hash}`, { replace: true })
  }, [hash, navigate])

  return (
    <>
      <PageHero
        num="01"
        title={tr('Cabinet de conseil en logistique et supply chain', 'Supply Chain Consulting')}
        titleItalic={tr('au Maroc.', 'in Morocco.')}
        subtitle={tr(
          'Nextinotech accompagne les PME et ETI marocaines qui font face à des ruptures, du surstock ou des retards. Depuis Casablanca, nos consultants interviennent du diagnostic à la mise en œuvre sur vos flux, vos stocks et vos outils logistiques.',
          'Diagnosis, DDMRP, system selection and deployment, part-time supply chain direction — with no allegiance to any vendor.'
        )}
        tag={tr('NEXTINOTECH CONSEIL · TERRAIN', 'NEXTINOTECH CONSULTING · FIELD-TESTED')}
      />
      {locale === 'fr' && (
        <section style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
          <div className="section-inner">
            <h2>Par où commencer pour améliorer votre logistique ?</h2>
            <p>Un diagnostic identifie les causes de vos écarts et chiffre les actions à engager. Si le besoin est déjà défini, nous vous accompagnons sur la politique de stocks, la planification ou le déploiement d’un WMS.</p>
            <p><Link to="/diagnostic-supply-chain">Découvrir le diagnostic supply chain</Link>{' · '}<Link to={href('/contact')}>Parler de mon projet</Link></p>
            <p>Sur une plateforme logistique de 21 000 m² présentée dans nos références, la productivité a progressé de 35 % et le taux de service a atteint 98,5 %. <Link to="/references">Voir les missions logistiques</Link>.</p>
          </div>
        </section>
      )}
      {locale === 'fr' && (
        <section style={{ background: '#fff', padding: 'var(--sp-y-sm) var(--sp-x)', borderTop: '1px solid var(--border)' }}>
          <div className="section-inner">
            <h2>Nos missions de conseil, classées par déclencheur.</h2>
            <p>
              {MISSIONS.length} missions en achats, logistique et finance, chacune avec sa durée, ses livrables et un budget indicatif HT.{' '}
              <Link to="/missions">Voir toutes les missions</Link>.
            </p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.5rem 2rem', listStyle: 'none', padding: 0, margin: '1.5rem 0 0' }}>
              {FAMILLES.map((f) => (
                <li key={f.id}>
                  <Link to={`/missions#${f.id}`}>{f.label}</Link>{' '}
                  <span style={{ color: 'var(--muted, #6b6b6b)' }}>({missionsDe(f.id).length})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <ServiceAnswers scope="conseil" />
      <Pourquoi />
      <Statement text={tr('Le bon logiciel ne vaut rien sans la bonne méthode.', 'The right software is worthless without the right method.')} bg="var(--paper)" />
      <Conseil />
      <DimensionnementCTA />
      <Systemes />
      <DSCTeaser />
      <Methode />
    </>
  )
}
