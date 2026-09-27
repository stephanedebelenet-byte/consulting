// Extrait un bloc « ## Questions fréquentes » du corps Markdown d'un article
// de blog, pour générer son balisage FAQPage — pilote lancé le 27/09/2026 sur
// 15 articles qui ont déjà des impressions Search Console (voir point 7 de
// l'audit SEO/GEO : comparer les positions avant/après sous 3-4 semaines).
//
// Convention d'écriture dans le .md, respectée par le style éditorial du
// blog (une seule fois par article) :
//
//   ## Questions fréquentes
//
//   #### Question complète, formulée comme une vraie recherche ?
//
//   Réponse en une ou deux phrases, autonome hors contexte.
//
//   #### Deuxième question ?
//
//   Réponse.
//
// Module pur, sans React ni DOM : appelé uniquement au build (vite.config.ts)
// pour ajouter un nœud FAQPage au <head> prérendu de l'article, à partir du
// même texte que celui affiché (post.rawContent) — donc jamais de divergence
// possible entre le JSON-LD et le texte visible (règle 13 de
// check-seo-consistency : toute question balisée doit être visible dans la
// page). Rien à faire côté Blog.tsx : les lignes "## "/"#### " se rendent
// déjà normalement via le parseur Markdown existant (classes blog-h2/blog-h4),
// et la donnée structurée que lit Google est celle du <head> statique, pas
// celle que le composant React réinjecte dans le <body> une fois monté.

export interface ArticleFaqItem {
  q: string
  a: string
}

// Texte brut pour le JSON-LD : retire la mise en forme Markdown inline sans
// changer le sens, jamais utilisé pour l'affichage (qui passe par le
// parseur Markdown normal, qui rend les mêmes lignes en <h4>/<p>).
function toPlainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractArticleFaq(rawMarkdown: string): ArticleFaqItem[] {
  const lines = rawMarkdown.split('\n')
  const sectionStart = lines.findIndex((l) => /^##\s+Questions fréquentes\s*$/i.test(l.trim()))
  if (sectionStart === -1) return []

  const items: ArticleFaqItem[] = []
  let i = sectionStart + 1
  let currentQ: string | null = null
  let currentA: string[] = []

  const flush = () => {
    if (currentQ && currentA.length) {
      items.push({ q: currentQ.trim(), a: toPlainText(currentA.join(' ')) })
    }
    currentQ = null
    currentA = []
  }

  for (; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    // Une section de niveau ## ou moins referme le bloc FAQ.
    if (/^##\s+/.test(trimmed) && !/^####/.test(trimmed)) break
    const qMatch = trimmed.match(/^####\s+(.+)/)
    if (qMatch) {
      flush()
      currentQ = qMatch[1]
      continue
    }
    if (currentQ && trimmed) currentA.push(trimmed)
  }
  flush()
  return items
}
