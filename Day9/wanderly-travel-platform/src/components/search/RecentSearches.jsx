import { Clock3, Search, Trash2 } from "lucide-react";

export default function RecentSearches({
  searches = [],
  onSelect,
  onClear,
}) {
  if (searches.length === 0) {
    return (
      <div className="recent-empty">
        <Clock3 size={17} />
        <span>Your recent searches will appear here.</span>
      </div>
    );
  }

  return (
    <section className="recent-searches">
      <div className="search-section-heading">
        <h3>
          <Clock3 size={16} />
          Recent searches
        </h3>

        <button
          type="button"
          className="text-button"
          onClick={onClear}
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      <div className="recent-search-list">
        {searches.map((search) => (
          <button
            type="button"
            className="recent-search-item"
            key={search}
            onClick={() => onSelect(search)}
          >
            <Search size={15} />
            <span>{search}</span>
          </button>
        ))}
      </div>
    </section>
  );
}