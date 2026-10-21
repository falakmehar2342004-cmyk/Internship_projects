
import { BarChart3 } from 'lucide-react'

export default function AnalyticsDashboard({ emails }) {
  const counts = [
    {
      label: 'Sent',
      value: emails.filter(item => item.status === 'sent').length,
      color: 'bg-emerald-400',
    },
    {
      label: 'Drafts',
      value: emails.filter(item => item.status === 'draft').length,
      color: 'bg-amber-300',
    },
    {
      label: 'Failed',
      value: emails.filter(item => item.status === 'failed').length,
      color: 'bg-rose-400',
    },
  ]

  const max = Math.max(...counts.map(item => item.value), 1)

  return (
    <section className="panel p-5">
      <div className="mb-5 flex items-center gap-3">
        <BarChart3 size={19} className="text-indigo-300" />
        <div>
          <h2 className="font-semibold">Email analytics</h2>
          <p className="text-xs muted">Based on email history</p>
        </div>
      </div>

      <div className="space-y-4">
        {counts.map(item => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="muted">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
