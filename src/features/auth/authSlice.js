// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,  // Token is initially null (or you can fetch it from localStorage)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;  // Set the token
    },
    logout(state) {
      state.token = null;  // Remove the token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
