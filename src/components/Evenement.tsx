import { useEffect, useState } from 'react'
import { parseMarkdown, type BlogPost } from '../utils/markdownParser'
import SchemaScript from './SchemaHelper'

interface EvenementProps {
  file: string
  canonical: string
}

export default function Evenement({ file, canonical }: EvenementProps) {
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/blog/${file}.md`)
      .then((r) => r.text())
      .then((raw) => {
        if (!cancelled) setPost(parseMarkdown(raw))
      })
    return () => {
      cancelled = true
    }
  }, [file])

  if (!post) {
    return <div style={{ background: 'var(--dark)', minHeight: '40vh' }} />
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: post.title,
    description: post.description,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: { '@type': 'Organization', name: 'Nextinotech', url: 'https://nextinotech.com' },
    url: canonical,
  }

  return (
    <div style={{ background: 'var(--dark)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
      <SchemaScript schema={schema} />
      <div className="section-inner" style={{ maxWidth: 780 }}>
        <div
          className="blog-content"
          style={{ fontFamily: 'Jost, sans-serif', lineHeight: 1.8, fontSize: '1.0625rem', color: 'var(--navy)' }}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </div>
    </div>
  )
}
