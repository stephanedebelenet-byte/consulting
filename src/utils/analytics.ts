// Google Analytics 4 + Google Ads — identifiants publics (visibles côté client
// de toute façon), donc écrits en dur ci-dessous comme valeurs par défaut.
//
// Attention : le bloc "env" de vercel.json n'est PAS injecté au build Vite
// (constaté en prod le 26/09/2026 : aucune balise Google dans le bundle).
// Une variable VITE_* définie dans Vercel → Project Settings → Environment
// Variables reste possible et prend le pas sur la valeur par défaut.
//
// Google Ads : action de conversion "Demande ingénierie formation"
// (Objectifs > Conversions > Détails > Utiliser Google Tag Manager).
//
// Convention UTM pour tout lien partagé hors du site (LinkedIn, WhatsApp, email) :
//   utm_source=<canal>        ex. linkedin, whatsapp, email, newsletter
//   utm_medium=<type>         ex. social, message, email
//   utm_campaign=<nom-court>  ex. rl-session-oct2026, rl-relance-j7
//
// Exemple pour l'annonce de la session du 23 octobre sur LinkedIn :
//   https://nextinotech.com/formation-rl?utm_source=linkedin&utm_medium=social&utm_campaign=rl-session-oct2026

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-TFF7N0G2P0'
const GADS_ID = (import.meta.env.VITE_GADS_CONVERSION_ID as string | undefined) || 'AW-809033146'
const GADS_CONVERSION_LABEL =
  (import.meta.env.VITE_GADS_CONVERSION_LABEL as string | undefined) || 'N0s8CKWi0YYdELq744ED'

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
