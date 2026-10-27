// Password login + passwordless email OTP + password recovery.
// React Hook Form inputs manage karta hai; Zod input validation karta hai.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { setSession } from '../features/auth/authSlice';
import { setError, clearError } from '../features/error/errorSlice';
import PasswordInput from '../components/common/PasswordInput';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().optional(),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpMode, setOtpMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values) {
     if (!otpMode && (!values.password || values.password.length < 8)) {
    toast.error('Password must have at least 8 characters');
    return;
  }

  setLoading(true);
  dispatch(clearError());
    setLoading(true);
    dispatch(clearError());

    try {
      if (otpMode) {
        // Passwordless OTP login: this is an alternative login method,
        // not automatically a second factor after password authentication.
        const { error } = await supabase.auth.signInWithOtp({
          email: values.email,
          options: { shouldCreateUser: false },//ka matlab is login request ke zariye naya account create na kiya jaye.
        });

        if (error) throw error;

        toast.success('Login code sent to your email');
        navigate(`/email-otp?email=${encodeURIComponent(values.email)}`);
        return;
      }

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

      if (error) throw error;

      dispatch(setSession(data.session));

      // If an authenticator factor is enrolled and AAL2 is required,
      // the protected route will send the user to MFA verification.
      const { data: assurance, error: assuranceError } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (assuranceError) throw assuranceError;

      toast.success('Login successful');

      navigate(
        assurance.nextLevel === 'aal2' &&
        assurance.currentLevel !== 'aal2'
          ? '/mfa-challenge'
          : '/dashboard',
        { replace: true }
      );
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  }

  //getValues() React Hook Form se current field values read karta hai. Is file mein ye Forgot Password function ko email dene ke liye use hota hai.
  async function handleForgotPassword() {
    const email = getValues('email');

    if (!email) {
      toast.error('Enter your email address first');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;

      toast.success('Password recovery link sent');
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark"><ShieldCheck size={27} /></div>
        <p className="eyebrow">SECURE USER PORTAL</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to manage your secure account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
          <label className="field-label">
            Email address
            <span className="input-wrap">
              <Mail size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email')}
              />
            </span>
          </label>
          {errors.email && <p className="field-error">{errors.email.message}</p>}

          {!otpMode && (
            <>
              <label className="field-label">
                Password
                <PasswordInput
                  placeholder="At least 8 characters"
                  autoComplete="current-password"
                  {...register('password')}
                />
              </label>
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </>
          )}

          <button className="primary-button" disabled={loading}>
            {loading
              ? 'Please wait...'
              : otpMode ? 'Send email login code' : 'Sign in'}
          </button>
        </form>

        {!otpMode && (
          <button
            type="button"
            className="text-button"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot password?
          </button>
        )}

        <button
          type="button"
          className="text-button"
          onClick={() => setOtpMode((value) => !value)}
        >
          {otpMode
            ? 'Use password instead'
            : 'Sign in with an email OTP'}
        </button>

        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}