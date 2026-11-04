import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../main/Navbar.jsx";
import Footer from "../main/Footer.jsx";
import LanguageTranslator from "./LanguageTranslator.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Keep route navigation independent from the browser's previous scroll position.
  // Manual restoration prevents Back/Forward history from overriding page navigation.
  // useLayoutEffect(() => {
  //   if ("scrollRestoration" in window.history) {
  //     window.history.scrollRestoration = "manual";
  //   }

  //   const scrollToRoutePosition = () => {
  //     // Override the site's smooth-scroll CSS for this navigation jump only.
  //     const root = document.documentElement;
  //     const previousScrollBehavior = root.style.scrollBehavior;
  //     root.style.scrollBehavior = "auto";

  //     const target = hash
  //       ? document.getElementById(decodeURIComponent(hash.slice(1)))
  //       : null;
  //     if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
  //     else window.scrollTo(0, 0);

  //     root.style.scrollBehavior = previousScrollBehavior;
  //   };

  //   // Run immediately before paint, then once after the new route has committed.
  //   scrollToRoutePosition();
  //   const frame = window.requestAnimationFrame(scrollToRoutePosition);
  //   return () => window.cancelAnimationFrame(frame);
  // }, [pathname, hash]);

  
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
}, [pathname, hash]);


  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const hoverBindings = [];
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray("main section");
      sections.forEach((section, sectionIndex) => {
        const directChildren = Array.from(section.children).filter((element) => {
          const style = window.getComputedStyle(element);
          return style.position !== "absolute" && !element.matches("script, style, [aria-hidden='true']");
        });
        if (directChildren.length) {
          const direction = [
            { x: 0, y: 42 },
            { x: -46, y: 0 },
            { x: 46, y: 0 },
            { x: 0, y: 38 },
          ][sectionIndex % 4];
          const entrance = {
            x: 0, y: 0, autoAlpha: 1, duration: section.matches("[data-purpose='hero-section']") ? 0.82 : 0.9,
            stagger: section.matches("[data-purpose='hero-section']") ? 0.16 : 0.13,
            ease: "power3.out", clearProps: "transform",
          };
          if (section.matches("[data-purpose='hero-section']")) {
            // Hero gets its one-time entrance immediately on page load.
            gsap.fromTo(directChildren, { x: 0, y: 28, autoAlpha: 0 }, entrance);
          } else {
            gsap.fromTo(directChildren, { x: direction.x, y: direction.y, autoAlpha: 0 }, {
              ...entrance,
              scrollTrigger: { trigger: section, start: "top 84%", once: true },
            });
          }
        }

        const cards = section.querySelectorAll(".nexmeg-card, [data-gsap-card], .group.rounded-2xl, .group.rounded-3xl");
        if (cards.length) {
          gsap.fromTo(cards, { y: 30, autoAlpha: 0, scale: 0.985 }, {
            y: 0, autoAlpha: 1, scale: 1, duration: 0.72, stagger: 0.1,
            ease: "power3.out", clearProps: "transform",
            scrollTrigger: { trigger: cards[0], start: "top 90%", once: true },
          });
        }
      });

      gsap.utils.toArray("main [data-gsap='reveal'], main [data-gsap='left'], main [data-gsap='right'], main [data-gsap='up'], main [data-gsap='down']").forEach((element) => {
        if (element.closest("section")) return;
        const direction = element.dataset.gsap;
        const from = direction === "left" ? { x: -42 } : direction === "right" ? { x: 42 } : direction === "down" ? { y: -38 } : { y: 38 };
        gsap.fromTo(element, { ...from, autoAlpha: 0 }, {
          x: 0, y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray(".nexmeg-card, [data-gsap-card], .group.rounded-2xl, .group.rounded-3xl").forEach((card) => {
        const enter = () => gsap.to(card, { y: -5, scale: 1.012, duration: 0.24, ease: "power2.out", overwrite: true });
        const leave = () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", overwrite: true });
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        hoverBindings.push([card, enter, leave]);
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 250);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      hoverBindings.forEach(([card, enter, leave]) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
      context.revert();
    };
  }, [pathname]);

  return <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] antialiased"><LanguageTranslator /><Navbar /><Outlet /><Footer /></div>;
}
