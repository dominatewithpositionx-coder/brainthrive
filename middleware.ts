import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const unauthorized = () =>
  new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="PlayPass Admin"' },
  })

export function middleware(req: NextRequest) {
  const url = new URL(req.url)
  const protectedPrefixes = ['/admin', '/api/export']
  const needsAuth = protectedPrefixes.some((p) => url.pathname.startsWith(p))
  if (!needsAuth) return NextResponse.next()

  const header = req.headers.get('authorization') || ''
  if (!header.startsWith('Basic ')) {
    return unauthorized()
  }

  try {
    const decoded = Buffer.from(header.replace('Basic ', ''), 'base64').toString()
    const [user, pass] = decoded.split(':')
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
      return NextResponse.next()
    }
  } catch {
    // fallthrough to unauthorized
  }

  return unauthorized()
}

export const config = {
  matcher: ['/admin/:path*', '/api/export/:path*'],
}
