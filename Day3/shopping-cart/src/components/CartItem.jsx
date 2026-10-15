
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center">
      <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-gray-700 sm:w-28">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>

        <p className="mt-2 font-bold text-indigo-600">
          ${item.price.toFixed(2)}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-1 dark:border-gray-600">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            className="h-9 w-9 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="min-w-5 text-center font-semibold dark:text-white">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
            className="h-9 w-9 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
