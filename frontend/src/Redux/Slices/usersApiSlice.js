import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providedTags: ["Users"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/updateuser`,
        method: "PUT",
        credentials: "include",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `${USERS_URL}/${_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
