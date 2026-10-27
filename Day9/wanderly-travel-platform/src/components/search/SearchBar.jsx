import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addRecentSearch,
  clearRecentSearches,
  clearSuggestions,
  setQuery,
  setSuggestions,
} from "../../features/search/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import RecentSearches from "./RecentSearches";
import SearchSuggestions from "./SearchSuggestions";

// Filhaal demo suggestions; baad mein real API se replace karenge.
const SAMPLE_PLACES = [
  { name: "Lahore", description: "Punjab, Pakistan", lat: 31.5204, lng: 74.3587 },
  { name: "Islamabad", description: "Capital of Pakistan", lat: 33.6844, lng: 73.0479 },
  { name: "Karachi", description: "Sindh, Pakistan", lat: 24.8607, lng: 67.0011 },
  { name: "Hunza Valley", description: "Gilgit-Baltistan, Pakistan", lat: 36.3167, lng: 74.6500 },
  { name: "Paris", description: "France", lat: 48.8566, lng: 2.3522 },
  { name: "London", description: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  { name: "Istanbul", description: "Türkiye", lat: 41.0082, lng: 28.9784 },
  { name: "Dubai", description: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { name: "New York", description: "United States", lat: 40.7128, lng: -74.0060 },
];

export default function SearchBar({ onSearch }) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);

  const { query, recentSearches } = useAppSelector(
    (state) => state.search
  );

  const debouncedQuery = useDebounce(query, 350);

  const suggestions = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();

    if (!term) return [];

    return SAMPLE_PLACES.filter((place) =>
      `${place.name} ${place.description}`
        .toLowerCase()
        .includes(term)
    ).slice(0, 5);
  }, [debouncedQuery]);

  useEffect(() => {
    dispatch(setSuggestions(suggestions));
  }, [dispatch, suggestions]);

  useEffect(() => {
    const urlQuery = searchParams.get("q");

    if (urlQuery) {
      dispatch(setQuery(urlQuery));
    }
  }, [dispatch, searchParams]);

  function performSearch(placeOrText) {
    const place =
      typeof placeOrText === "string"
        ? SAMPLE_PLACES.find(
            (item) =>
              item.name.toLowerCase() === placeOrText.toLowerCase()
          ) || {
            name: placeOrText,
            description: "Search destination",
          }
        : placeOrText;

    const name = place.name.trim();

    if (!name) return;

    dispatch(setQuery(name));
    dispatch(addRecentSearch(name));
    dispatch(clearSuggestions());

    setSearchParams({ q: name });
    setIsFocused(false);

    onSearch?.(place);
  }

  function handleSubmit(event) {
    event.preventDefault();
    performSearch(query);
  }

  return (
    <div className="search-widget">
      <form className="search-form" onSubmit={handleSubmit}>
        <Search size={21} />

        <input
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => dispatch(setQuery(event.target.value))}
          placeholder="Search a city or destination..."
          aria-label="Search destinations"
          aria-autocomplete="list"
        />

        {query && (
          <button
            type="button"
            className="icon-button"
            aria-label="Clear search"
            onClick={() => {
              dispatch(setQuery(""));
              dispatch(clearSuggestions());
              setSearchParams({});
            }}
          >
            <X size={18} />
          </button>
        )}

        <button className="primary-button search-submit" type="submit">
          Explore
        </button>
      </form>

      {isFocused && query.trim() && (
        <SearchSuggestions
          query={query}
          suggestions={suggestions}
          onSelect={performSearch}
        />
      )}

      {isFocused && !query.trim() && (
        <RecentSearches
          searches={recentSearches}
          onSelect={performSearch}
          onClear={() => dispatch(clearRecentSearches())}
        />
      )}

      {isFocused && (
        <button
          type="button"
          className="search-dismiss"
          aria-label="Close search suggestions"
          onClick={() => setIsFocused(false)}
        />
      )}
    </div>
  );
}