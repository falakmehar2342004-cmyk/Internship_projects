import { CircleMarker, Popup } from "react-leaflet";

export default function MapMarker({ location, onSelect }) {
  if (
    typeof location.lat !== "number" ||
    typeof location.lng !== "number"
  ) {
    return null;
  }

  return (
    <CircleMarker
      center={[location.lat, location.lng]}
      radius={9}
      pathOptions={{
        color: "#d6a76a",
        fillColor: "#3d8b70",
        fillOpacity: 0.95,
        weight: 3,
      }}
      eventHandlers={{
        click: () => onSelect?.(location),
      }}
    >
      <Popup>
        <strong>{location.name}</strong>
        {location.address && <p>{location.address}</p>}
      </Popup>
    </CircleMarker>
  );
}