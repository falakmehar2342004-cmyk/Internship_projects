/** ============================================================
 *  THEME: poori site ka look yahin se change hota hai.
 *  - colors  : ocean-* (Home/About), spruce-* , primary/secondary/surface... (Services/Contact)
 *  - fonts   : display+heading = Bricolage Grotesque, body+sans = Domine (Home wali)
 *  - Jo naam Contact aur Services mein alag value ke thay (primary, secondary, surface,
 *    primary-container, secondary-container, on-surface-variant) woh CSS variables hain,
 *    neeche `palettes` mein. Dono ko ek karna ho to ek hi palette rakh lo.
 * ============================================================ */
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";
import plugin from "tailwindcss/plugin";

const palettes = {
  ":root, .theme-contact": {
    "--c-primary": "13 148 136",
    "--c-primary-container": "204 251 241",
    "--c-secondary": "6 182 212",
    "--c-secondary-container": "207 250 254",
    "--c-surface": "255 255 255",
    "--c-on-surface-variant": "100 116 139"
  },
  ".theme-services": {
    "--c-primary": "15 118 110",
    "--c-primary-container": "4 47 46",
    "--c-secondary": "13 148 136",
    "--c-secondary-container": "13 148 136",
    "--c-surface": "248 250 252",
    "--c-on-surface-variant": "71 85 105"
  }
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "ocean-deep": "#0d4a4d",
        "ocean-dark": "#082024",
        "ocean-darker": "#051619",
        "ocean-mint": "#14b8a6",
        "ocean-lightmint": "#2dd4bf",
        "ocean-soft": "#e6f7f5",
        "ocean-cream": "#FBFBF9",
        "ocean-surface": "#FFFFFF",
        "ocean-card": "#F6FBF9",
        "ocean-50": "#f0fdfa",
        "ocean-100": "#ccfbf1",
        "ocean-200": "#99f6e4",
        "ocean-300": "#5eead4",
        "ocean-400": "#2dd4bf",
        "ocean-500": "#14b8a6",
        "ocean-600": "#0d9488",
        "ocean-700": "#0f766e",
        "ocean-800": "#115e59",
        "ocean-900": "#134e4a",
        "ocean-950": "#042f2e",
        "spruce-800": "#0f3638",
        "spruce-850": "#0b292b",
        "spruce-900": "#082024",
        "spruce-950": "#041215",
        "primary": "rgb(var(--c-primary) / <alpha-value>)",
        "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
        "on-primary": "#ffffff",
        "secondary": "rgb(var(--c-secondary) / <alpha-value>)",
        "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)",
        "spruce": "#042f2e",
        "spruce-dark": "#022020",
        "spruce-surface": "#0f2e2e",
        "surface": "rgb(var(--c-surface) / <alpha-value>)",
        "surface-muted": "#f8fafc",
        "surface-mint": "#f0fdfa",
        "border-soft": "#e2e8f0",
        "on-surface": "#0f172a",
        "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
        "surface-dim": "#0f131d",
        "on-primary-fixed-variant": "#5a00c6",
        "primary-fixed-dim": "#d2bbff",
        "error-container": "#93000a",
        "on-primary-fixed": "#25005a",
        "on-error-container": "#ffdad6",
        "on-tertiary-container": "#ece1ff",
        "error": "#ffb4ab",
        "secondary-fixed": "#acedff",
        "on-tertiary": "#3c0091",
        "on-tertiary-fixed": "#23005c",
        "on-secondary": "#003640",
        "tertiary": "#06b6d4",
        "outline-variant": "#cbd5e1",
        "surface-tint": "#0d9488",
        "tertiary-fixed-dim": "#d0bcff",
        "inverse-primary": "#0f766e",
        "tertiary-fixed": "#e9ddff",
        "primary-fixed": "#eaddff",
        "inverse-on-surface": "#f8fafc",
        "tertiary-container": "#ccfbf1",
        "surface-container-highest": "#f1f5f9",
        "surface-container": "#ffffff",
        "on-secondary-fixed": "#001f26",
        "secondary-fixed-dim": "#4cd7f6",
        "on-primary-container": "#ffffff",
        "background": "#f8fafc",
        "outline": "#94a3b8",
        "on-tertiary-fixed-variant": "#5516be",
        "on-secondary-fixed-variant": "#004e5c",
        "on-background": "#0f172a",
        "on-error": "#690005",
        "surface-variant": "#f1f5f9",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#0f172a",
        "surface-container-low": "#f8fafc",
        "surface-container-high": "#f1f5f9",
        "surface-bright": "#ffffff",
        "on-secondary-container": "#ffffff"
},
      fontFamily: {
        "display": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "heading": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "body": [
                "Domine",
                "serif"
        ],
        "sans": [
                "Domine",
                "serif"
        ],
        "label-md": [
                "Domine",
                "serif"
        ],
        "headline-sm": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "metric-stat": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "headline-lg-mobile": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "label-sm": [
                "Domine",
                "serif"
        ],
        "headline-md": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "headline-lg": [
                "Bricolage Grotesque",
                "sans-serif"
        ],
        "body-sm": [
                "Domine",
                "serif"
        ],
        "body-lg": [
                "Domine",
                "serif"
        ],
        "body-md": [
                "Domine",
                "serif"
        ],
        "display-hero": [
                "Bricolage Grotesque",
                "sans-serif"
        ]
},
      fontSize: {
        "label-md": [
                "13px",
                {
                        "lineHeight": "18px",
                        "letterSpacing": "0.01em",
                        "fontWeight": "600"
                }
        ],
        "headline-sm": [
                "18px",
                {
                        "lineHeight": "26px",
                        "letterSpacing": "-0.01em",
                        "fontWeight": "600"
                }
        ],
        "metric-stat": [
                "28px",
                {
                        "lineHeight": "32px",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                }
        ],
        "headline-lg-mobile": [
                "26px",
                {
                        "lineHeight": "34px",
                        "letterSpacing": "-0.015em",
                        "fontWeight": "700"
                }
        ],
        "label-sm": [
                "11px",
                {
                        "lineHeight": "14px",
                        "letterSpacing": "0.04em",
                        "fontWeight": "600"
                }
        ],
        "headline-md": [
                "24px",
                {
                        "lineHeight": "32px",
                        "letterSpacing": "-0.015em",
                        "fontWeight": "600"
                }
        ],
        "headline-lg": [
                "32px",
                {
                        "lineHeight": "40px",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                }
        ],
        "body-sm": [
                "12px",
                {
                        "lineHeight": "18px",
                        "fontWeight": "400"
                }
        ],
        "body-lg": [
                "16px",
                {
                        "lineHeight": "24px",
                        "fontWeight": "400"
                }
        ],
        "body-md": [
                "14px",
                {
                        "lineHeight": "20px",
                        "fontWeight": "400"
                }
        ],
        "display-hero": [
                "48px",
                {
                        "lineHeight": "56px",
                        "letterSpacing": "-0.025em",
                        "fontWeight": "800"
                }
        ]
},
      spacing: {
        "gutter-desktop": "1.5rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "space-xl": "2rem",
        "gutter": "1.25rem",
        "space-sm": "0.5rem",
        "margin": "1rem",
        "margin-desktop": "2rem",
        "space-lg": "1.5rem"
},
      borderRadius: {
        "4xl": "2rem",
        "2xl": "1rem",
        "3xl": "1.5rem"
},
    },
  },
  plugins: [forms, containerQueries, plugin(({ addBase }) => addBase(palettes))],
};
