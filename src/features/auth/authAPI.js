// src/features/auth/authAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL; // Make sure this URL is correct

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: loginData,  // Sending { username, password }
      }),
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: registerData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
