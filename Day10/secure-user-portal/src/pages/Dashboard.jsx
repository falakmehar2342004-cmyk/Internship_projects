// Dashboard user ka account overview aur security status show karta hai.

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserRound, Settings2, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const displayName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <section className="content-section">
      <div className="welcome-banner">
        <div>
          <p className="eyebrow">YOUR SECURE WORKSPACE</p>
          <h1>Welcome, {displayName}</h1>
          <p className="muted">
            Manage your account and choose your security preferences.
          </p>
        </div>
        <div className="welcome-art"><ShieldCheck size={54} /></div>
      </div>

      <div className="dashboard-grid">
        <article className="surface-card">
          <div className="card-icon"><UserRound size={21} /></div>
          <p className="muted">Signed-in account</p>
          <h2 className="account-email">{user?.email}</h2>
          <span className="status-pill status-on">Authenticated</span>
        </article>

        <article className="surface-card">
          <div className="card-icon"><ShieldCheck size={21} /></div>
          <p className="muted">Extra protection</p>
          <h2>Two-factor authentication</h2>
          <p className="muted">
            Choose whether to set up an authenticator app.
          </p>
          <Link to="/security" className="inline-link">
            Manage security <ArrowUpRight size={16} />
          </Link>
        </article>

        <article className="surface-card">
          <div className="card-icon"><Settings2 size={21} /></div>
          <p className="muted">Account settings</p>
          <h2>Your choices</h2>
          <p className="muted">
            Review your account and security preferences.
          </p>
          <Link to="/security" className="inline-link">
            Open settings <ArrowUpRight size={16} />
          </Link>
        </article>
      </div>
    </section>
  );
}