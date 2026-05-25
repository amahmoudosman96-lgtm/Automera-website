import { NextResponse, type NextRequest } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { SITE_ACCESS_COOKIE, SITE_ACCESS_MAX_AGE, tokenFor } from '@/lib/preview-access'

export async function POST(req: NextRequest) {
  const expected = process.env.SITE_PASSWORD
  if (!expected) {
    return NextResponse.json({ ok: true, disabled: true })
  }

  let submitted = ''
  try {
    const body = (await req.json()) as { password?: unknown }
    if (typeof body.password === 'string') submitted = body.password
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  const matches = a.length === b.length && timingSafeEqual(a, b)

  if (!matches) {
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
