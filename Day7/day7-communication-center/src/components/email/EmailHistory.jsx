
import { Mail, Trash2 } from 'lucide-react'

export default function EmailHistory({ emails, onDelete }) {
  if (!emails.length) {
    return (
      <div className="panel py-12 text-center">
        <Mail size={28} className="mx-auto mb-3 muted" />
        <p className="font-medium">No matching emails</p>
        <p className="mt-1 text-sm muted">
          Sent emails and drafts will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {emails.map(email => (
        <article
          key={email.id}
          className="panel flex items-start gap-3 p-4"
        >
          <div className="rounded-xl bg-indigo-400/10 p-2.5 text-indigo-300">
            <Mail size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="break-all font-semibold">
                {email.subject}
              </h3>
              <span
                className={`badge ${
                  email.status === 'sent'
                    ? 'badge-success'
                    : email.status === 'failed'
                      ? 'badge-error'
                      : 'badge-warning'
                }`}
              >
                {email.status}
              </span>
            </div>

            <p className="mt-1 break-all text-sm muted">
              To: {email.to}
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
              {email.message}
            </p>

            <p className="mt-3 text-xs muted">
              {new Date(email.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            className="rounded-lg p-2 muted hover:text-rose-300"
            onClick={() => onDelete(email.id)}
            title="Delete email record"
          >
            <Trash2 size={16} />
          </button>
        </article>
      ))}
    </div>
  )
}
