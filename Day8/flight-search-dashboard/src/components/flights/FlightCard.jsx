import { useState } from "react";
import { Bookmark, Clock3, Plane, PlaneTakeoff, PlaneLanding } from "lucide-react";

// Individual flight card; save aur recent-viewed actions Redux mein store hoti hain.
export default function FlightCard({
  flight,
  isSaved,
  onToggleSaved,
  onView,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const price = Number(flight.price || 0);
  const segments = Array.isArray(flight.segments) ? flight.segments : [];

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900 dark:hover:shadow-black/20">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {flight.airlineLogo ? (
            <img
              src={flight.airlineLogo}
              alt=""
              className="h-11 w-11 rounded-xl border border-slate-100 object-contain p-1 dark:border-slate-700"
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950">
              <Plane size={20} />
            </span>
          )}
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white">
              {flight.airline || "Airline information unavailable"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
              {flight.duration ? ` · ${flight.duration} min total` : ""}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleSaved(flight)}
          aria-label={isSaved ? "Remove saved flight" : "Save flight"}
          className={`rounded-xl border p-2.5 transition ${
            isSaved
              ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950"
              : "border-slate-200 text-slate-500 hover:text-indigo-600 dark:border-slate-700"
          }`}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {flight.departureTime || "--:--"}
          </p>
          <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-300">
            {flight.departureAirport || "Departure"}
          </p>
        </div>

        <div className="flex min-w-20 flex-col items-center gap-1 text-slate-400">
          <span className="text-xs">{flight.stops === 0 ? "Direct" : "Via stop"}</span>
          <span className="flex w-full items-center gap-1">
            <span className="h-2 w-2 rounded-full border-2 border-indigo-500" />
            <span className="h-px flex-1 bg-slate-300 dark:bg-slate-600" />
            <Plane size={16} className="text-indigo-500" />
            <span className="h-px flex-1 bg-slate-300 dark:bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          <span className="text-xs">{flight.duration ? `${flight.duration} min` : "Duration N/A"}</span>
        </div>

        <div className="text-right">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {flight.arrivalTime || "--:--"}
          </p>
          <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-300">
            {flight.arrivalAirport || "Arrival"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500">Total fare</p>
          <p className="text-xl font-extrabold text-indigo-600">
            {price ? `PKR ${price.toLocaleString("en-PK")}` : "Price unavailable"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowDetails((current) => !current);
            onView(flight);
          }}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200"
        >
          {showDetails ? "Hide details" : "Flight details"}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
          <p className="mb-3 text-sm font-bold text-slate-800 dark:text-white">
            Journey segments
          </p>
          {segments.length ? (
            <div className="space-y-3">
              {segments.map((segment, index) => (
                <div key={`${segment.flightNumber || segment.airline || "segment"}-${index}`} className="flex gap-3 text-sm">
                  {index === 0 ? (
                    <PlaneTakeoff size={17} className="mt-0.5 text-indigo-500" />
                  ) : (
                    <PlaneLanding size={17} className="mt-0.5 text-indigo-500" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {segment.airline || flight.airline || "Flight segment"}
                      {segment.flightNumber ? ` · ${segment.flightNumber}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {segment.departureAirport || "Departure"} → {segment.arrivalAirport || "Arrival"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} /> Provider ne detailed segments return nahi kiye.
            </p>
          )}
        </div>
      )}
    </article>
  );
}