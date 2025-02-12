import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({ url: `/cars` }),
      providesTags: ["Cars"],
    }),
    getSingleCar: builder.query({
      query: (id: string) => ({ url: `/cars/${id}` }),
      providesTags: ["Cars"],
    }),
    createCar: builder.mutation({
      query: (carData) => ({
        url: "/cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["Cars"],
    }),
    updateCar: builder.mutation({
      query: (carData) => ({
        url: `/cars/${carData?.id}`,
        method: "PUT",
        body: carData?.carInfo,
      }),
      invalidatesTags: ["Cars"],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useDeleteCarMutation,
  useCreateCarMutation,
  useUpdateCarMutation,
} = carApi;
