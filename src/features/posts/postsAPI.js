import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // Ensure this URL is correct

export const postsAPI = createApi({
  reducerPath: 'postsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from Redux store or localStorage
      const token = getState().auth.token || localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/api/posts',  // Endpoint for fetching all posts
    }),
    getPostById: builder.query({  // ✅ Add missing query for fetching a single post
      query: (id) => `/api/posts/${id}`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/api/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

// ✅ Export all required hooks
export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsAPI;
