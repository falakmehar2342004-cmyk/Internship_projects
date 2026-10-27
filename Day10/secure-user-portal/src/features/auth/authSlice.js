// Redux mein current authenticated user aur loading state rakhte hain.
// Supabase actual authentication aur session manage karta hai.

import { createSlice } from '@reduxjs/toolkit';
// createSlice Redux Toolkit ka function hai jo ek jagah par 3 cheezein define karne mein help karta hai:
// - Initial state
// - Reducers
// - Actions
const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    session: null,
    initialized: false,//ka session set flow abhi tk complete nhi hoa
  },

  reducers: {
    setSession: (state, action) => {//state means redux ki current state,actions jo bad mn dispatch ka through hma information dega
      state.session = action.payload;//woh session jo hum setSession() ko dete hain.
      state.user = action.payload?.user ?? null;
      //?. optional chaining ha agr null value ae toh ya hma undefined de error na de
      //?? aga ya jo ha usa null mn convert kr dega undefined ko
      state.initialized = true;
    },

    clearSession: (state) => {
      state.session = null;//session pora state hoga
      state.user = null;// user ka objects save hoga
      state.initialized = true; //session checkup flow complete hoa ha ya nhi
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;//ya hm yaha actions store kr ka export kr rha ha jinha hm dosri files mn dispatch ka through call krega
export default authSlice.reducer;//ya btata ha ka redux store mn updation kesa hogi ya apna ander rules define kr deta ha