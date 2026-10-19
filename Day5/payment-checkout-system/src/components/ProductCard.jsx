import { Link } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import toast from 'react-hot-toast';
import { ShoppingCart, Star } from 'lucide-react';
import { addToCart, getMaxQty, selectCartItemQty } from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/format';

// Yahan grid mein ek product ka card hai
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const store = useStore();
  const outOfStock = Number(product.stock) === 0;

  // Yahan "Add" dabane par product cart mein jata hai
  const handleAdd = () => {
    // Click ke waqt check karte hain ke cart mein pehle se kitna hai
    const inCart = selectCartItemQty(store.getState(), product.id);
    if (inCart >= getMaxQty(product)) {
      toast.error('You already have the maximum quantity in your cart.', { id: `max-${product.id}` });
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`Added "${product.title}" to cart`, { id: `add-${product.id}` });
  };

  return (
    <article className="card product-card flex flex-col overflow-hidden">
      <Link to={`/products/${product.id}`} className="product-media" aria-label={`View ${product.title}`}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" width="300" height="300" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="muted text-xs capitalize">{String(product.category).replace(/-/g, ' ')}</p>
        <h3 className="line-clamp-2">
          <Link to={`/products/${product.id}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>
            {product.title}
          </Link>
        </h3>
        <p className="muted flex items-center gap-1 text-sm">
          <Star size={14} aria-hidden="true" style={{ color: 'var(--star)' }} fill="currentColor" />
          {Number(product.rating).toFixed(1)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="price text-lg">{formatCurrency(product.price)}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleAdd} disabled={outOfStock}>
            <ShoppingCart size={15} aria-hidden="true" />
            {outOfStock ? 'Sold out' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
