'use client'

import { CheckCircle, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

type Tier = 'low' | 'moderate' | 'high'

const TIERS = [
  {
    id: 'low' as Tier,
    label: 'Standard',
    title: 'Standard Package',
    tagline: 'For self-guided students who need an expert review.',
    description: "Essential support for confident applicants who need a professional review of their documents and a clear checklist to follow. We'll ensure your application is polished and complete.",
    features: [
      'Comprehensive document review & checklist',
      'University and program selection guidance',
      'Application essay proofreading',
      'Visa interview preparation tips',
      'Deadline tracking and reminders',
      'Secure student portal access',
      'Email advisor support',
    ],
    badgeClass: 'badge-low',
    borderColor: 'border-green-200 bg-green-50',
  },
  {
    id: 'moderate' as Tier,
    label: 'Premium',
    title: 'Premium Package',
    tagline: 'Comprehensive guidance for a competitive edge.',
    description: "Our most popular package offers end-to-end support. We'll help you craft a compelling narrative, from financial coaching to mock visa interviews, ensuring you are fully prepared for every step.",
    features: [
      'Everything in Standard',
      'Financial document strategy session',
      'Statement of Purpose (SOP) expert coaching',
      'Mock visa interview (2 sessions)',
      'Post-denial re-application strategy',
      'Dedicated personal advisor',
      'Priority email & chat support',
      'Application status tracking portal',
    ],
    badgeClass: 'badge-moderate',
    borderColor: 'border-amber-200 bg-amber-50',
    popular: true,
  },
  {
    id: 'high' as Tier,
    label: 'Elite',
    title: 'Elite Package',
    tagline: 'Intensive, personalized support for complex cases.',
    description: "Our highest level of service, providing unlimited access and a custom strategy for students who want our most dedicated and hands-on support. This is for applicants who want to leave nothing to chance.",
    features: [
      'Everything in Premium',
      'Case-by-case custom visa strategy',
      'Legal documentation review',
      'Embassy-specific consular officer coaching',
      'Financial narrative framing (not just documents)',
      'Unlimited consultation sessions',
      'Priority direct advisor phone line',
      'Post-arrival and OPT/CPT guidance',
    ],
    badgeClass: 'badge-high',
    borderColor: 'border-red-200 bg-red-50',
  },
]

export default function ServicePackages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Country Selector */}
        <div className="max-w-lg mx-auto mb-16 text-center">
          <div className="section-label">Find Your Package</div>
          <h2 className="section-title mt-2 mb-3">Not Sure Which Package Is Right?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Take our free, 2-minute assessment. We’ll analyze your answers and recommend the perfect package for your individual needs.
          </p>
          <Link href="/assessment" className="btn-primary">
            Take the Free Assessment <ArrowRight size={16} />
          </Link>
        </div>

        {/* Package Cards */}
        <div className="space-y-12">
          {TIERS.map((tier) => {
            return (
              <div
                key={tier.id}
                id={tier.id}
                className={`rounded-2xl border-2 p-8 md:p-10 relative transition-all duration-300 ${tier.borderColor}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-8 bg-teal text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <div className={`${tier.badgeClass} mb-3`}>{tier.label}</div>
                    <h2 className="font-display text-3xl font-bold text-navy mb-2">{tier.title}</h2>
                    <p className="text-teal font-medium text-sm mb-4">{tier.tagline}</p>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">{tier.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/book" className="btn-primary text-sm py-2.5">
                        Book a Free Consultation <ArrowRight size={15} />
                      </Link>
                      <a
                        href={`/flyers/${tier.id}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-navy hover:text-navy transition-colors"
                      >
                        <Download size={14} /> Download Flyer
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-3 uppercase tracking-wider">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle size={15} className="text-teal flex-shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
