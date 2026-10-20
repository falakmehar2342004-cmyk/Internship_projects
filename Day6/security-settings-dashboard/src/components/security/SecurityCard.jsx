import { ShieldCheck } from 'lucide-react';

// Compact status card for the overview's security summary.
export default function SecurityCard({ title, description, status = 'Enabled' }) {
  return <article className="security-card"><div className="security-card-icon"><ShieldCheck size={20} /></div><div className="security-card-copy"><strong>{title}</strong><p>{description}</p></div><span className={`status-pill ${status.toLowerCase() === 'enabled' ? 'success' : 'neutral'}`}>{status}</span></article>;
}
