import type { AssessmentAnswers, RiskResult, RiskTier } from './types'

// Visa denial rates by country (US State Dept data — representative values)
const COUNTRY_DENIAL_RATES: Record<string, number> = {
  // Low risk (< 35%)
  'United Kingdom': 2, 'Germany': 5, 'France': 7, 'Canada': 10, 'Australia': 12,
  'Japan': 8, 'South Korea': 15, 'Brazil': 22, 'Mexico': 28, 'Italy': 6,
  'Spain': 9, 'Netherlands': 4, 'Sweden': 5, 'Norway': 4, 'Denmark': 5,
  'Singapore': 11, 'New Zealand': 13, 'Ireland': 6, 'Switzerland': 5,
  // Moderate risk (35–55%)
  'India': 40, 'China': 38, 'Philippines': 42, 'Vietnam': 48, 'Indonesia': 45,
  'Thailand': 36, 'Egypt': 44, 'Morocco': 47, 'Colombia': 38, 'Peru': 41,
  'Ecuador': 43, 'Bolivia': 46, 'Paraguay': 44, 'Dominican Republic': 39,
  'Sri Lanka': 48, 'Nepal': 52, 'Bangladesh': 54,
  // High risk (> 55%)
  'Pakistan': 58, 'Nigeria': 62, 'Ghana': 65, 'Cameroon': 68, 'Senegal': 67,
  'Mali': 72, 'Afghanistan': 78, 'Iran': 75, 'Libya': 70, 'Haiti': 66,
  'Cuba': 64, 'Venezuela': 61, 'Sudan': 73, 'Somalia': 80, 'Yemen': 76,
}

function getCountryDenialRate(country: string): number {
  return COUNTRY_DENIAL_RATES[country] ?? 45 // Default to moderate
}

export function calculateSupportProfile(answers: AssessmentAnswers): RiskResult {
  const denialRate = getCountryDenialRate(answers.country)
  let score = denialRate * 0.5 // Reduce country-based weight

  // GPA adjustment
  if (answers.gpa === 'above_3_5') score -= 15
  else if (answers.gpa === '3_0_to_3_5') score -= 7
  else if (answers.gpa === '2_5_to_3_0') score += 7
  else score += 15 // below 2.5

  // Financial proof adjustment
  if (answers.financialProof === 'full_sponsor_letter') score -= 10
  else if (answers.financialProof === 'bank_statements_strong') score -= 5
  else if (answers.financialProof === 'bank_statements_borderline') score += 10
  else score += 20 // insufficient

  // Prior visa denial
  if (answers.priorVisaDenial) score += 20

  // Clamp to 0–100
  score = Math.round(Math.min(100, Math.max(0, score)))

  const tier: RiskTier = score <= 35 ? 'low' : score <= 55 ? 'moderate' : 'high'

  const packageRecommendation =
    tier === 'low' ? 'Standard Package' :
    tier === 'moderate' ? 'Premium Package' : 'Elite Package'

  const keyFactors = buildKeyFactors(answers, denialRate)
  const nextSteps = buildNextSteps(tier)

  return {
    score,
    tier,
    denialRate: `${denialRate}%`,
    packageRecommendation,
    keyFactors,
    nextSteps,
  }
}

function buildKeyFactors(answers: AssessmentAnswers, countryRate: number): string[] {
  const factors: string[] = []
  if (countryRate > 35) factors.push(`Consular trends for applicants from ${answers.country} show a need for a well-prepared case.`)
  else factors.push(`Applicants from ${answers.country} have historically seen positive outcomes.`)

  if (answers.gpa === 'above_3_5') factors.push('Strong GPA (3.5+) significantly strengthens your application')
  else if (answers.gpa === 'below_2_5') factors.push('Your GPA requires a strategy to highlight other strengths in your profile, which we can build together.')

  if (answers.financialProof === 'insufficient') factors.push('Your financial profile is a key area where our guidance can make a significant impact.')
  else if (answers.financialProof === 'full_sponsor_letter') factors.push('A full sponsorship is an excellent foundation for your financial documentation.')

  if (answers.priorVisaDenial) factors.push('A prior visa denial requires a specialized strategy, which is one of our core strengths.')

  return factors
}

function buildNextSteps(tier: RiskTier): string[] {
  if (tier === 'low') return [
    'Book your free 30-minute consultation to confirm your school shortlist',
    'Begin gathering financial documents and academic transcripts now',
    'Review your target programs — you are in a strong position to apply broadly',
    'Submit with confidence after our advisor reviews your full application',
  ]
  if (tier === 'moderate') return [
    'Book a strategy session — preparation timing is critical at your level',
    'Schedule a financial document strategy review with your dedicated advisor',
    'Work with our SOP coaches to craft a compelling, specific personal statement',
    'Complete two mock visa interview sessions before your consulate appointment',
  ]
  return [
    'Contact us today — complex cases need the most lead time to build correctly',
    'Share your full background so we can begin your custom Elite strategy',
    'Review prior denial details with an Elite advisor in a confidential session',
    'Let our team design an embassy-specific coaching plan built around your file',
  ]
}
