import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle2, FileSearch } from 'lucide-react';
import { selectOrderById } from '../features/orders/ordersSlice';
import OrderDetails from '../components/OrderDetails';
import EmptyState from '../components/EmptyState';
import { formatCurrency, formatDateTime } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

// Yahan kamyab payment ka page hai.
// URL ki id sirf order dhoondne ke liye hai; page tabhi dikhta hai jab order sach mein "success" ho.
export default function PaymentSuccess() {
  usePageTitle('Payment successful');
  const [params] = useSearchParams();
  const order = useSelector((s) => selectOrderById(s, params.get('order')));

  // Order nahi mila ya success nahi tha
  if (!order || order.status !== 'success') {
    return (
      <EmptyState icon={FileSearch} title="We couldn't find that order" message="This link doesn't match a successful order saved on this device.">
        <Link to="/orders" className="btn btn-primary">View orders</Link>
        <Link to="/" className="btn btn-secondary">Continue shopping</Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card p-6 text-center sm:p-8">
        <span className="result-icon result-icon-success mx-auto"><CheckCircle2 size={34} aria-hidden="true" /></span>
        <h1 className="mt-4">Payment successful</h1>
        <p className="muted mt-2">Thank you for your order! A summary is saved in your order history.</p>

        <dl className="mx-auto mt-6 grid max-w-xl gap-x-8 gap-y-3 text-left text-sm sm:grid-cols-2">
          <div><dt className="muted">Transaction ID</dt><dd className="break-all font-bold">{order.transactionId}</dd></div>
          <div><dt className="muted">Status</dt><dd className="font-bold" style={{ color: 'var(--success)' }}>Paid</dd></div>
          <div><dt className="muted">Amount</dt><dd className="price">{formatCurrency(order.total)}</dd></div>
          <div><dt className="muted">Payment method</dt><dd className="font-bold">{order.paymentMethodLabel}</dd></div>
          <div><dt className="muted">Date</dt><dd className="font-bold">{formatDateTime(order.createdAt)}</dd></div>
          <div><dt className="muted">Order ID</dt><dd className="break-all font-bold">{order.id}</dd></div>
        </dl>
      </div>

      <section className="card p-5" aria-label="Order details">
        <h2 className="mb-3 text-lg">Order details</h2>
        <OrderDetails order={order} />
      </section>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/orders" className="btn btn-primary">View order history</Link>
        <Link to="/" className="btn btn-secondary">Continue shopping</Link>
      </div>
    </div>
  );
}
