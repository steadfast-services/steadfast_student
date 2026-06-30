'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, CheckCircle, Shield, Star, TrendingUp, Users } from 'lucide-react'

const STATS = [
  { icon: Users, value: '2,400+', label: 'Students Enrolled' },
  { icon: CheckCircle, value: '89%*', label: 'Visa Approval Rate' },
  { icon: TrendingUp, value: '68', label: 'Countries Served' },
  { icon: Shield, value: '100%', label: 'Compliance Record' },
]

const SERVICES = [
  {
    tier: 'Standard',
    badge: 'badge-low',
    color: 'border-green-200',
    accent: 'bg-green-50',
    title: 'Standard Package',
    subtitle: 'For strong profiles that need an expert review.',
    description: 'Even qualified students get denied on technicalities. A missing document, the wrong financial format, or one unprepared interview answer can end a dream. Standard provides the expert review that closes every gap before the consulate finds it.',
    features: ['Document review & checklist', 'School selection guidance', 'Application proofreading', 'Visa interview tips', 'Email advisor support'],
  },
  {
    tier: 'Premium',
    badge: 'badge-moderate',
    color: 'border-amber-200',
    accent: 'bg-amber-50',
    title: 'Premium Package',
    subtitle: 'For competitive profiles that need a strategic edge.',
    description: 'Your profile is solid, but so are hundreds of others from your country. Premium closes the gap with financial document coaching, two mock visa interviews, and a dedicated advisor who knows exactly what consular officers look for from applicants like you.',
    features: ['Everything in Standard', 'Financial document strategy', 'SOP expert coaching', 'Mock visa interview', 'Post-denial re-application', 'Dedicated advisor', 'Application status tracking'],
    highlighted: true,
  },
  {
    tier: 'Elite',
    badge: 'badge-high',
    color: 'border-red-200',
    accent: 'bg-red-50',
    title: 'Elite Package',
    subtitle: 'For complex profiles that need a custom-built case.',
    description: 'Generic advice fails when denial rates exceed 50%. Elite is our signature service, building a case-by-case strategy that anticipates the specific objections your consulate will raise. This is for students who leave nothing to chance.',
    features: ['Everything in Premium', 'Case-by-case custom visa strategy', 'Legal documentation review', 'Embassy-specific coaching', 'Unlimited consultations', 'Priority support line'],
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Free Assessment', desc: 'Take our 2-minute quiz. We analyze your unique profile to recommend the right level of support.' },
  { step: '02', title: 'Free Consultation', desc: 'A senior advisor reviews your profile and builds a personalized enrollment strategy — tailored to your specific situation.' },
  { step: '03', title: 'Guided Application', desc: 'We manage your document checklist, application submissions, and follow-ups through your secure student portal.' },
  { step: '04', title: 'Visa Preparation', desc: 'Mock interviews, financial document coaching, and embassy-specific tips based on your country and consulate.' },
  { step: '05', title: 'Enrollment & Arrival', desc: 'We guide you through pre-departure steps so you arrive on campus confident and prepared.' },
]

const TESTIMONIALS = [
  { name: 'Fatima A.', country: 'Nigeria', stars: 5, program: 'MS in Computer Science', text: 'After two denials, I thought my dream was over. Steadfast built a new strategy from scratch, focusing on my home ties and financial narrative. Their mock interviews were tougher than the real thing. I got my visa on the third try. They didn\'t just give me advice; they gave me confidence.' },
  { name: 'Rohan K.', country: 'India', stars: 5, program: 'MBA', text: 'The process is overwhelming. Steadfast made it simple. My advisor, Sarah, was always one step ahead, managing my deadlines and ensuring every document was perfect. The investment was worth every penny for the peace of mind alone.' },
  { name: 'Isabella C.', country: 'Colombia', stars: 5, program: 'BS in Nursing', text: 'As the first in my family to study in the U.S., we had no idea where to start. Steadfast guided us through everything, from choosing a university to preparing for the visa interview. They were patient, professional, and truly cared about my success.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* ===== HERO ===== */}
      <section className="gradient-hero text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            The U.S. Visa System Rejects More <span className="text-gold">Qualified Students</span> Than You Realize.
          </motion.h1>
          <motion.p
            className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            Visa refusal rates exceed 40% in over 20 countries. One missing document, one weak financial story, one unprepared answer in a 3-minute interview—and a dream is delayed by a year. We have helped 2,400+ students from 68 countries get through. Start with our free assessment.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/assessment" className="btn-primary text-base px-8 py-4 animate-pulse-gold">
              Get My Free Assessment <ArrowRight size={18} />
            </Link>
            <Link href="/book" className="btn-secondary text-base px-8 py-4">
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-navy-light py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <s.icon size={32} className="text-gold flex-shrink-0" />
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mt-4">* Based on client outcomes 2022–2025. Individual results vary and are not guaranteed.</p>
        </div>
      </section>

      {/* ===== DENIAL REALITY ===== */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label text-red-400">The Numbers No One Tells You</div>
            <h2 className="font-display text-3xl font-bold text-white mt-2 mb-3">This Is What Happens Without the Right Strategy</h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto">Approximate annual U.S. visa refusal rates by country. These students applied. Many were qualified. Most did not know what they were missing.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { country: 'Nigeria', rate: '~63%', high: true },
              { country: 'Pakistan', rate: '~54%', high: true },
              { country: 'Ghana', rate: '~52%', high: true },
              { country: 'Bangladesh', rate: '~46%', high: true },
              { country: 'Vietnam', rate: '~38%', high: false },
              { country: 'Nepal', rate: '~36%', high: false },
              { country: 'India', rate: '~26%', high: false },
              { country: 'China', rate: '~20%', high: false },
            ].map((d) => (
              <div key={d.country} className={`rounded-xl p-4 text-center border ${d.high ? 'bg-red-900/30 border-red-500/30' : 'bg-amber-900/20 border-amber-500/20'}`}>
                <div className={`text-2xl font-bold font-display ${d.high ? 'text-red-400' : 'text-amber-400'}`}>{d.rate}</div>
                <div className="text-white/80 text-sm font-semibold mt-1">{d.country}</div>
                <div className="text-white/40 text-xs mt-0.5">refusal rate</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-4">
            {[
              { label: 'SEVIS Fee', value: '$350', note: 'Non-refundable' },
              { label: 'Visa Application', value: '$185', note: 'Non-refundable' },
              { label: 'School Deposits', value: '$500–$3K', note: 'Varies by school' },
              { label: 'Time Lost', value: '12 months', note: 'To next intake' },
            ].map((c) => (
              <div key={c.label} className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-white/40 text-xs uppercase tracking-wider">{c.label}</div>
                <div className="text-white font-bold text-lg mt-1">{c.value}</div>
                <div className="text-red-400/80 text-xs mt-0.5">{c.note}</div>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm text-center mb-8">A single denial costs the average student <span className="text-red-400 font-semibold">$1,000–$3,500</span> and delays enrollment by a full academic year.</p>
          <div className="bg-teal/10 border border-teal/40 rounded-xl p-5 text-center max-w-2xl mx-auto">
            <p className="text-white font-semibold text-lg">Steadfast clients achieve an <span className="text-gold">89%*</span> approval rate — including in the highest-denial countries.</p>
            <p className="text-white/40 text-xs mt-2">* Based on client outcomes 2022–2025. Source: U.S. Dept. of State, Bureau of Consular Affairs (approximate nonimmigrant visa refusal rates).</p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label">Our Packages</div>
            <h2 className="section-title mt-2">The Right Level of Support for Your Goals</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We offer three tiers of service, designed to provide the exact level of guidance you need. Find the perfect fit or take our free assessment to get a personalized recommendation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <motion.div key={s.tier}
                className={`card relative overflow-hidden ${s.highlighted ? 'border-gold ring-2 ring-gold/50' : ''}`}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}
              >
                {s.highlighted && <div className="absolute top-0 right-0 bg-gold text-navy text-xs font-bold px-4 py-1 rounded-bl-lg">MOST POPULAR</div>}
                <div className={`${s.badge} mb-3`}>{s.tier}</div>
                <h3 className="font-display text-2xl font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-teal font-medium text-sm mb-4">{s.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2 text-sm mb-6">
                  {s.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-teal flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="btn-outline w-full justify-center text-sm py-2.5">Learn More <ArrowRight size={15} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-label">How It Works</div>
            <h2 className="section-title mt-2">Your 5-Step Path to a U.S. Campus</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.step} className="flex items-start gap-4 md:flex-col md:text-center">
                <div className="font-display text-4xl font-bold text-teal/20">{p.step}</div>
                <div className="md:mt-2">
                  <h3 className="font-semibold text-navy mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label">Success Stories</div>
            <h2 className="section-title mt-2">From "Denied" to "Admitted"</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We specialize in the cases other agencies turn away. Here’s what our students have to say.</p>
          </div>
          <AnimatePresence>
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} className="bg-navy-50/30 rounded-xl p-6 md:p-8 border border-gray-100" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 text-center">
                    <div className="w-20 h-20 bg-navy text-gold rounded-full flex flex-col items-center justify-center mx-auto">
                      <span className="text-3xl font-display">{t.stars}</span>
                      <span className="text-xs tracking-widest uppercase">STARS</span>
                    </div>
                    <div className="font-semibold text-navy text-sm mt-2">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.country}</div>
                  </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed italic border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">&ldquo;{t.text}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <p className="text-gray-400 text-xs text-center mt-8">* Individual experiences. Results are not typical or guaranteed. Visa outcomes depend on personal circumstances and consular officer discretion.</p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-teal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="mx-auto mb-4 text-white/60" size={36} />
          <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Start Your U.S. Study Journey?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Take our free 2-minute assessment and get matched with the right package — no commitment, no cost.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-white text-teal font-bold px-8 py-4 rounded-lg hover:bg-gold hover:text-navy transition-all duration-200 inline-flex items-center gap-2">
              Free Personal Assessment <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-all inline-flex items-center gap-2">
              Contact an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}