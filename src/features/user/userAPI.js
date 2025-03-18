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
    // ✅ Search users by query (Filter by username or name)
    searchUsers: builder.query({
      query: ({ query, filter = 'username' }) => ({
        url: `/api/users/search?q=${encodeURIComponent(query)}&filter=${filter}`,
        method: 'GET',
      }),
    }),

    // ✅ Fetch all users
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/users`, // Fetch all users
        method: 'GET',
      }),
    }),

    // ✅ Fetch user by ID
    getUserById: builder.query({
      query: (id) => `/api/users/${id}`, // Fetch user by ID
    }),
  }),
});

// Export hooks for use in components
export const { useSearchUsersQuery, useGetAllUsersQuery, useGetUserByIdQuery } = userAPI;
