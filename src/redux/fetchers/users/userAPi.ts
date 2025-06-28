import { TBLockUser } from "../../../pages/types";
import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (searchParams) => {
        const { filter = {}, searchItem, sort, page, limit } = searchParams || {};

        // Handle dynamic multi-field filters (like role, status, etc.)
        const filterQuery = Object.entries(filter)
          .flatMap(([key, values]) =>
            (values as string[]).map((val) => `${key}=${encodeURIComponent(val)}`)
          )
          .join("&");

        const searchQuery = searchItem ? `searchTerm=${encodeURIComponent(searchItem)}` : "";
        const sortQuery = sort ? `sortBy=createdAt&sortOrder=${sort}` : ""; // you can change sortBy to any valid field like email, createdAt, etc.
        const pageQuery = page ? `page=${page}` : "";
        const limitQuery = limit ? `limit=${limit}` : "";

        const finalQuery = [searchQuery, filterQuery, sortQuery, pageQuery, limitQuery]
          .filter(Boolean)
          .join("&");

        return {
          url: `/user?${finalQuery}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: () => ({
        url: "/user/get-single-user",
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
        url: "/user/create-admin",
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: `/user/${userInfo?.id}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: `/user/change-password/${passwordInfo?.id}`,
        method: "PUT",
        body: {
          oldPassword: passwordInfo?.oldPassword,
          newPassword: passwordInfo?.newPassword,
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
  useCreateAdminMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = userApi;
