import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Automera collects, uses, and protects information.',
}

const LAST_UPDATED = '24 May 2026'

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 py-24 flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted font-mono">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="flex flex-col gap-6 text-text-secondary leading-relaxed">
        <p>
          Automera Ltd (&ldquo;Automera&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) builds custom AI automation systems for
          small and mid-sized teams. This page explains what information we collect when
          you visit{' '}
          <a href="https://automera.co" className="text-accent hover:underline">
            automera.co
          </a>{' '}
          or engage us as a client, how we use it, and the choices you have. This is a
          placeholder version pending final legal review — it reflects our actual practice
          but does not yet constitute formal legal terms.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Information we collect</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Contact information</strong> you submit through forms or email
            (name, work email, company, message body).
          </li>
          <li>
            <strong>Scheduling data</strong> from Cal.com when you book a call with us
            (name, email, meeting time).
          </li>
          <li>
            <strong>Aggregate analytics</strong> (page views, referrer, country-level
            location) collected by our hosting provider.
          </li>
          <li>
            <strong>Client project data</strong> shared with us under a signed
            engagement, governed by the relevant master services agreement and NDA.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text mt-4">How we use it</h2>
        <p>
          To respond to enquiries, schedule and conduct meetings, deliver client
          projects, and operate the site. We do not sell personal data and we do not run
          advertising trackers.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Data retention</h2>
        <p>
          Enquiry and meeting data are retained only as long as needed to handle the
          conversation. Client project data is retained per the engagement contract.
        </p>

        <h2 className="text-2xl font-bold text-text mt-4">Your rights</h2>
        <p>
          Under UK GDPR you may request access to, correction of, or deletion of personal
          data we hold about you. Email{' '}
          <a href="mailto:hello@automera.co" className="text-accent hover:underline">
            hello@automera.co
          </a>{' '}
          and we will respond within 30 days.
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
