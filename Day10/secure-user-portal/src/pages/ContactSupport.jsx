
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react';

import { sendSupportEmail } from '../lib/emailjs';

// Form data ko submit karne se pehle validate karna.
const supportSchema = z.object({
  name: z.string().trim().min(2, 'Name kam az kam 2 characters ka ho.'),
  email: z.string().trim().email('Valid email enter karein.'),
  subject: z.string().trim().min(3, 'Subject kam az kam 3 characters ka ho.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message kam az kam 10 characters ka ho.')
    .max(2000, 'Message 2000 characters se zyada nahi ho sakta.'),
});

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-indigo-900';

const labelClass =
  'mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200';

export default function ContactSupport() {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Valid form data ko EmailJS ke zariye send karna.
  async function onSubmit(values) {
    if (sending) return;

    setSending(true);

    try {
      await sendSupportEmail(values);

      toast.success('Your support message has been sent!');
      reset();
    } catch (error) {
      console.error('EmailJS error:', error);

      toast.error(
        error instanceof Error
          ? error.message
          : 'Email send nahi ho saki. Configuration check karein.'
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="px-0 py-2 sm:px-2">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Secure User Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Support
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Have a question or need assistance? Send our support team a
            message and we will get back to you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Information panel */}
          <aside className="rounded-3xl bg-gradient-to-br from-indigo-700 to-violet-800 p-7 text-white shadow-xl sm:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <MessageSquare size={28} />
            </div>

            <h2 className="text-2xl font-bold">
              How can we help?
            </h2>

            <p className="mt-3 leading-7 text-indigo-100">
              Tell us what you need help with. Please do not include
              passwords, OTP codes, or other sensitive account credentials.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Email support</p>
                  <p className="mt-1 text-sm text-indigo-100">
                    Your message will be sent to the configured support email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Your security matters</p>
                  <p className="mt-1 text-sm text-indigo-100">
                    Never share your password or authentication codes.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Send us a message
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className={`${inputClass} pl-10`}
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputClass} pl-10`}
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  placeholder="How can we help?"
                  className={inputClass}
                  aria-invalid={Boolean(errors.subject)}
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your question or issue..."
                  className={`${inputClass} resize-y`}
                  aria-invalid={Boolean(errors.message)}
                  {...register('message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <LoaderCircle className="animate-spin" size={19} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Please do not include passwords or OTP codes in your message.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
