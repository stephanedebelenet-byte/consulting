---
name: essor-hugeinc
description: Design system skill for Essor Consulting — clones hugeinc.com's visual DNA (massive editorial typography, clean dark/light alternation, numbered sections) mapped to the Essor brand (navy #1b3554, gold #c09a2f, Bodoni Moda serif). Use when building or redesigning any section of the consulting site.
metadata:
  type: design
---

# Essor Consulting × Huge Inc. — Design System

## The One Rule
Before writing a single line of code, commit to the hugeinc principle:
> **Typography IS the design.** Decoration is a tax. Every pixel of ornament must earn its place.

---

## hugeinc.com Design DNA

### What makes hugeinc visually distinctive

1. **Headline scale is extreme** — hero text at 10–14vw. Not 4rem. Not "responsive". Viewport-relative and enormous.
2. **Periods at end of headings** — "L'expérience qui compte." Not "L'expérience qui compte"
3. **Numbered sections** — "01 / Conseil", "02 / Systèmes", etc. Mono font, small, gold, top of each section
4. **Alternating dark/light sections with full contrast** — ink-on-paper ↔ paper-on-ink. Never two consecutive same-tone sections.
5. **Full-bleed typography** — headings run edge-to-edge, padding only on body copy
6. **One accent color** — their magenta, our gold. Never more than one accent per section.
7. **Clean navigation** — no borders, no backgrounds until scroll, text-only links
8. **Statement lines** — big philosophical one-liners between sections: "Votre Supply Chain est un avantage compétitif. Pas encore." in 6vw.
9. **No border-radius** — everything is sharp corners (--radius: 0px already set)
10. **Hover = color shift only** — links go gold. No translateY, no box-shadow theatrics on text.

---

## Essor Brand Tokens

```css
/* Dark surfaces */
--dark:     #0a1420   /* primary dark bg */
--dark-2:   #0d1e30
--dark-3:   #060e18   /* deepest dark */

/* Light surfaces */
--paper:    #f5f3ee   /* primary light bg */
--cream:    #ede9e0
--ink:      #0a1420   /* text on light */

/* Brand */
--navy:     #1b3554   /* logo navy */
--gold:     #c09a2f   /* THE accent */
--gold-light: #d4b050

/* Type */
--display:  'Bodoni Moda', serif    /* ALL headings */
--mono:     'DM Mono', monospace   /* labels, numbers, tags */
body font:  'Jost', sans-serif     /* body copy */
```

---

## Typography Scale (hugeinc-mapped)

| Usage | Size | Weight | Style | Color |
|-------|------|--------|-------|-------|
| Hero statement | `clamp(4rem, 10vw, 13rem)` | 900 / 400i | upright + italic | white + gold |
| Inter-section statement | `clamp(3rem, 7vw, 9rem)` | 800 | upright | ink or dark-text |
| Section heading | `clamp(2rem, 4vw, 4.5rem)` | 800 | upright | current section color |
| Section number | `0.6rem` | 400 | mono, uppercase, 0.2em spacing | gold 50% |
| Body | `1rem–1.1rem` | 300–400 | upright | mid or dark-muted |
| Label/tag | `0.62rem` | 400 | mono, uppercase, 0.2em spacing | gold |
| Stat number | `clamp(2rem, 3vw, 3rem)` | 700 | Bodoni | gold |

**Line-height rules:**
- Display headings: `0.88–0.95` (tighter than normal)
- Body: `1.7–1.85`
- Labels: `1`

**Letter-spacing rules:**
- Display headings: `-0.02em` to `-0.03em`
- Mono labels: `+0.12em` to `+0.22em`
- Body: `0` to `+0.01em`

---

## Section Architecture

Every section follows this skeleton:

```
[section-number — mono gold]        ← "01" or "01 / Conseil"
[section-tag — .section-tag]        ← "Conseil & AMOA"
[Heading at 4vw+]                   ← Bodoni Moda 800, tight line-height
[Optional 7vw statement line]       ← The hugeinc "big idea" line
[Content grid]
[Optional bottom CTA bar]
```

### Section backgrounds — strict alternation

| Section | Background |
|---------|-----------|
| Hero | `var(--dark)` |
| Marquee | `var(--ink)` |
| Pourquoi (Why) | `var(--paper)` |
| Impact | `var(--dark)` |
| Conseil | `var(--paper)` |
| Systèmes | `var(--dark)` |
| Méthode | `var(--cream)` |
| Formation | `var(--dark)` |
| DSC | `var(--paper)` |
| Profil | `var(--paper)` |
| Engagements | `var(--dark)` |
| Insights | `var(--dark-3)` |
| Contact | `var(--dark)` |

**Rule**: never two consecutive `var(--dark)` sections without a light break, and vice versa.

---

## Animation Principles

**hugeinc animations are restrained, not flashy:**

1. **Mask reveal** — clip from bottom, content slides up into view. `overflow: hidden` wrapper + `y: 105% → 0%`
2. **Fade + lift** — `opacity: 0, y: 24px → opacity: 1, y: 0` on section entry. Duration: 0.7–0.9s, ease: `[0.16, 1, 0.3, 1]`
3. **Stagger** — children delay by `index * 0.08s` max, never `index * 0.2s` (too slow)
4. **Once only** — `useInView({ once: true, margin: '-60px' })` — never repeat on scroll back
5. **NO**: bouncing, rotating, scaling up, color-flashing, particle systems on text

```tsx
// Standard section entry pattern
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-60px' })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 28 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

---

## Component Patterns

### Statement line (hugeinc signature)
```tsx
<div style={{
  fontFamily: 'Bodoni Moda, serif',
  fontSize: 'clamp(2.5rem, 6vw, 8rem)',
  fontWeight: 800,
  lineHeight: 0.92,
  letterSpacing: '-0.025em',
  color: 'var(--gold)',
  fontStyle: 'italic',
  padding: '4rem 0',
  borderTop: '1px solid var(--border)',  // on light bg
}}>
  Votre Supply Chain est un avantage compétitif. Pas encore.
</div>
```

### Section number label
```tsx
<div style={{
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  color: 'rgba(192,154,47,0.5)',
  textTransform: 'uppercase',
  marginBottom: '1rem',
}}>
  01 / Conseil
</div>
```

### Full-bleed heading (hugeinc scale)
```tsx
<h2 style={{
  fontFamily: 'Bodoni Moda, serif',
  fontSize: 'clamp(2.8rem, 5.5vw, 7rem)',
  fontWeight: 800,
  lineHeight: 0.92,
  letterSpacing: '-0.025em',
  margin: '0 0 3rem 0',
}}>
  L&apos;expérience qui compte.
</h2>
```

### Two-column layout (hugeinc grid)
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1.8fr',  // narrow label col + wide content col
  gap: '6rem',
  alignItems: 'start',
}}>
```

---

## Anti-patterns — Never do these

- ❌ `font-size: 2rem` for a section heading — minimum is `clamp(2.5rem, 4vw, 5rem)`
- ❌ `border-radius: 8px` — radius is 0 everywhere
- ❌ Multiple gradient orbs as background — use flat color + single subtle radial max
- ❌ Icon emoji in CTA buttons — text only, or SVG arrow `→`
- ❌ Card `box-shadow` on hover on dark bg — use `border-color` change instead
- ❌ Centered body text blocks — left-aligned always
- ❌ `margin: 0 auto` max-width < 1200px — use 1300px (already in --section-inner)
- ❌ `padding: 3rem` on sections — minimum is `6rem 4rem`, preferred `8rem 4rem`

---

## hugeinc Statement Lines for Essor — Ready to use

These are the "big idea" lines in 6–8vw italic gold, placed between sections:

- *"Nous ne vendons aucun logiciel."* — Hero (done)
- *"110 missions. Un seul parti pris : votre résultat."*
- *"Votre Supply Chain est un avantage compétitif. Pas encore."*
- *"Le bon logiciel ne vaut rien sans la bonne méthode."*
- *"Indépendant. Pas parce que c'est tendance. Parce que c'est juste."*
- *"15 ans de terrain, zéro commission éditeur."*

---

## Real Essor Data (always use — never placeholder)

**Company:** Essor Consulting
**Founder:** Youssef BAHAIDA
**Location:** Casablanca, Maroc
**Email:** b.youssef@essor.ma
**Phone:** +212 06 63 44 92 00

**Stats:** 110+ missions · 15+ ans · 0 commission · ~5 consultants

**Clients:** Renault-Nissan · L'Oréal Maroc · Nestlé · P&G · HP · DHL · Huawei · J&J · Centrale Laitière · Cosumar · Nexans · Diana Holding · Acima · Addoha · Mars · OCP · Marjane

**Certifications:** DDMRP Certified · ENSA Agadir · KEDGE/UM6P · European Training Foundation · Task Force Vaccination COVID-19

**Schools taught:** TBS · ISCAE · HEM · ENCG · EMI · EHTP · ENSA · ENSAM
