
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Emails from './pages/Emails'
import Notifications from './pages/Notifications'
import Activity from './pages/Activity'
import ApiDashboard from './pages/ApiDashboard'
import NotFound from './pages/NotFound'
import { ToastProvider } from './hooks/useToast'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="emails" element={<Emails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity" element={<Activity />} />
          <Route path="apis" element={<ApiDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}
