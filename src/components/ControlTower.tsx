import { useState, useRef } from 'react'
import { IS_SERVER } from '../utils/ssr'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/* ─── Les 6 systèmes ──────────────────────────────────────── */

interface SystemDef {
  num: string
  name: string
  fullName: string
  definition: string
  role: string
  dataFeed: string[]
  link?: { label: string; to: string }
}

const SYSTEMS: SystemDef[] = [
  {
    num: '01',
    name: 'WMS',
    fullName: "Gestion d'Entrepôt",
    definition:
      "Le WMS pilote la réalité physique de l'entrepôt : réceptions, emplacements, préparation de commandes, expéditions, inventaires. C'est le système de vérité sur ce qui se trouve où, et sur ce qui reste à faire aujourd'hui.",
    role:
      "Dans un control tower, le WMS ne remonte pas chaque mouvement de palette — il transmet les niveaux de stock des références critiques, les commandes en retard sur leur SLA, les écarts d'inventaire et le taux de service par site.",
    dataFeed: ['Stock par référence critique', 'Commandes en retard de préparation', 'Écarts d\'inventaire', 'Taux de service par site'],
    link: { label: 'Voir la démo WMS', to: '/demo/wms' },
  },
  {
    num: '02',
    name: 'TMS',
    fullName: 'Gestion du Transport',
    definition:
      "Le TMS planifie et optimise les tournées, le choix transporteur et le suivi de livraison. Il raisonne sur un plan établi à l'avance : itinéraires, chargements, créneaux de livraison.",
    role:
      "Le control tower consomme l'écart entre ce plan et la réalité du terrain : position et ETA réactualisées, retards au-delà d'un seuil défini, statut des livraisons à enjeu client fort.",
    dataFeed: ['Position et ETA en temps réel', 'Écarts au plan de tournée', 'Statut des livraisons prioritaires', 'Coût transport express engagé'],
    link: { label: 'Voir la démo TMS', to: '/demo/tms' },
  },
  {
    num: '03',
    name: 'IMS',
    fullName: 'Gestion des Inventaires',
    definition:
      "L'IMS (Inventory Management System) calcule les niveaux de stock consolidés, les seuils de réapprovisionnement et les prévisions de rupture — une vue par référence, tous sites confondus, distincte de la localisation physique gérée par le WMS.",
    role:
      "C'est l'IMS qui fournit au control tower la matière première de la majorité de ses alertes de rupture. Des seuils mal calibrés dans l'IMS sont la première cause de fausses alertes dans un control tower.",
    dataFeed: ['Stock de sécurité recalculé', 'Point de commande actualisé', 'Probabilité de rupture à N jours', 'Écarts de comptage tournant'],
  },
  {
    num: '04',
    name: 'AMS',
    fullName: 'Gestion des Actifs',
    definition:
      "L'AMS (Asset Management System) gère les immobilisations et équipements de la chaîne logistique — flotte, engins de manutention, matériel de stockage : localisation, statut, maintenance et traçabilité tout au long de leur cycle de vie.",
    role:
      "Le control tower s'appuie sur l'AMS pour détecter un équipement immobilisé, anticiper une maintenance préventive avant la panne, et objectiver le taux d'utilisation réel du parc face au parc théorique.",
    dataFeed: ['Statut opérationnel des actifs', 'Taux d\'utilisation vs capacité théorique', 'Alertes de maintenance préventive', 'Localisation et traçabilité'],
  },
  {
    num: '05',
    name: 'IoT',
    fullName: 'Capteurs & Objets Connectés',
    definition:
      "Température, humidité, géolocalisation, charge, vibration : les capteurs IoT transforment un actif physique en source de données exploitable en continu — chaîne du froid, actifs mobiles à forte valeur, équipements critiques.",
    role:
      "Un capteur n'a de valeur pour le control tower que relié à un seuil d'action. Sans seuil, il ajoute un flux de plus à surveiller manuellement — l'inverse de l'objectif d'un pilotage centralisé.",
    dataFeed: ['Température / humidité (chaîne du froid)', 'Géolocalisation des actifs mobiles', 'Charge et vibration (maintenance)', 'Présence et comptage ciblé'],
  },
  {
    num: '06',
    name: 'IA',
    fullName: 'Intelligence Artificielle',
    definition:
      "L'IA transforme la visibilité consolidée par les 5 systèmes précédents en détection d'anomalies avant qu'elles ne deviennent visibles, en priorisation automatique des exceptions selon leur impact business réel, et en recommandations d'action.",
    role:
      "Seuls 7% des supply chains exécutent une décision en temps réel selon Gartner — l'IA comble cet écart, mais n'a de valeur que si la gouvernance de décision suit le même rythme que la détection.",
    dataFeed: ['Détection d\'anomalies précoce', 'Priorisation des exceptions', 'Recommandations d\'action', 'Automatisation des décisions à faible risque'],
    link: { label: 'Voir la formation IA Générative', to: '/formation/ia-supply-chain' },
  },
]

function SystemRow({ s, index }: { s: SystemDef; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div style={{ borderBottom: '1px solid rgba(27,53,84,0.1)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="system-row-grid"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '2.5rem 0',
          display: 'grid',
          gridTemplateColumns: '64px auto 1fr auto',
          gap: '2.5rem',
          alignItems: 'center',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(47,111,181,0.45)', textTransform: 'uppercase' }}>
          {s.num}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', whiteSpace: 'nowrap' }}>
          {s.name}
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 2.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
          {s.fullName}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.1rem', color: open ? 'var(--blue-bright)' : 'rgba(27,53,84,0.3)', transition: 'color 0.2s, transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1, userSelect: 'none' }}>
          +
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '3.5rem', paddingLeft: 64 + 40, maxWidth: 820 }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                {s.definition}
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
                <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>Dans le control tower : </strong>
                {s.role}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: s.link ? '2rem' : 0 }}>
                {s.dataFeed.map((d) => (
                  <span key={d} style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'rgba(47,111,181,0.75)', border: '1px solid rgba(47,111,181,0.3)', padding: '0.5rem 0.85rem',
                  }}>
                    {d}
                  </span>
                ))}
              </div>

              {s.link && (
                <Link to={s.link.to} style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--navy)', border: '1px solid var(--navy)', padding: '0.65rem 1.1rem', textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                  {s.link.label} →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Offre Control Tower (3 paliers — "à partir de", ×3 des tarifs d'origine) ── */

const OFFER_TIERS = [
  { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
  { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
  { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · IA/ML · portail mobile dirigeant' },
]

function OfferTiers() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '2rem' }} className="partenaire-pillars-grid">
      {OFFER_TIERS.map((tier) => (
        <div key={tier.name} style={{
          background: tier.featured ? 'rgba(47,111,181,0.08)' : 'rgba(27,53,84,0.03)',
          border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.4)' : 'rgba(27,53,84,0.1)'}`,
          padding: '2.5rem', position: 'relative',
        }}>
          {tier.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />}
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: tier.featured ? 'rgba(47,111,181,0.8)' : 'rgba(27,53,84,0.5)', marginBottom: '0.75rem' }}>
            {tier.name}
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: tier.featured ? 'var(--blue-bright)' : 'var(--navy)', marginBottom: '0.6rem' }}>
            {tier.price}
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
            {tier.duration}
          </div>
          <div style={{ fontSize: '0.88rem', color: 'rgba(27,53,84,0.7)', lineHeight: 1.65, fontWeight: 300 }}>
            {tier.desc}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Formation & Conseil liés ───────────────────────────────── */

const FORMATION_LINKS = [
  { title: 'WMS · TMS · ERP — Maîtriser les Outils', desc: 'Choisir, paramétrer et piloter les systèmes d\'information supply chain.', to: '/formation/wms' },
  { title: 'IA Générative Supply Chain & Achats', desc: 'Cas d\'usage LLM, prompts métier, gouvernance des données.', to: '/formation/ia-supply-chain' },
  { title: 'Ingénierie de Formation & Financement GIAC/OFPPT', desc: 'Diagnostic des besoins, plan de formation chiffré, dossier de financement.', to: '/ingenierie-formation' },
]

const CONSEIL_LINKS = [
  { title: 'Cahier des Charges Systèmes', desc: 'WMS, TMS, APS, Control Tower, intégration IA — document formalisé et chiffré, prêt à diffuser aux prestataires.', to: '/conseil' },
  { title: 'Intégration & Déploiement', desc: 'Applications métier, connexion IoT/capteurs, exploitation de la donnée — sans sous-traitance.', to: '/prestations#solutions-it' },
  { title: 'Direction Supply Chain à Temps Partagé', desc: 'Un pilote pour porter la gouvernance du control tower au quotidien, sans recrutement CDI.', to: '/direction-supply-chain-temps-partage' },
]

/* ─── FAQ ─────────────────────────────────────────────────── */

const faqEase = [0.16, 1, 0.3, 1] as const

const CONTROL_TOWER_FAQ = [
  { q: 'Faut-il avoir déjà un WMS et un TMS avant de déployer un control tower ?', a: "Non, mais c'est l'ordre le plus efficace. Un control tower consomme les données de vos systèmes existants ; sans WMS ni TMS, il démarre avec un périmètre plus restreint (ERP, fichiers manuels), ce qui limite la valeur des premières alertes. Le palier Mini est conçu pour démarrer même avec des systèmes sources encore basiques." },
  { q: "Quelle est la différence entre le control tower et l'intégration ERP-WMS-TMS ?", a: "L'intégration connecte techniquement vos systèmes entre eux. Le control tower va plus loin : il ajoute les seuils d'alerte, la priorisation des exceptions et la gouvernance de décision qui transforment ces données connectées en pilotage temps réel." },
  { q: 'Combien de temps pour voir un premier résultat ?', a: 'Le palier Mini (4 à 6 semaines) livre un premier périmètre de 3 à 5 dashboards. Le premier retour sur investissement visible, généralement sur les coûts de transport, arrive typiquement 3 à 6 mois après la fin du déploiement initial.' },
  { q: "L'IA est-elle obligatoire dans un control tower ?", a: "Non. Un control tower de niveau Mini ou Pilote fonctionne avec des seuils et des alertes configurés manuellement, sans IA. L'IA (détection d'anomalies, priorisation automatique) est le niveau de maturité le plus avancé, pertinent une fois la gouvernance de base stabilisée." },
]

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(IS_SERVER)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: faqEase }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button onClick={() => setOpen((o) => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', background: 'none', border: 'none', cursor: 'pointer', padding: '1.75rem 0', textAlign: 'left' }}>
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: faqEase }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, paddingBottom: '1.75rem', maxWidth: 760 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Ressources blog liées ──────────────────────────────────── */

const BLOG_LINKS = [
  { title: 'Control Tower Logistique : Mode d\'Emploi', to: '/blog/control-tower-logistique-piloter-sa-supply-chain-en-temps' },
  { title: 'Les KPIs à Suivre dans un Control Tower', to: '/blog/les-kpis-a-suivre-dans-un-control-tower-lesquels-comptent' },
  { title: 'Combien Coûte un Control Tower', to: '/blog/combien-coute-un-control-tower-budget-realiste-pour-une-eti' },
  { title: 'Maturité Control Tower : où se Situer', to: '/blog/maturite-control-tower-ou-se-situe-une-pme-eti-marocaine-en' },
]

/* ─── Composant principal ────────────────────────────────────── */

export default function ControlTower() {
  return (
    <section id="control-tower" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner">

        {/* Intro */}
        <div className="systemes-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '6rem' }}>
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              01 / Les 6 Systèmes
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 6.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0 }}>
              Une tour de contrôle, six sources de vérité.
            </h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>
            WMS, TMS, IMS, AMS, IoT et IA ne se remplacent pas — ils alimentent chacun une brique précise
            du pilotage temps réel. Le control tower ne les duplique pas, il en extrait ce qui déclenche une décision.
          </p>
        </div>

        <div>
          <div style={{ borderTop: '1px solid rgba(27,53,84,0.1)' }} />
          {SYSTEMS.map((s, i) => (
            <SystemRow key={s.num} s={s} index={i} />
          ))}
        </div>

        {/* Offre */}
        <div style={{ marginTop: '7rem', marginBottom: '3rem', maxWidth: 640 }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            02 / Notre Offre
          </div>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
            Trois paliers, du diagnostic au pilotage assisté par IA.
          </h3>
        </div>
        <OfferTiers />
        <p style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, maxWidth: 640, marginBottom: '4rem' }}>
          Chaque palier inclut la sélection ou l'intégration des systèmes sources (WMS, TMS, IMS, AMS, IoT) nécessaires,
          la définition des seuils d'alerte et la formation des équipes à leur exploitation.
        </p>

        {/* Formation */}
        <div style={{ marginBottom: '3rem', maxWidth: 640 }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            03 / Formation
          </div>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
            Former les équipes qui exploiteront la tour de contrôle.
          </h3>
        </div>
        <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
          {FORMATION_LINKS.map((f) => (
            <Link key={f.to} to={f.to} style={{ display: 'block', padding: '2rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem' }}>{f.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</div>
            </Link>
          ))}
        </div>

        {/* Conseil */}
        <div style={{ marginBottom: '3rem', maxWidth: 640 }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            04 / Conseil & Accompagnement
          </div>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
            Cadrer, intégrer, piloter dans la durée.
          </h3>
        </div>
        <div className="partenaire-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
          {CONSEIL_LINKS.map((c) => (
            <a key={c.to} href={c.to} style={{ display: 'block', padding: '2rem', border: '1px solid rgba(27,53,84,0.12)', textDecoration: 'none', background: '#fff' }}>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem' }}>{c.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300 }}>{c.desc}</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Questions fréquentes
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
              Vos questions, nos réponses.
            </h3>
          </div>
          <div style={{ maxWidth: 900 }}>
            {CONTROL_TOWER_FAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Ressources */}
        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(27,53,84,0.1)' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Pour aller plus loin
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {BLOG_LINKS.map((b) => (
              <Link key={b.to} to={b.to} style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--navy)', border: '1px solid rgba(27,53,84,0.2)', padding: '0.65rem 1.1rem', textDecoration: 'none',
              }}>
                {b.title} →
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <a href="/contact" className="btn-primary">Discuter de votre projet Control Tower →</a>
          <a href="/references" className="btn-outline">Nos références</a>
        </div>
      </div>
    </section>
  )
}
