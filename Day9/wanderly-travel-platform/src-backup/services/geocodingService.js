const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

export async function searchCoordinates(query, signal) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) return [];

  const url = new URL(`${NOMINATIM_URL}/search`);
  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to find this destination.");
  }

  const results = await response.json();

  return results.map((item) => ({
    id: item.place_id,
    name: item.name || item.display_name,
    address: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
  }));
}

export async function reverseGeocode(lat, lng, signal) {
  const url = new URL(`${NOMINATIM_URL}/reverse`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to find the address for these coordinates.");
  }

  const result = await response.json();

  return {
    name: result.name || result.display_name,
    address: result.display_name,
    lat: Number(result.lat),
    lng: Number(result.lon),
  };
}