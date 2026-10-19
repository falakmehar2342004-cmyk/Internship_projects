// Yahan products load hone tak ek khali (shimmer) card dikhta hai
export default function ProductSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="skeleton" style={{ aspectRatio: '1 / 1', borderRadius: 0 }} />
      <div className="space-y-3 p-4">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-2/5" />
        <div className="skeleton h-9 w-full" />
      </div>
    </div>
  );
}
