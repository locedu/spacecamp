import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // ✅ Ensure the API base URL is set correctly

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
  tagTypes: ['Comments', 'Posts'], 

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
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Comments', postId },
        { type: 'Posts', id: postId }, // ✅ Ensure post refreshes to update comment count
      ],
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
        { type: 'Posts', id: postId }, 
      ],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/api/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Comments', postId },
        { type: 'Posts', id: postId }, 
      ],
    }),
  }),
});

export const { 
  useGetCommentsForPostQuery, 
  useGetCommentByIdQuery,  
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentsAPI;
