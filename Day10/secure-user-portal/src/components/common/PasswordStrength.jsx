// Password ke neeche live strength meter: Weak / Fair / Good / Strong.
// Yeh sirf display ke liye hai; validation ka logic Zod schema mein hi rehta hai.

import { Check, Circle } from 'lucide-react';

const RULES = [
  { id: 'length', label: '8+ characters', test: (p) => p.length >= 8 },
  { id: 'upper', label: 'Uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'Lowercase letter', test: (p) => /[a-z]/.test(p) },
  { id: 'number', label: 'Number', test: (p) => /[0-9]/.test(p) },
];

const LEVELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function evaluate(password) {
  if (!password) return { level: 0, passed: {} };

  const passed = {};
  RULES.forEach((rule) => {
    passed[rule.id] = rule.test(password);
  });

  // Base points: 4 rules + symbol + 12 ya zyada characters.
  let points = RULES.filter((rule) => passed[rule.id]).length;
  if (/[^A-Za-z0-9]/.test(password)) points += 1;
  if (password.length >= 12) points += 1;

  let level;
  if (points <= 2) level = 1;
  else if (points === 3) level = 2;
  else if (points === 4) level = 3;
  else level = 4;

  // Chhota password ya aam pattern kabhi strong nahi ho sakta.
  const lower = password.toLowerCase();
  const isCommon =
    /^(.)\1+$/.test(password) ||
    lower.includes('password') ||
    lower.includes('12345') ||
    lower.includes('qwerty');

  if (password.length < 8 || isCommon) level = 1;

  return { level, passed };
}

export default function PasswordStrength({ password = '' }) {
  const { level, passed } = evaluate(password);
  const label = level ? LEVELS[level] : 'Not set';

  return (
    <div className="pw-meter" data-level={level}>
      <div className="pw-meter-head">
        <span>Password strength</span>
        {/* key={level}: level badalne par label ki pop animation dobara chalti hai */}
        <span
          key={level}
          className="pw-label pop"
          role="status"
          aria-live="polite"
        >
          {label}
        </span>
      </div>

      <div className="pw-bars" aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`pw-bar ${level >= step ? 'on' : ''}`}
          />
        ))}
      </div>

      <ul className="pw-rules">
        {RULES.map((rule) => (
          <li key={rule.id} className={passed[rule.id] ? 'ok' : ''}>
            {passed[rule.id] ? <Check size={14} /> : <Circle size={14} />}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
