import type { Metadata } from 'next'
import Link from 'next/link'
import ServicePackages from '@/components/services/ServicePackages'

export const metadata: Metadata = {
  title: 'Our Packages',
  description: 'Standard, Premium, and Elite enrollment packages for international students applying to U.S. universities. Choose the level of support that matches your unique profile.',
  openGraph: {
    title: 'Enrollment Packages — Steadfast Student Services',
    description: 'Three tiers of expert support for every student profile. Document review, SOP coaching, mock visa interviews, and unlimited consultation.',
    url: '/services',
  },
}

const FAQ = [
  { q: 'How do you determine which package I need?', a: 'Four factors drive the recommendation: your country\'s visa refusal rate, your financial documentation strength, your academic profile, and your prior visa history. The clearest path is our free 2-minute assessment — it weighs all four and gives you a specific package recommendation. You can also talk through it directly in a free consultation.' },
  { q: 'Do you guarantee visa approval?', a: 'No ethical consultant can legally guarantee visa outcomes — the decision rests with the consular officer. What we guarantee is a comprehensive, well-prepared application that maximizes your chances.' },
  { q: 'Can I upgrade my package later?', a: 'Yes. Many students upgrade after learning what their specific consular post looks for. That said, preparation time is the one asset you cannot buy back — starting at the right level early is almost always more effective than upgrading later under deadline pressure.' },
  { q: 'How do I see pricing?', a: 'Pricing is discussed during your free 30-minute consultation, where we review your specific situation. We keep pricing private to ensure every student gets a fair, personalized quote.' },
  { q: 'Do you work with community colleges?', a: 'Yes — and for students with borderline academic profiles, community college is often the stronger strategic choice. Lower admission thresholds, direct transfer pathways to 4-year universities, and F-1 visa interviews that tend to be less scrutinized. Our advisors will tell you honestly when this path gives you a better shot than going direct to a 4-year school.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-gold">Our Services</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">A Denied Visa Costs $1,000+ and 12 Months of Your Life. The Right Preparation Costs Neither.</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            SEVIS fees, application fees, and school deposits are non-refundable. So is the year you spend waiting for the next intake cycle. The three packages below represent three levels of preparation — and three very different outcomes.
          </p>
        </div>
      </section>

      <ServicePackages />

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
