import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ReceiptText, Trash2 } from 'lucide-react';
import { clearOrders, selectOrders } from '../features/orders/ordersSlice';
import OrderCard from '../components/OrderCard';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

export default function Orders() {
  usePageTitle('Orders');
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  // Koi order nahi to khali card dikhao
  if (orders.length === 0) {
    return (
      <EmptyState icon={ReceiptText} title="No orders yet" message="Your orders will appear here, including failed payment attempts.">
        <Link to="/" className="btn btn-primary">Start shopping</Link>
      </EmptyState>
    );
  }

  // Yahan pehle pooch kar phir saari history delete karte hain
  const handleClear = () => {
    if (window.confirm('Delete all saved orders from this device?')) {
      dispatch(clearOrders());
      toast.success('Order history cleared', { id: 'orders-cleared' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1>Orders</h1>
          <p className="muted mt-1 text-sm">{orders.length} saved order{orders.length === 1 ? '' : 's'}.</p>
        </div>
        <button type="button" className="btn btn-danger btn-sm" onClick={handleClear}>
          <Trash2 size={15} aria-hidden="true" /> Clear history
        </button>
      </div>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id}><OrderCard order={order} /></li>
        ))}
      </ul>
    </div>
  );
}
