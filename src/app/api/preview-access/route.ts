import { NextResponse, type NextRequest } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import {
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_MAX_AGE,
  normalizePassword,
  tokenFor,
} from '@/lib/preview-access'

export async function POST(req: NextRequest) {
  const expectedRaw = process.env.SITE_PASSWORD
  if (!expectedRaw) {
    return NextResponse.json({ ok: true, disabled: true })
  }
  const expected = normalizePassword(expectedRaw)

  let submitted = ''
  try {
    const body = (await req.json()) as { password?: unknown }
    if (typeof body.password === 'string') submitted = body.password
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  submitted = submitted.trim()

  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  const matches = a.length === b.length && timingSafeEqual(a, b)

  if (!matches) {
    console.warn(
      `[preview-access] password mismatch — submitted bytes=${a.length}, expected bytes=${b.length}`
    )
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: SITE_ACCESS_COOKIE,
    value: tokenFor(expected),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SITE_ACCESS_MAX_AGE,
  })
  return response
}
