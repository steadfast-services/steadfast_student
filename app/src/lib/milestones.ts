import { getServiceClient } from '@/lib/supabase'

export type MilestoneType = 'account_created' | 'assessment_completed' | 'document_uploaded' | 'consultation_booked'

// Best-effort — a milestone write failing should never break the primary
// action (upload, assessment submit, booking) that triggered it.
export async function recordMilestone(studentId: string, type: MilestoneType, metadata?: Record<string, unknown>) {
  try {
    const supabase = getServiceClient()
    await supabase.from('student_milestones').insert({ student_id: studentId, type, metadata })
  } catch (err) {
    console.error('Failed to record milestone:', type, err)
  }
}
