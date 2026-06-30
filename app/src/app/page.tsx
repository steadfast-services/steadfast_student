'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Users, TrendingUp, CheckCircle, Globe, Award, BookOpen } from 'lucide-react'

const STATS = [
  { value: '2,400+', label: 'Students Enrolled', icon: Users },
  { value: '89%*', label: 'Visa Approval Rate', icon: Shield },
  { value: '47', label: 'Partner Universities', icon: Award },
  { value: '68', label: 'Countries Served', icon: Globe },
]

const SERVICES = [
  {
    tier: 'Standard',
    badge: 'badge-low',
    color: 'border-green-200',
    accent: 'bg-green-50',
    title: 'Standard Package',
    subtitle: 'For self-guided students who need an expert review.',
    description: 'Essential support for confident applicants who need a professional review of their documents and a clear checklist to follow.',
    features: ['Document review & checklist', 'School selection guidance', 'Application proofreading', 'Visa interview tips', 'Portal access'],
  },
  {
    tier: 'Premium',
    badge: 'badge-moderate',
    color: 'border-amber-200',
    accent: 'bg-amber-50',
    title: 'Premium Package',
    subtitle: 'Comprehensive guidance for a competitive edge.',
    description: 'Our most popular package offers end-to-end support, from financial coaching to mock visa interviews, ensuring you are fully prepared.',
    features: ['Everything in Standard', 'Financial document strategy', 'SOP expert coaching', 'Mock visa interview', 'Post-denial re-application', 'Dedicated advisor'],
    highlighted: true,
  },
  {
    tier: 'Elite',
    badge: 'badge-high',
    color: 'border-red-200',
    accent: 'bg-red-50',
    title: 'Elite Package',
    subtitle: 'Intensive, personalized support for complex cases.',
    description: 'Our highest level of service, providing unlimited access and a custom strategy for students who want our most dedicated and hands-on support.',
    features: ['Everything in Premium', 'Case-by-case strategy', 'Legal documentation review', 'Embassy-specific coaching', 'Unlimited consultations', 'Priority support line'],
  },
]

const TESTIMONIALS = [
  { name: 'Adaeze O.', country: 'Nigeria', program: 'MBA, Michigan Ross', text: 'I was told by another agency that my chances were too low. Steadfast built a strategy that got me approved. I am now studying in Ann Arbor!', stars: 5 },
  { name: 'Rajiv M.', country: 'India', program: 'MS Computer Science, UT Austin', text: 'The Portal made document submission so easy. My advisor responded within hours every time. Worth every penny.', stars: 5 },
  { name: 'Yuki T.', country: 'Japan', program: 'BS Business, USC', text: 'Super smooth process. I did not realize how many forms were involved — having a team handle everything was a relief.', stars: 5 },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Free Assessment', desc: 'Take our 2-minute quiz. We analyze your unique profile to recommend the right level of support.' },
  { step: '02', title: 'Free Consultation', desc: 'A senior advisor reviews your profile and builds a personalized enrollment strategy — tailored to your specific situation.' },
  { step: '03', title: 'Guided Application', desc: 'We manage your document checklist, application submissions, and follow-ups through your secure student portal.' },
  { step: '04', title: 'Visa Preparation', desc: 'Mock interviews, financial document coaching, and embassy-specific tips based on your country and consulate.' },
  { step: '05', title: 'Arrival & Beyond', desc: 'Post-arrival support, OPT/CPT guidance, and a community of Steadfast alumni in your city.' },
]

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="gradient-hero text-white min-h-[92vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-teal blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                Trusted by 2,400+ International Students
              </span>
            </motion.div>
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Path to a<br /><span className="text-gold">U.S. University</span><br />Starts Here
            </motion.h1>
            <motion.p
              className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              Expert enrollment consulting for international students from every country — even the most challenging cases. We turn visa obstacles into acceptance letters.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
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
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gold py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <motion.div key={s.label} className="text-center" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} viewport={{ once: true }}>
                <s.icon className="mx-auto mb-2 text-navy/60" size={22} />
                <div className="font-display text-3xl font-bold text-navy">{s.value}</div>
                <div className="text-navy/70 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-navy/50 text-xs mt-4">* Based on client outcomes 2022–2025. Individual results vary and are not guaranteed.</p>
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
              <motion.div
                key={s.tier}
                className={`card border-2 ${s.color} relative ${s.highlighted ? 'ring-2 ring-teal ring-offset-4' : ''}`}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              >
                {s.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                <div className={`inline-block ${s.badge} mb-3`}>{s.tier}</div>
                <h3 className="font-display text-2xl font-bold text-navy mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{s.subtitle}</p>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-teal flex-shrink-0" /> {f}
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
      <section className="py-24 bg-navy-50 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label text-gold">How It Works</div>
            <h2 className="section-title text-white mt-2">Your Journey in 5 Steps</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.step} className="text-center" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center font-display text-navy font-bold text-lg mx-auto mb-4">{step.step}</div>
                <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/assessment" className="btn-primary">Start with Free Assessment <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label">Success Stories</div>
            <h2 className="section-title mt-2">Students Who Made It</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} className="card" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={16} className="text-gold fill-gold" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.country} · {t.program}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-8">* Individual results vary. Visa approval depends on personal circumstances and consular officer discretion. Not guaranteed.</p>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
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
    </>
  )
}
