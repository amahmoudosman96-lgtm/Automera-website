import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'
import { SectionHeader } from '@/components/ui/section-header'

const cases = [
  {
    slug: 'workflow-automation-ops-team',
    industry: 'Operations',
    client: 'Mid-size logistics company',
    challenge: 'Manual invoice processing was taking 3 FTEs and still had a 12% error rate.',
    outcome: '94% reduction in manual processing time',
    metric: '−94%',
    metricLabel: 'processing time',
    tags: ['Workflow Automation', 'AI Agents'],
  },
  {
    slug: 'data-pipeline-ecommerce',
    industry: 'E-commerce',
    client: 'D2C fashion brand',
    challenge: 'No unified view of customer data across Shopify, CRM, and ads platforms.',
    outcome: 'Real-time unified customer dashboard, shipped in 3 weeks.',
    metric: '3 weeks',
    metricLabel: 'to production',
    tags: ['Data Pipelines', 'Custom Integrations'],
  },
]

export function CasesPreview() {
  return (
    <section id="cases" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Case studies"
            heading="Real teams, real results"
            subtext="A sample of what we've shipped. Names changed for privacy."
          />
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline shrink-0"
          >
            All case studies <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <Card key={c.slug} hover className="flex flex-col gap-6">
              {/* Placeholder image area */}
              <div className="w-full h-40 bg-surface rounded-lg border border-border flex items-center justify-center">
                <span className="text-muted text-sm">Case study cover image</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Tag>{c.industry}</Tag>
                  <span className="text-xs text-muted">{c.client}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted leading-relaxed">{c.challenge}</p>
                </div>

                {/* Outcome metric */}
                <div className="flex items-baseline gap-2 border-t border-border pt-4">
                  <span className="text-3xl font-bold text-accent">{c.metric}</span>
                  <span className="text-sm text-muted">{c.metricLabel}</span>
                </div>

                <p className="text-sm font-medium text-text">{c.outcome}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2 flex-wrap">
                    {c.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Link
                    href={`/cases/${c.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
