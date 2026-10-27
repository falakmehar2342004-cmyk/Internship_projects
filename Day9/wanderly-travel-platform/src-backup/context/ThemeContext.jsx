import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { STORAGE_KEYS } from "../utils/constants";
import {
  getStorageItem,
  setStorageItem,
} from "../utils/storage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return getStorageItem(STORAGE_KEYS.theme, "dark");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setStorageItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}