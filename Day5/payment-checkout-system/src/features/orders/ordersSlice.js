import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, KEYS } from '../../utils/storage';

// Yahan purane orders localStorage se wapis aate hain
const saved = loadFromStorage(KEYS.orders, []);
const initialState = { orders: Array.isArray(saved) ? saved : [] };

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Yahan naya order sabse upar add hota hai.
    // Retry bhi naya order banata hai, purana failed order waisa hi rehta hai.
    addOrder(state, action) {
      state.orders.unshift(action.payload);
    },
    // Yahan ek order delete hota hai (dashboard se)
    removeOrder(state, action) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    // Yahan saare orders delete ho jate hain
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, removeOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectOrders = (state) => state.orders.orders;

// Yahan ID se ek order dhoondte hain (nahi mile to null)
export const selectOrderById = (state, id) =>
  state.orders.orders.find((order) => order.id === id) ?? null;
