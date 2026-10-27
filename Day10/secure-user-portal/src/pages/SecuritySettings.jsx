// User khud authenticator-app 2FA enable kar sakta hai.
// Enrollment verify hone ke baad hi factor active samjha jata hai.
// Disable karne se pehle current authenticator code verify karte hain.

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { ShieldCheck, ShieldOff, Copy, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const codeSchema = z.object({
  code: z.string().trim().length(6, 'Enter the 6-digit code'),
});

export default function SecuritySettings() {
  const [factor, setFactor] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(codeSchema) });

  async function refreshFactors() {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) throw error;

    const verified = data.totp?.find((item) => item.status === 'verified');
    setFactor(verified || null);
  }

  useEffect(() => {
    refreshFactors()
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function startEnrollment() {
    setBusy(true);

    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Secure User Portal Authenticator',
      });

      if (error) throw error;

      // QR code app se scan karwana hai; secret ko public/share nahi karna.
      setEnrollment(data);
      toast.success('Scan the QR code, then verify the code');
    } catch (error) {
      toast.error(error.message || 'Could not start MFA setup');
    } finally {
      setBusy(false);
    }
  }

  async function verifyEnrollment({ code }) {
    setBusy(true);

    try {
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId: enrollment.id,
        });

      if (challengeError) throw challengeError;

      const { error } = await supabase.auth.mfa.verify({
        factorId: enrollment.id,
        challengeId: challenge.id,
        code,
      });

      if (error) throw error;

      setEnrollment(null);
      reset();
      await refreshFactors();
      toast.success('Authenticator 2FA enabled');
    } catch (error) {
      toast.error(error.message || 'Could not verify authenticator');
    } finally {
      setBusy(false);
    }
  }

  async function disableMfa({ code }) {
    setBusy(true);

    try {
      // Current code verify karna zaroori hai before removing the factor.
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({
          factorId: factor.id,
        });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: challenge.id,
        code,
      });

      if (verifyError) throw verifyError;

      const { error: unenrollError } =
        await supabase.auth.mfa.unenroll({
          factorId: factor.id,
        });

      if (unenrollError) throw unenrollError;

      reset();
      await refreshFactors();
      toast.success('Authenticator 2FA disabled');
    } catch (error) {
      toast.error(error.message || 'Could not disable 2FA');
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="page-loader">Loading security settings...</div>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ACCOUNT PROTECTION</p>
          <h1>Security settings</h1>
          <p className="muted">
            Choose the additional security that works for you.
          </p>
        </div>
      </div>

      <article className="surface-card security-card">
        <div className="security-card-top">
          <div className="security-icon">
            {factor ? <ShieldCheck size={24} /> : <ShieldOff size={24} />}
          </div>
          <div className="grow">
            <h2>Authenticator-app 2FA</h2>
            <p className="muted">
              Use an app that generates time-based verification codes.
            </p>
          </div>
          <span className={`status-pill ${factor ? 'status-on' : 'status-off'}`}>
            {factor ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {!factor && !enrollment && (
          <button
            type="button"
            className="primary-button"
            onClick={startEnrollment}
            disabled={busy}
          >
            {busy ? 'Preparing...' : 'Enable 2FA'}
          </button>
        )}

        {enrollment && (
          <div className="mfa-setup">
            <h3>Connect your authenticator app</h3>
            <p className="muted">
              Scan this QR code using your authenticator app.
            </p>

            <div className="qr-frame">
              <img
                src={enrollment.totp.qr_code}
                alt="Authenticator enrollment QR code"
              />
            </div>

            <label className="field-label">Manual setup key</label>
            <div className="secret-row">
              <code>{enrollment.totp.secret}</code>
              <button
                type="button"
                className="icon-button"
                aria-label="Copy setup key"
                onClick={() => {
                  navigator.clipboard.writeText(enrollment.totp.secret);
                  toast.success('Setup key copied');
                }}
              >
                <Copy size={17} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(verifyEnrollment)}
              className="form-stack"
            >
              <label className="field-label">
                Enter the code from your app
                <input
                  className="text-input otp-input"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                  {...register('code')}
                  placeholder="000000"
                />
              </label>
              {errors.code && <p className="field-error">{errors.code.message}</p>}

              <button className="primary-button" disabled={busy}>
                {busy ? 'Verifying...' : 'Verify and enable 2FA'}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={async () => {
                  try {
                    await supabase.auth.mfa.unenroll({
                      factorId: enrollment.id,
                    });
                    setEnrollment(null);
                    reset();
                    toast('Setup cancelled');
                  } catch (error) {
                    toast.error(error.message);
                  }
                }}
              >
                Cancel setup
              </button>
            </form>
          </div>
        )}

        {factor && (
          <form
            onSubmit={handleSubmit(disableMfa)}
            className="form-stack mfa-disable-form"
          >
            <p className="muted">
              To disable 2FA, verify a current code from your authenticator app.
            </p>
            <label className="field-label">
              Current authenticator code
              <input
                className="text-input otp-input"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                {...register('code')}
                placeholder="000000"
              />
            </label>
            {errors.code && <p className="field-error">{errors.code.message}</p>}

            <button type="submit" className="danger-button" disabled={busy}>
              {busy ? <LoaderCircle className="spin" size={18} /> : null}
              Disable 2FA
            </button>
          </form>
        )}
      </article>

      <p className="muted small security-note">
        Email OTP sign-in is a separate login method. It is not the same as
        authenticator-app MFA.
      </p>
    </section>
  );
}