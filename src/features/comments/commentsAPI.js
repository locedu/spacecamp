import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // ✅ Match `postsAPI.js` setup

export const commentsAPI = createApi({
  reducerPath: 'commentsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Comments'], // ✅ Simple tag structure for caching

  endpoints: (builder) => ({
    getCommentsForPost: builder.query({
      query: (postId) => `/api/comments/post/${postId}`, // ✅ Ensure correct API path
      providesTags: ['Comments'],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: '/api/comments',
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsForPostQuery, useAddCommentMutation } = commentsAPI;
