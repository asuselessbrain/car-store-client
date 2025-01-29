import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => `/cars`,
    }),
    getSingleCar: builder.query({
      query: (id: string) => `/cars/${id}`,
    }),
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = carApi;