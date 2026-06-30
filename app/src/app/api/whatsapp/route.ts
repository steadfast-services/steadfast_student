import { NextRequest, NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/gemini'
import { sendAdvisorAlert } from '@/lib/email'
import { notifyAdvisorOnWhatsApp } from '@/lib/twilio'
import { getServiceClient } from '@/lib/supabase'
import type { ChatMessage } from '@/lib/types'

// Twilio sends form-encoded data, not JSON
async function parseFormData(req: NextRequest): Promise<Record<string, string>> {
  const text = await req.text()
  return Object.fromEntries(new URLSearchParams(text))
}

function extractLeadMarker(text: string) {
  const match = text.match(/\[LEAD_CAPTURED:\s*name="([^"]+)",\s*email="([^"]+)",\s*country="([^"]+)",\s*package="([^"]+)"\]/)
  if (!match) return null
  return { name: match[1], email: match[2], country: match[3], packageName: match[4] }
}

function stripLeadMarker(text: string) {
  return text.replace(/\[LEAD_CAPTURED:[\s\S]*?\]/g, '').trim()
}

// Return TwiML response (Twilio reads this to send the message)
function twimlReply(message: string) {
  const escaped = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  )
}

export async function POST(req: NextRequest) {
  try {
    const form = await parseFormData(req)
    const from = form['From'] ?? ''       // e.g. "whatsapp:+2347012345678"
    const body = (form['Body'] ?? '').trim()

    if (!from || !body) return twimlReply("Sorry, I didn't receive your message. Please try again.")

    const phone = from.replace('whatsapp:', '')
    const supabase = getServiceClient()

    // Load or create conversation session
    const { data: session } = await supabase
      .from('whatsapp_sessions')
      .select('messages, lead_captured')
      .eq('phone', phone)
      .single()

    const history: ChatMessage[] = session?.messages ?? []
    const alreadyCaptured: boolean = session?.lead_captured ?? false

    // Build updated message list
    const userMsg: ChatMessage = { role: 'user', content: body, timestamp: Date.now() }
    const withUserMsg = [...history, userMsg]

    // Get Sofia's response
    const rawReply = await getChatResponse(withUserMsg)
    const lead = !alreadyCaptured ? extractLeadMarker(rawReply) : null
    const reply = stripLeadMarker(rawReply)

    const botMsg: ChatMessage = { role: 'model', content: reply, timestamp: Date.now() }
    const finalHistory = [...withUserMsg, botMsg]

    // Save conversation back to Supabase
    await supabase.from('whatsapp_sessions').upsert(
      { phone, messages: finalHistory, lead_captured: alreadyCaptured || !!lead, updated_at: new Date().toISOString() },
      { onConflict: 'phone' }
    )

    // Handle qualified lead
    if (lead) {
      const conversationText = finalHistory
        .map((m) => `${m.role === 'user' ? 'Student' : 'Sofia'}: ${m.content}`)
        .join('\n')

      await Promise.allSettled([
        // Save to leads table
        supabase.from('leads').upsert(
          { email: lead.email, full_name: lead.name, source: 'whatsapp', quiz_data: { country: lead.country, package: lead.packageName, phone, channel: 'whatsapp' } },
          { onConflict: 'email', ignoreDuplicates: true }
        ),
        // Email the advisor
        sendAdvisorAlert(
          `🔥 New WhatsApp Lead — ${lead.name} (${lead.country})`,
          `
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Country:</strong> ${lead.country}</p>
            <p><strong>Package:</strong> ${lead.packageName}</p>
            <p><strong>WhatsApp:</strong> ${phone}</p>
            <hr/>
            <h3>Conversation</h3>
            <pre style="font-size:13px;line-height:1.6;white-space:pre-wrap;">${conversationText}</pre>
          `
        ),
        // Ping advisor on WhatsApp instantly
        notifyAdvisorOnWhatsApp({ name: lead.name, email: lead.email, country: lead.country, packageName: lead.packageName, channel: 'WhatsApp', phone }),
      ])
    }

    return twimlReply(reply)
  } catch (err) {
    console.error('WhatsApp webhook error:', err)
    return twimlReply("I'm having a technical problem right now. Please email us at advisors@steadfaststudentservices.com and we will reply within 24 hours.")
  }
}
