import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Blog from '../components/Blog'
import Insights from '../components/Insights'
import NotFoundPage from './NotFoundPage'
import PageMeta from '../components/PageMeta'
import { validBlogPage, blogPagePath } from '../data/blogPagination'
import { BLOG_INDEX } from '../data/blogIndex'

export default function BlogPage() {
  const { slug, page: pageParam } = useParams<{ slug?: string; page?: string }>()
  const page = validBlogPage(pageParam)
  const article = slug ? BLOG_INDEX.find((post) => post.slug === slug) : undefined
  if (page === null || (slug && !article)) return <NotFoundPage />

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
      <PageMeta
        title={article ? (article.title.length <= 52 ? `${article.title} | Nextinotech` : article.title) : `Supply Chain au Maroc : blog, page ${page} | Nextinotech`}
        description={article?.description ?? 'Articles Supply Chain, logistique et stocks au Maroc.'}
        canonical={`https://nextinotech.com${article ? `/blog/${article.slug}` : blogPagePath(page)}`}
      />
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
