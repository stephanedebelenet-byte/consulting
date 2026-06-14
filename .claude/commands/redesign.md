# /redesign — Redesign an existing section in hugeinc style

Apply the essor-hugeinc skill and completely rewrite an existing section component to match hugeinc.com's editorial design DNA, adapted for Essor Consulting.

## Input
$ARGUMENTS — the component name to redesign (e.g., "Conseil", "Methode", "Formation").

## Steps

1. **Read** the current file at `C:\consulting\src\components\[ComponentName].tsx`
2. **Audit** against these hugeinc principles — flag every violation:
   - Heading too small (< 3rem at any viewport)
   - Missing section number label
   - Background doesn't follow alternation pattern
   - Border-radius on cards
   - Padding < 6rem
   - Body text centered
   - Placeholder data (fake emails, phone numbers, names)
   - Gradient orbs as background decoration
   - Emoji in buttons
3. **Rewrite** the entire component with:
   - hugeinc heading scale: `clamp(2.8rem, 5.5vw, 7rem)` for h2
   - Statement line at `clamp(2.5rem, 6vw, 8rem)` italic gold if applicable
   - Section number in mono: "0X / Name"
   - Proper padding: `8rem 4rem`
   - `className="section-inner"` for 1300px max-width
   - `useInView` animations, stagger on children
   - Real Essor data: b.youssef@essor.ma / +212 06 63 44 92 00 / Youssef BAHAIDA
   - `.btn-primary` / `.btn-ghost` / `.btn-outline` for all CTAs
   - Dark/light background per alternation table
4. **Verify** TypeScript compiles — no `any`, no missing props

## Design constraints
- Zero `borderRadius` (--radius is 0)
- No orb divs unless hero section
- No emoji outside of decorative SVG
- Hover effects: `border-color` or `color` change only (no scale, no translateY on cards)
- Max 1 gold accent element per visual cluster
