import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchProducts, PAGE_SIZE } from '../../services/api';
import { getApiError } from '../../utils/getApiError';

const initialState = {
  items: [],
  total: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  loadingMore: false, // "Load more" dabane par true
  loadMoreError: null,
  search: '',
  category: '',
  categories: [],
};

// Yahan products API se aate hain. append=true ho to agla page purane products ke neeche judta hai.
export const loadProducts = createAsyncThunk(
  'products/load',
  async ({ search, category, append }, { getState, rejectWithValue }) => {
    try {
      const skip = append ? getState().products.items.length : 0;
      return await fetchProducts({ search, category, skip, limit: PAGE_SIZE });
    } catch (err) {
      return rejectWithValue(getApiError(err));
    }
  },
);

// Yahan categories ki list API se aati hai
export const loadCategories = createAsyncThunk('products/loadCategories', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategories();
  } catch (err) {
    return rejectWithValue(getApiError(err));
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    resetFilters(state) {
      state.search = '';
      state.category = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Request shuru hui
      .addCase(loadProducts.pending, (state, action) => {
        if (action.meta.arg.append) {
          state.loadingMore = true;
          state.loadMoreError = null;
        } else {
          state.status = 'loading';
          state.error = null;
        }
      })
      // Request kamyab hui
      .addCase(loadProducts.fulfilled, (state, action) => {
        // Agar user ne is dauran filter badal liya ho to ye purana jawab ignore karo
        const { search, category, append } = action.meta.arg;
        if (search !== state.search || category !== state.category) return;

        state.items = append ? [...state.items, ...action.payload.products] : action.payload.products;
        state.total = action.payload.total;
        state.status = 'succeeded';
        state.loadingMore = false;
      })
      // Request fail hui
      .addCase(loadProducts.rejected, (state, action) => {
        const { search, category, append } = action.meta.arg;
        if (search !== state.search || category !== state.category) return;

        if (append) {
          state.loadingMore = false;
          state.loadMoreError = action.payload;
        } else {
          state.status = 'failed';
          state.error = action.payload;
        }
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSearch, setCategory, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;

// Yahan check hota hai ke aur products baqi hain ya nahi
export const selectHasMore = (state) => state.products.items.length < state.products.total;
