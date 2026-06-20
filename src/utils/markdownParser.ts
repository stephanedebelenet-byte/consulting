export interface BlogPost {
  slug: string
  title: string
  date: string
  author?: string
  description?: string
  keywords?: string
  htmlContent: string
  rawContent: string
}

interface FrontMatter {
  title?: string
  date?: string
  author?: string
  description?: string
  keywords?: string
}

/**
 * Parse markdown content with YAML front matter
 * Returns BlogPost object with parsed metadata and HTML content
 */
export function parseMarkdown(content: string): BlogPost {
  const lines = content.split('\n')
  let frontMatterEnd = -1
  const frontMatter: FrontMatter = {}

  // Parse YAML front matter
  if (lines[0]?.trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === '---') {
        frontMatterEnd = i
        break
      }

      const line = lines[i] || ''
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
        const k = key.trim() as keyof FrontMatter
        if (k === 'title' || k === 'date' || k === 'author' || k === 'description' || k === 'keywords') {
          frontMatter[k] = value
        }
      }
    }
  }

  // Extract markdown content (after front matter)
  const mdContent = lines.slice(frontMatterEnd + 1).join('\n').trim()

  // Generate slug from title or filename
  const slug = (frontMatter.title || 'untitled')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)

  // Parse markdown to HTML
  const htmlContent = markdownToHtml(mdContent)

  return {
    slug,
    title: frontMatter.title || 'Untitled',
    date: frontMatter.date || new Date().toISOString().split('T')[0],
    author: frontMatter.author,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    htmlContent,
    rawContent: mdContent,
  }
}

/**
 * Convert markdown text to HTML
 * Supports: headings, bold, italic, lists, code blocks, paragraphs, links
 */
function markdownToHtml(markdown: string): string {
  let html = markdown

  // Code blocks (```...```)
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    const escapedCode = code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<pre><code>${escapedCode}</code></pre>`
  })

  // Inline code (`...`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headings (# ## ### etc)
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>')

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr/>')

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Bold **text**
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')

  // Italic *text*
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>')

  // Bold alternate __text__
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')

  // Italic alternate _text_
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')

  // Unordered lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>')
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*?<\/li>)/s, (match) => {
    return `<ul>${match}</ul>`
  })

  // Numbered lists
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')

  // Paragraphs (split by double newlines)
  const paragraphs = html.split(/\n\n+/)
  html = paragraphs
    .map((para) => {
      para = para.trim()
      if (!para) return ''
      if (para.startsWith('<')) return para // Already a tag
      return `<p>${para}</p>`
    })
    .join('\n')

  // Style tags with CSS classes
  html = html
    .replace(/<h1>/g, '<h1 style="font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; line-height: 1.2;">')
    .replace(/<h2>/g, '<h2 style="font-size: 1.5rem; font-weight: 700; margin: 1.75rem 0 0.875rem; line-height: 1.2;">')
    .replace(/<h3>/g, '<h3 style="font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; line-height: 1.2;">')
    .replace(/<p>/g, '<p style="margin-bottom: 1rem; line-height: 1.8;">')
    .replace(
      /<ul>/g,
      '<ul style="margin: 1rem 0; padding-left: 2rem; list-style-type: disc;">'
    )
    .replace(/<li>/g, '<li style="margin-bottom: 0.5rem;">')
    .replace(/<strong>/g, '<strong style="font-weight: 700; color: var(--gold);">')
    .replace(
      /<code>/g,
      '<code style="background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; font-family: DM Mono, monospace; font-size: 0.9em; border-radius: 0; color: var(--gold);">'
    )
    .replace(
      /<pre>/g,
      '<pre style="background: rgba(0,0,0,0.3); padding: 1.5rem; overflow-x: auto; margin: 1.5rem 0; border-left: 3px solid var(--gold);">'
    )
    .replace(/<a href=/g, '<a href=')
    .replace(/<a /g, '<a style="color: var(--gold); text-decoration: underline; cursor: pointer;" ')
    .replace(/<hr\/>/g, '<hr style="border: none; border-top: 1px solid var(--dark-border); margin: 2rem 0;" />')

  return html
}
