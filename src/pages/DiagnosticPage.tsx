import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { diagnosticTiers } from '../data/diagnostic'

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        num="01"
        title="Audit logistique et diagnostic supply chain"
        titleItalic="au Maroc"
        tag="NEXTINOTECH CONSEIL"
        subtitle="Identifiez les causes des ruptures, des surstocks et des retards. Nos consultants vous remettent une feuille de route pour améliorer vos opérations."
        breadcrumb={{ label: 'Conseil', to: '/conseil' }}
      />
      <section style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner" style={{ lineHeight: 1.75 }}>
          <p><Link to="/contact">Réserver un échange de 30 minutes</Link></p>

          <h2>Dans quels cas lancer un audit logistique ?</h2>
          <p>Vous constatez des écarts de stock, des retards de préparation ou des coûts difficiles à expliquer. Vous envisagez un nouvel entrepôt ou un WMS. Le diagnostic examine les flux, des approvisionnements à la livraison, pour chiffrer les écarts et choisir où intervenir en premier.</p>

          <h2>Comment se déroule la mission ?</h2>
          <ol>
            <li><strong>Cadrage.</strong> Nous définissons les sites, les flux et les indicateurs à examiner.</li>
            <li><strong>Analyse.</strong> Nous rapprochons les données des observations sur le terrain et des échanges avec vos équipes.</li>
            <li><strong>Restitution.</strong> Vous recevez une synthèse des causes, des leviers chiffrés et une feuille de route par ordre de priorité. Nous présentons les recommandations à votre direction.</li>
          </ol>

          <h2>Combien coûte un diagnostic supply chain au Maroc ?</h2>
          <ul>
            {diagnosticTiers.map(({ name, price, duration }) => (
              <li key={name}><strong>{name}</strong> · {duration} · {price}</li>
            ))}
          </ul>
          <p>Le nombre de sites, les flux concernés et le niveau d’analyse déterminent le format de la mission.</p>

          <h2>Que préparer pour le premier échange ?</h2>
          <p>Indiquez les sites concernés, le problème observé et le résultat recherché. Selon le périmètre, des historiques de stocks, de commandes ou de livraisons pourront servir à l’analyse.</p>
          <p><Link to="/contact">Parler de votre projet</Link>{' · '}<Link to="/references">Voir les missions réalisées</Link>{' · '}<Link to="/conseil">Voir les offres Conseil</Link></p>
        </div>
      </section>
    </>
  )
}
