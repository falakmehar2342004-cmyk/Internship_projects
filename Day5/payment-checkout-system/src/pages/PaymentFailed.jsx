import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FileSearch, RotateCcw, ShoppingCart, XCircle } from 'lucide-react';
import { selectOrderById } from '../features/orders/ordersSlice';
import OrderDetails from '../components/OrderDetails';
import EmptyState from '../components/EmptyState';
import useRetryPayment from '../hooks/useRetryPayment';
import { formatCurrency, formatDateTime } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

// Yahan fail hui payment ka page hai (sirf "failed" order ke liye dikhta hai)
export default function PaymentFailed() {
  usePageTitle('Payment failed');
  const [params] = useSearchParams();
  const order = useSelector((s) => selectOrderById(s, params.get('order')));
  const { retryPayment, returnToCart } = useRetryPayment();

  if (!order || order.status !== 'failed') {
    return (
      <EmptyState icon={FileSearch} title="We couldn't find that attempt" message="This link doesn't match a failed payment saved on this device.">
        <Link to="/cart" className="btn btn-primary">Go to cart</Link>
        <Link to="/orders" className="btn btn-secondary">View orders</Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card p-6 text-center sm:p-8">
        <span className="result-icon result-icon-danger mx-auto"><XCircle size={34} aria-hidden="true" /></span>
        <h1 className="mt-4">Payment failed</h1>
        <p className="muted mt-2">
          {order.failureReason || 'The payment was declined.'} You have not been charged and your cart is still saved.
        </p>

        <dl className="mx-auto mt-6 grid max-w-xl gap-x-8 gap-y-3 text-left text-sm sm:grid-cols-2">
          <div><dt className="muted">Attempt ID</dt><dd className="break-all font-bold">{order.transactionId}</dd></div>
          <div><dt className="muted">Status</dt><dd className="font-bold" style={{ color: 'var(--danger)' }}>Failed</dd></div>
          <div><dt className="muted">Amount</dt><dd className="price">{formatCurrency(order.total)}</dd></div>
          <div><dt className="muted">Payment method</dt><dd className="font-bold">{order.paymentMethodLabel}</dd></div>
          <div><dt className="muted">Date</dt><dd className="font-bold">{formatDateTime(order.createdAt)}</dd></div>
          <div><dt className="muted">Order ID</dt><dd className="break-all font-bold">{order.id}</dd></div>
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-primary btn-lg" onClick={() => retryPayment(order)}>
            <RotateCcw size={18} aria-hidden="true" /> Retry payment
          </button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={() => returnToCart(order)}>
            <ShoppingCart size={18} aria-hidden="true" /> Return to cart
          </button>
        </div>
      </div>

      <section className="card p-5" aria-label="Attempt details">
        <h2 className="mb-3 text-lg">What you tried to buy</h2>
        <OrderDetails order={order} />
      </section>
    </div>
  );
}
