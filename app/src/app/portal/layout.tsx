import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Defense-in-depth alongside middleware.ts (which is the primary boundary
// for /portal/:path*). Covers /portal, /portal/documents, /portal/applications
// automatically via Next.js layout nesting, without touching the existing
// (still demo-data) portal pages themselves.
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in?redirectTo=/portal')
  return <>{children}</>
}
