import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Steadfast Student Services collects, uses, and protects your personal information.',
}

const LAST_UPDATED = 'June 30, 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="font-display text-3xl font-bold text-navy mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">1. Who We Are</h2>
              <p>Steadfast Student Services ("Steadfast," "we," "us," or "our") is a U.S.-based international student enrollment consulting company. We are not a law firm and do not provide legal advice. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website at <strong>steadfaststudentservices.com</strong> and related services.</p>
              <p className="mt-3">Contact: <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal hover:underline">advisors@steadfaststudentservices.com</a></p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">2. Information We Collect</h2>
              <p>We collect the following categories of personal information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Identity data:</strong> Full name, country of origin, nationality</li>
                <li><strong>Contact data:</strong> Email address, WhatsApp/phone number</li>
                <li><strong>Profile data:</strong> Academic history, GPA, target programs and universities</li>
                <li><strong>Visa history:</strong> Prior U.S. visa application history, denial records (voluntarily disclosed)</li>
                <li><strong>Financial indicators:</strong> General financial readiness (no bank account numbers collected)</li>
                <li><strong>Assessment data:</strong> Answers to our free visa risk assessment quiz</li>
                <li><strong>Chat data:</strong> Conversations with our AI advisor Sofia</li>
                <li><strong>Technical data:</strong> IP address, browser type, session storage identifiers</li>
                <li><strong>Payment data:</strong> Payment is processed by Stripe. We do not store card numbers.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide enrollment consulting and advisor matching services</li>
                <li>To send your visa risk assessment results by email</li>
                <li>To send booking confirmations and appointment reminders</li>
                <li>To send educational content and service updates (you may opt out at any time)</li>
                <li>To notify our advisors of new inquiries so they can follow up with you</li>
                <li>To improve our AI advisor (Sofia) and assessment tools</li>
                <li>To comply with applicable laws and prevent fraud</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">4. Third-Party Service Providers</h2>
              <p>We share your information only with trusted service providers who process data on our behalf:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Supabase</strong> — database and file storage (your leads, assessment results, and documents)</li>
                <li><strong>Google Gemini</strong> — powers our AI advisor Sofia (your chat messages are sent to Google for AI processing)</li>
                <li><strong>Resend</strong> — email delivery service</li>
                <li><strong>Twilio</strong> — WhatsApp messaging</li>
                <li><strong>Stripe</strong> — payment processing (PCI DSS compliant)</li>
                <li><strong>Cal.com</strong> — appointment scheduling</li>
                <li><strong>Vercel</strong> — web hosting</li>
              </ul>
              <p className="mt-3">Each provider is bound by their own privacy policies and data processing agreements.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">5. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Assessment data:</strong> Retained for 24 months or until you request deletion</li>
                <li><strong>Chat history (WhatsApp):</strong> Retained for 12 months</li>
                <li><strong>Lead/contact records:</strong> Retained for 36 months from last contact</li>
                <li><strong>Document uploads:</strong> Retained for the duration of your active enrollment case, then 12 months</li>
                <li><strong>Payment records:</strong> Retained for 7 years (legal/tax requirement)</li>
              </ul>
              <p className="mt-3">To request early deletion of your data, email <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal hover:underline">advisors@steadfaststudentservices.com</a>.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Ask us to correct inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Opt-out of marketing:</strong> Unsubscribe from emails at any time using the unsubscribe link in every email we send, or by emailing us</li>
                <li><strong>Withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
              </ul>
              <p className="mt-3">To exercise any right, email <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal hover:underline">advisors@steadfaststudentservices.com</a>. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">7. Cookies and Tracking</h2>
              <p>Our website uses the following:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Session storage:</strong> Used to remember if you have opened our chat widget (cleared when you close your browser)</li>
                <li><strong>Functional cookies:</strong> Set by third-party services (Stripe, Cal.com) for their functionality</li>
              </ul>
              <p className="mt-3">We do not use analytics or advertising tracking cookies. You can disable cookies in your browser settings.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">8. AI Advisor Disclosure</h2>
              <p>Sofia, our enrollment advisor chatbot, is powered by artificial intelligence (Google Gemini). Your conversations with Sofia are processed by Google's AI systems. Sofia is not a licensed attorney and does not provide legal advice. Conversations may be reviewed by our human advisors for quality purposes.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">9. Children's Privacy</h2>
              <p>Our services are intended for individuals 16 years of age and older. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected data from a minor, please contact us for immediate deletion.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">10. International Data Transfers</h2>
              <p>Your data may be transferred to and processed in the United States and other countries where our service providers operate. By using our services, you consent to this transfer. We take steps to ensure adequate protection for all cross-border transfers.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by prominently posting a notice on our website. Your continued use of our services after the effective date constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">12. Contact Us</h2>
              <p>For privacy-related requests or questions:</p>
              <p className="mt-2">
                <strong>Steadfast Student Services</strong><br />
                Email: <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal hover:underline">advisors@steadfaststudentservices.com</a><br />
                United States
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
