import { AlertCircle, X } from "lucide-react";

export default function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <AlertCircle size={19} />
      <span>{message}</span>

      {onClose && (
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Dismiss error"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}