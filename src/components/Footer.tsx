export default function Footer() {
  const nav = [
    { label: 'Notre approche', href: '#pourquoi' },
    { label: 'Conseil & AMOA', href: '#conseil' },
    { label: 'Systèmes SCM', href: '#systemes' },
    { label: 'Formation', href: '#formation' },
    { label: 'DSC à temps partagé', href: '#dsc' },
    { label: 'À propos', href: '#profil' },
  ]

  const engagements = [
    'Indépendant — 0 commission éditeur',
    'DDMRP Certified',
    '15+ ans terrain Maroc',
    'PME & ETI — Tarifs publics',
  ]

  return (
    <footer
      style={{
        background: 'var(--dark-3)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '5rem 4rem 2.5rem',
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
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: '4rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand column */}
          <div>
            <a
              href="#"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--dark-text)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Cabinet <span style={{ color: 'var(--gold)' }}>SC</span>
            </a>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(227,226,226,0.45)',
                lineHeight: 1.7,
                maxWidth: 300,
                marginBottom: '1.5rem',
              }}
            >
              Cabinet indépendant de conseil et d&apos;AMOA en Supply Chain, dédié aux PME et ETI
              marocaines. Notre seule allégeance est à votre business case.
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
                    color: 'rgba(184,146,42,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--gold)' }}>◆</span> {e}
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
                color: 'rgba(227,226,226,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {nav.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(227,226,226,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'rgba(227,226,226,0.5)')
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
                color: 'rgba(227,226,226,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { icon: '📧', label: 'contact@cabinet-sc.ma', href: 'mailto:contact@cabinet-sc.ma' },
                { icon: '📞', label: '+212 6 00 00 00 00', href: 'tel:+212600000000' },
                { icon: '📍', label: 'Casablanca, Maroc', href: undefined },
              ].map(({ icon, label, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: '0.88rem',
                        color: 'rgba(227,226,226,0.5)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = 'var(--gold)')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = 'rgba(227,226,226,0.5)')
                      }
                    >
                      {label}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: 'rgba(227,226,226,0.5)' }}>
                      {label}
                    </span>
                  )}
                </div>
              ))}
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--gold)',
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
                  ((e.target as HTMLElement).style.background = 'var(--gold-light)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.background = 'var(--gold)')
                }
              >
                Prendre RDV →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'rgba(227,226,226,0.25)',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.06em',
          }}
        >
          <span>© 2025 CABINET SC — TOUS DROITS RÉSERVÉS</span>
          <span>CASABLANCA · MAROC · PME & ETI</span>
        </div>
      </div>
    </footer>
  )
}
