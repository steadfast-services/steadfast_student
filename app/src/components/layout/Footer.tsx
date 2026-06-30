import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

const LINKS = {
  Services: [
    { label: 'Standard Package', href: '/services#low' },
    { label: 'Premium Package', href: '/services#moderate' },
    { label: 'Elite Package', href: '/services#high' },
    { label: 'Free Assessment', href: '/assessment' },
  ],
  Resources: [
    { label: 'Country Guides', href: '/resources' },
    { label: 'Visa Tips', href: '/resources#visa' },
    { label: 'University Spotlight', href: '/resources#universities' },
    { label: 'Document Checklist', href: '/resources#checklist' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Student Portal', href: '/portal' },
    { label: 'Book Consultation', href: '/book' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-navy" />
              </div>
              <span className="font-display font-bold text-white text-lg">Steadfast Student Services</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Expert U.S. enrollment consulting for international students from every corner of the world. We turn complex visa processes into clear, manageable steps.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-gold" /> advisors@steadfaststudentservices.com</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +1 (781) 929-4623</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> United States · Serving 68 Countries</div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-gold transition-colors duration-150">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 space-y-4 text-xs text-white/40">
          <p className="text-white/30 leading-relaxed max-w-3xl">
            <strong className="text-white/40">Disclaimer:</strong> Steadfast Student Services is not a law firm. Our advisors are not licensed immigration attorneys or accredited representatives. We provide educational enrollment consulting only. Nothing on this site constitutes legal advice. For immigration legal matters, consult a licensed attorney.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Steadfast Student Services. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
