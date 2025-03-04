import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

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
  tagTypes: ['Posts'],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/api/posts',
      providesTags: ['Posts'],
    }),
    getPostById: builder.query({
      query: (id) => `/api/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/api/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/posts/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }, 'Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),

    // ✅ Add Like Post Mutation
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/api/likes/${postId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, postId) => [{ type: 'Posts', postId }], // ✅ Refresh Post Data
    }),

    // ✅ Add Unlike Post Mutation
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `/api/likes/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, postId) => [{ type: 'Posts', postId }], // ✅ Refresh Post Data
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation, // ✅ New
  useUnlikePostMutation, // ✅ New
} = postsAPI;
