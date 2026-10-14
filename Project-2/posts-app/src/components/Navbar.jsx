import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { theme, dispatch } = useTheme()
  const { user, logout } = useAuth()

  // Yaha useNavigate se code ke andar se page badal sakte hain
  const navigate = useNavigate()

  // Yaha NavLink isActive deta ha, is se current page ka link highlight hota ha
  const linkClass = ({ isActive }) => (isActive ? 'active' : '')

  // Yaha logout ke baad user ko Home page par bhej rahe hain
  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      {/* Yaha Link se bina page reload kiye Home par jate hain */}
      <Link to="/" className="brand">📝 PostsApp</Link>

      <div className="nav-links">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/posts" end className={linkClass}>Posts</NavLink>
        <NavLink to="/posts/new" className={linkClass}>Add Post 🔒</NavLink>

        {/* Yaha login hai to Logout button, warna Login link dikhta ha */}
        {user ? (
          <button className="btn small" onClick={handleLogout}>Logout ({user.username})</button>
        ) : (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        )}

        {/* Yaha theme badalne ka button ha */}
        <button className="btn small" onClick={() => dispatch({ type: 'TOGGLE' })}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
