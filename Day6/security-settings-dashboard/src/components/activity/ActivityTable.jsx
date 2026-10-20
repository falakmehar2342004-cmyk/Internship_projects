// Reusable table for audit/activity records.
export default function ActivityTable({ rows = [] }) {
  if (!rows.length) return <div className="empty-state">No activity matches these filters.</div>;
  return <div className="table-wrapper"><table className="activity-table"><thead><tr><th>Activity</th><th>Device</th><th>Location</th><th>Date</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><strong>{row.action}</strong></td><td>{row.device}</td><td>{row.location}</td><td>{row.date}</td><td><span className={`status-pill ${row.status === 'Success' ? 'success' : 'failed'}`}>{row.status}</span></td></tr>)}</tbody></table></div>;
}
