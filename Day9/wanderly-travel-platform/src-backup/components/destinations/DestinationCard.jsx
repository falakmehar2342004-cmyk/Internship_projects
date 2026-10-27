import { Heart, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favorites/favoritesSlice";

export default function DestinationCard({ destination, onSelect }) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  const isFavorite = favorites.some(
    (item) => item.id === destination.id
  );

  function toggleFavorite(event) {
    event.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(destination.id));
    } else {
      dispatch(addFavorite(destination));
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
          aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="destination-card-content">
        <h2>{destination.name}</h2>

        <p>{destination.address || destination.description}</p>

        {destination.lat != null && destination.lng != null && (
          <small className="coordinates">
            {destination.lat.toFixed(3)}, {destination.lng.toFixed(3)}
          </small>
        )}
      </div>
    </article>
  );
}