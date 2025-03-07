import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,  // Try to fetch user data from localStorage
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // Store user data
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));  // Store user in localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;  // Reset user on logout
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');  // Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authAPI.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;  // Store user after login
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.token);
          localStorage.setItem('user', JSON.stringify(payload.user));  // Store user in localStorage
        }
      )
      .addMatcher(
        authAPI.endpoints.fetchUserProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user; // Store user when fetching profile
          localStorage.setItem('user', JSON.stringify(payload.user));  // Store user in localStorage
        }
      );
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
