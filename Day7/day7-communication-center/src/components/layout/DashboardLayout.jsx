
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto max-w-[1500px] p-4 md:p-8">
          <Outlet />
        </main>

        <footer className="px-5 pb-6 text-center text-xs muted">
          Pulse Communication Center · Day 7 learning project
        </footer>
      </div>
    </div>
  )
}
