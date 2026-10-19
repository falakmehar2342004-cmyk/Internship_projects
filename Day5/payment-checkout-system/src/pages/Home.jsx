import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2, PackageSearch, Search, X } from 'lucide-react';
import {
  loadCategories, loadProducts, resetFilters, selectHasMore, setCategory, setSearch,
} from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle('Shop');
  const dispatch = useDispatch();

  // Yahan store se products ka saara data nikal rahe hain
  const { items, total, status, error, loadingMore, loadMoreError, search, category, categories } =
    useSelector((state) => state.products);
  const hasMore = useSelector(selectHasMore);

  // Yahan search/category ka form react-hook-form se bana hai.
  // watch() har change par naya value deta hai, reset() form ko khali karta hai.
  const { register, watch, reset, setValue } = useForm({
    defaultValues: { search, category },
  });
  const searchText = watch('search');
  const selectedCategory = watch('category');

  // Yahan page khulte hi categories mangwate hain (dropdown ke liye)
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  // Categories aane ke baad dropdown mein purani selection dobara set karte hain
  useEffect(() => {
    setValue('category', category);
  }, [categories, category, setValue]);

  // Yahan user ke type karna ruknay ke 400ms baad hi search chalti hai (debounce),
  // taake har letter par API call na ho.
  useEffect(() => {
    const timer = setTimeout(() => dispatch(setSearch(searchText.trim())), 400);
    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  // Yahan dropdown badalte hi category store mein save hoti hai
  useEffect(() => {
    dispatch(setCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  // Yahan search ya category badalne par pehla page dobara load hota hai
  useEffect(() => {
    dispatch(loadProducts({ search, category, append: false }));
  }, [dispatch, search, category]);

  // Yahan error aaye to ek toast dikhate hain
  useEffect(() => {
    if (status === 'failed' && error) toast.error(error, { id: 'products-error' });
  }, [status, error]);

  // Yahan "Clear" dabane par form aur store dono saaf ho jate hain
  const clearFilters = () => {
    reset({ search: '', category: '' });
    dispatch(resetFilters());
  };

  const hasFilters = Boolean(searchText || selectedCategory);

  return (
    <div className="space-y-8">
      {/* ---------- Hero: sabse upar ka bara hissa ---------- */}
      <section className="hero">
        <div>
          <h1>Good finds, checked out in a minute.</h1>
          <p className="hero-text mt-3">
            Browse the catalogue, add what you like to your cart and use a coupon at checkout.
            Your orders are saved on this device so you can look back at them any time.
          </p>
          <a href="#products" className="btn btn-accent btn-lg mt-6">Start shopping</a>
        </div>

        {/* Coupon tickets */}
        <div aria-label="Available coupons">
          <div className="ticket">
            <p className="ticket-code">SAVE10</p>
            <p className="ticket-desc"><strong>10% off</strong>your whole order</p>
          </div>
          <div className="ticket">
            <p className="ticket-code">SAVE20</p>
            <p className="ticket-desc"><strong>20% off</strong>your whole order</p>
          </div>
        </div>
      </section>

      {/* ---------- Search aur category filter (react-hook-form) ---------- */}
      <section
        id="products"
        aria-label="Find products"
        className="card grid gap-4 p-4 sm:grid-cols-[1fr_16rem_auto] sm:items-end"
      >
        {/* Enter dabane par page reload na ho */}
        <form onSubmit={(e) => e.preventDefault()} className="contents">
          <div>
            <label htmlFor="search" className="label">Search by title</label>
            <div className="relative">
              <Search size={16} aria-hidden="true" className="muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search"
                type="search"
                className="input"
                style={{ paddingLeft: '2.3rem' }}
                placeholder="e.g. mascara, phone, chair"
                {...register('search')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="label">Category</label>
            <select id="category" className="input" {...register('category')}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <button type="button" className="btn btn-ghost" onClick={clearFilters} disabled={!hasFilters}>
            <X size={16} aria-hidden="true" /> Clear
          </button>
        </form>
      </section>

      {/* ---------- Products ---------- */}
      <section aria-label="Products" aria-busy={status === 'loading'}>
        {status === 'succeeded' && (
          <p className="muted mb-3 text-sm" aria-live="polite">
            Showing {items.length} of {total} product{total === 1 ? '' : 's'}
          </p>
        )}

        {/* Loading: skeleton cards */}
        {(status === 'loading' || status === 'idle') && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {/* Error: retry button ke saath */}
        {status === 'failed' && (
          <ErrorState
            title="We couldn't load products"
            message={error}
            onRetry={() => dispatch(loadProducts({ search, category, append: false }))}
          />
        )}

        {/* Koi product match nahi hua */}
        {status === 'succeeded' && items.length === 0 && (
          <EmptyState icon={PackageSearch} title="No products match your search" message="Try a different word or remove the category filter.">
            <button type="button" className="btn btn-primary" onClick={clearFilters}>Clear filters</button>
          </EmptyState>
        )}

        {/* Products ki grid + Load more */}
        {status === 'succeeded' && items.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              {loadMoreError && <p className="field-error" role="alert">{loadMoreError}</p>}
              {hasMore && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => dispatch(loadProducts({ search, category, append: true }))}
                  disabled={loadingMore}
                >
                  {loadingMore && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
                  {loadingMore ? 'Loading...' : 'Load more'}
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
