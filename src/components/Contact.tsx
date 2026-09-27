import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLocale } from '../i18n/locale'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const BESOINS = [
  'Diagnostic Supply Chain',
  'Optimisation des stocks',
  'Sélection WMS / TMS / APS',
  'AMOA & pilotage projet',
  'Formation terrain',
  'DSC à temps partagé',
  'Autre',
]

const BESOINS_EN = [
  'Supply Chain Diagnosis',
  'Inventory Optimization',
  'WMS / TMS / APS Selection',
  'Project Management & Advisory',
  'On-the-Ground Training',
  'Part-Time SC Direction',
  'Other',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { locale, tr } = useLocale()
  const besoins = locale === 'en' ? BESOINS_EN : BESOINS

  const [form, setForm] = useState({ nom: '', email: '', tel: '', besoin: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = tr('Obligatoire', 'Required')
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = tr('Email invalide', 'Invalid email')
    if (!form.besoin) e.besoin = tr('Choisissez un besoin', 'Choose a need')
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
          nom: form.nom,
          email: form.email,
          téléphone: form.tel || 'Non renseigné',
          besoin: form.besoin,
          message: form.message,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: '#ffffff',
    border: `1px solid ${errors[field] ? 'rgba(200,60,60,0.55)' : 'rgba(27,53,84,0.16)'}`,
    borderRadius: 0,
    padding: '0.85rem 1rem',
    color: 'var(--ink)',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  })

  return (
    <section id="contact" style={{ background: 'var(--paper)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(47,111,181,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: 1200, margin: '0 auto', padding: 'var(--sp)',
          display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '6rem', alignItems: 'start',
        }}
      >
        {/* Left — editorial */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag" style={{ color: 'rgba(47,111,181,0.9)' }}>{tr('Prenons contact', "Let's talk")}</div>
          <h2 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2.2rem, 4vw, 4rem)',
            fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem',
            color: 'var(--navy)',
          }}>
            {tr('Prêt à transformer votre Supply Chain en avantage compétitif ?', 'Ready to turn your Supply Chain into a competitive edge?')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--dark-muted)', lineHeight: 1.8, maxWidth: 460 }}>
            {tr(
              <>Le premier échange est gratuit, dure 30 minutes, et n&apos;engage à rien.
              Nous venons préparés. Vous repartez avec des actions concrètes.</>,
              <>The first call is free, takes 30 minutes, and comes with no obligation.
              We come prepared. You leave with concrete next steps.</>
            )}
          </p>

          <div style={{
            marginTop: '3rem', paddingTop: '3rem',
            borderTop: '1px solid rgba(27,53,84,0.1)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {(locale === 'en' ? [
              { tag: 'Email', label: 'contact@nextinotech.com', href: 'mailto:contact@nextinotech.com' },
              { tag: 'Tel',  label: '+212 06 63 44 92 00',                href: 'tel:+212663449200' },
              { tag: 'WA',   label: 'WhatsApp',                            href: 'https://wa.me/212663449200' },
              { tag: 'Loc.', label: 'Technopark Casablanca, 3rd floor — Route de Nouaceur, Casablanca', href: undefined },
            ] : [
              { tag: 'Email', label: 'contact@nextinotech.com', href: 'mailto:contact@nextinotech.com' },
              { tag: 'Tél',  label: '+212 06 63 44 92 00',                href: 'tel:+212663449200' },
              { tag: 'WA',   label: 'WhatsApp',                            href: 'https://wa.me/212663449200' },
              { tag: 'Lieu', label: 'Technopark Casablanca, 3ème étage — Route de Nouaceur, Casablanca', href: undefined },
            ]).map(({ tag, label, href }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.55rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(47,111,181,0.7)', flexShrink: 0, width: 28,
                }}>{tag}</span>
                {href
                  ? <a href={href} style={{ fontSize: '0.9rem', color: 'var(--mid)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--blue-bright)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--mid)')}>{label}</a>
                  : <span style={{ fontSize: '0.9rem', color: 'var(--mid)' }}>{label}</span>
                }
              </div>
            ))}
          </div>

          {/* Map — Technopark Casablanca */}
          <div style={{ marginTop: '2rem' }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Technopark+Casablanca+Route+de+Nouaceur"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', border: '1px solid rgba(27,53,84,0.16)', textDecoration: 'none' }}
              aria-label={tr('Ouvrir Technopark Casablanca dans Google Maps', 'Open Technopark Casablanca in Google Maps')}
            >
              <iframe
                title={tr('Localisation Nextinotech — Technopark Casablanca', 'Nextinotech location — Technopark Casablanca')}
                src="https://www.google.com/maps?q=Technopark+Casablanca,+Route+de+Nouaceur,+Casablanca,+Maroc&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', filter: 'grayscale(0.4) contrast(1.05)', pointerEvents: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
            <p style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--mid)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.03em' }}>
              {tr('Technopark Casablanca — 3ème étage · Route de Nouaceur, Casablanca', 'Technopark Casablanca — 3rd floor · Route de Nouaceur, Casablanca')}
            </p>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(27,53,84,0.12)',
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            {/* Blue top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'var(--blue-bright)',
            }} />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>
                    {tr('Message envoyé.', 'Message sent.')}
                  </h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {tr("Nous revenons vers vous sous 24h ouvrées pour fixer l'échange découverte.", 'We will get back to you within 24 business hours to schedule the discovery call.')}
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ nom: '', email: '', tel: '', besoin: '', message: '' }) }}
                    style={{ marginTop: '2rem', background: 'none', border: '1px solid rgba(47,111,181,0.4)', color: 'var(--blue-bright)', padding: '0.6rem 1.4rem', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    {tr('Nouveau message', 'New message')}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    {tr('Réservez votre échange gratuit', 'Book your free call')}
                  </div>

                  {/* Nom + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FieldWrap label={tr('Nom *', 'Name *')} error={errors.nom}>
                      <input
                        type="text" placeholder="Ahmed" value={form.nom}
                        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(47,111,181,0.6)')}
                        onBlur={e => (e.target.style.borderColor = errors.nom ? 'rgba(200,60,60,0.55)' : 'rgba(27,53,84,0.16)')}
                        style={inputStyle('nom')}
                      />
                    </FieldWrap>
                    <FieldWrap label="Email *" error={errors.email}>
                      <input
                        type="email" placeholder={tr('vous@entreprise.ma', 'you@company.com')} value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(47,111,181,0.6)')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(200,60,60,0.55)' : 'rgba(27,53,84,0.16)')}
                        style={inputStyle('email')}
                      />
                    </FieldWrap>
                  </div>

                  {/* Téléphone + Besoin */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FieldWrap label={tr('Téléphone', 'Phone')}>
                      <input
                        type="tel" placeholder="+212 6XX XXX XXX" value={form.tel}
                        onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(47,111,181,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(27,53,84,0.16)')}
                        style={inputStyle('tel')}
                      />
                    </FieldWrap>
                    <FieldWrap label={tr('Besoin *', 'Need *')} error={errors.besoin}>
                      <select
                        value={form.besoin}
                        onChange={e => setForm(f => ({ ...f, besoin: e.target.value }))}
                        style={{ ...inputStyle('besoin'), appearance: 'none', cursor: 'pointer', color: form.besoin ? 'var(--ink)' : 'rgba(27,53,84,0.35)' }}
                      >
                        <option value="" disabled>{tr('Choisir...', 'Choose...')}</option>
                        {besoins.map(b => <option key={b} value={b} style={{ background: '#ffffff', color: 'var(--ink)' }}>{b}</option>)}
                      </select>
                    </FieldWrap>
                  </div>

                  {/* Message */}
                  <FieldWrap label={tr('Message *', 'Message *')} error={errors.message}>
                    <textarea
                      rows={4} placeholder={tr('Décrivez brièvement votre situation...', 'Briefly describe your situation...')}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => (e.target.style.borderColor = 'rgba(47,111,181,0.6)')}
                      onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(200,60,60,0.55)' : 'rgba(27,53,84,0.16)')}
                      style={{ ...inputStyle('message'), resize: 'none' }}
                    />
                  </FieldWrap>

                  {status === 'error' && (
                    <p style={{ color: 'rgba(200,60,60,0.85)', fontSize: '0.82rem', fontFamily: 'DM Mono, monospace' }}>
                      {tr('Erreur d’envoi. Écrivez-nous directement à contact@nextinotech.com', 'Sending error. Email us directly at contact@nextinotech.com')}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.01, boxShadow: '0 12px 40px rgba(47,111,181,0.3)' } : {}}
                    style={{
                      background: 'var(--blue-bright)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      letterSpacing: '0.04em',
                      fontFamily: 'Jost, sans-serif',
                      opacity: status === 'sending' ? 0.75 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'sending' ? tr('Envoi en cours...', 'Sending...') : tr('Envoyer ma demande →', 'Send my request →')}
                  </motion.button>

                  <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--mid)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' }}>
                    {tr('GRATUIT · SANS ENGAGEMENT · RÉPONSE SOUS 24H', 'FREE · NO OBLIGATION · REPLY WITHIN 24H')}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FieldWrap({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: error ? 'rgba(200,60,60,0.8)' : 'rgba(47,111,181,0.75)',
      }}>
        {label}
        {error && <span style={{ marginLeft: '0.5rem', fontSize: '0.55rem' }}>{error}</span>}
      </label>
      {children}
    </div>
  )
}
