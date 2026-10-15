
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );
  <p className="p-4 text-red-600">
  Status: {status} | Error: {String(error)}
</p>


useEffect(() => {
  dispatch(fetchProducts())
    .unwrap()
    .then((data) => {
      console.log("Products loaded:", data.length);
    })
    .catch((error) => {
      console.log("Products fetch error:", error);
    });
}, [dispatch]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
          Welcome to ShopEase
        </p>

        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
          Find Your Next Favorite
        </h1>

        <p className="mt-3 max-w-xl text-sm text-indigo-100 sm:text-base">
          Explore our collection of products and add your favorites to the cart.
        </p>
      </section>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Our Products
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Discover something you love.
          </p>
        </div>

        {status === "succeeded" && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {items.length} products
          </span>
        )}
      </div>

      {status === "loading" && (
        <div
          role="status"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
          <span className="sr-only">Loading products...</span>
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
          <p className="font-semibold text-red-700 dark:text-red-300">
            {error}
          </p>

          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {status === "succeeded" && items.length === 0 && (
        <div className="rounded-2xl bg-gray-100 p-10 text-center dark:bg-gray-800">
          <p className="font-semibold dark:text-white">
            No products available.
          </p>
        </div>
      )}

      {status === "succeeded" && items.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
