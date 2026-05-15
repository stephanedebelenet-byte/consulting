import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setOverHero(y < window.innerHeight * 0.82)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const textCol = overHero ? 'rgba(227,226,226,0.7)' : 'var(--mid)'
  const textHover = overHero ? 'var(--dark-text)' : 'var(--ink)'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 4rem',
        background: overHero
          ? 'linear-gradient(to bottom, rgba(18,20,20,0.7) 0%, transparent 100%)'
          : scrolled
            ? 'rgba(245,243,238,0.97)'
            : 'rgba(245,243,238,0.94)',
        backdropFilter: overHero ? 'none' : 'blur(16px)',
        borderBottom: overHero ? '1px solid transparent' : '1px solid var(--border)',
        boxShadow: !overHero && scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.3s ease',
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: overHero ? 'var(--dark-text)' : 'var(--ink)',
          textDecoration: 'none',
          transition: 'color 0.5s',
        }}
      >
        Cabinet <span style={{ color: 'var(--gold)' }}>SC</span>
      </a>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {[
          { label: 'Notre approche', href: '#pourquoi' },
          { label: 'Conseil', href: '#conseil' },
          { label: 'Systèmes', href: '#systemes' },
          { label: 'Formation', href: '#formation' },
          { label: 'À propos', href: '#profil' },
        ].map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: textCol,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = textHover)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = textCol)}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: overHero ? 'var(--dark)' : 'var(--paper)',
              background: overHero ? 'var(--gold)' : 'var(--ink)',
              textDecoration: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '2px',
              transition: 'background 0.5s, color 0.5s',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement
              el.style.background = 'var(--gold)'
              el.style.color = 'var(--dark)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              el.style.background = overHero ? 'var(--gold)' : 'var(--ink)'
              el.style.color = overHero ? 'var(--dark)' : 'var(--paper)'
            }}
          >
            Prendre RDV
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
