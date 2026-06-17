// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string
  subject: string
  text: string
}

export async function sendEmail({ to, subject, text }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_EMAIL || 'Persona @ calamina.cafe (no env) <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      text: text,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw error
    }

    return data
  } catch (err) {
    console.error('Email service error:', err)
  }
}
