
import { Activity, RefreshCw } from 'lucide-react'

export default function ActivityFeed({
  activities,
  updatedAt,
  onRefresh,
  loading = false,
}) {
  return (
    <section className="panel p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-indigo-300" />
          <div>
            <h2 className="font-semibold">Recent activity</h2>
            <p className="text-xs muted">
              Refreshes automatically every 10 seconds
            </p>
          </div>
        </div>

        <button
          className="btn-secondary text-xs"
          disabled={loading}
          onClick={onRefresh}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {updatedAt && (
        <p className="mb-3 text-xs muted">
          Last checked: {new Date(updatedAt).toLocaleTimeString()}
        </p>
      )}

      <div className="space-y-3">
        {activities.slice(0, 8).map(item => (
          <div
            key={item.id}
            className="flex gap-3 rounded-xl bg-[#0d1425] p-3"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-400/10 text-xs font-bold text-indigo-300">
              {item.kind === 'Post' ? 'P' : 'C'}
            </span>

            <div className="min-w-0">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 muted">
                {item.body}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider muted">
                {item.kind}
              </p>
            </div>
          </div>
        ))}

        {!activities.length && (
          <p className="py-6 text-center text-sm muted">
            No activity available yet.
          </p>
        )}
      </div>
    </section>
  )
}
