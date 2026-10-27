
import { useCallback, useEffect, useState } from "react";
import { Heart, MapPin, Search, Sparkles } from "lucide-react";

import SearchBar from "../components/search/SearchBar";
import TravelMap from "../components/map/TravelMap";
import LocationDetails from "../components/map/LocationDetails";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import {
  searchCoordinates,
  reverseGeocode,
} from "../services/geocodingService";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  setSelectedLocation,
  clearSelectedLocation,
} from "../features/location/locationSlice";

import {
  addFavoriteAsync,
  removeFavoriteAsync,
  fetchFavorites,
} from "../features/favorites/favoritesSlice";

const DEFAULT_CENTER = { lat: 31.5204, lng: 74.3587 };

export default function Explore() {
  const dispatch = useAppDispatch();

  const { selectedLocation, mapCenter, zoom } = useAppSelector(
    (state) => state.location
  );

  const { items: favorites = [] } = useAppSelector(
    (state) => state.favorites
  );

  const { user } = useAppSelector((state) => state.auth);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searched, setSearched] = useState(false);
  const [favoriteBusyId, setFavoriteBusyId] = useState(null);
  const [favoriteError, setFavoriteError] = useState("");

  // Fetch saved Favorites when the user is signed in.
  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]);

  // Search destinations by name, city, country, or landmark.
  const handleSearch = useCallback(
    async (placeOrText) => {
      const query =
        typeof placeOrText === "string"
          ? placeOrText.trim()
          : (placeOrText?.name || "").trim();

      if (!query) return;

      setLoading(true);
      setSearchError("");
      setSearched(true);
      setLocations([]);
      setFavoriteError("");

      dispatch(clearSelectedLocation());

      const controller = new AbortController();

      try {
        const results = await searchCoordinates(
          query,
          controller.signal
        );

        if (!results.length) {
          setSearchError(
            "No destinations found. Try another city or place name."
          );
          return;
        }

        setLocations(results);
        dispatch(setSelectedLocation(results[0]));
      } catch (error) {
        if (error.name !== "AbortError") {
          setSearchError(
            error.message ||
              "Could not search destinations. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Reverse Geocoding: map coordinates -> destination details.
  async function handleMapClick({ lat, lng }) {
    setLoading(true);
    setSearchError("");
    setFavoriteError("");

    try {
      const location = await reverseGeocode(lat, lng);

      setLocations((previous) => {
        const exists = previous.some(
          (item) => String(item.id) === String(location.id)
        );

        return exists
          ? previous.map((item) =>
              String(item.id) === String(location.id)
                ? { ...item, ...location }
                : item
            )
          : [location, ...previous];
      });

      dispatch(setSelectedLocation(location));
    } catch (error) {
      if (error.name !== "AbortError") {
        setSearchError(
          error.message ||
            "Could not find this location's address."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // Check whether a destination is already saved.
  function isFavorite(location) {
    return favorites.some(
      (item) =>
        String(item.destination_id) === String(location.id)
    );
  }

  // Add a destination to Favorites or remove it.
  async function toggleFavorite(location) {
    if (!location || favoriteBusyId !== null) return;

    if (!user) {
      setFavoriteError(
        "Please sign in to save destinations to Favorites."
      );
      return;
    }

    setFavoriteBusyId(String(location.id));
    setFavoriteError("");

    try {
      if (isFavorite(location)) {
        await dispatch(
          removeFavoriteAsync(location.id)
        ).unwrap();
      } else {
        await dispatch(
          addFavoriteAsync(location)
        ).unwrap();
      }
    } catch (error) {
      setFavoriteError(
        typeof error === "string"
          ? error
          : error?.message ||
              "Could not update Favorites. Please try again."
      );
    } finally {
      setFavoriteBusyId(null);
    }
  }

  // Select a destination from search results or map markers.
  function selectLocation(location) {
    dispatch(setSelectedLocation(location));
    setFavoriteError("");
  }

  const selectedIsFavorite = selectedLocation
    ? isFavorite(selectedLocation)
    : false;

  return (
    <div className="explore-page">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1>
            The world is
            <br />
            <span>waiting for you.</span>
          </h1>

          <p className="hero-description">
            Search real destinations, explore them on the map, and save
            your favourite discoveries for later.
          </p>

          <SearchBar onSearch={handleSearch} />

          <div className="hero-note">
            <MapPin size={16} />
            Search a city, country, landmark, or destination.
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-image-placeholder">
            <MapPin size={64} strokeWidth={1.1} />

            <span className="hero-art-label">
              <Sparkles size={16} />
              Explore the world
            </span>
          </div>

          <div className="floating-note">
            <span className="floating-note-icon">
              <Heart size={18} />
            </span>

            <div>
              <strong>Your personal travel list</strong>
              <p>Discover it. Save it. Revisit it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="map-explorer-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">EXPLORE THE MAP</p>
            <h2>Find your next destination</h2>
            <p>
              Search for a place, select a result, or click the map to
              discover a location.
            </p>
          </div>

          <div className="welcome-icon">
            <MapPin size={28} />
          </div>
        </div>

        {loading && (
          <div className="search-status">
            <Loader />
            <p>Finding destination details...</p>
          </div>
        )}

        {searchError && (
          <div className="search-status">
            <ErrorMessage message={searchError} />
          </div>
        )}

        <div className="map-explorer-layout">
          <div className="map-panel">
            <TravelMap
              center={selectedLocation || mapCenter || DEFAULT_CENTER}
              zoom={selectedLocation ? 13 : zoom || 5}
              locations={locations}
              selectedLocation={selectedLocation}
              onSelect={selectLocation}
              onMapClick={handleMapClick}
            />
          </div>

          <aside className="destination-panel">
            <div className="destination-panel-heading">
              <MapPin size={20} />
              <h3>Destination details</h3>
            </div>

            <LocationDetails location={selectedLocation} />

            {selectedLocation && (
              <div className="selected-destination-actions">
                <button
                  type="button"
                  className="primary-button favorite-action"
                  onClick={() => toggleFavorite(selectedLocation)}
                  disabled={favoriteBusyId !== null}
                >
                  <Heart
                    size={18}
                    fill={
                      selectedIsFavorite ? "currentColor" : "none"
                    }
                  />

                  {favoriteBusyId !== null
                    ? "Updating..."
                    : selectedIsFavorite
                      ? "Remove from Favorites"
                      : "Save to Favorites"}
                </button>
              </div>
            )}

            {favoriteError && (
              <p className="favorite-inline-error" role="alert">
                {favoriteError}
              </p>
            )}

            <div className="map-results">
              <h4>
                Search results <span>{locations.length}</span>
              </h4>

              {!locations.length && !loading && (
                <p className="map-empty-message">
                  {searched
                    ? "No results to display."
                    : "Search for a destination or click the map to explore real places."}
                </p>
              )}

              {locations.map((location) => {
                const saved = isFavorite(location);
                const busy =
                  favoriteBusyId === String(location.id);

                return (
                  <div
                    key={location.id}
                    className={`map-result-row ${
                      String(selectedLocation?.id) ===
                      String(location.id)
                        ? "is-selected"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="map-result-select"
                      onClick={() => selectLocation(location)}
                    >
                      <span className="map-result-icon">
                        <MapPin size={17} />
                      </span>

                      <span className="map-result-copy">
                        <strong>{location.name}</strong>
                        <small>{location.address}</small>
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`result-favorite-button ${
                        saved ? "is-favorite" : ""
                      }`}
                      onClick={() => toggleFavorite(location)}
                      disabled={favoriteBusyId !== null}
                      aria-label={
                        saved
                          ? `Remove ${location.name} from Favorites`
                          : `Add ${location.name} to Favorites`
                      }
                      title={
                        saved
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                      }
                    >
                      <Heart
                        size={19}
                        fill={saved ? "currentColor" : "none"}
                      />

                      {busy && (
                        <span className="favorite-saving-dot" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="welcome-section">
        <div>
          <p className="section-kicker">YOUR NEXT ADVENTURE</p>
          <h2>One map. A world of possibilities.</h2>
          <p>
            Choose a destination, explore its location, and save places
            you want to remember.
          </p>
        </div>

        <div className="welcome-icon">
          <Search size={28} />
        </div>
      </section>
    </div>
  );
}
