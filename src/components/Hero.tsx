import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * HIGGSFIELD.AI PROMPT (generate at higgsfield.ai then pass URL as VITE_HERO_VIDEO):
 * "Aerial cinematic shot of Casablanca port and logistics hub at night, warm golden
 *  lights on dark ocean, supply chain operations, containers moving, slow dramatic
 *  camera pull-back, 4K dark premium editorial, 8 seconds loop"
 *
 * Then set: VITE_HERO_VIDEO=https://your-higgsfield-url.mp4 in .env
 */
const HERO_VIDEO = import.meta.env.VITE_HERO_VIDEO as string | undefined

/* Character-level splittext (more dramatic than word-level) */
function CharReveal({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const chars = text.split('')
  return (
    <span className={className} style={{ display: 'block' }}>
      {chars.map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            initial={{ y: '110%', opacity: 0, rotateX: -20 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.022,
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Morocco Logistics Network SVG ── */
const NODES = [
  { id: 'europe', x: 5, y: 4, r: 0.5 },
  { id: 'asie', x: 88, y: 7, r: 0.5 },
  { id: 'africa', x: 40, y: 76, r: 0.5 },
  { id: 'tanger', x: 16, y: 11, r: 1.1 },
  { id: 'rabat', x: 19, y: 27, r: 0.8 },
  { id: 'casa', x: 18, y: 38, r: 1.6 },
  { id: 'fes', x: 43, y: 20, r: 1.0 },
  { id: 'oujda', x: 70, y: 16, r: 0.8 },
  { id: 'marrakech', x: 27, y: 52, r: 0.9 },
  { id: 'agadir', x: 13, y: 63, r: 0.8 },
]

const EDGES: [string, string][] = [
  ['europe', 'tanger'],
  ['tanger', 'rabat'],
  ['rabat', 'casa'],
  ['casa', 'fes'],
  ['fes', 'oujda'],
  ['oujda', 'asie'],
  ['casa', 'marrakech'],
  ['marrakech', 'agadir'],
  ['tanger', 'fes'],
  ['casa', 'africa'],
  ['agadir', 'africa'],
]

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!
}

function NetworkSVG() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const ctx = gsap.context(() => {
      /* Flowing lines */
      const flows = svgRef.current!.querySelectorAll<SVGPathElement>('[data-flow]')
      flows.forEach((path, i) => {
        const len = path.getTotalLength()
        const dashLen = len * 0.25
        gsap.set(path, {
          strokeDasharray: `${dashLen} ${len - dashLen}`,
          strokeDashoffset: 0,
        })
        gsap.to(path, {
          strokeDashoffset: -len,
          repeat: -1,
          duration: 4 + (i % 3),
          ease: 'none',
        })
      })

      /* Pulsing node rings */
      const pulses = svgRef.current!.querySelectorAll<SVGCircleElement>('[data-pulse]')
      pulses.forEach((circle) => {
        const baseR = parseFloat(circle.getAttribute('data-base-r') || '1')
        gsap.fromTo(
          circle,
          { attr: { r: baseR }, opacity: 0.6 },
          {
            attr: { r: baseR * 3.5 },
            opacity: 0,
            repeat: -1,
            duration: 2.5,
            ease: 'power1.out',
          }
        )
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.18,
      }}
    >
      {/* Static dim gold base lines */}
      {EDGES.map(([aId, bId]) => {
        const a = getNode(aId)
        const b = getNode(bId)
        return (
          <line
            key={`base-${aId}-${bId}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(184,146,42,0.4)"
            strokeWidth="0.3"
          />
        )
      })}

      {/* Animated flowing segments */}
      {EDGES.map(([aId, bId], idx) => {
        const a = getNode(aId)
        const b = getNode(bId)
        return (
          <path
            key={`flow-${aId}-${bId}`}
            data-flow={idx}
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            stroke="rgba(184,146,42,0.9)"
            strokeWidth="0.5"
            fill="none"
          />
        )
      })}

      {/* Node dots */}
      {NODES.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r={node.r} fill="rgba(184,146,42,0.8)" />
          {/* Pulse ring */}
          <circle
            data-pulse={node.id}
            data-base-r={node.r}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="none"
            stroke="rgba(184,146,42,0.6)"
            strokeWidth="0.3"
          />
        </g>
      ))}
    </svg>
  )
}

/* ── Animated CountUp Stat ── */
function AnimatedStat({
  target,
  suffix = '',
  label,
  isStatic = false,
  staticDisplay,
}: {
  target: number
  suffix?: string
  label: string
  isStatic?: boolean
  staticDisplay?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isStatic) return
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      delay: 2.2,
      ease: 'power2.out',
      onUpdate() {
        setCount(Math.round(obj.val))
      },
    })
    return () => {
      tween.kill()
    }
  }, [target, isStatic])

  const display = isStatic ? (staticDisplay ?? String(target)) : `${count}${suffix}`

  return (
    <div
      style={{
        padding: '1.75rem 2rem',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          fontWeight: 700,
          color: 'var(--gold)',
          lineHeight: 1,
          marginBottom: '0.4rem',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(227,226,226,0.4)',
        }}
      >
        {label}
      </div>
    </div>
  )
}

const STATS = [
  { target: 15, suffix: '+', label: "Ans d'expérience" },
  { target: 100, suffix: '%', label: 'Indépendant' },
  { target: 0, label: 'Commission éditeurs', isStatic: true, staticDisplay: '0' },
  { target: 3, suffix: '', label: 'Dimensions couvertes' },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Parallax background */
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100svh',
        background: 'var(--dark)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* ── Background ── */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {HERO_VIDEO ? (
          <video
            src={HERO_VIDEO}
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
        ) : (
          /* CSS fallback — cinematic dark atmosphere */
          <>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184,146,42,0.08) 0%, transparent 70%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 40% 40% at 20% 70%, rgba(74,103,65,0.06) 0%, transparent 60%)',
            }} />
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }}>
              <defs>
                <pattern id="g" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M80 0 L0 0 0 80" fill="none" stroke="#fff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
          </>
        )}

        {/* Morocco Logistics Network */}
        <NetworkSVG />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(18,20,20,0.3) 0%, transparent 30%, transparent 70%, rgba(18,20,20,0.9) 100%)',
        }} />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 4rem',
          width: '100%',
        }}
      >
        <motion.div
          className="section-tag"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '2.5rem' }}
        >
          Cabinet de conseil indépendant — Maroc
        </motion.div>

        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3.5rem, 7vw, 8rem)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            perspective: 800,
          }}
        >
          <CharReveal
            text="Nous ne vendons"
            delay={0.35}
            className=""
          />
          <span style={{
            display: 'block',
            fontStyle: 'italic',
            color: 'var(--gold)',
            marginTop: '0.1em',
          }}>
            <CharReveal
              text="aucun logiciel."
              delay={0.75}
            />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            fontSize: '1.1rem',
            color: 'var(--dark-muted)',
            maxWidth: 480,
            lineHeight: 1.8,
            marginBottom: '3rem',
          }}
        >
          Cabinet indépendant de conseil et d&apos;AMOA en Supply Chain, dédié aux PME et ETI marocaines.
          Notre seule allégeance est à votre business case.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          <a href="#contact" className="btn-primary" style={{ background: 'var(--gold)', color: 'var(--dark)' }}>
            🗓 Réserver un échange gratuit →
          </a>
          <a
            href="#conseil"
            className="btn-outline"
            style={{ borderColor: 'rgba(227,226,226,0.25)', color: 'var(--dark-text)' }}
          >
            Nos offres
          </a>
        </motion.div>
      </div>

      {/* ── Stats bar (pinned to bottom) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {STATS.map((stat) => (
          <AnimatedStat
            key={stat.label}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            isStatic={stat.isStatic}
            staticDisplay={stat.staticDisplay}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          right: '3rem',
          bottom: '7rem',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(227,226,226,0.25)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}>
          Scroll
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(184,146,42,0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
