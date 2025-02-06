import { baseApi } from "../../api/baseApi";

export const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalRevenue: builder.query({
        query: () => `/orders/total-revenue`,
        providesTags: ["Revenue"],
      }),
    getMonthlyRevenue: builder.query({
      query: () => `/orders/revenue`,
      providesTags: ["Revenue"],
    }),
    getProductSellByBrand: builder.query({
        query: () => `/orders/sell-count-by-brand`,
        providesTags: ["Revenue"],
      }),
  }),
});

export const { useGetMonthlyRevenueQuery, useGetProductSellByBrandQuery, useGetTotalRevenueQuery } = revenueApi;
