import code from "../page-behaviors.js?raw";
import usePageScript from "../hooks/usePageScript.js";
import HeroCircles from "../components/ui/HeroCircles.jsx";
import TeamSection from "../components/ui/TeamSection.jsx";

export default function About() {
  usePageScript(code, "about");
  return (
    <div className="theme-about bg-[var(--surface-muted)] text-slate-800 font-sans antialiased selection:bg-ocean-200 selection:text-ocean-950">
      <main>
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden bg-gradient-to-b from-[#f0fdfa]/80 via-[var(--surface-muted)] to-white border-b border-slate-200/70 text-slate-800">
          <div className="absolute inset-0 grid-dots-light pointer-events-none opacity-40" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] bg-gradient-to-r from-ocean-200/50 via-teal-100/40 to-ocean-100/30 blur-3xl pointer-events-none rounded-full pulse-glow" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean-100/80 border border-ocean-200 shadow-sm text-xs font-semibold text-ocean-800 mb-5">
                <span className="w-2 h-2 rounded-full bg-ocean-600 animate-pulse" />
                {" "}
                <span>
                  ABOUT US • BUILT FOR PK & KSA
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-spruce-900 tracking-tight leading-[1.15] mb-5">
                The Story Behind Customer Respect & Regional Precision
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                nExMeg is built for businesses in Pakistan and Saudi Arabia that want to talk to their customers directly and with respect. We saw that small and mid-sized businesses get lost between many separate tools, so we brought everything into one clear platform.
              </p>
            </div>
            <HeroCircles title="ABOUT" />
            <div className="relative w-full max-w-5xl mx-auto mt-6" data-purpose="auregon-circles-container">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="hero-hollow-watermark font-heading select-none uppercase">
                  ABOUT
                </span>
              </div>
              <div className="hidden lg:flex flex-col gap-3 absolute -left-4 top-1/2 -translate-y-1/2 z-30 floating-badge">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg shadow-ocean-950/5 flex items-center gap-2.5 text-xs font-semibold text-slate-700 border border-ocean-200/80">
                  <span className="w-6 h-6 rounded-full bg-ocean-100 text-ocean-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  {" "}
                  <span>
                    Zero Spam Routes
                  </span>
                </div>
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg shadow-ocean-950/5 flex items-center gap-2.5 text-xs font-semibold text-slate-700 border border-ocean-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {" "}
                  <span>
                    100% PTA & CITC
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex flex-col gap-3 absolute -right-4 top-1/2 -translate-y-1/2 z-30 floating-badge" style={{"animationDelay": "-2s"}}>
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg shadow-ocean-950/5 flex items-center gap-2.5 text-xs font-semibold text-slate-700 border border-ocean-200/80">
                  <svg className="w-4 h-4 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  {" "}
                  <span>
                    Direct WhatsApp API
                  </span>
                </div>
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg shadow-ocean-950/5 flex items-center gap-2.5 text-xs font-semibold text-slate-700 border border-ocean-200/80">
                  <span className="text-ocean-600 font-bold">
                    99.4%
                  </span>
                  {" "}
                  <span>
                    Verified Delivery
                  </span>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center -space-x-8 sm:-space-x-14 md:-space-x-16 overflow-hidden py-12 px-2">
                <div className="circle-drop-1 flex-shrink-0 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-[2px] bg-gradient-to-tr from-teal-500/40 via-teal-300/20 to-white/10 shadow-2xl shadow-black/40 flex items-center justify-center group transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#121c22] via-[#0b1216] to-[#04080a] flex flex-col items-center justify-center p-6 text-center border border-teal-500/30 shadow-[inset_0_4px_25px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 group-hover:border-teal-400 group-hover:shadow-[0_0_35px_rgba(20,184,166,0.35),inset_0_0_20px_rgba(20,184,166,0.2)]">
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-teal-500/15 rounded-full blur-xl pointer-events-none group-hover:bg-teal-400/30 transition-all duration-500" />
                    <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 pointer-events-none z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-teal-400/30 flex items-center justify-center mb-2 sm:mb-3 text-teal-300 shadow-inner">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-xs sm:text-sm font-bold text-white leading-tight">
                        Multi-Channel
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-300 mt-1 max-w-[130px] hidden sm:block">
                        WhatsApp, SMS & Email unified
                      </p>
                      <span className="mt-2 text-[9px] font-bold text-teal-300 uppercase tracking-widest bg-teal-950/70 border border-teal-500/40 px-2 py-0.5 rounded-full">
                        01 / Multi-Channel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="circle-drop-2 flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-[2px] bg-gradient-to-tr from-teal-400/50 via-teal-300/20 to-white/15 shadow-2xl shadow-black/50 flex items-center justify-center group transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#131f26] via-[#0c1419] to-[#05090c] flex flex-col items-center justify-center p-6 text-center border border-teal-400/40 shadow-[inset_0_4px_30px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-300 group-hover:border-teal-300 group-hover:shadow-[0_0_40px_rgba(45,212,191,0.4),inset_0_0_25px_rgba(45,212,191,0.25)]">
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-400/15 rounded-full blur-xl pointer-events-none group-hover:bg-teal-300/30 transition-all duration-500" />
                    <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 pointer-events-none z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-teal-400/40 shadow-inner flex items-center justify-center mb-2 sm:mb-3 text-teal-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-xs sm:text-base font-bold text-white leading-tight">
                        Infrastructure
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-300 mt-1 max-w-[140px] hidden sm:block">
                        Direct PK & KSA Telecom Engine
                      </p>
                      <span className="mt-2 text-[9px] font-bold text-teal-300 uppercase tracking-widest bg-teal-950/70 border border-teal-500/40 px-2 py-0.5 rounded-full">
                        02 / Infrastructure
                      </span>
                    </div>
                  </div>
                </div>
                <div className="circle-drop-3 flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-[2px] bg-gradient-to-tr from-emerald-400/50 via-teal-300/20 to-white/15 shadow-2xl shadow-black/50 flex items-center justify-center group transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#121f24] via-[#0b1419] to-[#04090c] flex flex-col items-center justify-center p-6 text-center border border-emerald-400/40 shadow-[inset_0_4px_30px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-300 group-hover:border-emerald-300 group-hover:shadow-[0_0_40px_rgba(52,211,153,0.4),inset_0_0_25px_rgba(52,211,153,0.25)]">
                    <div className="absolute -top-12 left-1/3 w-32 h-32 bg-emerald-400/15 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-300/30 transition-all duration-500" />
                    <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 pointer-events-none z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-emerald-400/40 shadow-inner flex items-center justify-center mb-2 sm:mb-3 text-emerald-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-xs sm:text-base font-bold text-white leading-tight">
                        Pure Trust
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-300 mt-1 max-w-[140px] hidden sm:block">
                        Saudi PDPL & PTA Compliant
                      </p>
                      <span className="mt-2 text-[9px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        03 / Pure Trust
                      </span>
                    </div>
                  </div>
                </div>
                <div className="circle-drop-4 flex-shrink-0 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-[2px] bg-gradient-to-tr from-teal-500/40 via-teal-300/20 to-white/10 shadow-2xl shadow-black/40 flex items-center justify-center group transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#121c22] via-[#0b1216] to-[#04080a] flex flex-col items-center justify-center p-6 text-center border border-teal-500/30 shadow-[inset_0_4px_25px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 group-hover:border-teal-400 group-hover:shadow-[0_0_35px_rgba(20,184,166,0.35),inset_0_0_20px_rgba(20,184,166,0.2)]">
                    <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-teal-500/15 rounded-full blur-xl pointer-events-none group-hover:bg-teal-400/30 transition-all duration-500" />
                    <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 pointer-events-none z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-teal-400/30 shadow-inner flex items-center justify-center mb-2 sm:mb-3 text-teal-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-xs sm:text-sm font-bold text-white leading-tight">
                        AI Growth
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-300 mt-1 max-w-[130px] hidden sm:block">
                        Smart segments & journeys
                      </p>
                      <span className="mt-2 text-[9px] font-bold text-teal-300 uppercase tracking-widest bg-teal-950/70 border border-teal-500/40 px-2 py-0.5 rounded-full">
                        04 / AI Growth
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14 w-full relative overflow-hidden py-3 bg-white/80 backdrop-blur-md border-y border-slate-200/90 shadow-sm rounded-2xl">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-spruce-900">
                    12M+
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    Opted-in contacts reached
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-ocean-50/60 border border-ocean-200/70 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-ocean-700">
                    99.4%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-700">
                    Direct route deliverability
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-spruce-900">
                    100%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    Saudi PDPL & PTA compliant
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-teal-50/60 border border-teal-200/70 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-teal-800">
                    4 Unified
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-700">
                    WhatsApp, SMS, Email & Voice
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {" "}
                  <span className="font-heading text-sm font-bold text-spruce-900">
                    Zero Spam Routes
                  </span>
                  {" "}
                  <span className="text-xs text-slate-500">
                    Direct Carrier Interconnects
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-ocean-700">
                    99.98%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    High SLA Telecom Uptime
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-spruce-900">
                    12M+
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    Opted-in contacts reached
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-ocean-50/60 border border-ocean-200/70 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-ocean-700">
                    99.4%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-700">
                    Direct route deliverability
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-spruce-900">
                    100%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    Saudi PDPL & PTA compliant
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-teal-50/60 border border-teal-200/70 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-teal-800">
                    4 Unified
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-700">
                    WhatsApp, SMS, Email & Voice
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {" "}
                  <span className="font-heading text-sm font-bold text-spruce-900">
                    Zero Spam Routes
                  </span>
                  {" "}
                  <span className="text-xs text-slate-500">
                    Direct Carrier Interconnects
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="font-heading text-lg font-extrabold text-ocean-700">
                    99.98%
                  </span>
                  {" "}
                  <span className="text-xs font-medium text-slate-600">
                    High SLA Telecom Uptime
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-50 text-ocean-700 text-xs font-semibold border border-ocean-200 mb-3">
                <span>
                  FOUNDATION STORY
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-spruce-900 tracking-tight">
                Our story
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Eliminating messaging fragmentation across South Asia and the GCC with direct local pipelines.
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto space-y-6 sm:space-y-8">
              <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-ocean-500 via-teal-400 to-slate-200 pointer-events-none" />
              <div className="relative md:ml-0 group transition-all duration-300">
                <div className="bg-gradient-to-br from-spruce-900 via-spruce-950 to-slate-900 text-white rounded-3xl p-6 sm:p-9 shadow-xl border border-teal-500/30 hover:border-teal-400 relative overflow-hidden">
                  <div className="absolute -right-16 -top-16 w-60 h-60 bg-ocean-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-ocean-400/35 transition-all duration-700" />
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/40 flex items-center justify-center font-heading font-black text-xs">
                        01
                      </span>
                      <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                        {" "}
                        <span>
                          Origin & Core Philosophy
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-ocean-200 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      Active Pipeline • 6 Nodes Live
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-6">
                    “nExMeg is built for businesses in Pakistan and Saudi Arabia that want to talk to their customers directly and with respect. We saw that small and mid-sized businesses get lost between many separate tools, so we brought everything into one clear platform.”
                  </p>
                  <div className="pt-5 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
                        Our Mission
                      </span>
                      <p className="font-heading text-base sm:text-lg font-bold text-white mt-0.5">
                        Make marketing simple, measurable and customer-friendly.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-teal-200">
                        Karachi
                      </span>
                      {" "}
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-teal-200">
                        Lahore
                      </span>
                      {" "}
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-teal-200">
                        Islamabad
                      </span>
                      {" "}
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-ocean-200">
                        Riyadh
                      </span>
                      {" "}
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-ocean-200">
                        Jeddah
                      </span>
                      {" "}
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-ocean-200">
                        Dammam
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative md:ml-12 group transition-all duration-300">
                <div className="bg-ocean-50/50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-ocean-200 flex-shrink-0 flex items-center justify-center font-heading font-black text-ocean-700 text-sm shadow-sm group-hover:bg-ocean-600 group-hover:text-white group-hover:border-ocean-600 transition-all duration-300">
                      02
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ocean-600">
                        Principle One
                      </span>
                      <h3 className="font-heading text-xl font-bold text-spruce-900 group-hover:text-ocean-700 transition-colors">
                        Clarity
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Simple, transparent metrics and zero clutter. Know exact spend and verified conversion across every subscriber touchpoint.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ocean-100/80 text-ocean-800 border border-ocean-200">
                      Transparent ROI
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative md:ml-24 group transition-all duration-300">
                <div className="bg-ocean-50/50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-ocean-200 flex-shrink-0 flex items-center justify-center font-heading font-black text-ocean-700 text-sm shadow-sm group-hover:bg-ocean-600 group-hover:text-white group-hover:border-ocean-600 transition-all duration-300">
                      03
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ocean-600">
                        Principle Two
                      </span>
                      <h3 className="font-heading text-xl font-bold text-spruce-900 group-hover:text-ocean-700 transition-colors">
                        Consent First
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Consent first: messages go only to customers who opted in. Every single message has an immediate, transparent way to opt out.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                      100% Opted-In
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative md:ml-36 group transition-all duration-300">
                <div className="bg-ocean-50/50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-ocean-200 flex-shrink-0 flex items-center justify-center font-heading font-black text-ocean-700 text-sm shadow-sm group-hover:bg-ocean-600 group-hover:text-white group-hover:border-ocean-600 transition-all duration-300">
                      04
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ocean-600">
                        Principle Three
                      </span>
                      <h3 className="font-heading text-xl font-bold text-spruce-900 group-hover:text-ocean-700 transition-colors">
                        Local Understanding
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Local understanding: tuned for real consumer habits and regional peak hours across Karachi, Lahore, Riyadh & Jeddah.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ocean-100/80 text-ocean-800 border border-ocean-200">
                      Bilingual & Native
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative md:ml-48 group transition-all duration-300">
                <div className="bg-ocean-50/50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-ocean-200 flex-shrink-0 flex items-center justify-center font-heading font-black text-ocean-700 text-sm shadow-sm group-hover:bg-ocean-600 group-hover:text-white group-hover:border-ocean-600 transition-all duration-300">
                      05
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ocean-600">
                        Principle Four
                      </span>
                      <h3 className="font-heading text-xl font-bold text-spruce-900 group-hover:text-ocean-700 transition-colors">
                        Results Over Noise
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Results over noise: measurable ROI instead of empty notifications. High-impact deliveries that convert respectful engagements into revenue.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                      High Conversion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TeamSection />
        <section className="py-20 bg-[var(--surface-muted)] border-t border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {" "}
                  <span>
                    REGULATORY RIGOR & TRUST
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-spruce-900 tracking-tight">
                  Institutional Compliance & Direct Trust
                </h2>
                <p className="text-slate-600 text-base mt-2">
                  Built from day one to exceed telecommunications standards and sovereign data protection statutes across Pakistan and Saudi Arabia.
                </p>
              </div>
              <div className="flex items-center gap-3 self-start md:self-end">
                <button aria-label="Previous Slide" className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-ocean-50 hover:border-ocean-300 text-slate-700 hover:text-ocean-700 shadow-sm flex items-center justify-center transition-all focus:outline-none" id="slider-prev">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </button>
                {" "}
                <button aria-label="Next Slide" className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-ocean-50 hover:border-ocean-300 text-slate-700 hover:text-ocean-700 shadow-sm flex items-center justify-center transition-all focus:outline-none" id="slider-next">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden py-2">
              <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-4" id="compliance-slider-track">
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      ✓
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Consent First
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Consent first: messages go only to customers who opted in. Every single dispatch incorporates immediate one-click opt-out and verified consent logs.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      Standard Core
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      🔒
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Privacy by Design
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Privacy by design: data is encrypted end-to-end and used only for your account. We never sell, share, or broker your customer datasets.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      ISO 27001 Ready
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      🇸🇦
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Saudi PDPL Compliant
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Saudi PDPL: we handle Saudi customer data strictly in line with Personal Data Protection Law statutes, preserving national data residency and CITC protocols.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      CITC Direct Route
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      🇵🇰
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Pakistan Data Rules
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Pakistan data rules: we strictly follow Pakistani telecommunications laws, DND registries, and official PTA registered alphanumeric sender IDs.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      PTA Registered
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      ⚡
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Platform Policies
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Platform policies: we follow the strict compliance policies of WhatsApp Business API, Meta tech terms, and Tier-1 carrier networks.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      Verified Tier-1
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-7 rounded-3xl bg-white border border-ocean-100 hover:border-ocean-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-700 border border-ocean-200 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-colors shadow-sm">
                      🛡️
                    </div>
                    <h3 className="font-heading text-lg font-bold text-spruce-900 mb-2 group-hover:text-ocean-700 transition-colors">
                      Sovereign Encryption
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Strict at-rest AES-256 and in-transit TLS 1.3 encryption tokenization, ensuring zero leakage across regional telecom gateways.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-ocean-700 uppercase">
                    <span>
                      Zero-Trust Protocol
                    </span>
                    {" "}
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6" id="slider-dots">
              <span className="slider-dot w-6 h-2 rounded-full bg-ocean-600 transition-all cursor-pointer" />
              {" "}
              <span className="slider-dot w-2 h-2 rounded-full bg-slate-200 hover:bg-ocean-300 transition-all cursor-pointer" />
              {" "}
              <span className="slider-dot w-2 h-2 rounded-full bg-slate-200 hover:bg-ocean-300 transition-all cursor-pointer" />
              {" "}
              <span className="slider-dot w-2 h-2 rounded-full bg-slate-200 hover:bg-ocean-300 transition-all cursor-pointer" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
