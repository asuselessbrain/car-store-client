import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => `/cars`,
      providesTags: ["Cars"],
    }),
    getSingleCar: builder.query({
      query: (id: string) => `/cars/${id}`,
      providesTags: ["Cars"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
        invalidatesTags: ["Cars"],
      })
    })
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = carApi;