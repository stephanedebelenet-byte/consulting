import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LOGOS } from './References'

/* ─── Bandeau de logos défilant en continu — mêmes références que le mur
   statique de la page /references, mais en carrousel horizontal pour une
   preuve sociale compacte en bas de landing page (ex. Ingénierie de
   Formation). Même mécanique de défilement que Marquee.tsx (GSAP, boucle
   infinie), appliquée à des images plutôt qu'à du texte. ── */
export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 36,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
      },
    })

    return () => { tween.kill() }
  }, [])

  const doubled = [...LOGOS, ...LOGOS]

  return (
    <div
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(227,226,226,0.4)',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Ils nous font confiance
      </div>
      <div
        ref={trackRef}
        style={{ display: 'flex', width: 'max-content', willChange: 'transform', alignItems: 'center' }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80, padding: '0 3rem' }}
          >
            <img
              src={logo.file}
              alt={logo.name}
              width={logo.natW}
              height={logo.natH}
              style={{
                height: logo.height,
                maxWidth: 160,
                width: 'auto',
                objectFit: 'contain',
                filter: 'grayscale(100%)',
                opacity: 0.6,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
