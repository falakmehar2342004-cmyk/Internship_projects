import { createContext, useContext, useReducer } from 'react'

// Yaha context banaya ha taake koi bhi component bina props ke theme use kar sake
const ThemeContext = createContext()

// Yaha reducer ha, ye action ke hisab se state change karta ha
function themeReducer(state, action) {
  if (action.type === 'TOGGLE') {
    return state === 'light' ? 'dark' : 'light'
  }
  return state
}

export function ThemeProvider({ children }) {
  // Yaha useReducer se theme state manage ho rahi ha (shuru mein light)
  const [theme, dispatch] = useReducer(themeReducer, 'light')

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {/* Yaha data-theme se CSS ke colors badalte hain */}
      <div className="app" data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}

// Yaha custom hook ha taake components sirf useTheme() likh kar theme le len
export const useTheme = () => useContext(ThemeContext)
