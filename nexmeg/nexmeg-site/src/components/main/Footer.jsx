import { ArrowUpRight } from "lucide-react";
import BrandLogo from "../ui/BrandLogo.jsx";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
      <footer className="bg-[var(--brand-deep)] text-white pt-20 pb-12 relative overflow-hidden border-t border-teal-950" data-purpose="main-footer" id="site-footer">
        <div className="absolute right-0 bottom-4 text-teal-900/15 font-hero-heading font-black text-[110px] md:text-[160px] lg:text-[210px] select-none pointer-events-none tracking-tighter leading-none pr-6 z-0">
          nExMeg
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-teal-900/40">
            <div className="lg:col-span-2 space-y-5">
              <BrandLogo light />
              <p className="text-teal-100/60 text-sm leading-relaxed max-w-sm font-domine">
                The multi-channel marketing infrastructure designed specifically for fast-growing businesses across Pakistan and Saudi Arabia.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {" "}
                <span className="text-xs text-teal-200/70 font-medium font-domine">
                  All regional systems operational
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-teal-300/80 font-bold block mb-4 font-domine">
                Main Menu
              </span>
              <ul className="space-y-3 text-sm text-teal-100/80 font-domine">
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition flex items-center justify-between group max-w-[130px]" href="#">
                    <span>
                      Home
                    </span>
                    {" "}
                    <ArrowUpRight size={15} className="text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition flex items-center justify-between group max-w-[130px]" href="#how-it-works">
                    <span>
                      How It Works
                    </span>
                    {" "}
                    <ArrowUpRight size={15} className="text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition flex items-center justify-between group max-w-[130px]" href="#features">
                    <span>
                      Services
                    </span>
                    {" "}
                    <ArrowUpRight size={15} className="text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition flex items-center justify-between group max-w-[130px]" href="#pricing">
                    <span>
                      Pricing
                    </span>
                    {" "}
                    <ArrowUpRight size={15} className="text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition flex items-center justify-between group max-w-[130px]" href="#articles">
                    <span>
                      Blog
                    </span>
                    {" "}
                    <ArrowUpRight size={15} className="text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-teal-300/80 font-bold block mb-4 font-domine">
                Legal & Rules
              </span>
              <ul className="space-y-2.5 text-sm text-teal-100/80 font-domine">
                <li>
                  <Link className="hover:text-[var(--brand-accent-hover)] transition" to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition" href="#">
                    Saudi PDPL Compliance
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition" href="#">
                    Pakistan Telecom (PTA) Rules
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-accent-hover)] transition" href="#">
                    Data Processing Addendum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-teal-300/80 font-bold block mb-4 font-domine">
                Contact Us
              </span>
              <div className="space-y-3 text-sm text-teal-100/80 font-domine">
                <div>
                  <span className="text-[11px] text-teal-300/60 uppercase block font-semibold">
                    Direct Email
                  </span>
                  {" "}
                  <a className="hover:text-[var(--brand-accent-hover)] font-medium transition" href="mailto:hello@nexmeg.com">
                    hello@nexmeg.com
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-teal-300/60 uppercase block font-semibold">
                    Pakistan Office
                  </span>
                  <p className="text-xs text-teal-100/70">
                    Gulberg III, Lahore, Pakistan
                    <br />
                    +92 42 3587 9000
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-teal-300/60 uppercase block font-semibold">
                    Saudi Arabia Office
                  </span>
                  <p className="text-xs text-teal-100/70">
                    King Fahd Rd, Riyadh, KSA
                    <br />
                    +966 11 234 5678
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-teal-200">
                  <a className="hover:text-white transition flex items-center gap-1" href="#">
                    <span>
                      WhatsApp
                    </span>
                    {" "}
                    <span>
                      ↗
                    </span>
                  </a>
                  {" "}
                  <a className="hover:text-white transition flex items-center gap-1" href="#">
                    <span>
                      Telegram
                    </span>
                    {" "}
                    <span>
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-teal-200/50 font-medium font-domine">
            <div>
              © 2025 nExMeg. All rights reserved.
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-6">
              <span>
                Built for Pakistan & Saudi Arabia
              </span>
              {" "}
              <a className="hover:text-teal-200 transition" href="#">
                Security
              </a>
              {" "}
              <a className="hover:text-teal-200 transition" href="#">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
