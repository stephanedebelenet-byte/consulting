# /section — Add a new hugeinc-style section to Essor Consulting

Apply the essor-hugeinc skill and create a new React/TypeScript section component for the Essor Consulting site.

## Input
$ARGUMENTS — describe the section: name, purpose, content to include.

## Rules

1. **Background**: Follow the strict dark/light alternation from the essor-hugeinc SKILL.md. If the adjacent sections are dark, use `var(--paper)`. If light, use `var(--dark)`.

2. **Section number**: Include a mono number label at the top (e.g., "03 / Méthode"). Format: `0.6rem`, `letterSpacing: '0.2em'`, `color: 'rgba(192,154,47,0.5)'`.

3. **Heading scale**: Minimum `clamp(2.5rem, 4vw, 5rem)`. Preferred `clamp(2.8rem, 5.5vw, 7rem)`. Bodoni Moda 800, `lineHeight: 0.92`, `letterSpacing: '-0.025em'`.

4. **Statement line**: Add one big hugeinc-style italic gold statement at 6vw if the section has a key message. Pick from the SKILL.md list or create a new one in the same spirit.

5. **Padding**: `padding: '8rem 4rem'` minimum. Use `<div className="section-inner">` for max-width 1300px container.

6. **Animation**: Wrap every subsection in the standard `useInView` + framer-motion pattern. `once: true`, `margin: '-60px'`.

7. **Typography**: No section heading below 2.5rem. Body at 1rem–1.1rem Jost 300–400. Labels in DM Mono 0.62rem uppercase.

8. **Real data only**: Use actual Essor client names, stats, and certifications. No placeholders.

9. **Zero border-radius**: `--radius: 0px` is already set. Don't add `borderRadius` to cards.

10. **File location**: Save as `C:\consulting\src\components\[SectionName].tsx` and confirm import in App.tsx if new.

## Output
Complete .tsx file. TypeScript strict. No placeholder text. No comments explaining what each block does.
