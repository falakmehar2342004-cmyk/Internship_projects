import { isSupabaseConfigured, supabase } from "./supabaseClient";

// Browser direct SerpAPI ko call nahi karta.
// Request secure Supabase Edge Function ko jati hai.
export async function searchFlights(searchParams) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase setup incomplete hai. .env.local mein apna Supabase URL aur key check karo."
    );
  }

console.log("Flight search params:", searchParams);

  const { data, error } = await supabase.functions.invoke(
    "search-flights",
    {
      body: searchParams,
    }
  );

  if (error) {
    throw new Error(
      error.message || "Flight search service se response nahi mila."
    );
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}