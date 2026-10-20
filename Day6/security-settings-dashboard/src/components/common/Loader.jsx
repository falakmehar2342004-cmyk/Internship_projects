import { LoaderCircle } from 'lucide-react';

// Reusable loading indicator for async or pending UI states.
export default function Loader({ label = 'Loading...' }) {
  return <div className="loader-state"><LoaderCircle className="spin" size={24} /><span>{label}</span></div>;
}
