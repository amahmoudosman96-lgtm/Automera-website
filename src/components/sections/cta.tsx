import { CalButton } from '@/components/ui/cal-button'
import Link from 'next/link'

export function Cta() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-surface">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-col items-center text-center gap-6 max-w-[560px] mx-auto">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-muted">
            Ready to start?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
            Ready to automate?
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Book a free 30-minute discovery call. We'll look at your workflows,
            tell you what's automatable, and give you a straight answer on cost and
            timeline — no sales pitch, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <CalButton size="lg">Book a free call</CalButton>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center text-[15px] px-6 py-3 rounded-lg border border-border text-text-secondary hover:border-border-strong hover:text-text transition-all duration-200"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
