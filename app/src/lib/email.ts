import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'advisors@steadfaststudentservices.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.steadfaststudentservices.com'

// CAN-SPAM compliant footer — required in every commercial email
function emailFooter(to: string) {
  const unsubUrl = `${APP_URL}/contact?unsubscribe=${encodeURIComponent(to)}`
  return `
    <div style="background:#f8f6f0;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:12px;margin:0 0 8px;">© 2026 Steadfast Student Services · 650 Lansdowne Way Apt T2, Norwood, MA 02062</p>
      <p style="color:#94a3b8;font-size:11px;margin:0;">
        Steadfast Student Services is not a law firm. We provide educational enrollment consulting only.<br/>
        <a href="${APP_URL}/privacy" style="color:#1A6B72;">Privacy Policy</a> &nbsp;·&nbsp;
        <a href="${APP_URL}/terms" style="color:#1A6B72;">Terms of Service</a> &nbsp;·&nbsp;
        <a href="${unsubUrl}" style="color:#1A6B72;">Unsubscribe</a>
      </p>
    </div>
  `
}

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to Steadfast Student Services — Your U.S. Study Journey Starts Here',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
        <div style="background:#0B1F3A;padding:40px;text-align:center;">
          <h1 style="color:#C9A84C;font-family:Georgia,serif;font-size:28px;margin:0;">Steadfast Student Services</h1>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Guiding You to Your American Dream</p>
        </div>
        <div style="padding:40px 32px;">
          <h2 style="font-family:Georgia,serif;color:#0B1F3A;font-size:24px;">Welcome, ${name}!</h2>
          <p style="color:#475569;line-height:1.7;">Thank you for reaching out to Steadfast Student Services. We are excited to help you navigate your path to U.S. higher education.</p>
          <p style="color:#475569;line-height:1.7;">Here is what happens next:</p>
          <ol style="color:#475569;line-height:1.9;padding-left:20px;">
            <li>Take our <strong>free 2-minute risk assessment</strong> to understand your visa eligibility</li>
            <li>Book a <strong>free 30-minute consultation</strong> with one of our expert advisors</li>
            <li>We will build a <strong>custom enrollment strategy</strong> tailored to your situation</li>
          </ol>
          <div style="margin:32px 0;text-align:center;">
            <a href="${APP_URL}/assessment" style="background:#C9A84C;color:#0B1F3A;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;">Take Your Free Assessment →</a>
          </div>
          <p style="color:#94a3b8;font-size:13px;text-align:center;">Questions? Reply to this email or chat with Sofia, our 24/7 AI advisor on our website.</p>
        </div>
        ${emailFooter(to)}
      </div>
    `,
  })
}

export async function sendAssessmentResultEmail(to: string, name: string, tier: string, packageName: string) {
  const tierColor = tier === 'low' ? '#16a34a' : tier === 'moderate' ? '#d97706' : '#dc2626'
  const tierLabel = tier === 'low' ? 'Low Risk' : tier === 'moderate' ? 'Moderate Risk' : 'High Risk'
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Your Visa Risk Assessment Results — ${tierLabel} | Steadfast`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
        <div style="background:#0B1F3A;padding:40px;text-align:center;">
          <h1 style="color:#C9A84C;font-family:Georgia,serif;font-size:26px;margin:0;">Your Assessment Results</h1>
        </div>
        <div style="padding:40px 32px;">
          <p style="color:#475569;">Hi ${name},</p>
          <p style="color:#475569;line-height:1.7;">Your personalized visa risk assessment is complete. Here are your results:</p>
          <div style="background:#f8f6f0;border-radius:10px;padding:24px;margin:24px 0;text-align:center;border-left:4px solid ${tierColor};">
            <div style="color:${tierColor};font-weight:700;font-size:18px;">${tierLabel}</div>
            <div style="color:#1e293b;font-size:14px;margin-top:8px;">Recommended: <strong>${packageName}</strong></div>
          </div>
          <p style="color:#475569;line-height:1.7;">Our advisors are ready to walk you through your personalized strategy. Book your free consultation to get started.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${APP_URL}/book" style="background:#1A6B72;color:white;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;">Book Free Consultation →</a>
          </div>
        </div>
        ${emailFooter(to)}
      </div>
    `,
  })
}

export async function sendBookingConfirmationEmail(to: string, name: string, dateTime: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Consultation Confirmed — ${dateTime} | Steadfast Student Services`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
        <div style="background:#0B1F3A;padding:40px;text-align:center;">
          <h1 style="color:#C9A84C;font-family:Georgia,serif;font-size:26px;margin:0;">Consultation Confirmed ✓</h1>
        </div>
        <div style="padding:40px 32px;">
          <p style="color:#475569;">Hi ${name},</p>
          <p style="color:#475569;line-height:1.7;">Your free 30-minute consultation is confirmed for:</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin:20px 0;text-align:center;">
            <div style="font-size:18px;font-weight:700;color:#0B1F3A;">${dateTime}</div>
          </div>
          <p style="color:#475569;line-height:1.7;"><strong>Before your call, please prepare:</strong></p>
          <ul style="color:#475569;line-height:1.9;padding-left:20px;">
            <li>Your most recent transcripts or GPA information</li>
            <li>Passport details (expiry date)</li>
            <li>Your target program(s) and universities</li>
            <li>Any prior U.S. visa application history</li>
          </ul>
          <p style="color:#94a3b8;font-size:13px;margin-top:24px;">You will receive a reminder 24 hours and 1 hour before your appointment. Questions? Reply to this email.</p>
        </div>
        ${emailFooter(to)}
      </div>
    `,
  })
}

export async function sendAdvisorAlert(subject: string, body: string) {
  return resend.emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL ?? 'admin@steadfaststudentservices.com',
    subject: `[Steadfast Alert] ${subject}`,
    html: `<div style="font-family:monospace;padding:20px;">${body}</div>`,
  })
}
