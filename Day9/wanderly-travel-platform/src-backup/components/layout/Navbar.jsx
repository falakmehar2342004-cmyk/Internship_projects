import { Compass, Heart, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import ThemeToggle from "../common/ThemeToggle";
import { APP_NAME } from "../../utils/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Compass size={24} />
          </span>
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
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <MapPin size={17} />
            Explore
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <Heart size={17} />
            Favorites
          </NavLink>

          <Link to="/login" className="nav-login" onClick={closeMenu}>
            Sign in
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}