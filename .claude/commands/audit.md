# /audit — Audit the full site against hugeinc design standards

Read every section component and score it against the essor-hugeinc design system. Output a prioritized fix list.

## Steps

1. Read all files in `C:\consulting\src\components\`
2. For each component, check:

### Typography audit
- [ ] Section headings ≥ `clamp(2.5rem, 4vw, 5rem)`?
- [ ] Hero/statement lines ≥ `clamp(4rem, 8vw, 10rem)`?
- [ ] `lineHeight` ≤ 0.95 on display headings?
- [ ] `letterSpacing: '-0.02em'` on display headings?
- [ ] All labels in DM Mono uppercase?

### Layout audit
- [ ] Section padding ≥ `8rem 4rem`?
- [ ] `className="section-inner"` wrapping content?
- [ ] Section number label present?
- [ ] Zero `borderRadius` on cards/containers?
- [ ] Body text left-aligned?

### Color/background audit
- [ ] Dark/light alternation respected?
- [ ] No more than 1 gold accent element per visual cluster?
- [ ] Buttons using `.btn-primary` / `.btn-ghost` / `.btn-outline`?
- [ ] No emoji in buttons?

### Data audit
- [ ] No fake contact info (cabinet-sc.ma, +212 6 00 00)?
- [ ] No `[Prénom Nom]` or other placeholders?
- [ ] Real client names in marquee/references?

### Animation audit
- [ ] All scroll animations use `once: true`?
- [ ] No `transition-duration` > 1s on UI elements?
- [ ] No scale/rotate animations on text?

## Output format
For each component: ✅ PASS or list of specific violations with line numbers and exact fix.
End with a priority ranking: which component needs the most urgent redesign.
