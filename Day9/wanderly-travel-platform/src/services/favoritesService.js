
import { supabase } from "./supabase";

function mapFavorite(row) {
  return {
    id: String(row.destination_id),
    destination_id: String(row.destination_id),
    name: row.name,
    address: row.address ?? "",
    city: row.city ?? "",
    country: row.country ?? "",
    lat: row.lat == null ? null : Number(row.lat),
    lng: row.lng == null ? null : Number(row.lng),
    created_at: row.created_at,
  };
}

function ensureSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Check your .env file."
    );
  }

  return supabase;
}

const FAVORITE_COLUMNS =
  "id, destination_id, name, address, city, country, lat, lng, created_at";

export async function getFavorites() {
  const client = ensureSupabase();

  const { data, error } = await client
    .from("favorites")
    .select(FAVORITE_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapFavorite);
}

export async function saveFavorite(destination) {
  const client = ensureSupabase();

  if (destination?.id == null || !destination?.name) {
    throw new Error("This destination is missing its ID or name.");
  }

  const row = {
    destination_id: String(destination.id),
    name: destination.name,
    address: destination.address ?? destination.description ?? "",
    city: destination.city ?? "",
    country: destination.country ?? "",
    lat: destination.lat ?? null,
    lng: destination.lng ?? null,
  };

  const { data, error } = await client
    .from("favorites")
    .upsert(row, {
      onConflict: "user_id,destination_id",
    })
    .select(FAVORITE_COLUMNS)
    .single();

  if (error) throw error;

  return mapFavorite(data);
}

export async function deleteFavorite(destinationId) {
  const client = ensureSupabase();

  const { error } = await client
    .from("favorites")
    .delete()
    .eq("destination_id", String(destinationId));

  if (error) throw error;

  return String(destinationId);
}
