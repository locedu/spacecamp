import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { authAPI } from '../features/auth/authAPI'; // Import the RTK Query API reducer
import { postsAPI } from '../features/posts/postsAPI'; // Import the postsAPI
import { commentsAPI } from '../features/comments/commentsAPI'; // ✅ Import the commentsAPI

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to the store
    [authAPI.reducerPath]: authAPI.reducer, // Add the authAPI reducer to handle RTK Query requests
    [postsAPI.reducerPath]: postsAPI.reducer, // Add the postsAPI reducer to handle RTK Query requests
    [commentsAPI.reducerPath]: commentsAPI.reducer, // ✅ Add the commentsAPI reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postsAPI.middleware,
      commentsAPI.middleware // ✅ Add commentsAPI middleware
    ),
});

export default store;
