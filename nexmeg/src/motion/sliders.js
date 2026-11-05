import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLEAR = "transform,opacity,visibility";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const dirX = () => (document.documentElement.dir === "rtl" ? -1 : 1);
const noop = () => {};

/** ScrollTrigger ki progress (0-1) par page ko smoothly scroll karwao */
function scrollToProgress(st, p) {
  const y = st.start + (st.end - st.start) * clamp(p);
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Section se track tak ke parents: sab se bara (jo screen par fit ho) pin karte hain */
function pickPinTarget(track, section, navH) {
  const avail = window.innerHeight - navH - 12;
  const chain = [];
  for (let el = track.parentElement; el && el !== section.parentElement; el = el.parentElement) chain.unshift(el);
  const candidates = [section, ...chain.filter((el) => el !== section)];
  const el = candidates.find((c) => c.offsetHeight <= avail);
  return el ? { el, isSection: el === section } : null;
}

/* ------------------------------------------------------------------ *
 *  1) Horizontal sliders (About: compliance cards, Services: ecosystem circles)
 *     Section screen par PIN ho jata hai, scroll karne par saari slides ek ek
 *     karke move hoti hain, sab slides ke baad page agle section par jata hai.
 *     Arrows / dots abhi bhi kaam karte hain (page ko us slide tak scroll karte hain).
 * ------------------------------------------------------------------ */
const TRACKS = [
  {
    track: "#compliance-slider-track",
    prev: "#slider-prev",
    next: "#slider-next",
    dots: "#slider-dots .slider-dot", // dots ki classes purana script scroll event par khud badalta hai
    step: 360,
  },
  {
    track: "#circular-slider",
    prev: "#carousel-prev-btn",
    next: "#carousel-next-btn",
    dots: "#carousel-dots button",
    dotOn: "w-3 h-3 rounded-full bg-teal-600 transition-all cursor-pointer",
    dotOff: "w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer",
    step: 340,
  },
];

export function horizontalSliders(root, { navH = 0, pin = true } = {}) {
  if (!pin) return noop;
  const cleanups = [];

  TRACKS.forEach((cfg) => {
    const track = root.querySelector(cfg.track);
    const section = track?.closest("section");
    if (!track || !section) return;

    const max = () => Math.max(0, track.scrollWidth - track.clientWidth);
    if (max() < 24) return;

    const target = pickPinTarget(track, section, navH);
    if (!target) return;

    // Native scroll/snap band: ab movement sirf page-scroll se control hogi
    const saved = { snap: track.style.scrollSnapType, beh: track.style.scrollBehavior, ox: track.style.overflowX };
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";
    track.style.overflowX = "hidden";
    track.scrollLeft = 0;

    const dotEls = [...section.querySelectorAll(cfg.dots)];
    let lastDot = -1;
    const updateDots = (p) => {
      if (!cfg.dotOn || !dotEls.length) return;
      const idx = Math.round(p * (dotEls.length - 1));
      if (idx === lastDot) return;
      lastDot = idx;
      dotEls.forEach((d, i) => (d.className = i === idx ? cfg.dotOn : cfg.dotOff));
    };

    const state = { x: 0 };
    const setX = gsap.quickTo(state, "x", {
      duration: 0.65,
      ease: "power3.out",
      onUpdate: () => (track.scrollLeft = state.x * dirX()),
    });

    const st = ScrollTrigger.create({
      trigger: target.el,
      start: () => (target.isSection ? `top top+=${navH}` : `center center+=${navH / 2}`),
      end: () => `+=${Math.round(Math.max(window.innerHeight * 0.9, max() * 1.15))}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setX(self.progress * max());
        updateDots(self.progress);
      },
      onRefresh: (self) => {
        state.x = self.progress * max();
        track.scrollLeft = state.x * dirX();
        updateDots(self.progress);
      },
    });

    // Arrows / dots: capture phase mein pakad kar page scroll karwate hain
    const onClick = (e) => {
      const t = e.target;
      if (!t.closest) return;
      const m = max() || 1;
      if (t.closest(cfg.prev)) {
        e.preventDefault(); e.stopPropagation();
        scrollToProgress(st, st.progress - cfg.step / m);
      } else if (t.closest(cfg.next)) {
        e.preventDefault(); e.stopPropagation();
        scrollToProgress(st, st.progress + cfg.step / m);
      } else {
        const dot = t.closest(cfg.dots);
        if (dot && dotEls.includes(dot)) {
          e.preventDefault(); e.stopPropagation();
          scrollToProgress(st, dotEls.indexOf(dot) / Math.max(1, dotEls.length - 1));
        }
      }
    };
    section.addEventListener("click", onClick, true);

    cleanups.push(() => {
      section.removeEventListener("click", onClick, true);
      st.kill();
      track.style.scrollSnapType = saved.snap;
      track.style.scrollBehavior = saved.beh;
      track.style.overflowX = saved.ox;
      track.scrollLeft = 0;
    });
  });

  return () => cleanups.forEach((c) => c());
}

/* ------------------------------------------------------------------ *
 *  2) Home: Feature showcase (4 slides)
 *     Section pin hota hai, scroll se slide 1 -> 2 -> 3 -> 4 badalti hain,
 *     aakhri slide ke baad page aage badhta hai. Auto-advance timer band rehta hai.
 * ------------------------------------------------------------------ */
export function featureSlider(root, { navH = 0, pin = true } = {}) {
  const stage = root.querySelector("#feature-showcase-stage");
  if (!stage) return noop;
  const wrap = stage.parentElement;
  const slides = [...stage.querySelectorAll(".feature-slide")];
  const buttons = [...wrap.querySelectorAll(".feature-nav-btn")];
  const n = slides.length;
  if (n < 2) return noop;

  wrap.dataset.mDone = "1"; // showcases() ka scrub is par na chale (pin ke sath takrata hai)

  // Entrance: stage perspective ke sath uthta hai, buttons stagger se aate hain
  const intro = gsap.timeline({
    defaults: { ease: "power4.out" },
    scrollTrigger: { trigger: wrap, start: "top 86%", once: true },
  });
  intro.from(stage, { autoAlpha: 0, y: 90, scale: 0.92, rotateX: 8, transformPerspective: 1100, duration: 1.3, clearProps: CLEAR });
  if (buttons.length) intro.from(buttons, { autoAlpha: 0, y: 34, duration: 0.8, stagger: 0.1, clearProps: CLEAR }, "-=0.7");

  const cleanups = [() => { intro.scrollTrigger?.kill(); intro.kill(); delete wrap.dataset.mDone; }];

  const fits = wrap.offsetHeight <= window.innerHeight - navH - 8;
  if (pin && fits) {
    window.__featurePinned = true; // purana auto-slide timer is flag par ruk jata hai
    let last = 0;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: () => `center center+=${navH / 2}`,
      end: () => `+=${Math.round(n * window.innerHeight * 0.5)}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(n - 1, Math.floor(self.progress * n));
        if (idx === last) return;
        const dir = idx > last ? 1 : -1;
        last = idx;
        if (typeof window.switchFeatureSlide === "function") window.switchFeatureSlide(idx);
        gsap.fromTo(
          slides[idx],
          { xPercent: 4 * dir * dirX() },
          { xPercent: 0, duration: 0.95, ease: "power3.out", overwrite: "auto", clearProps: "transform" }
        );
      },
    });

    const onClick = (e) => {
      const btn = e.target.closest?.(".feature-nav-btn");
      if (!btn) return;
      const i = buttons.indexOf(btn);
      if (i < 0) return;
      e.preventDefault(); e.stopPropagation();
      scrollToProgress(st, (i + 0.5) / n);
    };
    wrap.addEventListener("click", onClick, true);

    cleanups.push(() => {
      window.__featurePinned = false;
      wrap.removeEventListener("click", onClick, true);
      st.kill();
    });
  }

  return () => cleanups.forEach((c) => c());
}
