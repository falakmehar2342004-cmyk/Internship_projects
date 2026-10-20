
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setAuthLoading,
  setAuthError,
  clearAuthError,
} from '../features/auth/authSlice';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ErrorMessage from '../components/common/ErrorMessage';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
});

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }) => {
    dispatch(setAuthLoading(true));
    dispatch(clearAuthError());
    setSent(false);

    try {
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo,
        });

      if (resetError) {
        dispatch(
          setAuthError(
            'We could not send the reset email right now. Please try again later.'
          )
        );
        return;
      }

      // Generic message avoids revealing whether an email is registered.
      setSent(true);
    } catch {
      dispatch(
        setAuthError(
          'We could not process your request. Please try again later.'
        )
      );
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-heading">
            <div className="auth-icon">
              <Mail size={22} />
            </div>
            <p className="eyebrow">ACCOUNT RECOVERY</p>
            <h2>Forgot your password?</h2>
            <p>
              Enter your registered email. If an account matches, we'll send
              instructions to reset your password.
            </p>
          </div>

          <ErrorMessage message={error} />

          {sent ? (
            <div className="success-message" role="status">
              <ShieldCheck size={20} />
              <p>
                If an account exists for that email, a password reset link
                will be sent. Check your inbox and spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <Input
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                register={register}
                error={errors.email}
              />

              <Button type="submit" loading={loading} className="login-submit">
                Send reset link
              </Button>
            </form>
          )}

          <p className="auth-switch-text">
            <Link to="/login" className="auth-switch-link">
              <ArrowLeft size={15} /> Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
