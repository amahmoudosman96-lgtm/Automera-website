import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Tag } from '@/components/ui/tag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI automation, workflows, and building fast for SMB teams.',
}

export default function BlogPage() {
  const posts = getAllPosts('blog')

  return (
    <div className="max-w-[1140px] mx-auto px-6 md:px-12 lg:px-20 py-24">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-muted">
            From the team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight">Blog</h1>
          <p className="text-lg text-muted leading-relaxed max-w-[480px]">
            Practical writing on AI automation, workflows, and building fast for SMB teams.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 bg-white border border-border rounded-xl p-6 hover:border-border-hover hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
              >
                {post.coverImage && (
                  <div className="w-full h-40 bg-surface rounded-lg border border-border" />
                )}
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{post.date}</span>
                  {post.author && (
                    <>
                      <span>·</span>
                      <span>{post.author}</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-text group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
