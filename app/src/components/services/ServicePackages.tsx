 'use client'

import { CheckCircle, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

type Tier = 'low' | 'moderate' | 'high'

const TIERS = [
  {
    id: 'low' as Tier,
    label: 'Standard',
    title: 'Standard Package',
    flyerUrl: '/flyers/Flyer_Standard_Package.html',
    tagline: 'Even a strong profile can be denied on a technicality.',
    description: "Most denials happen to qualified students. One missing document, one wrong financial format, one unprepared interview answer — and the application is rejected. Standard provides the expert document review and preparation that catches every gap before the consulate sees it.",
    features: [
      'Comprehensive document review & checklist',
      'University and program selection guidance',
      'Application essay proofreading',
      'Visa interview preparation tips',
      'Email advisor support',
    ],
    badgeClass: 'badge-low',
    borderColor: 'border-green-200 bg-green-50',
  },
  {
    id: 'moderate' as Tier,
    label: 'Premium',
    title: 'Premium Package',
    flyerUrl: '/flyers/Flyer_Premium_Package.html',
    tagline: 'The difference between approved and denied is almost always preparation.',
    description: "Your profile is competitive — but so are hundreds of others from your country. Premium closes the gap with financial document coaching, two realistic mock visa interviews, and a dedicated advisor who knows what your specific consular post looks for.",
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
    flyerUrl: '/flyers/Flyer_Elite_Package.html',
    tagline: 'High-denial profiles need a custom strategy, not a checklist.',
    description: "Generic preparation does not win when refusal rates exceed 50%. Elite builds a case-by-case strategy that anticipates the exact objections your consulate will raise — financial narrative, home-tie framing, and embassy-specific coaching from our most experienced team.",
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
          <h2 className="section-title mt-2 mb-3">Don&apos;t Know Your Risk Level?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your country&apos;s denial rate, financial documentation strength, and visa history all affect your outcome. Our 2-minute assessment weighs every factor and tells you exactly which tier gives you the best chance of approval.
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
                        href={tier.flyerUrl}
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
