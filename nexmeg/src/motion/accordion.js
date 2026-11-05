import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Plus (+) icon wale accordions ko scroll ke sath ek ek karke kholta hai.
 * Dono tarah ke markup support karta hai:
 *   - Home  : .accordion-item[data-step] > .step-content  (display block/none)
 *   - Services: #accordion-root .accordion-item > .accordion-body (class "hidden")
 * Purane click handlers waise hi kaam karte rehte hain.
 */

const PLUS = "M12 5v14m-7-7h14";
const MINUS = "M19 12H5";

const bodyOf = (item) => item.querySelector(".step-content, .accordion-body");
const isHome = (item) => !!item.querySelector(".step-content");

const isOpen = (item) => {
  const body = bodyOf(item);
  if (!body) return false;
  return isHome(item)
    ? getComputedStyle(body).display !== "none"
    : !body.classList.contains("hidden");
};

function setIcon(item, open) {
  if (isHome(item)) {
    const svg = item.querySelector(".step-icon");
    if (svg) svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${open ? MINUS : PLUS}"></path>`;
    item.querySelector("button")?.setAttribute("aria-expanded", String(open));
  } else {
    const glyph = item.querySelector(".accordion-btn span");
    if (glyph) glyph.textContent = open ? "remove" : "add";
    item.setAttribute("data-expanded", String(open));
  }
  const wrap = item.querySelector(".step-toggle-btn, .accordion-btn");
  if (wrap) {
    gsap.fromTo(
      wrap,
      { scale: 0.7, rotate: open ? -120 : 120 },
      { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)", overwrite: "auto", clearProps: "transform" }
    );
  }
}

function setOpen(item, open) {
  const body = bodyOf(item);
  if (!body || isOpen(item) === open) return;
  const home = isHome(item);
  gsap.killTweensOf(body);
  setIcon(item, open);

  if (open) {
    if (home) body.style.display = "block";
    else body.classList.remove("hidden");
    gsap.fromTo(
      body,
      { height: 0, opacity: 0, overflow: "hidden" },
      { height: "auto", opacity: 1, duration: 0.75, ease: "power3.out", clearProps: "height,opacity,overflow" }
    );
    // andar ka content bhi halka sa upar aaye
    gsap.from(body.children, { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.1, ease: "power3.out", clearProps: "transform,opacity" });
    gsap.fromTo(item, { y: 6 }, { y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" });
  } else {
    body.style.overflow = "hidden";
    gsap.to(body, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        if (home) body.style.display = "none";
        else body.classList.add("hidden");
        gsap.set(body, { clearProps: "height,opacity,overflow" });
      },
    });
  }
}

export function scrollAccordion(items, { pinTarget, desktop }) {
  if (items.length < 2) return;
  const header = document.getElementById("main-header");
  const navH = header ? header.offsetHeight : 0;

  const activate = (index) =>
    items.forEach((item, i) => setOpen(item, i === index));

  const target = pinTarget || items[0].parentElement;
  const fits = () => target.offsetHeight <= window.innerHeight - navH - 24;

  if (desktop && fits()) {
    // ---- Pinned mode: section screen par ruk jata hai, scroll se items khulte hain ----
    let last = -1;
    ScrollTrigger.create({
      trigger: target,
      start: () => `center center+=${navH / 2}`,
      end: () => `+=${Math.round(items.length * window.innerHeight * 0.42)}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
        if (idx !== last) { last = idx; activate(idx); }
      },
    });
  } else {
    // ---- Fallback (mobile / bara section): har item apni jagah par aaye to khule ----
    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 62%",
        onEnter: () => activate(i),
        onLeaveBack: () => activate(Math.max(0, i - 1)),
      });
    });
  }
}
