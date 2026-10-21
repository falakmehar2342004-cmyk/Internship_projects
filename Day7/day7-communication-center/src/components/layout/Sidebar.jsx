
import { NavLink } from 'react-router-dom'
import {
  Activity,
  Bell,
  Inbox,
  LayoutDashboard,
  RadioTower,
  Send,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/emails', label: 'Email center', icon: Inbox },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/activity', label: 'Activity feed', icon: Activity },
  { to: '/apis', label: 'API gateway', icon: RadioTower },
]

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#252e43] bg-[#0e1425] p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="grid size-10 place-items-center rounded-xl bg-indigo-500">
          <Send size={20} />
        </div>
        <div>
          <p className="font-bold tracking-wide">
            pulse<span className="text-indigo-400">.</span>
          </p>
          <p className="text-xs muted">Communication center</p>
        </div>
      </div>

      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] muted">
        Workspace
      </p>

      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto hidden rounded-xl border border-[#29334a] bg-[#141d31] p-4 md:block">
        <p className="text-sm font-semibold">Stay in sync</p>
        <p className="mt-1 text-xs leading-5 muted">
          Email, activity and notifications in one place.
        </p>
      </div>
    </aside>
  )
}
