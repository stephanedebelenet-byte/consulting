// Point d'entrée SSR, utilisé uniquement au build (jamais servi au navigateur).
//
// Construit par `vite build --ssr src/entry-server.tsx --outDir dist-ssr`, puis
// chargé par scripts/prerender-app-bodies.mjs pour remplir le <body> des pages
// "app" prérendues (accueil, /conseil, /formation, villes, programmes...).
//
// Pourquoi : jusqu'ici, ces pages étaient servies avec <div id="root"></div>
// vide. Leur contenu n'apparaissait qu'après exécution du JS dans un
// navigateur, donc jamais pour GPTBot, ClaudeBot, PerplexityBot et les autres
// crawlers IA qui n'exécutent pas de JavaScript (audit GEO du 25/09/2026).
//
// Sûr : src/main.tsx monte l'app avec createRoot (pas hydrateRoot), qui
// remplace intégralement ce HTML statique dès que le bundle client s'exécute.
// Aucun risque de mismatch d'hydratation.
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from './App'

export { primeMarkdown } from './data/markdownPreload'

export function render(url: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  )
}
