/** Shared heading block for page sections. */
export default function SectionHeading({ eyebrow, title, description, align = "center", className = "" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`mx-auto flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-[var(--brand-soft)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)]">{eyebrow}</span>}
      <h2 className="font-hero-heading text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">{description}</p>}
    </div>
  );
}
