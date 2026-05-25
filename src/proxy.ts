import { NextResponse, type NextRequest } from 'next/server'
import { SITE_ACCESS_COOKIE, tokenFor } from '@/lib/preview-access'

const PUBLIC_FILE = /\.(?:svg|png|jpg|jpeg|webp|ico|txt|xml|json|woff2?|map)$/i

export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD
  if (!password) return NextResponse.next()

  const { pathname } = request.nextUrl

  if (
    pathname === '/preview-access' ||
    pathname === '/api/preview-access' ||
    pathname.startsWith('/_next/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value
  if (token && token === tokenFor(password)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/preview-access'
  url.search = `?from=${encodeURIComponent(pathname + request.nextUrl.search)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
