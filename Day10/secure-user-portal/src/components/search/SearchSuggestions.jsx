
import { Clock3, Search } from 'lucide-react';

export default function SearchSuggestions({
  suggestions,
  recentSearches,
  onSelect,
  visible,
}) {
  if (!visible) return null;

  const items = suggestions.length
    ? suggestions
    : recentSearches.slice(0, 5);

  if (!items.length) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
      {items.map((item, index) => (
        <button
          key={`${item}-${index}`}
          type="button"
          onClick={() => onSelect(item)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {suggestions.length ? (
            <Search size={16} className="shrink-0 text-slate-400" />
          ) : (
            <Clock3 size={16} className="shrink-0 text-slate-400" />
          )}
          <span>{item}</span>
        </button>
      ))}
    </div>
  );
}
