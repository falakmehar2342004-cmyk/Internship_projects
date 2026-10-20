import { LoaderCircle } from 'lucide-react';

// Shared button styling keeps actions consistent across pages.
export default function Button({ children, type = 'button', disabled = false, loading = false, onClick, className = '', variant = 'primary' }) {
  return <button type={type} disabled={disabled || loading} onClick={onClick} className={`btn btn-${variant} ${className}`}>
    {loading && <LoaderCircle size={16} className="spin" />} {children}
  </button>;
}
