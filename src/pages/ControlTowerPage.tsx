import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import HeroCarousel from '../components/HeroCarousel'
import ControlTower from '../components/ControlTower'

export default function ControlTowerPage() {
  return (
    <>
      <PageMeta
        title="Control Tower Supply Chain — WMS, TMS, IMS, AMS, IoT, IA | Nextinotech"
        description="Piloter votre supply chain en temps réel en intégrant WMS, TMS, IMS, AMS, IoT et IA dans une seule tour de contrôle. Offre, formation et accompagnement Nextinotech."
        canonical="https://nextinotech.com/control-tower"
      />
      <PageHero
        num="15"
        title="Control"
        titleItalic="Tower."
        subtitle="WMS, TMS, IMS, AMS, IoT, IA : six systèmes, un seul pilotage temps réel de votre supply chain."
        tag="PRESTATIONS · SYSTÈMES · DONNÉES"
        bg="var(--navy)"
        backgroundLayer={<HeroCarousel />}
      />
      <ControlTower />
    </>
  )
}
