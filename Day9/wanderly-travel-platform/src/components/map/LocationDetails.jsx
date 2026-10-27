
import { MapPin, Map, Globe, Navigation, LocateFixed } from "lucide-react";

export default function LocationDetails({ location }) {
  if (!location) {
    return (
      <div className="location-details location-empty">
        <MapPin size={20} />
        <span>Select a marker to view location details.</span>
      </div>
    );
  }

  const coordinatesAvailable =
    Number.isFinite(Number(location.lat)) &&
    Number.isFinite(Number(location.lng)) &&
    location.lat !== "" &&
    location.lng !== "" &&
    location.lat != null &&
    location.lng != null;

  const details = [
    {
      label: "Address",
      value: location.address || "Address not available",
      icon: MapPin,
    },
    {
      label: "City",
      value: location.city || "City not available",
      icon: BuildingIcon,
    },
    {
      label: "Country",
      value: location.country || "Country not available",
      icon: Globe,
    },
    {
      label: "Latitude",
      value: coordinatesAvailable
        ? Number(location.lat).toFixed(6)
        : "Not available",
      icon: Navigation,
    },
    {
      label: "Longitude",
      value: coordinatesAvailable
        ? Number(location.lng).toFixed(6)
        : "Not available",
      icon: LocateFixed,
    },
  ];

  return (
    <section className="location-details">
      <div className="location-details-icon">
        <MapPin size={21} />
      </div>

      <div className="location-details-content">
        <h3>{location.name || "Selected destination"}</h3>

        <p className="location-summary">
          {location.address ||
            location.description ||
            "Selected destination"}
        </p>

        <div className="location-extra-details">
          {details.map(({ label, value, icon: Icon }) => (
            <div className="location-detail-row" key={label}>
              <span className="location-detail-label">
                <Icon size={15} />
                {label}
              </span>

              <span className="location-detail-value" title={value}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildingIcon(props) {
  return <Map {...props} />;
}
