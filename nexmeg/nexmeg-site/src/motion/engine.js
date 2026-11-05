import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAccordion } from "./accordion.js";
import { navbar, footerMotion } from "./chrome.js";
import { teamMotion } from "./team.js";
import { horizontalSliders, featureSlider } from "./sliders.js";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 *  Helpers
 * ------------------------------------------------------------------ */
const dirX = () => (document.documentElement.dir === "rtl" ? -1 : 1);
const isAbs = (el) => /\b(absolute|fixed)\b/.test(el.className?.toString() || "");
const hasAnimClass = (el) => /\banimate-/.test(el.className?.toString() || "");
const claim = (el) => (el.dataset.mDone = "1");
const claimed = (el) => !!el.closest("[data-m-done]");
const CLEAR = "transform,opacity,visibility,filter,clipPath";

const trigger = (el, start = "top 86%") => ({
  trigger: el,
  start,
  once: true,
});

/** Hidden se normal par aana (element ki apni CSS position par khatam hota hai) */
const rise = (targets, from, opts = {}, st = {}) =>
  gsap.from(targets, {
    autoAlpha: 0,
    duration: 1.1,
    ease: "power4.out",
    clearProps: CLEAR,
    ...from,
    ...opts,
    scrollTrigger: st.trigger === false ? undefined : trigger(st.trigger || targets, st.start),
  });

/** Bade heading: clip-path wipe + blur + skew */
const headingIn = (h, extra = {}, st = {}) =>
  gsap.fromTo(
    h,
    { autoAlpha: 0, y: 64, skewY: 4, filter: "blur(12px)", clipPath: "inset(0 0 100% 0)" },
    {
      autoAlpha: 1, y: 0, skewY: 0, filter: "blur(0px)",
      clipPath: "inset(-25% -6% -25% -6%)",
      duration: 1.2, ease: "power4.out", clearProps: CLEAR,
      ...extra,
      scrollTrigger: st.trigger === false ? undefined : trigger(h, st.start),
    }
  );

/* Stagger variants: har group alag style mein aata hai */
const VARIANTS = [
  () => ({ y: 80, scale: 0.96 }),
  () => ({ y: 60, rotateX: -28, transformPerspective: 900, transformOrigin: "50% 0%" }),
  () => ({ scale: 0.78, y: 40 }),
  () => ({ x: (i) => (i % 2 ? 1 : -1) * 60 * dirX(), y: 20 }),
  () => ({ y: 70, filter: "blur(10px)" }),
];

/* ------------------------------------------------------------------ *
 *  Modules
 * ------------------------------------------------------------------ */

/** 1) Hero: page load par timeline + scroll par halka bahar jana */
function hero(main) {
  const sec = main.querySelector("section");
  if (!sec) return () => {};

  // Purani CSS "animate-hero-*" classes GSAP se takrati hain: hata dete hain (cleanup par wapas)
  const stripped = [];
  let badge = null;
  sec.querySelectorAll("[class*='animate-hero']").forEach((el) => {
    const cls = [...el.classList].filter((c) => c.startsWith("animate-hero"));
    if (cls.includes("animate-hero-up") && !badge) badge = el;
    el.classList.remove(...cls);
    stripped.push([el, cls]);
  });

  const h1 = sec.querySelector("h1");
  const lead = h1?.parentElement?.querySelectorAll(":scope > p");
  const btnWrap = sec.querySelector("[data-gsap-hero-buttons]");
  const buttons = btnWrap
    ? [...btnWrap.children]
    : [...sec.querySelectorAll("h1 ~ div a, h1 ~ a, h1 ~ div button")].filter((b) => !b.closest(".hero-card-float, [data-gsap-hero-box]"));
  let visual = sec.querySelector("[data-gsap-hero-box], .hero-card-float, [data-purpose='auregon-circles-container']");
  // .hero-card-float par CSS transform animation hai: GSAP uske wrapper par chalao
  if (visual?.classList.contains("hero-card-float")) visual = visual.parentElement;

  [h1, btnWrap, visual, badge, ...(lead || []), ...buttons].filter(Boolean).forEach(claim);
  // CSS orbit animation wale hisse ko GSAP se alag rakhte hain
  sec.querySelectorAll(".orbit-hero, [data-purpose='auregon-circles-container']").forEach(claim);

  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
  if (badge && !badge.contains(h1)) tl.from(badge, { autoAlpha: 0, y: -30, scale: 0.8, duration: 0.8, ease: "back.out(2)", clearProps: CLEAR }, 0);
  if (h1) {
    tl.fromTo(h1,
      { autoAlpha: 0, y: 80, skewY: 5, filter: "blur(14px)", clipPath: "inset(0 0 100% 0)" },
      { autoAlpha: 1, y: 0, skewY: 0, filter: "blur(0px)", clipPath: "inset(-25% -6% -25% -6%)", duration: 1.4, clearProps: "filter,clipPath,transform" });
  }
  if (lead?.length) tl.from(lead, { autoAlpha: 0, y: 34, duration: 1, stagger: 0.12, clearProps: CLEAR }, "-=0.9");
  if (buttons.length) tl.from(buttons, { autoAlpha: 0, y: 30, scale: 0.85, duration: 0.9, stagger: 0.14, ease: "back.out(1.8)", clearProps: CLEAR }, "-=0.7");
  if (visual) tl.from(visual, { autoAlpha: 0, y: 90, scale: 0.9, rotateX: 10, transformPerspective: 1000, duration: 1.5, clearProps: CLEAR }, "-=1.1");

  // Scroll par hero ka content dheere upar jaye + fade ho
  const inner = [...sec.children].filter((c) => c !== visual && !isAbs(c) && !c.matches("canvas,[class*='aero-shards']") && h1 && c.contains(h1));
  if (inner.length) {
    gsap.to(inner, {
      yPercent: -9, autoAlpha: 0.25, ease: "none",
      scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true },
    });
  }
  return () => stripped.forEach(([el, cls]) => el.classList.add(...cls));
}

/** 2) Section ke headings (eyebrow + h2 + paragraph ek sath) */
function headings(root) {
  root.querySelectorAll("h2").forEach((h) => {
    if (claimed(h)) return;
    const group = [];
    const prev = h.previousElementSibling;
    if (prev && !prev.querySelector("h1,h2,h3") && (prev.textContent || "").trim().length < 45 && !isAbs(prev)) group.push(prev);
    const next = h.nextElementSibling;
    const after = [];
    if (next && !isAbs(next) && /^(P|DIV|SPAN)$/.test(next.tagName) && !next.querySelector("h1,h2,h3,.grid,[class*='grid-cols']") && (next.textContent || "").trim().length < 400) after.push(next);
    [h, ...group, ...after].forEach(claim);

    const tl = gsap.timeline({ scrollTrigger: trigger(h, "top 87%") });
    if (group.length) tl.from(group, { autoAlpha: 0, x: -40 * dirX(), duration: 0.8, ease: "power3.out", clearProps: CLEAR });
    tl.add(headingIn(h, {}, { trigger: false }), group.length ? "-=0.55" : 0);
    if (after.length) tl.from(after, { autoAlpha: 0, y: 36, duration: 1, ease: "power3.out", clearProps: CLEAR }, "-=0.8");
  });

  root.querySelectorAll("h3").forEach((h) => {
    if (claimed(h)) return;
    claim(h);
    rise(h, { y: 40, duration: 0.9 }, {}, { start: "top 90%" });
  });
}

/** 3) Cards / grids / lists: alag alag variant ke sath stagger */
function groups(root) {
  const sel = ".grid, ul, #compliance-slider-track, #circular-slider, .flex.flex-wrap, .flex.flex-col, [class*='space-y-']";
  let n = 0;
  root.querySelectorAll(sel).forEach((box) => {
    if (claimed(box) || box.closest("nav,header,[data-m-skip]")) return;
    const kids = [...box.children].filter((k) => !isAbs(k) && !hasAnimClass(k) && !/^(SCRIPT|STYLE)$/.test(k.tagName));
    if (kids.length < 2 || kids.length > 14) return;
    // Bade page-wrapper ko "group" na samjhein: sirf card jaisay chhote blocks
    const avg = kids.reduce((a, k) => a + k.offsetHeight, 0) / kids.length;
    if (avg > window.innerHeight * 0.85 || avg < 20) return;
    claim(box);
    const v = VARIANTS[n++ % VARIANTS.length];
    const isSlider = box.id === "compliance-slider-track" || box.id === "circular-slider";
    gsap.from(kids, {
      ...(isSlider ? { x: 90 * dirX(), rotate: 2 } : v(kids.length, 0)),
      autoAlpha: 0,
      duration: 1.05,
      ease: n % 3 === 0 ? "back.out(1.5)" : "power4.out",
      stagger: { each: 0.12, from: kids.length > 4 ? "edges" : "start" },
      clearProps: CLEAR,
      scrollTrigger: trigger(box, "top 86%"),
    });
  });
}

/** 4) Bade visuals / mockups: scroll ke sath perspective reveal */
function showcases(root) {
  root.querySelectorAll("[data-gsap-showcase], .shadow-2xl.rounded-3xl, .shadow-2xl.rounded-2xl").forEach((el) => {
    if (claimed(el) || isAbs(el)) return;
    claim(el);
    gsap.fromTo(
      el,
      { y: 90, scale: 0.9, rotateX: 9, transformPerspective: 1100, transformOrigin: "50% 100%", autoAlpha: 0.2 },
      {
        y: 0, scale: 1, rotateX: 0, autoAlpha: 1, ease: "none", immediateRender: true,
        scrollTrigger: { trigger: el, start: "top 96%", end: "top 48%", scrub: 0.6 },
      }
    );
  });
}

/** 5) Images: curtain reveal + andar zoom out */
function images(root) {
  root.querySelectorAll("img").forEach((img) => {
    if (claimed(img) || isAbs(img)) return;
    claim(img);
    gsap.fromTo(
      img,
      { clipPath: "inset(100% 0 0 0)", scale: 1.25, autoAlpha: 0.3 },
      { clipPath: "inset(0% 0 0 0)", scale: 1, autoAlpha: 1, duration: 1.5, ease: "power4.inOut", clearProps: CLEAR, scrollTrigger: trigger(img, "top 88%") }
    );
  });
}

/** 6) Dark sections: scroll par rounded card se full-width mein khulna */
function darkSections(root) {
  root.querySelectorAll("section[class*='bg-slate-900'], section[class*='bg-[var(--brand-deep)]']").forEach((sec) => {
    gsap.fromTo(
      sec,
      { clipPath: "inset(6% 4% 0% 4% round 56px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", clearProps: "clipPath",
        scrollTrigger: { trigger: sec, start: "top 98%", end: "top 25%", scrub: 0.5 },
      }
    );
  });
}

/** 7) Decorative blobs: parallax (alag alag speed) */
function parallax(root) {
  root.querySelectorAll("section").forEach((sec) => {
    sec.querySelectorAll(".pointer-events-none[class*='absolute'][class*='blur'], .pointer-events-none[class*='absolute'][class*='rounded-full']").forEach((el, i) => {
      if (hasAnimClass(el)) return;
      gsap.to(el, {
        y: (i % 2 ? -1 : 1) * (70 + i * 18),
        x: (i % 2 ? 1 : -1) * 30 * dirX(),
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });
  root.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, { yPercent: -100 * speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });
}

/** 8) Numbers: 99.4% / 12M+ / 4,999 wagera count-up */
const COUNT_RE = /^(\d[\d,]*(?:\.\d+)?)(\s?[%+KMBkmb]{0,3}\+?)$/;

function parseCount(text) {
  const m = COUNT_RE.exec((text || "").trim());
  if (!m || /^0\d/.test(m[1])) return null;
  const end = parseFloat(m[1].replace(/,/g, ""));
  if (!(end > 1)) return null;
  return { end, decimals: (m[1].split(".")[1] || "").length, comma: m[1].includes(","), suffix: m[2] };
}

const fmtCount = (c, v) =>
  c.comma
    ? v.toLocaleString("en-US", { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals })
    : v.toFixed(c.decimals);

/** `node` ke andar number 0 se `finalText` tak count karta hai */
function runCount(node, finalText, { duration = 2.4, scrollTrigger, onDone } = {}) {
  const c = parseCount(finalText);
  const text = finalText.trim();
  const state = { v: 0 };
  const write = (v) => { node.nodeValue = finalText.replace(text, () => fmtCount(c, v) + c.suffix); };
  write(0);
  return gsap.to(state, {
    v: c.end,
    duration,
    ease: "power2.out",
    onUpdate: () => write(state.v),
    onComplete: () => { node.nodeValue = finalText; onDone?.(); },
    scrollTrigger,
  });
}

function counters(root) {
  const cleanups = [];
  root.querySelectorAll("*").forEach((el) => {
    if (el.childElementCount || el.closest("script,style,button,a,input,textarea,select")) return;
    const node = el.firstChild;
    if (!node || node.nodeType !== 3 || el.childNodes.length !== 1) return;
    // FIX: pehle run (StrictMode / dobara init) ne text "0" kar diya ho to asal value yahan se uthao
    const original = el.dataset.countFinal ?? node.nodeValue;
    if (!parseCount(original)) return;
    el.dataset.countFinal = original;
    el.setAttribute("data-count", "");

    let finished = false;
    const tween = runCount(node, original, {
      scrollTrigger: trigger(el, "top 92%"),
      onDone: () => { finished = true; delete el.dataset.countFinal; },
    });

    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // FIX: cleanup par asal number wapas (warna agla run "0" ko hi asal value samajhta tha)
      if (!finished) node.nodeValue = original;
      delete el.dataset.countFinal;
      el.removeAttribute("data-count");
    });
  });
  return () => cleanups.forEach((c) => c());
}

/** Pricing: PKR <-> SAR badalne par numbers dobara 0 se count hote hain */
function priceSwitch(root) {
  const cleanups = [];
  root.querySelectorAll(".price-val").forEach((el) => {
    let current = null;
    const mo = new MutationObserver(() => {
      const node = el.firstChild;
      if (!node || node.nodeType !== 3 || el.childNodes.length !== 1) return;
      const finalText = node.nodeValue;
      if (!parseCount(finalText)) return;
      current?.kill();
      current = runCount(node, finalText, { duration: 1.2 });
      gsap.fromTo(el, { y: -18, autoAlpha: 0.15 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "back.out(2)", overwrite: "auto", clearProps: "transform,opacity,visibility" });
    });
    // sirf childList: hamare apne nodeValue updates dobara trigger nahi karte
    mo.observe(el, { childList: true });
    cleanups.push(() => { mo.disconnect(); current?.kill(); });
  });
  return () => cleanups.forEach((c) => c());
}

/** 9) Manual control: data-anim="fade-up|fade-down|fade-left|fade-right|zoom|reveal" */
function manual(root) {
  const map = {
    "fade-up": { y: 80 }, "fade-down": { y: -80 },
    "fade-left": { x: -120 * dirX() }, "fade-right": { x: 120 * dirX() },
    zoom: { scale: 0.6, rotate: -6, filter: "blur(12px)" },
  };
  root.querySelectorAll("[data-anim]").forEach((el) => {
    if (claimed(el)) return;
    const k = el.dataset.anim;
    claim(el);
    if (map[k]) rise(el, { ...map[k], duration: 1.3 });
    else if (k === "reveal")
      gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.inOut", clearProps: "clipPath", scrollTrigger: trigger(el) });
  });
}

/** 10) Plus-icon accordions: scroll par ek ek karke khulein */
function accordions(root, desktop) {
  const home = root.querySelector("[data-purpose='how-it-works']");
  if (home) {
    const items = [...home.querySelectorAll(".accordion-item")];
    const row = items[0]?.closest(".grid");
    if (row) row.dataset.mSkip = "1";
    items.forEach(claim);
    scrollAccordion(items, { pinTarget: row, desktop });
  }
  const svc = root.querySelector("#accordion-root");
  if (svc) {
    const items = [...svc.querySelectorAll(".accordion-item")];
    const row = svc.closest(".grid");
    if (row) row.dataset.mSkip = "1";
    claim(svc);
    scrollAccordion(items, { pinTarget: row, desktop });
  }
}


/** Fallback: jo kuch upar kisi module ne nahi pakda, usay block block karke animate karo */
function blocks(root) {
  const secs = root.matches("footer") ? [root] : [...root.querySelectorAll("section")];
  let n = 0;
  const skip = (c) =>
    isAbs(c) || hasAnimClass(c) || /^(SCRIPT|STYLE|CANVAS|SVG)$/i.test(c.tagName) || c.dataset.mSkip || claimed(c);
  const walk = (el, depth) => {
    const kids = [...el.children].filter((c) => !skip(c));
    kids.forEach((c) => {
      const tall = c.offsetHeight > window.innerHeight * 0.75;
      const hasClaimed = !!c.querySelector("[data-m-done]");
      if ((hasClaimed || tall || kids.length === 1) && depth < 4 && c.children.length) return walk(c, depth + 1);
      if (c.offsetHeight < 28 || c.offsetWidth < 40) return;
      claim(c);
      const narrow = c.offsetWidth < window.innerWidth * 0.62;
      const i = n++;
      const from = narrow
        ? { x: (i % 2 ? 1 : -1) * 70 * dirX(), y: 30 }
        : [{ y: 70 }, { y: 50, scale: 0.94 }, { y: 60, rotateX: -8, transformPerspective: 900, transformOrigin: "50% 0%" }][i % 3];
      rise(c, from, { duration: 1.1 }, { start: "top 90%" });
    });
  };
  secs.forEach((sec) => walk(sec, 0));
}

/** Contact: form card + fields + focus effects + success toast + FAQ open animation */
function contactForm(root) {
  const form = root.querySelector("#contactQueryForm");
  const cleanups = [];
  if (form) {
    const card = form.parentElement;
    const grid = card.closest(".grid");
    if (grid) grid.dataset.mSkip = "1";               // dono columns ko alag alag animate karenge
    const col = card.parentElement;
    const left = grid ? [...grid.children].find((c) => c !== col) : null;
    if (left) {
      const items = [...left.children].filter((c) => !isAbs(c));
      gsap.from(items, { autoAlpha: 0, x: -60 * dirX(), duration: 1, stagger: 0.14, ease: "power4.out", clearProps: CLEAR, scrollTrigger: trigger(left, "top 85%") });
      items.forEach(claim);
    }
    claim(card);
    const head = card.firstElementChild;
    const fields = [...form.querySelectorAll("input:not([type=checkbox]), select, textarea")];
    const check = form.querySelector("input[type=checkbox]")?.closest(".flex");
    const submit = form.querySelector("button[type=submit], button:not([type])");

    gsap.from(card, { autoAlpha: 0, y: 90, rotateX: -10, transformPerspective: 1100, transformOrigin: "50% 0%", duration: 1.3, ease: "power4.out", clearProps: CLEAR, scrollTrigger: trigger(card, "top 88%") });
    const tl = gsap.timeline({ scrollTrigger: trigger(form, "top 82%"), defaults: { ease: "power4.out" } });
    if (head) tl.from(head.children, { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.1, clearProps: CLEAR });
    tl.from(fields, {
      autoAlpha: 0, y: 34, scaleX: 0.9, clipPath: "inset(0 50% 0 50% round 24px)",
      duration: 0.95, stagger: 0.12, clearProps: CLEAR,
    }, head ? "-=0.4" : 0);
    if (check) tl.from(check, { autoAlpha: 0, x: -30, duration: 0.7, clearProps: CLEAR }, "-=0.3");
    if (submit) tl.from(submit, { autoAlpha: 0, scale: 0.5, y: 20, duration: 1, ease: "elastic.out(1,0.6)", clearProps: CLEAR }, "-=0.3");

    // Focus par field halka sa upar uthe
    const fin = (e) => { if (e.target.matches("input:not([type=checkbox]),select,textarea")) gsap.to(e.target, { y: -3, scale: 1.012, duration: 0.35, ease: "power3.out", overwrite: "auto" }); };
    const fout = (e) => { if (e.target.matches("input:not([type=checkbox]),select,textarea")) gsap.to(e.target, { y: 0, scale: 1, duration: 0.4, ease: "power3.out", overwrite: "auto", clearProps: "transform" }); };
    form.addEventListener("focusin", fin);
    form.addEventListener("focusout", fout);
    cleanups.push(() => { form.removeEventListener("focusin", fin); form.removeEventListener("focusout", fout); });

    // Success message jab dikhe (purana code "hidden" class hatata hai)
    const toast = document.getElementById("formSuccessToast");
    if (toast) {
      const mo = new MutationObserver(() => {
        if (toast.classList.contains("hidden")) return;
        gsap.fromTo(toast, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)", clearProps: "transform,opacity,visibility" });
        gsap.from(toast.children, { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.1, delay: 0.15, ease: "power3.out", clearProps: CLEAR });
        const icon = toast.firstElementChild;
        if (icon) gsap.fromTo(icon, { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 0.9, delay: 0.1, ease: "elastic.out(1,0.5)", clearProps: "transform" });
      });
      mo.observe(toast, { attributes: true, attributeFilter: ["class"] });
      cleanups.push(() => mo.disconnect());
    }
  }

  // FAQ: khulte waqt smooth height animation
  const faq = root.querySelector("#faqAccordion");
  if (faq) {
    const bodies = faq.querySelectorAll(".faq-content");
    const mo = new MutationObserver((records) => {
      records.forEach((r) => {
        const el = r.target;
        if (el.classList.contains("hidden") || r.oldValue?.includes("hidden") === false) return;
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.6, ease: "power3.out", clearProps: "height,opacity" });
      });
    });
    bodies.forEach((b) => mo.observe(b, { attributes: true, attributeFilter: ["class"], attributeOldValue: true }));
    cleanups.push(() => mo.disconnect());
  }
  return () => cleanups.forEach((c) => c());
}

/** 11) Desktop hover: 3D tilt + magnetic buttons */
function hover(root) {
  const cleanups = [];
  const cards = root.querySelectorAll(".nexmeg-card, [data-gsap-card], [data-tilt], [data-purpose='pricing'] .grid > div, [data-purpose='blog'] article");
  cards.forEach((card) => {
    const qx = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
    gsap.set(card, { transformPerspective: 900 });
    const move = (e) => {
      const r = card.getBoundingClientRect();
      qx(((e.clientX - r.left) / r.width - 0.5) * 8);
      qy(-((e.clientY - r.top) / r.height - 0.5) * 8);
    };
    const leave = () => { qx(0); qy(0); };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    cleanups.push(() => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); });
  });

  root.querySelectorAll("main a[class*='rounded-full'], main button[class*='rounded-full'][type='submit']").forEach((btn) => {
    if (btn.closest(".accordion-item")) return;
    const qx = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
    const qy = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
    const move = (e) => {
      const r = btn.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.25);
      qy((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => { qx(0); qy(0); };
    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);
    cleanups.push(() => { btn.removeEventListener("mousemove", move); btn.removeEventListener("mouseleave", leave); });
  });
  return () => cleanups.forEach((c) => c());
}

/** Har section ka pehla container halka sa uthta hua aata hai (taake koi section bina animation na rahe) */
function sectionSweep(main) {
  [...main.querySelectorAll(":scope > section, :scope > div > section")].forEach((sec, i) => {
    if (i === 0) return; // hero apni timeline se aata hai
    if (sec.dataset.mDone) return;
    const box = [...sec.children].find((c) => !isAbs(c) && !c.dataset.mDone && !/^(SCRIPT|STYLE)$/.test(c.tagName));
    if (!box) return;
    gsap.from(box, {
      autoAlpha: 0, y: 56, duration: 1.1, ease: "power3.out", clearProps: CLEAR,
      scrollTrigger: { trigger: sec, start: "top 90%", once: true },
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Entry
 * ------------------------------------------------------------------ */
/** Ek module fail ho to baqi chalte rahein (pehle ek error poori animation rok deta tha) */
const run = (fn, ...args) => {
  try {
    const r = fn(...args);
    return typeof r === "function" ? r : () => {};
  } catch (err) {
    console.error(`[motion] ${fn.name || "module"} failed:`, err);
    return () => {};
  }
};

export function initMotion() {
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  if (!main) return () => {};

  const mm = gsap.matchMedia();

  mm.add(
    { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)", fine: "(hover: hover) and (pointer: fine)" },
    (ctx) => {
      const { desktop, fine, motion } = ctx.conditions;
      if (!motion) return undefined; // reduced-motion: kuch hide/animate nahi hota

      const scope = [main, footer].filter(Boolean);
      const header = document.getElementById("main-header");
      const navH = header ? header.offsetHeight : 0;
      const pin = window.innerWidth >= 768; // pinned sliders tablet/desktop par
      const cleanups = [];
      const use = (fn, ...args) => cleanups.push(run(fn, ...args));

      use(navbar);                         // Home / About / Services... upar se aate hain
      use(footerMotion, footer);           // footer ko pehle claim karta hai
      use(hero, main);
      use(accordions, main, desktop);      // accordion pehle: unke andar ke items claim na hon
      use(featureSlider, main, { navH, pin });   // Home feature slider: pin + step
      use(teamMotion, main);               // About: team section
      use(contactForm, main);
      scope.forEach((r) => {
        use(manual, r);
        use(groups, r);                    // cards/grids pehle, taake unke andar ke headings double animate na hon
        use(showcases, r);
        use(headings, r);
        use(images, r);
        use(blocks, r);
        use(counters, r);
        use(priceSwitch, r);
        use(parallax, r);
        use(darkSections, r);
      });
      use(sectionSweep, main);
      use(horizontalSliders, main, { navH, pin });   // About compliance + Services ecosystem sliders
      if (fine) use(hover, document);

      // Pin spacing ke baad sab triggers ke positions dobara hisaab karo
      ScrollTrigger.sort?.();
      const refresh = () => ScrollTrigger.refresh();
      const raf = requestAnimationFrame(refresh);
      const t = setTimeout(refresh, 400);
      const t2 = setTimeout(refresh, 1400);
      window.addEventListener("load", refresh, { once: true });
      document.fonts?.ready.then(refresh);

      // Images / language ki wajah se page ki height badle to positions dobara set
      let lastH = document.documentElement.scrollHeight;
      let rt = 0;
      const ro = typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            clearTimeout(rt);
            rt = setTimeout(() => {
              const h = document.documentElement.scrollHeight;
              if (Math.abs(h - lastH) > 2) { ScrollTrigger.refresh(); lastH = document.documentElement.scrollHeight; }
            }, 250);
          })
        : null;
      ro?.observe(main);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t); clearTimeout(t2); clearTimeout(rt);
        ro?.disconnect();
        window.removeEventListener("load", refresh);
        cleanups.reverse().forEach((c) => c());
        scope.forEach((r) => {
          delete r.dataset.mDone;
          r.querySelectorAll("[data-m-done],[data-m-skip]").forEach((e) => { delete e.dataset.mDone; delete e.dataset.mSkip; });
        });
      };
    }
  );

  return () => mm.revert();
}
