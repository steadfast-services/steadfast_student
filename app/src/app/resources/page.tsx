import type { Metadata } from 'next'
import Link from 'next/link'
import { Download } from 'lucide-react'
import Post1 from '@/components/resources/Post1_VisaInterview'
import Post2 from '@/components/resources/Post2_FinancialDocs'
import Post3 from '@/components/resources/Post3_CommunityCollege'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Free articles, guides, and checklists for international students applying to U.S. universities. Learn about F-1 visa interviews, financial documents, and more.',
  openGraph: {
    title: 'Free Resources for International Students — Steadfast',
    description: 'Expert guides on navigating the U.S. university application and visa process.',
    url: '/resources',
  },
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-gold">Free Resources</div>
          <h1 className="font-display text-5xl font-bold mt-3 mb-5">Knowledge to Empower Your Journey</h1>
          <p className="text-white/75 text-lg">
            We believe in transparency. These guides are designed to give you the honest, actionable advice you need to succeed.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Articles</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Insights from our advisors on the most critical parts of the application process.</p>
          </div>
          <div className="space-y-8">
            <Post1 />
            <Post2 />
            <Post3 />
          </div>
        </div>
      </section>
    </div>
  )
}