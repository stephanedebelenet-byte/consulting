import { useState, useEffect } from 'react'

/* ─── Carrousel hero — décoratif, images en fond de section, à utiliser
   comme `backgroundLayer` de PageHero. Extrait de FormationCatalogue.tsx
   pour être réutilisé (ex. page Ingénierie de Formation) — même preuve
   visuelle "terrain" que le catalogue de formations. ── */
const CAROUSEL_IMAGES = [
  '/images/formation-carousel/formation-1.webp',
  '/images/formation-carousel/formation-2.webp',
  '/images/formation-carousel/formation-3.webp',
  '/images/formation-carousel/formation-4.webp',
  '/images/formation-carousel/formation-5.webp',
  '/images/formation-carousel/formation-6.webp',
  '/images/formation-carousel/formation-7.webp',
  '/images/formation-carousel/formation-8.webp',
]

export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CAROUSEL_IMAGES.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
        {CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1px)',
              opacity: i === active ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </div>
      {/* Voile coloré à la marque — bleu/blanc, pas un scrim noir plat */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(125deg, rgba(27,53,84,0.2) 0%, rgba(255,255,255,0.14) 45%, rgba(47,111,181,0.08) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, #ffffff 100%)',
      }} />
    </div>
  )
}
