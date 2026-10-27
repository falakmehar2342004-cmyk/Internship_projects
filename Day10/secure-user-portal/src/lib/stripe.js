
import { loadStripe } from '@stripe/stripe-js';

// Stripe ki sirf publishable test key frontend mein use hogi.
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Key available ho to Stripe.js load karo.
export const stripePromise = publishableKey?.startsWith('pk_test_')
  ? loadStripe(publishableKey)
  : null;
