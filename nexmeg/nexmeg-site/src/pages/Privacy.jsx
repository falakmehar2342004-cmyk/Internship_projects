import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <main className="w-full pb-16 sm:pb-20 bg-[var(--page-bg)]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="privacy-page-hero relative w-full min-h-[280px] sm:min-h-[350px] md:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center px-5 sm:px-8">
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.45] contrast-[1.1]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiuKQW1N71Up8ShypaxAhvcOL9vr1pF7nPGQ_YGmn8XZ_GmF2t4CjX7c7A1Kncm_dZkH4rnqU6-eghI9RcQhFS-ypFFxwpBj7OmJ1WmKLP48kPyj_RsROLuaV4IE52-sjCNPxuZ81Lz5OOpExIFU778XfloB-V80ds3YVWlSjPfdlqnxgiLsRCR1j0gTfeVRygtyVVntgVjGKKUB15sRLzUwn7iJ8_QyVweNFlaOUH"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-primary)]/60 via-[var(--brand-primary)]/75 to-[var(--brand-primary)]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.25)_0%,transparent_70%)]" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[.2em] font-semibold text-teal-200 mb-3">Your information matters</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3">Privacy Policy</h1>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base font-medium text-teal-200/90 tracking-wide">
              <Link className="hover:text-white transition-colors" to="/">Home</Link>
              <span className="text-teal-400 font-bold">·</span>
              <span className="text-white">Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm p-5 sm:p-8 md:p-12 space-y-8">
          <div>
            <p className="text-sm text-teal-700 font-semibold mb-2">Last updated: November 1, 2026</p>
            <p className="text-slate-600 leading-7">This page explains, at a high level, how nExMeg may handle information when visitors browse the website or contact the team. The final policy should be reviewed and updated to reflect the services actually provided, the data collected, and the legal requirements that apply in each operating region.</p>
          </div>
          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Information you provide</h2>
            <p className="text-slate-600 leading-7">If you contact us, request a demo, or submit an enquiry, you may provide details such as your name, business contact information, company name, and the contents of your message.</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Website and usage information</h2>
            <p className="text-slate-600 leading-7">Our website hosting or analytics tools may process technical information such as browser type, device information, pages visited, and approximate usage data. Configure this section to accurately identify the cookies, analytics, and logging technologies used by the live website.</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How information may be used</h2>
            <p className="text-slate-600 leading-7">Information may be used to respond to enquiries, provide requested information, operate and secure the website, improve our services, and meet applicable legal obligations. We do not describe any specific processing activity here unless it has been confirmed as part of the actual business operation.</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Sharing and retention</h2>
            <p className="text-slate-600 leading-7">Information should only be shared with service providers or other parties where there is a valid business or legal reason and appropriate safeguards. Retention periods should be defined according to the purpose for which the information was collected and applicable law.</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your choices and contact</h2>
            <p className="text-slate-600 leading-7">Depending on applicable law, you may have rights to request access, correction, deletion, or restriction of certain personal information. To ask a privacy-related question, contact <a className="text-teal-700 font-semibold hover:underline" href="mailto:hello@nexmeg.com">hello@nexmeg.com</a>.</p>
          </article>
          <p className="text-xs sm:text-sm text-slate-500 border-t border-slate-100 pt-5">Important: This is starter website copy, not legal advice. Before publishing, confirm the actual data practices, cookie usage, processors, retention periods, and applicable privacy requirements with a qualified legal reviewer.</p>
        </div>
      </section>
    </main>
  );
}
