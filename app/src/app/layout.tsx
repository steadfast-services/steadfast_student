import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import EducateYourselfGuide from '@/components/faq-guide/EducateYourselfGuide'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.steadfaststudentservices.com'),
  title: {
    default: 'Steadfast Student Services — U.S. Enrollment Experts for International Students',
    template: '%s | Steadfast Student Services',
  },
  description: 'Expert guidance for international students applying to U.S. universities. Visa consultation, application support, and document preparation from 68 countries.',
  keywords: ['international student visa', 'F-1 visa consultant', 'US university enrollment', 'student visa help', 'study in USA', 'visa denial strategy'],
  authors: [{ name: 'Steadfast Student Services' }],
  creator: 'Steadfast Student Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.steadfaststudentservices.com',
    siteName: 'Steadfast Student Services',
    title: 'Steadfast Student Services — U.S. Enrollment Experts',
    description: 'Turn visa obstacles into acceptance letters. Expert enrollment consulting for international students from every country.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steadfast Student Services — U.S. Enrollment Experts',
    description: 'Turn visa obstacles into acceptance letters. Expert enrollment consulting for international students from every country.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Steadfast Student Services',
  url: 'https://www.steadfaststudentservices.com',
  logo: 'https://www.steadfaststudentservices.com/opengraph-image',
  description: 'Expert U.S. university enrollment consulting for international students from 68 countries. Visa consultation, document preparation, and SOP coaching.',
  email: 'advisors@steadfaststudentservices.com',
  telephone: '+1-781-929-4623',
  areaServed: 'Worldwide',
  serviceType: 'International Student Enrollment Consulting',
  knowsAbout: ['F-1 Student Visa', 'U.S. University Admissions', 'Student Visa Application', 'Study in USA', 'International Student Services'],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <EducateYourselfGuide />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
