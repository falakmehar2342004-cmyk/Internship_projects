import { supabase } from '../lib/supabase';

// Supabase user aur profiles table ko dashboard ke user format mein convert karte hain.
export async function getAppUser(authUser) {
  if (!authUser) return null;

  // User ka name aur role database se lete hain.
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', authUser.id)
    .maybeSingle();

  // Profile read na ho sake to user ko kabhi admin assume nahi karna.
  if (error) {
    console.error('Profile load failed:', error.message);
  }

  return {
    id: authUser.id,
    email: authUser.email || '',
    name:
      profile?.full_name ||
      authUser.user_metadata?.full_name ||
      authUser.email?.split('@')[0] ||
      'User',

    // Admin role sirf database se aane par accept hota hai.
    role: profile?.role === 'admin' ? 'admin' : 'user',
  };
}