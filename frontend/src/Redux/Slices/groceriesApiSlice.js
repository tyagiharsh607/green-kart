import { GROCERIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const groceriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroceries: builder.query({
      query: (keyword) => ({
        url: GROCERIES_URL,
        params: {
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providedTags: ["Groceries"],
    }),
    getGroceryById: builder.query({
      query: (id) => ({
        url: `${GROCERIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providedTags: ["Groceries"],
    }),

    deleteGrocery: builder.mutation({
      query: (_id) => ({
        url: `${GROCERIES_URL}/${_id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    addGrocery: builder.mutation({
      query: (grocery) => ({
        url: GROCERIES_URL,
        method: "POST",
        credentials: "include",
        body: grocery,
      }),
    }),

    updateGrocery: builder.mutation({
      query: (grocery) => ({
        url: `${GROCERIES_URL}/${grocery.id}`,
        method: "PUT",
        credentials: "include",
        body: grocery,
      }),
    }),

    addReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `${GROCERIES_URL}/${id}/reviews`,
        method: "POST",
        credentials: "include",
        body: reviewData,
      }),
    }),

    getTopGroceries: builder.query({
      query: () => ({
        url: `${GROCERIES_URL}/top`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Groceries"],
    }),
  }),
});

export const {
  useGetGroceriesQuery,
  useGetGroceryByIdQuery,
  useDeleteGroceryMutation,
  useAddGroceryMutation,
  useUpdateGroceryMutation,
  useAddReviewMutation,
  useGetTopGroceriesQuery,
} = groceriesApiSlice;
