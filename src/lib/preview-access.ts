import { createHash } from 'node:crypto'

export const SITE_ACCESS_COOKIE = 'automera-preview-access'
export const SITE_ACCESS_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function tokenFor(password: string): string {
  return createHash('sha256').update(`automera-preview:${password}`).digest('hex')
}
