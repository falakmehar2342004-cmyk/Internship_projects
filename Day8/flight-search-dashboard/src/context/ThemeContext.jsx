import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

// Theme ko browser storage se restore karte hain.
function getInitialTheme() {
  try {
    return localStorage.getItem("flight-theme") || "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Root HTML par dark class lagne se Tailwind dark styles activate hoti hain.
    document.documentElement.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("flight-theme", theme);
    } catch {
      // Storage unavailable ho to app phir bhi chalti rahegi.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}