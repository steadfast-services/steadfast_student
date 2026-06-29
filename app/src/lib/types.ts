export type RiskTier = 'low' | 'moderate' | 'high'
export type StudentStatus = 'lead' | 'active' | 'enrolled' | 'alumni'
export type ApplicationStatus = 'draft' | 'submitted' | 'decision' | 'enrolled'
export type DocumentStatus = 'pending' | 'reviewing' | 'approved' | 'rejected'

export interface Student {
  id: string
  full_name: string
  email: string
  phone?: string
  country_of_origin?: string
  risk_tier?: RiskTier
  risk_score?: number
  service_package?: string
  status: StudentStatus
  advisor_id?: string
  created_at: string
}

export interface Application {
  id: string
  student_id: string
  institution_name: string
  program?: string
  status: ApplicationStatus
  deadline?: string
  decision?: 'accepted' | 'rejected' | 'waitlist' | null
  notes?: string
  updated_at: string
}

export interface Document {
  id: string
  student_id: string
  doc_type: string
  file_path?: string
  status: DocumentStatus
  advisor_notes?: string
  uploaded_at: string
}

export interface Lead {
  id: string
  email: string
  full_name?: string
  source: 'chatbot' | 'quiz' | 'contact' | 'blog'
  quiz_data?: Record<string, unknown>
  converted: boolean
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  content: string
  timestamp: number
}

export interface AssessmentAnswers {
  country: string
  intendedProgram: string
  gpa: string
  financialProof: string
  priorVisaDenial: boolean
  targetStartDate: string
  email?: string
  name?: string
}

export interface RiskResult {
  score: number
  tier: RiskTier
  denialRate: string
  packageRecommendation: string
  keyFactors: string[]
  nextSteps: string[]
}
