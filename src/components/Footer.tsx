import { useLocale } from '../i18n/locale'

export default function Footer() {
  const { locale, tr, href: h } = useLocale()
  // Unités métier en tête (voir Nav.tsx), puis pages du cabinet.
  const nav = locale === 'en' ? [
    { label: 'Nextinotech Academy', href: '/formation' },
    { label: 'Nextinotech Consulting', href: '/conseil' },
    { label: 'Nextinotech Digital', href: '/control-tower' },
    { label: 'Part-Time Supply Chain Direction', href: '/direction-supply-chain-temps-partage' },
    { label: 'About', href: '/a-propos' },
    { label: 'Careers', href: '/carriere' },
  ] : [
    { label: 'Nextinotech Académie', href: '/formation' },
    { label: 'Nextinotech Conseil', href: '/conseil' },
    { label: 'Nextinotech Digital', href: '/control-tower' },
    { label: 'DSC à temps partagé', href: '/direction-supply-chain-temps-partage' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Carrière', href: '/carriere' },
  ]

  const services = locale === 'en' ? [
    { label: 'On-the-ground training', href: '/formation' },
    { label: 'Consulting & SC advisory', href: '/conseil' },
    { label: 'Operational services', href: '/prestations' },
    { label: 'Part-time supply chain direction', href: '/direction-supply-chain-temps-partage' },
  ] : [
    { label: 'Formation terrain', href: '/formation' },
    { label: 'Conseil & AMOA SC', href: '/conseil' },
    { label: 'Prestations opérationnelles', href: '/prestations' },
    { label: 'DSC à temps partagé', href: '/direction-supply-chain-temps-partage' },
  ]

  const engagements = tr(
    ['Indépendant', 'DDMRP Certified', '20+ ans terrain Maroc', 'PME & ETI — Tarifs publics'],
    ['Independent', 'DDMRP Certified', '20+ Years on the Ground in Morocco', 'SMEs & Mid-Caps — Public Pricing']
  )

  return (
    <footer
      style={{
        background: 'var(--dark-2)',
        borderTop: '1px solid rgba(27,53,84,0.1)',
        padding: 'var(--sp-y-sm) var(--sp-x) 2.5rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Top row */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand column */}
          <div>
            <a
              href={h('/')}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--navy)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              <img
                src="/logo-lockup.webp"
                alt="Nextinotech"
                width={300}
                height={99}
                style={{ height: 40, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
              />
            </a>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--mid)',
                lineHeight: 1.7,
                maxWidth: 300,
                marginBottom: '1.5rem',
              }}
            >
              {tr(
                <>Nextinotech — cabinet indépendant de conseil et d&apos;AMOA en Supply Chain, dédié aux PME et ETI
                marocaines. Notre seule allégeance est à votre business case.</>,
                <>Nextinotech — an independent Supply Chain consulting and advisory firm, dedicated to Moroccan
                SMEs and mid-caps. Our only allegiance is to your business case.</>
              )}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {engagements.map((e) => (
                <div
                  key={e}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(27,53,84,0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--blue-bright)' }}>◆</span> {e}
                </div>
              ))}
            </div>
          </div>

          {/* Nav column */}
          <div>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.45)',
                marginBottom: '1.5rem',
              }}
            >
              {tr('Navigation', 'Navigation')}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {nav.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={h(href)}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--mid)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--blue-bright)')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--mid)')
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos services column */}
          <div>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.45)',
                marginBottom: '1.5rem',
              }}
            >
              {tr('Nos services', 'Our Services')}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {services.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={h(href)}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--mid)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--blue-bright)')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--mid)')
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.45)',
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {(locale === 'en' ? [
                { tag: 'Email', label: 'contact@nextinotech.com', href: 'mailto:contact@nextinotech.com' },
                { tag: 'Tel', label: '+212 06 63 44 92 00', href: 'tel:+212663449200' },
                { tag: 'WA', label: 'WhatsApp', href: 'https://wa.me/212663449200' },
                { tag: 'Loc.', label: 'Technopark Casablanca, 3rd floor', href: 'https://www.google.com/maps/search/?api=1&query=Technopark+Casablanca+Route+de+Nouaceur' },
              ] : [
                { tag: 'Email', label: 'contact@nextinotech.com', href: 'mailto:contact@nextinotech.com' },
                { tag: 'Tél', label: '+212 06 63 44 92 00', href: 'tel:+212663449200' },
                { tag: 'WA', label: 'WhatsApp', href: 'https://wa.me/212663449200' },
                { tag: 'Lieu', label: 'Technopark Casablanca, 3ème étage', href: 'https://www.google.com/maps/search/?api=1&query=Technopark+Casablanca+Route+de+Nouaceur' },
              ]).map(({ tag, label, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', minWidth: 0 }}>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(27,53,84,0.5)',
                    flexShrink: 0,
                    width: 26,
                  }}>
                    {tag}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--mid)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        overflowWrap: 'break-word',
                        minWidth: 0,
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = 'var(--blue-bright)')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = 'var(--mid)')
                      }
                    >
                      {label}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: 'var(--mid)' }}>
                      {label}
                    </span>
                  )}
                </div>
              ))}
              <a
                href="mailto:contact@nextinotech.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--blue-bright)',
                  color: 'var(--dark)',
                  padding: '0.7rem 1.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: '2px',
                  marginTop: '0.5rem',
                  letterSpacing: '0.03em',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.background = 'var(--navy)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.background = 'var(--blue-bright)')
                }
              >
                {tr('Prendre RDV →', 'Book a Call →')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(27,53,84,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.75rem',
            color: 'rgba(27,53,84,0.4)',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.06em',
          }}
        >
          <span>{tr('© 2026 NEXTINOTECH — TOUS DROITS RÉSERVÉS', '© 2026 NEXTINOTECH — ALL RIGHTS RESERVED')}</span>
          <a href="/confidentialite" style={{ color: 'inherit', textDecoration: 'none' }}>{tr('CONFIDENTIALITÉ', 'PRIVACY POLICY')}</a>
          <span>{tr('TECHNOPARK CASABLANCA · MAROC · PME & ETI', 'TECHNOPARK CASABLANCA · MOROCCO · SMES & MID-CAPS')}</span>
        </div>
      </div>
    </footer>
  )
}