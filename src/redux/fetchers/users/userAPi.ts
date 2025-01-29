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
    // http://localhost:5000/api/user/block-user/679a54441b5c1a7279aaa04b
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
  }),
});

export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
} = userApi;
