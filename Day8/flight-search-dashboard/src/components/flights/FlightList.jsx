import FlightCard from "./FlightCard";
import FlightSkeleton from "./FlightSkeleton";

// Reusable results list; Home.jsx currently renders cards with pagination itself.
export default function FlightList({
  flights = [],
  isLoading = false,
  savedFlights = [],
  onToggleSaved = () => {},
  onView = () => {},
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((item) => (
          <FlightSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (!flights.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
        <p className="font-bold">No flights to display</p>
        <p className="mt-2 text-sm text-slate-500">
          Search for a journey to see available results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          isSaved={savedFlights.some((item) => item.id === flight.id)}
          onToggleSaved={onToggleSaved}
          onView={onView}
        />
      ))}
    </div>
  );
}