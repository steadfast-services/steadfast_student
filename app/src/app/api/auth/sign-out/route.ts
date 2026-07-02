import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST route handler (not a client-only signOut() call) so the Set-Cookie
// clearing headers from Supabase's setAll() actually reach the browser.
export async function POST(req: NextRequest) {
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/', req.url))
}
