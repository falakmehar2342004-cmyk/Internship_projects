// Loading ke waqt card-shaped placeholders screen ko blank rehne se bachate hain.
export default function FlightSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="grid grid-cols-3 items-center gap-3">
        <div className="h-10 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-6 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}