
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
  <nav
  className="sticky top-0 z-50 border-b shadow-sm backdrop-blur"
  //to handle theme use some inline css
  style={{
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--border-color)",
  }}
>
<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-indigo-600 sm:text-2xl"
        >
          Shop<span className="text-gray-900 dark:text-white">Ease</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/"
            className="text-sm font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-200"
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className="relative text-sm font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-200"
          >
            Cart
            <span className="ml-1 rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">
              {cartCount}
            </span>
          </NavLink>

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-gray-300 p-2 text-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
