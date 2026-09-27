import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IS_SERVER } from '../utils/ssr'
import { PAGE_FAQ } from '../data/pageFaq'
import type { PageFaqItem } from '../data/pageFaq'

// Section « Questions fréquentes » des pages listées dans src/data/pageFaq.ts,
// rendue par Layout sous le contenu de la page. Le JSON-LD FAQPage
// correspondant est écrit dans le <head> par routeMeta.ts. Réponses ouvertes au
// rendu serveur (IS_SERVER) : Google et les IA les lisent dans le HTML statique.

const ease = [0.16, 1, 0.3, 1] as const

function Item({ item }: { item: PageFaqItem }) {
  const [open, setOpen] = useState(IS_SERVER)
  return (
    <div style={{ borderTop: '1px solid rgba(27,53,84,0.12)' }}>
      {/* Motif accordéon accessible : le titre contient le bouton (un titre ne peut pas être dans un <button>). */}
      <h3 style={{ margin: 0 }}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', background: 'none', border: 'none', cursor: 'pointer', padding: '1.6rem 0', textAlign: 'left', fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}
        >
          <span>{item.q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '1.6rem', maxWidth: 780 }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{item.a}</p>
              {item.link && (
                <Link to={item.link.to} style={{ display: 'inline-block', marginTop: '0.9rem', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none', borderBottom: '1px solid var(--navy)' }}>
                  {item.link.label} →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PageFaq() {
  const { pathname } = useLocation()
  const items = PAGE_FAQ[pathname.replace(/\/$/, '') || '/']
  if (!items?.length) return null
  return (
    <section id="faq-page" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner">
        <div style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Questions fréquentes
          </div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
            Vos questions, nos réponses.
          </h2>
        </div>
        <div style={{ maxWidth: 900, borderBottom: '1px solid rgba(27,53,84,0.12)' }}>
          {items.map((item) => <Item key={item.q} item={item} />)}
        </div>
      </div>
    </section>
  )
}
