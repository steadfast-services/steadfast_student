'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ShieldCheck, ShieldAlert, ShieldX, Loader2, CheckCircle } from 'lucide-react'
import type { AssessmentAnswers, RiskResult } from '@/lib/types'

const COUNTRIES = [
  'Afghanistan','Bangladesh','Bolivia','Brazil','Cameroon','Canada','China','Colombia','Cuba','Dominican Republic',
  'Ecuador','Egypt','France','Germany','Ghana','Haiti','India','Indonesia','Iran','Ireland','Italy','Japan',
  'Libya','Mali','Mexico','Morocco','Nepal','Netherlands','New Zealand','Nigeria','Norway','Pakistan',
  'Paraguay','Peru','Philippines','Senegal','Singapore','Somalia','South Korea','Spain','Sri Lanka',
  'Sudan','Sweden','Switzerland','Thailand','United Kingdom','Venezuela','Vietnam','Yemen','Other'
].sort()

const STEPS = [
  { id: 'country', title: 'Home Country', subtitle: 'Select your country of citizenship' },
  { id: 'program', title: 'Your Goal', subtitle: 'What level of study are you pursuing?' },
  { id: 'gpa', title: 'Academic Record', subtitle: 'What is your GPA (on a 4.0 scale)?' },
  { id: 'financial', title: 'Financial Documentation', subtitle: 'Describe your financial proof for the visa interview' },
  { id: 'denial', title: 'Prior Visa History', subtitle: 'Have you had any previous U.S. visa denials?' },
  { id: 'timeline', title: 'Target Start Date', subtitle: 'When do you plan to begin your studies?' },
  { id: 'email', title: 'Get Your Results', subtitle: 'Enter your details to receive your personalized assessment' },
]

const initialAnswers: AssessmentAnswers = {
  country: '', intendedProgram: '', gpa: '', financialProof: '', priorVisaDenial: false, targetStartDate: '', email: '', name: '',
}

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [result, setResult] = useState<RiskResult | null>(null)
  const [loading, setLoading] = useState(false)

  function set(key: keyof AssessmentAnswers, value: string | boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  function canProceed() {
    const s = STEPS[step].id
    if (s === 'country') return !!answers.country
    if (s === 'program') return !!answers.intendedProgram
    if (s === 'gpa') return !!answers.gpa
    if (s === 'financial') return !!answers.financialProof
    if (s === 'denial') return true
    if (s === 'timeline') return !!answers.targetStartDate
    if (s === 'email') return !!answers.email && !!answers.name
    return false
  }

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
      setResult(await res.json())
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) return <ResultScreen result={result} />

  const current = STEPS[step]
  const progress = ((step) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-navy pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-white/50 text-xs mb-2">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gold rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div key={step} className="bg-white rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
          >
            <p className="text-teal text-xs font-bold tracking-widest uppercase mb-2">Free Assessment</p>
            <h2 className="font-display text-2xl font-bold text-navy mb-1">{current.title}</h2>
            <p className="text-gray-500 text-sm mb-6">{current.subtitle}</p>

            {/* Step content */}
            {current.id === 'country' && (
              <select value={answers.country} onChange={(e) => set('country', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              >
                <option value="">Select your country…</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            )}

            {current.id === 'program' && (
              <div className="grid grid-cols-2 gap-3">
                {['Associate Degree (2-year)', 'Bachelor\'s Degree (4-year)', 'Master\'s Degree', 'PhD / Doctoral', 'Certificate / Vocational', 'English Language Program'].map((p) => (
                  <button key={p} onClick={() => set('intendedProgram', p)}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${answers.intendedProgram === p ? 'border-teal bg-teal/5 font-semibold text-navy' : 'border-gray-200 text-gray-600 hover:border-teal/50'}`}
                  >{p}</button>
                ))}
              </div>
            )}

            {current.id === 'gpa' && (
              <div className="space-y-3">
                {[
                  { value: 'above_3_5', label: '3.5 – 4.0 (Excellent)', desc: 'Strong academic profile' },
                  { value: '3_0_to_3_5', label: '3.0 – 3.5 (Good)', desc: 'Solid academic standing' },
                  { value: '2_5_to_3_0', label: '2.5 – 3.0 (Average)', desc: 'May need stronger supporting docs' },
                  { value: 'below_2_5', label: 'Below 2.5', desc: 'We can still help — strategy matters' },
                  { value: 'no_gpa', label: 'Not applicable / N/A', desc: 'Transfer, grad student, or other' },
                ].map((g) => (
                  <button key={g.value} onClick={() => set('gpa', g.value)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${answers.gpa === g.value ? 'border-teal bg-teal/5' : 'border-gray-200 hover:border-teal/50'}`}
                  >
                    <div className="font-medium text-navy text-sm">{g.label}</div>
                    <div className="text-gray-400 text-xs">{g.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {current.id === 'financial' && (
              <div className="space-y-3">
                {[
                  { value: 'full_sponsor_letter', label: 'Full sponsor letter + proof of funds', desc: 'Strong financial documentation' },
                  { value: 'bank_statements_strong', label: 'Bank statements (12+ months, sufficient funds)', desc: 'Good financial proof' },
                  { value: 'bank_statements_borderline', label: 'Bank statements (recent, borderline funds)', desc: 'May need strengthening' },
                  { value: 'insufficient', label: 'Limited / incomplete financial proof', desc: 'We will help you build this' },
                ].map((f) => (
                  <button key={f.value} onClick={() => set('financialProof', f.value)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${answers.financialProof === f.value ? 'border-teal bg-teal/5' : 'border-gray-200 hover:border-teal/50'}`}
                  >
                    <div className="font-medium text-navy text-sm">{f.label}</div>
                    <div className="text-gray-400 text-xs">{f.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {current.id === 'denial' && (
              <div className="grid grid-cols-2 gap-4">
                {[{ value: false, label: 'No previous denial', sub: 'Clean visa history' }, { value: true, label: 'Yes, I was denied', sub: 'We specialize in re-applications' }].map((d) => (
                  <button key={String(d.value)} onClick={() => set('priorVisaDenial', d.value)}
                    className={`p-5 rounded-xl border-2 text-center transition-all ${answers.priorVisaDenial === d.value ? 'border-teal bg-teal/5' : 'border-gray-200 hover:border-teal/50'}`}
                  >
                    <div className="font-semibold text-navy text-sm mb-1">{d.label}</div>
                    <div className="text-gray-400 text-xs">{d.sub}</div>
                  </button>
                ))}
              </div>
            )}

            {current.id === 'timeline' && (
              <div className="grid grid-cols-2 gap-3">
                {['Fall 2026 (Aug–Sep)', 'Spring 2027 (Jan–Feb)', 'Fall 2027 (Aug–Sep)', 'Spring 2028 (Jan–Feb)', 'Summer 2027', 'Not sure yet'].map((t) => (
                  <button key={t} onClick={() => set('targetStartDate', t)}
                    className={`p-3 rounded-lg border-2 text-sm text-center transition-all ${answers.targetStartDate === t ? 'border-teal bg-teal/5 font-semibold text-navy' : 'border-gray-200 text-gray-600 hover:border-teal/50'}`}
                  >{t}</button>
                ))}
              </div>
            )}

            {current.id === 'email' && (
              <div className="space-y-4">
                <div className="bg-teal/5 border border-teal/20 rounded-lg p-3 text-sm text-teal">
                  Your results are ready! Enter your details to receive your personalized plan via email.
                </div>
                <input value={answers.name ?? ''} onChange={(e) => set('name', e.target.value)} placeholder="Your full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal" />
                <input type="email" value={answers.email ?? ''} onChange={(e) => set('email', e.target.value)} placeholder="Your email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal" />
                <p className="text-gray-400 text-xs">We respect your privacy. No spam, ever. Unsubscribe anytime.</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 gap-4">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-gray-500 hover:text-navy text-sm font-medium transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <div className="ml-auto">
                {step < STEPS.length - 1 ? (
                  <button onClick={() => setStep(step + 1)} disabled={!canProceed()}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed py-3"
                  >Continue <ArrowRight size={16} /></button>
                ) : (
                  <button onClick={submit} disabled={!canProceed() || loading} className="btn-primary disabled:opacity-40 py-3">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Calculating…</> : <>View My Results <ArrowRight size={16} /></>}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const TIER_CONTENT = {
  low: {
    Icon: ShieldCheck,
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50 border-green-200',
    pillClass: 'bg-green-100 text-green-700',
    label: 'Strong Profile',
    headline: "You're in a Strong Position",
    message: "Your profile shows a high likelihood of approval. Our Standard Package will polish your documents, guide your school selection, and get your application submission-ready.",
    pkg: 'Standard Package',
    features: [
      'Comprehensive document review & checklist',
      'University and program selection guidance',
      'Application essay proofreading',
      'Visa interview preparation tips',
      'Deadline tracking and reminders',
      'Secure student portal access',
      'Email advisor support',
    ],
    ctaLabel: 'Book Your Free Consultation',
    urgency: null as string | null,
  },
  moderate: {
    Icon: ShieldAlert,
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50 border-amber-200',
    pillClass: 'bg-amber-100 text-amber-700',
    label: 'Competitive Profile',
    headline: 'Preparation Is the Deciding Factor',
    message: "Your profile is solid, but thorough preparation separates approvals from denials at your level. Our Premium Package provides the financial coaching, SOP guidance, and mock interviews that give you the competitive edge.",
    pkg: 'Premium Package',
    features: [
      'Everything in the Standard Package',
      'Financial document strategy session',
      'Statement of Purpose (SOP) expert coaching',
      'Mock visa interview — 2 sessions',
      'Post-denial re-application strategy',
      'Dedicated personal advisor',
      'Priority email & chat support',
    ],
    ctaLabel: 'Book Your Strategy Session',
    urgency: 'Advisors have limited slots — early preparation significantly improves outcomes.' as string | null,
  },
  high: {
    Icon: ShieldX,
    colorClass: 'text-red-600',
    bgClass: 'bg-red-50 border-red-200',
    pillClass: 'bg-red-100 text-red-700',
    label: 'Complex Profile',
    headline: 'Your Case Needs Expert-Level Strategy',
    message: "Your profile has factors that require a specialized, hands-on approach. Our Elite Package was built for exactly this — a fully custom strategy, unlimited sessions, and our most experienced team in your corner.",
    pkg: 'Elite Package',
    features: [
      'Case-by-case custom visa strategy',
      'Legal documentation review',
      'Embassy-specific consular officer coaching',
      'Financial narrative framing (beyond documents)',
      'Unlimited consultation sessions',
      'Priority direct advisor phone line',
      'Post-arrival and OPT/CPT guidance',
    ],
    ctaLabel: 'Book Your Elite Strategy Call',
    urgency: 'Complex cases need the most lead time — the earlier we start, the stronger your file.' as string | null,
  },
}

function ResultScreen({ result }: { result: RiskResult }) {
  const { Icon, colorClass, bgClass, pillClass, label, headline, message, pkg, features, ctaLabel, urgency } = TIER_CONTENT[result.tier]

  return (
    <div className="min-h-screen bg-navy pt-16 flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <p className="text-teal text-xs font-bold tracking-widest uppercase mb-2">Your Results</p>
        <h2 className="font-display text-3xl font-bold text-navy mb-6">{headline}</h2>

        {/* Tier badge */}
        <div className={`rounded-xl border-2 p-5 mb-6 ${bgClass}`}>
          <div className="flex items-center gap-3 mb-3">
            <Icon size={28} className={colorClass} />
            <div>
              <div className={`font-bold text-xl ${colorClass}`}>{label}</div>
              <div className="text-gray-500 text-sm">Based on your unique answers</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>

        {/* Package features — only this tier's package is shown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-navy text-sm">Your Recommended Package</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${pillClass}`}>{pkg}</span>
          </div>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-teal flex-shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Key factors */}
        <div className="mb-6">
          <h3 className="font-semibold text-navy text-sm mb-3">Key Factors in Your Profile</h3>
          <ul className="space-y-2">
            {result.keyFactors.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-teal mt-0.5">•</span>{f}
              </li>
            ))}
          </ul>
        </div>

        {/* Next steps */}
        <div className="mb-6">
          <h3 className="font-semibold text-navy text-sm mb-3">Your Next Steps</h3>
          <ul className="space-y-2">
            {result.nextSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-teal text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>{s}
              </li>
            ))}
          </ul>
        </div>

        {/* Urgency note (moderate + high only) */}
        {urgency && (
          <div className={`rounded-lg border-2 p-3 mb-6 text-xs text-center font-medium ${bgClass} ${colorClass}`}>
            {urgency}
          </div>
        )}

        {/* CTA */}
        <div className="bg-navy rounded-xl p-5 text-center">
          <p className="text-white/80 text-sm mb-4">Ready to turn this into an action plan? Book your free 30-minute call with a Steadfast advisor.</p>
          <Link href="/book" className="btn-primary w-full justify-center">{ctaLabel} <ArrowRight size={16} /></Link>
        </div>

        <p className="text-gray-400 text-xs text-center mt-4 leading-relaxed">
          This assessment is for educational purposes only and is not legal advice. Visa outcomes depend on individual circumstances and consular officer discretion. Steadfast Student Services is not a law firm.
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-gray-400 text-sm hover:text-navy transition-colors">← Return to Home</Link>
        </div>
      </motion.div>
    </div>
  )
}
