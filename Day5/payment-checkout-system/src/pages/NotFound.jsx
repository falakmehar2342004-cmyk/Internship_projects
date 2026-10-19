import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

// Yahan galat URL (jo kisi route se match na ho) ka 404 page hai
export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <EmptyState icon={Compass} title="404: page not found" message="The page you're looking for doesn't exist or has moved.">
      <Link to="/" className="btn btn-primary">Back to shop</Link>
      <Link to="/cart" className="btn btn-secondary">View cart</Link>
    </EmptyState>
  );
}
