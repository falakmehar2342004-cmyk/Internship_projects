import { CheckCircle2, XCircle } from 'lucide-react';

// Yahan order ka status rang-birangi goli (pill) mein dikhta hai
export default function StatusBadge({ status }) {
  if (status === 'success') {
    return (
      <span className="badge badge-success">
        <CheckCircle2 size={14} aria-hidden="true" /> Paid
      </span>
    );
  }
  return (
    <span className="badge badge-danger">
      <XCircle size={14} aria-hidden="true" /> Failed
    </span>
  );
}
