// Password field with show / hide (eye) button.
// React Hook Form ke `register()` ke saath seedha kaam karta hai:
//   <PasswordInput {...register('password')} />
// React 19 mein `ref` normal prop hota hai, is liye forwardRef ki zaroorat nahi.

import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function PasswordInput({ ref, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="input-wrap password-wrap">
      <Lock size={18} />

      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        {...inputProps}
      />

      <button
        type="button"
        className="eye-button"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        title={visible ? 'Hide password' : 'Show password'}
      >
        {/* key badalne se icon change par chhoti si animation chalti hai */}
        <span className="eye-icon" key={visible ? 'hide' : 'show'}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </button>
    </span>
  );
}
