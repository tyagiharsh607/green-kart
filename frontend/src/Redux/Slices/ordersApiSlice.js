import { ORDERS_URL, PAYPAL_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (id) => ({
        url: ORDERS_URL + "/" + id,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providedTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: ORDERS_URL + "/myorders",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Orders"],
    }),

    addOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
        credentials: "include",
      }),

      invalidatesTags: ["Orders"],
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: ORDERS_URL + "/" + orderId + "/pay",
        method: "PUT",
        body: { ...details },
        credentials: "include",
      }),

      invalidatesTags: ["Orders"],
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (id) => ({
        url: ORDERS_URL + "/" + id + "/deliver",
        method: "PUT",
        credentials: "include",
      }),

      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useAddOrderMutation,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
