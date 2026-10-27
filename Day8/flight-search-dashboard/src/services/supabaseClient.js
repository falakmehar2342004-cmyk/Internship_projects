
import { createClient } from "@supabase/supabase-js";

// Read Supabase settings from .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// console.log("URL loaded:", Boolean(supabaseUrl));
// console.log("Key loaded:", Boolean(supabaseAnonKey));
// console.log("Supabase configured:", isSupabaseConfigured);
// Check that both settings exist and are not placeholders
export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("YOUR_PROJECT_ID") &&
  !supabaseAnonKey.includes("YOUR_SUPABASE") &&
  !supabaseAnonKey.includes("YOUR_KEY");

if (!isSupabaseConfigured) {
  console.error(
    "Supabase configuration missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local."
  );
}

// Create client only when configuration is valid
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
