'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const DOC_TYPES = [
  { value: 'passport', label: 'Passport (bio-data page)' },
  { value: 'transcript', label: 'Academic Transcripts' },
  { value: 'bank_statements', label: 'Bank Statements (12 months)' },
  { value: 'sponsor_letter', label: 'Sponsor / Support Letter' },
  { value: 'sop', label: 'Statement of Purpose' },
  { value: 'lor', label: 'Letter of Recommendation' },
  { value: 'toefl_ielts', label: 'TOEFL / IELTS Score Report' },
  { value: 'i20', label: 'I-20 / Acceptance Letter' },
  { value: 'other', label: 'Other Document' },
]

interface UploadedFile {
  name: string
  type: string
  size: number
  status: 'pending' | 'uploading' | 'done' | 'error'
}

export default function DocumentsPage() {
  const [docType, setDocType] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = accepted.map((f) => ({
      name: f.name, type: docType || 'other', size: f.size, status: 'pending' as const,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [docType])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  async function uploadAll() {
    if (!files.length || !docType) return alert('Please select a document type first.')
    setUploading(true)
    // In production: upload each file to Supabase Storage, then record in 'documents' table
    await new Promise((r) => setTimeout(r, 1500)) // Demo delay
    setFiles((prev) => prev.map((f) => ({ ...f, status: 'done' })))
    setUploading(false)
  }

  const StatusIcon = ({ status }: { status: UploadedFile['status'] }) => {
    if (status === 'done') return <CheckCircle size={16} className="text-green-500" />
    if (status === 'error') return <AlertCircle size={16} className="text-red-500" />
    return <Clock size={16} className="text-gray-400" />
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-navy">Document Center</h1>
          <p className="text-gray-500 mt-2 text-sm">Upload your documents securely. Your advisor will review each one and update you within 24 hours.</p>
        </div>

        {/* Select document type */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-5">
          <label className="block text-sm font-semibold text-navy mb-2">1. Select Document Type</label>
          <select value={docType} onChange={(e) => setDocType(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-sm"
          >
            <option value="">Select document type…</option>
            {DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>

        {/* Dropzone */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-5">
          <label className="block text-sm font-semibold text-navy mb-3">2. Upload File(s)</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-teal bg-teal/5' : 'border-gray-200 hover:border-teal/50'}`}
          >
            <input {...getInputProps()} />
            <Upload size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-navy font-medium text-sm">Drop files here, or click to browse</p>
            <p className="text-gray-400 text-xs mt-1">PDF, JPG, PNG — Max 10MB per file</p>
          </div>

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={16} className="text-teal flex-shrink-0" />
                  <span className="text-sm text-navy flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-gray-400">{(f.size / 1024).toFixed(0)}KB</span>
                  <StatusIcon status={f.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upload button */}
        <button
          onClick={uploadAll}
          disabled={!files.length || uploading || files.every((f) => f.status === 'done')}
          className="btn-primary w-full justify-center py-3.5 disabled:opacity-40"
        >
          {uploading ? 'Uploading…' : files.some((f) => f.status === 'done') ? 'Uploaded ✓' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
        </button>

        <p className="text-gray-400 text-xs text-center mt-3">
          Files are encrypted and stored securely. Your advisor will be notified automatically.
        </p>
      </div>
    </div>
  )
}
