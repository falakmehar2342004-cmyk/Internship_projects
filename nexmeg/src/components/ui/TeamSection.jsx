import { Linkedin, Twitter, Mail } from "lucide-react";

/**
 * "Meet our team" section.
 * - Card par hover (ya touch/keyboard focus) karne par social icons card ke andar,
 *   right side se slide hoke aate hain (CSS: .team-social / .team-social-btn in index.css).
 * - Entrance animation `src/motion/team.js` se chalti hai (data-team-* attributes se).
 */
const members = [
  {
    name: "Tariq Al-Ansari",
    role: "Founder & CEO / Managing Director",
    alt: "Tariq Al-Ansari - Founder & CEO",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    tone: "dark",
  },
  {
    name: "Fahad Al-Otaibi",
    role: "Senior Business & Telecom Consultant",
    alt: "Fahad Al-Otaibi - Senior Business & Telecom Consultant",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    tone: "dark",
  },
  {
    name: "Zainab Malik",
    role: "Head of Product / Tech Advisor",
    alt: "Zainab Malik - Head of Product / Tech Advisor",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    tone: "green",
  },
  {
    name: "James Walker",
    role: "Financial & Compliance Advisor",
    alt: "James Walker - Financial & Compliance Advisor",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    tone: "dark",
  },
];

const socials = [
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/" },
  { label: "Twitter / X", Icon: Twitter, href: "https://x.com/" },
  { label: "Email", Icon: Mail, href: "mailto:hello@nexmeg.com" },
];

export default function TeamSection() {
  return (
    <section className="team-section relative py-24 bg-white border-t border-slate-200/80 overflow-hidden" data-team-section>
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-ocean-200/40 via-teal-100/40 to-transparent blur-3xl" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" data-team-head>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-50 text-ocean-700 text-xs font-semibold border border-ocean-200 mb-4" data-team-eyebrow>
            <span className="w-2 h-2 rounded-full bg-ocean-600" />
            THE PEOPLE BEHIND nExMeg
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight" data-team-title>
            Meet our team
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 font-normal" data-team-sub>
            Experienced minds. Structured solutions. Sustainable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-team-grid>
          {members.map((m) => (
            <article
              key={m.name}
              tabIndex={0}
              data-team-card
              className="team-card group relative h-[380px] sm:h-[420px] rounded-[32px] overflow-hidden bg-slate-900 cursor-pointer shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            >
              <img
                alt={m.alt}
                src={m.img}
                loading="lazy"
                data-team-img
                className="team-card-img absolute inset-0 h-full w-full object-cover"
              />
              <div
                className={
                  m.tone === "green"
                    ? "absolute inset-0 bg-gradient-to-t from-[#65a30d] via-[#65a30d]/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    : "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500"
                }
              />

              {/* Social icons: hover par right side se card ke andar slide hoke aate hain */}
              <div className="team-social absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3" data-team-social>
                {socials.map(({ label, Icon, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={`${m.name} on ${label}`}
                    title={label}
                    style={{ "--i": i }}
                    className="team-social-btn grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-[var(--brand-accent)] hover:text-[var(--brand-deep)] hover:border-transparent"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="team-card-text absolute bottom-6 left-6 right-6 z-10" data-team-text>
                <span className="team-card-line mb-3 block h-[3px] w-10 rounded-full bg-[var(--brand-accent)]" />
                <h3 className="font-heading text-xl font-bold text-white tracking-tight leading-snug">{m.name}</h3>
                <p className={`text-xs sm:text-sm font-normal mt-0.5 ${m.tone === "green" ? "text-emerald-100" : "text-slate-300"}`}>{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
