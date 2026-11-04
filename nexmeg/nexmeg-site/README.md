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

## Motion

- GSAP and ScrollTrigger are declared in `package.json` and registered in `src/components/layout/Layout.jsx`.
- Section content reveals from alternating vertical and horizontal directions, card groups stagger in, and cards have restrained hover motion.
- Animations are scoped to the active route, cleaned up on navigation, refreshed after layout, and disabled when the visitor requests reduced motion.

## Main source locations

- `src/pages/`: Home, About, Services, Contact, and Privacy pages.
- `src/components/ui/`: shared UI primitives.
- `src/page-behaviors.js`: legacy page-specific interactions.
- `src/index.css`: shared visual system and responsive/theme rules.
