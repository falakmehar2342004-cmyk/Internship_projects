import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// Shared layout keeps sidebar and topbar consistent across authenticated pages.
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="main-shell"><Topbar onMenuClick={() => setSidebarOpen(true)} /><main className="page-content"><Outlet /></main><footer className="app-footer"><span>© 2026 SecureSpace</span><span>Security settings demo · No backend connected</span></footer></div></div>;
}
