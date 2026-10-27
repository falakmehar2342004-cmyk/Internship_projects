
import { ExternalLink, ShoppingBag, Star } from 'lucide-react';

export default function SearchResultCard({ result }) {
  const {
    title,
    link,
    snippet,
    thumbnail,
    price,
    source,
    rating,
    reviews,
    delivery,
  } = result;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      {/* Product image area */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ShoppingBag size={42} strokeWidth={1.4} />
            <span className="text-sm">Image unavailable</span>
          </div>
        )}

        {price && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow">
            {price}
          </span>
        )}
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-5">
        {source && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {source}
          </p>
        )}

        <h2 className="line-clamp-2 text-base font-semibold leading-6 text-slate-900 dark:text-white">
          {title}
        </h2>

        {snippet && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {snippet}
          </p>
        )}

        {rating != null && (
          <div className="mt-3 flex items-center gap-1 text-sm text-amber-600">
            <Star size={15} fill="currentColor" />
            <span className="font-semibold">{rating}</span>

            {reviews != null && (
              <span className="text-slate-500">
                ({reviews} reviews)
              </span>
            )}
          </div>
        )}

        {delivery && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            {delivery}
          </p>
        )}

        <div className="mt-auto pt-5">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              View product
              <ExternalLink size={16} />
            </a>
          ) : (
            <p className="text-sm text-slate-500">
              Product link unavailable
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
