import { Compass, Heart, MapPin, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authFailure, logout } from "../../features/auth/authSlice";
import { supabase } from "../../services/supabase";
import ThemeToggle from "../common/ThemeToggle";
import { APP_NAME } from "../../utils/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  const closeMenu = () => setMenuOpen(false);

  async function handleSignOut() {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      dispatch(logout());
      closeMenu();
      navigate("/login", { replace: true });
    } catch (error) {
      dispatch(authFailure(error.message || "Unable to sign out."));
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon"><Compass size={24} /></span>
          <span>{APP_NAME}</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            <MapPin size={17} /> Explore
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            <Heart size={17} /> Favorites
          </NavLink>

          {isAuthenticated ? (
            <>
              <span className="nav-user">
                {user?.email || "Signed in"}
              </span>
              <button
                type="button"
                className="nav-login"
                onClick={handleSignOut}
                disabled={loading}
              >
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login" onClick={closeMenu}>
                Sign in
              </Link>
              <Link to="/signup" className="nav-signup" onClick={closeMenu}>
                Sign up
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
