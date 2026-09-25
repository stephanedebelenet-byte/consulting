import { Navigate } from 'react-router-dom'

// /services a été scindée en /conseil et /prestations. Cette redirection couvre
// les anciens liens externes/marque-pages : /services, /services#conseil,
// /services#systemes, /services#pourquoi -> /conseil (le contenu Conseil &
// Expertise reste sur /conseil). Les ancres Prestations connues (aucune en usage
// interne actuellement, gardé pour compatibilité de liens externes éventuels)
// -> /prestations.
// Exporté pour ConseilPage : depuis que /services est redirigé en 301 vers
// /conseil côté serveur (vercel.json), c'est /conseil qui reçoit l'ancre et
// renvoie les ancres Prestations vers /prestations.
export const PRESTATIONS_ANCHORS = ['#prestations', '#valeur-ajoutee', '#pack-inventaire', '#leibinger', '#solutions-it']

function resolveServicesRedirect(): string {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  if (PRESTATIONS_ANCHORS.includes(hash)) return '/prestations'
  return '/conseil'
}

export default function ServicesRedirect() {
  return <Navigate to={resolveServicesRedirect()} replace />
}
