import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Tag } from '@/components/ui/tag'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipped products',
  description: "Real automation projects we've shipped for SMB teams. See what's possible.",
}

export default function CasesPage() {
  const cases = getAllPosts('cases')

  return (
    <div className="max-w-[1140px] mx-auto px-6 md:px-12 lg:px-20 py-24">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-muted">
            Shipped products
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
            Real teams, real results
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-[480px]">
            A selection of automation projects we've shipped. Client names changed for privacy.
          </p>
        </div>

        {cases.length === 0 ? (
          <p className="text-muted">Nothing shipped publicly yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group flex flex-col gap-4 bg-white border border-border rounded-xl p-6 hover:border-border-hover hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
              >
                <div className="w-full h-40 bg-surface rounded-lg border border-border flex items-center justify-center">
                  <span className="text-muted text-sm">Product cover</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{c.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-text group-hover:text-accent transition-colors leading-snug">
                  {c.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">{c.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
