// src/features/friends/friendsAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // Use the environment variable for the API URL

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
  tagTypes: ['Friends'],
  endpoints: (builder) => ({
    // Fetch current user's friends
    getFriends: builder.query({
      query: () => '/api/friends/me',
      providesTags: ['Friends'],
    }),
    // Add a friend to the current user
    addFriend: builder.mutation({
      query: (friendId) => ({
        url: `/api/friends/me/${friendId}`,
        method: 'POST',
        body: { friendId },
      }),
      invalidatesTags: ['Friends'],
    }),
    // Remove a friend from the current user
    removeFriend: builder.mutation({
      query: (friendId) => ({
        url: `/api/friends/me/${friendId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Friends'],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendsAPI;
