
import { AlertCircle, X } from "lucide-react";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
    >
      <AlertCircle
        size={20}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <p className="flex-1 leading-6">{message}</p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss error"
          className="shrink-0 rounded-md p-1 transition hover:bg-red-100 dark:hover:bg-red-900/50"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
