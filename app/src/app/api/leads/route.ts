import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { sendWelcomeEmail, sendAdvisorAlert } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, full_name, source, quiz_data } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const supabase = getServiceClient()

    // Upsert lead (avoid duplicate welcome emails)
    const { data: existing } = await supabase.from('leads').select('id').eq('email', email).single()
    if (existing) return NextResponse.json({ status: 'existing' })

    await supabase.from('leads').insert({ email, full_name, source: source ?? 'contact', quiz_data })

    // Send welcome email and advisor alert in parallel
    await Promise.allSettled([
      sendWelcomeEmail(email, full_name ?? 'there'),
      sendAdvisorAlert(
        `New Lead: ${full_name ?? email}`,
        `<p><strong>Email:</strong> ${email}</p><p><strong>Source:</strong> ${source ?? 'contact'}</p><p><strong>Name:</strong> ${full_name ?? 'Not provided'}</p>`
      ),
    ])

    return NextResponse.json({ status: 'created' })
  } catch (err) {
    console.error('Leads API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
