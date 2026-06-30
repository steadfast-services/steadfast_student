import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out to a Steadfast Student Services advisor. Get answers about your U.S. student visa application, our packages, and how we can help your specific case.',
  openGraph: {
    title: 'Contact Steadfast Student Services',
    description: 'Talk to an advisor today. We respond within 24 hours and serve students from 68 countries.',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
