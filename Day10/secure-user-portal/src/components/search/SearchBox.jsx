
import { Search, X } from 'lucide-react';

export default function SearchBox({
  value,
  onChange,
  onSubmit,
  onClear,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Search size={20} className="shrink-0 text-slate-400" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search anything on Google..."
          aria-label="Search query"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
