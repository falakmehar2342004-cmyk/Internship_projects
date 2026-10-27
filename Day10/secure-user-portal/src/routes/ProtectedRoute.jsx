// Dashboard routes sirf authenticated aur required MFA complete
// karne wale users ko allow karti hain.

import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '../lib/supabaseClient';

export default function ProtectedRoute() {
  const { user, initialized } = useSelector((state) => state.auth);
  const [mfaChecked, setMfaChecked] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkMfa() {
      if (!initialized || !user) {
        if (active) setMfaChecked(true);
        return;
      }

      try {
        const { data, error } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (error) throw error;

        if (active) {
          setMfaRequired(
            data.nextLevel === 'aal2' &&
            data.currentLevel !== 'aal2'
          );
        }
      } catch {
        // Verification error par protected content show nahi karte.
        if (active) setMfaRequired(true);
      } finally {
        if (active) setMfaChecked(true);
      }
    }

    checkMfa();

    return () => {
      active = false;
    };
  }, [user, initialized]);

  if (!initialized || !mfaChecked) {
    return <div className="page-loader">Checking secure session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (mfaRequired) {
    return <Navigate to="/mfa-challenge" replace />;
  }

  return <Outlet />;
}