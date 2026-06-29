import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const TIERS = [
  {
    id: 'low',
    tier: 'Low Risk',
    badgeClass: 'badge-low',
    countries: 'United Kingdom, Germany, Japan, South Korea, Brazil, Mexico, France, Australia, Canada, Italy, Spain, and more',
    denialRate: '≤35%',
    title: 'Standard Package',
    tagline: 'Streamlined support for students from high-approval countries.',
    description: 'Students from low-risk countries have a strong baseline — we help you leverage it to the fullest. Our Standard Package covers everything you need to submit a competitive application and ace your visa interview without paying for support you don\'t need.',
    features: [
      'Comprehensive document review & checklist',
      'University and program selection guidance',
      'Application essay proofreading',
      'Visa interview preparation tips',
      'Deadline tracking and reminders',
      'Secure student portal access',
      'Email advisor support',
    ],
    cta: 'Start with Free Assessment',
    color: 'border-green-200 bg-green-50',
    highlight: 'green',
  },
  {
    id: 'moderate',
    tier: 'Moderate Risk',
    badgeClass: 'badge-moderate',
    countries: 'India, China, Philippines, Vietnam, Indonesia, Thailand, Egypt, Morocco, Colombia, Peru, Sri Lanka, Nepal, and more',
    denialRate: '35–55%',
    title: 'Premium Package',
    tagline: 'Comprehensive support to stand out in a competitive consular environment.',
    description: 'Students from moderate-risk countries face additional scrutiny — strong financials, a compelling SOP, and mock interview practice are no longer optional, they are essential. Our Premium Package gives you the tools and coaching to clear every hurdle.',
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
    cta: 'Start with Free Assessment',
    color: 'border-amber-200 bg-amber-50',
    highlight: 'amber',
    popular: true,
  },
  {
    id: 'high',
    tier: 'High Risk',
    badgeClass: 'badge-high',
    countries: 'Nigeria, Pakistan, Ghana, Cameroon, Senegal, Haiti, Cuba, Venezuela, Iran, Sudan, Yemen, and more',
    denialRate: '>55%',
    title: 'Elite Package',
    tagline: 'Our most powerful service — purpose-built for the toughest cases.',
    description: 'We believe every student, regardless of their home country, deserves a chance. The Elite Package is our signature high-touch service that has helped students from the most challenging countries achieve their U.S. education dreams. We go all in.',
    features: [
      'Everything in Premium',
      'Case-by-case custom visa strategy',
      'Legal documentation review',
      'Embassy-specific and consular officer coaching',
      'Financial narrative framing (not just documents)',
      'Unlimited consultation sessions',
      'Priority direct advisor phone line',
      'Post-arrival and OPT/CPT guidance',
    ],
    cta: 'Start with Free Assessment',
    color: 'border-red-200 bg-red-50',
    highlight: 'red',
  },
]

const FAQ = [
  { q: 'How do you determine which package I need?', a: 'Our free 2-minute risk assessment evaluates your country of origin, GPA, financial strength, and visa history to recommend the right package. You can also book a free consultation.' },
  { q: 'Do you guarantee visa approval?', a: 'No ethical consultant can legally guarantee visa outcomes — the decision rests with the consular officer. What we guarantee is a comprehensive, well-prepared application that maximizes your chances.' },
  { q: 'Can I upgrade my package later?', a: 'Absolutely. If your situation changes or you need additional support, you can upgrade at any point in the process.' },
  { q: 'How do I see pricing?', a: 'Pricing is discussed during your free 30-minute consultation, where we review your specific situation. We keep pricing private to ensure every student gets a fair, personalized quote.' },
  { q: 'Do you work with community colleges?', a: 'Yes. We have direct partnerships with both universities and community colleges, and we have helped hundreds of students use community college as a pathway to a 4-year degree.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-gold">Our Services</div>
          <h1 className="font-display text-5xl font-bold mt-3 mb-5">Three Tiers, One Mission</h1>
          <p className="text-white/75 text-lg">Every student is different. Every case is unique. Our three service packages ensure you get exactly the level of support your situation demands.</p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          {TIERS.map((tier) => (
            <div key={tier.id} id={tier.id} className={`rounded-2xl border-2 ${tier.color} p-8 md:p-10 relative`}>
              {tier.popular && <div className="absolute -top-3 left-8 bg-teal text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className={tier.badgeClass + ' mb-3'}>{tier.tier} · Denial Rate {tier.denialRate}</div>
                  <h2 className="font-display text-3xl font-bold text-navy mb-2">{tier.title}</h2>
                  <p className="text-teal font-medium text-sm mb-4">{tier.tagline}</p>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">{tier.description}</p>
                  <p className="text-xs text-gray-400"><span className="font-semibold text-gray-500">Example countries:</span> {tier.countries}</p>
                  <div className="mt-6">
                    <Link href="/assessment" className="btn-outline text-sm py-2.5">
                      {tier.cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-navy text-sm mb-3 uppercase tracking-wider">What&apos;s Included</h4>
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
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-label">FAQ</div>
            <h2 className="section-title mt-2">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-navy mb-2 text-sm">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">Still have questions? Chat with Sofia or book a free call.</p>
            <Link href="/book" className="btn-primary">Book Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
