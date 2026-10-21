
import { AlertCircle } from 'lucide-react'

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-sm text-rose-200">
      <AlertCircle size={18} />
      <span className="flex-1">{message}</span>

      {onRetry && (
        <button className="btn-secondary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
