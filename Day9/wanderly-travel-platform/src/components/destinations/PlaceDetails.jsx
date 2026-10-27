import { MapPin, X } from "lucide-react";

export default function PlaceDetails({ place, onClose }) {
  if (!place) return null;

  return (
    <section className="place-details">
      <div className="place-details-heading">
        <div>
          <p className="section-kicker">DESTINATION DETAILS</p>
          <h2>{place.name}</h2>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Close destination details"
        >
          <X size={20} />
        </button>
      </div>

      {place.address && <p>{place.address}</p>}

      {place.lat != null && place.lng != null && (
        <p className="place-coordinates">
          <MapPin size={16} />
          {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
        </p>
      )}
    </section>
  );
}