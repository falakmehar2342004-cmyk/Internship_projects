# nExMeg Website

Responsive React + Vite website for nExMeg.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build`.

## Shared layout

- `src/components/layout/Layout.jsx` provides the single shared Navbar and Footer around all routes.
- `src/components/main/Navbar.jsx` contains the responsive main navigation, phone contact in the main header, theme toggle, and mobile menu. The English / Saudi Arabic selector lives in the utility strip above it.
- `src/components/main/Footer.jsx` is the shared site footer.
- `/privacy-policy` remains available as a route.

## Theme and language

- `src/context/ThemeContext.jsx` persists light / dark mode.
- `src/index.css` contains the shared design tokens and cross-page light/dark contrast overrides, including legacy Tailwind color classes used by the original pages.
- `src/context/LanguageContext.jsx` persists English / Saudi Arabic and applies the document language and text direction (`en` / LTR or `ar-SA` / RTL).
- `src/components/layout/LanguageTranslator.jsx` translates matching page copy, headings, labels, placeholders, and dynamically inserted text; extend its translation dictionary when new content is added.

## Motion (GSAP + ScrollTrigger + Lenis)

Poora animation system `src/motion/` mein hai aur `Layout.jsx` se ek hi jagah start hota hai.

- `engine.js`: sab pages par automatic animations (hero timeline, heading reveal, card stagger variants, mockup perspective reveal, image curtain, dark-section expand, blob parallax, number counters, 3D tilt + magnetic buttons).
- `accordion.js`: plus (+) icon wale accordions scroll ke sath ek ek karke khulte hain (desktop par section pin hota hai, mobile par har item apni jagah aane par khulta hai). Click abhi bhi kaam karta hai.
- `useSmoothScroll.js`: Lenis smooth scroll, ScrollTrigger ke sath synced.
- `ScrollProgress.jsx`: top par scroll progress bar.
- Manual control: kisi bhi element par `data-anim="fade-up | fade-down | fade-left | fade-right | zoom | reveal"`, `data-parallax="0.2"`, `data-tilt`. Kisi grid ko skip karne ke liye `data-m-skip`.
- `prefers-reduced-motion` par sab band ho jata hai. Text split nahi hota, is liye English / Arabic translator par asar nahi parta.

## Main source locations

- `src/pages/`: Home, About, Services, Contact, and Privacy pages.
- `src/components/ui/`: shared UI primitives.
- `src/page-behaviors.js`: legacy page-specific interactions.
- `src/index.css`: shared visual system and responsive/theme rules.

### Motion v2 (naye modules)

- `motion/chrome.js`: Navbar (Home / About / Services... UPAR se girte hain) + Footer (rounded card se khulta hai, columns stagger, watermark side se).
- `motion/team.js` + `components/ui/TeamSection.jsx`: About ka team section. Hover / tap / keyboard-focus par social icons card ke andar right side se slide hoke aate hain (CSS: `.team-social-btn` in `index.css`).
- `motion/sliders.js`: sliders ab *pinned* hain. Section screen par ruk jata hai, scroll se saari slides ek ek karke move hoti hain, aakhri slide ke baad page agle section par jata hai. Home feature slider, About compliance slider, Services ecosystem slider. Arrows/dots click par page ko us slide tak scroll karwate hain. Mobile (<768px) par normal swipe slider rehta hai.
- Counters fix: pehle StrictMode/dobara init par text "0" reh jata tha. Ab asal value `data-count-final` mein save hoti hai aur cleanup par wapas aati hai. Pricing ke numbers PKR <-> SAR badalne par bhi dobara count hote hain.
- Replay: `Layout.jsx` mein `location.key` use hota hai, is liye page har baar khulne par (aur usi page ka link dobara click karne par bhi) saari animations dobara chalti hain. Sirf `#hash` scroll par replay nahi hota.
- Har module `run()` mein wrap hai: ek module error de to baqi animations chalti rehti hain (console mein `[motion] ... failed` dikhega).
