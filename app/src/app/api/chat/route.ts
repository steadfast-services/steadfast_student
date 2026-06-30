import { NextRequest, NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/gemini'
import { sendAdvisorAlert } from '@/lib/email'
import { getServiceClient } from '@/lib/supabase'
import type { ChatMessage } from '@/lib/types'

// Parses [LEAD_CAPTURED: name="...", email="...", country="...", package="..."] from Sofia's reply
function extractLeadMarker(text: string) {
  const match = text.match(/\[LEAD_CAPTURED:\s*name="([^"]+)",\s*email="([^"]+)",\s*country="([^"]+)",\s*package="([^"]+)"\]/)
  if (!match) return null
  return { name: match[1], email: match[2], country: match[3], packageName: match[4] }
}

function stripLeadMarker(text: string) {
  return text.replace(/\[LEAD_CAPTURED:.*?\]/gs, '').trim()
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: ChatMessage[] }
    if (!messages?.length) return NextResponse.json({ error: 'No messages' }, { status: 400 })

    const rawReply = await getChatResponse(messages)
    const lead = extractLeadMarker(rawReply)
    const reply = stripLeadMarker(rawReply)

    if (lead) {
      const supabase = getServiceClient()
      const conversationText = messages
        .map((m) => `${m.role === 'user' ? 'Student' : 'Sofia'}: ${m.content}`)
        .join('\n')

      // Save lead (ignore duplicate)
      await supabase.from('leads').upsert(
        { email: lead.email, full_name: lead.name, source: 'chatbot', quiz_data: { country: lead.country, package: lead.packageName, channel: 'website_chat' } },
        { onConflict: 'email', ignoreDuplicates: true }
      )

      // Notify advisor by email
      await sendAdvisorAlert(
        `🔥 New Qualified Lead — ${lead.name} (${lead.country})`,
        `
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Country:</strong> ${lead.country}</p>
          <p><strong>Matched Package:</strong> ${lead.packageName}</p>
          <p><strong>Channel:</strong> Website Chat (Sofia)</p>
          <hr/>
          <h3>Conversation</h3>
          <pre style="font-size:13px;line-height:1.6;white-space:pre-wrap;">${conversationText}</pre>
        `
      )
    }

    return NextResponse.json({ reply, leadCaptured: !!lead })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
