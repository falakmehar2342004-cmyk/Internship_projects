
import { createClient } from "@supabase/supabase-js";

// .env file se Supabase project URL aur publishable key read hoti hai.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Check karte hain ke dono environment variables configured hain.
if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase URL ya publishable key missing hai. Apni .env file check karo."
  );
}

// Supabase client create hota hai, jise Auth aur database ke liye use karenge.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
