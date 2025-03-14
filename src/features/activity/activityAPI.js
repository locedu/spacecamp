import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const activityAPI = createApi({
  reducerPath: 'activityAPI',
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
  tagTypes: ['Activity'],

  endpoints: (builder) => ({
    // Fetch activities for the authenticated user
    getActivities: builder.query({
      query: () => '/api/activities', // Fetch activities for the authenticated user
      providesTags: ['Activity'],
    }),

    // Mutation to mark activity as read (if needed)
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/api/activities/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Activity'],
    }),
  }),
});

export const { useGetActivitiesQuery, useMarkAsReadMutation } = activityAPI;
