
import { useCallback, useEffect, useState } from 'react';
import { Activity, ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';

import { supabase } from '../lib/supabase';

function formatAction(action) {
  const labels = {
    login_success: 'Successful login',
    logout: 'Signed out',
    password_changed: 'Password changed',
    profile_updated: 'Profile updated',
    security_settings_updated: 'Security settings updated',
    login_failed: 'Failed login',
  };

  return labels[action] || action.replaceAll('_', ' ');
}

function formatDate(value) {
  if (!value) return 'Unknown';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Unknown';

  return date.toLocaleString();
}

export default function AdminMonitoring() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadActivityLogs = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('activity_logs')
        .select('id, user_id, action, created_at, details')
        .order('created_at', { ascending: false })
        .limit(100);

      if (fetchError) {
        throw fetchError;
      }

      setLogs(data || []);
    } catch (err) {
      console.error('Failed to load activity logs:', err);
      setError(
        'Unable to load activity logs. Check your admin permissions and Supabase RLS policies.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivityLogs();
  }, [loadActivityLogs]);

  const failedLogs = logs.filter((log) =>
    log.action.toLowerCase().includes('failed')
  );

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">ADMINISTRATION</p>
        <h2>Security monitoring</h2>
        <p className="muted">
          Review real account activity recorded in Supabase.
        </p>
      </section>

      <section className="stats-grid admin-stats">
        <article className="stat-card">
          <div className="stat-icon blue">
            <Activity size={20} />
          </div>
          <span>Recorded events</span>
          <strong>{loading ? '—' : logs.length}</strong>
          <small>Latest 100 records</small>
        </article>

        <article className="stat-card">
          <div className="stat-icon amber">
            <ShieldAlert size={20} />
          </div>
          <span>Failed events</span>
          <strong>{loading ? '—' : failedLogs.length}</strong>
          <small>Recorded failures only</small>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">
            <ShieldCheck size={20} />
          </div>
          <span>Activity source</span>
          <strong>Live DB</strong>
          <small>Supabase activity_logs</small>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Recent activity</h3>
            <p>Newest events appear first.</p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={loadActivityLogs}
            disabled={loading}
            aria-label="Refresh activity logs"
            title="Refresh activity logs"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>
            <button type="button" onClick={loadActivityLogs}>
              Try again
            </button>
          </div>
        )}

        {!error && loading && (
          <p className="muted">Loading activity logs...</p>
        )}

        {!loading && !error && logs.length === 0 && (
          <div className="empty-state">
            <Activity size={24} />
            <h3>No activity recorded yet</h3>
            <p className="muted">
              Login or logout, then refresh this page to see the event.
            </p>
          </div>
        )}

        {!error && logs.length > 0 && (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User ID</th>
                  <th>Date and time</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <strong>{formatAction(log.action)}</strong>
                    </td>

                    <td>
                      <span title={log.user_id}>
                        {log.user_id
                          ? `${log.user_id.slice(0, 8)}…`
                          : 'Unknown'}
                      </span>
                    </td>

                    <td>{formatDate(log.created_at)}</td>

                    <td>
                      {log.details &&
                      Object.keys(log.details).length > 0
                        ? JSON.stringify(log.details)
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
