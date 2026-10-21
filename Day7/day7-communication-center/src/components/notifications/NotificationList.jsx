
import { Bell, CheckCheck } from 'lucide-react'

export default function NotificationList({ items, onMarkAllRead }) {
  return (
    <section className="panel p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-indigo-300" />
          <h2 className="font-semibold">Recent notifications</h2>
        </div>

        <button
          className="btn-secondary text-xs"
          onClick={onMarkAllRead}
        >
          <CheckCheck size={14} />
          Mark all read
        </button>
      </div>

      {!items.length ? (
        <p className="py-8 text-center text-sm muted">
          No notifications yet.
        </p>
      ) : (
        <div className="divide-y divide-[#252e43]">
          {items.map(item => (
            <div key={item.id} className="flex items-start gap-3 py-3">
              <span
                className={`mt-1 size-2 shrink-0 rounded-full ${
                  item.read ? 'bg-slate-600' : 'bg-indigo-400'
                }`}
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-sm muted">{item.message}</p>
                <p className="mt-1 text-xs muted">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
