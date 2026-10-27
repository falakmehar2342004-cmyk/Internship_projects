
const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

function getCity(address = {}) {
  return (
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.city_district ||
    address.district ||
    address.suburb ||
    address.hamlet ||
    address.locality ||
    address.county ||
    address.state_district ||
    ""
  );
}

function formatLocation(data) {
  const address = data.address || {};
  const city = getCity(address);
  const country = address.country || "";

  return {
    id: String(data.place_id),
    name:
      data.name ||
      data.namedetails?.name ||
      city ||
      country ||
      "Selected location",
    address: data.display_name || "",
    city,
    country,
    lat: Number(data.lat),
    lng: Number(data.lon),
  };
}

export async function searchCoordinates(query, signal) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const url = new URL(`${NOMINATIM_URL}/search`);

  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("namedetails", "1");
  url.searchParams.set("limit", "5");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to search for this location.");
  }

  const results = await response.json();

  return results.map(formatLocation);
}

export async function reverseGeocode(lat, lng, signal) {
  const url = new URL(`${NOMINATIM_URL}/reverse`);

  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("namedetails", "1");
  url.searchParams.set("zoom", "18");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      "Unable to find the address for these coordinates."
    );
  }

  const result = await response.json();

  if (!result || !result.display_name) {
    throw new Error(
      "No address was found for this map location."
    );
  }

  return formatLocation(result);
}
