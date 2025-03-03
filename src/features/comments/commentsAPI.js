import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // ✅ Match `postsAPI.js` setup

export const commentsAPI = createApi({
  reducerPath: 'commentsAPI',
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
  tagTypes: ['Comments'], // ✅ Simple tag structure for caching

  endpoints: (builder) => ({
    getCommentsForPost: builder.query({
      query: (postId) => `/api/comments/post/${postId}`,
      providesTags: (result, error, postId) => [{ type: 'Comments', postId }],
    }),
    getCommentById: builder.query({
      query: (id) => `/api/comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: '/api/comments',
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', postId }],
    }),
    updateComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `/api/comments/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { id, postId }) => [
        { type: 'Comments', postId },
        { type: 'Comments', id },
      ],
    }),
  }),
});

export const { 
  useGetCommentsForPostQuery, 
  useGetCommentByIdQuery,  
  useAddCommentMutation,
  useUpdateCommentMutation,
} = commentsAPI;
