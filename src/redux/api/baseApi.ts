import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allCarsApi = createApi({
  reducerPath: "allCarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => `/cars`,
    }),
  }),
});

export const { useGetAllCarsQuery } = allCarsApi;
