import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { authAPI } from '../features/auth/authAPI'; // Import the RTK Query API reducer
import { postsAPI } from '../features/posts/postsAPI'; // Import the postsAPI
import { commentsAPI } from '../features/comments/commentsAPI'; // ✅ Import the commentsAPI
import { userAPI } from '../features/user/userAPI'; // ✅ Import the userAPI
import profileReducer from '../features/profile/profileSlice'; // ✅ Import the profileSlice reducer
import { friendsAPI } from '../features/friends/friendsAPI'; // ✅ Import the friendsAPI
import { notificationsAPI } from '../features/notifications/notificationsAPI'; // ✅ Import the notificationsAPI
import { activityAPI } from '../features/activity/activityAPI'; // ✅ Import the activityAPI

const store = configureStore({
  reducer: {
    auth: authReducer,  
    profile: profileReducer, 
    [authAPI.reducerPath]: authAPI.reducer, 
    [postsAPI.reducerPath]: postsAPI.reducer, 
    [commentsAPI.reducerPath]: commentsAPI.reducer, 
    [userAPI.reducerPath]: userAPI.reducer, 
    [friendsAPI.reducerPath]: friendsAPI.reducer, 
    [notificationsAPI.reducerPath]: notificationsAPI.reducer, 
    [activityAPI.reducerPath]: activityAPI.reducer, // ✅ Add the activityAPI reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postsAPI.middleware,
      commentsAPI.middleware, 
      userAPI.middleware, 
      friendsAPI.middleware, 
      notificationsAPI.middleware, 
      activityAPI.middleware // ✅ Add activityAPI middleware
    ),
});

export default store;
