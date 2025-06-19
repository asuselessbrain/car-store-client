import { baseApi } from "../../api/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({ url: `/orders` }),
      providesTags: ["Orders"],
    }),
    getIndividualOrder: builder.query({
      query: () => ({ url: `/orders/my-orders/` }),
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/update-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/cancel-order/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (carInfo) => ({
        url: `/orders`,
        method: "POST",
        body: carInfo,
      }),
      invalidatesTags: ["Orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    createContact: builder.mutation({
      query: (contactInfo) => ({
        url: "/contact",
        method: "POST",
        body: contactInfo,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetIndividualOrderQuery,
  useCancelOrderMutation,
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useCreateContactMutation,
} = ordersApi;
