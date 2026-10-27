
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  Mail,
  Search,
  CreditCard,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import ContactSupport from './pages/ContactSupport';
import { supabase } from './lib/supabaseClient';
import { setSession, clearSession } from './features/auth/authSlice';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/common/ThemeToggle';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailOtp from './pages/EmailOtp';
import MfaChallenge from './pages/MfaChallenge';
import Dashboard from './pages/Dashboard';
import SecuritySettings from './pages/SecuritySettings';
import ResetPassword from './pages/ResetPassword';
import SearchPage from './pages/SearchPage';
import PricingPage from './pages/PricingPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailure from './pages/CheckoutFailure';
import CheckoutPage from './pages/CheckoutPage';

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Existing Supabase session Redux mein load karo.
    //supabase.auth.getSession()  ya check krta ha ka browser mn valid login session available ha ya nhi
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        dispatch(clearSession());
        return;
      }

      dispatch(setSession(data.session));// Supabase se milne wala session Redux mein save karta hai.
    });

    // Login, logout aur recovery ke baad session changes listen karo.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => subscription.unsubscribe();//Iska faida hai ke component unmount hone par listener unsubscribe ho jata hai.
  }, [dispatch]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    dispatch(clearSession());
    toast.success('Signed out successfully');
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      {user && (
        <aside className="sidebar">
          <Link to="/dashboard" className="brand">
            <span className="brand-mark">
              <ShieldCheck size={23} />
            </span>

            <span>
              Secure<span className="brand-accent">Portal</span>
            </span>
          </Link>

          <p className="nav-label">WORKSPACE</p>

          <nav className="side-nav">
            <NavLink to="/dashboard">
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/security">
              <Settings size={18} />
              Security settings
            </NavLink>

            <NavLink to="/contact-support">
              <Mail size={18} />
              Contact Us
            </NavLink>

            <NavLink to="/search">
              <Search size={18} />
              Search
            </NavLink>

            <NavLink to="/pricing">
              <CreditCard size={18} />
              <span>Payment</span>
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <p className="sidebar-email">{user.email}</p>

            <button
              className="sidebar-logout"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </aside>
      )}

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <ShieldCheck size={22} />
            SecurePortal
          </div>

          

          <span className="topbar-status">
            <span className="online-dot" />
            Secure workspace
          </span>

          <ThemeToggle />
        </header>

        <main className="main-content">
          {!initialized ? (
            <div className="page-loader">
              Loading your secure session...
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={user ? '/dashboard' : '/login'}
                    replace
                  />
                }
              />

        <Route element={<ProtectedRoute />}>
  {/* Existing protected routes yahan rehne do */}

  <Route
    path="/contact-support"
    element={<ContactSupport />}
  />
</Route>
      <Route
  path="/search"
  element={<SearchPage />}
/>

<Route path="/pricing" element={<PricingPage />} />
<Route path="/checkout-success" element={<CheckoutSuccess />} />
<Route path="/checkout-failure" element={<CheckoutFailure />} />
<Route path="/checkout" element={<CheckoutPage />} />

              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/signup"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Signup />
                  )
                }
              />

              <Route
                path="/reset-password"
                element={<ResetPassword />}
              />

              <Route
                path="/email-otp"
                element={<EmailOtp />}
              />

              <Route
                path="/mfa-challenge"
                element={<MfaChallenge />}
              />

              <Route element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/security"
                  element={<SecuritySettings />}
                />
              </Route>



              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    //Browser Router-> routing functionality provide krta ha
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
