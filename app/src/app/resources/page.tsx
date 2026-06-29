import Link from 'next/link'
import { BookOpen, FileText, Globe, Download, ArrowRight } from 'lucide-react'

const ARTICLES = [
  { category: 'Visa Tips', title: 'F-1 Visa Interview: The 15 Questions Every Student Must Prepare For', slug: 'f1-visa-interview-questions', readTime: '8 min', tags: ['F-1', 'Interview', 'All Countries'] },
  { category: 'Country Guide', title: 'Nigerian Students: A Complete Guide to U.S. Student Visa Success', slug: 'nigeria-us-student-visa-guide', readTime: '12 min', tags: ['Nigeria', 'High Risk', 'F-1'] },
  { category: 'Country Guide', title: 'India to the U.S.: Everything You Need to Know About the F-1 Process', slug: 'india-f1-visa-guide', readTime: '10 min', tags: ['India', 'Moderate Risk', 'F-1'] },
  { category: 'Financial Docs', title: 'How to Write a Winning Sponsor Letter for Your U.S. Student Visa', slug: 'sponsor-letter-guide', readTime: '6 min', tags: ['Financial', 'Documents', 'All Countries'] },
  { category: 'University Spotlight', title: 'Houston Community College: The Best Gateway to Texas Universities', slug: 'hcc-spotlight', readTime: '5 min', tags: ['Community College', 'Texas', 'Transfer'] },
  { category: 'SOP Writing', title: 'Statement of Purpose That Gets Results: A Step-by-Step Framework', slug: 'sop-guide', readTime: '9 min', tags: ['SOP', 'Writing', 'Graduate'] },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Visa Tips': 'badge-blue',
  'Country Guide': 'badge-teal',
  'Financial Docs': 'badge-amber',
  'University Spotlight': 'badge-navy',
  'SOP Writing': 'badge-purple',
}

const CHECKLISTS = [
  { title: 'F-1 Visa Application Checklist', desc: 'Complete document list for all F-1 applicants', size: 'PDF, 2 pages' },
  { title: 'Financial Documentation Guide', desc: 'What bank statements, sponsor letters, and proof of funds must show', size: 'PDF, 4 pages' },
  { title: 'University Application Timeline', desc: 'Month-by-month calendar for a Fall 2026 enrollment', size: 'PDF, 1 page' },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-gold">Free Resources</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-5">Knowledge Is Your Best Visa Strategy</h1>
          <p className="text-white/75 text-lg">Country guides, visa tips, SOP frameworks, and downloadable checklists — all free.</p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-label">Articles &amp; Guides</div>
              <h2 className="section-title mt-1">Latest Resources</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <div key={a.slug} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                <span className={`${CATEGORY_COLORS[a.category] ?? 'badge-blue'} text-xs mb-3 self-start`}>{a.category}</span>
                <h3 className="font-semibold text-navy text-sm leading-snug flex-1 mb-4">{a.title}</h3>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-gray-400 text-xs">{a.readTime} read</span>
                  <Link href={`/resources/${a.slug}`} className="text-teal text-xs font-semibold hover:underline flex items-center gap-1">Read <ArrowRight size={12} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="checklist" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">Free Downloads</div>
            <h2 className="section-title mt-2">Checklists &amp; Templates</h2>
            <p className="text-gray-500 mt-3 text-sm">Enter your email to download — we will also send you the latest visa tips.</p>
          </div>
          <div className="space-y-4">
            {CHECKLISTS.map((c) => (
              <div key={c.title} className="flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-teal" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy text-sm">{c.title}</div>
                  <div className="text-gray-400 text-xs">{c.desc} · {c.size}</div>
                </div>
                <button className="flex items-center gap-1.5 text-teal text-sm font-semibold hover:underline">
                  <Download size={15} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center px-4">
        <Globe size={36} className="mx-auto mb-4 text-white/40" />
        <h2 className="font-display text-3xl font-bold mb-3">Ready for Personalized Guidance?</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto text-sm">Articles are a great start. A free consultation with a Steadfast advisor takes it to the next level.</p>
        <Link href="/book" className="btn-primary">Book Free Consultation <ArrowRight size={16} /></Link>
      </section>
    </div>
  )
}
