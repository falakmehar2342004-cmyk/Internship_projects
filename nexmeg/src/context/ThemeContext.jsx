import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("nexmeg-theme") || "light"; } catch { return "light"; }
  });
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("nexmeg-theme", theme); } catch { /* storage may be unavailable */ }
  }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((v) => v === "light" ? "dark" : "light") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
