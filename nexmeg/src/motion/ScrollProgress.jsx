import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Page ke top par scroll progress bar */
export default function ScrollProgress() {
  const bar = useRef(null);
  useLayoutEffect(() => {
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left pointer-events-none"
      style={{ transform: "scaleX(0)", background: "linear-gradient(90deg,var(--brand-primary),var(--brand-accent))" }}
    />
  );
}
