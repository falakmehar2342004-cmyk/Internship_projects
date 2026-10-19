// Yahan ek reusable form field hai (label + input/textarea + error message).
// `registration` wo cheez hai jo react-hook-form ka register('naam') wapis deta hai.
export default function FormField({ id, label, error, registration, type = 'text', as = 'input', ...rest }) {
  const Tag = as; // 'input' ya 'textarea'

  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <Tag
        id={id}
        className="input"
        {...(as === 'input' ? { type } : {})}
        aria-invalid={error ? 'true' : 'false'}
        {...registration}
        {...rest}
      />
      {/* Validation fail ho to error message yahan dikhta hai */}
      {error && <p className="field-error" role="alert">{error.message}</p>}
    </div>
  );
}
