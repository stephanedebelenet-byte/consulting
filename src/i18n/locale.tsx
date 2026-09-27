import { createContext, useContext, type ReactNode } from 'react'

// Infrastructure d'internationalisation (anglais, 27/09/2026). Le site est
// nativement français : ce module ajoute une deuxième langue par-dessus,
// sans toucher au rendu ni aux URLs françaises existantes (locale par défaut
// = 'fr', comportement strictement inchangé). Voir aussi vite.config.ts
// (prérendu <html lang>, hreflang) et src/data/routeMeta.ts (entrées /en/*).
export type Locale = 'fr' | 'en'

const LocaleCtx = createContext<Locale>('fr')

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleCtx.Provider value={locale}>{children}</LocaleCtx.Provider>
}

// Pages qui ont une version anglaise publiée : chemin français canonique →
// chemin anglais complet (avec /en — pas toujours un simple préfixe, une
// page traduite peut avoir une adresse anglaise idiomatique, ex. /a-propos
// → /en/about, meilleure pour le SEO anglais qu'un calque du français).
// Un lien vers une page absente de cette table reste en français même
// affiché en contexte anglais — jamais de lien mort pendant le déploiement
// progressif de la traduction (pages commerciales d'abord, voir discussion
// du 27/09/2026 ; le blog n'est pas dans ce périmètre).
const FR_TO_EN: Record<string, string> = {
  '/': '/en',
  '/contact': '/en/contact',
  '/a-propos': '/en/about',
  '/control-tower': '/en/control-tower',
  '/prestations': '/en/services',
  '/formation': '/en/training',
  '/conseil': '/en/consulting',
}

// Table inverse, construite une fois : chemin anglais → chemin français
// (pour le sélecteur de langue, qui part d'une URL /en/... et doit
// retrouver la page française correspondante).
const EN_TO_FR: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN).map(([fr, en]) => [en, fr])
)

export function localizedHref(locale: Locale, frPath: string): string {
  if (locale !== 'en') return frPath
  return FR_TO_EN[frPath] ?? frPath
}

// Pour le sélecteur de langue : la meilleure adresse dans l'autre langue à
// partir du chemin courant. Bascule vers l'accueil de la langue cible si la
// page courante n'a pas encore de traduction (jamais de lien mort).
export function switchLocaleHref(pathname: string): string {
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  if (isEn) return EN_TO_FR[pathname] ?? '/'
  return FR_TO_EN[pathname] ?? '/en'
}

export function useLocale() {
  const locale = useContext(LocaleCtx)
  // tr(texteFrançais, texteAnglais) : renvoie le texte dans la langue
  // courante. Le français reste la valeur par défaut/de repli.
  function tr<T>(fr: T, en: T): T {
    return locale === 'en' ? en : fr
  }
  function href(frPath: string): string {
    return localizedHref(locale, frPath)
  }
  return { locale, tr, href }
}
