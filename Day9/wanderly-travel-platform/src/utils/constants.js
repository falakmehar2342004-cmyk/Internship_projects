// App ke common constants ek jagah rakhte hain.

export const APP_NAME = "Wanderly";

export const ROUTES = {
  explore: "/",
  login: "/login",
  signup: "/signup",
  favorites: "/favorites",
  notFound: "*",
};

export const STORAGE_KEYS = {
  theme: "wanderly-theme",
  recentSearches: "wanderly-recent-searches",
  lastLocation: "wanderly-last-location",
};

export const DEFAULT_MAP_CENTER = {
  lat: 31.5204,
  lng: 74.3587,
};

export const DEFAULT_MAP_ZOOM = 5;

export const MAX_RECENT_SEARCHES = 6;