import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import { authAPI } from '../features/auth/authAPI'; 
import { postsAPI } from '../features/posts/postsAPI'; 
import { commentsAPI } from '../features/comments/commentsAPI'; 
import { userAPI } from '../features/user/userAPI'; 
import profileReducer from '../features/profile/profileSlice'; 
import { profileAPI } from '../features/profile/profileAPI'; // ✅ Import profileAPI
import { friendsAPI } from '../features/friends/friendsAPI'; 
import { notificationsAPI } from '../features/notifications/notificationsAPI'; 
import { activityAPI } from '../features/activity/activityAPI'; 

const store = configureStore({
  reducer: {
    auth: authReducer,  
    profile: profileReducer, 
    [authAPI.reducerPath]: authAPI.reducer, 
    [postsAPI.reducerPath]: postsAPI.reducer, 
    [commentsAPI.reducerPath]: commentsAPI.reducer, 
    [userAPI.reducerPath]: userAPI.reducer, 
    [profileAPI.reducerPath]: profileAPI.reducer, // ✅ Add profileAPI reducer
    [friendsAPI.reducerPath]: friendsAPI.reducer, 
    [notificationsAPI.reducerPath]: notificationsAPI.reducer, 
    [activityAPI.reducerPath]: activityAPI.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      postsAPI.middleware,
      commentsAPI.middleware, 
      userAPI.middleware, 
      profileAPI.middleware, // ✅ Add profileAPI middleware
      friendsAPI.middleware, 
      notificationsAPI.middleware, 
      activityAPI.middleware 
    ),
});

export default store;
