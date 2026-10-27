import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import MapMarker from "./MapMarker";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../utils/constants";

function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [map, center.lat, center.lng, zoom]);

  return null;
}

export default function TravelMap({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  locations = [],
  selectedLocation,
  onSelect,
}) {
  const activeLocation = selectedLocation || null;

  return (
    <div className="travel-map">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} />

        {locations.map((location) => (
          <MapMarker
            key={location.id}
            location={location}
            onSelect={onSelect}
          />
        ))}

        {activeLocation && (
          <MapMarker
            key={`selected-${activeLocation.id || activeLocation.name}`}
            location={activeLocation}
            onSelect={onSelect}
          />
        )}
      </MapContainer>
    </div>
  );
}