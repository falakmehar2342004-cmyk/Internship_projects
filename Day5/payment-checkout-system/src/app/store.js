import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import couponReducer from '../features/coupon/couponSlice';
import ordersReducer from '../features/orders/ordersSlice';
import { saveToStorage, KEYS } from '../utils/storage';

// Yahan saare slices ek jagah register hote hain (ye hamara central store hai)
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    coupon: couponReducer,
    orders: ordersReducer,
  },
});

// Yahan cart aur orders jab bhi badlein, localStorage mein save ho jate hain.
// Purani value se compare karte hain taake bekar mein baar baar save na ho.
let lastCart = store.getState().cart.items;
let lastOrders = store.getState().orders.orders;

store.subscribe(() => {
  const state = store.getState();

  if (state.cart.items !== lastCart) {
    lastCart = state.cart.items;
    saveToStorage(KEYS.cart, lastCart);
  }
  if (state.orders.orders !== lastOrders) {
    lastOrders = state.orders.orders;
    saveToStorage(KEYS.orders, lastOrders);
  }
});
