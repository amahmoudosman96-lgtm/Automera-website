'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const serviceOptions = [
  'Workflow Automation',
  'AI Agents',
  'Data Pipelines',
  'Custom Integration',
  'Not sure yet',
]

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
        setForm({ name: '', company: '', email: '', service: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const inputClass = cn(
    'w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-text',
    'placeholder:text-muted',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
    'transition-colors duration-150'
  )

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto">
        <div className="max-w-[560px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.08em] uppercase text-muted">
              Get in touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight">
              Tell us what you need
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              We'll read every message and reply within one business day.
            </p>
          </div>

          {state === 'success' ? (
            <div className="rounded-xl border border-border bg-accent-light p-8 text-center flex flex-col gap-3">
              <span className="text-2xl">✅</span>
              <h3 className="text-xl font-semibold text-text">Message sent!</h3>
              <p className="text-base text-muted">
                We'll get back to you within one business day.
              </p>
              <button
                onClick={() => setState('idle')}
                className="text-sm text-accent hover:underline mt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-text">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-medium text-text">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your company"
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-sm font-medium text-text">
                  What do you need?
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-text">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe what you're trying to automate, or just say hi."
                  value={form.message}
                  onChange={handleChange}
                  className={cn(inputClass, 'resize-none')}
                />
              </div>

              {state === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                  Something went wrong. Please try again or email us at{' '}
                  <a href="mailto:hello@automera.co" className="underline">
                    hello@automera.co
                  </a>
                  .
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={state === 'loading'}
                className="w-full justify-center mt-2"
              >
                {state === 'loading' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
