import { useMemo, useState } from 'react';
import { mockActivityLogs } from '../data/mockData';
import ActivityFilters from '../components/activity/ActivityFilters';
import ActivityTable from '../components/activity/ActivityTable';
import { useAppSelector } from '../app/hooks';

// Search and status filters are combined with useMemo to avoid recalculating unnecessarily.
export default function ActivityLogs() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const role = useAppSelector((state) => state.auth.user?.role);
  const rows = useMemo(() => mockActivityLogs.filter((row) => (status === 'All' || row.status === status) && `${row.action} ${row.device} ${row.location}`.toLowerCase().includes(search.toLowerCase())), [search, status]);
  return <div className="page-stack"><section className="page-intro"><p className="eyebrow">ACCOUNT AUDIT TRAIL</p><h2>Activity logs</h2><p className="muted">{role === 'admin' ? 'Demo monitoring view of available sample events.' : 'Review recent sample activity for this demo account.'}</p></section><section className="panel"><div className="panel-heading"><div><h3>Recent events</h3><p>{rows.length} matching events</p></div></div><ActivityFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} /><ActivityTable rows={rows} /></section><p className="form-footnote"><span>ⓘ</span> These are static demo events, not a real audit log.</p></div>;
}
