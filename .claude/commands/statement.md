# /statement — Insert a hugeinc-style inter-section statement line

Add a full-width editorial statement between two sections — the signature hugeinc design move.

## Input
$ARGUMENTS — optional: the message, and where to insert it (between which two sections in App.tsx).
If no message given, pick the most fitting line from the SKILL.md list for the context.

## Output

A React component snippet + App.tsx insertion:

```tsx
// StatementDivider.tsx — or inline in App.tsx as a section element
<section style={{
  background: 'var(--paper)',   // or var(--dark) — alternate with neighbors
  padding: '6rem 4rem',
  borderTop: '1px solid var(--border)',
  borderBottom: '1px solid var(--border)',
  overflow: 'hidden',
}}>
  <div className="section-inner">
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: 'Bodoni Moda, serif',
        fontSize: 'clamp(2.2rem, 5.5vw, 7.5rem)',
        fontWeight: 400,
        fontStyle: 'italic',
        lineHeight: 0.92,
        letterSpacing: '-0.025em',
        color: 'var(--gold)',
        maxWidth: '14ch',     // force line breaks at natural reading points
      }}
    >
      [Statement line here.]
    </motion.div>
  </div>
</section>
```

## Rules
- Period at end of statement — always
- Max 14–18 words
- Italic Bodoni Moda 400 in gold
- No heading tag — this is a decorative element, use `<div>` or `<p>`
- Background must contrast with neighboring sections
- No other content in this component (no button, no label, no image)
