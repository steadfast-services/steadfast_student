import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
    return adminAuth(req)
  }
  return updateSession(req)
}

// Gates /admin and its API routes behind a single shared password (HTTP Basic
// Auth) — lightweight protection since real applicant chat data now lives
// there. Fails closed: if ADMIN_PASSWORD isn't set, access is blocked rather
// than left open by accident.
function adminAuth(req: NextRequest) {
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedPassword) {
    return new NextResponse('Admin access is not configured.', { status: 503 })
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Basic ')) {
    // atob (not Buffer) since middleware runs on the Edge runtime.
    const decoded = atob(authHeader.slice(6))
    const password = decoded.split(':')[1]
    if (password === expectedPassword) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Steadfast Admin"' },
  })
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/portal/:path*',
    // Match all other paths except static assets, so the Supabase session
    // cookie refreshes on every navigation (needed for Navigation.tsx's
    // auth-state UI to stay correct). The /admin branch above already wins
    // for admin paths since middleware() checks and returns early for them.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
