
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Eye,
  EyeOff,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { getAppUser } from '../services/supabaseAuth';
import { logActivity } from '../services/activityLog';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setAuthState,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} from '../features/auth/authSlice';

import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ErrorMessage from '../components/common/ErrorMessage';

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/', {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location.state]);

  const onSubmit = async (values) => {
    dispatch(setAuthLoading(true));
    dispatch(clearAuthError());

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: values.email.trim(),
          password: values.password,
        });

      if (loginError) {
        dispatch(setAuthError(loginError.message));
        return;
      }

      if (!data.session || !data.user) {
        dispatch(setAuthError('Unable to create a login session.'));
        return;
      }

      const user = await getAppUser(data.user);

      dispatch(
        setAuthState({
          user,
          session: data.session,
          initialized: true,
        })
      );

      // Best-effort logging; a logging failure must not cancel login.
      void logActivity('login_success');

      navigate(location.state?.from?.pathname || '/', {
        replace: true,
      });
    } catch {
      dispatch(setAuthError('Unable to sign in. Please try again.'));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-theme-control">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>

      <div className="auth-layout">
        <section className="auth-promo">
          <div className="brand brand-large">
            <div className="brand-mark">
              <ShieldCheck size={25} />
            </div>
            <div>
              <strong>SecureSpace</strong>
              <small>Security dashboard</small>
            </div>
          </div>

          <div className="promo-content">
            <div className="eyebrow">
              <Sparkles size={15} /> SECURITY, SIMPLIFIED
            </div>
            <h1>
              Everything secure.
              <br />
              <span>All in one place.</span>
            </h1>
            <p>
              Manage your account security, devices, and sign-in activity
              from one clear dashboard.
            </p>
            <div className="promo-points">
              <span><ShieldCheck size={17} /> Account protection</span>
              <span><LockKeyhole size={17} /> Two-step verification</span>
            </div>
          </div>

          <div className="promo-footer">BUILT FOR PEACE OF MIND</div>
        </section>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-card-heading">
              <div className="auth-icon">
                <LockKeyhole size={22} />
              </div>
              <p className="eyebrow">WELCOME BACK</p>
              <h2>Sign in to your account</h2>
              <p>Enter your registered email and password to continue.</p>
            </div>

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <Input
                name="email"
                label="Email address"
                type="email"
                autoComplete="username"
                register={register}
                error={errors.email}
              />

              <div className="password-field">
                <Input
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  register={register}
                  error={errors.password}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="forgot-password-row">
                <Link to="/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="login-submit"
              >
                Sign in securely <ArrowRight size={17} />
              </Button>
            </form>

            <p className="auth-switch-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-switch-link">
                Sign up
              </Link>
            </p>

            <div className="demo-credentials">
              <strong>Secure sign in</strong>
              <p>
                Use the email and password you registered with. If email
                confirmation is enabled, confirm your email first.
              </p>
            </div>

            <p className="auth-note">
              Your account is authenticated through Supabase.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
