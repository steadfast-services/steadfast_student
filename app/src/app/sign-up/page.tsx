'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { COUNTRY_DENIAL_RATES } from '@/lib/assessment'

const COUNTRIES = Object.keys(COUNTRY_DENIAL_RATES).sort()

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', country: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('steadfast-country')
    if (saved) setForm((f) => ({ ...f, country: saved }))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.fullName, country_of_origin: form.country } },
    })
    if (signUpError) {
      setError(signUpError.message)
      setStatus('error')
      return
    }
    if (data.session) {
      router.refresh()
      router.push('/portal')
      return
    }
    // Email confirmation is required — no session yet.
    setStatus('success')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-navy mb-2">Check Your Email</h3>
              <p className="text-gray-500 text-sm">We sent a confirmation link to {form.email}. Click it to activate your account.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus size={20} className="text-teal" />
                </div>
                <h1 className="font-display text-2xl font-bold text-navy">Create Your Account</h1>
                <p className="text-gray-500 text-sm mt-1.5">Access your student portal and community forum.</p>
              </div>
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                  <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Password *</label>
                  <input required type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Country of Origin *</label>
                  <select required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                  >
                    <option value="" disabled>Select your country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {status === 'error' && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5">
                  {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Creating Account…</> : 'Create Account'}
                </button>
              </form>
              <p className="text-center text-gray-500 text-sm mt-6">
                Already have an account? <Link href="/sign-in" className="text-teal font-semibold hover:underline">Sign In</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
