import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';
import { removeCoupon, selectCoupon } from '../features/coupon/couponSlice';

// Yahan agar cart khali ho jaye to coupon bhi hata dete hain,
// warna wo naye cart par apne aap lag jata.
export default function useCouponCleanup() {
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  const { code } = useSelector(selectCoupon);

  useEffect(() => {
    if (count === 0 && code) dispatch(removeCoupon());
  }, [count, code, dispatch]);
}
