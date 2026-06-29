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

export function calculateRisk(answers: AssessmentAnswers): RiskResult {
  const denialRate = getCountryDenialRate(answers.country)
  let score = denialRate

  // GPA adjustment
  if (answers.gpa === 'above_3_5') score -= 8
  else if (answers.gpa === '3_0_to_3_5') score -= 4
  else if (answers.gpa === '2_5_to_3_0') score += 2
  else score += 8 // below 2.5

  // Financial proof adjustment
  if (answers.financialProof === 'full_sponsor_letter') score -= 6
  else if (answers.financialProof === 'bank_statements_strong') score -= 3
  else if (answers.financialProof === 'bank_statements_borderline') score += 5
  else score += 12 // insufficient

  // Prior visa denial
  if (answers.priorVisaDenial) score += 15

  // Clamp to 0–100
  score = Math.min(100, Math.max(0, score))

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
  if (countryRate > 55) factors.push(`${answers.country} has a high consular denial rate (${countryRate}%) — extra documentation critical`)
  else if (countryRate > 35) factors.push(`${answers.country} has a moderate denial rate (${countryRate}%) — strong financial proof is essential`)
  else factors.push(`${answers.country} historically has a low denial rate (${countryRate}%) — positive indicator`)

  if (answers.gpa === 'above_3_5') factors.push('Strong GPA (3.5+) significantly strengthens your application')
  else if (answers.gpa === 'below_2_5') factors.push('GPA below 2.5 may raise admissibility concerns — we will help you address this')

  if (answers.financialProof === 'insufficient') factors.push('Financial documentation needs strengthening before application — our team will guide you')
  else if (answers.financialProof === 'full_sponsor_letter') factors.push('Full sponsor letter is excellent — this greatly supports your case')

  if (answers.priorVisaDenial) factors.push('Prior visa denial noted — we specialize in successful re-application strategies')

  return factors
}

function buildNextSteps(tier: RiskTier): string[] {
  const base = ['Book a free 30-minute consultation with a Steadfast advisor', 'Prepare a document checklist (we will provide one customized to you)']
  if (tier === 'low') return [...base, 'Begin gathering financial documents and transcripts', 'Research your target programs — you are in a strong position']
  if (tier === 'moderate') return [...base, 'Schedule a financial document review session', 'Strengthen your Statement of Purpose with our expert guidance']
  return [...base, 'Review prior denial details so we can craft a targeted strategy', 'Enroll in our Elite package for hands-on visa preparation coaching']
}
