import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ShoppingBag, Trash2 } from 'lucide-react';
import {
  clearCart, decreaseQty, increaseQty, removeFromCart, selectCartItems,
} from '../features/cart/cartSlice';
import useOrderSummary from '../hooks/useOrderSummary';
import QuantityControl from '../components/QuantityControl';
import OrderSummary from '../components/OrderSummary';
import CouponBox from '../components/CouponBox';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';

export default function Cart() {
  usePageTitle('Cart');
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems); // cart ke saare items
  const summary = useOrderSummary(); // subtotal, discount, total

  // Cart khali ho to ye card dikhao
  if (items.length === 0) {
    return (
      <EmptyState icon={ShoppingBag} title="Your cart is empty" message="Add a few products and they will show up here.">
        <Link to="/" className="btn btn-primary">Browse products</Link>
        <Link to="/orders" className="btn btn-secondary">View orders</Link>
      </EmptyState>
    );
  }

  // Yahan ek item cart se hata kar toast dikhate hain
  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    toast(`Removed "${item.title}"`, { id: `remove-${item.id}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1>Your cart</h1>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
            dispatch(clearCart()); // coupon bhi saaf ho jata hai
            toast.success('Cart cleared', { id: 'cart-cleared' });
          }}
        >
          <Trash2 size={15} aria-hidden="true" /> Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Left: cart ke items */}
        <ul className="space-y-3" aria-label="Cart items">
          {items.map((item) => (
            <li key={item.id} className="card flex flex-wrap items-center gap-4 p-4">
              <Link to={`/products/${item.id}`} className="product-media h-20 w-20 shrink-0" style={{ borderRadius: 12 }}>
                <img src={item.thumbnail} alt="" loading="lazy" />
              </Link>
              <div className="min-w-0 flex-1 basis-40">
                <Link to={`/products/${item.id}`} className="line-clamp-2 font-bold" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                  {item.title}
                </Link>
                <p className="muted text-sm">{formatCurrency(item.price)} each</p>
              </div>
              <QuantityControl
                quantity={item.quantity}
                max={item.maxQty}
                label={item.title}
                onDecrease={() => dispatch(decreaseQty(item.id))}
                onIncrease={() => dispatch(increaseQty(item.id))}
              />
              <p className="price w-24 text-right">{formatCurrency(item.price * item.quantity)}</p>
              <button type="button" className="icon-btn" onClick={() => handleRemove(item)} aria-label={`Remove ${item.title}`}>
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        {/* Right: coupon + totals */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-4"><CouponBox /></div>
          <OrderSummary items={items} summary={summary} showItems={false} title="Totals">
            <Link to="/checkout" className="btn btn-primary btn-lg w-full">Proceed to checkout</Link>
            <Link to="/" className="btn btn-ghost w-full">Continue shopping</Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
