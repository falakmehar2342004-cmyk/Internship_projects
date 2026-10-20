import { AlertCircle } from 'lucide-react';

// Display a clear inline error without repeating error markup in every page.
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="error-banner" role="alert"><AlertCircle size={17} /><span>{message}</span></div>;
}
