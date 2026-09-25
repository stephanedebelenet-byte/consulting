// Vrai uniquement pendant le rendu statique au build (src/entry-server.tsx,
// exécuté en Node), jamais dans le navigateur.
//
// Usage : état initial des accordéons de contenu (FAQ, détails d'offres) —
// `useState(IS_SERVER)`. Au build, ils sont rendus ouverts, donc réponses et
// détails figurent dans le HTML servi aux crawlers IA qui n'exécutent pas de
// JS (GPTBot, ClaudeBot, PerplexityBot). Dans le navigateur, createRoot
// remplace ce HTML et les accordéons démarrent fermés comme avant : aucun
// changement visible pour l'utilisateur. Contenu identique, simplement
// déplié — pas de cloaking.
export const IS_SERVER = typeof window === 'undefined'
