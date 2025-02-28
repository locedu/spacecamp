// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI'; // Assuming you have RTK Query setup for auth

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.login.matchFulfilled,  // RTK Query action for login
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.token);  // Store the token after login
      }
    );
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
