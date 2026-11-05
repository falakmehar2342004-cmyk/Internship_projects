import code from "../page-behaviors.js?raw";
import usePageScript from "../hooks/usePageScript.js";
import AeroShards from "../components/ui/AeroShards.jsx";

export default function Home() {
  usePageScript(code, "home");
  return (
    <main className="theme-home">
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-28 overflow-hidden hero-glow-mesh aero-shards-hero" data-purpose="hero-section">       <AeroShards />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center mb-6 animate-hero-up">
            <div className="home-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--brand-soft)] border border-teal-200/60 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-ping" />
              {" "}Multi-Channel Marketing Built for PK & KSA
            </div>
          </div>
          <div className="text-center max-w-5xl mx-auto mb-12 animate-hero-delay-1">
            <h1   data-gsap-hero-title
             className="font-hero-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight uppercase mb-5 leading-none">
              Creating{" "}
              <span className="text-[var(--brand-primary)] bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-accent)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                Digital
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto font-domine">
              Connect every customer everywhere
            </p>
            <div   data-gsap-hero-buttons className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-hero-delay-2">
              <a className="bg-[var(--brand-primary)] hover:bg-[var(--brand-deep)] text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-[var(--brand-primary)]/20 transition transform hover:-translate-y-0.5 flex items-center gap-2 group" href="#pricing">
                <span>
                  Start free trial
                </span>
                {" "}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </a>
              {" "}
              <a className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium px-6 py-3.5 rounded-full transition transform hover:-translate-y-0.5 flex items-center gap-2 shadow-sm" href="#how-it-works">
                <span>
                  Book a demo
                </span>
                {" "}
                <svg className="w-4 h-4 text-[var(--brand-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative max-w-6xl mx-auto animate-hero-delay-3">
<div  data-gsap-hero-box className="bg-white/90 backdrop-blur-md rounded-3xl p-6 lg:p-10 border border-teal-900/10 shadow-xl transition-all duration-500 hover:shadow-2xl hero-card-float">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-3 space-y-6">
                  <div className="relative w-24 h-24 flex items-center justify-center group cursor-pointer">
                    <svg className="w-24 h-24 text-teal-800/80 rotating-badge-text" viewBox="0 0 100 100">
                      <path d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" id="circlePath" />
                      <text className="text-[9px] font-bold uppercase tracking-[0.2em] fill-teal-900" fontFamily="Bricolage Grotesque">
                        <textPath href="#circlePath" startOffset="0%">
                          • DEMO VIDEO • TOUR •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--brand-accent)] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-hero-heading text-base font-extrabold text-slate-900 tracking-tight">
                        Our story
                      </span>
                      {" "}
                      <span className="h-[1.5px] w-12 bg-teal-600/40 inline-block" />
                    </div>
                    <p className="font-domine text-xs text-slate-500 leading-relaxed">
                      Specialized platform that helps businesses in Karachi, Lahore, Riyadh, & Jeddah establish verified customer direct messaging.
                    </p>
                  </div>
                  <div>
                    <a className="w-10 h-10 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-accent)] text-white flex items-center justify-center transition shadow-sm hover:rotate-12 duration-200" href="#how-it-works" title="Explore Platform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-6 relative">
                  <div className="uix-fluid-cutout bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-deep)] to-[var(--brand-deep)] p-6 lg:p-7 relative overflow-hidden shadow-2xl border border-teal-500/20 text-white min-h-[360px] flex flex-col justify-between">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--brand-accent)]/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--brand-accent-hover)]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-ping" />
                        {" "}
                        <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                          Live Campaign Hub
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-md border border-white/10 text-teal-100 font-domine">
                        Active Broadcast
                      </span>
                    </div>
                    <div className="relative z-10 my-4 grid grid-cols-2 gap-4 items-center">
                      <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition duration-300 flex flex-col items-center text-center cursor-pointer">
                        <div className="w-12 h-20 rounded-full bg-gradient-to-b from-[var(--brand-soft)] to-[var(--brand-accent-hover)]/40 border-2 border-white/40 flex flex-col items-center justify-center p-1 mb-2 shadow-inner">
                          <span className="w-4 h-2 rounded-t bg-teal-700/80 mb-1" />
                          {" "}
                          <span className="font-hero-heading font-black text-[9px] text-[var(--brand-deep)] leading-tight">
                            nEx
                          </span>
                          {" "}
                          <span className="text-[8px] font-bold text-teal-900 leading-none">
                            Reach
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-white font-domine block">
                          Weekend Biryani
                        </span>
                        {" "}
                        <span className="text-[9px] text-teal-200 font-domine">
                          ● Live in Lahore
                        </span>
                      </div>
                      <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg transform rotate-2 hover:rotate-0 hover:scale-105 transition duration-300 flex flex-col items-center text-center cursor-pointer">
                        <div className="w-12 h-20 rounded-full bg-gradient-to-b from-[var(--brand-soft)] to-[var(--brand-accent)]/50 border-2 border-white/40 flex flex-col items-center justify-center p-1 mb-2 shadow-inner">
                          <span className="w-4 h-2 rounded-t bg-teal-700/80 mb-1" />
                          {" "}
                          <span className="font-hero-heading font-black text-[9px] text-[var(--brand-deep)] leading-tight">
                            Meg
                          </span>
                          {" "}
                          <span className="text-[8px] font-bold text-teal-900 leading-none">
                            Sync
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-white font-domine block">
                          Riyadh VIP
                        </span>
                        {" "}
                        <span className="text-[9px] text-teal-200 font-domine">
                          +2,140 verified
                        </span>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="text-xs text-teal-200/90 font-domine">
                        Combined Reach:{" "}
                        <strong className="text-white font-hero-heading text-sm">
                          248,610
                        </strong>
                      </div>
                      <a className="bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-deep)] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md font-domine hover:scale-105" href="#features">
                        <span>
                          Know More
                        </span>
                        {" "}
                        <span aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-around h-full space-y-6 lg:pl-6">
                  <div className="border-b border-slate-100 pb-4 group">
                    <span className="font-hero-heading text-4xl lg:text-5xl font-extrabold text-[var(--brand-primary)] block group-hover:translate-x-1 transition duration-200">
                      12
                      <span className="text-[var(--brand-accent)]">
                        +
                      </span>
                    </span>
                    {" "}
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-domine mt-1 block">
                      Years Experience / Channels
                    </span>
                  </div>
                  <div className="border-b border-slate-100 pb-4 group">
                    <span className="font-hero-heading text-4xl lg:text-5xl font-extrabold text-[var(--brand-primary)] block group-hover:translate-x-1 transition duration-200">
                      800
                      <span className="text-[var(--brand-accent)]">
                        +
                      </span>
                    </span>
                    {" "}
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-domine mt-1 block">
                      Projects / Campaigns Done
                    </span>
                  </div>
                  <div className="group">
                    <span className="font-hero-heading text-4xl lg:text-5xl font-extrabold text-[var(--brand-primary)] block group-hover:translate-x-1 transition duration-200">
                      500
                      <span className="text-[var(--brand-accent)]">
                        +
                      </span>
                    </span>
                    {" "}
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-domine mt-1 block">
                      Happy Clients in PK & KSA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-[#F4F8F7] border-y border-ocean-deep/5 relative overflow-hidden" data-purpose="how-it-works" id="how-it-works">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14 lg:mb-16 reveal-on-scroll">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
              {" "}
              <span className="text-xs uppercase tracking-widest font-bold text-[var(--brand-primary)] font-domine">
                How It Works
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h2 data-gsap-how-title className="font-hero-heading text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                  Live in three{" "}
                  <span className="text-[var(--brand-primary)] italic font-domine">
                    simple
                  </span>
                  {" "}steps
                </h2>
              </div>
              <p data-gsap-how-text className="text-slate-600 text-sm md:text-base font-domine max-w-md leading-relaxed">
                From first connection to first sale, in minutes. No complex technical setups or lengthy configurations.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4 flex items-center justify-center relative py-4 sm:py-6 reveal-on-scroll">
              <div data-gsap-spheres className="relative w-72 h-72 flex items-center justify-center" >
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/25 to-[var(--brand-primary)]/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute w-44 h-44 rounded-full chroma-sphere transform -translate-x-4 -translate-y-2 relative overflow-hidden border border-white/40">
                  <div className="absolute top-4 left-6 w-14 h-9 bg-white/60 rounded-full blur-[2px] transform -rotate-45" />
                  <div className="absolute bottom-6 right-5 w-8 h-8 rounded-full bg-teal-300/40 blur-sm" />
                  <div className="absolute bottom-3 left-8 w-12 h-6 rounded-full bg-[var(--brand-primary)]/30 blur-sm" />
                </div>
                <div className="absolute w-24 h-24 rounded-full chroma-sphere bottom-2 left-2 border border-white/50 shadow-2xl">
                  <div className="absolute top-2 left-3 w-7 h-4 bg-white/70 rounded-full blur-[1px] transform -rotate-45" />
                </div>
                <div className="absolute w-28 h-28 rounded-full chroma-sphere top-2 right-4 border border-white/50 shadow-2xl">
                  <div className="absolute top-3 left-4 w-9 h-5 bg-white/70 rounded-full blur-[1px] transform -rotate-45" />
                </div>
                <div className="absolute w-14 h-14 rounded-full chroma-sphere bottom-6 right-10 border border-white/40">
                  <div className="absolute top-1.5 left-2 w-4 h-2.5 bg-white/75 rounded-full blur-[1px]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white/95 backdrop-blur-md border border-teal-900/10 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                  {" "}
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-hero-heading">
                    Zero friction
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-0 border-t border-slate-300/80 reveal-on-scroll">
              <div className="accordion-item border-b border-slate-300/80 transition-all duration-300 group py-2" data-step="1">
                <button aria-expanded="true" className="w-full text-left py-6 px-2 flex items-center justify-between gap-4 cursor-pointer focus:outline-none" onClick={(event) => { toggleStep(1); }} type="button">
                  <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    <div className="shrink-0 font-hero-heading text-lg sm:text-2xl font-bold tracking-tight">
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'{'}
                      </span>
                      <span className="text-[var(--brand-primary)] font-black">
                        01
                      </span>
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'}'}
                      </span>
                    </div>
                    <h3 className="font-hero-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight group-hover:text-[var(--brand-primary)] transition-colors truncate">
                      Connect your channels
                    </h3>
                  </div>
                  <div className="step-toggle-btn shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-teal-700/30 group-hover:border-[var(--brand-primary)] flex items-center justify-center text-[var(--brand-primary)] transition-all duration-300 bg-white shadow-sm">
                    <svg className="step-icon w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <div className="step-content pl-12 sm:pl-20 pr-4 pb-6 transition-all duration-300 ease-in-out" style={{"display": "block"}}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-teal-900/10 shadow-sm max-w-2xl">
                    <p className="font-domine text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                      Link WhatsApp, SMS, email and social accounts in one place with single-click regional gateways.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand-primary)] text-xs font-bold font-domine border border-teal-200/60">
                        <span>
                          Instant sync
                        </span>
                        {" "}
                        <svg className="w-3.5 h-3.5 text-[var(--brand-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {" "}
                      <span className="text-xs text-slate-500 font-domine hidden sm:inline">
                        Takes ~90 seconds
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-b border-slate-300/80 transition-all duration-300 group py-2" data-step="2">
                <button aria-expanded="false" className="w-full text-left py-6 px-2 flex items-center justify-between gap-4 cursor-pointer focus:outline-none" onClick={(event) => { toggleStep(2); }} type="button">
                  <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    <div className="shrink-0 font-hero-heading text-lg sm:text-2xl font-bold tracking-tight">
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'{'}
                      </span>
                      <span className="text-[var(--brand-primary)] font-black">
                        02
                      </span>
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'}'}
                      </span>
                    </div>
                    <h3 className="font-hero-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight group-hover:text-[var(--brand-primary)] transition-colors truncate">
                      Build your campaign
                    </h3>
                  </div>
                  <div className="step-toggle-btn shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-teal-700/30 group-hover:border-[var(--brand-primary)] flex items-center justify-center text-[var(--brand-primary)] transition-all duration-300 bg-white shadow-sm">
                    <svg className="step-icon w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <div className="step-content pl-12 sm:pl-20 pr-4 pb-6 transition-all duration-300 ease-in-out hidden" style={{"display": "none"}}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-teal-900/10 shadow-sm max-w-2xl">
                    <p className="font-domine text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                      Choose your audience, write the message, schedule it, and personalize offers by city and locale.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand-primary)] text-xs font-bold font-domine border border-teal-200/60">
                        <span>
                          Smart templates included
                        </span>
                        {" "}
                        <svg className="w-3.5 h-3.5 text-[var(--brand-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {" "}
                      <span className="text-xs text-slate-500 font-domine hidden sm:inline">
                        Pre-approved by PTA & CITC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item border-b border-slate-300/80 transition-all duration-300 group py-2" data-step="3">
                <button aria-expanded="false" className="w-full text-left py-6 px-2 flex items-center justify-between gap-4 cursor-pointer focus:outline-none" onClick={(event) => { toggleStep(3); }} type="button">
                  <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    <div className="shrink-0 font-hero-heading text-lg sm:text-2xl font-bold tracking-tight">
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'{'}
                      </span>
                      <span className="text-[var(--brand-primary)] font-black">
                        03
                      </span>
                      <span className="text-[var(--brand-accent)] font-extrabold">
                        {'}'}
                      </span>
                    </div>
                    <h3 className="font-hero-heading text-2xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight group-hover:text-[var(--brand-primary)] transition-colors truncate">
                      Track and grow
                    </h3>
                  </div>
                  <div className="step-toggle-btn shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-teal-700/30 group-hover:border-[var(--brand-primary)] flex items-center justify-center text-[var(--brand-primary)] transition-all duration-300 bg-white shadow-sm">
                    <svg className="step-icon w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <div className="step-content pl-12 sm:pl-20 pr-4 pb-6 transition-all duration-300 ease-in-out hidden" style={{"display": "none"}}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-teal-900/10 shadow-sm max-w-2xl">
                    <p className="font-domine text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                      Watch opens, clicks and orders on one live dashboard with comprehensive conversion attribution.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand-primary)] text-xs font-bold font-domine border border-teal-200/60">
                        <span>
                          Real-time reporting
                        </span>
                        {" "}
                        <svg className="w-3.5 h-3.5 text-[var(--brand-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {" "}
                      <span className="text-xs text-slate-500 font-domine hidden sm:inline">
                        Multi-channel ROI tracking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-[var(--page-bg)] relative overflow-hidden" data-purpose="features" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-primary)] bg-[var(--brand-soft)] px-3.5 py-1 rounded-full border border-teal-200/50">
              Features
            </span>
            <h2 data-gsap-features-title className="font-domine text-3xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Everything to grow,{" "}
              <span className="italic font-domine text-[var(--brand-primary)]">
                nothing
              </span>
              {" "}extra
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-domine">
              Built for businesses that want maximum results without unnecessary complexity. Click any capability below to explore.
            </p>
          </div>
          <div  data-gsap-showcase className="relative max-w-5xl mx-auto mb-10 reveal-on-scroll">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--brand-deep)] text-white shadow-2xl border border-teal-900/40 min-h-[440px] md:min-h-[480px] flex items-center" id="feature-showcase-stage">
              <div className="feature-slide absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-between p-8 md:p-12 z-10" id="slide-0" style={{"opacity": "1", "pointerEvents": "auto"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-deep)] via-[var(--brand-deep)]/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 overflow-hidden opacity-30 md:opacity-75 pointer-events-none flex items-center justify-end pr-4 md:pr-12">
                  <div className="w-80 md:w-96 rounded-2xl bg-[var(--brand-primary)]/80 border border-teal-500/30 p-5 shadow-2xl backdrop-blur-md transform rotate-2 hover:rotate-0 transition duration-500">
                    <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 text-xs text-teal-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-ping" />
                        {" "}Live Broadcast Hub
                      </span>
                      {" "}
                      <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded">
                        All Channels
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span className="flex items-center gap-2">
                          <span>
                            💬
                          </span>
                          {" "}WhatsApp Direct
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          98.4% Delivered
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span className="flex items-center gap-2">
                          <span>
                            📱
                          </span>
                          {" "}Priority SMS
                        </span>
                        {" "}
                        <span className="text-teal-200 font-bold">
                          14,800 Sent
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span className="flex items-center gap-2">
                          <span>
                            ✉️
                          </span>
                          {" "}Email Digest
                        </span>
                        {" "}
                        <span className="text-teal-200 font-bold">
                          42% Open Rate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-20 max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent-hover)] text-xs font-bold uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    {" "}Unified Orchestration
                  </div>
                  <h3 className="font-hero-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    Multi-channel campaigns
                  </h3>
                  <p className="font-domine text-teal-100/80 text-base md:text-lg leading-relaxed">
                    Send from one place to every channel. Coordinate broadcast announcements over WhatsApp, SMS, and newsletters without managing 5 separate tabs.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Unified Compose
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Cross-channel sync
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-[var(--brand-accent)] text-[var(--brand-deep)] font-bold">
                      1-Click Dispatch
                    </span>
                  </div>
                </div>
              </div>
              <div className="feature-slide absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-between p-8 md:p-12 z-10" id="slide-1" style={{"opacity": "0", "pointerEvents": "none"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-deep)] via-[var(--brand-deep)]/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 overflow-hidden opacity-30 md:opacity-75 pointer-events-none flex items-center justify-end pr-4 md:pr-12">
                  <div className="w-80 md:w-96 rounded-2xl bg-[var(--brand-deep)]/80 border border-teal-500/30 p-5 shadow-2xl backdrop-blur-md transform -rotate-1 hover:rotate-0 transition duration-500">
                    <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 text-xs text-teal-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--brand-accent-hover)]" />
                        {" "}Geographic Clusters
                      </span>
                      {" "}
                      <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded">
                        RFM Active
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          📍 Riyadh Olaya VIPs
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          8,410 Profiles
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          📍 Lahore DHA Repeat Foodies
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          16,290 Profiles
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          📍 Karachi Clifton High LTV
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          11,940 Profiles
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-20 max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent-hover)] text-xs font-bold uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    {" "}Precision Targeting
                  </div>
                  <h3 className="font-hero-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    Smart audiences
                  </h3>
                  <p className="font-domine text-teal-100/80 text-base md:text-lg leading-relaxed">
                    Segments by city, behaviour and interest. Drill down into VIP customers in Riyadh or repeat foodies in Lahore with localized filters and automated tags.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      City Segmentation
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      RFM Modeling
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-[var(--brand-accent)] text-[var(--brand-deep)] font-bold">
                      Dynamic Cohorts
                    </span>
                  </div>
                </div>
              </div>
              <div className="feature-slide absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-between p-8 md:p-12 z-10" id="slide-2" style={{"opacity": "0", "pointerEvents": "none"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-deep)] via-[var(--brand-deep)]/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 overflow-hidden opacity-30 md:opacity-75 pointer-events-none flex items-center justify-end pr-4 md:pr-12">
                  <div className="w-80 md:w-96 rounded-2xl bg-[var(--brand-primary)]/80 border border-teal-500/30 p-5 shadow-2xl backdrop-blur-md transform rotate-1 hover:rotate-0 transition duration-500">
                    <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 text-xs text-teal-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                        {" "}Auto-Flow Trigger
                      </span>
                      {" "}
                      <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded">
                        Autonomous
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs">
                        <div className="text-teal-200 font-bold mb-1">
                          ⚡ Cart Abandonment Auto-Reply
                        </div>
                        <div className="text-[11px] text-teal-100/70">
                          "Salam! Your cart is waiting with 10% off"
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs">
                        <div className="text-teal-200 font-bold mb-1">
                          🤖 Multilingual Copy Assistant
                        </div>
                        <div className="text-[11px] text-teal-100/70">
                          Tuned for Urdu, Saudi Arabic, and English
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-20 max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent-hover)] text-xs font-bold uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    {" "}Hands-Free Engine
                  </div>
                  <h3 className="font-hero-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    AI automation
                  </h3>
                  <p className="font-domine text-teal-100/80 text-base md:text-lg leading-relaxed">
                    Welcome, reminder and win-back flows that run on their own. Intelligent copy recommendations tailored to Pakistani and Gulf consumer phrases.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Auto-Pilot Triggers
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Multilingual AI
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-[var(--brand-accent)] text-[var(--brand-deep)] font-bold">
                      24/7 Conversion
                    </span>
                  </div>
                </div>
              </div>
              <div className="feature-slide absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-between p-8 md:p-12 z-10" id="slide-3" style={{"opacity": "0", "pointerEvents": "none"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-deep)] via-[var(--brand-deep)]/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 overflow-hidden opacity-30 md:opacity-75 pointer-events-none flex items-center justify-end pr-4 md:pr-12">
                  <div className="w-80 md:w-96 rounded-2xl bg-[var(--brand-deep)]/80 border border-teal-500/30 p-5 shadow-2xl backdrop-blur-md transform -rotate-1 hover:rotate-0 transition duration-500">
                    <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 text-xs text-teal-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-ping" />
                        {" "}Real-Time Attribution
                      </span>
                      {" "}
                      <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded">
                        Live Map
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          📊 Gross Attributed Revenue
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          Rs. 4.8M / ﷼68K
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          🎯 Coupon Redemption Rate
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          23.6%
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-xl border border-white/10 text-xs">
                        <span>
                          ⚡ Average Response Time
                        </span>
                        {" "}
                        <span className="text-[var(--brand-accent-hover)] font-bold">
                          &lt; 3 mins
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-20 max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent-hover)] text-xs font-bold uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    {" "}Instant Insights
                  </div>
                  <h3 className="font-hero-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    Live analytics
                  </h3>
                  <p className="font-domine text-teal-100/80 text-base md:text-lg leading-relaxed">
                    Opens, clicks and revenue in real time. Accurately pinpoint which WhatsApp coupon led to orders in your physical store or eCommerce checkout.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Live Click-Maps
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/10">
                      Revenue Attribution
                    </span>
                    {" "}
                    <span className="px-3 py-1.5 rounded-xl bg-[var(--brand-accent)] text-[var(--brand-deep)] font-bold">
                      POS Sync
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="feature-nav-btn active px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-[var(--brand-primary)] text-white border-[var(--brand-accent)] shadow-md font-domine cursor-pointer" onClick={(event) => { switchFeatureSlide(0); }} type="button">
                <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] indicator-dot" />
                  {" "}Multi-channel
                </span>
                {" "}
                <span className="text-xs text-teal-300 hidden sm:inline">
                  01
                </span>
              </button>
              {" "}
              <button className="feature-nav-btn px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-white text-slate-700 border-slate-200 hover:border-teal-500/40 font-domine cursor-pointer" onClick={(event) => { switchFeatureSlide(1); }} type="button">
                <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300 indicator-dot" />
                  {" "}Smart audiences
                </span>
                {" "}
                <span className="text-xs text-slate-400 hidden sm:inline">
                  02
                </span>
              </button>
              {" "}
              <button className="feature-nav-btn px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-white text-slate-700 border-slate-200 hover:border-teal-500/40 font-domine cursor-pointer" onClick={(event) => { switchFeatureSlide(2); }} type="button">
                <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300 indicator-dot" />
                  {" "}AI automation
                </span>
                {" "}
                <span className="text-xs text-slate-400 hidden sm:inline">
                  03
                </span>
              </button>
              {" "}
              <button className="feature-nav-btn px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-white text-slate-700 border-slate-200 hover:border-teal-500/40 font-domine cursor-pointer" onClick={(event) => { switchFeatureSlide(3); }} type="button">
                <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300 indicator-dot" />
                  {" "}Live analytics
                </span>
                {" "}
                <span className="text-xs text-slate-400 hidden sm:inline">
                  04
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-[#F4F8F7] border-y border-ocean-deep/5" data-purpose="pricing" id="pricing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-primary)] bg-[var(--brand-soft)] px-3.5 py-1 rounded-full border border-teal-200/50">
              Pricing
            </span>
            <h2  data-gsap-pricing-title className="font-domine text-3xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Simple plans that{" "}
              <span className="italic font-domine text-[var(--brand-primary)]">
                scale
              </span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 font-domine">
              No hidden fees. Upgrade or cancel anytime. Choose your operating currency below:
            </p>
            <div className="inline-flex p-1 bg-white border border-slate-200 rounded-full shadow-sm" role="group">
              <button className="px-6 py-2 rounded-full text-sm font-bold transition bg-[var(--brand-primary)] text-white shadow-sm font-domine" id="btn-pkr" onClick={(event) => { setCurrency('PKR'); }}>
                PKR (Rs)
              </button>
              {" "}
              <button className="px-6 py-2 rounded-full text-sm font-bold transition text-slate-600 hover:text-slate-900 font-domine" id="btn-sar" onClick={(event) => { setCurrency('SAR'); }}>
                SAR (﷼)
              </button>
            </div>
          </div>
          <div data-gsap-pricing-cards className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch reveal-on-scroll">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1 font-domine">
                  Starter
                </span>
                <div className="my-4">
                  <span className="currency-label text-sm text-slate-500 font-semibold align-top mr-1 font-domine">
                    PKR
                  </span>
                  {" "}
                  <span className="price-val font-domine text-4xl font-extrabold text-slate-900" data-pkr="4,999" data-sar="65">
                    4,999
                  </span>
                  {" "}
                  <span className="text-slate-500 text-sm font-medium font-domine">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-domine">
                  Essential essentials for growing local retail shops.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-6 font-domine">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      5,000 messages / mo
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      2 channels (WhatsApp + SMS)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Basic analytics
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 rounded-xl border border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold text-sm hover:bg-[var(--brand-soft)] transition font-domine">
                Choose Starter
              </button>
            </div>
            <div className="bg-[var(--brand-primary)] text-white rounded-3xl p-7 border-2 border-[var(--brand-accent)] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2 hover:-translate-y-3 transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--brand-accent)] text-[var(--brand-deep)] font-bold uppercase tracking-wider text-[11px] px-3.5 py-1 rounded-full shadow-md font-domine">
                Most Popular
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-200 font-bold block mb-1 font-domine">
                  Growth
                </span>
                <div className="my-4">
                  <span className="currency-label text-sm text-teal-200 font-semibold align-top mr-1 font-domine">
                    PKR
                  </span>
                  {" "}
                  <span className="price-val font-domine text-4xl font-extrabold text-white" data-pkr="12,999" data-sar="170">
                    12,999
                  </span>
                  {" "}
                  <span className="text-teal-200 text-sm font-medium font-domine">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-teal-100/80 mb-6 font-domine">
                  Designed for multi-branch restaurants and eCommerce brands.
                </p>
                <ul className="space-y-3 text-sm text-teal-100 mb-8 border-t border-teal-800/80 pt-6 font-domine">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent-hover)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      25,000 messages / mo
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent-hover)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      4 channels active
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent-hover)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Automation flows included
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent-hover)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      City & Segment targeting
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3.5 px-4 rounded-xl bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-deep)] font-bold text-sm shadow-md transition font-domine">
                Choose Growth
              </button>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1 font-domine">
                  Pro
                </span>
                <div className="my-4">
                  <span className="currency-label text-sm text-slate-500 font-semibold align-top mr-1 font-domine">
                    PKR
                  </span>
                  {" "}
                  <span className="price-val font-domine text-4xl font-extrabold text-slate-900" data-pkr="29,999" data-sar="395">
                    29,999
                  </span>
                  {" "}
                  <span className="text-slate-500 text-sm font-medium font-domine">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-domine">
                  High-volume campaigns with complete autonomous triggers.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-6 font-domine">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      100,000 messages / mo
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      All channels enabled
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      AI Automation suite
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Advanced revenue analytics
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 rounded-xl border border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold text-sm hover:bg-[var(--brand-soft)] transition font-domine">
                Choose Pro
              </button>
            </div>
            <div className="bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1 font-domine">
                  Enterprise
                </span>
                <div className="my-4">
                  <span className="font-domine text-4xl font-extrabold text-slate-900">
                    Custom
                  </span>
                  {" "}
                  <span className="text-slate-500 text-sm font-medium font-domine">
                    / bespoke
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-domine">
                  Omnichannel scale for regional franchises and retail chains.
                </p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-6 font-domine">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Unlimited monthly reach
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Dedicated account manager
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Custom CRM/POS integrations
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                    </svg>
                    {" "}
                    <span>
                      Priority 24/7 SLA support
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition font-domine">
                Contact Sales
              </button>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-sm font-medium text-slate-500 font-domine">
              No hidden fees. Cancel anytime. All plans include regional compliance assurance for PTA & CITC.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28" data-purpose="blog" id="articles">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 reveal-on-scroll">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-primary)] bg-[var(--brand-soft)] px-3.5 py-1 rounded-full border border-teal-200/50">
                Blog
              </span>
              <h2 data-gsap-articles-title className="font-domine text-3xl md:text-5xl font-bold text-slate-900 mt-3">
                Latest{" "}
                <span className="italic font-domine text-[var(--brand-primary)]">
                  articles
                </span>
              </h2>
              <p className="text-slate-600 mt-2 text-base md:text-lg font-domine">
                Practical marketing ideas for restaurants, retail and online brands in the region.
              </p>
            </div>
            <a className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-accent)] transition font-domine group" href="#blog">
              <span>
                View all posts
              </span>
              {" "}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </a>
          </div>
          <div  data-gsap-article-cards className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-on-scroll">
            <article data-gsap-article-card className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-teal-500/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
              <div data-gsap-article-icon>
                <div  className="h-10 w-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand-primary)] flex items-center justify-center font-bold text-xs mb-6 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors duration-300 font-domine shadow-sm">
                  WA
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] font-domine">
                  Strategy
                </span>
                <h3 className="font-domine text-xl font-bold text-slate-900 mt-2 mb-3 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  How to write a WhatsApp offer that gets replies
                </h3>
                <p className="text-slate-600 font-domine text-sm leading-relaxed mb-6">
                  Learn the exact high-converting copy framework and CTA positioning used by leading hospitality brands.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium font-domine">
                <span>
                  5 min read
                </span>
                {" "}
                <a className="inline-flex items-center gap-1 text-[var(--brand-primary)] font-bold group-hover:text-[var(--brand-accent)] transition-colors" href="#">
                  Read more{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </article>
            <article className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-teal-500/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
              <div data-gsap-article-icon>
                <div  className="h-10 w-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand-primary)] flex items-center justify-center font-bold text-xs mb-6 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors duration-300 font-domine shadow-sm">
                  TIM
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] font-domine">
                  Regional Insights
                </span>
                <h3 className="font-domine text-xl font-bold text-slate-900 mt-2 mb-3 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Best times to send campaigns in Pakistan and KSA
                </h3>
                <p className="text-slate-600 font-domine text-sm leading-relaxed mb-6">
                  Analysis of over 4 million broadcast messages across Karachi, Lahore, and Riyadh to reveal peak open windows.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium font-domine">
                <span>
                  7 min read
                </span>
                {" "}
                <a className="inline-flex items-center gap-1 text-[var(--brand-primary)] font-bold group-hover:text-[var(--brand-accent)] transition-colors" href="#">
                  Read more{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </article>
            <article className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-teal-500/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
              <div data-gsap-article-icon>
                <div className="h-10 w-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand-primary)] flex items-center justify-center font-bold text-xs mb-6 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors duration-300 font-domine shadow-sm">
                  LST
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] font-domine">
                  Compliance & Growth
                </span>
                <h3 className="font-domine text-xl font-bold text-slate-900 mt-2 mb-3 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Building an opt-in list the right way
                </h3>
                <p className="text-slate-600 font-domine text-sm leading-relaxed mb-6">
                  Stay fully compliant with Saudi PDPL regulations and Pakistan telecom guidelines while multiplying verified buyers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium font-domine">
                <span>
                  4 min read
                </span>
                {" "}
                <a className="inline-flex items-center gap-1 text-[var(--brand-primary)] font-bold group-hover:text-[var(--brand-accent)] transition-colors" href="#">
                  Read more{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
