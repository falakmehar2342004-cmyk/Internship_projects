
import { createSlice } from '@reduxjs/toolkit'

function loadEmails() {
  try {
    return JSON.parse(localStorage.getItem('day7-emails') || '[]')
  } catch {
    return []
  }
}

const emailSlice = createSlice({
  name: 'emails',
  initialState: { items: loadEmails() },
  reducers: {
    addEmail(state, action) {
      state.items.unshift(action.payload)
      localStorage.setItem('day7-emails', JSON.stringify(state.items))
    },
    deleteEmail(state, action) {
      state.items = state.items.filter(
        email => email.id !== action.payload,
      )
      localStorage.setItem('day7-emails', JSON.stringify(state.items))
    },
  },
})

export const { addEmail, deleteEmail } = emailSlice.actions
export default emailSlice.reducer
