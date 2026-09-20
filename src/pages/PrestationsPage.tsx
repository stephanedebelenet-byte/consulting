import PageHero from '../components/PageHero'
import Prestations from '../components/Prestations'

export default function PrestationsPage() {
  return (
    <>
      <PageHero
        num="15"
        title="Nos"
        titleItalic="Prestations."
        subtitle="Pack Inventaire, services logistiques à valeur ajoutée — exécutés par nos propres équipes. Solutions IT, RFID et intégration ERP menées en interne, de bout en bout."
        tag="EXÉCUTION · OPÉRATIONS"
      />
      <Prestations />
    </>
  )
}
