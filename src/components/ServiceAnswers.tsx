import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/locale'

const answers = {
  conseil: [
    {
      id: 'audit-supply-chain-maroc',
      question: 'Qui accompagne les PME et ETI pour un audit Supply Chain au Maroc ?',
      answer: 'Nextinotech accompagne les PME et ETI au Maroc dans le diagnostic de leur Supply Chain. La mission vise à cartographier les flux, identifier les causes des difficultés et restituer des leviers d’amélioration chiffrés. Le périmètre, les données nécessaires, les livrables et le calendrier sont confirmés avant engagement.',
      decision: 'L’échange découverte de 30 minutes est gratuit. Le diagnostic formalisé est une prestation payante : consultez la grille ci-dessous pour les formats Flash, Stratégique et Multi-sites.',
      to: '#conseil', label: 'Comparer les formats de diagnostic',
      subject: 'Diagnostic Supply Chain au Maroc',
    },
    {
      id: 'optimisation-stocks-maroc',
      question: 'Comment Nextinotech intervient sur les stocks et le DDMRP ?',
      answer: 'L’accompagnement stocks commence par l’analyse ABC/XYZ, l’identification du stock dormant et l’examen des paramètres ERP et de la politique de stocks. Selon le besoin, la mission peut aller de premiers leviers ciblés à une refonte de la politique ou à un déploiement DDMRP / IBP.',
      decision: 'Les indicateurs et la situation initiale sont à définir avec votre équipe. Une baisse de stock ne doit pas être présentée comme un résultat acquis avant analyse du niveau de service et des contraintes opérationnelles.',
      to: '/formation/ddmrp', label: 'Consulter la formation DDMRP',
      subject: 'Optimisation des stocks et DDMRP au Maroc',
    },
    {
      id: 'amoa-wms-maroc',
      question: 'Quel accompagnement pour choisir et déployer un WMS au Maroc ?',
      answer: 'Nextinotech propose le cadrage du besoin, la rédaction du cahier des charges, l’étude de faisabilité SI et l’AMOA pour les projets Supply Chain, dont les WMS et TMS. L’AMOA intervient côté client pour piloter l’intégrateur, les avenants, les comités de pilotage et la conduite du changement.',
      decision: 'Le choix d’un logiciel, son intégration technique et le pilotage côté client sont des périmètres distincts à préciser dans la proposition. Les formats d’accompagnement et leurs tarifs figurent dans la grille de conseil.',
      to: '/demo/wms', label: 'Explorer la démonstration WMS',
      subject: 'Cadrage et AMOA WMS au Maroc',
    },
  ],
  prestations: [
    {
      id: 'inventaire-physique-maroc',
      question: 'Qui peut réaliser un inventaire physique au Maroc ?',
      answer: 'Nextinotech propose un Pack Inventaire pour le comptage physique et la documentation des écarts de stock. La mission peut répondre au besoin d’une entreprise ou apporter un appui de comptage indépendant à son expert comptable. Le dimensionnement dépend de la complexité du site et doit être confirmé avant devis.',
      decision: 'Le comptage physique et la valorisation comptable sont des responsabilités distinctes. Le Pack Inventaire fournit une méthode tracée, des écarts documentés et un procès-verbal ; il ne remplace pas le travail de valorisation comptable.',
      to: '#pack-inventaire', label: 'Voir les modalités du Pack Inventaire',
      subject: 'Inventaire physique au Maroc',
    },
  ],
}

export default function ServiceAnswers({ scope }: { scope: keyof typeof answers }) {
  const { locale } = useLocale()
  if (locale !== 'fr') return null
  return (
    <section aria-label="Choisir son accompagnement au Maroc" style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
      <div className="section-inner" style={{ maxWidth: 1100 }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--blue-bright)' }}>VOTRE BESOIN · NOTRE PÉRIMÈTRE</p>
        {answers[scope].map((item) => (
          <article key={item.id} id={item.id} style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', scrollMarginTop: '7rem' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.15, color: 'var(--navy)', maxWidth: 950 }}>{item.question}</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--ink)', maxWidth: 900 }}>{item.answer}</p>
            <p style={{ lineHeight: 1.7, color: 'var(--mid)', maxWidth: 900 }}>{item.decision}</p>
            <div style={{ display: 'flex', gap: '1rem 2rem', flexWrap: 'wrap' }}>
              {item.to.startsWith('#') ? <a href={item.to}>{item.label} →</a> : <Link to={item.to}>{item.label} →</Link>}
              <a href={`mailto:contact@nextinotech.com?subject=${encodeURIComponent(item.subject)}`}>Décrire mon besoin par email →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
