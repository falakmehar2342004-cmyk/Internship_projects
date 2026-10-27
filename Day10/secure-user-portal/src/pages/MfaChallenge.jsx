// Authenticator-app MFA challenge.
// Password login ke baad AAL2 required ho to enrolled TOTP factor verify hota hai.

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const schema = z.object({
  code: z.string().trim().length(6, 'Enter the 6-digit authenticator code'),
});

export default function MfaChallenge() {
  const navigate = useNavigate();
  const [factor, setFactor] = useState(null);
  const [challengeId, setChallengeId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    let active = true;

    async function prepareChallenge() {
      try {
        const { data, error } = await supabase.auth.mfa.listFactors();
        if (error) throw error;

        const verifiedFactor = data.totp?.find(
          (item) => item.status === 'verified'
        );

        if (!verifiedFactor) {
          throw new Error('No verified authenticator factor was found.');
        }

        const { data: challenge, error: challengeError } =
          await supabase.auth.mfa.challenge({
            factorId: verifiedFactor.id,
          });

        if (challengeError) throw challengeError;

        if (active) {
          setFactor(verifiedFactor);
          setChallengeId(challenge.id);
        }
      } catch (error) {
        toast.error(error.message || 'Unable to prepare MFA challenge');
      } finally {
        if (active) setLoading(false);
      }
    }

    prepareChallenge();

    return () => {
      active = false;
    };
  }, []);

  async function onSubmit({ code }) {
    if (!factor || !challengeId) {
      toast.error('MFA challenge is not ready. Please sign in again.');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId,
        code,
      });

      if (error) throw error;

      toast.success('Two-factor verification successful');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Invalid authenticator code');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">EXTRA SECURITY</p>
        <h1>Verify it’s you</h1>
        <p className="muted">
          Open your authenticator app and enter its current six-digit code.
        </p>

        {loading ? (
          <p className="muted">Preparing secure verification...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
            <label className="field-label">
              Authenticator code
              <input
                className="text-input otp-input"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                {...register('code')}
                placeholder="000000"
              />
            </label>
            {errors.code && <p className="field-error">{errors.code.message}</p>}

            <button className="primary-button" disabled={submitting || !factor}>
              {submitting ? 'Verifying...' : 'Verify and continue'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}