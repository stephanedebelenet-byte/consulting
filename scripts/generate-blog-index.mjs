import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BLOG_FILES } from '../src/data/blogFiles.ts'
import { parseMarkdown } from '../src/utils/markdownParser.ts'

const root = resolve(import.meta.dirname, '..')
const posts = BLOG_FILES.map((file) => {
  const post = parseMarkdown(readFileSync(resolve(root, 'public/blog', `${file}.md`), 'utf8'))
  return { file, slug: post.slug, title: post.title, date: post.date, author: post.author,
    description: post.description, image: post.image }
}).sort((a, b) => b.date.localeCompare(a.date) || a.file.localeCompare(b.file))
if (new Set(posts.map((post) => post.slug)).size !== posts.length) {
  throw new Error('Deux articles publiés partagent le même slug')
}
writeFileSync(resolve(root, 'src/data/blogIndex.ts'),
  '// Généré par scripts/generate-blog-index.mjs ; modifier les fichiers Markdown sources.\n' +
  `export const BLOG_INDEX = ${JSON.stringify(posts, null, 2)}\n`)
writeFileSync(resolve(root, 'src/data/blogCount.ts'),
  `// Généré par scripts/generate-blog-index.mjs\nexport const BLOG_POST_COUNT = ${posts.length}\n`)
const featuredFiles = ['63-certification-ddmrp-maroc', '03-digitalisation-supply-chain-pme', '76-externalisation-logistique-3pl-maroc']
const featured = featuredFiles.map((file) => {
  const post = posts.find((entry) => entry.file === file)
  if (!post) throw new Error(`Article éditorial absent du registre : ${file}`)
  return post
})
writeFileSync(resolve(root, 'src/data/featuredBlog.ts'),
  `// Généré par scripts/generate-blog-index.mjs\nexport const FEATURED_BLOG = ${JSON.stringify(featured, null, 2)}\n`)
console.log(`[blog-index] ${posts.length} résumés ; aucun corps Markdown dans le catalogue client`)
