import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Profil from '../components/Profil'
import Team from '../components/Team'
import Engagement from '../components/Engagement'
import { useLocale } from '../i18n/locale'

export default function AProposPage() {
  const { tr } = useLocale()
  return (
    <>
      <PageHero
        num="04"
        title={tr('À', 'About')}
        titleItalic={tr('propos.', 'us.')}
        subtitle={tr(
          "Plus de 20 ans de missions terrain en ingénierie Supply Chain. Un cabinet indépendant, sans allégeance à aucun éditeur.",
          'Over 20 years of hands-on Supply Chain engineering missions. An independent firm, with no allegiance to any vendor.'
        )}
        tag={tr('FONDATEUR · CABINET', 'FOUNDER · FIRM')}
        bg="var(--paper)"
        textColor="var(--ink)"
      />
      <Statement
        text={tr(
          "Indépendant. Pas parce que c'est tendance. Parce que c'est juste.",
          "Independent. Not because it's trendy. Because it's right."
        )}
        bg="var(--dark)"
        accent="var(--blue-bright)"
      />
      <Profil />
      <Team />
      <Engagement />
    </>
  )
}
