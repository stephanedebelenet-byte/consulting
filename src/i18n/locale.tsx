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

// Pages qui ont une version anglaise publiée (chemin français canonique,
// sans le préfixe /en). Un lien vers une page absente de cette liste reste
// en français même affiché en contexte anglais — pointer vers une adresse
// /en/... qui n'existe pas encore casserait la navigation. Complétée au fur
// et à mesure de la traduction du site (pages commerciales d'abord, voir
// discussion du 27/09/2026 ; le blog n'est pas dans ce périmètre).
export const EN_PATHS = new Set<string>(['/'])

export function localizedHref(locale: Locale, frPath: string): string {
  if (locale !== 'en' || !EN_PATHS.has(frPath)) return frPath
  return frPath === '/' ? '/en' : `/en${frPath}`
}

// Pour le sélecteur de langue : la meilleure adresse dans l'autre langue à
// partir du chemin courant. Bascule vers l'accueil anglais si la page
// courante n'a pas encore de traduction (jamais de lien mort).
export function switchLocaleHref(pathname: string): string {
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  if (isEn) {
    const fr = pathname === '/en' ? '/' : pathname.slice('/en'.length)
    return fr || '/'
  }
  return localizedHref('en', pathname) !== pathname ? localizedHref('en', pathname) : '/en'
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
