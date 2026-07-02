import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import type { ChatMessage } from '@/lib/types'

// Returns every student-authored question from Sofia chat sessions active
// within the requested window (default 7 days), newest first — used by the
// /admin "Applicant Questions" panel for weekly review.
export async function GET(req: NextRequest) {
  try {
    const days = Number(req.nextUrl.searchParams.get('days') ?? '7')
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('session_key, messages, lead_captured, updated_at')
      .gte('updated_at', since)
      .order('updated_at', { ascending: false })

    if (error) throw error

    const questions = (data ?? []).flatMap((session) => {
      const messages = (session.messages ?? []) as ChatMessage[]
      return messages
        .filter((m) => m.role === 'user')
        .map((m) => ({
          question: m.content,
          timestamp: m.timestamp,
          sessionKey: session.session_key,
          leadCaptured: session.lead_captured,
        }))
    })

    questions.sort((a, b) => b.timestamp - a.timestamp)

    return NextResponse.json({ questions, sessionCount: data?.length ?? 0 })
  } catch (err) {
    console.error('Admin chat-questions API error:', err)
    return NextResponse.json({ error: 'Failed to load questions' }, { status: 500 })
  }
}
