
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { CreditCard, ShieldCheck } from 'lucide-react';

const plans = {
  pro: { name: 'Pro', price: 19 },
  premium: { name: 'Premium', price: 39 },
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan');
  const plan = plans[planId];

  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (!plan) {
      toast.error('Please select a valid plan.');
      navigate('/pricing');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        'create-checkout-session',
        { body: { planId } }
      );

      if (error) throw error;
      if (!data?.url) {
        throw new Error(data?.error || 'Checkout URL was not returned.');
      }

      // Redirect to Stripe-hosted Checkout.
      window.location.assign(data.url);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Could not start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!plan) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">No plan selected</h1>
        <p className="mt-3 text-gray-600 dark:text-slate-300">
          Please select a subscription plan first.
        </p>
        <button
          onClick={() => navigate('/pricing')}
          className="mt-5 rounded-lg bg-indigo-600 px-5 py-3 text-white"
        >
          View plans
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900 p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={30} />
          <h1 className="text-2xl font-bold">Review your subscription</h1>
        </div>

        <div className="my-6 rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
          <p className="text-sm text-gray-500 dark:text-slate-400">Selected plan</p>
          <h2 className="mt-1 text-xl font-bold">{plan.name}</h2>
          <p className="mt-3 text-3xl font-bold">
            ${plan.price}
            <span className="text-sm font-normal text-gray-500 dark:text-slate-400"> / month</span>
          </p>
        </div>

        <p className="mb-5 text-sm text-gray-600 dark:text-slate-300">
          You will be redirected to Stripe's hosted test checkout page.
          No real payment will be taken in test mode.
        </p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <CreditCard size={18} />
          {loading ? 'Connecting to Stripe...' : 'Continue to Stripe Checkout'}
        </button>

        <button
          onClick={() => navigate('/pricing')}
          className="mt-3 w-full rounded-lg border border-gray-300 dark:border-slate-600 dark:hover:bg-slate-800 px-5 py-3 font-medium"
        >
          Back to pricing
        </button>
      </div>
    </main>
  );
}
