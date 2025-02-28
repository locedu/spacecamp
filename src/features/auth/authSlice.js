// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // Or whatever state you're using to track user authentication
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null; // Clear the token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
