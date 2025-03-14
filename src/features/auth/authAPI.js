import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { setSelectedUserId } from '../profile/profileSlice';

const baseUrl = import.meta.env.VITE_API_URL; 

export const authAPI = createApi({
  reducerPath: 'authAPI',
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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: loginData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedUserId(data.user.id));
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
    fetchUserProfile: builder.query({
      query: () => '/api/auth/me',
    }),
    
    // ✅ Added update user profile mutation
    updateUser: builder.mutation({
      query: (updatedData) => ({
        url: '/api/auth/me',
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useFetchUserProfileQuery, useUpdateUserMutation } = authAPI;
