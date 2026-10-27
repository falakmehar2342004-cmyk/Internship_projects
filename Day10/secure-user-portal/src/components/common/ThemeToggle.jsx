// Theme toggle button user ko light aur dark mode change karne deta hai.

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Change theme"
    >
      {/* key={theme}: toggle par icon rotate hokar badalta hai */}
      <span className="theme-icon" key={theme}>
        {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
      </span>
    </button>
  );
}