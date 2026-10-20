
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { KeyRound, ShieldCheck, Smartphone } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateSetting } from '../features/security/securitySlice';
import { logActivity } from '../services/activityLog';

import Toggle from '../components/common/Toggle';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import PasswordStrength from '../components/security/PasswordStrength';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password.'),
    newPassword: z.string().min(8, 'Use at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export default function SecuritySettings() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.security.settings);

  const [strengthPassword, setStrengthPassword] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const changeSetting = (key, value) => {
    dispatch(updateSetting({ key, value }));

    // Best-effort activity logging; this does not persist the setting
    // to Supabase or block the local Redux update.
    void logActivity('security_settings_updated');

    toast.success('Security preference saved.');
  };

  const onPasswordSubmit = async () => {
    toast.success(
      'Demo validation passed. No real password was changed.'
    );

    reset();
    setStrengthPassword('');
  };

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">PROTECT YOUR ACCOUNT</p>
        <h2>Security settings</h2>
        <p className="muted">
          Manage sign-in protection and account notifications.
        </p>
      </section>

      <section className="panel settings-panel">
        <div className="panel-heading">
          <div className="heading-with-icon">
            <div className="setting-icon green">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3>Sign-in protection</h3>
              <p>Add layers of security to your account</p>
            </div>
          </div>
        </div>

        <Toggle
          label="Two-factor authentication (2FA)"
          description="Ask for a 6-digit demo code after password sign-in."
          checked={settings.twoFactorEnabled}
          onChange={(value) =>
            changeSetting('twoFactorEnabled', value)
          }
        />

        <div className="setting-divider" />

        <Toggle
          label="Login alerts"
          description="Show alerts for sign-in activity in this demo."
          checked={settings.loginAlerts}
          onChange={(value) => changeSetting('loginAlerts', value)}
        />

        <div className="setting-divider" />

        <Toggle
          label="Email notifications"
          description="Enable account notification preference."
          checked={settings.emailNotifications}
          onChange={(value) =>
            changeSetting('emailNotifications', value)
          }
        />
      </section>

      <section className="panel settings-panel">
        <div className="panel-heading">
          <div className="heading-with-icon">
            <div className="setting-icon blue">
              <KeyRound size={20} />
            </div>
            <div>
              <h3>Change password</h3>
              <p>Validate a sample password form</p>
            </div>
          </div>
        </div>

        <form
          className="settings-form"
          onSubmit={handleSubmit(onPasswordSubmit)}
        >
          <Input
            name="currentPassword"
            label="Current password"
            type="password"
            autoComplete="current-password"
            register={register}
            error={errors.currentPassword}
          />

          <Input
            name="newPassword"
            label="New password"
            type="password"
            autoComplete="new-password"
            register={(name) => ({
              ...register(name),
              onChange: (event) => {
                register(name).onChange(event);
                setStrengthPassword(event.target.value);
              },
            })}
            error={errors.newPassword}
          />

          <PasswordStrength password={strengthPassword} />

          <Input
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            register={register}
            error={errors.confirmPassword}
          />

          <div className="form-actions">
            <Button type="submit" loading={isSubmitting}>
              Validate password form
            </Button>
          </div>

          <p className="form-footnote">
            <ShieldCheck size={14} /> Demo only: password is not sent to a
            server or saved.
          </p>
        </form>
      </section>

      <section className="notice-card">
        <div className="notice-icon">
          <Smartphone size={20} />
        </div>
        <div>
          <strong>About two-factor verification</strong>
          <p>
            When enabled, the demo asks for code <code>123456</code> after a
            valid demo login. Real email/SMS delivery and secure OTP
            verification require a backend or identity provider.
          </p>
        </div>
      </section>
    </div>
  );
}
