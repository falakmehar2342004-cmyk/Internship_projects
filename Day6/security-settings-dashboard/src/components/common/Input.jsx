// Reusable React Hook Form input with a consistent label and validation message.
export default function Input({ name, label, type = 'text', register, error, autoComplete, placeholder }) {
  return <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <input id={name} type={type} placeholder={placeholder || label} autoComplete={autoComplete} aria-invalid={Boolean(error)} {...(register ? register(name) : {})} />
    {error && <small className="field-error">{error.message || error}</small>}
  </div>;
}
