import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(req: NextRequest) {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Try to get session
  const { data } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ['/dashboard']

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!data.session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('from', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

// ✅ Apply middleware to /dashboard routes only
export const config = {
  matcher: ['/dashboard/:path*'],
}
