import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
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
  tagTypes: ['Profile'], // ✅ Ensures profile data is refetched when updated
  endpoints: (builder) => ({
    getProfileById: builder.query({
      query: (userId) => `/api/profiles/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Profile', id: userId }],
    }),
    updateProfile: builder.mutation({
      query: ({ userId, updateData }) => ({
        url: `/api/profiles/${userId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Profile', id: userId }],
    }),
  }),
});

export const { useGetProfileByIdQuery, useUpdateProfileMutation } = profileAPI;
