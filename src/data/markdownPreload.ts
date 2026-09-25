// Contenu markdown fourni à l'avance au rendu statique du build.
//
// Certains composants (Evenement) chargent leur markdown par fetch() dans le
// navigateur. En rendu serveur (src/entry-server.tsx), ce fetch n'a jamais
// lieu : la page prérendue n'affichait qu'un écran de chargement, sans le
// contenu ni le schéma Event. scripts/prerender-app-bodies.mjs remplit ce
// cache avec les fichiers de public/blog/ avant le rendu.
//
// Dans le navigateur, le cache reste vide : les composants font leur fetch
// comme avant, aucun changement de comportement.
const cache = new Map<string, string>()

export function primeMarkdown(file: string, raw: string): void {
  cache.set(file, raw)
}

export function getPrimedMarkdown(file: string): string | undefined {
  return cache.get(file)
}
