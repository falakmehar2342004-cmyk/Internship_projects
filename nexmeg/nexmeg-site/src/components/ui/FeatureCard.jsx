import { ArrowUpRight } from "lucide-react";

/** Generic feature card: supply an icon component and content from each page. */
export default function FeatureCard({ icon: Icon, title, description, href, className = "" }) {
  const body = (
    <>
      {Icon && <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand-primary)]"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>}
      <h3 className="font-hero-heading text-xl font-bold text-[var(--text-primary)]">{title}</h3>
      {description && <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>}
      {href && <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">Learn more <ArrowUpRight size={16} aria-hidden="true" /></span>}
    </>
  );
  const classes = `nexmeg-card block p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl ${className}`;
  return href ? <a href={href} className={classes}>{body}</a> : <article className={classes}>{body}</article>;
}
