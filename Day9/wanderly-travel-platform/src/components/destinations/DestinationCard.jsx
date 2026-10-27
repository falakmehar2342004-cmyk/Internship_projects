import { Heart, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFavoriteAsync,
  removeFavoriteAsync,
} from "../../features/favorites/favoritesSlice";

export default function DestinationCard({ destination, onSelect }) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites.items);
  const favoriteLoading = useAppSelector((state) => state.favorites.loading);

  const isFavorite = favorites.some(
    (item) => String(item.id) === String(destination.id)
  );

  function toggleFavorite(event) {
    event.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavoriteAsync(destination.id));
    } else {
      dispatch(addFavoriteAsync(destination));
    }
  }

  return (
    <article
      className="destination-card destination-card-clickable"
      onClick={() => onSelect?.(destination)}
    >
      <div className="destination-card-visual">
        <MapPin size={32} />

        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          onClick={toggleFavorite}
          disabled={favoriteLoading}
          aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
          title={isFavorite ? "Remove favorite" : "Save favorite"}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="destination-card-content">
        <h2>{destination.name}</h2>
        <p>{destination.address || destination.description}</p>

        {destination.lat != null && destination.lng != null && (
          <small className="coordinates">
            {Number(destination.lat).toFixed(3)},{" "}
            {Number(destination.lng).toFixed(3)}
          </small>
        )}
      </div>
    </article>
  );
}
