import { useParams, Navigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import MissionDetail from '../components/MissionDetail'
import { FAMILLES, getMission, missionDescription, missionTitle } from '../data/missions'

export default function MissionPage() {
  const { mission: id } = useParams<{ mission: string }>()
  const x = getMission(id)
  if (!x) return <Navigate to="/missions" replace />
  const famille = FAMILLES.find((f) => f.id === x.famille)

  return (
    <>
      <PageMeta
        title={missionTitle(x).length <= 47 ? `${missionTitle(x)} | Nextinotech` : missionTitle(x)}
        description={missionDescription(x)}
        canonical={`https://nextinotech.com/missions/${x.id}`}
      />
      <PageHero
        num="M"
        title={x.titre}
        subtitle={`${x.duree} · ${x.prix}`}
        tag={`MISSION · ${(famille?.label ?? 'Conseil').toUpperCase()}`}
        bg="var(--paper)"
        breadcrumb={{ label: 'Toutes les missions', to: '/missions' }}
      />
      <MissionDetail x={x} />
    </>
  )
}
