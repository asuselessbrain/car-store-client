import { TBLockUser } from "../../../pages/types";
import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    blockUser: builder.mutation({
      query: (userInfo: TBLockUser) => ({
        url: `/user/block-user/${userInfo?.id}`,
        method: "PUT",
        body: {
          userStatus: userInfo?.userStatus,
        },
      }),
      invalidatesTags: ["User"],
    }),
    createAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: '/user/create-admin',
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useCreateAdminMutation
} = userApi;
