import { createContext, useContext, useEffect, useState } from 'react';
import { KEYS } from '../utils/storage';

const ThemeContext = createContext(null);

// Yahan pehla theme tay hota hai: saved choice -> phone/PC ki setting -> light
function getInitialTheme() {
  const saved = localStorage.getItem(KEYS.theme);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Yahan theme badalte hi <html data-theme="..."> update hota hai aur save bhi
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEYS.theme, theme);
  }, [theme]);

  // Yahan light <-> dark badalte hain
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// Yahan chhota hook hai taake components seedha useTheme() likh sakein
export function useTheme() {
  return useContext(ThemeContext);
}
