
import { supabase } from '../lib/supabase';

// Activity logging is best-effort: it should never block the main action.
export async function logActivity(action) {
  try {
    const { data, error } = await supabase.functions.invoke('activity-log', {
      body: { action },
    });

    if (error) {
      console.warn(`Could not log "${action}":`, error.message);
      return { success: false, error };
    }

    if (data?.error) {
      console.warn(`Could not log "${action}":`, data.error);
      return { success: false, error: data.error };
    }

    return { success: true };
  } catch (error) {
    console.warn(`Activity logging failed for "${action}".`, error);
    return { success: false, error };
  }
}
