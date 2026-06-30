import type { Metadata } from 'next'
import { Calendar, Clock, Video, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description: 'Schedule your free 30-minute strategy call with a Steadfast advisor. We review your profile, answer your questions, and build your personalized enrollment plan.',
  openGraph: {
    title: 'Book a Free 30-Minute Strategy Call',
    description: 'No commitment, no cost. A senior Steadfast advisor will review your profile and map out your path to U.S. enrollment.',
    url: '/book',
  },
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="section-label">Free Consultation</div>
          <h1 className="section-title mt-2">Book Your Strategy Call</h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">30 minutes, completely free. No obligation. Walk away with a clear picture of your visa eligibility and a custom action plan.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* What to expect */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy mb-4">What to Expect</h3>
              {[
                { icon: Clock, text: '30-minute video or phone call with a senior advisor' },
                { icon: Calendar, text: 'Available 7 days a week — including evenings' },
                { icon: Video, text: 'Zoom or Google Meet — your choice' },
                { icon: CheckCircle, text: 'Custom enrollment strategy delivered same day' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 mb-3 last:mb-0">
                  <Icon size={16} className="text-teal mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-navy rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-3">Come Prepared With:</h3>
              <ul className="space-y-2 text-sm text-white/75">
                <li>• Passport or national ID details</li>
                <li>• Most recent academic transcripts</li>
                <li>• Target program(s) in mind</li>
                <li>• Financial proof details</li>
                <li>• Any prior U.S. visa application history</li>
              </ul>
            </div>
          </div>

          {/* Cal.com embed placeholder */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Replace the src below with your actual Cal.com embed URL */}
            <iframe
              src="https://cal.com/steadfast-student-services/consultation"
              width="100%"
              height="600"
              frameBorder="0"
              title="Book a consultation with Steadfast Student Services"
              className="w-full"
              style={{ minHeight: '600px' }}
            />
            {/* Fallback if Cal.com not yet configured */}
            <div className="p-8 text-center hidden">
              <Calendar size={40} className="text-teal mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-navy mb-2">Booking Calendar</h3>
              <p className="text-gray-500 text-sm mb-4">Connect your Cal.com account to enable online booking. Until then, email us at:</p>
              <a href="mailto:advisors@steadfaststudentservices.com" className="text-teal font-semibold text-sm hover:underline">advisors@steadfaststudentservices.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
