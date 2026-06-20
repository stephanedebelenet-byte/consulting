import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { parseMarkdown, type BlogPost } from '../utils/markdownParser'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // List of all blog files in the /blog folder
        const blogFiles = [
          '01-audit-supply-chain-2026',
          '02-formation-supply-chain-roi',
          '03-digitalisation-supply-chain-pme',
          '04-supply-chain-par-secteur',
          '05-cout-mission-consulting',
          '06-duree-transformation-supply-chain',
          '07-formation-vs-consulting',
          '08-consulting-supply-chain-casablanca',
          '09-formation-logistique-rabat',
          '10-consulting-tanger-med',
          '11-supply-chain-fes-meknes',
          '12-supply-chain-marrakech-agadir',
          '13-supply-chain-afrique-francophone',
        ]

        const loadedPosts: BlogPost[] = []

        for (const file of blogFiles) {
          try {
            const response = await fetch(`/blog/${file}.md`)
            if (response.ok) {
              const content = await response.text()
              const post = parseMarkdown(content)
              loadedPosts.push(post)
            }
          } catch (err) {
            console.error(`Error loading ${file}:`, err)
          }
        }

        // Sort by date descending
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(loadedPosts)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: '8rem 4rem', overflow: 'hidden' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag" style={{ color: 'var(--gold)' }}>
              <span>INSIGHTS</span>
            </div>

            <h2
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--dark-text)',
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
            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
              {posts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.1,
                  }}
                  onClick={() => setSelectedPost(post)}
                  style={{
                    borderBottom: '1px solid var(--dark-border)',
                    paddingBottom: '2rem',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                  whileHover={{ opacity: 0.7 }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    <h3
                      style={{
                        fontFamily: 'Bodoni Moda, serif',
                        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                        fontWeight: 400,
                        lineHeight: 1.2,
                        color: 'var(--dark-text)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {post.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        fontFamily: 'DM Mono, monospace',
                        color: 'var(--gold)',
                      }}
                    >
                      <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                      {post.author && <span>{post.author}</span>}
                    </div>

                    <p
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: 'var(--dark-muted)',
                        marginBottom: '1rem',
                      }}
                    >
                      {post.description}
                    </p>

                    <button
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      Lire l'article →
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPost && (
        <BlogDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  )
}

interface BlogDetailProps {
  post: BlogPost
  onClose: () => void
}

function BlogDetail({ post, onClose }: BlogDetailProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <motion.div
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
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '4rem',
          background: 'var(--dark)',
          color: 'var(--dark-text)',
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
            color: 'var(--dark-text)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)'
            e.currentTarget.style.color = 'var(--gold)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--dark-border)'
            e.currentTarget.style.color = 'var(--dark-text)'
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
              fontSize: '0.875rem',
              fontFamily: 'DM Mono, monospace',
              color: 'var(--gold)',
            }}
          >
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
            {post.author && <span>{post.author}</span>}
          </div>

          <h1
            style={{
              fontFamily: 'Bodoni Moda, serif',
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
                color: 'var(--gold)',
                opacity: 0.7,
              }}
            >
              {post.keywords.split(', ').map((kw) => (
                <span key={kw}>#{kw.trim()}</span>
              ))}
            </div>
          )}
        </div>

        <div
          className="blog-content"
          style={{
            fontFamily: 'Jost, sans-serif',
            lineHeight: 1.8,
            fontSize: '1.0625rem',
            color: 'var(--dark-text)',
          }}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </motion.article>
    </motion.div>
  )
}
