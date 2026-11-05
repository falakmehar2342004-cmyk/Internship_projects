
import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../main/Navbar.jsx";
import Footer from "../main/Footer.jsx";
import LanguageTranslator from "./LanguageTranslator.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initMotion } from "../../motion/engine.js";
import useSmoothScroll from "../../motion/useSmoothScroll.js";
import ScrollProgress from "../../motion/ScrollProgress.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname, hash, key } = useLocation();
  // Har baar page "khulne" par (dobara bhi, aur usi page ka link dobara click karne par bhi) animations replay hon.
  // Sirf #hash badalne par (jaise #pricing tak scroll) replay nahi hota.
  const visitKey = hash ? "" : key;
  const { language } = useLanguage();

  // -----------------------------------
  // ROUTE SCROLL POSITION
  // -----------------------------------

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToPosition = () => {
      const root = document.documentElement;
      const body = document.body;
      const oldBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";

      if (hash) {
        const target = document.getElementById(
          decodeURIComponent(hash.slice(1))
        );

        if (target) {
          target.scrollIntoView({
            behavior: "auto",
            block: "start",
          });
        } else {
          window.scrollTo(0, 0);
          root.scrollTop = 0;
          body.scrollTop = 0;
        }
      } else {
        window.scrollTo(0, 0);
        root.scrollTop = 0;
        body.scrollTop = 0;
      }

      requestAnimationFrame(() => {
        root.style.scrollBehavior = oldBehavior;
      });
    };

    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    scrollToPosition();

    const frame1 = requestAnimationFrame(() => {
      scrollToPosition();
      requestAnimationFrame(scrollToPosition);
    });

    const timer = window.setTimeout(scrollToPosition, 100);

    return () => {
      cancelAnimationFrame(frame1);
      clearTimeout(timer);
    };
  }, [pathname, hash, visitKey]);

  // -----------------------------------
  // GSAP ANIMATIONS (poora system: src/motion/)
  // -----------------------------------

  useSmoothScroll();

  // useLayoutEffect: paint se pehle chalta hai, is liye content ka flash nahi aata
  useLayoutEffect(() => initMotion(), [pathname, visitKey]);

  // Language badalne par text ki height badal sakti hai: positions dobara calculate
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(t);
  }, [language]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] antialiased">
      <ScrollProgress />
      <LanguageTranslator />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
