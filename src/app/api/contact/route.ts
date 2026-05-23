import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, email, service, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Nodemailer transport — Zoho Mail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST ?? 'smtp.zoho.com',
      port: Number(process.env.ZOHO_SMTP_PORT ?? 465),
      secure: true, // SSL on port 465
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
      },
    })

    const from = process.env.ZOHO_SMTP_FROM ?? process.env.ZOHO_SMTP_USER
    const to = process.env.CONTACT_TO_EMAIL ?? process.env.ZOHO_SMTP_USER

    await transporter.sendMail({
      from: `"Automera Contact" <${from}>`,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || '—'}`,
        `Email: ${email}`,
        `Service interest: ${service || '—'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111827;">
          <h2 style="color: #2563EB; margin-bottom: 24px;">New enquiry via automera.co</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Company</strong></td><td style="padding: 8px 0;">${company || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Service</strong></td><td style="padding: 8px 0;">${service || '—'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #F9FAFB; border-radius: 8px; border-left: 3px solid #2563EB;">
            <strong style="display: block; margin-bottom: 8px; color: #374151;">Message</strong>
            <p style="margin: 0; color: #111827; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #9CA3AF;">
            Sent from automera.co contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact/route] Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
