import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Personalized Assessment',
  description: 'Take our free 2-minute assessment to discover your personalized support profile and get matched with the right level of enrollment guidance.',
  openGraph: {
    title: 'Free Personalized Assessment for U.S. Study',
    description: 'Answer 7 questions to get your personalized support profile and package recommendation — free, instant, and no commitment.',
    url: '/assessment',
  },
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return children
}
