/**
 * Convertit un titre en slug d'URL propre.
 *
 * Corrige le bug historique (voir audit UI/UX) où les caractères accentués
 * étaient purement supprimés (`é` → rien) au lieu d'être translittérés
 * (`é` → `e`), et où les apostrophes disparaissaient sans séparateur —
 * produisant des URLs illisibles comme `/blog/dploiement-wms-...` ou
 * `/blog/former-ses-acheteurs-lia-gnrative-...`.
 *
 * - minuscules
 * - accents translittérés (é→e, è→e, ô→o, ç→c, …) via décomposition NFD
 * - apostrophes (droites et typographiques) remplacées par un tiret
 * - ponctuation restante retirée
 * - espaces → tirets, tirets multiples collapsés, bords nettoyés
 * - troncature à `maxLength` sans couper un mot en deux
 */
export function slugify(title: string, maxLength = 60): string {
  let slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritiques (é→e, ô→o, ç→c…)
    .replace(/['''`]/g, '-') // apostrophes → tiret (jamais supprimées silencieusement)
    .replace(/[^a-z0-9\s-]/g, '') // ponctuation restante
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (slug.length > maxLength) {
    const cut = slug.slice(0, maxLength)
    const lastDash = cut.lastIndexOf('-')
    // ne coupe pas un mot en deux, sauf si ça retirerait plus de la moitié du slug
    slug = lastDash > maxLength * 0.5 ? cut.slice(0, lastDash) : cut
  }

  return slug
}
