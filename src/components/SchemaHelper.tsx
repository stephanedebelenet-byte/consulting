// Données structurées JSON-LD d'une page.
//
// Rendu comme une vraie balise <script type="application/ld+json"> (et non
// injecté dans <head> par un useEffect, comme avant le 25/09/2026) : le rendu
// statique du build (src/entry-server.tsx) l'écrit ainsi dans le HTML servi,
// lisible par Google dès le premier passage et par les crawlers IA qui
// n'exécutent pas de JavaScript. Google accepte le JSON-LD dans le <body>.
//
// Si la même donnée figure déjà dans le <head> via src/data/routeMeta.ts,
// scripts/prerender-app-bodies.mjs retire la copie du <body> au build.
export function SchemaScript({ schema }: { schema: Record<string, unknown> }) {
  // "<" échappé pour qu'un texte contenant "</script>" ne puisse pas fermer
  // la balise prématurément.
  const json = JSON.stringify(schema).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export default SchemaScript
