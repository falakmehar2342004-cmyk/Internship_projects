import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ShieldCheck,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { getAppUser } from '../services/supabaseAuth';
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

// Signup fields ki validation.
const schema = z
  .object({
    fullName: z.string().trim().min(2, 'Enter your full name.'),
    email: z.string().trim().email('Enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Already signed-in users ko dashboard par bhej dete hain.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    dispatch(setAuthLoading(true));
    dispatch(clearAuthError());
    setSuccessMessage('');

    try {
      // Supabase account create karta hai.
      // Role intentionally send nahi kar rahe; database trigger "user" set karega.
      const { data, error: signupError } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          data: {
            full_name: values.fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signupError) {
        dispatch(setAuthError(signupError.message));
        return;
      }

      // Agar project email confirmation ke baghair session deta hai,
      // to user ko foran signed-in state mein set kar do.
      if (data.session && data.user) {
        const user = await getAppUser(data.user);

        dispatch(
          setAuthState({
            user,
            session: data.session,
            initialized: true,
          })
        );

        navigate('/', { replace: true });
        return;
      }

      // Email confirmation enabled ho to aam tor par session abhi null hota hai.
      setSuccessMessage(
        'Your account request was received. Check your email for the confirmation link before signing in.'
      );
    } catch {
      dispatch(
        setAuthError('Unable to create your account. Please try again.')
      );
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
        {/* Signup ke liye existing SecureSpace branding reuse ki hai. */}
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
              <ShieldCheck size={15} /> YOUR SECURITY STARTS HERE
            </div>

            <h1>
              Create your account.
              <br />
              <span>Stay in control.</span>
            </h1>

            <p>
              Set up your SecureSpace account to manage your profile,
              devices, and security settings.
            </p>

            <div className="promo-points">
              <span>
                <UserRound size={17} /> Personal account
              </span>
              <span>
                <LockKeyhole size={17} /> Secure authentication
              </span>
            </div>
          </div>

          <div className="promo-footer">BUILT FOR PEACE OF MIND</div>
        </section>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-card-heading">
              <div className="auth-icon">
                <UserRound size={22} />
              </div>

              <p className="eyebrow">GET STARTED</p>
              <h2>Create your account</h2>
              <p>Enter your details to join SecureSpace.</p>
            </div>

            <ErrorMessage message={error} />

            {/* Email verification ka success message yahan show hota hai. */}
            {successMessage && (
              <div className="success-message" role="status">
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="auth-form"
            >
              <Input
                name="fullName"
                label="Full name"
                type="text"
                autoComplete="name"
                register={register}
                error={errors.fullName}
              />

              <Input
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                register={register}
                error={errors.email}
              />

              <Input
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                register={register}
                error={errors.password}
              />

              <Input
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                register={register}
                error={errors.confirmPassword}
              />

              <Button
                type="submit"
                loading={loading}
                className="login-submit"
              >
                Create account <ArrowRight size={17} />
              </Button>
            </form>

            <div className="demo-credentials">
              <strong>Account security</strong>
              <p>
                New accounts receive the standard user role. Email
                confirmation may be required before your first sign-in.
              </p>
            </div>

            <p className="auth-help">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>

            <p className="auth-note">
              By creating an account, you agree to keep your login
              credentials private.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}