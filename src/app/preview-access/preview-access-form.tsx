'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'

export function PreviewAccessForm({ redirectTo }: { redirectTo: string }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/preview-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(data.error ?? 'Something went wrong. Try again.')
        setSubmitting(false)
        return
      }
      window.location.assign(redirectTo)
    } catch {
      setError('Network error. Try again.')
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-border rounded-xl p-6 shadow-card"
    >
      <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-border rounded-lg text-text bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <Button type="submit" disabled={submitting || !password} className="w-full mt-4">
        {submitting ? 'Checking…' : 'Continue'}
      </Button>
    </form>
  )
}
