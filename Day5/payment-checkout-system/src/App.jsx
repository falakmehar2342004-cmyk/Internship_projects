import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import useCouponCleanup from './hooks/useCouponCleanup';

export default function App() {
  // Yahan cart khali hote hi coupon automatically hata diya jata hai
  useCouponCleanup();

  return (
    <>
      {/* Yahan saare pages Layout ke andar hain (header + footer har page par nazar aayega) */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Yahan toast notifications ka style theme ke colours use karta hai */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          },
        }}
      />
    </>
  );
}
