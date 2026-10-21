
import { Activity, Bell, Mail, Users } from 'lucide-react'

const icons = [Mail, Bell, Activity, Users]

export default function StatsCards({
  emails,
  notifications,
  activities,
  users,
}) {
  const items = [
    { label: 'Emails in history', value: emails },
    { label: 'Notifications', value: notifications },
    { label: 'Activity items', value: activities },
    { label: 'API users', value: users },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index]

        return (
          <div className="panel p-5" key={item.label}>
            <div className="flex items-center justify-between">
              <p className="text-sm muted">{item.label}</p>
              <div className="rounded-xl bg-indigo-400/10 p-2 text-indigo-300">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold">{item.value}</p>
          </div>
        )
      })}
    </div>
  )
}
