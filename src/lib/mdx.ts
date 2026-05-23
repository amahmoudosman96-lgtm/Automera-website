import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ContentDir = 'blog' | 'cases'

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  coverImage?: string
}

export interface Post extends PostMeta {
  content: string
}

function getContentDir(dir: ContentDir) {
  return path.join(process.cwd(), 'src', 'content', dir)
}

export function getAllPosts(dir: ContentDir): PostMeta[] {
  const contentDir = getContentDir(dir)

  if (!fs.existsSync(contentDir)) return []

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, '')
    const filePath = path.join(contentDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      author: data.author ?? 'Automera',
      tags: data.tags ?? [],
      coverImage: data.coverImage,
    } satisfies PostMeta
  })

  // Sort newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(dir: ContentDir, slug: string): Post | null {
  const contentDir = getContentDir(dir)
  const extensions = ['mdx', 'md']

  for (const ext of extensions) {
    const filePath = path.join(contentDir, `${slug}.${ext}`)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      return {
        slug,
        content,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        author: data.author ?? 'Automera',
        tags: data.tags ?? [],
        coverImage: data.coverImage,
      }
    }
  }

  return null
}
