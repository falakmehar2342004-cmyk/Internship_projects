import { Link } from "react-router-dom";
import code from "../page-behaviors.js?raw";
import usePageScript from "../hooks/usePageScript.js";
export default function Contact() {
  usePageScript(code, "contact");
  return (
    <div className="theme-contact bg-surface-muted font-sans text-on-surface antialiased selection:bg-teal-100 selection:text-teal-900">
      <main className="w-full pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="relative w-full h-[320px] sm:h-[390px] md:h-[440px] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center px-6">
            <img alt="Modern Architectural Headquarters" className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiuKQW1N71Up8ShypaxAhvcOL9vr1pF7nPGQ_YGmn8XZ_GmF2t4CjX7c7A1Kncm_dZkH4rnqU6-eghI9RcQhFS-ypFFxwpBj7OmJ1WmKLP48kPyj_RsROLuaV4IE52-sjCNPxuZ81Lz5OOpExIFU778XfloB-V80ds3YVWlSjPfdlqnxgiLsRCR1j0gTfeVRygtyVVntgVjGKKUB15sRLzUwn7iJ8_QyVweNFlaOUH" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-primary)]/60 via-[var(--brand-primary)]/70 to-[var(--brand-primary)]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.25)_0%,transparent_70%)]" />
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 drop-shadow-sm font-sans">
                Contact Us
              </h1>
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-teal-200/90 tracking-wide">
                <Link className="hover:text-white transition-colors" to="/">
                  Home
                </Link>
                {" "}
                <span className="text-teal-400 font-bold">
                  ·
                </span>
                {" "}
                <span className="text-white">
                  Contact Us
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(4,47,46,0.06)] border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[24px]">
                      mail
                    </span>
                  </div>
                  <a className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-600 group-hover:text-white transition-colors" href="mailto:support@nexmeg.com">
                    <span className="material-symbols-outlined text-[18px]">
                      north_east
                    </span>
                  </a>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Mail Us 24/7
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  support@nexmeg.com
                  <br />
                  {" "}enterprise@nexmeg.com
                  <br />
                  <span className="text-teal-600 font-medium">
                    Avg response &lt; 15 mins
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(4,47,46,0.06)] border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[24px]">
                      location_on
                    </span>
                  </div>
                  <a className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:scale-105 transition-transform" href="#map-section">
                    <span className="material-symbols-outlined text-[18px]">
                      north_east
                    </span>
                  </a>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Our Locations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Ocean Tower, Clifton, Karachi (PK)
                  <br />
                  {" "}King Fahd Rd, Al Olaya, Riyadh (KSA)
                  <br />
                  <span className="text-teal-600 font-medium">
                    Dual Sovereign Gateways
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(4,47,46,0.06)] border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[24px]">
                      call
                    </span>
                  </div>
                  <a className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-600 group-hover:text-white transition-colors" href="tel:+923000006394">
                    <span className="material-symbols-outlined text-[18px]">
                      north_east
                    </span>
                  </a>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Call Us 24/7
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  PK: +92 300 000-6394
                  <br />
                  {" "}KSA: +966 50 000-8800
                  <br />
                  <span className="text-teal-600 font-medium">
                    Toll-free priority PBX
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(4,47,46,0.06)] border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[24px]">
                      calendar_today
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      north_east
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Working Hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Mon to Sat: 09:00am - 06:00pm
                  <br />
                  {" "}Sunday: Tier-1 NOC Active
                  <br />
                  <span className="text-teal-600 font-medium">
                    Co-aligned PKT & AST
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center self-start px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-4">
                About Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 leading-[1.2] mb-4">
                Happy to Answer All Your Questions
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Connect directly with telecom route engineers and enterprise omnichannel specialists across Pakistan and Saudi Arabia for zero-drop campaign delivery.
              </p>
              <div className="relative w-full rounded-3xl overflow-hidden p-4 group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-tr from-slate-100 to-teal-50 border border-slate-100">
                  <img alt="nExMeg Sovereign Telecom Operations Center" className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF6gtkwaKTUAMp_436HB8AUSvKa5xb_nf2KtxRwiMGhIJjgLv5-Y4kNFAHzDuEIfArRioPn9EfmdgnosfAUq2LTxiR0iPZfY9ataKyCNSpHMJlK9h44_CgsWyN65yAUYHYuHtl9AfCQOx6ZcOtaIki3wrxqKE46P2ku3jlrVf4t6cREy4KOrkqZV1_Aqt9mTiWMAvw0D1qDicDzPfb2SeoIyHSmDF5ORmBnr_bicyT" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-1">
                      Infrastructure Hub
                    </span>
                    <p className="text-sm font-medium text-slate-100">
                      ISO 27001 Certified Multi-Cloud Telecom Routing Facilities in Karachi & Riyadh
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(4,47,46,0.06)] border border-slate-100 relative">
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-wider font-semibold text-teal-600 inline-block mb-1">
                    Feedback Form
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Do you have questions?
                  </h3>
                </div>
                <form className="flex flex-col gap-5" id="contactQueryForm" onSubmit={(event) => { event.preventDefault(); handleFormSubmit(); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input className="w-full h-12 px-6 rounded-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" id="clientName" placeholder="Name*" required="" type="text" />
                    </div>
                    <div>
                      <input className="w-full h-12 px-6 rounded-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" id="clientEmail" placeholder="Email ID*" required="" type="email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input className="w-full h-12 px-6 rounded-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all" id="clientAddress" placeholder="Address / Business Name*" required="" type="text" />
                    </div>
                    <div className="relative">
                      <select className="w-full h-12 px-6 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white appearance-none cursor-pointer transition-all" id="clientVolume">
                        <option disabled="" selected="" value="">
                          Select your Budget / Monthly Volume
                        </option>
                        <option value="50k">
                          &lt; 50,000 Messages / mo (Startup)
                        </option>
                        <option value="500k">
                          50,000 – 500,000 Messages / mo (Growth)
                        </option>
                        <option value="2M">
                          500,000 – 2,000,000 Messages / mo (Scale)
                        </option>
                        <option value="enterprise">
                          2,000,000+ Tier-1 Enterprise Delivery
                        </option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div>
                    <textarea className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none transition-all" id="clientMessage" placeholder="Message..." rows="5" defaultValue={""} />
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <input className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" id="saveCredentials" type="checkbox" />
                    <label className="text-xs text-slate-500 select-none cursor-pointer" htmlFor="saveCredentials">
                      Save my name, email, and website in this browser for the next time I comment & agree to PTA & KSA PDPL terms.
                    </label>
                  </div>
                  <div className="pt-2">
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium text-sm px-8 py-3.5 rounded-full shadow-lg shadow-teal-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0" type="submit">
                      <span>
                        Submit Query
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[15px]">
                          north_east
                        </span>
                      </div>
                    </button>
                  </div>
                </form>
                <div className="hidden absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 text-center z-10 transition-all" id="formSuccessToast">
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[32px]">
                      check_circle
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Query Received!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mb-6">
                    Thank you! Your query has been routed to our regional telecom consultants in Karachi and Riyadh. We usually reply within 1 business day.
                  </p>
                  <button className="px-6 py-2.5 rounded-full bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors" onClick={(event) => { dismissToast(); }}>
                    Send Another Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 border-y border-slate-200/80 py-10 bg-white/60 rounded-3xl">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Trusted by leading regional enterprises & operators
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                apartment
              </span>
              {" "}
              <span>
                REALESTATE
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                architecture
              </span>
              {" "}
              <span>
                URBAN ARCH
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                domain
              </span>
              {" "}
              <span>
                MODERN CO
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                corporate_fare
              </span>
              {" "}
              <span>
                CORP VENTURES
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                hub
              </span>
              {" "}
              <span>
                OMNI TRANSIT
              </span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="material-symbols-outlined text-[28px] text-teal-600">
                verified
              </span>
              {" "}
              <span>
                TELECOM CORE
              </span>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24" id="map-section">
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
            <svg className="absolute inset-0 w-full h-full object-cover opacity-85" preserveAspectRatio="none" viewBox="0 0 1000 500">
              <rect fill="#f8fafc" height="500" width="1000" />
              <path d="M 450 0 C 470 120 490 220 520 280 C 560 360 620 420 680 500 L 610 500 C 550 430 500 370 470 300 C 440 230 420 120 400 0 Z" fill="#e0f2fe" opacity="0.8" />
              <path d="M 280 320 C 310 380 360 440 420 500 L 320 500 C 270 450 230 400 200 340 Z" fill="#e0f2fe" opacity="0.6" />
              <g opacity="0.9" stroke="#e2e8f0" strokeWidth="2">
                <line x1="0" x2="1000" y1="90" y2="90" />
                <line x1="0" x2="1000" y1="180" y2="180" />
                <line x1="0" x2="1000" y1="270" y2="270" />
                <line x1="0" x2="1000" y1="360" y2="360" />
                <line x1="0" x2="1000" y1="450" y2="450" />
                <line x1="120" x2="120" y1="0" y2="500" />
                <line x1="240" x2="240" y1="0" y2="500" />
                <line x1="360" x2="360" y1="0" y2="500" />
                <line x1="480" x2="480" y1="0" y2="500" />
                <line x1="600" x2="600" y1="0" y2="500" />
                <line x1="720" x2="720" y1="0" y2="500" />
                <line x1="840" x2="840" y1="0" y2="500" />
              </g>
              <g opacity="0.6" stroke="#cbd5e1" strokeWidth="3">
                <line x1="0" x2="900" y1="40" y2="500" />
                <line x1="100" x2="1000" y1="0" y2="400" />
                <line x1="900" x2="100" y1="0" y2="500" />
              </g>
            </svg>
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="relative">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-60 -top-2 -left-2" />
                <div className="w-8 h-8 rounded-full bg-red-500 shadow-xl flex items-center justify-center text-white border-2 border-white">
                  <span className="material-symbols-outlined text-[18px]">
                    location_on
                  </span>
                </div>
              </div>
              <div className="mt-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-800">
                  Ocean Tower, Karachi
                </p>
                <p className="text-[11px] text-teal-600 font-semibold">
                  Tier-4 Sovereign Switch
                </p>
              </div>
            </div>
            <div className="absolute top-[36%] left-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-teal-600 shadow-xl flex items-center justify-center text-white border-2 border-white">
                  <span className="material-symbols-outlined text-[16px]">
                    domain
                  </span>
                </div>
              </div>
              <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 text-center hidden sm:block">
                <p className="text-xs font-bold text-slate-800">
                  Al Olaya, Riyadh (KSA)
                </p>
                <p className="text-[10px] text-teal-600 font-medium">
                  CITC Aligned Gateway
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
              <button className="w-10 h-10 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-teal-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
              </button>
              {" "}
              <button className="w-10 h-10 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-teal-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  remove
                </span>
              </button>
            </div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-3 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {" "}
              <span className="text-xs font-semibold text-slate-800">
                Local Routing Latency:{" "}
                <span className="text-teal-600 font-bold">
                  &lt; 38ms
                </span>
                {" "}across STC, Jazz, Mobily & Zong
              </span>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Everything You Need to Know
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Clear answers regarding free trial, multi-channel gateways, billing in PKR/SAR, and KSA/PTA compliance.
            </p>
          </div>
          <div className="flex flex-col gap-3" id="faqAccordion">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all">
              <button className="w-full p-5 sm:p-6 flex items-center justify-between text-left group" onClick={(event) => { toggleFaq(event.currentTarget); }} type="button">
                <span className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors text-base sm:text-lg">
                  1. Is there a free trial?
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-transform">
                  <span className="material-symbols-outlined text-[20px] transition-transform">
                    expand_more
                  </span>
                </div>
              </button>
              <div className="faq-content hidden px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                Yes! We offer a full-featured 14-day free trial with 500 test messages across WhatsApp and SMS routes. No credit card required to get started. You can build visual automated journeys and verify telco delivery in sandbox mode right away.
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all">
              <button className="w-full p-5 sm:p-6 flex items-center justify-between text-left group" onClick={(event) => { toggleFaq(event.currentTarget); }} type="button">
                <span className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors text-base sm:text-lg">
                  2. Which channels are supported?
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-transform">
                  <span className="material-symbols-outlined text-[20px] transition-transform">
                    expand_more
                  </span>
                </div>
              </button>
              <div className="faq-content hidden px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                All major regional touchpoints: WhatsApp Business Cloud API, Carrier SMS (Direct Telecom Transit via Jazz, Telenor, Zong, STC, Mobily, Zain), Automated Email, Social DMs (Instagram, Facebook, TikTok), and Click-to-WhatsApp Ads.
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all">
              <button className="w-full p-5 sm:p-6 flex items-center justify-between text-left group" onClick={(event) => { toggleFaq(event.currentTarget); }} type="button">
                <span className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors text-base sm:text-lg">
                  3. Can I pay natively in both PKR and SAR?
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-transform">
                  <span className="material-symbols-outlined text-[20px] transition-transform">
                    expand_more
                  </span>
                </div>
              </button>
              <div className="faq-content hidden px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                Yes! We support native payments in PKR (JazzCash, EasyPaisa, Direct IBFT) and SAR (Mada, STC Pay, Credit Cards) with local tax invoice issuance and compliant ZATCA / FBR e-invoicing compliance.
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all">
              <button className="w-full p-5 sm:p-6 flex items-center justify-between text-left group" onClick={(event) => { toggleFaq(event.currentTarget); }} type="button">
                <span className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors text-base sm:text-lg">
                  4. Where is my customer data stored and is it safe?
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-transform">
                  <span className="material-symbols-outlined text-[20px] transition-transform">
                    expand_more
                  </span>
                </div>
              </button>
              <div className="faq-content hidden px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                All data is encrypted in transit (TLS 1.3) and at rest (AES-256) inside sovereign enterprise cloud hosting with strict isolation. We strictly adhere to Saudi PDPL and Pakistan PTA telecommunications privacy regulations.
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="w-full rounded-3xl bg-[var(--brand-primary)] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-md z-10 text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
                Subscribe to our newsletter, Stay always in touch!
              </h3>
              <p className="text-sm text-teal-200/80">
                Get weekly carrier route updates, regulatory compliance alerts for PK/KSA, and high-conversion automation tactics.
              </p>
            </div>
            <div className="w-full lg:max-w-lg z-10">
              <form className="flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); alert('Subscribed successfully!'); }}>
                <div className="relative flex items-center">
                  <input className="w-full h-14 pl-6 pr-40 rounded-full bg-[#022020] border border-teal-800/80 text-white placeholder-teal-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Enter Your Email" required="" type="email" />
                  <button className="absolute right-1.5 h-11 px-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xs font-bold tracking-wide uppercase shadow-md transition-all" type="submit">
                    Subscribe Now
                  </button>
                </div>
                <div className="flex items-center gap-2 pl-2">
                  <input className="w-3.5 h-3.5 rounded border-teal-700 bg-teal-950 text-teal-500 focus:ring-teal-400 cursor-pointer" id="newsletterTerms" required="" type="checkbox" />
                  <label className="text-xs text-teal-200/80 cursor-pointer" htmlFor="newsletterTerms">
                    I have accepted the{" "}
                    <a className="text-teal-400 hover:underline" href="#">
                      Terms & Conditions
                    </a>
                    .
                  </label>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
