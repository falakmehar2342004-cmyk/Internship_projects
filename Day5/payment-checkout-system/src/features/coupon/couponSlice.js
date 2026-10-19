import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from '../cart/cartSlice';

// Yahan coupon code aur unka discount percent hai
export const COUPONS = { SAVE10: 10, SAVE20: 20 };

// "  save10 " -> "SAVE10"  (space hata kar capital letters)
export const normalizeCoupon = (value) => String(value || '').trim().toUpperCase();

// Yahan check hota hai ke code valid hai ya nahi (form validation mein use hoga)
export const isValidCoupon = (value) => normalizeCoupon(value) in COUPONS;

// Coupon localStorage mein save nahi hota, taake purana code naye order par na lag jaye
const initialState = { code: null, percent: 0 };

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    // Yahan valid coupon lag jata hai (validation form pehle hi kar chuka hota hai)
    applyCoupon(state, action) {
      const code = normalizeCoupon(action.payload);
      if (code in COUPONS) {
        state.code = code;
        state.percent = COUPONS[code];
      }
    },
    // Yahan coupon hat jata hai
    removeCoupon() {
      return initialState;
    },
  },
  // Cart clear ho (jaise order ke baad) to coupon bhi saaf ho jaye
  extraReducers: (builder) => {
    builder.addCase(clearCart, () => initialState);
  },
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;

export const selectCoupon = (state) => state.coupon;
