import { Zap, Bot, BarChart2, Plug } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'
import { SectionHeader } from '@/components/ui/section-header'

const services = [
  {
    icon: Zap,
    title: 'Workflow Automation',
    description:
      'Eliminate repetitive manual work by connecting your tools and automating multi-step processes end-to-end.',
    tags: ['Zapier', 'Make', 'n8n', 'Custom'],
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description:
      'Deploy intelligent agents that read, reason, and act — handling tasks that require judgement, not just clicks.',
    tags: ['LLMs', 'RAG', 'Tool Use', 'Memory'],
  },
  {
    icon: BarChart2,
    title: 'Data Pipelines',
    description:
      'Move, transform, and surface your data in real time. From CRM to BI dashboards, without the data-eng backlog.',
    tags: ['ETL', 'Webhooks', 'SQL', 'APIs'],
  },
  {
    icon: Plug,
    title: 'Custom Integrations',
    description:
      "When off-the-shelf doesn't cut it, we build bespoke connectors and internal tools that fit your exact stack.",
    tags: ['REST', 'GraphQL', 'OAuth', 'Webhooks'],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="What we build"
          heading="Automation that fits your stack"
          subtext="We work across the full automation spectrum — from simple no-code flows to production AI agents."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} hover className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-text">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {service.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
