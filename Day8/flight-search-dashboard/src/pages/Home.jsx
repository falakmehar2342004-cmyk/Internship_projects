import { useEffect, useMemo } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  Bookmark,
  Clock3,
  Plane,
  Search,
  Sparkles,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addRecentlyViewed,
  addSearchHistory,
  fetchFlights,
  setFilters,
  setPage,
  setSortBy,
  toggleAirline,
  toggleSavedFlight,
} from "../features/flights/flightSlice";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchForm from "../components/search/SearchForm";
import FlightFilters from "../components/filters/FlightFilters";
import FlightCard from "../components/flights/FlightCard";
import FlightSkeleton from "../components/flights/FlightSkeleton";
import ApiErrorToast from "../components/common/ApiErrorToast";

export default function Home() {
  const dispatch = useAppDispatch();

  const {
    results,
    status,
    filters,
    sortBy,
    page,
    pageSize,
    lastSearch,
    searchHistory,
    savedFlights,
    recentlyViewed,
  } = useAppSelector((state) => state.flights);

  const isLoading = status === "loading";

  // Browser storage persists current search/session and useful lists.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "flight-dashboard-session",
        JSON.stringify({ results, filters, sortBy, lastSearch })
      );
      localStorage.setItem("flight-search-history", JSON.stringify(searchHistory));
      localStorage.setItem("flight-saved-items", JSON.stringify(savedFlights));
      localStorage.setItem("flight-recently-viewed", JSON.stringify(recentlyViewed));
    } catch {
      // Storage quota/privacy settings should not crash the dashboard.
    }
  }, [results, filters, sortBy, lastSearch, searchHistory, savedFlights, recentlyViewed]);

  const handleSearch = (searchParams) => {
    dispatch(addSearchHistory(searchParams));
    dispatch(fetchFlights(searchParams));
  };

  const airlines = useMemo(
    () => [...new Set(results.map((flight) => flight.airline).filter(Boolean))].sort(),
    [results]
  );

  // Filtering aur sorting client-side par results aane ke baad hoti hai.
  const filteredFlights = useMemo(() => {
    const filtered = results.filter((flight) => {
      const price = Number(flight.price || 0);
      const priceMatches = price > 0 && price <= filters.maxPrice;
      const airlineMatches =
        filters.airlines.length === 0 || filters.airlines.includes(flight.airline);

      return priceMatches && airlineMatches;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
      if (sortBy === "time-short") return Number(a.duration || Infinity) - Number(b.duration || Infinity);
      if (sortBy === "time-long") return Number(b.duration || 0) - Number(a.duration || 0);
      return Number(a.price || Infinity) - Number(b.price || Infinity);
    });
  }, [results, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredFlights.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedFlights = filteredFlights.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    dispatch(setFilters({ airlines: [], maxPrice: 500000 }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <ApiErrorToast />
      <Navbar />

      <main>
        {/* Premium hero section */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-700/40 via-slate-950 to-slate-950" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-indigo-200">
                <Sparkles size={15} /> SMARTER FLIGHT SEARCH
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your next journey,
                <span className="block text-indigo-300">beautifully planned.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare flight options, explore fares and find a journey that fits your plans.
              </p>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-300">
                <span className="flex items-center gap-2"><Search size={16} className="text-indigo-300" /> Quick search</span>
                <span className="flex items-center gap-2"><ArrowDownUp size={16} className="text-indigo-300" /> Smart sorting</span>
                <span className="flex items-center gap-2"><Bookmark size={16} className="text-indigo-300" /> Save favourites</span>
              </div>
            </div>

            <div className="relative hidden min-h-64 items-center justify-center lg:flex">
              <div className="absolute h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative rotate-[-4deg] rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-bold">Journey preview</span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Explore</span>
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-4xl font-black">LHE</p>
                    <p className="mt-1 text-sm text-slate-300">Lahore</p>
                  </div>
                  <div className="flex w-24 flex-col items-center text-indigo-200">
                    <Plane size={23} />
                    <div className="mt-2 h-px w-full bg-indigo-300/50" />
                    <span className="mt-2 text-xs">Your next trip</span>
                  </div>
                  <div>
                    <p className="text-4xl font-black">DXB</p>
                    <p className="mt-1 text-sm text-slate-300">Dubai</p>
                  </div>
                </div>
                <div className="mt-7 rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-slate-300">Travel planning, made simpler</p>
                  <p className="mt-1 text-lg font-extrabold">Find your way forward.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="search" className="mx-auto -mt-1 max-w-7xl scroll-mt-24 px-4 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Where would you like to go?</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter your journey details to compare flights.</p>
            </div>
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">Flight explorer</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {lastSearch
                  ? `${lastSearch.departure} to ${lastSearch.destination}`
                  : "Explore your flight options"}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {isLoading
                  ? "Searching for available flights..."
                  : `${filteredFlights.length} matching flight${filteredFlights.length === 1 ? "" : "s"}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="flight-sort" className="text-sm font-semibold text-slate-500">Sort by</label>
              <select
                id="flight-sort"
                value={sortBy}
                onChange={(event) => dispatch(setSortBy(event.target.value))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="price-low">Lowest price</option>
                <option value="price-high">Highest price</option>
                <option value="time-short">Shortest duration</option>
                <option value="time-long">Longest duration</option>
              </select>
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <FlightFilters
              airlines={airlines}
              selectedAirlines={filters.airlines}
              maxPrice={filters.maxPrice}
              onToggleAirline={(airline) => dispatch(toggleAirline(airline))}
              onMaxPriceChange={(maxPrice) => dispatch(setFilters({ maxPrice }))}
              onReset={resetFilters}
            />

            <div className="min-w-0 space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => <FlightSkeleton key={index} />)
              ) : results.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950">
                    <Search size={25} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                    Ready when you are
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Apni departure city, destination aur date select karke Search Flights press karo. Live results ke liye Supabase Edge Function deploy honi chahiye.
                  </p>
                </div>
              ) : paginatedFlights.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-bold">No flights match these filters</h3>
                  <p className="mt-2 text-sm text-slate-500">Price ya airline filters reset karke dobara dekho.</p>
                  <button onClick={resetFilters} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">
                    Reset filters
                  </button>
                </div>
              ) : (
                paginatedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSaved={savedFlights.some((item) => item.id === flight.id)}
                    onToggleSaved={(item) => dispatch(toggleSavedFlight(item))}
                    onView={(item) => dispatch(addRecentlyViewed(item))}
                  />
                ))
              )}

              {!isLoading && filteredFlights.length > pageSize && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => dispatch(setPage(currentPage - 1))}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-40 dark:border-slate-700"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => dispatch(setPage(currentPage + 1))}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
                    >
                      Next <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="history" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950"><Clock3 size={19} /></span>
                <div>
                  <h2 className="font-extrabold">Recent searches</h2>
                  <p className="text-xs text-slate-500">Your last 10 searches</p>
                </div>
              </div>
              {searchHistory.length ? (
                <div className="space-y-2">
                  {searchHistory.map((search, index) => (
                    <button
                      key={`${search.departure}-${search.destination}-${search.outboundDate}-${index}`}
                      onClick={() => dispatch(fetchFlights(search))}
                      className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-3 text-left transition hover:bg-indigo-50 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                    >
                      <span>
                        <span className="block text-sm font-bold">{search.departure} → {search.destination}</span>
                        <span className="mt-1 block text-xs text-slate-500">{search.outboundDate}</span>
                      </span>
                      <Search size={16} className="text-indigo-600" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Search karne ke baad tumhari recent searches yahan aayengi.</p>
              )}
            </div>

            <div id="saved" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950"><Bookmark size={19} /></span>
                <div>
                  <h2 className="font-extrabold">Saved flights</h2>
                  <p className="text-xs text-slate-500">Your bookmarked options</p>
                </div>
              </div>
              {savedFlights.length ? (
                <div className="space-y-2">
                  {savedFlights.map((flight) => (
                    <div key={flight.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70">
                      <div>
                        <p className="text-sm font-bold">{flight.airline || "Flight"} · {flight.departureAirport} → {flight.arrivalAirport}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {flight.price ? `PKR ${Number(flight.price).toLocaleString("en-PK")}` : "Price unavailable"}
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(toggleSavedFlight(flight))}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Flight card par bookmark icon press karo aur saved flight yahan nazar aayegi.</p>
              )}
              {recentlyViewed.length > 0 && (
                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="mb-3 text-sm font-bold">Recently viewed</h3>
                  {recentlyViewed.slice(0, 3).map((flight) => (
                    <p key={flight.id} className="mb-2 text-sm text-slate-500">
                      {flight.airline || "Flight"} · {flight.departureAirport} → {flight.arrivalAirport}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}