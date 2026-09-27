import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Pourquoi from '../components/Pourquoi'
import Conseil from '../components/Conseil'
import DimensionnementCTA from '../components/DimensionnementCTA'
import Systemes from '../components/Systemes'
import DSCTeaser from '../components/DSCTeaser'
import Methode from '../components/Methode'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PRESTATIONS_ANCHORS } from '../components/ServicesRedirect'
import { useLocale } from '../i18n/locale'

export default function ConseilPage() {
  // Anciens liens /services#pack-inventaire etc. : le 301 serveur
  // /services -> /conseil conserve l'ancre, on la renvoie vers /prestations.
  const { hash } = useLocation()
  const navigate = useNavigate()
  const { tr } = useLocale()
  useEffect(() => {
    if (PRESTATIONS_ANCHORS.includes(hash)) navigate(`/prestations${hash}`, { replace: true })
  }, [hash, navigate])

  return (
    <>
      <PageHero
        num="01"
        title={tr('Conseil &', 'Consulting &')}
        titleItalic={tr('Expertise.', 'Expertise.')}
        subtitle={tr(
          'Diagnostic, DDMRP, sélection et déploiement de systèmes, direction supply chain à temps partagé — sans allégeance à aucun éditeur.',
          'Diagnosis, DDMRP, system selection and deployment, part-time supply chain direction — with no allegiance to any vendor.'
        )}
        tag={tr('NEXTINOTECH CONSEIL · TERRAIN', 'NEXTINOTECH CONSULTING · FIELD-TESTED')}
      />
      <Pourquoi />
      <Statement text={tr('Le bon logiciel ne vaut rien sans la bonne méthode.', 'The right software is worthless without the right method.')} bg="var(--paper)" />
      <Conseil />
      <DimensionnementCTA />
      <Systemes />
      <DSCTeaser />
      <Methode />
    </>
  )
}
