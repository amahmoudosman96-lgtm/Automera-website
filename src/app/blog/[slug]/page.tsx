import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Tag } from '@/components/ui/tag'
import { CalButton } from '@/components/ui/cal-button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts('blog').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('blog', slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('blog', slug)
  if (!post) notFound()

  return (
    <div className="max-w-[720px] mx-auto px-6 md:px-8 py-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-10"
      >
        <ArrowLeft size={16} /> Back to blog
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{post.date}</span>
          {post.author && (
            <>
              <span>·</span>
              <span>{post.author}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-snug">
          {post.title}
        </h1>
        <p className="text-lg text-muted leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      {/* MDX content */}
      <article className="prose prose-neutral max-w-none text-text
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text
        prose-p:text-muted prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text
        prose-code:text-accent prose-code:bg-accent-light prose-code:px-1 prose-code:rounded
        prose-th:text-text prose-td:text-muted
        prose-blockquote:border-accent prose-blockquote:text-muted">
        <MDXRemote source={post.content} />
      </article>

      {/* CTA */}
      <div className="mt-16 pt-10 border-t border-border flex flex-col gap-4">
        <p className="text-base text-muted">
          Want to automate something like this? Book a free 30-min call.
        </p>
        <CalButton size="md">Book a free call</CalButton>
      </div>
    </div>
  )
}
