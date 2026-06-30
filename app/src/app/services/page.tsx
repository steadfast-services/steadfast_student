import type { Metadata } from 'next'
import Link from 'next/link'
import ServicePackages from '@/components/services/CountryPackages'

export const metadata: Metadata = {
  title: 'Our Packages',
  description: 'Standard, Premium, and Elite enrollment packages for international students applying to U.S. universities. Choose the level of support that matches your visa risk profile.',
  openGraph: {
    title: 'Enrollment Packages — Steadfast Student Services',
    description: 'Three tiers of expert support for every risk profile. Document review, SOP coaching, mock visa interviews, and unlimited consultation.',
    url: '/services',
  },
}

const FAQ = [
  { q: 'How do you determine which package I need?', a: 'The best way is to take our free 2-minute assessment. It analyzes your unique profile and recommends the package that provides the right level of support for your goals. You can also book a free consultation to discuss your options.' },
  { q: 'Do you guarantee visa approval?', a: 'No ethical consultant can legally guarantee visa outcomes — the decision rests with the consular officer. What we guarantee is a comprehensive, well-prepared application that maximizes your chances.' },
  { q: 'Can I upgrade my package later?', a: 'Absolutely. If your situation changes or you need additional support, you can upgrade at any point in the process.' },
  { q: 'How do I see pricing?', a: 'Pricing is discussed during your free 30-minute consultation, where we review your specific situation. We keep pricing private to ensure every student gets a fair, personalized quote.' },
  { q: 'Do you work with community colleges?', a: 'Yes. We have direct partnerships with both universities and community colleges, and we have helped hundreds of students use community college as a pathway to a 4-year degree.' },
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
          <h1 className="font-display text-5xl font-bold mt-3 mb-5">The Right Support for Your Journey</h1>
          <p className="text-white/75 text-lg">
            Every student's path is unique. We've designed three tiers of service to provide the exact level of support you need to succeed.
            Not sure where to start? Take our free assessment for a personalized recommendation.
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
