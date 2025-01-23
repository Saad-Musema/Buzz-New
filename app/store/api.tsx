/* import { API_URL } from "@/lib/api/config"; */
import { gabtypes, metatypes, version } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useAppSelector, AppDispatch, type RootState } from "./Store";
import * as SecureStore from "expo-secure-store";

// In your API slice

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const authtoken = await SecureStore.getItemAsync("authtoken");

    if (authtoken) {
      headers.set("authorization", `Bearer ${authtoken}`);
    }

    return headers;
  },
});

export const Gabapi = createApi({
  reducerPath: "gabapi",
  baseQuery,
  tagTypes: ["posts", "comment", "vote", "report", "Gab"],
  endpoints: (builder) => ({
    GetGab: builder.query<{ data: gabtypes[]; meta: metatypes }, any>({
      query: ({ latitude, longitude, page }) => ({
        url: `gab`,
        params: { latitude, longitude, page },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems, { arg }) => {
        // If fetching the first page, replace the current cache with new items
        if (arg.page === 1) {
          return newItems;
        }

        // For subsequent pages, merge and deduplicate items
        if (currentCache.data && newItems.data) {
          const mergedData = new Map(); // Using a Map for efficient key lookups

          // Add all current cache items to the Map
          currentCache.data.forEach((item) => mergedData.set(item.Id, item));

          // Add new items to the Map, this automatically deduplicates items
          newItems.data.forEach((item) => mergedData.set(item.Id, item));

          return {
            ...currentCache,
            ...newItems,
            data: Array.from(mergedData.values()), // Convert back to array
          };
        }

        return newItems;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: ["Gab"],
    }),

    GetviralGab: builder.query<{ data: gabtypes[]; meta: metatypes }, any>({
      query: ({ latitude, longitude, page }) => ({
        url: `gab/viral`,
        method: "Get",
        params: {
          latitude: latitude,
          longitude: longitude,
          page: page,
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }

        if (currentCache.data && newItems.data) {
          const mergedData = new Map();
          //to add current cache items to the map
          currentCache.data.forEach((item) => mergedData.set(item.Id, item));

          // for  deduplicates items
          newItems.data.forEach((item) => mergedData.set(item.Id, item));

          return {
            ...currentCache,
            ...newItems,
            data: Array.from(mergedData.values()),
          };
        }

        return newItems;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: ["Gab"],
    }),

    GetGabid: builder.query({
      query: (id) => ({
        url: `gab/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "posts", id }],
    }),

    CreatePost: builder.mutation({
      query: ({ content, latitude, longitude, image }) => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        if (image) {
          formData.append("file", {
            name: image.uri.split("/").pop(),
            uri: image.uri,
            type: "image/jpeg",
          } as any);
        }

        return {
          url: "gab",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          body: formData,
        };
      },
      invalidatesTags: ["Gab"],
    }),

    CreateComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `comment/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, content }),
      }),
      invalidatesTags: ["comment"],
    }),

    Createreport: builder.mutation({
      query: ({ id, content }) => ({
        url: `report/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, content }),
      }),
      invalidatesTags: ["report"],
    }),
    Createbugreport: builder.mutation({
      query: ({ bug }) => ({
        url: "extra/bug",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ bug }),
      }),
      invalidatesTags: ["report"],
    }),

    Vote: builder.mutation({
      query: ({ gabid, voteType }) => ({
        url: `vote/${gabid}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gabid, voteType }),
      }),
      invalidatesTags: ["vote"],
    }),

    deleteuser: builder.mutation({
      query: ({ id }) => ({
        url: `user/${id}/delete`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }),
      invalidatesTags: ["vote"],
    }),

    GetGabComment: builder.query({
      query: (id) => ({
        url: `comment/${id}/comments`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),

    GetUserGab: builder.query<gabtypes[], any>({
      query: () => ({
        url: "gab/user",
        method: "GET",
      }),
      providesTags: ["Gab"],
    }),

    Getupdate: builder.query<version[],void>({
      query: () => ({
        url: "update",
        method: "GET"
      })
    }),
  }),

});

export const {
  useGetGabQuery,
  useGetGabidQuery,
  useCreatePostMutation,
  useGetGabCommentQuery,
  useCreateCommentMutation,
  useVoteMutation,
  useGetviralGabQuery,
  useDeleteuserMutation,
  useCreatereportMutation,
  useGetUserGabQuery,
  useCreatebugreportMutation,
  useGetupdateQuery
} = Gabapi;
