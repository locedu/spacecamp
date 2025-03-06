import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // Ensure this is correct

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl, // Correct base URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: ({ query, filter = 'username' }) => ({
        url: `/api/users/search?q=${encodeURIComponent(query)}&filter=${filter}`,
        method: 'GET',
      }),
    }),
    // Fetch user by ID
    getUserById: builder.query({
      query: (id) => `/api/users/${id}`, // Fetch user by ID
    }),
  }),
});

// Export hooks for use in components
export const { useSearchUsersQuery, useGetUserByIdQuery } = userAPI;
