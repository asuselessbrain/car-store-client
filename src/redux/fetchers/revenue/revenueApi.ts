import { baseApi } from "../../api/baseApi";

export const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalRevenue: builder.query({
      query: () => ({ url: `/orders/total-revenue` }),
      providesTags: ["Revenue"],
    }),
    getMonthlyRevenue: builder.query({
      query: () => ({ url: `/orders/revenue` }),
      providesTags: ["Revenue"],
    }),
    getProductSellByBrand: builder.query({
      query: () => ({ url: `/orders/sell-count-by-brand` }),
      providesTags: ["Revenue"],
    }),
  }),
});

export const {
  useGetMonthlyRevenueQuery,
  useGetProductSellByBrandQuery,
  useGetTotalRevenueQuery,
} = revenueApi;
