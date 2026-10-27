import { MapPin, Search } from "lucide-react";

export default function SearchSuggestions({
  query,
  suggestions = [],
  loading = false,
  onSelect,
}) {
  if (!query.trim()) return null;

  return (
    <div className="suggestions-panel">
      <p className="suggestions-label">SUGGESTED SEARCHES</p>

      {loading && (
        <p className="suggestions-status">Finding destinations...</p>
      )}

      {!loading && suggestions.length === 0 && (
        <p className="suggestions-status">
          No local suggestions. You can search for “Paris” or “Lahore”.
        </p>
      )}

      {suggestions.map((place) => (
        <button
          type="button"
          key={place.name}
          className="suggestion-item"
          onClick={() => onSelect(place)}
        >
          <span className="suggestion-icon">
            {place.lat != null ? (
              <MapPin size={17} />
            ) : (
              <Search size={17} />
            )}
          </span>

          <span className="suggestion-copy">
            <strong>{place.name}</strong>
            <small>{place.description}</small>
          </span>
        </button>
      ))}
    </div>
  );
}