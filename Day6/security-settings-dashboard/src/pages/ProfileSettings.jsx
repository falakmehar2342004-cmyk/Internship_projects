
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { UserRound, Mail, CalendarDays } from 'lucide-react';

import { useAppSelector } from '../app/hooks';
import { logActivity } from '../services/activityLog';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters.'),
  email: z.string().email('Enter a valid email.'),
});

export default function ProfileSettings() {
  const user = useAppSelector((state) => state.auth.user);

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem('demo-profile') || 'null') || {
          name: user?.name || 'Demo User',
          email: user?.email || 'user@securityapp.com',
        }
      );
    } catch {
      return {
        name: user?.name || 'Demo User',
        email: user?.email || 'user@securityapp.com',
      };
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const onSubmit = async (values) => {
    try {
      setProfile(values);
      localStorage.setItem('demo-profile', JSON.stringify(values));

      toast.success('Demo profile saved on this browser.');

      // Record the event without blocking the profile save.
      void logActivity('profile_updated');
    } catch (error) {
      console.error('Profile save failed:', error);
      toast.error('Could not save the profile in this browser.');
    }
  };

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">PERSONAL INFORMATION</p>
        <h2>Profile settings</h2>
        <p className="muted">
          Update the profile information shown in this demo.
        </p>
      </section>

      <section className="profile-header panel">
        <div className="profile-avatar">
          {profile.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <span className="status-pill neutral">
            {user?.role === 'admin' ? 'Administrator' : 'Standard user'}
          </span>
        </div>
      </section>

      <section className="panel settings-panel">
        <div className="panel-heading">
          <div className="heading-with-icon">
            <div className="setting-icon purple">
              <UserRound size={20} />
            </div>
            <div>
              <h3>Personal details</h3>
              <p>Changes are saved locally in your browser</p>
            </div>
          </div>
        </div>

        <form
          className="settings-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="name"
            label="Full name"
            autoComplete="name"
            register={register}
            error={errors.name}
          />

          <Input
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            register={register}
            error={errors.email}
          />

          <div className="profile-detail-row">
            <span>
              <Mail size={16} /> Account role
            </span>
            <strong>{user?.role || 'user'}</strong>
          </div>

          <div className="profile-detail-row">
            <span>
              <CalendarDays size={16} /> Member since
            </span>
            <strong>October 2025</strong>
          </div>

          <div className="form-actions">
            <Button type="submit" loading={isSubmitting}>
              Save profile
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
