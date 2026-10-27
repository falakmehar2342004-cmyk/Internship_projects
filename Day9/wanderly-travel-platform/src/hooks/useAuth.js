import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  authFailure,
  authSuccess,
  authStart,
  logout,
} from "../features/auth/authSlice";
import {
  isSupabaseConfigured,
  supabase,
} from "../services/supabase";

export default function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      dispatch(
        authFailure(
          "Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env."
        )
      );
      return undefined;
    }

    let active = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        dispatch(authSuccess(session?.user ?? null));
      }
    });

    async function restoreSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (active) {
          dispatch(authSuccess(data.session?.user ?? null));
        }
      } catch (error) {
        if (active) {
          dispatch(
            authFailure(error.message || "Unable to restore your session.")
          );
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);

  async function signOut() {
    if (!supabase) return false;

    dispatch(authStart());

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      dispatch(logout());
      return true;
    } catch (error) {
      dispatch(
        authFailure(error.message || "Unable to sign out. Please try again.")
      );
      return false;
    }
  }

  return { signOut };
}
