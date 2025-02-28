// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';  // Import the authSlice reducer

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to the store
  },
});

export default store;
