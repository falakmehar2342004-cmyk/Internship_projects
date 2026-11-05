import { useState } from "react";

/** Shared, accessible orbit-style hero visual for About and Services. */
export default function HeroCircles({ title = "ABOUT" }) {
  const [active, setActive] = useState(null);
  const items = [
    { title: "Multi-Channel", subtitle: "WhatsApp, SMS & Email unified", tag: "01 / MULTI-CHANNEL" },
    { title: "Infrastructure", subtitle: "Direct PK & KSA Telecom Engine", tag: "02 / INFRASTRUCTURE" },
    { title: "Pure Trust", subtitle: "Saudi PDPL & PTA Compliant", tag: "03 / PURE TRUST" },
    { title: "AI Growth", subtitle: "Smart segments & journeys", tag: "04 / AI GROWTH" },
  ];
  return (
    <section className="orbit-hero" aria-label={`${title} interactive visual`}>
      <div className="orbit-watermark" aria-hidden="true">{title}</div>
      <div className="orbit-network" onMouseLeave={() => setActive(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
        <svg className="orbit-connectors" viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 140 C210 80 250 80 330 140 S470 200 580 140 S760 80 900 140" />
          <path d="M100 140 C250 235 360 220 500 140 S750 45 900 140" />
        </svg>
        {items.map((item, index) => (
          <button
            type="button"
            key={item.title}
            className={`orbit-circle orbit-circle-${index + 1}${active === index ? " is-focused" : ""}${active !== null && active !== index ? " is-muted" : ""}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(active === index ? null : index)}
            aria-pressed={active === index}
          >
            <span className="orbit-circle-glow" aria-hidden="true" />
            <span className="orbit-circle-content">
              <span className="orbit-number">0{index + 1}</span>
              <strong>{item.title}</strong>
              <span className="orbit-subtitle">{item.subtitle}</span>
              <small>{item.tag}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
