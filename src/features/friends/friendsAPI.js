// src/features/friends/friendsAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { activityAPI } from '../activity/activityAPI'; // ✅ Import Activity API to dispatch invalidation

const baseUrl = import.meta.env.VITE_API_URL;

export const friendsAPI = createApi({
  reducerPath: 'friendsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Friends', 'Activity'],
  endpoints: (builder) => ({
    // Fetch current user's friends
    getFriends: builder.query({
      query: () => '/api/friends/me',
      providesTags: ['Friends'],
    }),
    
    // ✅ Add a friend and trigger Activity refresh only if successful
    addFriend: builder.mutation({
      query: (friendId) => ({
        url: `/api/friends/me/${friendId}`,
        method: 'POST',
        body: { friendId },
      }),
      invalidatesTags: ['Friends'],
      async onQueryStarted(friendId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(activityAPI.util.invalidateTags(['Activity'])); // ✅ Force Activity refresh
        } catch (error) {
          console.error("Error adding friend:", error);
        }
      }
    }),

    // ✅ Remove a friend and trigger Activity refresh only if successful
    removeFriend: builder.mutation({
      query: (friendId) => ({
        url: `/api/friends/me/${friendId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Friends'],
      async onQueryStarted(friendId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(activityAPI.util.invalidateTags(['Activity'])); // ✅ Force Activity refresh
        } catch (error) {
          console.error("Error removing friend:", error);
        }
      }
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendsAPI;
