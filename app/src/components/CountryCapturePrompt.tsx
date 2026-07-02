'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe2 } from 'lucide-react'
import { COUNTRY_DENIAL_RATES } from '@/lib/assessment'

const COUNTRIES = Object.keys(COUNTRY_DENIAL_RATES).sort()
const STORAGE_KEY = 'steadfast-country'
const DELAY_MS = 120000

export default function CountryCapturePrompt() {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!country) return
    sessionStorage.setItem(STORAGE_KEY, country)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe2 size={22} className="text-teal" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy mb-2">Where are you applying from?</h3>
            <p className="text-gray-500 text-sm mb-6">
              This helps us show you the most relevant guidance for your country right away.
            </p>
            <form onSubmit={handleSubmit}>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm mb-4"
              >
                <option value="" disabled>Select your country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button type="submit" disabled={!country} className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                Continue
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
