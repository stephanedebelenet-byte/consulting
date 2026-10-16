// index.css est importé par src/main.tsx (point d'entrée client). Ne pas le
// réimporter ici : App est aussi chargé par vite.config.ts pour le rendu SSR
// statique, et le chargeur de config Vite ne sait pas lire un import CSS.
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import { LocaleProvider, type Locale } from './i18n/locale'
import ServicesRedirect from './components/ServicesRedirect'
import { VILLES } from './data/villesFormation'
const HomePage = lazy(() => import('./pages/HomePage'))
const ConseilPage = lazy(() => import('./pages/ConseilPage'))
const PrestationsPage = lazy(() => import('./pages/PrestationsPage'))
const ReferencesPage = lazy(() => import('./pages/ReferencesPage'))
const FormationPage = lazy(() => import('./pages/FormationPage'))
const FormationRLPage = lazy(() => import('./pages/FormationRLPage'))
const FormationImportPage = lazy(() => import('./pages/FormationImportPage'))
const FormationVillePage = lazy(() => import('./pages/FormationVillePage'))
const FormationProgrammePage = lazy(() => import('./pages/FormationProgrammePage'))
const AProposPage = lazy(() => import('./pages/AProposPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const EvenementPage = lazy(() => import('./pages/EvenementPage'))
const MarquageTracabilitePage = lazy(() => import('./pages/MarquageTracabilitePage'))
const CarteNfcPage = lazy(() => import('./pages/CarteNfcPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ConfidentialitePage = lazy(() => import('./pages/ConfidentialitePage'))
const DimensionnementEntrepotPage = lazy(() => import('./pages/DimensionnementEntrepotPage'))
const ProductiviteEnginsPage = lazy(() => import('./pages/ProductiviteEnginsPage'))
const CoutGlobalEntrepotPage = lazy(() => import('./pages/CoutGlobalEntrepotPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const DemoWmsPage = lazy(() => import('./pages/DemoWmsPage'))
const DemoTmsPage = lazy(() => import('./pages/DemoTmsPage'))
const DemoApsPage = lazy(() => import('./pages/DemoApsPage'))
const CarrierePage = lazy(() => import('./pages/CarrierePage'))
const DirecteurLogistiqueMiTempsPage = lazy(() => import('./pages/DirecteurLogistiqueMiTempsPage'))
const DirecteurAchatsMiTempsPage = lazy(() => import('./pages/DirecteurAchatsMiTempsPage'))
const DirectionSCTempsPartagePage = lazy(() => import('./pages/DirectionSCTempsPartagePage'))
const DscVsRecrutementCdiPage = lazy(() => import('./pages/DscVsRecrutementCdiPage'))
const AccompagnementOeaPage = lazy(() => import('./pages/AccompagnementOeaPage'))
const IngenierieFormationPage = lazy(() => import('./pages/IngenierieFormationPage'))
const CatalogueMetiersPage = lazy(() => import('./pages/CatalogueMetiersPage'))
const ControlTowerPage = lazy(() => import('./pages/ControlTowerPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Les pages restent synchrones pendant le build SSR pour que le HTML remis
// aux robots contienne leur corps complet. Dans le navigateur, chaque route
// est chargée à la demande pour réduire le JavaScript initial.
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  // /blog et /blog/<slug> partagent une clé : ouvrir ou fermer un article
  // change l'URL sans remonter la page (pas de transition, pas de rechargement
  // des 514 articles). Les autres pages gardent une clé par adresse.
  const routeKey = location.pathname.startsWith('/blog') ? '/blog' : location.pathname
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="page-loading" role="status">Chargement…</div>}>
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/en" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/conseil" element={<PageTransition><ConseilPage /></PageTransition>} />
        <Route path="/en/consulting" element={<PageTransition><ConseilPage /></PageTransition>} />
        <Route path="/prestations" element={<PageTransition><PrestationsPage /></PageTransition>} />
        <Route path="/en/services" element={<PageTransition><PrestationsPage /></PageTransition>} />
        <Route path="/control-tower" element={<PageTransition><ControlTowerPage /></PageTransition>} />
        <Route path="/en/control-tower" element={<PageTransition><ControlTowerPage /></PageTransition>} />
        <Route path="/services" element={<ServicesRedirect />} />
        <Route path="/references" element={<PageTransition><ReferencesPage /></PageTransition>} />
        <Route path="/formation" element={<PageTransition><FormationPage /></PageTransition>} />
        <Route path="/en/training" element={<PageTransition><FormationPage /></PageTransition>} />
        {/* Le canon (sitemap.xml, llms.txt, liens internes) utilise l'URL avec
            slash final ; on enregistre les deux formes pour ne rien casser. */}
        <Route path="/formation-rl" element={<PageTransition><FormationRLPage /></PageTransition>} />
        <Route path="/formation-rl/" element={<PageTransition><FormationRLPage /></PageTransition>} />
        <Route path="/formation-import" element={<PageTransition><FormationImportPage /></PageTransition>} />
        <Route path="/formation-import/" element={<PageTransition><FormationImportPage /></PageTransition>} />
        {/* Une route par ville : React Router 6 ne sait pas lire un paramètre
            collé à du texte (« /formation-logistique-:ville » ne correspondait
            à rien et servait la page 404, en SSR comme dans le navigateur). */}
        {VILLES.map((v) => (
          <Route key={v.slug} path={`/formation-logistique-${v.slug}`} element={<PageTransition><FormationVillePage slug={v.slug} /></PageTransition>} />
        ))}
        <Route path="/formation/:programme" element={<PageTransition><FormationProgrammePage /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><AProposPage /></PageTransition>} />
        <Route path="/en/about" element={<PageTransition><AProposPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/evenements/:slug" element={<PageTransition><EvenementPage /></PageTransition>} />
        <Route path="/solutions/marquage-et-tracabilite" element={<PageTransition><MarquageTracabilitePage /></PageTransition>} />
        <Route path="/solutions/carte-visite-digitale-nfc" element={<PageTransition><CarteNfcPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/en/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/confidentialite" element={<PageTransition><ConfidentialitePage /></PageTransition>} />
        <Route path="/outils/dimensionnement-entrepot" element={<PageTransition><DimensionnementEntrepotPage /></PageTransition>} />
        <Route path="/outils/productivite-engins-main-doeuvre" element={<PageTransition><ProductiviteEnginsPage /></PageTransition>} />
        <Route path="/outils/cout-global-entrepot" element={<PageTransition><CoutGlobalEntrepotPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/demo/wms" element={<PageTransition><DemoWmsPage /></PageTransition>} />
        <Route path="/demo/tms" element={<PageTransition><DemoTmsPage /></PageTransition>} />
        <Route path="/demo/aps" element={<PageTransition><DemoApsPage /></PageTransition>} />
        <Route path="/carriere" element={<PageTransition><CarrierePage /></PageTransition>} />
        <Route path="/directeur-logistique-mi-temps" element={<PageTransition><DirecteurLogistiqueMiTempsPage /></PageTransition>} />
        <Route path="/directeur-achats-mi-temps" element={<PageTransition><DirecteurAchatsMiTempsPage /></PageTransition>} />
        <Route path="/direction-supply-chain-temps-partage" element={<PageTransition><DirectionSCTempsPartagePage /></PageTransition>} />
        <Route path="/dsc-vs-recrutement-cdi" element={<PageTransition><DscVsRecrutementCdiPage /></PageTransition>} />
        <Route path="/accompagnement-oea" element={<PageTransition><AccompagnementOeaPage /></PageTransition>} />
        <Route path="/ingenierie-formation" element={<PageTransition><IngenierieFormationPage /></PageTransition>} />
        <Route path="/ingenierie-formation/catalogue" element={<PageTransition><CatalogueMetiersPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

// Arbre de composants indépendant du routeur, réutilisé côté client
// (BrowserRouter, ci-dessous) et côté build pour le rendu SSR statique des
// pages "app" (StaticRouter, voir renderAppRoute dans vite.config.ts — le
// chantier qui corrige le <body> vide de ces pages pour les crawlers qui
// n'exécutent pas de JS, voir audit GEO du 25/09/2026).
export function AppRoutes() {
  const { pathname } = useLocation()
  // Anglais (27/09/2026) : locale dérivée du préfixe d'URL /en, jamais d'un
  // choix de navigateur ou d'un cookie — chaque langue a sa propre adresse
  // indexable (SEO), voir src/i18n/locale.tsx. '/en' et '/en/' visent la même
  // page que '/'. Englobe Layout (Nav/Footer/MobileTabBar en dépendent aussi).
  const locale: Locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
  return (
    <LocaleProvider locale={locale}>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </LocaleProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
