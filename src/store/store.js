import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { authAPI } from '../features/auth/authAPI'; // Import the RTK Query API reducer
import { postsAPI } from '../features/posts/postsAPI'; // Import the postsAPI
import { commentsAPI } from '../features/comments/commentsAPI'; // ✅ Import the commentsAPI
import { userAPI } from '../features/user/userAPI'; // ✅ Import the userAPI
import profileReducer from '../features/profile/profileSlice'; // ✅ Import the profileSlice reducer
import { friendsAPI } from '../features/friends/friendsAPI'; // ✅ Import the friendsAPI
import { notificationsAPI } from '../features/notifications/notificationsAPI'; // ✅ Import the notificationsAPI

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to the store
    profile: profileReducer, // Add profileReducer to manage selectedUserId
    [authAPI.reducerPath]: authAPI.reducer, // Add the authAPI reducer to handle RTK Query requests
    [postsAPI.reducerPath]: postsAPI.reducer, // Add the postsAPI reducer to handle RTK Query requests
    [commentsAPI.reducerPath]: commentsAPI.reducer, // ✅ Add the commentsAPI reducer
    [userAPI.reducerPath]: userAPI.reducer, // ✅ Add the userAPI reducer
    [friendsAPI.reducerPath]: friendsAPI.reducer, // ✅ Add the friendsAPI reducer
    [notificationsAPI.reducerPath]: notificationsAPI.reducer, // ✅ Add the notificationsAPI reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postsAPI.middleware,
      commentsAPI.middleware, // ✅ Add commentsAPI middleware
      userAPI.middleware, // ✅ Add userAPI middleware
      friendsAPI.middleware, // ✅ Add friendsAPI middleware
      notificationsAPI.middleware // ✅ Add notificationsAPI middleware
    ),
});

export default store;
