'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'How do you price your projects?',
    a: 'We work on a fixed-scope, fixed-price model for most projects. After a free discovery call, we send a scoped proposal with a clear price and timeline. No hourly surprises.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most automation projects take 2–6 weeks from kickoff to live deployment. Larger data pipelines or AI agent systems may take 6–10 weeks. We always agree on a timeline before starting.',
  },
  {
    q: 'Do we own the code you build?',
    a: 'Yes. Everything is handed over — source code, credentials, documentation. We have no interest in locking you into a retainer. You can take it, extend it, or give it to someone else.',
  },
  {
    q: 'What tools and tech do you use?',
    a: "It depends on what fits your stack. We're comfortable with Python, Node.js, n8n, Make, Zapier, LangChain, OpenAI, and most major APIs. We pick the right tool, not the flashy one.",
  },
  {
    q: 'What happens after the project is live?',
    a: 'We offer a 30-day post-launch support window included in every project. After that, we can discuss a retainer if you need ongoing maintenance or new features.',
  },
  {
    q: 'Do you offer retainers?',
    a: 'Yes — for clients with ongoing automation needs. Retainers cover maintenance, new flows, and a monthly strategy call. Ask us about this after your first project.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="FAQ"
          heading="Common questions"
          subtext="Everything founders and ops leads ask before working with us."
          align="center"
          className="items-center text-center mx-auto"
        />

        <div className="max-w-[720px] mx-auto w-full flex flex-col divide-y divide-border">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-text">{faq.q}</span>
                  <span className="shrink-0 text-muted">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                  )}
                >
                  <p className="text-base text-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
