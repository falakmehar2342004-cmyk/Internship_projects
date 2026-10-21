
export default function SkeletonLoader({ rows = 3 }) {
  return (
    <div className="space-y-3" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="flex gap-3">
          <div className="skeleton size-10 shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="skeleton h-3 w-2/5" />
            <div className="skeleton h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
