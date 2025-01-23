// AuthApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* import { API_URL } from './config'; */

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password}) => ({
        url: 'auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ username, password }),
      }),
    }),
    Authenticate: builder.mutation({
      query: ({ username, password}) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ username, password }),
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthenticateMutation } = AuthApi;
