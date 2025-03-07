import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { setSelectedUserId } from '../profile/profileSlice'; // Import the action

const baseUrl = import.meta.env.VITE_API_URL; // Make sure this URL is correct

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state or localStorage
      const token = getState().auth.token || localStorage.getItem('token');  // Access token from Redux or localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Set Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: loginData,  // Sending { email, password }
      }),
      // On successful login, dispatch the setSelectedUserId action
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch the action to update selectedUserId with the logged-in user's ID
          dispatch(setSelectedUserId(data.user.id)); // Assuming 'user.id' is returned from the login API response
        } catch (error) {
          console.error('Error setting selected user ID:', error);
        }
      }
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: registerData,
      }),
    }),
    // Fetch user profile from /api/auth/me
    fetchUserProfile: builder.query({
      query: () => '/api/auth/me', // GET request to retrieve user profile
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useFetchUserProfileQuery } = authAPI;
