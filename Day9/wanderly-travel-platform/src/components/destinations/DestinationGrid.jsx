import DestinationCard from "./DestinationCard";
import SkeletonCard from "../common/SkeletonCard";

export default function DestinationGrid({
  destinations = [],
  loading = false,
  onSelect,
}) {
  if (loading) {
    return (
      <div className="destination-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="empty-state">
        <h2>No destinations to show</h2>
        <p>Try searching for a city or another destination.</p>
      </div>
    );
  }

  return (
    <div className="destination-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}