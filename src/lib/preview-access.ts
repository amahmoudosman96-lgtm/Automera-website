import { createHash } from 'node:crypto'

export const SITE_ACCESS_COOKIE = 'automera-preview-access'
export const SITE_ACCESS_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

// Defensive: some hosting UIs save env values with surrounding quotes or
// trailing whitespace from copy-paste. Strip them so both the proxy and
// the API derive the same canonical password.
export function normalizePassword(raw: string): string {
  let v = raw.trim()
  if (v.length >= 2) {
    const first = v[0]
    const last = v[v.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      v = v.slice(1, -1)
    }
  }
  return v
}

export function tokenFor(password: string): string {
  return createHash('sha256')
    .update(`automera-preview:${normalizePassword(password)}`)
    .digest('hex')
}
