// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI'; // Assuming you have RTK Query setup for auth

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,  // ✅ Store user data directly
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // ✅ Store user data
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;  // ✅ Reset user on logout
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authAPI.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;  // ✅ Store user after login
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.token);
        }
      )
      .addMatcher(
        authAPI.endpoints.fetchUserProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user; // ✅ Store user when fetching profile
        }
      );
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
