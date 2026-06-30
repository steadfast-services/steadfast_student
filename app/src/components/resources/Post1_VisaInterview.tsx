import { Mic, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Post1_VisaInterview() {
  return (
    <article className="card">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center">
          <Mic size={22} className="text-red-600" />
        </div>
        <div>
          <div className="text-xs text-gray-400">Article · 5 min read</div>
          <h3 className="font-display text-lg font-bold text-navy leading-tight">5 Common F-1 Visa Interview Mistakes (and How to Avoid Them)</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        The F-1 visa interview is often the final, most nerve-wracking hurdle. It lasts only a few minutes, but preparation can make all the difference. Here are the top five mistakes we see applicants make.
      </p>
      <ul className="space-y-3 text-sm mb-5">
        <li className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div><strong>Vague Home-Country Ties:</strong> Simply saying "I'll come back" isn't enough. You must prove it with specifics: a job offer waiting for you, family business to inherit, property ownership, or a clear career path that is better in your home country after a U.S. degree.</div>
        </li>
        <li className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div><strong>Inconsistent Financial Story:</strong> Not knowing the details of your sponsor's income or having large, unexplained recent deposits in your bank statements is a major red flag. Be prepared to explain the source of all funds clearly and concisely.</div>
        </li>
        <li className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div><strong>Not Knowing Your "Why":</strong> Why this specific university? Why this specific major? Why the U.S. and not Canada or the UK? Your answers must be logical, specific, and connect directly to your future career goals back home.</div>
        </li>
        <li className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div><strong>Sounding Rehearsed:</strong> Practicing is essential, but memorizing a script makes you sound robotic and dishonest. Practice the key points, not the exact words. Your answers should be natural and conversational.</div>
        </li>
        <li className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div><strong>Arguing with the Officer:</strong> If you are denied, do not argue. Politely ask for the reason for the denial under the law. This information is critical for a successful re-application. Arguing guarantees you will not get helpful feedback.</div>
        </li>
      </ul>
      <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
        <h4 className="font-semibold text-navy text-sm mb-2">The Steadfast Solution</h4>
        <p className="text-xs text-gray-600 mb-3">Our Premium and Elite packages include multiple rounds of mock interviews that simulate these exact scenarios, giving you the practice and confidence to succeed.</p>
        <Link href="/services" className="btn-outline text-xs py-2 px-4">
          Explore Our Packages <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}