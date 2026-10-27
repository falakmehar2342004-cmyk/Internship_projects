// ThemeContext light/dark mode ko poori application mein share karta hai.
// Choice localStorage mein save hoti hai taa-ke refresh par theme yaad rahe.

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('secure-portal-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );

    localStorage.setItem('secure-portal-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (
      current === 'dark' ? 'light' : 'dark'
    ));
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
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}