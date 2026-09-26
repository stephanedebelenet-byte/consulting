import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Guard SSR : voir la même garde dans Hero.tsx.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Instance courante, pour les composants qui doivent positionner le défilement
// eux-mêmes (ex. Blog.tsx : retour à la même position dans la liste après la
// lecture d'un article). Lenis garde sa propre position interne : un simple
// window.scrollTo est aussitôt écrasé par son animation.
let currentLenis: Lenis | null = null
export function getLenis(): Lenis | null {
  return currentLenis
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    currentLenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // Même référence à l'ajout et au retrait (auparavant, le retrait passait une
    // nouvelle fonction et ne retirait donc rien).
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      if (currentLenis === lenis) currentLenis = null
    }
  }, [])
}
