
import { useEffect, useState } from 'react'
import { BellRing, Save } from 'lucide-react'

export default function NotificationPreferences({
  preferences,
  onSave,
  onEnableBrowser,
}) {
  const [form, setForm] = useState(preferences)

  useEffect(() => {
    setForm(preferences)
  }, [preferences])

  const rows = [
    ['emailSent', 'Email status updates'],
    ['activity', 'Activity feed updates'],
    ['browser', 'Browser notifications'],
  ]

  return (
    <section className="panel p-5">
      <h2 className="font-semibold">Notification preferences</h2>
      <p className="mt-1 text-sm muted">
        Choose which notifications you want to enable.
      </p>

      <div className="mt-4 divide-y divide-[#252e43]">
        {rows.map(([key, title]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 py-4"
          >
            <span className="flex-1 text-sm font-medium">{title}</span>
            <input
              className="!h-4 !w-4 accent-indigo-500"
              type="checkbox"
              checked={Boolean(form[key])}
              onChange={() =>
                setForm(current => ({
                  ...current,
                  [key]: !current[key],
                }))
              }
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button className="btn-secondary" onClick={onEnableBrowser}>
          <BellRing size={15} />
          Enable browser permission
        </button>

        <button
          className="btn-primary"
          onClick={() => onSave(form)}
        >
          <Save size={15} />
          Save preferences
        </button>
      </div>
    </section>
  )
}
