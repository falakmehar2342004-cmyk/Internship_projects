import { formatCurrency, formatDateTime } from '../utils/format';
import { getPaymentLabel } from '../utils/paymentMethods';
import StatusBadge from './StatusBadge';

// Yahan ek order ki poori detail hai: items, totals, payment info aur shipping address.
// Ye sirf order mein save hua data dikhata hai (cart ya products se nahi).
export default function OrderDetails({ order }) {
  return (
    <div className="space-y-5">
      {/* Order ke items */}
      <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {order.items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3 py-3" style={{ borderColor: 'var(--border)' }}>
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=""
                width="48"
                height="48"
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-lg object-contain"
                style={{ background: 'var(--surface-2)' }}
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 font-bold">{item.title}</p>
              <p className="muted text-sm">{item.quantity} x {formatCurrency(item.price)}</p>
            </div>
            <span className="price">{formatCurrency(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Left: raqam */}
        <dl>
          <div className="receipt-row"><dt>Subtotal</dt><dd>{formatCurrency(order.subtotal)}</dd></div>
          <div className="receipt-row">
            <dt>Coupon discount{order.couponCode ? ` (${order.couponCode})` : ''}</dt>
            <dd className={order.discount > 0 ? 'discount-text' : ''}>
              {order.discount > 0 ? `-${formatCurrency(order.discount)}` : formatCurrency(0)}
            </dd>
          </div>
          <div className="receipt-row receipt-total"><dt>Total</dt><dd>{formatCurrency(order.total)}</dd></div>
        </dl>

        {/* Right: status, payment, shipping */}
        <dl className="text-sm">
          <div className="receipt-row"><dt>Status</dt><dd><StatusBadge status={order.status} /></dd></div>
          <div className="receipt-row"><dt>Payment method</dt><dd>{order.paymentMethodLabel || getPaymentLabel(order.paymentMethod)}</dd></div>
          <div className="receipt-row"><dt>Transaction ID</dt><dd className="break-all text-right">{order.transactionId}</dd></div>
          <div className="receipt-row"><dt>Date</dt><dd>{formatDateTime(order.createdAt)}</dd></div>
          {order.customer && (
            <div className="receipt-row">
              <dt>Ship to</dt>
              <dd className="text-right">
                {order.customer.fullName}<br />
                {order.customer.address}<br />
                {order.customer.city} {order.customer.postalCode}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
