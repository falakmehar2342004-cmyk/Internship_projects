import { AlertCircle } from "lucide-react";

// Reusable inline error message, jab toast ke bajaye page par error dikhana ho.
export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5 shrink-0" />
        <p className="text-sm leading-6">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-bold underline underline-offset-4"
        >
          Retry
        </button>
      )}
    </div>
  );
}