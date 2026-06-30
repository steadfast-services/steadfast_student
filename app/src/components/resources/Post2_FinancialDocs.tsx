import { Landmark, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Post2_FinancialDocs() {
  return (
    <article className="card">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center">
          <Landmark size={22} className="text-blue-600" />
        </div>
        <div>
          <div className="text-xs text-gray-400">Article · 4 min read</div>
          <h3 className="font-display text-lg font-bold text-navy leading-tight">Decoding Financial Documents for Your I-20 and Visa</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        More I-20s are delayed and visas denied due to weak financial documentation than any other factor. Your goal is to present a clear, simple story that proves you can afford your education without needing to work illegally.
      </p>
      <div className="space-y-4 text-sm mb-5">
        <div>
          <h4 className="font-semibold text-navy mb-1">What are "Proof of Funds"?</h4>
          <p className="text-gray-600">You must show liquid assets (cash, savings, approved loans) equal to the first year's total cost of attendance listed on your I-20. These funds must be readily available.</p>
        </div>
        <div>
          <h4 className="font-semibold text-navy mb-1">Common Document Types</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Bank Statements:</strong> 6-12 months of official, stamped statements are best. Avoid large, recent deposits without a clear paper trail (like a property sale receipt).</li>
            <li><strong>Sponsor Letter (Affidavit of Support):</strong> A letter from your sponsor (e.g., parent, relative) stating their relationship to you and their commitment to cover your expenses. This MUST be accompanied by their own proof of funds.</li>
            <li><strong>Loan Approval Letter:</strong> An official letter from a bank showing you have been approved for an education loan.</li>
            <li><strong>Scholarship Letter:</strong> An official letter from your university or an external organization detailing the award amount.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-navy mb-1">The "Financial Narrative"</h4>
          <p className="text-gray-600">Don't just submit documents; tell a story. Your advisor can help frame a narrative, such as: "My father, a director at XYZ company for 15 years, will be sponsoring my education from his salary and savings, supplemented by a pre-approved education loan from ABC Bank." This is much stronger than a random pile of papers.</p>
        </div>
      </div>
      <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
        <h4 className="font-semibold text-navy text-sm mb-2">Build a Rock-Solid Financial Case</h4>
        <p className="text-xs text-gray-600 mb-3">Our Elite package includes a "Financial Narrative Framing" session where we architect your entire financial story for the consular officer, going far beyond just the documents.</p>
        <Link href="/book" className="btn-outline text-xs py-2 px-4">
          Book a Free Consultation <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}