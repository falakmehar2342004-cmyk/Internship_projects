import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ArrowLeft, SearchX, ShoppingCart, Star, Zap } from 'lucide-react';
import { fetchProduct } from '../services/api';
import { getApiError } from '../utils/getApiError';
import { addToCart, getMaxQty, selectCartItemQty } from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/format';
import QuantityControl from '../components/QuantityControl';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

export default function ProductDetails() {
  const { id } = useParams(); // URL se product ki id (/products/5 -> "5")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // status: 'loading' | 'success' | 'error' | 'notfound'
  const [state, setState] = useState({ status: 'loading', product: null, message: '' });
  const [retryCount, setRetryCount] = useState(0); // badalne par API dobara chalti hai
  const [qty, setQty] = useState(1); // kitne add karne hain
  const [activeImage, setActiveImage] = useState(0); // bari tasveer kaun si hai

  const product = state.product;
  const inCart = useSelector((s) => (product ? selectCartItemQty(s, product.id) : 0));
  usePageTitle(product ? product.title : 'Product');

  // Yahan page khulte hi (ya id badalte hi) product API se aata hai
  useEffect(() => {
    let cancelled = false; // page chhor diya to purana jawab ignore karo
    setState({ status: 'loading', product: null, message: '' });
    setQty(1);
    setActiveImage(0);

    fetchProduct(id)
      .then((data) => {
        if (!cancelled) setState({ status: 'success', product: data, message: '' });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 404) {
          setState({ status: 'notfound', product: null, message: '' });
        } else {
          const message = getApiError(err);
          toast.error(message, { id: 'product-error' });
          setState({ status: 'error', product: null, message });
        }
      });

    return () => { cancelled = true; };
  }, [id, retryCount]);

  // ---- Loading ----
  if (state.status === 'loading') {
    return (
      <div className="grid gap-8 md:grid-cols-2" aria-busy="true">
        <div className="skeleton" style={{ aspectRatio: '1 / 1' }} />
        <div className="space-y-4">
          <div className="skeleton h-4 w-1/4" />
          <div className="skeleton h-8 w-4/5" />
          <div className="skeleton h-6 w-1/4" />
          <div className="skeleton h-24 w-full" />
        </div>
      </div>
    );
  }

  // ---- Product nahi mila ----
  if (state.status === 'notfound') {
    return (
      <EmptyState icon={SearchX} title="Product not found" message="This product doesn't exist or the link is incorrect.">
        <Link to="/" className="btn btn-primary">Back to shop</Link>
      </EmptyState>
    );
  }

  // ---- Error ----
  if (state.status === 'error') {
    return <ErrorState title="We couldn't load this product" message={state.message} onRetry={() => setRetryCount((c) => c + 1)} />;
  }

  // ---- Product mil gaya ----
  const maxQty = getMaxQty(product);
  const remaining = Math.max(maxQty - inCart, 0); // abhi mazeed kitne add ho sakte hain
  const outOfStock = Number(product.stock) === 0;
  const images = product.images?.length ? product.images : [product.thumbnail];

  // Yahan "Add to cart" ka kaam hota hai. true wapis karta hai agar add ho gaya.
  const handleAdd = () => {
    if (remaining === 0) {
      toast.error('You already have the maximum quantity in your cart.', { id: `max-${product.id}` });
      return false;
    }
    dispatch(addToCart({ product, quantity: Math.min(qty, remaining) }));
    setQty(1);
    toast.success(`Added "${product.title}" to cart`, { id: `add-${product.id}` });
    return true;
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="btn btn-ghost btn-sm w-fit">
        <ArrowLeft size={16} aria-hidden="true" /> Back to shop
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: tasveerein */}
        <div>
          <div className="card product-media" style={{ borderRadius: 16 }}>
            <img src={images[activeImage]} alt={product.title} />
          </div>
          {images.length > 1 && (
            <ul className="mt-3 flex gap-2 overflow-x-auto" aria-label="Product images">
              {images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    className="card h-16 w-16 overflow-hidden p-0"
                    style={i === activeImage ? { borderColor: 'var(--primary)', borderWidth: 2 } : undefined}
                  >
                    <img src={src} alt="" className="h-full w-full object-contain" loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: product ki maloomat */}
        <div className="space-y-4">
          <p className="muted text-sm capitalize">
            {[product.brand, String(product.category).replace(/-/g, ' ')].filter(Boolean).join(' / ')}
          </p>
          <h1>{product.title}</h1>
          <p className="muted flex items-center gap-1">
            <Star size={16} aria-hidden="true" style={{ color: 'var(--star)' }} fill="currentColor" />
            {Number(product.rating).toFixed(1)} rating
          </p>
          <p className="price text-3xl">{formatCurrency(product.price)}</p>
          <p>{product.description}</p>

          <p className={`badge ${outOfStock ? 'badge-danger' : 'badge-success'}`}>
            {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </p>

          {!outOfStock && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <QuantityControl
                  quantity={qty}
                  max={Math.max(remaining, 1)}
                  label={product.title}
                  onDecrease={() => setQty((q) => Math.max(q - 1, 1))}
                  onIncrease={() => setQty((q) => Math.min(q + 1, Math.max(remaining, 1)))}
                />
                {inCart > 0 && <span className="muted text-sm">{inCart} already in cart</span>}
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleAdd}>
                  <ShoppingCart size={18} aria-hidden="true" /> Add to cart
                </button>
                {/* "Buy now" = cart mein daalo aur seedha checkout par jao */}
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    if (remaining === 0 || handleAdd()) navigate('/checkout');
                  }}
                >
                  <Zap size={18} aria-hidden="true" /> Buy now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews (pehle 3) */}
      {product.reviews?.length > 0 && (
        <section aria-label="Reviews" className="space-y-3">
          <h2>Reviews</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {product.reviews.slice(0, 3).map((review, i) => (
              <li key={i} className="card p-4 text-sm">
                <p className="font-bold">{review.reviewerName} <span className="muted font-normal">({review.rating}/5)</span></p>
                <p className="muted mt-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
