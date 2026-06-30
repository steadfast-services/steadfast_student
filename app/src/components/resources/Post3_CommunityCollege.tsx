import { GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Post3_CommunityCollege() {
  return (
    <article className="card">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center">
          <GraduationCap size={22} className="text-green-600" />
        </div>
        <div>
          <div className="text-xs text-gray-400">Article · 4 min read</div>
          <h3 className="font-display text-lg font-bold text-navy leading-tight">The Community College Secret: A Smart Pathway to a U.S. Degree</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        For many international students, especially from high-risk countries or with modest budgets, starting at a community college isn't a "backup plan" — it's the smartest plan. Here's why this pathway is so powerful.
      </p>
      <div className="space-y-4 text-sm mb-5">
        <div>
          <h4 className="font-semibold text-navy mb-1">The "2+2" Advantage</h4>
          <p className="text-gray-600">You complete your first two years of university credits at a community college, earn an Associate's Degree, and then transfer to a four-year university for your final two years to complete your Bachelor's Degree. The final degree is from the four-year university, with no distinction from students who started there.</p>
        </div>
        <div>
          <h4 className="font-semibold text-navy mb-1">Key Benefits for International Students</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Lower Cost:</strong> The first two years can be 50-70% cheaper, significantly reducing the total financial proof required for your visa.</li>
            <li><strong>Easier Admission:</strong> Admission requirements are generally more flexible than at large universities, offering a great option for students with average grades.</li>
            <li><strong>Higher Visa Success Rate:</strong> For some profiles, showing a lower cost of attendance can make the financial case more believable to a consular officer, potentially improving visa odds.</li>
            <li><strong>Guaranteed Transfer Pathways:</strong> Many community colleges have "articulation agreements" with top state universities, guaranteeing your admission as a junior if you meet a certain GPA.</li>
          </ul>
        </div>
      </div>
      <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
        <h4 className="font-semibold text-navy text-sm mb-2">Is This Pathway Right for You?</h4>
        <p className="text-xs text-gray-600 mb-3">We have direct partnerships with leading community colleges that have excellent transfer records. Let's build a personalized 2+2 pathway for your goals.</p>
        <Link href="/assessment" className="btn-outline text-xs py-2 px-4">
          Take the Free Assessment <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}