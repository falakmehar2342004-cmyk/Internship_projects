
import { useState } from 'react';
import { Check, CreditCard, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = publishableKey?.startsWith('pk_test_')
  ? loadStripe(publishableKey)
  : null;

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    description: 'Explore the portal basics.',
    features: ['Basic dashboard', 'Search access', 'Theme preferences'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    description: 'For users who need more tools.',
    features: ['Everything in Starter', 'Saved searches', 'Priority features'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39,
    description: 'For a complete portal experience.',
    features: ['Everything in Pro', 'Advanced dashboard', 'Premium features'],
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

 function handleCheckout(plan) {
  if (plan.price === 0) {
    toast.success('Starter plan selected. No payment required.');
    return;
  }

  window.location.assign(`/checkout?plan=${plan.id}`);
}
  async function confirmDemo() {
    setLoading(true);

    try {
      // Educational demo only: no Stripe charge or Checkout Session is created.
      if (stripePromise) {
        await stripePromise;
      }

      sessionStorage.setItem(
        'educationalCheckout',
        JSON.stringify({
          plan: selectedPlan.name,
          amount: selectedPlan.price,
          status: 'demo-only',
        })
      );

      toast.success('Educational checkout demo opened.');
      window.location.href = '/checkout-success';
    } catch {
      toast.error('Unable to open the demo. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Secure User Portal
        </p>
        <h1 className="text-3xl font-bold">Choose your plan</h1>
        <p className="mt-3 text-gray-600 dark:text-slate-300">
          Explore pricing and the educational checkout flow.
        </p>
      </header>

      <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
        <strong>Educational demo:</strong> These plans are sample data.
        No payment is processed, and no Stripe Checkout Session is created.
      </div>

      <section className="stagger grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/60"
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 min-h-10 text-sm text-gray-600 dark:text-slate-300">
              {plan.description}
            </p>

            <p className="my-5 text-4xl font-bold">
              ${plan.price}
              <span className="text-sm font-normal text-gray-500 dark:text-slate-400"> / month</span>
            </p>

            <ul className="mb-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check size={17} className="text-green-600 dark:text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan)}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <CreditCard size={18} />
              {plan.price === 0 ? 'Choose Starter' : 'Try Checkout Demo'}
            </button>
          </article>
        ))}
      </section>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck size={28} className="text-indigo-600 dark:text-indigo-400" />
              <h2 id="checkout-title" className="text-xl font-bold">
                Checkout demo
              </h2>
            </div>

            <p className="text-gray-600 dark:text-slate-300">
              Selected plan: <strong>{selectedPlan.name}</strong>
            </p>
            <p className="mt-2 text-gray-600 dark:text-slate-300">
              Sample price: <strong>${selectedPlan.price}/month</strong>
            </p>

            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
              This is a simulation, not a Stripe-hosted checkout. No payment
              will be attempted.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                disabled={loading}
                className="flex-1 rounded-lg border border-gray-300 dark:border-slate-600 dark:hover:bg-slate-800 px-4 py-3 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDemo}
                disabled={loading}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loading ? 'Opening...' : 'Continue demo'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
