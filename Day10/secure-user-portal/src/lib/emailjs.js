
import emailjs from '@emailjs/browser';

// EmailJS ki public configuration environment variables se aayegi.
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Contact form ka data EmailJS template ko send karta hai.
export async function sendSupportEmail(values) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS configuration missing hai. Apni .env file check karein.'
    );
  }

  const templateParams = {
    user_name: values.name.trim(),
    user_email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };

  // Public key frontend mein use hoti hai; private key yahan mat rakhna.
  return emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
    limitRate: {
      id: 'support-form',
      throttle: 5000,
    },
  });
}
