import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CheckCircle2, DollarSign, LayoutDashboard, Percent, ReceiptText, RotateCcw, Trash2, XCircle } from 'lucide-react';
import { removeOrder, selectOrders } from '../features/orders/ordersSlice';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import useRetryPayment from '../hooks/useRetryPayment';
import { PAYMENT_METHODS } from '../utils/paymentMethods';
import { formatCurrency, formatDateTime, round2 } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

// Yahan filter form ki shuruaati (default) values hain
const DEFAULT_FILTERS = {
  search: '',
  status: 'all',
  method: 'all',
  from: '',
  to: '',
  sort: 'newest',
};

export default function Dashboard() {
  usePageTitle('Dashboard');
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const { retryPayment } = useRetryPayment();

  // Yahan dashboard ka filter form react-hook-form se bana hai.
  // watch() se hamein har change par naye filter values milte hain,
  // is liye table aur stats foran update hote hain (submit button ki zarurat nahi).
  const { register, watch, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_FILTERS,
  });
  const { search, status, method, from, to, sort } = watch();

  // Yahan orders ko filters ke mutabiq chhanta aur sort kiya jata hai.
  // useMemo: sirf tab dobara hisaab hota hai jab orders ya filter badlein.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const list = orders.filter((order) => {
      // order ki tareekh "2026-10-16" jaisi shakal mein (date input se compare karne ke liye)
      const day = new Date(order.createdAt).toLocaleDateString('en-CA');
      const text = `${order.id} ${order.customer?.fullName} ${order.customer?.email}`.toLowerCase();

      return (
        (!term || text.includes(term)) &&
        (status === 'all' || order.status === status) &&
        (method === 'all' || order.paymentMethod === method) &&
        (!from || day >= from) &&
        (!to || day <= to)
      );
    });

    // Yahan sort hota hai
    if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'oldest') list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === 'highest') list.sort((a, b) => b.total - a.total);
    if (sort === 'lowest') list.sort((a, b) => a.total - b.total);
    return list;
  }, [orders, search, status, method, from, to, sort]);

  // Yahan filtered orders se dashboard ke numbers nikalte hain
  const paidOrders = filtered.filter((o) => o.status === 'success');
  const failedCount = filtered.length - paidOrders.length;
  const revenue = round2(paidOrders.reduce((sum, o) => sum + o.total, 0));
  const savedWithCoupons = round2(paidOrders.reduce((sum, o) => sum + o.discount, 0));
  const successRate = filtered.length ? Math.round((paidOrders.length / filtered.length) * 100) : 0;
  const avgOrder = paidOrders.length ? round2(revenue / paidOrders.length) : 0;

  // Yahan har payment method ke kitne orders hain (bar chart ke liye)
  const methodCounts = PAYMENT_METHODS.map((m) => ({
    label: m.label,
    count: filtered.filter((o) => o.paymentMethod === m.value).length,
  }));
  const maxMethodCount = Math.max(...methodCounts.map((m) => m.count), 1);

  // Yahan ek order delete hota hai (pehle confirm karte hain)
  const handleDelete = (order) => {
    if (window.confirm(`Delete order ${order.id}?`)) {
      dispatch(removeOrder(order.id));
      toast.success('Order deleted', { id: 'order-deleted' });
    }
  };

  // Koi order hi nahi hai to khali card
  if (orders.length === 0) {
    return (
      <EmptyState icon={LayoutDashboard} title="Your dashboard is empty" message="Place an order and your sales numbers will show up here.">
        <Link to="/" className="btn btn-primary">Start shopping</Link>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="muted mt-1 text-sm">Numbers below follow the filters you choose.</p>
      </div>

      {/* ---------- Filter form (react-hook-form) ---------- */}
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="card grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Filter orders"
      >
        <div className="lg:col-span-2">
          <label htmlFor="f-search" className="label">Search</label>
          <input id="f-search" className="input" placeholder="Order ID, name or email" {...register('search')} />
        </div>

        <div>
          <label htmlFor="f-status" className="label">Status</label>
          <select id="f-status" className="input" {...register('status')}>
            <option value="all">All statuses</option>
            <option value="success">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-method" className="label">Payment method</label>
          <select id="f-method" className="input" {...register('method')}>
            <option value="all">All methods</option>
            {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="f-from" className="label">From date</label>
          <input id="f-from" type="date" className="input" {...register('from')} />
        </div>

        <div>
          <label htmlFor="f-to" className="label">To date</label>
          <input
            id="f-to"
            type="date"
            className="input"
            aria-invalid={errors.to ? 'true' : 'false'}
            // Yahan check hota hai ke "To" tareekh "From" se pehle na ho
            {...register('to', {
              validate: (value) => !value || !from || value >= from || 'End date must be after the start date.',
            })}
          />
          {errors.to && <p className="field-error" role="alert">{errors.to.message}</p>}
        </div>

        <div>
          <label htmlFor="f-sort" className="label">Sort by</label>
          <select id="f-sort" className="input" {...register('sort')}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest total</option>
            <option value="lowest">Lowest total</option>
          </select>
        </div>

        <div className="flex items-end">
          {/* reset() saare filters wapis default par le aata hai */}
          <button type="button" className="btn btn-secondary w-full" onClick={() => reset(DEFAULT_FILTERS)}>
            <RotateCcw size={16} aria-hidden="true" /> Reset filters
          </button>
        </div>
      </form>

      {/* ---------- Stat cards ---------- */}
      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Revenue" value={formatCurrency(revenue)} hint={`Average order ${formatCurrency(avgOrder)}`} />
        <StatCard icon={ReceiptText} label="Orders" value={filtered.length} hint={`${orders.length} in total`} />
        <StatCard icon={CheckCircle2} label="Paid / Failed" value={`${paidOrders.length} / ${failedCount}`} hint={`${successRate}% success rate`} />
        <StatCard icon={Percent} label="Coupon savings" value={formatCurrency(savedWithCoupons)} hint="Given on paid orders" />
      </section>

      {/* ---------- Payment methods ka chhota bar chart ---------- */}
      <section className="card p-5" aria-label="Orders by payment method">
        <h2 className="text-lg">Orders by payment method</h2>
        <ul className="mt-4 space-y-3">
          {methodCounts.map((m) => (
            <li key={m.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-bold">{m.label}</span>
                <span className="muted">{m.count}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(m.count / maxMethodCount) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Orders table ---------- */}
      <section className="card" aria-label="Orders table">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Method</th>
                <th className="num">Total</th>
                <th>Status</th>
                <th><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="muted" style={{ textAlign: 'center', padding: '2rem' }}>
                    No orders match these filters.
                  </td>
                </tr>
              )}

              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    {/* Order ID par click karo to uska result page khulta hai */}
                    <Link
                      to={`/${order.status === 'success' ? 'payment-success' : 'payment-failed'}?order=${encodeURIComponent(order.id)}`}
                      className="font-bold"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td>
                    {order.customer?.fullName}
                    <span className="muted block text-xs">{order.customer?.email}</span>
                  </td>
                  <td className="muted">{formatDateTime(order.createdAt)}</td>
                  <td>{order.paymentMethodLabel}</td>
                  <td className="num price">{formatCurrency(order.total)}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <div className="flex justify-end gap-1">
                      {order.status === 'failed' && (
                        <button type="button" className="icon-btn" onClick={() => retryPayment(order)} aria-label={`Retry ${order.id}`}>
                          <RotateCcw size={15} aria-hidden="true" />
                        </button>
                      )}
                      <button type="button" className="icon-btn" onClick={() => handleDelete(order)} aria-label={`Delete ${order.id}`}>
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
