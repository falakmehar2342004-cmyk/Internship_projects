import { Link } from "react-router-dom";
import { MessageCircleMore } from "lucide-react";

/** Shared brand mark so headers/footers never drift apart visually. */
export default function BrandLogo({ light = false, to = "/", className = "" }) {
  return (
    <Link to={to} aria-label="nExMeg home" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-primary)] text-white transition group-hover:-rotate-3 group-hover:scale-105">
        <MessageCircleMore size={22} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className={`font-hero-heading text-2xl font-extrabold tracking-tight ${light ? "text-white" : "text-[var(--text-primary)]"}`}>
        nEx<span className="text-[var(--brand-accent)]">Meg</span>
      </span>
    </Link>
  );
}
