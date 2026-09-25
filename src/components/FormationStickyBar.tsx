import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getFlag, setFlag, isRecent } from '../utils/localFlags'

const KEY = 'nxt_ingf_bar'
const REDISPLAY_DAYS = 12

// Pages où la barre n'a pas de sens (déjà des pages formation / conversion,
// ou la page Ingénierie de Formation elle-même puisque la barre en fait la promotion).
const HIDE_PREFIXES = ['/formation', '/contact', '/confidentialite', '/ingenierie-formation']

function isHidden(pathname: string): boolean {
  return HIDE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '-') || pathname.startsWith(p + '/'))
}

export default function FormationStickyBar() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)

    if (isHidden(pathname)) return
    if (isRecent(KEY, REDISPLAY_DAYS)) return
    if (!getFlag('nxt_cookie_ack')) return // on ne cumule pas avec le bandeau cookies
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(min-width: 768px)').matches) return // desktop / tablette seulement

    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setVisible(true)
      window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const ratio = scrolled / document.documentElement.scrollHeight
      if (ratio > 0.45) reveal()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(reveal, 25000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [pathname])

  const dismiss = () => {
    setFlag(KEY, String(Date.now()))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 140,
            background: 'var(--paper)',
            borderTop: '1px solid var(--border)',
            boxShadow: '0 -8px 30px rgba(27,53,84,0.08)',
            padding: '0.9rem clamp(1.5rem, 4vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--blue-bright)',
              }}
            >
              Dossier GIAC / OFPPT 2026
            </span>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.98rem', fontWeight: 700, color: 'var(--navy)' }}>
              Ingénierie de Formation
            </span>
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 300 }}>
              Dernier délai pour démarrer : 30 septembre (dépôt GIAC/OFPPT au 31 octobre).
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              to="/ingenierie-formation"
              onClick={dismiss}
              style={{
                background: 'var(--blue-bright)',
                color: '#fff',
                padding: '0.7rem 1.6rem',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Découvrir →
            </Link>
            <button
              onClick={dismiss}
              aria-label="Fermer"
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--mid)',
                width: 34,
                height: 34,
                fontSize: '1rem',
                lineHeight: 1,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
