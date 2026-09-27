import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import HeroCarousel from '../components/HeroCarousel'
import ControlTower from '../components/ControlTower'
import { useLocale } from '../i18n/locale'

export default function ControlTowerPage() {
  const { tr, href } = useLocale()
  return (
    <>
      <PageMeta
        title={tr(
          'Control Tower Supply Chain — WMS, TMS, IMS, AMS, IoT, IA | Nextinotech',
          'Supply Chain Control Tower — WMS, TMS, IMS, AMS, IoT, AI | Nextinotech'
        )}
        description={tr(
          'Piloter votre supply chain en temps réel en intégrant WMS, TMS, IMS, AMS, IoT et IA dans une seule tour de contrôle. Offre, formation et accompagnement Nextinotech.',
          'Run your supply chain in real time by integrating WMS, TMS, IMS, AMS, IoT and AI into one control tower. Offer, training and advisory from Nextinotech.'
        )}
        canonical={`https://nextinotech.com${href('/control-tower')}`}
      />
      <PageHero
        num="15"
        title={tr('Control', 'Control')}
        titleItalic={tr('Tower.', 'Tower.')}
        subtitle={tr(
          'WMS, TMS, IMS, AMS, IoT, IA : six systèmes, un seul pilotage temps réel de votre supply chain.',
          'WMS, TMS, IMS, AMS, IoT, AI: six systems, one single real-time view of your supply chain.'
        )}
        tag={tr('NEXTINOTECH DIGITAL · SYSTÈMES · DONNÉES', 'NEXTINOTECH DIGITAL · SYSTEMS · DATA')}
        bg="var(--navy)"
        backgroundLayer={<HeroCarousel />}
      />
      <ControlTower />
    </>
  )
}
