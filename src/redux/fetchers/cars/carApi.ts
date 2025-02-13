import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (searchTerm) => {
        const brandQuery = searchTerm?.filter?.length
          ? searchTerm.filter
              .map((brand: string) => `brand=${encodeURIComponent(brand)}`)
              .join("&")
          : "";
        const searchQuery = searchTerm?.searchItem ? `searchTerm=${searchTerm?.searchItem}` : "";
        const sortQuery = searchTerm?.sort? `sortBy=price&sortOrder=${searchTerm?.sort}` : "";
        const pageQuery = `page=${searchTerm?.page}`;
        const limitQuery = `limit=${searchTerm?.limit}`;
        return {
          url: `/cars?${searchQuery}&${brandQuery}&${sortQuery}&${pageQuery}&${limitQuery}`,
        };
      },
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
