import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { activityAPI } from '../activity/activityAPI'; // ✅ Import activityAPI

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
  tagTypes: ['Posts', 'Activity'],

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
      invalidatesTags: ['Posts', 'Activity'],
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
      invalidatesTags: ['Posts', 'Activity'],
    }),

    // ✅ Add Like Post Mutation with explicit Activity invalidation
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/api/likes/${postId}`,
        method: 'POST',
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(activityAPI.util.invalidateTags(['Activity'])); // ✅ Invalidate Activity after success
        } catch (error) {
          console.error('Error invalidating Activity after like:', error);
        }
      },
      invalidatesTags: (result, error, postId) => [{ type: 'Posts', postId }],
    }),

    // ✅ Add Unlike Post Mutation with explicit Activity invalidation
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `/api/likes/${postId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(activityAPI.util.invalidateTags(['Activity'])); // ✅ Invalidate Activity after success
        } catch (error) {
          console.error('Error invalidating Activity after unlike:', error);
        }
      },
      invalidatesTags: (result, error, postId) => [{ type: 'Posts', postId }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postsAPI;
