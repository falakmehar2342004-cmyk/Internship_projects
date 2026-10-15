
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="theme-card group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-56 items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h2 className="line-clamp-2 min-h-12 font-semibold">
          {product.title}
        </h2>

        <p className="theme-muted mt-2 line-clamp-2 text-sm">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xl font-extrabold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
