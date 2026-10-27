
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import { setSession } from '../features/auth/authSlice';

// OTP must contain exactly six characters.
const schema = z.object({
  token: z.string().trim().length(6, 'Enter the 6-digit code'),
});

export default function EmailOtp() {
  const [params] = useSearchParams();//url mn eamil set krna ka kam ata ha
  const email = params.get('email') || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Verify the six-digit email OTP.
  async function onSubmit({ token }) {
    if (!email) {
      toast.error('Email address is missing. Please sign in again.');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: token.trim(),
        type: 'email',
      });

      if (error) throw error;

      dispatch(setSession(data.session));
      toast.success('Email OTP verified successfully!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  }

  // Request a fresh OTP if the previous code has expired.
  async function handleResendOtp() {
    if (!email) {
      toast.error('Email address is missing. Please sign in again.');
      navigate('/login');
      return;
    }

    setResending(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw error;

      reset({ token: '' });
      toast.success('A new verification code has been requested.');
    } catch (error) {
      toast.error(error.message || 'Could not resend the code.');
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">EMAIL VERIFICATION</p>
        <h1>Enter your code</h1>

        <p className="muted">
          Enter the six-digit code sent to {email || 'your email'}.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
          <label className="field-label">
            Verification code
            <input
              className="text-input otp-input"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              {...register('token')}
              disabled={loading || resending}
            />
          </label>

          {errors.token && (
            <p className="field-error">{errors.token.message}</p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading || resending}
          >
            {loading ? 'Verifying...' : 'Verify code'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleResendOtp}
            disabled={loading || resending}
          >
            {resending ? 'Sending new code...' : 'Resend Code'}
          </button>
        </form>
      </section>
    </main>
  );
}
