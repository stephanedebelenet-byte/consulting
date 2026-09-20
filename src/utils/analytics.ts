// Google Analytics 4 + Google Ads — activés uniquement si les identifiants
// correspondants sont définis (build Vite : variables injectées à la
// compilation, voir vercel.json "env"). Sans identifiant réel, ce module ne
// fait rien — pas de tag cassé, pas d'ID inventé.
//
// Google Ads (conversions) : à remplir dans vercel.json → "env" une fois la
// première campagne créée :
//   VITE_GADS_CONVERSION_ID    ex. "AW-123456789"   (Outils > Conversions > Détails du compte)
//   VITE_GADS_CONVERSION_LABEL ex. "AbC-D3fGhIjKlMnO" (fourni à la création de l'action
//                                                       de conversion "Demande de diagnostic")
// Les deux valeurs sont publiques (visibles côté client de toute façon), pas
// besoin d'un .env séparé — même convention que VITE_GA_MEASUREMENT_ID.
//
// Convention UTM pour tout lien partagé hors du site (LinkedIn, WhatsApp, email) :
//   utm_source=<canal>        ex. linkedin, whatsapp, email, newsletter
//   utm_medium=<type>         ex. social, message, email
//   utm_campaign=<nom-court>  ex. rl-session-oct2026, rl-relance-j7
//
// Exemple pour l'annonce de la session du 23 octobre sur LinkedIn :
//   https://nextinotech.com/formation-rl?utm_source=linkedin&utm_medium=social&utm_campaign=rl-session-oct2026

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
const GADS_ID = import.meta.env.VITE_GADS_CONVERSION_ID as string | undefined
const GADS_CONVERSION_LABEL = import.meta.env.VITE_GADS_CONVERSION_LABEL as string | undefined

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false

export function initGA() {
  if (initialized || (!GA_ID && !GADS_ID)) return
  initialized = true

  // Un seul script gtag.js suffit pour piloter GA4 et Google Ads ensemble —
  // peu importe lequel des deux IDs sert à charger la librairie.
  const bootstrapId = GA_ID || (GADS_ID as string)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${bootstrapId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view: false — on envoie nous-mêmes les page_view à chaque
  // changement de route, cette app étant une SPA (pas de rechargement HTML).
  if (GA_ID) window.gtag('config', GA_ID, { send_page_view: false })
  if (GADS_ID) window.gtag('config', GADS_ID)
}

export function trackPageView(path: string) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

/**
 * Envoie une conversion Google Ads (ex. formulaire de lead soumis avec
 * succès). Ne fait rien tant que VITE_GADS_CONVERSION_ID et
 * VITE_GADS_CONVERSION_LABEL ne sont pas renseignés.
 */
export function trackConversion(): void {
  if (!GADS_ID || !GADS_CONVERSION_LABEL || !window.gtag) return
  window.gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_CONVERSION_LABEL}` })
}
