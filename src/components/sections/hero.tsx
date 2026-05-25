import { CalButton } from '@/components/ui/cal-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Rocket } from 'lucide-react'

export function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted font-mono">
              AI automation studio
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-text tracking-tight leading-[1.05]">
              AI automation{' '}
              <span className="text-accent">that actually ships.</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-[480px]">
              We build custom AI workflows, agents, and data pipelines for SMB
              teams — in weeks, not quarters. You own the code.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <CalButton size="lg">Book a Call</CalButton>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/cases">See our work</Link>
              </Button>
            </div>
            {/* Social proof micro-copy */}
            <p className="text-sm text-muted mt-2">
              Trusted by ops, finance, and growth teams at SMBs across MENA &amp; UK.
            </p>
          </div>

          {/* Right: abstract graphic */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Subtle grid/dot pattern */}
              <svg
                viewBox="0 0 480 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full opacity-[0.06] absolute inset-0"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111827" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="480" height="480" fill="url(#grid)" />
              </svg>

              {/* Accent circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-accent/10 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-accent/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute top-8 right-4 bg-white border border-border rounded-xl px-4 py-3 shadow-[var(--shadow-card)] text-sm font-medium text-text flex items-center gap-2">
                <Zap size={16} className="text-accent" strokeWidth={2} />
                3× faster workflows
              </div>
              <div className="absolute bottom-8 left-4 bg-white border border-border rounded-xl px-4 py-3 shadow-[var(--shadow-card)] text-sm font-medium text-text flex items-center gap-2">
                <Rocket size={16} className="text-accent" strokeWidth={2} />
                Ships in weeks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
