import { MapPin } from "lucide-react";

export default function LocationDetails({ location }) {
  if (!location) {
    return (
      <div className="location-details location-empty">
        <MapPin size={20} />
        <span>Select a marker to view location details.</span>
      </div>
    );
  }

  return (
    <section className="location-details">
      <div className="location-details-icon">
        <MapPin size={21} />
      </div>

      <div>
        <h3>{location.name}</h3>
        <p>{location.address || location.description || "Selected destination"}</p>
      </div>
    </section>
  );
}