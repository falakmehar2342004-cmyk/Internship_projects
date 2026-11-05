export default function CtaBanner() {
  return (
      <section className="py-16 lg:py-24" data-purpose="cta-banner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-deep)] to-[var(--brand-deep)] text-white rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl reveal-on-scroll">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-teal-500/20 pointer-events-none animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-[var(--brand-accent)]/25 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-domine text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                Ready to reach{" "}
                <span className="italic font-domine font-normal text-[var(--brand-accent-hover)]">
                  more
                </span>
                {" "}customers?
              </h2>
              <p className="text-teal-100/90 text-base md:text-lg mb-8 max-w-xl mx-auto font-domine">
                Start your free trial. No card required. Connect your audience channels in under 5 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a className="inline-block bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-deep)] font-bold px-8 py-4 rounded-full shadow-lg transition transform hover:-translate-y-1 font-domine pulse-btn" href="#pricing">
                  Start free trial
                </a>
              </div>
              <p className="mt-6 text-xs text-teal-200/60 font-domine">
                No credit card required • 14-day full access • 24/7 PK & KSA support
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}
