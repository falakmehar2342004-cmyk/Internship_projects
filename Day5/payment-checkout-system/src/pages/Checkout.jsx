import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Banknote, CreditCard, Loader2, ShoppingBag, Wallet } from 'lucide-react';
import { clearCart, selectCartItems } from '../features/cart/cartSlice';
import { addOrder, selectOrderById } from '../features/orders/ordersSlice';
import useOrderSummary from '../hooks/useOrderSummary';
import { makeId } from '../utils/ids';
import { getPaymentLabel, PAYMENT_METHODS } from '../utils/paymentMethods';
import { formatCurrency } from '../utils/format';
import FormField from '../components/FormField';
import OrderSummary from '../components/OrderSummary';
import CouponBox from '../components/CouponBox';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

// Yahan har payment method ka icon hai
const PAYMENT_ICONS = { card: CreditCard, paypal: Wallet, cod: Banknote };

// Yahan har field ke validation rules hain (react-hook-form inhein khud check karta hai)
const rules = {
  fullName: {
    required: 'Please enter your full name.',
    minLength: { value: 2, message: 'Name must be at least 2 characters.' },
    maxLength: { value: 60, message: 'Name must be 60 characters or fewer.' },
    pattern: { value: /^[\p{L}][\p{L}\s.'-]*$/u, message: 'Use letters, spaces, apostrophes or hyphens only.' },
  },
  email: {
    required: 'Please enter your email address.',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Enter a valid email, like name@example.com.' },
  },
  phone: {
    required: 'Please enter your phone number.',
    pattern: { value: /^[+()\-\s\d]{7,20}$/, message: 'Use digits, spaces, + ( ) or - only.' },
    // Yahan sirf digits gin kar dekhte hain ke 7 se 15 ke darmiyan hain
    validate: (value) => {
      const digits = value.replace(/\D/g, '').length;
      return (digits >= 7 && digits <= 15) || 'A phone number needs 7 to 15 digits.';
    },
  },
  address: {
    required: 'Please enter your shipping address.',
    minLength: { value: 5, message: 'Address must be at least 5 characters.' },
    maxLength: { value: 120, message: 'Address must be 120 characters or fewer.' },
  },
  city: {
    required: 'Please enter your city.',
    minLength: { value: 2, message: 'City must be at least 2 characters.' },
  },
  postalCode: {
    required: 'Please enter your postal code.',
    pattern: { value: /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/, message: 'Postal code must be 3-10 letters, numbers, spaces or hyphens.' },
  },
};

// Payment process hone mein lagne wala nakli waqt (milliseconds)
const PROCESSING_DELAY_MS = 1800;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Checkout() {
  usePageTitle('Checkout');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();
  const [params] = useSearchParams();

  const items = useSelector(selectCartItems);
  const summary = useOrderSummary();

  // ---- Retry: /checkout?retry=<orderId> par form failed order se pehle se bhar jata hai ----
  const retryId = params.get('retry');
  const retryOrder = useSelector((s) => (retryId ? selectOrderById(s, retryId) : null));
  const isRetry = retryOrder?.status === 'failed';
  const old = isRetry ? retryOrder.customer || {} : {}; // purani details (retry ho to)

  // Yahan poora checkout form react-hook-form se bana hai.
  // isSubmitting = onSubmit chal raha hai (button disable karne ke kaam aata hai)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched', // field chhorne ke baad error dikhao
    defaultValues: {
      fullName: old.fullName ?? '',
      email: old.email ?? '',
      phone: old.phone ?? '',
      address: old.address ?? '',
      city: old.city ?? '',
      postalCode: old.postalCode ?? '',
      paymentMethod: isRetry ? retryOrder.paymentMethod : 'card',
      paymentResult: 'success',
    },
  });

  // Cart khali ho to checkout nahi ho sakta
  if (items.length === 0 && !isSubmitting) {
    return (
      <EmptyState icon={ShoppingBag} title="Nothing to check out yet" message="Your cart is empty. Add a product first.">
        <Link to="/" className="btn btn-primary">Browse products</Link>
        <Link to="/orders" className="btn btn-secondary">View orders</Link>
      </EmptyState>
    );
  }

  // Yahan form submit hota hai (sirf tab jab saari validation pass ho)
  const onSubmit = async (values) => {
    const cartItems = selectCartItems(store.getState()); // cart ka taaza data
    const didSucceed = values.paymentResult === 'success';

    await sleep(PROCESSING_DELAY_MS); // payment process hone ka intezar

    // Yahan order ki copy (snapshot) banti hai. Baad mein product ki price badle
    // to bhi purana order wahi rahega.
    const order = {
      id: makeId('ORD'),
      transactionId: makeId('TXN'),
      createdAt: new Date().toISOString(),
      status: didSucceed ? 'success' : 'failed',
      paymentMethod: values.paymentMethod,
      paymentMethodLabel: getPaymentLabel(values.paymentMethod),
      items: cartItems.map((i) => ({
        productId: i.id, title: i.title, price: i.price, quantity: i.quantity, thumbnail: i.thumbnail,
      })),
      subtotal: summary.subtotal,
      discount: summary.discount,
      couponCode: summary.couponCode,
      couponPercent: summary.couponPercent,
      total: summary.total,
      customer: {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        postalCode: values.postalCode.trim(),
      },
      failureReason: didSucceed ? null : 'The payment was declined.',
      retryOf: isRetry ? retryOrder.id : null, // pichhle failed order se link
    };

    dispatch(addOrder(order)); // order hamesha save hota hai (success ho ya fail)

    if (didSucceed) {
      dispatch(clearCart()); // cart sirf kamyab payment ke baad khali hota hai
      toast.success('Payment successful', { id: 'payment-result' });
      navigate(`/payment-success?order=${encodeURIComponent(order.id)}`);
    } else {
      // Fail hone par cart waisa hi rehta hai taake dobara try kar sakein
      toast.error('Payment failed', { id: 'payment-result' });
      navigate(`/payment-failed?order=${encodeURIComponent(order.id)}`);
    }
  };

  return (
    <div className="space-y-6">
      <h1>Checkout</h1>

      {isRetry && (
        <div className="notice notice-danger" role="status">
          <p>
            Retrying failed payment <strong className="break-all">{retryOrder.id}</strong>. Your details are
            pre-filled and this attempt will be saved as a new order.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        {/* ---------- Left: checkout form ---------- */}
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate className="min-w-0 space-y-6">
          {/* Shipping details */}
          <section className="card space-y-4 p-5" aria-labelledby="shipping-title">
            <h2 id="shipping-title" className="text-lg">Shipping details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="fullName" label="Full name" autoComplete="name" error={errors.fullName} registration={register('fullName', rules.fullName)} />
              <FormField id="email" label="Email" type="email" autoComplete="email" error={errors.email} registration={register('email', rules.email)} />
              <FormField id="phone" label="Phone number" type="tel" autoComplete="tel" error={errors.phone} registration={register('phone', rules.phone)} />
              <FormField id="city" label="City" autoComplete="address-level2" error={errors.city} registration={register('city', rules.city)} />
            </div>
            <FormField id="address" label="Shipping address" as="textarea" rows={3} autoComplete="street-address" error={errors.address} registration={register('address', rules.address)} />
            <div className="sm:w-1/2">
              <FormField id="postalCode" label="Postal code" autoComplete="postal-code" error={errors.postalCode} registration={register('postalCode', rules.postalCode)} />
            </div>
          </section>

          {/* Payment method (radio buttons) */}
          <section className="card p-5" aria-labelledby="payment-title">
            <h2 id="payment-title" className="text-lg">Payment method</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = PAYMENT_ICONS[method.value];
                return (
                  <label key={method.value} className="choice">
                    <input type="radio" value={method.value} {...register('paymentMethod')} />
                    <span>
                      <span className="flex items-center gap-2 font-bold"><Icon size={16} aria-hidden="true" />{method.label}</span>
                      <span className="muted block text-xs">{method.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Payment result: isse success ya fail wala page test kar sakte hain */}
          <section className="card p-5" aria-labelledby="result-title">
            <h2 id="result-title" className="text-lg">Payment result</h2>
            <p className="muted mt-1 text-sm">Choose how this payment should end, so you can test both result pages.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="choice">
                <input type="radio" value="success" {...register('paymentResult')} />
                <span><span className="font-bold">Payment succeeds</span><span className="muted block text-xs">Order is marked as paid and the cart is cleared.</span></span>
              </label>
              <label className="choice">
                <input type="radio" value="failure" {...register('paymentResult')} />
                <span><span className="font-bold">Payment fails</span><span className="muted block text-xs">Order is marked as failed and the cart is kept for a retry.</span></span>
              </label>
            </div>
          </section>
        </form>

        {/* ---------- Right: coupon + summary ---------- */}
        {/* Coupon form alag hai (checkout form ke bahar), warna <form> ke andar <form> ho jata */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-4"><CouponBox /></div>
          <OrderSummary items={items} summary={summary}>
            {/* form="checkout-form" se ye button bahar hote hue bhi us form ko submit karta hai */}
            <button type="submit" form="checkout-form" className="btn btn-primary btn-lg w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
              {isSubmitting ? 'Processing payment...' : `Pay ${formatCurrency(summary.total)}`}
            </button>
            <Link to="/cart" className="btn btn-ghost w-full" aria-disabled={isSubmitting}>Back to cart</Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
