'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, User, BookOpen } from 'lucide-react'
import JourneyTimeline from '@/components/portal/JourneyTimeline'

// Demo data — in production, fetched from Supabase based on auth session
// TODO(follow-up): route is now real-session-gated (see portal/layout.tsx),
// but this page's content is still hardcoded. Replace with a real Supabase
// read keyed on the authenticated user's id — separate follow-up, out of
// scope for the auth phase that added the route protection.
const DEMO_STUDENT = {
  name: 'Adaeze Okafor',
  country: 'Nigeria',
  tier: 'high',
  package: 'Elite Package',
  advisor: 'Sarah M.',
  stage: 3,
}

const STAGES = [
  { label: 'Intake', done: true },
  { label: 'Document Prep', done: true },
  { label: 'Applications', active: true },
  { label: 'Visa Prep', done: false },
  { label: 'Enrolled', done: false },
]

const CHECKLIST = [
  { item: 'Passport copy', done: true },
  { item: 'Academic transcripts', done: true },
  { item: 'Bank statements (12 months)', done: true },
  { item: 'Sponsor letter', done: true },
  { item: 'Statement of Purpose', done: false },
  { item: 'Letters of Recommendation (x2)', done: false },
  { item: 'TOEFL / IELTS score report', done: false },
]

const APPLICATIONS = [
  { school: 'University of Houston', program: 'MS Business Analytics', status: 'submitted', deadline: 'Mar 15, 2026' },
  { school: 'Texas Southern University', program: 'MBA', status: 'submitted', deadline: 'Feb 28, 2026' },
  { school: 'Houston Community College', program: 'Associate Transfer', status: 'draft', deadline: 'Apr 30, 2026' },
]

const STATUS_COLORS: Record<string, string> = {
  submitted: 'badge-low',
  draft: 'badge-moderate',
  decision: 'badge-navy',
  accepted: 'badge-green',
}

export default function PortalPage() {
  const [tab, setTab] = useState<'overview' | 'documents' | 'applications'>('overview')
  const s = DEMO_STUDENT
  const done = CHECKLIST.filter((c) => c.done).length
  const pct = Math.round((done / CHECKLIST.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Portal header */}
      <div className="bg-navy text-white px-4 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Student Portal</p>
            <h1 className="font-display text-2xl font-bold">Welcome back, {s.name.split(' ')[0]}!</h1>
            <p className="text-white/60 text-sm mt-1">{s.country} · {s.package} · Advisor: {s.advisor}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/book" className="bg-gold text-navy text-sm font-bold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors">Book Advisor Call</Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Real, per-student milestone progress */}
        <JourneyTimeline />

        {/* Progress bar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-navy">Enrollment Progress</span>
            <span className="text-xs text-gray-500">Stage {s.stage} of 5</span>
          </div>
          <div className="flex items-center gap-2">
            {STAGES.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2 flex-1">
                <div className={`flex-1 h-1.5 rounded-full ${stage.done ? 'bg-teal' : stage.active ? 'bg-gold' : 'bg-gray-200'}`} />
                {i === STAGES.length - 1 && null}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STAGES.map((stage) => (
              <span key={stage.label} className={`text-xs ${stage.done ? 'text-teal font-semibold' : stage.active ? 'text-gold font-semibold' : 'text-gray-400'}`}>{stage.label}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(['overview', 'documents', 'applications'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-teal text-teal' : 'border-transparent text-gray-500 hover:text-navy'}`}
            >{t}</button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === 'overview' && (
          <motion.div className="grid md:grid-cols-3 gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Document checklist summary */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-teal" />
                <h3 className="font-semibold text-navy text-sm">Documents</h3>
              </div>
              <div className="text-3xl font-bold text-teal mb-1">{done}/{CHECKLIST.length}</div>
              <p className="text-gray-500 text-xs mb-3">items completed</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-gray-400 text-xs mt-2">{pct}% of checklist complete</p>
              <button onClick={() => setTab('documents')} className="text-teal text-xs font-semibold mt-3 hover:underline flex items-center gap-1">View documents <ArrowRight size={12} /></button>
            </div>

            {/* Applications summary */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-gold" />
                <h3 className="font-semibold text-navy text-sm">Applications</h3>
              </div>
              <div className="text-3xl font-bold text-gold mb-1">{APPLICATIONS.length}</div>
              <p className="text-gray-500 text-xs mb-3">schools in pipeline</p>
              {APPLICATIONS.map((a) => (
                <div key={a.school} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-navy truncate max-w-[140px]">{a.school}</span>
                  <span className={`${STATUS_COLORS[a.status]} text-xs`}>{a.status}</span>
                </div>
              ))}
              <button onClick={() => setTab('applications')} className="text-gold text-xs font-semibold mt-3 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></button>
            </div>

            {/* Next actions */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={16} className="text-amber-500" />
                <h3 className="font-semibold text-navy text-sm">Action Required</h3>
              </div>
              <ul className="space-y-3">
                {CHECKLIST.filter((c) => !c.done).map((c) => (
                  <li key={c.item} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{c.item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/portal/documents" className="block mt-4 text-center bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold py-2 rounded-lg hover:bg-amber-100 transition-colors">Upload Missing Documents</Link>
            </div>
          </motion.div>
        )}

        {/* Documents tab */}
        {tab === 'documents' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-navy text-sm">Document Checklist</h3>
                <Link href="/portal/documents" className="text-teal text-xs font-semibold hover:underline">Upload Documents →</Link>
              </div>
              {CHECKLIST.map((c) => (
                <div key={c.item} className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-50 last:border-0">
                  {c.done
                    ? <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    : <div className="w-4.5 h-4.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  }
                  <span className={`text-sm flex-1 ${c.done ? 'text-gray-600 line-through' : 'text-navy font-medium'}`}>{c.item}</span>
                  {c.done
                    ? <span className="badge-low text-xs">Uploaded</span>
                    : <Link href="/portal/documents" className="text-teal text-xs font-semibold hover:underline">Upload</Link>
                  }
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Applications tab */}
        {tab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-navy text-sm">Application Pipeline</h3>
              </div>
              {APPLICATIONS.map((a) => (
                <div key={a.school} className="flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} className="text-navy" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-navy text-sm">{a.school}</div>
                    <div className="text-gray-400 text-xs">{a.program}</div>
                  </div>
                  <div className="text-right">
                    <span className={`${STATUS_COLORS[a.status]} text-xs`}>{a.status}</span>
                    <div className="text-gray-400 text-xs mt-1 flex items-center gap-1 justify-end"><Clock size={10} /> {a.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
