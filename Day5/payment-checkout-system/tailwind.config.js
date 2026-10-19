/** @type {import('tailwindcss').Config} */
// Yahan Tailwind sirf layout/spacing ke liye use ho raha hai.
// Saare colours CSS variables (src/styles/theme.css) se aate hain,
// is liye light/dark theme ke liye alag "dark:" classes ki zarurat nahi.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        subtle: 'var(--bg-subtle)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        ink: 'var(--text)',
        muted: 'var(--text-muted)',
        line: 'var(--border)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
