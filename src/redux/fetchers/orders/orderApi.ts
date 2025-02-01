import { baseApi } from "../../api/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery } = ordersApi;
