import { NextRequest, NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/gemini'
import type { ChatMessage } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: ChatMessage[] }
    if (!messages?.length) return NextResponse.json({ error: 'No messages' }, { status: 400 })

    const reply = await getChatResponse(messages)
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
