import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLEAR = "transform,opacity,visibility";
const dirX = () => (document.documentElement.dir === "rtl" ? -1 : 1);

/**
 * NAVBAR: har page khulne par (dobara bhi) chalta hai.
 * Topbar neeche aati hai, logo side se, Home / About / Services... links UPAR se
 * ek ek karke girte hain, phir phone / theme / CTA buttons.
 */
export function navbar() {
  const header = document.getElementById("main-header");
  if (!header) return () => {};

  const topbar = document.querySelector("[data-nav-topbar]");
  const logo = header.firstElementChild?.firstElementChild;
  const links = [...header.querySelectorAll("[data-nav-links] > a")];
  const actions = header.querySelector("[data-nav-actions]");
  const actionItems = actions ? [...actions.children] : [];

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  if (topbar) {
    tl.from(topbar, { y: -36, autoAlpha: 0, duration: 0.8, clearProps: CLEAR }, 0);
  }
  tl.from(header, { y: -26, autoAlpha: 0, duration: 0.8, clearProps: CLEAR }, 0.05);
  if (logo) {
    tl.from(logo, { x: -40 * dirX(), autoAlpha: 0, duration: 0.9, clearProps: CLEAR }, 0.2);
  }
  if (links.length) {
    // upar se aate hain: Home pehle, phir baqi
    tl.from(
      links,
      { y: -46, autoAlpha: 0, rotateX: -60, transformPerspective: 600, duration: 0.85, stagger: 0.09, ease: "back.out(1.7)", clearProps: CLEAR },
      0.3
    );
  }
  if (actionItems.length) {
    tl.from(actionItems, { y: -30, autoAlpha: 0, scale: 0.85, duration: 0.8, stagger: 0.1, clearProps: CLEAR }, 0.55);
  }
  return () => tl.kill();
}

/**
 * FOOTER: scroll par rounded card se khulta hai, phir har column ke items
 * stagger se uthte hain, bara "nExMeg" watermark side se aata hai, aakhir mein bottom bar.
 */
export function footerMotion(foot) {
  if (!foot) return () => {};
  foot.dataset.mDone = "1"; // baqi generic modules footer ko dobara animate na karein

  const mark = foot.querySelector(":scope > .absolute");
  const wrap = foot.querySelector(":scope > .relative") || foot.querySelector(".max-w-7xl");
  const grid = wrap?.firstElementChild;
  const bar = wrap?.lastElementChild;
  const cols = grid ? [...grid.children] : [];

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    scrollTrigger: { trigger: foot, start: "top 94%", once: true },
  });

  tl.fromTo(
    foot,
    { clipPath: "inset(10% 3% 0% 3% round 56px 56px 0px 0px)" },
    { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1.3, clearProps: "clipPath" },
    0
  );

  if (mark) tl.from(mark, { xPercent: 22 * dirX(), autoAlpha: 0, duration: 1.8, ease: "power3.out", clearProps: CLEAR }, 0.1);

  cols.forEach((col, i) => {
    const items = [...col.children].flatMap((c) =>
      c.tagName === "UL" || c.classList.contains("space-y-3") ? [...c.children] : [c]
    );
    tl.from(items, { autoAlpha: 0, y: 46, duration: 0.95, stagger: 0.07, clearProps: CLEAR }, 0.2 + i * 0.13);
  });

  if (grid) {
    // grid ke neeche wali line: left se right draw
    tl.fromTo(grid, { "--footer-line": 0 }, { "--footer-line": 1, duration: 1.2, ease: "power2.out" }, 0.4);
  }
  if (bar) {
    tl.from([...bar.children], { autoAlpha: 0, y: 26, duration: 0.8, stagger: 0.14, clearProps: CLEAR }, "-=0.55");
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    delete foot.dataset.mDone;
  };
}
