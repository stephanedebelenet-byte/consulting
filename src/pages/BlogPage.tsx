import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Blog from '../components/Blog'
import Insights from '../components/Insights'

export default function BlogPage() {
  const { slug } = useParams<{ slug?: string }>()

  // Sur l'adresse d'un article (/blog/<slug>), seul l'article est rendu : ni
  // l'en-tête "Supply Chain Insights" (un H1 de plus), ni la liste des
  // articles (voir Blog.tsx), ni la section de fin. Sinon, dans la version
  // rendue que Google indexe, chaque article embarquait la liste complète des
  // 512 autres : pages quasi identiques entre elles.
  //
  // Structure constante (éléments conditionnels plutôt que deux arbres) pour
  // que <Blog /> reste monté entre /blog et /blog/<slug> : pas de
  // rechargement des articles, position dans la liste conservée.
  return (
    <>
      {!slug && (
        <PageHero
          num="05"
          title="Supply Chain"
          titleItalic="Insights."
          subtitle="Articles, études de cas et ressources pratiques pour les professionnels de la Supply Chain au Maroc et en Afrique."
          tag="RESSOURCES · BLOG"
        />
      )}
      <Blog />
      {!slug && <Insights />}
    </>
  )
}
