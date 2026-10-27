// Signup form user account create karta hai.
// Supabase project ki email-confirmation setting ke mutabiq
// user ko email verification ki zaroorat ho sakti hai.

import { useState } from 'react';//Jb signup ho ya loading state manage krta ha 
import { useForm, useWatch } from 'react-hook-form';//
import { z } from 'zod';//define form validation rules
import { zodResolver } from '@hookform/resolvers/zod';//connect zod rules to hook foorm
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/supabaseClient';
import { setSession } from '../features/auth/authSlice';
import { UserRound, Mail, UserPlus } from 'lucide-react';
import { setError, clearError } from '../features/error/errorSlice';
import PasswordInput from '../components/common/PasswordInput';
import PasswordStrength from '../components/common/PasswordStrength';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  password: z.string()
    .min(8, 'Use at least 8 characters')
    .regex(/[A-Z]/, 'Add at least one uppercase letter')
    .regex(/[a-z]/, 'Add at least one lowercase letter')
    .regex(/[0-9]/, 'Add at least one number'),
});

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,//input fileds ko react hoook sa connect krta ha 
    handleSubmit,
    control,//useWatch jaise features ke liye form control provide karta hai.
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  // Strength meter ke liye live password value.
  const passwordValue = useWatch({ control, name: 'password' });

  async function onSubmit(values) {
    setLoading(true);
    dispatch(clearError());

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.name },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      if (data.session) {
        dispatch(setSession(data.session));
        toast.success('Account created successfully');
        navigate('/dashboard', { replace: true });
      } else {
        toast.success('Check your inbox to verify your email');
        navigate('/login');
      }
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark"><UserPlus size={26} /></div>
        <p className="eyebrow">GET STARTED</p>
        <h1>Create your account</h1>
        <p className="muted">Your security settings stay in your control.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
          <label className="field-label">
            Full name
            <span className="input-wrap">
              <UserRound size={18} />
              <input
                {...register('name')}
                placeholder="Your name"
                autoComplete="name"
              />
            </span>
          </label>
          {errors.name && <p className="field-error">{errors.name.message}</p>}

          <label className="field-label">
            Email address
            <span className="input-wrap">
              <Mail size={18} />
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </span>
          </label>
          {errors.email && <p className="field-error">{errors.email.message}</p>}

          <label className="field-label">
            Password
            <PasswordInput
              autoComplete="new-password"
              {...register('password')}
              placeholder="Create a strong password"
            />
          </label>
          {errors.password && <p className="field-error">{errors.password.message}</p>}

          <PasswordStrength password={passwordValue} />

          <button className="primary-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}