import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
        background: 'rgba(245,243,238,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: 'var(--ink)',
          textDecoration: 'none',
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
                color: 'var(--mid)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--mid)')}
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
              color: 'var(--paper)',
              background: 'var(--ink)',
              textDecoration: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '2px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'var(--gold)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'var(--ink)')}
          >
            Prendre RDV
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
