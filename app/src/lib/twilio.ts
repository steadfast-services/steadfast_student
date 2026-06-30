import twilio from 'twilio'

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  if (!sid || !token) throw new Error('Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN')
  return twilio(sid, token)
}

export async function sendWhatsAppMessage(to: string, body: string) {
  const from = process.env.TWILIO_WHATSAPP_NUMBER
  if (!from) throw new Error('Missing TWILIO_WHATSAPP_NUMBER')
  const client = getClient()
  return client.messages.create({
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`,
    body,
  })
}

// Notify the advisor (you) on WhatsApp when a new qualified lead comes in
export async function notifyAdvisorOnWhatsApp(lead: {
  name: string
  email: string
  country: string
  packageName: string
  channel: string
  phone?: string
}) {
  const advisorNumber = process.env.ADVISOR_WHATSAPP_NUMBER
  if (!advisorNumber) return

  const msg = [
    `🔥 *New Qualified Lead — ${lead.name}*`,
    ``,
    `📍 Country: ${lead.country}`,
    `📦 Package: ${lead.packageName}`,
    `📧 Email: ${lead.email}`,
    lead.phone ? `📱 WhatsApp: ${lead.phone}` : '',
    `📲 Channel: ${lead.channel}`,
    ``,
    `They have confirmed interest and are waiting to hear from you.`,
    `Reply to them directly or log in to the admin panel to follow up.`,
  ].filter(Boolean).join('\n')

  return sendWhatsAppMessage(advisorNumber, msg)
}
