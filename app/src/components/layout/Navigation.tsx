'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen } from 'lucide-react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/assessment', label: 'Free Assessment' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-navy" />
            </div>
            <span className="font-display font-bold text-white text-lg leading-tight">
              Steadfast<span className="text-gold"> Student</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-gold bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/portal" className="text-white/70 text-sm hover:text-white transition-colors">Student Portal</Link>
            <Link href="/book" className="bg-gold text-navy text-sm font-bold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors">
              Book Free Call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
            >{link.label}</Link>
          ))}
          <div className="border-t border-white/10 pt-3 mt-2 space-y-2">
            <Link href="/portal" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/60 text-sm hover:text-white transition-colors">Student Portal</Link>
            <Link href="/book" onClick={() => setOpen(false)} className="block bg-gold text-navy text-sm font-bold px-4 py-3 rounded-lg text-center">Book Free Consultation</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
