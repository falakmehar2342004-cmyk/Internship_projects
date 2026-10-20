
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { supabase } from './lib/supabase';
import { getAppUser } from './services/supabaseAuth';
import { setAuthState, setAuthError } from './features/auth/authSlice';

import ProtectedRoute, { RequireRole } from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Overview from './pages/Overview';
import ProfileSettings from './pages/ProfileSettings';
import SecuritySettings from './pages/SecuritySettings';
import ActivityLogs from './pages/ActivityLogs';
import DeviceManagement from './pages/DeviceManagement';
import AdminUsers from './pages/AdminUsers';
import AdminMonitoring from './pages/AdminMonitoring';
import NotFound from './pages/NotFound';

function AppRoutes() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, initialized } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let mounted = true;

    const restoreSession = async (session) => {
      if (!session?.user) {
        if (mounted) {
          dispatch(
            setAuthState({
              user: null,
              session: null,
              initialized: true,
            })
          );
        }
        return;
      }

      try {
        const user = await getAppUser(session.user);

        if (mounted) {
          dispatch(
            setAuthState({
              user,
              session,
              initialized: true,
            })
          );
        }
      } catch {
        if (mounted) {
          dispatch(setAuthError('Unable to restore your session.'));
          dispatch(
            setAuthState({
              user: null,
              session: null,
              initialized: true,
            })
          );
        }
      }
    };

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          if (mounted) {
            dispatch(setAuthError(error.message));
            dispatch(
              setAuthState({
                user: null,
                session: null,
                initialized: true,
              })
            );
          }
          return;
        }

        void restoreSession(data.session);
      })
      .catch(() => {
        if (mounted) {
          dispatch(
            setAuthState({
              user: null,
              session: null,
              initialized: true,
            })
          );
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Profile fetch ko auth callback ke baad schedule karte hain.
      // Isse Supabase auth callback ke andar doosri Supabase request
      // chalane se hone wali lock/deadlock problems se bacha ja sakta hai.
      Promise.resolve().then(() => {
        if (mounted) void restoreSession(session);
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="auth-page">
        <div className="otp-card">
          <p className="muted">Restoring your secure session...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public authentication routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
      />

      <Route
        path="/verify-otp"
        element={isAuthenticated ? <Navigate to="/" replace /> : <VerifyOtp />}
      />

      {/* Password recovery routes must remain accessible via email links. */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Dashboard routes require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="activity" element={<ActivityLogs />} />
          <Route path="devices" element={<DeviceManagement />} />

          {/* Admin routes require the database role "admin". */}
          <Route
            path="admin/users"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminUsers />
              </RequireRole>
            }
          />

          <Route
            path="admin/monitoring"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminMonitoring />
              </RequireRole>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
