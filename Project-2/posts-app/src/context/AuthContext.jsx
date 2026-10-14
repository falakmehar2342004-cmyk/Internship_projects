import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// Yaha demo login ha, koi asli server nahi, sirf username yaad rakhte hain
export function AuthProvider({ children }) {
  // null ka matlab user login nahi ha
  const [user, setUser] = useState(null)

  // Yaha login ya logout par user ka state badalta ha
  const login = (username) => setUser({ username })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
