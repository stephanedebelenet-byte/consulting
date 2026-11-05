import PageHero from '../components/PageHero'
import Prestations from '../components/Prestations'
import { useLocale } from '../i18n/locale'
import ServiceAnswers from '../components/ServiceAnswers'

export default function PrestationsPage() {
  const { tr } = useLocale()
  return (
    <>
      <PageHero
        num="15"
        title={tr('Prestations logistiques', 'Logistics Services')}
        titleItalic={tr('au Maroc.', 'in Morocco.')}
        subtitle={tr(
          'Pack Inventaire, services logistiques à valeur ajoutée — exécutés par nos propres équipes. Solutions IT, RFID et intégration ERP menées en interne, de bout en bout.',
          'Inventory Pack, value-added logistics services — run by our own teams. IT, RFID and ERP integration solutions delivered in-house, end to end.'
        )}
        tag={tr('EXÉCUTION · OPÉRATIONS', 'EXECUTION · OPERATIONS')}
      />
      <ServiceAnswers scope="prestations" />
      <Prestations />
    </>
  )
}
