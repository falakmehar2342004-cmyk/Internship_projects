
import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { lastUpdated: null },
  reducers: {
    setLastUpdated(state, action) {
      state.lastUpdated = action.payload
    },
  },
})

export const { setLastUpdated } = dashboardSlice.actions
export default dashboardSlice.reducer
