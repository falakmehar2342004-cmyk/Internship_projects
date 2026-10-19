import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restoreCartItems } from '../features/cart/cartSlice';
import { applyCoupon } from '../features/coupon/couponSlice';

// Yahan "Retry payment" aur "Return to cart" buttons ka shared logic hai.
export default function useRetryPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();

  // Yahan cart aur coupon ko failed order jaisa bana dete hain
  const prepare = (order) => {
    dispatch(restoreCartItems(order.items)); // cart khali tha to saman wapis aa jayega
    if (order.couponCode && !store.getState().coupon.code) {
      dispatch(applyCoupon(order.couponCode)); // purana coupon dobara lagao
    }
  };

  // Yahan checkout page khulta hai, form pehle se bhara hua
  const retryPayment = (order) => {
    prepare(order);
    navigate(`/checkout?retry=${encodeURIComponent(order.id)}`);
  };

  // Yahan cart page khulta hai
  const returnToCart = (order) => {
    prepare(order);
    navigate('/cart');
  };

  return { retryPayment, returnToCart };
}
