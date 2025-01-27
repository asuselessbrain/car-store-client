import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allCarsApi = createApi({
  reducerPath: "allCarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => `/cars`,
    }),
    getSingleCar: builder.query({
      query: ((id: string) => `/cars/${id}`)
    })
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = allCarsApi;
