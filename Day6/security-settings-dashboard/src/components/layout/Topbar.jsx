
import { useRef, useState } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { supabase } from '../../lib/supabase';
import { logActivity } from '../../services/activityLog';

const pageTitles = {
  '/': 'Overview',
  '/profile': 'Profile settings',
  '/security': 'Security settings',
  '/activity': 'Activity logs',
  '/devices': 'Device management',
  '/admin/users': 'User management',
  '/admin/monitoring': 'Security monitoring',
};

export default function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [loggingOut, setLoggingOut] = useState(false);
  const logoutStarted = useRef(false);

  const handleLogout = async () => {
    // Prevent repeated clicks from starting multiple logout requests.
    if (logoutStarted.current) return;

    logoutStarted.current = true;
    setLoggingOut(true);

    try {
      // Logging is best-effort and must not prevent logout.
      await logActivity('logout');
    } catch (error) {
      console.warn('Logout activity could not be recorded.', error);
    }

    try {
      const { error } = await supabase.auth.signOut();

      dispatch(logout());
      navigate('/login', { replace: true });

      if (error) {
        toast.error('Signed out locally, but the server reported an error.');
      } else {
        toast.success('You have signed out.');
      }
    } catch (error) {
      console.error('Logout failed:', error);

      // Ensure local access is cleared even if sign-out throws.
      dispatch(logout());
      navigate('/login', { replace: true });
      toast.error('You have been signed out locally.');
    } finally {
      setLoggingOut(false);
    }
  };

  const displayName = user?.name || 'User';

  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>

      <div className="topbar-title">
        <span>WORKSPACE / ACCOUNT</span>
        <h1>{pageTitles[location.pathname] || 'Dashboard'}</h1>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          onClick={() => toast('You are all caught up.')}
          aria-label="Notifications"
          type="button"
        >
          <Bell size={19} />
        </button>

        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="topbar-divider" />

        <div className="user-menu">
          <div className="avatar">
            {displayName.slice(0, 1).toUpperCase()}
          </div>

          <div className="user-menu-copy">
            <strong>{displayName}</strong>
            <small>
              {user?.role === 'admin' ? 'Administrator' : 'Standard user'}
            </small>
          </div>

          <ChevronDown size={15} />
        </div>

        <button
          className="icon-button logout-button"
          onClick={handleLogout}
          aria-label="Sign out"
          title={loggingOut ? 'Signing out...' : 'Sign out'}
          disabled={loggingOut}
          type="button"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
