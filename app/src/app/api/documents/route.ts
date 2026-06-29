import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { sendAdvisorAlert } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const studentId = formData.get('student_id') as string
    const docType = formData.get('doc_type') as string
    const file = formData.get('file') as File

    if (!studentId || !docType || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Upload to Supabase Storage
    const filename = `${studentId}/${docType}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage.from('student-documents').upload(filename, file)
    if (uploadError) throw uploadError

    // Record in database
    const { data: doc } = await supabase.from('documents').insert({
      student_id: studentId,
      doc_type: docType,
      file_path: filename,
      status: 'pending',
    }).select().single()

    // Notify advisor
    await sendAdvisorAlert(
      `Document Uploaded: ${docType}`,
      `<p>Student ID: ${studentId}</p><p>Document: ${docType}</p><p>File: ${file.name}</p><p>Please review at: /admin/documents/${doc?.id}</p>`
    ).catch(() => {})

    return NextResponse.json({ success: true, document_id: doc?.id })
  } catch (err) {
    console.error('Document upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
