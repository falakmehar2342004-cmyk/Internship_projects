import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import { selectCoupon } from '../features/coupon/couponSlice';
import { round2 } from '../utils/format';

// Yahan cart + coupon se subtotal, discount aur total nikalte hain.
// Cart, Checkout aur Order banate waqt yahi hook use hota hai, is liye har jagah same raqam nazar aati hai.
export default function useOrderSummary() {
  const items = useSelector(selectCartItems);
  const { code, percent } = useSelector(selectCoupon);

  // useMemo: items ya coupon badlein tabhi dobara hisaab hota hai
  return useMemo(() => {
    const subtotal = round2(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
    const discount = code ? round2((subtotal * percent) / 100) : 0;

    return {
      subtotal,
      discount,
      total: round2(subtotal - discount),
      couponCode: code,
      couponPercent: percent,
    };
  }, [items, code, percent]);
}
