// Reusable airport suggestions list.
// SearchForm.jsx currently contains its own integrated autocomplete.
export default function AirportSuggestions({ suggestions = [], onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      {suggestions.map((airport) => (
        <button
          key={airport.code}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(airport)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-indigo-50 dark:hover:bg-slate-800"
        >
          <span>
            <span className="block text-sm font-bold text-slate-800 dark:text-white">
              {airport.city}
            </span>
            <span className="text-xs text-slate-500">
              {airport.country}
            </span>
          </span>
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
            {airport.code}
          </span>
        </button>
      ))}
    </div>
  );
}