
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';

import { supabase } from '../lib/supabase';
import { logActivity } from '../services/activityLog';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

import Button from '../components/common/Button';
import Input from '../components/common/Input';

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async ({ password }) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // The recovery link should have established a valid session.
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        setError(
          'This reset link is invalid or has expired. Please request a new one.'
        );
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Log after the password update has succeeded.
      await logActivity('password_changed');

      // End the recovery session so the user signs in with the new password.
      await supabase.auth.signOut();
      dispatch(logout());
      setSuccess(true);
    } catch {
      setError('Unable to update your password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-card-heading">
              <div className="auth-icon">
                <ShieldCheck size={22} />
              </div>
              <h2>Password updated</h2>
              <p>
                Your password has been changed successfully. Sign in with
                your new password to continue.
              </p>
            </div>
            <Button
              type="button"
              className="login-submit"
              onClick={() => navigate('/login', { replace: true })}
            >
              Go to sign in
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-heading">
            <div className="auth-icon">
              <KeyRound size={22} />
            </div>
            <p className="eyebrow">ACCOUNT RECOVERY</p>
            <h2>Set a new password</h2>
            <p>Choose a strong password for your SecureSpace account.</p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
              {error.toLowerCase().includes('expired') && (
                <p>
                  <Link to="/forgot-password">Request a new reset link</Link>
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="password-field">
              <Input
                name="password"
                label="New password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                register={register}
                error={errors.password}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="password-field">
              <Input
                name="confirmPassword"
                label="Confirm new password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                register={register}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <Button type="submit" loading={loading} className="login-submit">
              Update password
            </Button>
          </form>

          <p className="auth-switch-text">
            <Link to="/login" className="auth-switch-link">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
