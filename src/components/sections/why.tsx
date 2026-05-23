import { Clock, Code, Users } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

const reasons = [
  {
    icon: Clock,
    title: 'Ships in weeks, not quarters',
    description:
      "We don't do 6-month roadmaps. Every engagement is scoped to ship something working within weeks — with demos along the way.",
  },
  {
    icon: Code,
    title: 'You own the code',
    description:
      'Everything we build is handed over fully — source code, docs, credentials. No vendor lock-in, no monthly licensing surprises.',
  },
  {
    icon: Users,
    title: 'Founder-led, no account managers',
    description:
      'You work directly with the people building your product. No handoffs to junior devs or account managers after the sales call.',
  },
]

export function Why() {
  return (
    <section id="why" className="py-24 px-6 md:px-12 lg:px-20 bg-surface">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="Why Automera"
          heading="Serious about shipping"
          subtext="We're not a consultancy that delivers decks. We're a small team that builds real things and hands them over."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text">{reason.title}</h3>
                <p className="text-base text-muted leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
