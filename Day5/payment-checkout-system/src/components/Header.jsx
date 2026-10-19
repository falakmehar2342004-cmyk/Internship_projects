import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, ShoppingCart, Store, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { selectCartCount } from '../features/cart/cartSlice';

// Yahan menu ke links ki list hai (ek jagah badlo, desktop aur mobile dono mein badal jayega)
const LINKS = [
  { to: '/', label: 'Shop', end: true },
  { to: '/orders', label: 'Orders' },
  { to: '/dashboard', label: 'Dashboard' },
];

// Yahan active link ko "active" class mil jati hai
const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu khula hai ya band
  const cartCount = useSelector(selectCartCount); // cart badge ka number

  return (
    <header className="site-header">
      <div className="container-page flex items-center justify-between gap-3 py-3">
        {/* Logo */}
        <Link to="/" className="brand">
          <span className="brand-mark"><Store size={18} aria-hidden="true" /></span>
          Kartly
        </Link>

        {/* Desktop menu (chhoti screen par hide) */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart icon aur us par items ka count */}
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingCart size={18} aria-hidden="true" />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
          <ThemeToggle />
          {/* Mobile menu button (sirf chhoti screen par) */}
          <button
            type="button"
            className="icon-btn md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: sirf tab dikhta hai jab menuOpen true ho */}
      {menuOpen && (
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pb-3 md:hidden">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" className={navClass} onClick={() => setMenuOpen(false)}>
            Cart ({cartCount})
          </NavLink>
        </nav>
      )}
    </header>
  );
}
