import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLEAR = "transform,opacity,visibility";

/**
 * About page: "Meet our team" section ki entrance animation.
 * Hover par social icons ka slide-in CSS se hota hai (index.css: .team-social-btn).
 */
export function teamMotion(root) {
  const sec = root.querySelector("[data-team-section]");
  if (!sec) return () => {};
  sec.dataset.mDone = "1"; // generic modules is section ko dobara animate na karein

  const eyebrow = sec.querySelector("[data-team-eyebrow]");
  const title = sec.querySelector("[data-team-title]");
  const sub = sec.querySelector("[data-team-sub]");
  const head = sec.querySelector("[data-team-head]");
  const grid = sec.querySelector("[data-team-grid]");
  const cards = [...sec.querySelectorAll("[data-team-card]")];

  const tweens = [];

  // ---- Heading ----
  if (head) {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: { trigger: head, start: "top 88%", once: true },
    });
    if (eyebrow) tl.from(eyebrow, { autoAlpha: 0, y: -26, scale: 0.8, duration: 0.8, ease: "back.out(2)", clearProps: CLEAR }, 0);
    if (title) {
      tl.fromTo(
        title,
        { autoAlpha: 0, y: 70, skewY: 4, filter: "blur(12px)", clipPath: "inset(0 0 100% 0)" },
        { autoAlpha: 1, y: 0, skewY: 0, filter: "blur(0px)", clipPath: "inset(-25% -6% -25% -6%)", duration: 1.2, clearProps: "transform,opacity,visibility,filter,clipPath" },
        0.15
      );
    }
    if (sub) tl.from(sub, { autoAlpha: 0, y: 30, duration: 0.9, clearProps: CLEAR }, 0.5);
    tweens.push(tl);
  }

  // ---- Cards ----
  if (grid && cards.length) {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: { trigger: grid, start: "top 84%", once: true },
    });

    cards.forEach((card, i) => {
      const at = i * 0.17;
      const img = card.querySelector("[data-team-img]");
      const text = card.querySelector("[data-team-text]");

      // card: neeche se uthta hai (3D) + curtain reveal
      tl.fromTo(
        card,
        { autoAlpha: 0, y: 120, rotateX: -20, scale: 0.9, transformPerspective: 1000, transformOrigin: "50% 100%", clipPath: "inset(100% 0% 0% 0% round 32px)" },
        { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.3, clearProps: "transform,opacity,visibility,clipPath" },
        at
      );
      // photo: andar zoom-out
      if (img) tl.from(img, { scale: 1.4, duration: 1.9, ease: "power3.out", clearProps: "transform" }, at + 0.1);
      // naam / role: ek ek karke upar aate hain
      if (text) {
        tl.from([...text.children], { autoAlpha: 0, y: 36, duration: 0.85, stagger: 0.1, clearProps: CLEAR }, at + 0.6);
      }
    });
    tweens.push(tl);
  }

  return () => {
    tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    delete sec.dataset.mDone;
  };
}
