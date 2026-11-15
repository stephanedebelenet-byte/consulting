/* eslint-disable react-refresh/only-export-components -- preloadRoute est partagé avec main.tsx (préchargement avant le premier rendu) */
// index.css est importé par src/main.tsx (point d'entrée client). Ne pas le
// réimporter ici : App est aussi chargé par vite.config.ts pour le rendu SSR
// statique, et le chargeur de config Vite ne sait pas lire un import CSS.
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import Layout from './components/Layout'
import { LocaleProvider, type Locale } from './i18n/locale'
import ServicesRedirect from './components/ServicesRedirect'
import { VILLES } from './data/villesFormation'

// Chargement des pages à la demande, préchargeable (audit SEO du 15/11/2026).
//
// main.tsx monte l'app avec createRoot, qui remplace le HTML prérendu. Sans
// préchargement, le premier rendu suspendait sur la page paresseuse : la
// FAQ et le pied de page (rendus par Layout) s'affichaient seuls en haut de
// l'écran, puis la page s'insérait au-dessus et les repoussait (CLS de 0,97
// mesuré sur l'accueil). main.tsx appelle donc preloadRoute() avant le
// premier rendu ; une fois le module chargé, la fabrique renvoie un thenable
// synchrone et React affiche la page sans passer par le fallback.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- même signature que React.lazy
type PageModule = { default: ComponentType<any>; prepare?: (pathname: string) => Promise<void> }
function lazyPage(factory: () => Promise<PageModule>) {
  let loaded: PageModule | undefined
  const preload = () => factory().then((m) => (loaded = m))
  const Page = lazy(() =>
    loaded
      ? ({ then: (resolve: (m: PageModule) => void) => resolve(loaded!) } as unknown as Promise<PageModule>)
      : preload(),
  )
  return Object.assign(Page, { preload })
}
const HomePage = lazyPage(() => import('./pages/HomePage'))
const DiagnosticPage = lazyPage(() => import('./pages/DiagnosticPage'))
const ConseilPage = lazyPage(() => import('./pages/ConseilPage'))
const PrestationsPage = lazyPage(() => import('./pages/PrestationsPage'))
const ReferencesPage = lazyPage(() => import('./pages/ReferencesPage'))
const FormationPage = lazyPage(() => import('./pages/FormationPage'))
const FormationRLPage = lazyPage(() => import('./pages/FormationRLPage'))
const FormationImportPage = lazyPage(() => import('./pages/FormationImportPage'))
const FormationVillePage = lazyPage(() => import('./pages/FormationVillePage'))
const FormationProgrammePage = lazyPage(() => import('./pages/FormationProgrammePage'))
const AProposPage = lazyPage(() => import('./pages/AProposPage'))
const BlogPage = lazyPage(() => import('./pages/BlogPage'))
const EvenementPage = lazyPage(() => import('./pages/EvenementPage'))
const MarquageTracabilitePage = lazyPage(() => import('./pages/MarquageTracabilitePage'))
const CarteNfcPage = lazyPage(() => import('./pages/CarteNfcPage'))
const ContactPage = lazyPage(() => import('./pages/ContactPage'))
const ConfidentialitePage = lazyPage(() => import('./pages/ConfidentialitePage'))
const DimensionnementEntrepotPage = lazyPage(() => import('./pages/DimensionnementEntrepotPage'))
const ProductiviteEnginsPage = lazyPage(() => import('./pages/ProductiviteEnginsPage'))
const CoutGlobalEntrepotPage = lazyPage(() => import('./pages/CoutGlobalEntrepotPage'))
const FaqPage = lazyPage(() => import('./pages/FaqPage'))
const DemoWmsPage = lazyPage(() => import('./pages/DemoWmsPage'))
const DemoTmsPage = lazyPage(() => import('./pages/DemoTmsPage'))
const DemoApsPage = lazyPage(() => import('./pages/DemoApsPage'))
const CarrierePage = lazyPage(() => import('./pages/CarrierePage'))
const DirecteurLogistiqueMiTempsPage = lazyPage(() => import('./pages/DirecteurLogistiqueMiTempsPage'))
const DirecteurAchatsMiTempsPage = lazyPage(() => import('./pages/DirecteurAchatsMiTempsPage'))
const DirectionSCTempsPartagePage = lazyPage(() => import('./pages/DirectionSCTempsPartagePage'))
const DscVsRecrutementCdiPage = lazyPage(() => import('./pages/DscVsRecrutementCdiPage'))
const AccompagnementOeaPage = lazyPage(() => import('./pages/AccompagnementOeaPage'))
const IngenierieFormationPage = lazyPage(() => import('./pages/IngenierieFormationPage'))
const CatalogueMetiersPage = lazyPage(() => import('./pages/CatalogueMetiersPage'))
const ControlTowerPage = lazyPage(() => import('./pages/ControlTowerPage'))
const MissionsPage = lazyPage(() => import('./pages/MissionsPage'))
const MissionPage = lazyPage(() => import('./pages/MissionPage'))
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'))


// Correspondance adresse → page, dans l'ordre des <Route> ci-dessous (la
// première qui correspond gagne). Sert uniquement au préchargement.
const ROUTE_PAGES: [RegExp, { preload: () => Promise<PageModule> }][] = [
  [/^\/(en)?$/, HomePage],
  [/^\/(conseil|en\/consulting)$/, ConseilPage],
  [/^\/diagnostic-supply-chain$/, DiagnosticPage],
  [/^\/(prestations|en\/services)$/, PrestationsPage],
  [/^\/(en\/)?control-tower$/, ControlTowerPage],
  [/^\/references$/, ReferencesPage],
  [/^\/(formation|en\/training)$/, FormationPage],
  [/^\/formation-rl$/, FormationRLPage],
  [/^\/formation-import$/, FormationImportPage],
  [/^\/formation-logistique-[a-z-]+$/, FormationVillePage],
  [/^\/formation\/[^/]+$/, FormationProgrammePage],
  [/^\/(a-propos|en\/about)$/, AProposPage],
  [/^\/blog(\/.*)?$/, BlogPage],
  [/^\/evenements\/[^/]+$/, EvenementPage],
  [/^\/solutions\/marquage-et-tracabilite$/, MarquageTracabilitePage],
  [/^\/solutions\/carte-visite-digitale-nfc$/, CarteNfcPage],
  [/^\/(en\/)?contact$/, ContactPage],
  [/^\/confidentialite$/, ConfidentialitePage],
  [/^\/outils\/dimensionnement-entrepot$/, DimensionnementEntrepotPage],
  [/^\/outils\/productivite-engins-main-doeuvre$/, ProductiviteEnginsPage],
  [/^\/outils\/cout-global-entrepot$/, CoutGlobalEntrepotPage],
  [/^\/faq$/, FaqPage],
  [/^\/demo\/wms$/, DemoWmsPage],
  [/^\/demo\/tms$/, DemoTmsPage],
  [/^\/demo\/aps$/, DemoApsPage],
  [/^\/carriere$/, CarrierePage],
  [/^\/directeur-logistique-mi-temps$/, DirecteurLogistiqueMiTempsPage],
  [/^\/directeur-achats-mi-temps$/, DirecteurAchatsMiTempsPage],
  [/^\/direction-supply-chain-temps-partage$/, DirectionSCTempsPartagePage],
  [/^\/dsc-vs-recrutement-cdi$/, DscVsRecrutementCdiPage],
  [/^\/accompagnement-oea$/, AccompagnementOeaPage],
  [/^\/ingenierie-formation$/, IngenierieFormationPage],
  [/^\/ingenierie-formation\/catalogue$/, CatalogueMetiersPage],
  [/^\/missions$/, MissionsPage],
  [/^\/missions\/[^/]+$/, MissionPage],
]

/** Charge le code de la page demandée avant le premier rendu (voir lazyPage). */
export function preloadRoute(pathname: string): Promise<unknown> {
  const path = pathname.replace(/\/$/, '') || '/'
  const hit = ROUTE_PAGES.find(([re]) => re.test(path))
  return (hit ? hit[1] : NotFoundPage)
    .preload()
    .then((mod) => mod.prepare?.(path))
    .catch(() => undefined)
}

// Pas d'animation d'entrée au premier affichage : la page prérendue est déjà
// visible, la faire repartir de l'opacité 0 retardait le LCP. Les navigations
// suivantes gardent la transition.
// appMounted passe à true après le premier rendu (effet dans AppRoutes).
let appMounted = false

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
      initial={appMounted ? 'initial' : false}
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
        <Route path="/diagnostic-supply-chain" element={<PageTransition><DiagnosticPage /></PageTransition>} />
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
        <Route path="/blog/page/:page" element={<PageTransition><BlogPage /></PageTransition>} />
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
        <Route path="/missions" element={<PageTransition><MissionsPage /></PageTransition>} />
        <Route path="/missions/:mission" element={<PageTransition><MissionPage /></PageTransition>} />
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
  useEffect(() => {
    appMounted = true
  }, [])
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
