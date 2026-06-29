import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata: Metadata = {
  title: 'Steadfast Student Services — U.S. Enrollment Experts for International Students',
  description: 'Expert guidance for international students applying to U.S. universities. Visa consultation, application support, and document preparation for all risk tiers.',
  keywords: ['international student', 'US student visa', 'F-1 visa', 'university enrollment', 'visa consultant'],
  openGraph: {
    title: 'Steadfast Student Services',
    description: 'Your trusted partner for U.S. university enrollment — from application to arrival.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
