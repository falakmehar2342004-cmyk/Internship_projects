
import { createSlice } from '@reduxjs/toolkit'

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: readStorage('day7-notifications', []),
    preferences: readStorage('day7-notification-preferences', {
      emailSent: true,
      activity: true,
      browser: false,
    }),
  },
  reducers: {
    addNotification(state, action) {
      state.items.unshift(action.payload)
      state.items = state.items.slice(0, 50)
      localStorage.setItem(
        'day7-notifications',
        JSON.stringify(state.items),
      )
    },
    markAllRead(state) {
      state.items = state.items.map(item => ({
        ...item,
        read: true,
      }))
      localStorage.setItem(
        'day7-notifications',
        JSON.stringify(state.items),
      )
    },
    updatePreferences(state, action) {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      }
      localStorage.setItem(
        'day7-notification-preferences',
        JSON.stringify(state.preferences),
      )
    },
  },
})

export const {
  addNotification,
  markAllRead,
  updatePreferences,
} = notificationSlice.actions

export default notificationSlice.reducer
