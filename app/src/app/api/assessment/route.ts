import { NextRequest, NextResponse } from 'next/server'
import { calculateSupportProfile, tierToPackage } from '@/lib/assessment'
import { getServiceClient } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/server'
import { sendAssessmentResultEmail } from '@/lib/email'
import { recordMilestone } from '@/lib/milestones'
import type { AssessmentAnswers } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const answers: AssessmentAnswers = await req.json()
    const result = calculateSupportProfile(answers)

    // If email provided, save lead and send result email — unchanged,
    // keeps working identically for anonymous/logged-out quiz-takers.
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

    // If the quiz-taker is signed in, persist the result to their own
    // record too — additive, does not change the anonymous flow above.
    const authClient = createClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (user) {
      const supabase = getServiceClient()
      await supabase.from('students').update({
        risk_tier: result.tier,
        risk_score: result.score,
        service_package: tierToPackage(result.tier),
        country_of_origin: answers.country,
      }).eq('id', user.id)

      await recordMilestone(user.id, 'assessment_completed', { tier: result.tier, score: result.score })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Assessment API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
