import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const { resendApiKey } = useRuntimeConfig()
  const resend = new Resend(resendApiKey)

  const body = await readBody(event)
  const { name, email, github, message } = body

  if (!name || !email || !github) {
    throw createError({ statusCode: 400, message: 'Missing required fields.' })
  }

  const headers = getRequestHeaders(event)
  const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'
  const userAgent = headers['user-agent'] || 'unknown'
  const referer = headers['referer'] || 'direct'
  const timestamp = new Date().toISOString()

  await resend.emails.send({
    from: 'enunes.net <onboarding@resend.dev>',
    to: 'enunes.gp@gmail.com',
    replyTo: email,
    subject: `[LeadFlow] Repository Access Request — ${name}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0b0f14; color: #e6edf3; border-radius: 8px;">
        <h2 style="color: #7c5cff; margin-top: 0;">Repository Access Request</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #91a0b0; width: 140px;">Name</td><td style="padding: 8px 0; color: #e6edf3;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #29a4ff;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0;">GitHub</td><td style="padding: 8px 0;"><a href="https://github.com/${github}" style="color: #29a4ff;">@${github}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #e6edf3;">${message || '—'}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />

        <h3 style="color: #00e5a8; margin-top: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Request Metadata</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr><td style="padding: 4px 0; color: #91a0b0; width: 140px;">Timestamp</td><td style="padding: 4px 0; color: #e6edf3;">${timestamp}</td></tr>
          <tr><td style="padding: 4px 0; color: #91a0b0;">IP</td><td style="padding: 4px 0; color: #e6edf3;">${ip}</td></tr>
          <tr><td style="padding: 4px 0; color: #91a0b0;">User Agent</td><td style="padding: 4px 0; color: #e6edf3;">${userAgent}</td></tr>
          <tr><td style="padding: 4px 0; color: #91a0b0;">Referer</td><td style="padding: 4px 0; color: #e6edf3;">${referer}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
        <p style="color: #91a0b0; font-size: 11px; margin: 0;">Submitted via enunes.net</p>
      </div>
    `,
  })

  return { ok: true }
})
