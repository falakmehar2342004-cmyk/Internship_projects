/** Accessible icon-only button/link for consistent focus, size, and hover states. */
export default function IconButton({ icon: Icon, label, href, className = "", ...props }) {
  const classes = `nexmeg-focus inline-grid size-10 shrink-0 place-items-center rounded-full transition hover:bg-teal-900/10 hover:text-[var(--brand-accent)] ${className}`;
  if (href) return <a href={href} aria-label={label} title={label} className={classes} {...props}>{Icon && <Icon size={18} aria-hidden="true" />}</a>;
  return <button type="button" aria-label={label} title={label} className={classes} {...props}>{Icon && <Icon size={18} aria-hidden="true" />}</button>;
}
