import { forwardRef } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

/**
 * Reusable button/link visual. Use `href` for navigation and `onClick` for actions.
 * `variant` supports primary, secondary, outline, and ghost.
 */
const Button = forwardRef(function Button(
  { children, href, variant = "primary", size = "md", icon: Icon = ArrowRight, showIcon = false, loading = false, className = "", type = "button", ...props },
  ref
) {
  const variants = {
    primary: "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] shadow-md shadow-teal-950/10",
    secondary: "bg-[var(--brand-accent)] text-[var(--brand-deep)] hover:bg-[var(--brand-accent-hover)]",
    outline: "border border-[var(--border-soft)] bg-white text-[var(--text-primary)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-primary)]",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-teal-50 hover:text-[var(--brand-primary)]",
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-3 text-sm", lg: "px-7 py-3.5 text-base" };
  const classes = `nexmeg-focus inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
  const content = <>{loading ? <LoaderCircle size={17} className="animate-spin" aria-hidden="true" /> : children}{showIcon && !loading && <Icon size={17} aria-hidden="true" />}</>;
  if (href) return <a ref={ref} className={classes} href={href} {...props}>{content}</a>;
  return <button ref={ref} type={type} className={classes} disabled={loading || props.disabled} {...props}>{content}</button>;
});

export default Button;
