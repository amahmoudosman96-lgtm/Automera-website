'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { CalButton } from '@/components/ui/cal-button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: "What we've built", href: '/cases' },
  { label: 'Blog', href: '/blog' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change (link click)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200',
        scrolled && 'nav-scrolled'
      )}
    >
      <div className="max-w-[1140px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Automera home"
          >
            <Image
              src="/automera-logo-orbit-light.svg"
              alt="Automera"
              width={600}
              height={200}
              priority
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] text-text-secondary hover:text-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <CalButton size="sm">Book a Call</CalButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-text-secondary hover:text-text transition-colors py-1"
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          <CalButton size="sm" className="mt-2 w-full justify-center">
            Book a Call
          </CalButton>
        </div>
      )}
    </header>
  )
}
