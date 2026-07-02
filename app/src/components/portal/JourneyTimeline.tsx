'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserPlus, ClipboardCheck, FileText, Calendar, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Milestone = { type: string; created_at: string }

const STEPS: { type: string; label: string; icon: typeof UserPlus; cta?: { href: string; label: string } }[] = [
  { type: 'account_created', label: 'Created your account', icon: UserPlus },
  { type: 'assessment_completed', label: 'Completed your risk assessment', icon: ClipboardCheck, cta: { href: '/assessment', label: 'Take the assessment' } },
  { type: 'document_uploaded', label: 'Uploaded a document', icon: FileText, cta: { href: '/portal/documents', label: 'Upload documents' } },
  { type: 'consultation_booked', label: 'Booked your consultation', icon: Calendar, cta: { href: '/book', label: 'Book a free call' } },
]

// Real, per-student progress — reads student_milestones directly with the
// browser client; RLS ("student_id = auth.uid()") scopes this to the
// signed-in user's own rows, no API route needed.
export default function JourneyTimeline() {
  const [milestones, setMilestones] = useState<Milestone[] | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('student_milestones')
        .select('type, created_at')
        .order('created_at', { ascending: true })
      setMilestones(data ?? [])
    })
  }, [])

  if (milestones === null) return null

  const completedCount = STEPS.filter((s) => milestones.some((m) => m.type === s.type)).length

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-navy">Your Journey</span>
        <span className="text-xs text-gray-500">{completedCount} of {STEPS.length} complete</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-teal rounded-full transition-all duration-500" style={{ width: `${(completedCount / STEPS.length) * 100}%` }} />
      </div>
      <ul className="space-y-3">
        {STEPS.map((step) => {
          const done = milestones.find((m) => m.type === step.type)
          const Icon = step.icon
          return (
            <li key={step.type} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-teal/10' : 'bg-gray-50'}`}>
                {done ? <CheckCircle size={16} className="text-teal" /> : <Icon size={14} className="text-gray-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm ${done ? 'text-navy font-medium' : 'text-gray-500'}`}>{step.label}</span>
                {done && (
                  <div className="text-gray-400 text-xs">
                    {new Date(done.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
              {!done && step.cta && (
                <Link href={step.cta.href} className="text-teal text-xs font-semibold hover:underline flex-shrink-0 whitespace-nowrap">
                  {step.cta.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
