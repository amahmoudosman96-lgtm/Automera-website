import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of the Automera website and engagements.',
}

const LAST_UPDATED = '24 May 2026'

export default function TermsPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 py-24 flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted font-mono">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="flex flex-col gap-6 text-text-secondary leading-relaxed">
        <p>
          These terms govern your use of{' '}
          <a href="https://automera.co" className="text-accent hover:underline">
            automera.co
          </a>{' '}
          and any preliminary contact with Automera Ltd. Paid engagements are governed
          separately by a written Master Services Agreement (MSA) and per-project Statement
          of Work (SOW). This is a placeholder version pending final legal review.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Use of the site</h2>
        <p>
          You may browse, link to, and share content on this site for personal or business
          purposes. You may not scrape, redistribute commercially, or attempt to disrupt
          the service.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Content & ownership</h2>
        <p>
          Site content (copy, design, code) is © Automera Ltd unless attributed otherwise.
          Code shared on engagement is owned by the client under the relevant SOW —
          you own what we build for you.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">No warranty</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; without warranty of any kind. We make best
          efforts to keep it accurate and available but do not guarantee uninterrupted
          service.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Liability</h2>
        <p>
          Automera&apos;s liability arising from use of this site is limited to the maximum
          extent permitted by law. Liability arising from paid engagements is capped per
          the MSA.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Governing law</h2>
        <p>
          These terms are governed by the laws of England and Wales. Disputes are subject
          to the exclusive jurisdiction of the English courts.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Contact</h2>
        <p>
          Automera Ltd · UK Companies House (registration pending) ·{' '}
          <a href="mailto:hello@automera.co" className="text-accent hover:underline">
            hello@automera.co
          </a>
        </p>
      </section>
    </article>
  )
}
