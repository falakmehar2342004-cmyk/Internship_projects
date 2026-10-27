export default function SkeletonCard() {
  return (
    <article className="destination-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-image" />

      <div className="skeleton-content">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line skeleton-short" />
      </div>
    </article>
  );
}