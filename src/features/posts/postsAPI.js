import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // Ensure this URL is correct

export const postsAPI = createApi({
  reducerPath: 'postsAPI',
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
  tagTypes: ['Posts'],  // ✅ Define a tag for posts

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/api/posts',
      providesTags: ['Posts'],  // ✅ Provide tag so it can be invalidated
    }),
    getPostById: builder.query({
      query: (id) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }], // ✅ Provide tag per post
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/api/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],  // ✅ Invalidate to refresh list
    }),
    updatePost: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/posts/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Posts', id }, // ✅ Invalidate specific post
        'Posts', // ✅ Also refresh the full post list
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postsAPI;
