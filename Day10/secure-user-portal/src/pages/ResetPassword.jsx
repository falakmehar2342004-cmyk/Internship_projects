
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Check, ShieldCheck, X } from 'lucide-react';

import { supabase } from '../lib/supabaseClient';
import { clearSession } from '../features/auth/authSlice';
import PasswordInput from '../components/common/PasswordInput';
import PasswordStrength from '../components/common/PasswordStrength';

// Password kam az kam 8 characters ka hona chahiye.
// Confirm password ko original password se match bhi karna hai.
const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Please confirm your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Strength meter aur "passwords match" indicator ke liye live values.
  const passwordValue = useWatch({ control, name: 'password' });
  const confirmValue = useWatch({ control, name: 'confirmPassword' });

  // Recovery link open hone ke baad Supabase session check karo.
  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (active) {
          setHasSession(Boolean(data.session));
        }
      } catch {
        if (active) {
          setHasSession(false);
        }
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  // Valid session ke baghair password reset nahi karna.
  useEffect(() => {
    if (checkingSession || hasSession) return;

    toast.error('Reset link is invalid or expired. Request a new one.');
    navigate('/login', { replace: true });
  }, [checkingSession, hasSession, navigate]);

  // Supabase mein naya password save karo.
  async function onSubmit(values) {
    if (!hasSession) {
      toast.error('Please open a valid password reset link.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      // Password update ke baad session end karke login par bhejo.
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        // Password update successful hai; logout failure ko alag handle karo.
        toast.success('Password updated successfully. Please sign in again.');
      } else {
        toast.success('Password updated successfully. Please sign in again.');
      }

      dispatch(clearSession());
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession || !hasSession) {
    return (
      <div className="page-loader">
        Checking your password reset link...
      </div>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">
          <ShieldCheck size={27} />
        </div>

        <p className="eyebrow">ACCOUNT RECOVERY</p>
        <h1>Reset password</h1>

        <p className="muted">
          Choose a new password for your Secure User Portal account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-stack"
        >
          <label className="field-label">
            New password

            <PasswordInput
              placeholder="At least 8 characters"
              autoComplete="new-password"
              {...register('password')}
              disabled={loading}
            />
          </label>

          <PasswordStrength password={passwordValue} />

          {errors.password && (
            <p className="field-error">
              {errors.password.message}
            </p>
          )}

          <label className="field-label">
            Confirm new password

            <PasswordInput
              placeholder="Enter password again"
              autoComplete="new-password"
              {...register('confirmPassword')}
              disabled={loading}
            />
          </label>

          {confirmValue && (
            <p
              className={`pw-match ${
                confirmValue === passwordValue ? 'ok' : 'bad'
              }`}
            >
              {confirmValue === passwordValue ? (
                <>
                  <Check size={14} /> Passwords match
                </>
              ) : (
                <>
                  <X size={14} /> Passwords do not match yet
                </>
              )}
            </p>
          )}

          {errors.confirmPassword && (
            <p className="field-error">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? 'Updating password...' : 'Update password'}
          </button>
        </form>
      </section>
    </main>
  );
}
