import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const { resendApiKey } = useRuntimeConfig()
  const resend = new Resend(resendApiKey)

  const body = await readBody(event)
  const { name, email, company, reason, message } = body

  if (!name || !email || !company || !reason) {
    throw createError({ statusCode: 400, message: 'Missing required fields.' })
  }

  const timestamp = new Date().toISOString()

  await resend.emails.send({
    from: 'enunes.net <onboarding@resend.dev>',
    to: 'enunes.gp@gmail.com',
    replyTo: email,
    subject: `[CV Request] ${name} — ${company}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0b0f14; color: #e6edf3; border-radius: 8px;">
        <h2 style="color: #ffffff; margin-top: 0;">CV Download Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #91a0b0; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #29a4ff;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0;">Company</td><td style="padding: 8px 0;">${company}</td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0;">Reason</td><td style="padding: 8px 0;">${reason}</td></tr>
          <tr><td style="padding: 8px 0; color: #91a0b0; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message || '—'}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
        <p style="color: #91a0b0; font-size: 11px; margin: 0;">${timestamp} · enunes.net</p>
      </div>
    `,
  })

  return { ok: true }
})
