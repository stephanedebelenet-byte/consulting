import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items = [
  'Conseil Indépendant',
  '0 Commission Éditeur',
  'DDMRP Certifié',
  'PME & ETI Maroc',
  'AMOA Supply Chain',
  'WMS · TMS · APS',
  '15+ Ans Terrain',
  'Groupe Addoha',
  'DHL Supply Chain',
  'Renault-Nissan Tanger',
  'European Training Foundation',
  'Task Force Vaccination',
]

interface MarqueeProps {
  dark?: boolean
}

export default function Marquee({ dark = false }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current!
    const totalWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -totalWidth,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
      },
    })
  }, [])

  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        background: dark ? 'var(--dark-3)' : 'var(--ink)',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.06)'}`,
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.06)'}`,
        padding: '1rem 0',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: i % 3 === 0 ? 'var(--gold)' : 'rgba(227,226,226,0.35)',
              whiteSpace: 'nowrap',
              padding: '0 2.5rem',
            }}
          >
            {item}
            <span style={{ marginLeft: '2.5rem', color: 'rgba(184,146,42,0.3)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
