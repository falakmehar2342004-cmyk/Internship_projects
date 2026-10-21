
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback(id => {
    setToasts(current => current.filter(item => item.id !== id))
  }, [])

  const toast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`

    setToasts(current => [
      ...current,
      { id, message, type },
    ])

    window.setTimeout(() => dismiss(id), 4000)
  }, [dismiss])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2">
        {toasts.map(item => {
          const Icon = icons[item.type] || Info

          return (
            <div
              key={item.id}
              className="panel animate-in flex items-start gap-3 p-3 shadow-xl"
            >
              <Icon size={19} />
              <p className="flex-1 text-sm">{item.message}</p>
              <button
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const value = useContext(ToastContext)

  if (!value) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return value
}
