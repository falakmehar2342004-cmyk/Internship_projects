import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X, Phone, Mail } from "lucide-react";
import BrandLogo from "../ui/BrandLogo.jsx";
import Button from "../ui/Button.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

const links = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy", to: "/privacy-policy" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navClass = ({ isActive }) => `nav-link-item relative py-2 text-sm font-semibold transition-colors ${isActive ? "is-active text-[var(--brand-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"}`;

  return (
    <>
      {/* Contact-page inspired utility strip: language selector belongs here. */}
      <div className="site-topbar flex items-center justify-between gap-3 bg-[var(--brand-primary)] px-4 py-2 text-xs text-teal-100 sm:px-6 lg:px-10">
        <span className="hidden sm:block">⌖ Ocean Tower, Karachi · King Fahd Rd, Riyadh</span>
        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <a href="mailto:enterprise@nexmeg.com" className="hidden items-center gap-2 hover:text-white sm:inline-flex"><Mail size={13} /> enterprise@nexmeg.com</a>
          <label className="sr-only" htmlFor="site-language">Language</label>
          <select id="site-language" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Select language" className="site-language-select rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white outline-none transition hover:bg-white/15 focus:ring-2 focus:ring-teal-200">
            <option className="text-slate-900" value="en">English</option>
            <option className="text-slate-900" value="ar">العربية (السعودية)</option>
          </select>
        </div>
      </div>

      <header id="main-header" className="site-header sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--surface)]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <BrandLogo className="shrink-0" />
          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>{t(link.label)}</NavLink>)}
          </nav>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <a href="tel:+9221111639634" className="site-phone hidden items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border-soft)] px-3 py-2 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--brand-accent)] hover:text-[var(--brand-primary)] sm:inline-flex lg:text-sm">
              <Phone size={15} /> <span dir="ltr">+92 21 111 639 634</span>
            </a>
            <button type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"} className="nexmeg-focus grid size-10 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] text-[var(--text-primary)] transition hover:bg-[var(--brand-soft)]">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="hidden lg:block"><Button href="/#pricing" showIcon icon={ArrowUpRight}>{t("Start free trial")}</Button></div>
            <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)} className="nexmeg-focus grid size-10 shrink-0 place-items-center rounded-xl border border-[var(--border-soft)] text-[var(--text-primary)] xl:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-[var(--border-soft)] bg-[var(--surface)] px-5 py-4 xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-[var(--brand-soft)] text-[var(--brand-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--brand-soft)]"}`}>{t(link.label)}</NavLink>)}
              <a href="tel:+9221111639634" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--text-secondary)]"><Phone size={16} /><span dir="ltr">+92 21 111 639 634</span></a>
              <Button href="/#pricing" className="mt-2">{t("Start free trial")}</Button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
