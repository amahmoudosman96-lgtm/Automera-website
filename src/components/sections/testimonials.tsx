import { Card } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'

const testimonials = [
  {
    quote:
      "Automera shipped an AI agent that handles our entire supplier onboarding flow. What used to take our team 4 hours now runs in 20 minutes without anyone touching it.",
    name: 'Operations Director',
    company: 'UK Logistics SMB',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-20 bg-surface">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="What clients say"
          heading="They ship. We make it last."
          subtext="Real feedback from founders and ops leaders who've worked with us."
          align="center"
          className="items-center text-center mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex flex-col gap-4 relative">
              {/* Quote mark */}
              <span
                className="text-5xl font-serif text-accent-light leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-base text-text leading-relaxed -mt-4">{t.quote}</p>
              <div className="flex flex-col gap-0.5 mt-auto pt-4 border-t border-border">
                <span className="text-sm font-semibold text-text">{t.name}</span>
                <span className="text-xs text-muted">{t.company}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
