'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | 'pending' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted') setConsent('accepted')
    else if (stored === 'declined') setConsent('declined')
    else setConsent('pending')
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setConsent('declined')
  }

  return (
    <>
      {/* GA4 — only loads after explicit consent */}
      {consent === 'accepted' && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Cookie consent banner */}
      {consent === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-navy border-t border-white/10 px-4 py-4 shadow-2xl">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/80 text-sm flex-1 leading-relaxed">
              We use cookies to understand how visitors use our site (Google Analytics). No personally identifiable information is shared.{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="text-white/50 hover:text-white text-sm px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="bg-gold text-navy font-semibold text-sm px-5 py-2 rounded-lg hover:bg-gold/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
