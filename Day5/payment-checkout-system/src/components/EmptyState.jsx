// Yahan "kuch nahi mila" wala card hai: icon + title + message + optional buttons
export default function EmptyState({ icon: Icon, title, message, children }) {
  return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      {Icon && (
        <span className="result-icon mx-auto" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
          <Icon size={28} aria-hidden="true" />
        </span>
      )}
      <h2 className="mt-4">{title}</h2>
      {message && <p className="muted mt-2">{message}</p>}
      {/* children mein jo buttons pass honge wo yahan dikhenge */}
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
