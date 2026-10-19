import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, KEYS } from '../../utils/storage';

export const MAX_QTY = 10; // ek product ki zyada se zyada 10 quantity

// Yahan max quantity nikalte hain: 10 se zyada nahi, aur stock se bhi zyada nahi
export const getMaxQty = (product) => {
  const stock = Number(product.stock);
  return stock > 0 ? Math.min(MAX_QTY, stock) : MAX_QTY;
};

// Yahan refresh ke baad bhi cart wapis aa jata hai (localStorage se)
const saved = loadFromStorage(KEYS.cart, []);
const initialState = { items: Array.isArray(saved) ? saved : [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Yahan product cart mein add hota hai. Pehle se ho to sirf quantity barhti hai.
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const maxQty = getMaxQty(product);
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, existing.maxQty);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: Number(product.price),
          thumbnail: product.thumbnail,
          maxQty,
          quantity: Math.min(quantity, maxQty),
        });
      }
    },

    // Yahan quantity +1 hoti hai (max se aage nahi jati)
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.maxQty) item.quantity += 1;
    },

    // Yahan quantity -1 hoti hai (1 se neeche nahi jati)
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // Yahan ek product cart se nikal dete hain
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Yahan poora cart khali ho jata hai
    clearCart(state) {
      state.items = [];
    },

    // Yahan failed order ka saman wapis cart mein daalte hain (retry ke liye).
    // Agar cart mein pehle se kuch ho to kuch nahi karte.
    restoreCartItems(state, action) {
      if (state.items.length > 0) return;
      state.items = action.payload.map((i) => ({
        id: i.productId,
        title: i.title,
        price: i.price,
        thumbnail: i.thumbnail,
        maxQty: MAX_QTY,
        quantity: i.quantity,
      }));
    },
  },
});

export const {
  addToCart, increaseQty, decreaseQty, removeFromCart, clearCart, restoreCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;

// ---- Selectors: store se data nikalne ke chhote functions ----
export const selectCartItems = (state) => state.cart.items;

// Cart mein total kitne items hain (header ke badge ke liye)
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// Ek product cart mein kitni baar hai
export const selectCartItemQty = (state, productId) =>
  state.cart.items.find((item) => item.id === productId)?.quantity ?? 0;
