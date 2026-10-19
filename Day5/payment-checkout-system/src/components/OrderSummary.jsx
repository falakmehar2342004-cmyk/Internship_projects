import { formatCurrency } from '../utils/format';

// Yahan raseed (receipt) jaisa summary card hai.
// items = product list, summary = subtotal/discount/total.
// children mein jo buttons aayenge wo neeche dikhenge.
export default function OrderSummary({ items, summary, title = 'Order summary', showItems = true, children }) {
  return (
    <section className="card receipt" aria-label={title}>
      <h2 className="text-lg">{title}</h2>

      {/* Har product ki ek line */}
      {showItems && (
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span className="min-w-0">
                <span className="line-clamp-1">{item.title}</span>
                <span className="muted">{item.quantity} x {formatCurrency(item.price)}</span>
              </span>
              <span className="price shrink-0">{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Raqam ka hisaab */}
      <dl className="mt-4">
        <div className="receipt-row">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(summary.subtotal)}</dd>
        </div>
        <div className="receipt-row">
          <dt>Coupon discount{summary.couponCode ? ` (${summary.couponCode}, ${summary.couponPercent}%)` : ''}</dt>
          <dd className={summary.discount > 0 ? 'discount-text' : ''}>
            {summary.discount > 0 ? `-${formatCurrency(summary.discount)}` : formatCurrency(0)}
          </dd>
        </div>
        <div className="receipt-row">
          <dt>Shipping</dt>
          <dd>Free</dd>
        </div>
        <div className="receipt-row receipt-total">
          <dt>Total</dt>
          <dd>{formatCurrency(summary.total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-5 space-y-3">{children}</div>}
    </section>
  );
}
