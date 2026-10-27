import { RotateCcw, SlidersHorizontal } from "lucide-react";

// Filters Redux state update karte hain; filtering actual results par Home mein hoti hai.
export default function FlightFilters({
  airlines,
  selectedAirlines,
  maxPrice,
  onToggleAirline,
  onMaxPriceChange,
  onReset,
}) {
  return (
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
          <SlidersHorizontal size={18} /> Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <section className="mb-7">
        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">
          Maximum price
        </h3>
        <p className="mb-3 text-sm font-extrabold text-indigo-600">
          PKR {Number(maxPrice).toLocaleString("en-PK")}
        </p>
        <input
          type="range"
          min="10000"
          max="500000"
          step="5000"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(Number(event.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>PKR 10k</span>
          <span>PKR 500k</span>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-200">
          Airlines
        </h3>

        {airlines.length === 0 ? (
          <p className="text-sm leading-6 text-slate-500">
            Airline filters search results aane ke baad available hongay.
          </p>
        ) : (
          <div className="space-y-3">
            {airlines.map((airline) => (
              <label
                key={airline}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => onToggleAirline(airline)}
                  className="h-4 w-4 rounded accent-indigo-600"
                />
                <span>{airline}</span>
              </label>
            ))}
          </div>
        )}
      </section>
    </aside>
  );
}