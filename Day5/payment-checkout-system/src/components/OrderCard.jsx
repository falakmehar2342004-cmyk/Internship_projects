import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderDetails from './OrderDetails';
import useRetryPayment from '../hooks/useRetryPayment';
import { formatCurrency, formatDateTime } from '../utils/format';
import { getPaymentLabel } from '../utils/paymentMethods';

// Yahan items ko chhoti line mein likhte hain: "Mascara x2, Phone x1 +2 more"
function summarizeItems(items) {
  const shown = items.slice(0, 2).map((i) => `${i.title} x${i.quantity}`).join(', ');
  const extra = items.length - 2;
  return extra > 0 ? `${shown} +${extra} more` : shown;
}

// Yahan order history mein ek order ka card hai (details expand/collapse hoti hain)
export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false); // details khuli hain ya band
  const { retryPayment } = useRetryPayment();

  return (
    <article className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-all">{order.id}</h3>
          <p className="muted text-sm">{formatDateTime(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm">{summarizeItems(order.items)}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
        <div><dt className="muted">Payment</dt><dd className="font-bold">{order.paymentMethodLabel || getPaymentLabel(order.paymentMethod)}</dd></div>
        <div><dt className="muted">Subtotal</dt><dd className="price">{formatCurrency(order.subtotal)}</dd></div>
        <div><dt className="muted">Discount</dt><dd className="price">{order.discount > 0 ? `-${formatCurrency(order.discount)}` : formatCurrency(0)}</dd></div>
        <div><dt className="muted">Total</dt><dd className="price">{formatCurrency(order.total)}</dd></div>
      </dl>

      <p className="muted mt-2 break-all text-xs">Transaction ID: {order.transactionId}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
          {open ? 'Hide details' : 'View details'}
        </button>
        {/* Retry button sirf failed order par */}
        {order.status === 'failed' && (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => retryPayment(order)}>
            <RotateCcw size={15} aria-hidden="true" /> Retry payment
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
          <OrderDetails order={order} />
        </div>
      )}
    </article>
  );
}
