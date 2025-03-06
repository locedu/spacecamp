import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL; // ✅ Use environment variable for API URL

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl, // ✅ Consistent with authAPI
    prepareHeaders: (headers, { getState }) => {
      // ✅ Retrieve token from Redux or localStorage
      const token = getState().auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ✅ Attach token
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: ({ query, filter = "username" }) => ({
        url: `/api/users/search?q=${encodeURIComponent(query)}&filter=${filter}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchUsersQuery } = userAPI;
