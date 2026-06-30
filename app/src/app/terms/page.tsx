import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Steadfast Student Services enrollment consulting platform.',
}

const LAST_UPDATED = 'June 30, 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="font-display text-3xl font-bold text-navy mb-2">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

          {/* Critical disclaimer box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
            <p className="text-amber-900 text-sm font-semibold mb-1">Important Notice — Not a Law Firm</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Steadfast Student Services is an educational consulting company, <strong>not a law firm</strong>. Our advisors are <strong>not licensed immigration attorneys or accredited representatives</strong>. We provide enrollment guidance, document preparation assistance, and educational information only. Nothing on this website or communicated by our staff or AI advisor constitutes legal advice. For immigration legal matters, please consult a licensed immigration attorney or an accredited representative recognized by the Board of Immigration Appeals (BIA).
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the Steadfast Student Services website and services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">2. Description of Services</h2>
              <p>Steadfast Student Services provides:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Visa risk assessment tools (educational, not legal assessments)</li>
                <li>Enrollment consulting and university selection guidance</li>
                <li>Document preparation assistance and review (not legal document drafting)</li>
                <li>Interview preparation coaching</li>
                <li>AI-powered enrollment advisor (Sofia) for general guidance</li>
                <li>Connection to partner universities and educational institutions</li>
              </ul>
              <p className="mt-3 font-semibold text-amber-700">Our services do not constitute immigration legal advice and do not create an attorney-client relationship.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">3. No Guarantee of Visa Outcome</h2>
              <p>Visa approval decisions are made solely by U.S. Citizenship and Immigration Services (USCIS), the U.S. Department of State, and individual consular officers. <strong>Steadfast Student Services cannot guarantee any visa approval, university admission, or enrollment outcome.</strong></p>
              <p className="mt-3">Our approval statistics (where cited) represent past client outcomes and are not a guarantee of future results. Individual outcomes depend on personal circumstances, officer discretion, and factors outside our control.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">4. Packages and Payment</h2>
              <p>Package pricing is discussed during your free consultation and confirmed in a written service agreement before any payment is collected. By purchasing a package, you agree to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Pay the agreed amount as specified in your service agreement</li>
                <li>Provide accurate and complete information required for your enrollment case</li>
                <li>Respond to advisor requests in a timely manner</li>
              </ul>
              <p className="mt-3"><strong>Refund Policy:</strong> Refund terms are specified in your individual service agreement. Generally, consulting fees are non-refundable once advisory sessions have commenced. Document review fees may be partially refundable if work has not begun. Contact your advisor within 7 days of payment if you have concerns.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">5. AI Advisor (Sofia)</h2>
              <p>Sofia is an AI-powered chatbot powered by Google Gemini. By chatting with Sofia, you understand and agree that:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Sofia is an artificial intelligence, not a human advisor</li>
                <li>Sofia's responses are informational only and do not constitute legal advice</li>
                <li>Your conversations may be reviewed by human advisors for quality assurance</li>
                <li>Your messages are processed by Google's AI systems (see our Privacy Policy)</li>
                <li>Sofia may make errors — always confirm important information with a licensed professional</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">6. Your Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide truthful, accurate information about your visa history, finances, and academic background</li>
                <li>Do not misrepresent your qualifications in any application document</li>
                <li>Understand that submission of false information to USCIS or U.S. embassies is a federal offense</li>
                <li>Comply with all applicable U.S. immigration laws and regulations</li>
                <li>You must be 16 years of age or older to use our services independently</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Steadfast Student Services shall not be liable for:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Visa denials or application rejections regardless of the reason</li>
                <li>University admission decisions</li>
                <li>Delays caused by government processing times</li>
                <li>Losses arising from reliance on information provided by Sofia or our advisors</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
              <p className="mt-3">Our total liability to you for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">8. Intellectual Property</h2>
              <p>All content on this website — including text, assessment tools, graphics, and the Sofia AI system — is the property of Steadfast Student Services and protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">9. Privacy</h2>
              <p>Your use of our services is also governed by our <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">10. Governing Law</h2>
              <p>These Terms are governed by the laws of the United States. Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules, except where prohibited by applicable law.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">11. Changes to Terms</h2>
              <p>We may update these Terms at any time. Material changes will be communicated via email or website notice. Continued use of our services after the effective date of changes constitutes acceptance.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">12. Contact</h2>
              <p>
                <strong>Steadfast Student Services</strong><br />
                Email: <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal hover:underline">advisors@steadfaststudentservices.com</a>
              </p>
            </section>

          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <Link href="/" className="text-teal text-sm hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
