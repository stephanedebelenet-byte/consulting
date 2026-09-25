import { useState, useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { IconBrandWhatsapp, IconPhoneCall } from '@tabler/icons-react'
import SchemaScript from './SchemaHelper'
import LogoMarquee from './LogoMarquee'
import { METIERS_CATALOGUE } from '../data/catalogueMetiers'
import { trackConversion } from '../utils/analytics'

const WA_LINK = `https://wa.me/212663449200?text=${encodeURIComponent(
  "Bonjour Nextinotech, je souhaite un diagnostic pour l'ingénierie de formation de mon entreprise.",
)}`
const TEL_LINK = 'tel:+212663449200'

const EXPERIENCE_STATS = [
  { value: '20+', label: 'Ans de terrain Supply Chain & Achats' },
  { value: '110+', label: 'Missions de conseil réalisées au Maroc' },
  { value: '100%', label: 'Dossiers de financement acceptés à ce jour' },
]

function ExperienceBar() {
  return (
    <div style={{ background: 'var(--paper)', padding: '2.5rem var(--sp-x)', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
      <div
        className="section-inner ing-experience-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
      >
        {EXPERIENCE_STATS.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--blue-bright)', lineHeight: 1, marginBottom: '0.5rem' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--mid)', lineHeight: 1.5, fontWeight: 300 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CallToActionBar() {
  return (
    <div style={{ background: 'var(--dark-2)', padding: '2rem var(--sp-x)' }}>
      <div
        className="section-inner"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
      >
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.9rem 1.75rem', background: '#25d366', color: '#fff', textDecoration: 'none',
            fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700,
          }}
        >
          <IconBrandWhatsapp size={20} stroke={2} />
          Discuter sur WhatsApp
        </a>
        <a
          href={TEL_LINK}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.9rem 1.75rem', background: 'var(--navy)', color: '#fff',
            border: '1px solid var(--navy)', textDecoration: 'none',
            fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700,
          }}
        >
          <IconPhoneCall size={20} stroke={2} />
          +212 06 63 44 92 00
        </a>
      </div>
    </div>
  )
}

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  )
}

/* ─── Data ───────────────────────────────────────────────── */
interface Activity {
  code: string
  title: string
  livrable: string
}
interface Phase {
  num: string
  name: string
  duration: string
  activities: Activity[]
}

const PHASES: Phase[] = [
  {
    num: '01',
    name: "Diagnostic de l'entreprise",
    duration: '1 à 2 semaines',
    activities: [
      { code: 'A', title: 'Identité & activité', livrable: "Fiche signalétique, organigramme, effectifs, métiers et circuits de décision." },
      { code: 'B', title: 'Entretiens terrain', livrable: 'Entretiens individuels avec la direction et les responsables de chaque département ou site.' },
      { code: 'C', title: 'Analyse RH', livrable: "Pyramide des âges, ancienneté, turnover, répartition des postes — pour situer les risques de perte de savoir-faire." },
    ],
  },
  {
    num: '02',
    name: 'Identification des besoins en compétences',
    duration: '2 à 3 semaines',
    activities: [
      { code: 'A', title: 'Analyse stratégique', livrable: "Cartographie des parties intéressées, contexte externe (PESTEL) et interne (SWOT), pour relier la formation aux vrais enjeux de croissance." },
      { code: 'B', title: 'Écarts de compétences', livrable: "Cartographie des compétences par poste ou département, et identification des écarts liés aux dysfonctionnements observés sur le terrain." },
      { code: 'C', title: 'Priorisation', livrable: "Liste consolidée des axes de formation, classés par urgence et par impact sur les objectifs de l'entreprise." },
    ],
  },
  {
    num: '03',
    name: 'Élaboration du plan de formation',
    duration: '2 à 3 semaines',
    activities: [
      { code: 'A', title: 'Cahier des charges', livrable: 'Fiches techniques par action de formation : objectifs, public cible, durée, modalités.' },
      { code: 'B', title: 'Budget & financement', livrable: "Budget consolidé et montage du dossier de prise en charge auprès du GIAC sectoriel et/ou de l'OFPPT." },
      { code: 'C', title: "Système d'évaluation", livrable: "Grille d'évaluation à chaud et à froid, et indicateurs de suivi (taux d'accès à la formation, heures par salarié, effort financier)." },
    ],
  },
  {
    num: '04',
    name: 'Rapport final & mise en œuvre',
    duration: '1 semaine',
    activities: [
      { code: 'A', title: 'Rapport de mission', livrable: "Document consolidé remis à la direction, intégrant diagnostic, plan de formation chiffré et dossier de financement." },
      { code: 'B', title: 'Validation', livrable: 'Présentation et arbitrage avec la direction générale, ajustements si nécessaire.' },
      { code: 'C', title: 'Déploiement', livrable: "Mise en œuvre des actions retenues — par Nextinotech ou par l'organisme de formation de votre choix — et suivi des indicateurs." },
    ],
  },
]

const LIVRABLES = [
  "Rapport de diagnostic (SWOT, PESTEL, cartographie des compétences)",
  'Plan de formation chiffré, hiérarchisé par urgence et par impact',
  "Dossier de financement prêt à déposer auprès du GIAC sectoriel et/ou de l'OFPPT",
  'Fiches techniques détaillées pour chaque action de formation retenue',
  "Système d'évaluation (à chaud / à froid) et tableau de bord de suivi",
]

const FAQS = [
  {
    q: "Qu'est-ce qu'une ingénierie de formation, concrètement ?",
    a: "C'est une méthode structurée qui part des vrais besoins de votre entreprise — stratégie, dysfonctionnements terrain, écarts de compétences — pour construire un plan de formation chiffré et priorisé, plutôt que d'acheter des formations au hasard des catalogues.",
  },
  {
    q: 'Est-ce finançable ?',
    a: "Oui. Au Maroc, une partie du coût peut être pris en charge par le GIAC de votre secteur (GIAC TRANSLOG pour le transport et la logistique, ou l'organisme équivalent de votre branche) et par l'OFPPT via la Taxe de Formation Professionnelle. Nous montons le dossier de prise en charge avec vous.",
  },
  {
    q: 'Combien de temps dure la mission ?',
    a: 'Comptez 6 à 8 semaines pour une entreprise de 50 à 150 collaborateurs, du premier entretien à la remise du rapport final — variable selon le nombre de sites et de départements à couvrir.',
  },
  {
    q: 'Faut-il ensuite passer par Nextinotech pour les formations ?',
    a: "Non. Le plan de formation vous appartient. Vous êtes libre de le déployer avec l'organisme de formation de votre choix. Notre seule obligation contractuelle porte sur le diagnostic et le plan — c'est aussi pour cela que nous ne touchons aucune commission sur les formations recommandées.",
  },
  {
    q: 'Que se passe-t-il si le dossier de financement est refusé ?',
    a: "À ce jour, 100% des dossiers de financement que nous avons accompagnés ont été acceptés — parce que nous vérifions votre éligibilité réelle (adhésion GIAC, situation TFP/CNSS) dès le premier échange, avant tout engagement, et que nous ne montons pas de dossier qui n'a pas de chances raisonnables d'aboutir.",
  },
  {
    q: 'Mes données RH et financières sont-elles protégées ?',
    a: "Oui. Le diagnostic implique des données sensibles (masse salariale, organisation, pyramide des âges). Elles sont traitées de façon confidentielle, conformément à la loi 09-08 sur la protection des données personnelles, et l'accès à votre dossier sur NextiSuivi est réservé à votre équipe et à votre consultant.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ingénierie de Formation',
  serviceType: 'Diagnostic des besoins en compétences et élaboration du plan de formation',
  provider: { '@type': 'ProfessionalService', name: 'Nextinotech' },
  areaServed: { '@type': 'Country', name: 'Maroc' },
  description: "Mission de conseil en ingénierie de formation : diagnostic des besoins en compétences, cartographie des écarts, élaboration du plan de formation chiffré et montage du dossier de financement GIAC/OFPPT, pour les entreprises de la Supply Chain, du transport et de la logistique au Maroc.",
}

/* ─── Formulaire de contact — Formspree, même schéma que les autres
   landing pages du site (formation-rl, formation-import, contact). ── */
type FormState = 'idle' | 'sending' | 'success' | 'error'

function LeadForm() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', entreprise: '', effectif: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = 'Obligatoire'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.tel.trim()) e.tel = 'Obligatoire'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mqpzpqwj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          formulaire: 'Demande de diagnostic — Ingénierie de Formation',
          nom: form.nom,
          email: form.email,
          téléphone: form.tel,
          entreprise: form.entreprise || 'Non renseignée',
          effectif: form.effectif || 'Non renseigné',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) trackConversion()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): CSSProperties => ({
    width: '100%',
    background: '#ffffff',
    border: `1px solid ${errors[field] ? 'rgba(200,60,60,0.55)' : 'var(--border)'}`,
    padding: '0.85rem 1rem',
    color: 'var(--navy)',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  })

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '2.5rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Demande reçue.
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0 }}>
          Nous revenons vers vous sous 24h ouvrées pour caler un premier échange.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div>
        <input type="text" placeholder="Nom complet *" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} style={inputStyle('nom')} />
        {errors.nom && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.nom}</div>}
      </div>
      <div>
        <input type="email" placeholder="Email professionnel *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle('email')} />
        {errors.email && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.email}</div>}
      </div>
      <div className="frl-2col" style={{ gap: '1.1rem' }}>
        <div>
          <input type="tel" placeholder="Téléphone *" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} style={inputStyle('tel')} />
          {errors.tel && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.tel}</div>}
        </div>
        <input type="text" placeholder="Entreprise" value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} style={inputStyle('entreprise')} />
      </div>
      <input type="text" placeholder="Effectif approximatif (ex : 50 à 100 personnes)" value={form.effectif} onChange={e => setForm({ ...form, effectif: e.target.value })} style={inputStyle('effectif')} />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '1rem 2rem', background: 'var(--blue-bright)', color: '#ffffff', border: 'none',
          fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700,
          letterSpacing: '0.03em', cursor: status === 'sending' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.2s, opacity 0.2s',
          marginTop: '0.25rem',
        }}
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Demander mon diagnostic gratuit →'}
      </button>
      {status === 'error' && (
        <div style={{ fontSize: '0.8rem', color: '#c83c3c' }}>
          Une erreur est survenue. Réessayez, ou écrivez-nous directement à contact@nextinotech.com.
        </div>
      )}
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em', color: 'var(--mid)' }}>
        Premier échange gratuit et sans engagement — 30 minutes.
      </div>
    </form>
  )
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      style={{ padding: '2.5rem 1.75rem', borderRight: index < 3 ? '1px solid rgba(27,53,84,0.08)' : 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: 36, height: 36, border: '1px solid rgba(47,111,181,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em',
          color: 'var(--blue-bright)', flexShrink: 0,
        }}>
          {phase.num}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)' }}>
          {phase.duration}
        </div>
      </div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '1.5rem', minHeight: '3em' }}>
        {phase.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {phase.activities.map((a) => (
          <div key={a.code} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--blue-bright)', flexShrink: 0 }}>{a.code}.</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)' }}>{a.title}</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, margin: 0, paddingLeft: '1rem' }}>
              {a.livrable}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function IngenierieFormation() {
  return (
    <>
      <SchemaScript schema={schema} />

      {/* ── INTRO / ACCROCHE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp) var(--sp-x) var(--sp-y-sm)' }}>
        <div className="section-inner">
          <FadeUp>
            <div className="section-tag"><span>Conseil RH · Ingénierie de Formation</span></div>
          </FadeUp>
          <div className="dsc-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginTop: '1.5rem' }}>
            <FadeUp delay={0.05}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.6rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0 }}>
                Former vos équipes,
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>pas au hasard du catalogue.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                Croissance rapide, turnover, management intermédiaire qui manque d&apos;autonomie, budget de formation dépensé sans lien avec la stratégie : ce sont les symptômes d&apos;un plan de formation absent ou mal construit. L&apos;ingénierie de formation part de vos vrais besoins — pas d&apos;un catalogue — pour transformer ce budget en investissement mesurable.
              </p>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)' }} />
                Diagnostic terrain · Plan de formation · Dossier GIAC / OFPPT
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <CallToActionBar />
      <ExperienceBar />

      {/* ── CALLOUT ── */}
      <div style={{ background: 'var(--paper)', paddingBottom: 'var(--sp-y-sm)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ borderLeft: '3px solid var(--blue-bright)', padding: '0.5rem 0 0.5rem 1.75rem', maxWidth: 760 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, fontStyle: 'italic', margin: 0 }}>
                Notre engagement : un rapport qui relie chaque action de formation recommandée à un objectif stratégique ou à un dysfonctionnement identifié sur le terrain — pas une liste de programmes tirée d&apos;un catalogue.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── CATALOGUE PAR MÉTIER (teaser) ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.55)', marginBottom: '1rem' }}>
              Le catalogue
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.25rem', maxWidth: 640 }}>
              Un plan de formation ne se limite pas à un seul métier.
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, maxWidth: 680, marginBottom: '2.25rem' }}>
              Supply Chain, management, finance, RH, marketing, production, qualité… le diagnostic couvre l&apos;ensemble des métiers de votre entreprise. Certains thèmes sont livrés directement par Nextinotech, les autres sont sourcés auprès de notre réseau de partenaires formateurs — toujours sans commission sur les formations recommandées.
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.25rem' }}>
              {METIERS_CATALOGUE.slice(0, 12).map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.9rem', background: '#fff', border: '1px solid rgba(27,53,84,0.08)',
                    fontSize: '0.78rem', color: 'var(--ink)', fontWeight: 500,
                  }}
                >
                  <span>{m.icon}</span>
                  {m.nom}
                </div>
              ))}
              <div
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '0.5rem 0.9rem', background: 'transparent', border: '1px dashed rgba(27,53,84,0.2)',
                  fontSize: '0.78rem', color: 'var(--mid)', fontWeight: 500,
                }}
              >
                + {METIERS_CATALOGUE.length - 12} autres métiers
              </div>
            </div>
            <Link to="/ingenierie-formation/catalogue" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Voir le catalogue complet par métier →
            </Link>
          </FadeUp>
        </div>
      </div>

      {/* ── 4 PHASES / LIVRABLES ── */}
      <div style={{ background: 'var(--paper)' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.55)', marginBottom: '1rem' }}>
              Méthodologie
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '2.5rem' }}>
              4 étapes, chacune avec ses livrables.
            </h3>
          </FadeUp>
          <div className="dsc-phases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {PHASES.map((p, i) => (
              <PhaseCard key={p.num} phase={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXTISUIVI ── */}
      <div style={{ background: 'var(--dark)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="frl-comp section-inner" style={{ alignItems: 'center' }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '1rem' }}>
              Votre espace de suivi
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
              NextiSuivi — votre dossier, en temps réel.
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.75rem' }}>
              Chaque mission est pilotée sur NextiSuivi, notre plateforme conçue exclusivement pour le suivi des dossiers de financement GIAC et OFPPT — pas un outil générique détourné de son usage. Vous suivez l&apos;avancement de votre dossier étape par étape, du diagnostic au remboursement, et vous échangez directement avec votre consultant sans jongler entre emails et appels.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem' }}>
              {[
                'Avancement du dossier visible à tout moment, étape par étape',
                'Messagerie directe avec votre consultant Nextinotech',
                'Documents et échéances de votre dossier centralisés au même endroit',
              ].map((item) => (
                <li key={item} style={{ fontSize: '0.9rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(27,53,84,0.08)', display: 'flex', alignItems: 'flex-start', gap: '0.7rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--dark-muted)', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              Vos données restent confidentielles, conformément à la loi 09-08 sur la protection des données personnelles — accès réservé à votre équipe et à votre consultant.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div
              style={{
                background: 'var(--ink)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '2.5rem',
                aspectRatio: '4 / 3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.25rem',
              }}
            >
              {[
                { label: 'Diagnostic', status: 'Terminé', pct: 100 },
                { label: 'Plan de formation', status: 'En cours', pct: 60 },
                { label: 'Dossier GIAC / OFPPT', status: 'À venir', pct: 0 },
              ].map((row) => (
                <div key={row.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(235,232,225,0.7)', marginBottom: '0.5rem' }}>
                    <span>{row.label}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--blue-bright)' }}>{row.status}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
                    <div style={{ height: '100%', width: `${row.pct}%`, background: 'var(--blue-bright)' }} />
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(235,232,225,0.3)', marginTop: '0.5rem' }}>
                Aperçu illustratif — NextiSuivi
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── LIVRABLES + OFFRE ── */}
      <div style={{ background: 'var(--paper)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="frl-comp section-inner" style={{ alignItems: 'start' }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.55)', marginBottom: '1rem' }}>
              Ce que vous recevez
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.75rem' }}>
              Cinq livrables concrets.
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {LIVRABLES.map((item) => (
                <li key={item} style={{ fontSize: '0.9rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(27,53,84,0.08)', display: 'flex', alignItems: 'flex-start', gap: '0.7rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.6)', marginBottom: '0.6rem' }}>
                PME & ETI · 20 à 300 collaborateurs
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
                Ingénierie de Formation
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', margin: '0 0 1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>Prix</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>Sur devis</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>Durée</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--ink)' }}>6 à 8 semaines</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
                Devis établi après un premier échange gratuit de 30 minutes, sur la base de votre effectif, de votre nombre de sites et de vos objectifs.
              </p>
              <Link to="#diagnostic" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                Demander un diagnostic gratuit →
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── CE QUE VOUS LAISSEZ SUR LA TABLE ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '1.5rem' }}>
              Le financement, concrètement
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.75rem', maxWidth: 760 }}>
              Vous payez déjà la taxe de formation. La question, c&apos;est si vous la récupérez.
            </h3>
          </FadeUp>
          <FadeUp delay={0.02}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              {['100% de dossiers de financement acceptés à ce jour', 'Statut tiers payant auprès des organismes financeurs', 'Dernier délai pour démarrer : 30 septembre 2026'].map((badge) => (
                <div
                  key={badge}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.55rem 1.1rem', background: 'rgba(47,111,181,0.12)',
                    border: '1px solid rgba(47,111,181,0.35)',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.04em',
                    color: 'var(--blue-bright)',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, maxWidth: 780, marginBottom: '2.5rem' }}>
              Chaque entreprise marocaine verse une Taxe de Formation Professionnelle (1,6% de la masse salariale), que le budget formation soit utilisé ou non. Sans dossier structuré et déposé à temps, cet argent reste une charge sèche — il ne revient jamais.
            </p>
          </FadeUp>
          <div className="frl-comp" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2.5rem' }}>
            <FadeUp delay={0.08}>
              <div style={{ background: 'var(--ink)', padding: '2.25rem', height: '100%' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: 'var(--blue-bright)', marginBottom: '0.5rem' }}>
                  Jusqu&apos;à 80%
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(235,232,225,0.7)', lineHeight: 1.6, fontWeight: 300 }}>
                  du coût de l&apos;ingénierie de formation elle-même pris en charge par le GIAC de votre secteur, lorsqu&apos;elle fait suite à un diagnostic — <strong>exactement la structure de notre mission en 4 phases</strong>. 70% si l&apos;ingénierie n&apos;est pas précédée d&apos;une étude, plafond 100 000 MAD HT, renouvelable chaque année.
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div style={{ background: 'var(--ink)', padding: '2.25rem', height: '100%' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: 'var(--blue-bright)', marginBottom: '0.5rem' }}>
                  Jusqu&apos;à 70%
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(235,232,225,0.7)', lineHeight: 1.6, fontWeight: 300 }}>
                  des coûts pédagogiques du plan de formation qui découle du diagnostic, remboursés via le Contrat Spécial de Formation (CSF) de l&apos;OFPPT — dans la limite de votre TFP déclarée.
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div style={{ background: 'var(--ink)', padding: '2.25rem', height: '100%' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue-bright)', marginBottom: '0.5rem', lineHeight: 1.15 }}>
                  Tiers payant
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(235,232,225,0.7)', lineHeight: 1.6, fontWeight: 300 }}>
                  Nextinotech est reconnu tiers payant auprès des organismes financeurs (GIAC / OFPPT) : la part prise en charge peut être réglée directement par l&apos;organisme, sans que vous ayez à avancer l&apos;intégralité de la facture en attendant un remboursement.
                </div>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.15}>
            <div style={{ borderLeft: '3px solid var(--blue-bright)', padding: '0.5rem 0 0.5rem 1.75rem', maxWidth: 780, marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontStyle: 'italic', margin: 0 }}>
                Ces taux dépendent de votre adhésion au GIAC de votre secteur (ex. GIAC TRANSLOG pour le transport et la logistique) et de votre situation vis-à-vis de la TFP et de la CNSS — nous vérifions votre éligibilité exacte dès le premier échange, avant tout engagement.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, maxWidth: 780, marginBottom: '1.5rem' }}>
              Nous montons ce dossier avec vous du premier entretien jusqu&apos;à la présentation des justificatifs de remboursement — pas seulement la rédaction du plan de formation. C&apos;est un travail administratif exigeant, avec des délais de dépôt à respecter : la plupart des PME marocaines qui perdent ce financement ne le perdent pas faute d&apos;éligibilité, mais faute de dossier monté et déposé dans les règles et dans les temps.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 780, marginBottom: '1.5rem' }}>
              Le dépôt du dossier de financement GIAC/OFPPT doit intervenir avant le 31 octobre 2026. Notre mission dure 6 à 8 semaines, diagnostic compris — c&apos;est pourquoi nous ne pouvons plus accepter de nouvelle mission après le 30 septembre 2026 pour ce cycle : au-delà, il ne reste plus assez de temps pour livrer un dossier complet dans les délais. Nous vérifions le calendrier exact de votre GIAC sectoriel dès le premier échange. Comptez ensuite généralement quelques mois entre le dépôt d&apos;un dossier complet et le remboursement effectif ; nous vous donnons un calendrier prévisionnel personnalisé dès le diagnostic.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, maxWidth: 780, marginBottom: '1.5rem' }}>
              La plupart des cabinets d&apos;ingénierie de formation touchent par ailleurs une commission sur les formations qu&apos;ils recommandent — un conflit d&apos;intérêt qui biaise le diagnostic. Chez Nextinotech, aucune commission sur les formations recommandées : notre seule allégeance est votre business case. Et parce que nous sommes des consultants terrain en Supply Chain depuis plus de 20 ans, nous savons distinguer un vrai déficit de compétence d&apos;un simple problème d&apos;organisation ou de process.
            </p>
          </FadeUp>
          <FadeUp delay={0.28}>
            <Link
              to="/formation"
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none', borderBottom: '1px solid rgba(47,111,181,0.3)', paddingBottom: '2px' }}
            >
              Voir le catalogue de formations Nextinotech →
            </Link>
          </FadeUp>
        </div>
      </div>

      <LogoMarquee />

      {/* ── FORMULAIRE / CTA FINAL ── */}
      <section id="diagnostic" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner" style={{ maxWidth: 640 }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>
              Diagnostic gratuit
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1rem' }}>
              Parlons de vos équipes.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, marginBottom: '2.5rem' }}>
              Un premier échange de 30 minutes, sans engagement, pour évaluer si l&apos;ingénierie de formation est pertinente pour votre situation.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <LeadForm />
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.55)', marginBottom: '1rem' }}>
              Questions fréquentes
            </div>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.05}>
                <div style={{ padding: '1.75rem 0', borderBottom: '1px solid rgba(27,53,84,0.1)' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.6rem' }}>{f.q}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{f.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
