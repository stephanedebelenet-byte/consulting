export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dark)',
        color: 'rgba(227,226,226,0.4)',
        padding: '2.5rem 4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
      }}
    >
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1rem',
          color: 'rgba(227,226,226,0.7)',
        }}
      >
        Cabinet <span style={{ color: 'var(--gold)' }}>SC</span> — Supply Chain Conseil
      </div>
      <div>Cabinet indépendant • Casablanca, Maroc • PME & ETI marocaines</div>
      <div>
        © 2025 —{' '}
        <a
          href="#contact"
          style={{ color: 'rgba(227,226,226,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--gold)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(227,226,226,0.4)')}
        >
          Contact
        </a>
      </div>
    </footer>
  )
}
