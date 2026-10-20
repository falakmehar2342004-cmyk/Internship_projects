// Accessible switch for preferences that can be enabled or disabled.
export default function Toggle({ label, description, checked, onChange, disabled = false }) {
  return <div className="toggle-row">
    <div><strong>{label}</strong>{description && <p className="muted">{description}</p>}</div>
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} className={`switch ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}><span /></button>
  </div>;
}
