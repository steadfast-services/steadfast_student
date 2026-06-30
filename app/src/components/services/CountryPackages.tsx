'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Download, ChevronDown } from 'lucide-react'
import Link from 'next/link'

type Tier = 'low' | 'moderate' | 'high'

const COUNTRIES = [
  { name: 'Afghanistan', rate: 78 },
  { name: 'Australia', rate: 12 },
  { name: 'Bangladesh', rate: 54 },
  { name: 'Bolivia', rate: 46 },
  { name: 'Brazil', rate: 22 },
  { name: 'Cameroon', rate: 68 },
  { name: 'Canada', rate: 10 },
  { name: 'China', rate: 38 },
  { name: 'Colombia', rate: 38 },
  { name: 'Cuba', rate: 64 },
  { name: 'Denmark', rate: 5 },
  { name: 'Dominican Republic', rate: 39 },
  { name: 'Ecuador', rate: 43 },
  { name: 'Egypt', rate: 44 },
  { name: 'France', rate: 7 },
  { name: 'Germany', rate: 5 },
  { name: 'Ghana', rate: 65 },
  { name: 'Haiti', rate: 66 },
  { name: 'India', rate: 40 },
  { name: 'Indonesia', rate: 45 },
  { name: 'Iran', rate: 75 },
  { name: 'Ireland', rate: 6 },
  { name: 'Italy', rate: 6 },
  { name: 'Japan', rate: 8 },
  { name: 'Libya', rate: 70 },
  { name: 'Mali', rate: 72 },
  { name: 'Mexico', rate: 28 },
  { name: 'Morocco', rate: 47 },
  { name: 'Nepal', rate: 52 },
  { name: 'Netherlands', rate: 4 },
  { name: 'New Zealand', rate: 13 },
  { name: 'Nigeria', rate: 62 },
  { name: 'Norway', rate: 4 },
  { name: 'Pakistan', rate: 58 },
  { name: 'Paraguay', rate: 44 },
  { name: 'Peru', rate: 41 },
  { name: 'Philippines', rate: 42 },
  { name: 'Senegal', rate: 67 },
  { name: 'Singapore', rate: 11 },
  { name: 'Somalia', rate: 80 },
  { name: 'South Korea', rate: 15 },
  { name: 'Spain', rate: 9 },
  { name: 'Sri Lanka', rate: 48 },
  { name: 'Sudan', rate: 73 },
  { name: 'Sweden', rate: 5 },
  { name: 'Switzerland', rate: 5 },
  { name: 'Thailand', rate: 36 },
  { name: 'United Kingdom', rate: 2 },
  { name: 'Venezuela', rate: 61 },
  { name: 'Vietnam', rate: 48 },
  { name: 'Yemen', rate: 76 },
]

function getTier(rate: number): Tier {
  if (rate <= 35) return 'low'
  if (rate <= 55) return 'moderate'
  return 'high'
}

const TIERS = [
  {
    id: 'low' as Tier,
    label: 'Low Risk',
    denialRate: '≤35%',
    title: 'Standard Package',
    tagline: 'Streamlined support for students from high-approval countries.',
    description: "Students from low-risk countries have a strong baseline — we help you leverage it to the fullest. Our Standard Package covers everything you need to submit a competitive application and ace your visa interview without paying for support you don't need.",
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
    ringColor: 'ring-green-400',
    recommendedBg: 'bg-green-600',
  },
  {
    id: 'moderate' as Tier,
    label: 'Moderate Risk',
    denialRate: '35–55%',
    title: 'Premium Package',
    tagline: 'Comprehensive support to stand out in a competitive consular environment.',
    description: "Students from moderate-risk countries face additional scrutiny — strong financials, a compelling SOP, and mock interview practice are no longer optional. Our Premium Package gives you the tools and coaching to clear every hurdle.",
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
    ringColor: 'ring-amber-400',
    recommendedBg: 'bg-amber-500',
    popular: true,
  },
  {
    id: 'high' as Tier,
    label: 'High Risk',
    denialRate: '>55%',
    title: 'Elite Package',
    tagline: 'Our most powerful service — purpose-built for the toughest cases.',
    description: 'We believe every student, regardless of their home country, deserves a chance. The Elite Package is our signature high-touch service that has helped students from the most challenging countries achieve their U.S. education dreams.',
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
    ringColor: 'ring-red-400',
    recommendedBg: 'bg-red-600',
  },
]

export default function CountryPackages() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedRate, setSelectedRate] = useState<number | null>(null)

  const recommendedTier: Tier | null = selectedRate !== null ? getTier(selectedRate) : null

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSelectedCountry(val)
    if (val === 'other') {
      setSelectedRate(45)
    } else {
      const country = COUNTRIES.find(c => c.name === val)
      setSelectedRate(country?.rate ?? null)
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Country Selector */}
        <div className="max-w-lg mx-auto mb-16 text-center">
          <div className="section-label">Find Your Package</div>
          <h2 className="section-title mt-2 mb-3">Select Your Country</h2>
          <p className="text-gray-500 text-sm mb-6">
            We&apos;ll instantly show the right service tier and a downloadable flyer for your situation.
          </p>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={handleChange}
              className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-5 py-4 text-base font-medium text-navy focus:outline-none focus:border-teal cursor-pointer shadow-sm"
            >
              <option value="">— Choose your country —</option>
              {COUNTRIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
              <option value="other">Other / Not Listed</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {recommendedTier && (
            <div className={`mt-4 rounded-xl p-4 text-white ${TIERS.find(t => t.id === recommendedTier)?.recommendedBg}`}>
              <p className="font-semibold text-sm">
                Based on {selectedCountry === 'other' ? 'your country' : selectedCountry}, we recommend the{' '}
                <strong>{TIERS.find(t => t.id === recommendedTier)?.title}</strong>
              </p>
              <p className="text-xs opacity-80 mt-1">
                Visa denial rate: ~{selectedRate}% — {TIERS.find(t => t.id === recommendedTier)?.label} category
              </p>
            </div>
          )}
        </div>

        {/* Package Cards */}
        <div className="space-y-12">
          {TIERS.map((tier) => {
            const isRecommended = recommendedTier === tier.id
            const isDimmed = recommendedTier !== null && !isRecommended

            return (
              <div
                key={tier.id}
                id={tier.id}
                className={`rounded-2xl border-2 p-8 md:p-10 relative transition-all duration-300 ${
                  isRecommended
                    ? `${tier.borderColor} ring-4 ring-offset-2 ${tier.ringColor} shadow-xl scale-[1.01]`
                    : isDimmed
                    ? 'border-gray-100 bg-gray-50 opacity-50'
                    : tier.borderColor
                }`}
              >
                {isRecommended && (
                  <div className={`absolute -top-3 left-8 ${tier.recommendedBg} text-white text-xs font-bold px-4 py-1 rounded-full`}>
                    ★ RECOMMENDED FOR YOU
                  </div>
                )}
                {tier.popular && !recommendedTier && (
                  <div className="absolute -top-3 left-8 bg-teal text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <div className={`${tier.badgeClass} mb-3`}>
                      {tier.label} · Denial Rate {tier.denialRate}
                    </div>
                    <h2 className="font-display text-3xl font-bold text-navy mb-2">{tier.title}</h2>
                    <p className="text-teal font-medium text-sm mb-4">{tier.tagline}</p>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">{tier.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/assessment" className="btn-outline text-sm py-2.5">
                        Get Free Assessment <ArrowRight size={15} />
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
