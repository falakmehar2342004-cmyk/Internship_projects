import { Link } from 'react-router-dom';
import { CircleX, RotateCcw } from 'lucide-react';

export default function CheckoutFailure() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      {/* Checkout cancel hone par icon show hoga */}
      <CircleX
        size={64}
        className="mx-auto text-amber-500 dark:text-amber-400"
      />

      {/* Clear cancellation message */}
      <h1 className="mt-5 text-3xl font-bold">
        Checkout cancelled
      </h1>

      <p className="mt-3 text-gray-600 dark:text-slate-300">
        You cancelled or left the Stripe Checkout page.
        No subscription confirmation was received.
        You can return to pricing and try again whenever you're ready.
      </p>

      {/* Pricing page par wapas jane ka option */}
      <Link
        to="/pricing"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        <RotateCcw size={18} />
        Try again
      </Link>
    </main>
  );
}