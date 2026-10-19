import { Link } from 'react-router-dom';

// Yahan website ka neeche wala hissa hai
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2">
        <div>
          <p className="font-extrabold">Kartly</p>
          <p className="muted mt-1 max-w-sm text-sm">
            A store where you can buy anything of your own interest
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm sm:justify-end">
          <Link to="/">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </footer>
  );
}
