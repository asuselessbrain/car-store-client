import { baseApi } from "../../api/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/update-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
