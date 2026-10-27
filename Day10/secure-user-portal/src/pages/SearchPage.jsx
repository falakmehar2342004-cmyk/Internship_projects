
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bookmark,
  Clock3,
  Trash2,
  Search,
  Globe,
  ShoppingBag,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import SearchBox from '../components/search/SearchBox';
import SearchSuggestions from '../components/search/SearchSuggestions';
import SearchResultCard from '../components/search/SearchResultCard';

import {
  getSearchSuggestions,
  searchGoogle,
} from '../lib/serpapi';

import {
  setQuery,
  searchStarted,
  searchSucceeded,
  searchFailed,
  toggleSavedSearch,
  clearRecentSearches,
} from '../features/search/searchSlice';

export default function SearchPage() {
  const dispatch = useDispatch();

  const {
    query,
    recentSearches,
    savedSearches,
    loading,
    error,
    searchedAt,
  } = useSelector((state) => state.search);

  const [inputValue, setInputValue] = useState(query || '');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Web aur product results ko alag rakho.
  const [webResults, setWebResults] = useState([]);
  const [productResults, setProductResults] = useState([]);
  const [totalWebResults, setTotalWebResults] = useState(null);

  const [activeTab, setActiveTab] = useState('products');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const suggestionController = useRef(null);
  const searchController = useRef(null);

  // Current tab ke results select karo.
  const displayedResults =
    activeTab === 'products' ? productResults : webResults;

  const totalPages = Math.ceil(displayedResults.length / pageSize);

  const paginatedResults = displayedResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Debounced autocomplete: typing ke 350ms baad request.
  useEffect(() => {
    const trimmed = inputValue.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      setSuggestionLoading(false);
      return;
    }

    const controller = new AbortController();
    suggestionController.current = controller;

    const timer = setTimeout(async () => {
      setSuggestionLoading(true);

      try {
        const items = await getSearchSuggestions(
          trimmed,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setSuggestions(items);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSuggestionLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputValue]);

  // Component unmount par pending requests cancel karo.
  useEffect(() => {
    return () => {
      suggestionController.current?.abort();
      searchController.current?.abort();
    };
  }, []);

  // Search function.
  async function runSearch(value) {
    const trimmed = value.trim();

    if (!trimmed) {
      toast.error('Please enter a search query.');
      return;
    }

    searchController.current?.abort();

    const controller = new AbortController();
    searchController.current = controller;

    setInputValue(trimmed);
    setSuggestions([]);
    setShowSuggestions(false);
    setCurrentPage(1);

    dispatch(setQuery(trimmed));
    dispatch(searchStarted());

    try {
      const data = await searchGoogle(trimmed, controller.signal);

      if (controller.signal.aborted) return;

      setWebResults(data.webResults || []);
      setProductResults(data.productResults || []);
      setTotalWebResults(data.totalWebResults ?? null);
      setActiveTab('products');

      // Existing Redux search history preserve karo.
      dispatch(
        searchSucceeded({
          ...data,
          results: data.productResults || [],
          totalResults: (data.productResults || []).length,
        })
      );

      if (
        !(data.productResults || []).length &&
        !(data.webResults || []).length
      ) {
        toast('No results returned. Try another search.');
      }
    } catch (err) {
      if (err.name === 'AbortError') return;

      dispatch(searchFailed(err.message || 'Search failed.'));
      toast.error(err.message || 'Search failed.');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runSearch(inputValue);
  }

  function handleClear() {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function selectSearch(value) {
    setInputValue(value);
    runSearch(value);
  }

  function saveSearch(value) {
    if (!value.trim()) return;

    const isSaved = savedSearches.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    dispatch(toggleSavedSearch(value));

    toast.success(
      isSaved ? 'Removed from saved searches' : 'Search saved'
    );
  }

  function changeTab(tab) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  const isCurrentQuerySaved = savedSearches.some(
    (item) => item.toLowerCase() === (query || '').toLowerCase()
  );

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8">
      {/* Page heading */}
      <header className="rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
          Search workspace
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Discover something new
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
          Explore products and websites from one search workspace.
        </p>

        <div className="relative mt-7">
          <SearchBox
            value={inputValue}
            onChange={(value) => {
              setInputValue(value);
              setShowSuggestions(true);
            }}
            onSubmit={handleSubmit}
            onClear={handleClear}
            loading={loading}
          />

          <SearchSuggestions
            suggestions={suggestions}
            recentSearches={recentSearches}
            visible={showSuggestions && Boolean(inputValue.trim())}
            onSelect={selectSearch}
          />

          {suggestionLoading && (
            <p className="mt-2 text-xs text-indigo-100">
              Loading suggestions...
            </p>
          )}
        </div>
      </header>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
        {/* Main results area */}
        <main className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Search results
              </h2>

              {query && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Results for “{query}”
                </p>
              )}
            </div>

            {query && (
              <button
                type="button"
                onClick={() => saveSearch(query)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <Bookmark size={16} />
                {isCurrentQuerySaved ? 'Unsave search' : 'Save search'}
              </button>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
              <p className="font-semibold text-slate-800 dark:text-white">
                Searching...
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Fetching product and website results.
              </p>
            </div>
          ) : (
            <>
              {/* Results tabs */}
              <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => changeTab('products')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeTab === 'products'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <ShoppingBag size={17} />
                  Products
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                    {productResults.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => changeTab('web')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeTab === 'web'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Globe size={17} />
                  Web Results
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                    {webResults.length}
                  </span>
                </button>
              </div>

              {/* Result count */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
                <p>
                  Showing{' '}
                  {displayedResults.length
                    ? (currentPage - 1) * pageSize + 1
                    : 0}
                  {'–'}
                  {Math.min(
                    currentPage * pageSize,
                    displayedResults.length
                  )}{' '}
                  of {displayedResults.length} loaded results
                </p>

                {activeTab === 'web' && totalWebResults != null && (
                  <p>
                    Google estimates {Number(totalWebResults).toLocaleString()}{' '}
                    matching results
                  </p>
                )}
              </div>

              {/* Results list */}
              {paginatedResults.length > 0 ? (
                activeTab === 'products' ? (
                  <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                    {paginatedResults.map((result, index) => (
                      <SearchResultCard
                        key={result.link || `${result.title}-${index}`}
                        result={result}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedResults.map((result, index) => (
                      <article
                        key={result.link || `${result.title}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                      >
                        {result.source && (
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {result.source}
                          </p>
                        )}

                        <h3 className="text-lg font-semibold leading-7 text-indigo-700 dark:text-indigo-300">
                          {result.title}
                        </h3>

                        {result.link && (
                          <p className="mt-1 break-all text-xs text-emerald-700 dark:text-emerald-400">
                            {result.link}
                          </p>
                        )}

                        {result.snippet && (
                          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {result.snippet}
                          </p>
                        )}

                        {result.link && (
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
                          >
                            Visit website
                            <Search size={15} />
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                )
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800">
                    {activeTab === 'products' ? (
                      <ShoppingBag size={26} />
                    ) : (
                      <Globe size={26} />
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                    No {activeTab === 'products' ? 'products' : 'web results'} found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Try another search, or switch to the other tab.
                  </p>
                </div>
              )}

              {/* Pagination: 10 loaded results per page */}
              {totalPages > 1 && (
                <nav
                  aria-label="Search results pagination"
                  className="flex flex-wrap items-center justify-center gap-4 pt-3"
                >
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Next
                  </button>
                </nav>
              )}

              {searchedAt && (
                <p className="text-center text-xs text-slate-400">
                  Last updated {new Date(searchedAt).toLocaleString()}
                </p>
              )}
            </>
          )}
        </main>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Recent searches */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <Clock3 size={17} />
                Recent searches
              </h2>

              {recentSearches.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(clearRecentSearches());
                    toast.success('Recent searches cleared');
                  }}
                  aria-label="Clear recent searches"
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {recentSearches.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {recentSearches.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => selectSearch(item)}
                      className="w-full truncate rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No recent searches yet.
              </p>
            )}
          </section>

          {/* Saved searches */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Bookmark size={17} />
              Saved searches
            </h2>

            {savedSearches.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {savedSearches.map((item) => (
                  <li key={item} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => selectSearch(item)}
                      className="min-w-0 flex-1 truncate rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {item}
                    </button>

                    <button
                      type="button"
                      onClick={() => saveSearch(item)}
                      aria-label={`Remove ${item} from saved searches`}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Save a search to find it here later.
              </p>
            )}
          </section>
        </aside>
      </div>
    </section>
  );
}
