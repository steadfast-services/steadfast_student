'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (signInError) {
      setError(signInError.message)
      setStatus('error')
      return
    }
    router.refresh()
    router.push(searchParams.get('redirectTo') ?? '/portal')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <LogIn size={20} className="text-teal" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1.5">Sign in to your student portal.</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Password *</label>
              <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
                placeholder="Your password"
              />
            </div>
            {status === 'error' && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5">
              {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Signing In…</> : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account? <Link href="/sign-up" className="text-teal font-semibold hover:underline">Create One</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
