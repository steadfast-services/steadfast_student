'use client'

import { useState } from 'react'
import { BookOpen, Clock, CheckCircle, AlertCircle, Plus, X } from 'lucide-react'

const PIPELINE = ['Draft', 'Submitted', 'Decision', 'Enrolled']

const DEMO_APPS = [
  { id: '1', school: 'University of Houston', program: 'MS Business Analytics', status: 'Submitted', deadline: 'Mar 15, 2026', notes: 'Submitted Feb 2. Awaiting decision.' },
  { id: '2', school: 'Texas Southern University', program: 'MBA', status: 'Submitted', deadline: 'Feb 28, 2026', notes: 'All documents received.' },
  { id: '3', school: 'Houston Community College', program: 'Associate Transfer Program', status: 'Draft', deadline: 'Apr 30, 2026', notes: 'Missing: SOP and LOR' },
]

const STATUS_COLOR: Record<string, string> = {
  'Draft': 'badge-moderate',
  'Submitted': 'badge-navy',
  'Decision': 'badge-blue',
  'Accepted': 'badge-low',
  'Enrolled': 'badge-low',
  'Rejected': 'badge-high',
  'Waitlist': 'badge-moderate',
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState(DEMO_APPS)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ school: '', program: '', deadline: '' })

  function addApp() {
    if (!form.school || !form.program) return
    setApps((prev) => [...prev, { id: Date.now().toString(), school: form.school, program: form.program, status: 'Draft', deadline: form.deadline, notes: '' }])
    setForm({ school: '', program: '', deadline: '' })
    setShowAdd(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy">Application Tracker</h1>
            <p className="text-gray-500 text-sm mt-1">{apps.length} school{apps.length !== 1 ? 's' : ''} in your pipeline</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="btn-primary py-2.5 text-sm">
            <Plus size={16} /> Add School
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-teal/30 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy">Add New Application</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-navy"><X size={18} /></button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="University name" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal" />
              <input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} placeholder="Program name" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal" />
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal" />
            </div>
            <button onClick={addApp} className="btn-primary text-sm py-2.5">Add Application</button>
          </div>
        )}

        {/* Kanban columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PIPELINE.map((stage) => {
            const stageApps = apps.filter((a) => a.status === stage || (stage === 'Decision' && ['Accepted', 'Rejected', 'Waitlist'].includes(a.status)))
            return (
              <div key={stage} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-navy uppercase tracking-wider">{stage}</span>
                  <span className="text-xs text-gray-400 font-semibold">{stageApps.length}</span>
                </div>
                <div className="p-3 space-y-3 min-h-40">
                  {stageApps.map((app) => (
                    <div key={app.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start gap-2 mb-1.5">
                        <BookOpen size={13} className="text-teal mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-navy text-xs leading-snug">{app.school}</div>
                          <div className="text-gray-400 text-xs">{app.program}</div>
                        </div>
                      </div>
                      {app.deadline && (
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1.5">
                          <Clock size={10} /> Due: {app.deadline}
                        </div>
                      )}
                      {app.notes && <p className="text-xs text-gray-500 mt-1.5 italic">{app.notes}</p>}
                    </div>
                  ))}
                  {stageApps.length === 0 && <p className="text-gray-300 text-xs text-center pt-4">No applications</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
