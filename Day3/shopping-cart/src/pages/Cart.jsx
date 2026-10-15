
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";
import { clearCart } from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = async (customerDetails) => {
    // Simulate a successful frontend-only order.
    // Do not send customer details to a server.
    console.log("Demo order placed for:", customerDetails.name);

    dispatch(clearCart());
    setShowCheckout(false);
  };

  if (cartItems.length === 0 && !showCheckout) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-2xl font-extrabold text-gray-900 dark:text-white">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            You haven't added any products yet. Explore our collection to get started.
          </p>

          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <p className="mb-8 text-gray-500 dark:text-gray-400">
        {totalItems} items in your cart
      </p>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>

        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="mt-5 flex justify-between text-gray-600 dark:text-gray-300">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="mt-3 flex justify-between text-gray-600 dark:text-gray-300">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="my-5 border-t border-gray-200 dark:border-gray-700" />

          <div className="flex justify-between gap-3 text-lg font-extrabold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {!showCheckout && (
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Proceed to Checkout
            </button>
          )}

          {showCheckout && (
            <div className="mt-6">
              <CheckoutForm onCheckout={handleCheckout} />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
