import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

// Purana fixed demo OTP real verification nahi karta.
// Is page par user ko correct email-verification flow ki taraf guide karte hain.
export default function VerifyOtp() {
  return (
    <div className="auth-page">
      <div className="otp-card">
        <div className="auth-icon">
          <ShieldCheck size={25} />
        </div>

        <p className="eyebrow">EMAIL VERIFICATION</p>

        <h1>Check your email</h1>

        <p className="muted">
          If you just created an account, open the confirmation email
          from Supabase and follow its verification link. Email
          confirmation is different from the old demo OTP code.
        </p>

        <Link className="text-button" to="/login">
          <ArrowLeft size={15} /> Back to sign in
        </Link>

        <p className="auth-help">
          Need an account? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}