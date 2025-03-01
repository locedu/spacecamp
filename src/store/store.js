import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { authAPI } from '../features/auth/authAPI'; // Import the RTK Query API reducer
import { postsAPI } from '../features/posts/postsAPI'; // Import the postsAPI

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to the store
    [authAPI.reducerPath]: authAPI.reducer, // Add the authAPI reducer to handle RTK Query requests
    [postsAPI.reducerPath]: postsAPI.reducer, // Add the postsAPI reducer to handle RTK Query requests
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, postsAPI.middleware), // Add RTK Query middleware to the store
});

export default store;
