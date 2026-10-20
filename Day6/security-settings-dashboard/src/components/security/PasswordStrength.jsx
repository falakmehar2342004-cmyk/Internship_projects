// A simple client-side password-strength hint; it does not validate server security policy.
export default function PasswordStrength({ password = '' }) {
  const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
  const label = score <= 1 ? 'Weak' : score <= 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong';
  return <div className="password-strength"><div className="strength-bars">{[1, 2, 3, 4].map((step) => <span key={step} className={score >= step ? `strength-${label.toLowerCase()}` : ''} />)}</div><small>Password strength: {password ? label : 'Enter a password'}</small></div>;
}
