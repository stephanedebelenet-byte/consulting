import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { preloadRoute } from './App.tsx'

// Le code de la page demandée est chargé avant le premier rendu : createRoot
// remplace alors le HTML prérendu par la page complète en une fois, au lieu
// d'afficher d'abord le fallback, la FAQ et le pied de page (voir lazyPage
// dans App.tsx). En cas d'échec du chargement, l'app se monte quand même.
preloadRoute(window.location.pathname).finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
