
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { getApiErrorMessage } from "../services/api";

export const fetchProducts = createAsyncThunk(//API jaisa asynchronous kaam handle karta hai.
  "products/fetchProducts",
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await api.get("/products", { signal });
      return response.data;
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }

      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.status = "idle";
          return;
        }

        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Failed to load products";
      });
  },
});

export default productSlice.reducer;
