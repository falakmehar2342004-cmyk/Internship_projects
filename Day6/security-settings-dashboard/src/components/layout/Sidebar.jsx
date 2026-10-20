import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserRound, ShieldCheck, Activity, Laptop, Users, X, LockKeyhole } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';

// Navigation options are filtered by role; routes are also protected separately.
export default function Sidebar({ open, onClose }) {
  const role = useAppSelector((state) => state.auth.user?.role || 'user');
  const links = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile settings', icon: UserRound },
    { to: '/security', label: 'Security settings', icon: ShieldCheck },
    { to: '/activity', label: 'Activity logs', icon: Activity },
    { to: '/devices', label: 'Devices', icon: Laptop },
    ...(role === 'admin' ? [{ to: '/admin/users', label: 'User management', icon: Users }, { to: '/admin/monitoring', label: 'Security monitoring', icon: LockKeyhole }] : []),
  ];
  return <><div className={`sidebar-scrim ${open ? 'visible' : ''}`} onClick={onClose} /><aside className={`sidebar ${open ? 'sidebar-open' : ''}`}><div className="brand"><div className="brand-mark"><ShieldCheck size={22} /></div><div><strong>SecureSpace</strong><small>Security dashboard</small></div><button className="icon-button mobile-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button></div><div className="nav-label">WORKSPACE</div><nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav><div className="sidebar-bottom"><div className="sidebar-shield"><ShieldCheck size={18} /><div><strong>Your account is protected</strong><small>Review your security regularly</small></div></div><small className="version-label">SECURESPACE · DEMO BUILD</small></div></aside></>;
}
