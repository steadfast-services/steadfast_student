'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', country: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, full_name: form.name, source: 'contact', quiz_data: { message: form.message, country: form.country } }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <div className="section-label">Get in Touch</div>
          <h1 className="section-title mt-2">Contact an Advisor</h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Have a specific question? Our team responds within 2 business hours. Or chat with Sofia, our AI advisor, for instant answers 24/7.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Info column */}
          <div className="md:col-span-2 space-y-6">
            {[
              { Icon: Mail, title: 'Email', value: 'advisors@steadfaststudentservices.com' },
              { Icon: Phone, title: 'Phone / WhatsApp', value: '+1 (800) 000-STUDY' },
              { Icon: MapPin, title: 'Location', value: 'United States · Serving 68 Countries Worldwide' },
              { Icon: Clock, title: 'Hours', value: 'Mon–Fri: 8am–8pm ET · Sat: 10am–4pm ET\n24/7 AI Chat always available' },
            ].map(({ Icon, title, value }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-teal" />
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{title}</div>
                  <div className="text-gray-500 text-sm mt-0.5 whitespace-pre-line">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <motion.div className="md:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-navy mb-2">Message Received!</h3>
                <p className="text-gray-500">We will respond within 2 business hours. Check your email for a confirmation.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Country of Origin</label>
                  <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                    placeholder="e.g. Nigeria, India, Vietnam…"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Your Question</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm resize-none"
                    placeholder="Tell us about your situation — country, target program, any prior visa history…"
                  />
                </div>
                {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5">
                  {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
