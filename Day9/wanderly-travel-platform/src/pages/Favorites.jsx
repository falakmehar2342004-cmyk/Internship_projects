
import { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Trash2,
  Compass,
  Globe,
  Navigation,
  LocateFixed,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchFavorites,
  removeFavoriteAsync,
} from "../features/favorites/favoritesSlice";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Favorites() {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.favorites.items || []
  );

  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    dispatch(fetchFavorites())
      .unwrap()
      .catch((error) => {
        if (active) {
          setPageError(
            typeof error === "string"
              ? error
              : error?.message ||
                  "Could not load your saved destinations."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [dispatch]);

  async function handleRemove(favorite) {
    if (removingId !== null) return;

    const destinationId =
      favorite.destination_id ?? favorite.id;

    setRemovingId(String(destinationId));
    setPageError("");
    setSuccessMessage("");

    try {
      await dispatch(
        removeFavoriteAsync(destinationId)
      ).unwrap();

      setSuccessMessage(
        `${favorite.name} removed from Favorites.`
      );
    } catch (error) {
      setPageError(
        typeof error === "string"
          ? error
          : error?.message ||
              "Could not remove this destination. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  }

  function formatCoordinate(value) {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      !Number.isFinite(Number(value))
    ) {
      return "Not available";
    }

    return Number(value).toFixed(6);
  }

  const detailRows = (favorite) => [
    {
      label: "City",
      value: favorite.city || "Not available",
      Icon: MapPin,
    },
    {
      label: "Country",
      value: favorite.country || "Not available",
      Icon: Globe,
    },
    {
      label: "Latitude",
      value: formatCoordinate(favorite.lat),
      Icon: Navigation,
    },
    {
      label: "Longitude",
      value: formatCoordinate(favorite.lng),
      Icon: LocateFixed,
    },
  ];

  return (
    <div className="favorites-page">
      <section className="favorites-hero">
        <div className="favorites-hero-icon">
          <Heart size={30} fill="currentColor" />
        </div>

        <p className="section-kicker">
          YOUR PERSONAL COLLECTION
        </p>

        <h1>
          Places you <span>love.</span>
        </h1>

        <p className="favorites-intro">
          All your favourite discoveries, gathered in one place.
          Your next adventure might be right here.
        </p>

        <div className="favorites-count">
          <Heart size={17} />
          <span>
            {favorites.length}{" "}
            {favorites.length === 1
              ? "saved destination"
              : "saved destinations"}
          </span>
        </div>
      </section>

      {pageError && (
        <div className="favorites-message">
          <ErrorMessage message={pageError} />
        </div>
      )}

      {successMessage && (
        <p className="favorites-success" role="status">
          {successMessage}
        </p>
      )}

      {loading ? (
        <div className="favorites-loading">
          <Loader />
          <p>Loading your saved destinations...</p>
        </div>
      ) : favorites.length === 0 ? (
        <section className="favorites-empty">
          <div className="favorites-empty-icon">
            <Compass size={38} />
          </div>

          <h2>Your next favourite place awaits</h2>

          <p>
            You haven't saved any destinations yet. Explore the map
            and tap a heart to start your travel collection.
          </p>

          <Link to="/" className="favorites-explore-button">
            <MapPin size={18} />
            Explore destinations
          </Link>
        </section>
      ) : (
        <section className="favorites-grid">
          {favorites.map((favorite) => {
            const destinationId =
              favorite.destination_id ?? favorite.id;

            const isRemoving =
              removingId === String(destinationId);

            return (
              <article
                className="favorite-card"
                key={favorite.id ?? destinationId}
              >
                <div className="favorite-card-top">
                  <div className="favorite-card-pin">
                    <MapPin size={23} />
                  </div>

                  <span className="favorite-saved-label">
                    <Heart size={13} fill="currentColor" />
                    Saved place
                  </span>

                  <button
                    type="button"
                    className="favorite-delete-button"
                    onClick={() => handleRemove(favorite)}
                    disabled={removingId !== null}
                    aria-label={`Remove ${favorite.name} from Favorites`}
                    title="Remove from Favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="favorite-card-content">
                  <p className="favorite-card-eyebrow">
                    YOUR TRAVEL COLLECTION
                  </p>

                  <h2>
                    {favorite.name || "Saved destination"}
                  </h2>

                  <div className="favorite-card-address">
                    <MapPin size={16} />
                    <div>
                      <strong>Address</strong>
                      <span>
                        {favorite.address || "Not available"}
                      </span>
                    </div>
                  </div>

                  <div className="favorite-location-details">
                    {detailRows(favorite).map(
                      ({ label, value, Icon }) => (
                        <div
                          className="favorite-location-row"
                          key={label}
                        >
                          <span className="favorite-location-label">
                            <Icon size={15} />
                            {label}
                          </span>

                          <span
                            className="favorite-location-value"
                            title={value}
                          >
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="favorite-card-footer">
                    <span className="favorite-card-caption">
                      <Heart size={15} />
                      On your wishlist
                    </span>

                    <button
                      type="button"
                      className="favorite-remove-text"
                      onClick={() => handleRemove(favorite)}
                      disabled={removingId !== null}
                    >
                      <Trash2 size={15} />
                      {isRemoving ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
