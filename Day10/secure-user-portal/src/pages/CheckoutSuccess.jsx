
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, LoaderCircle, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState('checking');
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function verifyCheckout() {
      if (!sessionId) {
        setStatus('missing');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          'verify-checkout-session',
          {
            body: { sessionId },
          }
        );

        if (error) throw error;

        if (cancelled) return;

        if (data?.verified) {
          setCheckout(data);
          setStatus('verified');
        } else {
          setStatus('unverified');
        }
      } catch (error) {
        console.error('Checkout verification error:', error);

        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    verifyCheckout();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      {status === 'checking' && (
        <>
          <LoaderCircle
            size={56}
            className="mx-auto animate-spin text-indigo-600 dark:text-indigo-400"
          />
          <h1 className="mt-5 text-2xl font-bold">
            Verifying your subscription...
          </h1>
          <p className="mt-3 text-gray-600 dark:text-slate-300">
            Please wait while we check the session with Stripe.
          </p>
        </>
      )}

      {status === 'verified' && (
        <>
          <CheckCircle2
            size={64}
            className="mx-auto text-green-600 dark:text-green-400"
          />
          <h1 className="mt-5 text-3xl font-bold">
            Subscription confirmed!
          </h1>
          <p className="mt-3 text-gray-600 dark:text-slate-300">
            Stripe has confirmed your subscription checkout.
          </p>

          {checkout?.amount != null && (
            <p className="mt-3 text-gray-600 dark:text-slate-300">
              Amount: <strong>
                {(checkout.amount / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: checkout.currency?.toUpperCase() || 'USD',
                })}
              </strong>
            </p>
          )}

          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Subscription status: {checkout?.subscriptionStatus}
          </p>
        </>
      )}

      {(status === 'missing' ||
        status === 'unverified' ||
        status === 'error') && (
        <>
          <ShieldAlert
            size={64}
            className="mx-auto text-amber-600 dark:text-amber-400"
          />
          <h1 className="mt-5 text-3xl font-bold">
            {status === 'missing'
              ? 'Checkout session not found'
              : 'Subscription not verified'}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-slate-300">
            {status === 'missing'
              ? 'The Stripe session ID is missing from this URL.'
              : status === 'unverified'
                ? 'Stripe has not confirmed an active, paid subscription for this session.'
                : 'We could not verify your checkout right now. Please try again.'}
          </p>
        </>
      )}

      <Link
        to="/pricing"
        className="mt-7 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Back to pricing
      </Link>
    </main>
  );
}
