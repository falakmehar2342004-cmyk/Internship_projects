
import emailjs from '@emailjs/browser'

export function isEmailJsConfigured() {
  return Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  )
}

export async function sendEmail({ to, subject, message, fromName }) {
  if (!isEmailJsConfigured()) {
    throw new Error(
      'EmailJS is not configured. Add your EmailJS settings first.',
    )
  }

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: to,
      subject,
      message,
      from_name: fromName || 'Pulse Dashboard',
    },
    {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  )
}
