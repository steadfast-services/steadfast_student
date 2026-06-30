import type { Metadata } from 'next'
import { Shield, Users, Globe, Award, TrendingUp, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Steadfast Student Services was built for students told their case was too complex. We specialize in high-risk visa profiles and have helped 2,400+ students enroll in U.S. universities.',
  openGraph: {
    title: 'About Steadfast Student Services',
    description: 'Our founders were the students told "it\'s too complicated." Now we fight for every complex case others turn away.',
    url: '/about',
  },
}

const VALUES = [
  { icon: Shield, title: 'Integrity First', desc: 'We never overpromise. Every student receives an honest, data-informed assessment of their profile — and a real strategy to improve it.' },
  { icon: Heart, title: 'Student-Centered', desc: 'Your success is our success. We measure performance by visa approvals and enrollment completions, not billable hours.' },
  { icon: Globe, title: 'No Student Left Behind', desc: 'We serve students from all 195 countries — including the most challenging. Especially those.' },
  { icon: TrendingUp, title: 'Data-Driven Strategy', desc: 'Every recommendation is backed by real visa denial data, consular trends, and institutional acceptance patterns.' },
]

const STATS = [
  { value: '2,400+', label: 'Students Successfully Enrolled' },
  { value: '89%*', label: 'Overall Visa Approval Rate' },
  { value: '68', label: 'Countries Served' },
  { value: '47', label: 'Partner Universities' },
  { value: '7', label: 'Aggregator Platform Partnerships' },
  { value: '5+', label: 'Years of Expertise' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-label text-gold mb-4">About Us</div>
          <h1 className="font-display text-5xl font-bold mb-6">We Built Steadfast<br />for the Student Who Was Told<br /><span className="text-gold">&ldquo;No.&rdquo;</span></h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Steadfast Student Services was founded on a simple belief: every motivated student deserves a fair shot at a U.S. education, and the application process shouldn't be a barrier.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-title mt-2 mb-5">Born from a Personal Experience</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Our founders watched talented friends and family members — people with strong grades, real drive, and every intention of returning home — lose $1,000 or more in non-refundable fees and a full year of their lives to visa denials. Not because they were unqualified. Because no one explained that bank statement formatting matters to a consular officer. Because no one told them the interview is about home-country ties, not grades. Because the system is designed to find reasons to say no — and without the right guidance, most students are guessing.</p>
              <p className="text-gray-600 leading-relaxed mb-4">They discovered something important: most of those "rejected" cases were winnable. The denial was not a verdict on the student — it was a verdict on the preparation. With the right documentation strategy, financial narrative framing, and interview coaching, case after case that looked impossible became approved.</p>
              <p className="text-gray-600 leading-relaxed">Steadfast was built to be the insider advantage every international student deserves — the advisor who knows the system from the inside, who has seen exactly what consular officers look for, and who fights for every single case.</p>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="font-display text-2xl font-bold mb-5 text-gold">What Makes Us Different</h3>
              <ul className="space-y-3 text-white/80 text-sm leading-relaxed">
                <li className="flex gap-3"><span className="text-gold">✓</span> We specialize in complex cases — many agencies turn them away</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> AI-powered assessment gives you instant clarity</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Direct MOU partnerships with 22+ universities and colleges</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> Commission partnerships with 7 global aggregator platforms</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> We never expose our full strategy — protecting our edge and yours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-label">By the Numbers</div>
            <h2 className="section-title mt-2">Results Speak Louder</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="font-display text-4xl font-bold text-teal">{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-6">* Based on Steadfast client outcomes 2022–2025. Individual results vary. Visa approvals depend on personal circumstances and are not guaranteed.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="section-label">Our Values</div>
            <h2 className="section-title mt-2">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-teal" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center px-4">
        <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">Join 2,400+ students who trusted Steadfast to navigate their path to a U.S. degree.</p>
        <Link href="/assessment" className="btn-primary">Take the Free Assessment</Link>
      </section>
    </div>
  )
}
