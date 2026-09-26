import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { parseMarkdown, type BlogPost } from '../utils/markdownParser'
import { BLOG_FILES } from '../data/blogFiles'
import SchemaScript from './SchemaHelper'

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams<{ slug?: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // List of all blog files in the /blog folder
        const blogFiles = BLOG_FILES

        const fetched = await Promise.all(
          blogFiles.map(async (file) => {
            try {
              const response = await fetch(`/blog/${file}.md`)
              if (!response.ok) return null
              const content = await response.text()
              return parseMarkdown(content)
            } catch (err) {
              console.error(`Error loading ${file}:`, err)
              return null
            }
          })
        )
        const loadedPosts = fetched.filter((p): p is BlogPost => p !== null)

        // Sort by date descending
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(loadedPosts)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Deep-link : /blog/<slug> (canonique) ou /blog?post=<slug> (rétro-compat) ouvre l'article visé
  useEffect(() => {
    const slug = params.slug || searchParams.get('post')
    if (!slug || posts.length === 0) return
    const match = posts.find((p) => p.slug === slug)
    if (match) setSelectedPost(match)
  }, [posts, params.slug, searchParams])

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: 'var(--sp)', overflow: 'hidden' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag" style={{ color: 'var(--blue-bright)' }}>
              <span>INSIGHTS</span>
            </div>

            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--navy)',
                marginBottom: '3rem',
              }}
            >
              Supply Chain Insights.
            </h2>
          </motion.div>

          {loading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '1rem',
                color: 'var(--dark-muted)',
              }}
            >
              Chargement des articles...
            </motion.p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}>
              {posts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (idx % 3) * 0.12,
                  }}
                  whileHover="hover"
                  onClick={() => setSelectedPost(post)}
                  style={{
                    border: '1px solid var(--dark-border)',
                    cursor: 'pointer',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,111,181,0.5)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(47,111,181,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--dark-border)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {/* Gold bottom line reveal on hover */}
                  <motion.div
                    variants={{
                      hover: { scaleX: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    initial={{ scaleX: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--blue-bright)',
                      transformOrigin: 'left',
                      zIndex: 2,
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {post.image && (
                      <div
                        style={{
                          width: '100%',
                          height: '180px',
                          overflow: 'hidden',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          variants={{
                            hover: { scale: 1.07, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                      <h3
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color: 'var(--navy)',
                        }}
                      >
                        {post.title}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'DM Mono, monospace',
                          color: 'var(--blue-bright)',
                          opacity: 0.75,
                        }}
                      >
                        {new Date(post.date).toLocaleDateString('fr-FR')}
                        {post.author && <span style={{ marginLeft: '1rem' }}>{post.author}</span>}
                      </div>

                      <p
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: 'var(--dark-muted)',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}
                      >
                        {post.description}
                      </p>

                      <motion.span
                        variants={{
                          hover: { x: 6, color: '#2f6fb5', transition: { duration: 0.25, ease: 'easeOut' } },
                        }}
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--blue-bright)',
                          marginTop: 'auto',
                          display: 'inline-block',
                        }}
                      >
                        Lire l'article →
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPost && (
        <BlogDetail
          post={selectedPost}
          onClose={() => {
            setSelectedPost(null)
            if (params.slug) navigate('/blog', { replace: true })
            else if (searchParams.get('post')) setSearchParams({}, { replace: true })
          }}
        />
      )}
    </>
  )
}

interface BlogDetailProps {
  post: BlogPost
  onClose: () => void
}

function buildArticleSchema(post: BlogPost) {
  if (post.schema === 'FAQPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: post.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: post.quickAnswer || post.description || post.title,
          },
        },
      ],
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.quickAnswer,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author || 'Youssef B', jobTitle: 'Fondateur', worksFor: { '@type': 'Organization', name: 'Nextinotech' } },
    publisher: { '@type': 'Organization', name: 'Nextinotech' },
  }
}

function BlogDetail({ post, onClose }: BlogDetailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [post])

  // IntersectionObserver for .blog-figure, .blog-callout, .blog-stat-block animations
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.blog-figure, .blog-callout, .blog-stat-block'
    )
    if (!targets.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [post])

  useEffect(() => {
    const prevTitle = document.title
    const sel = <T extends HTMLMetaElement>(attr: string, val: string) =>
      document.querySelector<T>(`meta[${attr}="${val}"]`)

    const descMeta   = sel('name', 'description')
    const ogTitle    = sel('property', 'og:title')
    const ogDesc     = sel('property', 'og:description')
    const twTitle    = sel('name', 'twitter:title')
    const twDesc     = sel('name', 'twitter:description')

    const prevDesc   = descMeta?.content
    const prevOgT    = ogTitle?.content
    const prevOgD    = ogDesc?.content
    const prevTwT    = twTitle?.content
    const prevTwD    = twDesc?.content

    const articleTitle = `${post.title} | Nextinotech`
    document.title = articleTitle
    if (descMeta && post.description)  descMeta.content = post.description
    if (ogTitle)                        ogTitle.content  = articleTitle
    if (ogDesc  && post.description)   ogDesc.content   = post.description
    if (twTitle)                        twTitle.content  = articleTitle
    if (twDesc  && post.description)   twDesc.content   = post.description

    document.body.style.overflow = 'hidden'

    return () => {
      document.title = prevTitle
      if (descMeta && prevDesc)  descMeta.content = prevDesc
      if (ogTitle  && prevOgT)   ogTitle.content  = prevOgT
      if (ogDesc   && prevOgD)   ogDesc.content   = prevOgD
      if (twTitle  && prevTwT)   twTitle.content  = prevTwT
      if (twDesc   && prevTwD)   twDesc.content   = prevTwD
      document.body.style.overflow = 'auto'
    }
  }, [post])

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 20, 32, 0.95)',
        zIndex: 1000,
        overflowY: 'auto',
        backdropFilter: 'blur(4px)',
      }}
    >
      <SchemaScript schema={buildArticleSchema(post)} />

      {/* Reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.07)', zIndex: 1001 }}>
        <div style={{ height: '100%', background: 'var(--blue-bright)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'var(--sp-y-sm) var(--sp-x)',
          background: 'var(--dark)',
          color: 'var(--navy)',
          minHeight: '100vh',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: '1px solid var(--dark-border)',
            color: 'var(--navy)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue-bright)'
            e.currentTarget.style.color = 'var(--blue-bright)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--dark-border)'
            e.currentTarget.style.color = 'var(--navy)'
          }}
          aria-label="Fermer"
        >
          ×
        </button>

        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              fontFamily: 'DM Mono, monospace',
              color: 'rgba(47,111,181,0.7)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
            {post.author && <><span style={{ opacity: 0.4 }}>·</span><span>{post.author}</span></>}
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {readingTime(post.rawContent)} min de lecture
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            {post.title}
          </h1>

          {post.keywords && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'DM Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--blue-bright)',
                opacity: 0.7,
              }}
            >
              {post.keywords.split(', ').map((kw) => (
                <span key={kw}>#{kw.trim()}</span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="blog-cover"
          />
        )}

        <div
          className="blog-content"
          style={{
            fontFamily: 'Jost, sans-serif',
            lineHeight: 1.8,
            fontSize: '1.0625rem',
            color: 'var(--navy)',
          }}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </motion.article>
    </motion.div>
  )
}
