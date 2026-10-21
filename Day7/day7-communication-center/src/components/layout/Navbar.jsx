
import { Bell, CircleHelp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ThemeToggle from '../../context/ThemeContext'

const titles = {
  '/': 'Overview',
  '/emails': 'Email center',
  '/notifications': 'Notifications',
  '/activity': 'Activity feed',
  '/apis': 'API gateway',
}

export default function Navbar() {
  const location = useLocation()

  const notifications = useSelector(
    state => state.notifications.items,
  )

  const unread = notifications.filter(item => !item.read).length

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#252e43] px-5 py-4 md:px-8">
      <div>
        <p className="text-xs muted">
          Workspace / {titles[location.pathname] || 'Page'}
        </p>

        <h1 className="mt-1 text-xl font-bold">
          {titles[location.pathname] || 'Page'}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ThemeToggle />

        <Link
          to="/notifications"
          className="relative rounded-xl border border-[#30394d] p-2.5"
          aria-label="Notifications"
        >
          <Bell size={18} />

          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-indigo-500 text-[10px] text-white">
              {unread}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="rounded-xl border border-[#30394d] p-2.5 muted"
          title="Project information"
          aria-label="Project information"
        >
          <CircleHelp size={18} />
        </button>
      </div>
    </header>
  )
}
