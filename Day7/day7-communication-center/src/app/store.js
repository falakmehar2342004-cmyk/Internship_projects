
import { configureStore } from '@reduxjs/toolkit'
import emailReducer from '../features/emails/emailSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'

export const store = configureStore({
  reducer: {
    emails: emailReducer,
    notifications: notificationReducer,
    dashboard: dashboardReducer,
  },
})
