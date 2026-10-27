import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftRight, CalendarDays, MapPin, Search, Users } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";

// Starter airport list for autocomplete. Codes are sent to the server function.
const AIRPORTS = [
  { city: "Lahore", country: "Pakistan", code: "LHE" },
  { city: "Islamabad", country: "Pakistan", code: "ISB" },
  { city: "Karachi", country: "Pakistan", code: "KHI" },
  { city: "Dubai", country: "United Arab Emirates", code: "DXB" },
  { city: "Abu Dhabi", country: "United Arab Emirates", code: "AUH" },
  { city: "Istanbul", country: "Türkiye", code: "IST" },
  { city: "London", country: "United Kingdom", code: "LHR" },
  { city: "Doha", country: "Qatar", code: "DOH" },
  { city: "Jeddah", country: "Saudi Arabia", code: "JED" },
  { city: "Riyadh", country: "Saudi Arabia", code: "RUH" },
  { city: "New York", country: "United States", code: "JFK" },
  { city: "Singapore", country: "Singapore", code: "SIN" },
];

function localDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AirportField({ label, name, register, value, setValue, error }) {
  const [focused, setFocused] = useState(false);
  const debouncedValue = useDebounce(value || "", 250);

  const suggestions = AIRPORTS.filter((airport) => {
    const query = debouncedValue.toLowerCase();
    return (
      query &&
      `${airport.city} ${airport.country} ${airport.code}`
        .toLowerCase()
        .includes(query)
    );
  }).slice(0, 5);

  return (
    <div className="relative">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900">
        <MapPin size={19} className="shrink-0 text-indigo-500" />
        <input
          {...register(name, { required: `${label} is required.` })}
          value={value || ""}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          autoComplete="off"
          placeholder="City or airport code"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white"
        />
      </div>

      {error && <p className="mt-1 text-xs text-rose-500">{error.message}</p>}

      {focused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          {suggestions.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setValue(name, airport.code, { shouldValidate: true });
                setFocused(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-indigo-50 dark:hover:bg-slate-800"
            >
              <span>
                <span className="block text-sm font-bold text-slate-800 dark:text-white">
                  {airport.city}
                </span>
                <span className="text-xs text-slate-500">{airport.country}</span>
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                {airport.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchForm({ onSearch, isLoading }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departure: "LHE",
      destination: "DXB",
      outboundDate: localDate(7),
      returnDate: "",
      tripType: "one-way",
      adults: 1,
    },
  });

  const departure = watch("departure");
  const destination = watch("destination");
  const tripType = watch("tripType");

  const submitSearch = (values) => {
    const departureCode = values.departure.trim().toUpperCase();
    const destinationCode = values.destination.trim().toUpperCase();

    if (departureCode === destinationCode) {
      setError("destination", {
        type: "validate",
        message: "Departure aur destination alag hone chahiye.",
      });
      return;
    }

    onSearch({
      ...values,
      departure: departureCode,
      destination: destinationCode,
      adults: Number(values.adults),
    });
  };

  const swapAirports = () => {
    setValue("departure", destination);
    setValue("destination", departure);
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  return (
    <form onSubmit={handleSubmit(submitSearch)} className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <input
            type="radio"
            value="one-way"
            {...register("tripType")}
            className="accent-indigo-600"
          />
          One way
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <input
            type="radio"
            value="round-trip"
            {...register("tripType")}
            className="accent-indigo-600"
          />
          Round trip
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
        <AirportField
          label="From"
          name="departure"
          register={register}
          value={departure}
          setValue={setValue}
          error={errors.departure}
        />

        <div className="flex items-end justify-center pb-1">
          <button
            type="button"
            onClick={swapAirports}
            aria-label="Swap departure and destination"
            className="rounded-xl border border-slate-200 bg-white p-3 text-indigo-600 transition hover:rotate-180 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <ArrowLeftRight size={18} />
          </button>
        </div>

        <AirportField
          label="To"
          name="destination"
          register={register}
          value={destination}
          setValue={setValue}
          error={errors.destination}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Departure date
          </label>
          <div className="relative">
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
            <input
              type="date"
              min={localDate()}
              {...register("outboundDate", { required: "Select a departure date." })}
              className={`${fieldClass} pl-11`}
            />
          </div>
          {errors.outboundDate && <p className="mt-1 text-xs text-rose-500">{errors.outboundDate.message}</p>}
        </div>

        {tripType === "round-trip" && (
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Return date
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
              <input
                type="date"
                min={watch("outboundDate") || localDate()}
                {...register("returnDate", { required: tripType === "round-trip" ? "Select a return date." : false })}
                className={`${fieldClass} pl-11`}
              />
            </div>
            {errors.returnDate && <p className="mt-1 text-xs text-rose-500">{errors.returnDate.message}</p>}
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Travellers
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
            <select
              {...register("adults", { valueAsNumber: true })}
              className={`${fieldClass} pl-11`}
            >
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "adult" : "adults"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-56"
      >
        <Search size={19} />
        {isLoading ? "Searching flights..." : "Search flights"}
      </button>
    </form>
  );
}