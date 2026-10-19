// Yahan dashboard ka ek number wala card hai (icon + label + bara number + chhoti hint)
export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="card stat-card">
      <div className="flex items-center justify-between gap-3">
        <p className="muted text-sm font-bold">{label}</p>
        <span className="stat-icon"><Icon size={18} aria-hidden="true" /></span>
      </div>
      <p className="stat-value mt-3">{value}</p>
      {hint && <p className="muted mt-1 text-xs">{hint}</p>}
    </div>
  );
}
