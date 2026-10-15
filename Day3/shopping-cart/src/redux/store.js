
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
//Shared store ha yaha sa sara components data la ga
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});
