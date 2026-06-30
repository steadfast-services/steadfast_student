import { NextRequest, NextResponse } from 'next/server'
import { sendBookingConfirmationEmail, sendAdvisorAlert } from '@/lib/email'

// Webhook endpoint for Cal.com booking confirmations and other notification triggers
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, email, name, dateTime } = body

    switch (type) {
      case 'booking_confirmed':
        if (!email || !name || !dateTime) {
          return NextResponse.json({ error: 'Missing email, name, or dateTime' }, { status: 400 })
        }
        await Promise.allSettled([
          sendBookingConfirmationEmail(email, name, dateTime),
          sendAdvisorAlert(`New Booking: ${name}`, `<p><strong>Student:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Time:</strong> ${dateTime}</p>`),
        ])
        break
      case 'advisor_alert':
        if (!body.subject || !body.html) {
          return NextResponse.json({ error: 'Missing subject or html' }, { status: 400 })
        }
        await sendAdvisorAlert(body.subject, body.html)
        break
      default:
        return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Notify API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
