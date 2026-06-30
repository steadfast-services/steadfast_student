import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Risk Assessment',
  description: 'Take our free 2-minute assessment to discover your U.S. student visa risk profile and get matched with the right level of enrollment support.',
  openGraph: {
    title: 'Free U.S. Student Visa Risk Assessment',
    description: 'Answer 7 questions. Get your personalized visa risk profile and package recommendation — free, instant, no commitment.',
    url: '/assessment',
  },
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return children
}
