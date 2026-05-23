import { SectionHeader } from '@/components/ui/section-header'

const steps = [
  {
    number: 1,
    title: 'Discover',
    description:
      'We audit your current workflows, identify bottlenecks, and map what can be automated — no fluff, just findings.',
  },
  {
    number: 2,
    title: 'Design',
    description:
      'We spec out the solution architecture: which tools, which models, which integrations. You review before we write a line.',
  },
  {
    number: 3,
    title: 'Build',
    description:
      'We ship in short cycles with demos along the way. No black-box development — you see progress every week.',
  },
  {
    number: 4,
    title: 'Deploy',
    description:
      'We launch to production, hand over the code and docs, and stay available for questions. You own everything.',
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 px-6 md:px-12 lg:px-20 bg-surface">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="How we work"
          heading="From zero to deployed in weeks"
          subtext="A simple, transparent process that keeps you in the loop at every step."
          align="center"
          className="items-center text-center mx-auto"
        />

        {/* Desktop: horizontal */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Number + connector row */}
              <div className="flex items-center gap-0">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-border" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              {/* Number + vertical line */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" style={{ minHeight: 32 }} />
                )}
              </div>
              <div className="flex flex-col gap-2 pb-8">
                <h3 className="text-xl font-semibold text-text mt-1">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
