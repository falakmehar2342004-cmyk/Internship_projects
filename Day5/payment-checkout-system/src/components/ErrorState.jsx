import { AlertTriangle, RefreshCw } from 'lucide-react';

// Yahan error ka card hai. onRetry diya ho to "Try again" button bhi dikhta hai.
export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="card mx-auto max-w-lg p-8 text-center" role="alert">
      <span className="result-icon result-icon-danger mx-auto">
        <AlertTriangle size={28} aria-hidden="true" />
      </span>
      <h2 className="mt-4">{title}</h2>
      {message && <p className="muted mt-2">{message}</p>}
      {onRetry && (
        <button type="button" className="btn btn-primary mt-5" onClick={onRetry}>
          <RefreshCw size={16} aria-hidden="true" /> Try again
        </button>
      )}
    </div>
  );
}
