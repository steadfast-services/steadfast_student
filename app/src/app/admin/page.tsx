'use client'

import { useState } from 'react'
import { Users, FileText, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, Search } from 'lucide-react'

// Demo data — in production sourced from Supabase with admin auth
const LEADS = [
  { name: 'Emeka Chukwu', email: 'emeka@example.com', country: 'Nigeria', tier: 'high', source: 'quiz', created: '2026-06-28', converted: false },
  { name: 'Priya Sharma', email: 'priya@example.com', country: 'India', tier: 'moderate', source: 'chatbot', created: '2026-06-27', converted: true },
  { name: 'Yuki Tanaka', email: 'yuki@example.com', country: 'Japan', tier: 'low', source: 'contact', created: '2026-06-26', converted: false },
  { name: 'Amira Hassan', email: 'amira@example.com', country: 'Egypt', tier: 'moderate', source: 'quiz', created: '2026-06-25', converted: true },
  { name: 'Kofi Mensah', email: 'kofi@example.com', country: 'Ghana', tier: 'high', source: 'chatbot', created: '2026-06-24', converted: false },
]

const TIER_BADGE: Record<string, string> = { low: 'badge-low', moderate: 'badge-moderate', high: 'badge-high' }

const STATS = [
  { icon: Users, label: 'Total Leads', value: '142', delta: '+18 this week', color: 'text-teal' },
  { icon: CheckCircle, label: 'Converted', value: '38', delta: '26.8% rate', color: 'text-green-600' },
  { icon: Calendar, label: 'Consultations', value: '24', delta: 'This month', color: 'text-gold' },
  { icon: TrendingUp, label: 'Avg. Risk Score', value: '54', delta: 'Moderate range', color: 'text-navy' },
]

export default function AdminPage() {
  const [search, setSearch] = useState('')

  const filtered = LEADS.filter(
    (l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()) || l.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-teal text-xs font-bold uppercase tracking-wider mb-1">Admin Dashboard</p>
          <h1 className="font-display text-3xl font-bold text-navy">CRM &amp; Lead Pipeline</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ icon: Icon, label, value, delta, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <Icon size={18} className={`${color} mb-3`} />
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-navy text-sm font-medium mt-0.5">{label}</div>
              <div className="text-gray-400 text-xs mt-1">{delta}</div>
            </div>
          ))}
        </div>

        {/* Lead table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 gap-4">
            <h2 className="font-semibold text-navy">Lead Pipeline</h2>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads…"
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-teal w-56"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk Tier</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.email} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-navy">{lead.name}</div>
                      <div className="text-gray-400 text-xs">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{lead.country}</td>
                    <td className="px-4 py-3.5"><span className={`${TIER_BADGE[lead.tier]} capitalize`}>{lead.tier}</span></td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">{lead.source}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {lead.converted
                        ? <span className="flex items-center gap-1 text-xs text-green-600 font-semibold"><CheckCircle size={12} /> Student</span>
                        : <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold"><Clock size={12} /> Lead</span>
                      }
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs">{lead.created}</td>
                    <td className="px-4 py-3.5">
                      <button className="text-teal text-xs font-semibold hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">
                <AlertCircle size={24} className="mx-auto mb-2" /> No leads match your search
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
