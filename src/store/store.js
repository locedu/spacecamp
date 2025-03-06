import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { authAPI } from '../features/auth/authAPI'; // Import the RTK Query API reducer
import { postsAPI } from '../features/posts/postsAPI'; // Import the postsAPI
import { commentsAPI } from '../features/comments/commentsAPI'; // ✅ Import the commentsAPI
import { userAPI } from '../features/user/userAPI'; // ✅ Import the userAPI

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to the store
    [authAPI.reducerPath]: authAPI.reducer, // Add the authAPI reducer to handle RTK Query requests
    [postsAPI.reducerPath]: postsAPI.reducer, // Add the postsAPI reducer to handle RTK Query requests
    [commentsAPI.reducerPath]: commentsAPI.reducer, // ✅ Add the commentsAPI reducer
    [userAPI.reducerPath]: userAPI.reducer, // ✅ Add the userAPI reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postsAPI.middleware,
      commentsAPI.middleware, // ✅ Add commentsAPI middleware
      userAPI.middleware // ✅ Add userAPI middleware
    ),
});

export default store;
