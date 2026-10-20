import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

// Fallback page for unknown URLs.
export default function NotFound() {
  return <div className="not-found"><ShieldAlert size={40} /><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page is off the radar.</h1><p className="muted">The address may be incorrect or the page may have moved.</p><Link className="btn btn-primary" to="/">Return to dashboard</Link></div>;
}
