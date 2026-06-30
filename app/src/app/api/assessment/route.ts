import { NextRequest, NextResponse } from 'next/server'
import { calculateSupportProfile } from '@/lib/assessment'
import { getServiceClient } from '@/lib/supabase'
import { sendAssessmentResultEmail } from '@/lib/email'
import type { AssessmentAnswers } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const answers: AssessmentAnswers = await req.json()
    const result = calculateSupportProfile(answers)

    // If email provided, save lead and send result email
    if (answers.email) {
      const supabase = getServiceClient()
      await supabase.from('leads').upsert({
        email: answers.email,
        full_name: answers.name,
        source: 'quiz',
        quiz_data: answers,
      }, { onConflict: 'email' })

      await sendAssessmentResultEmail(
        answers.email,
        answers.name ?? 'there',
        result.tier,
        result.packageRecommendation
      ).catch(() => {}) // Non-fatal
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Assessment API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
