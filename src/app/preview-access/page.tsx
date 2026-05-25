import type { Metadata } from 'next'
import { PreviewAccessForm } from './preview-access-form'

export const metadata: Metadata = {
  title: 'Preview Access',
  robots: { index: false, follow: false },
}

export default async function PreviewAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams
  const safeFrom = from && from.startsWith('/') && !from.startsWith('//') ? from : '/'

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text">Automera</h1>
          <p className="mt-2 text-sm text-muted">
            This preview is private. Enter the password to continue.
          </p>
        </div>
        <PreviewAccessForm redirectTo={safeFrom} />
      </div>
    </div>
  )
}
