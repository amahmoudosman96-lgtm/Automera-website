import Link from 'next/link'
import { X, Link2 } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Workflow Automation', href: '/#services' },
    { label: 'AI Agents', href: '/#services' },
    { label: 'Data Pipelines', href: '/#services' },
    { label: 'Custom Integrations', href: '/#services' },
  ],
  Company: [
    { label: 'About', href: '/#why' },
    { label: 'Team', href: '/#team' },
    { label: 'Cases', href: '/cases' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1140px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-[18px] font-semibold text-black tracking-tight">
              automera
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-[200px]">
              AI automation for SMB teams that need to move fast.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://twitter.com/automera"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automera on X (Twitter)"
                className="text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </a>
              <a
                href="https://linkedin.com/company/automera"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automera on LinkedIn"
                className="text-muted hover:text-text transition-colors"
              >
                <Link2 size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-muted">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Automera. All rights reserved.
          </p>
          <a
            href="mailto:hello@automera.co"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            hello@automera.co
          </a>
        </div>
      </div>
    </footer>
  )
}
