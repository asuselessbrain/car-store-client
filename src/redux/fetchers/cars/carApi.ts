import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (searchTerm) => {
        const { filter = {}, searchItem, sort, page, limit } = searchTerm || {};

        // Handle dynamic multi-field filters (brand, color, transmission, etc.)
        const filterQuery = Object.entries(filter)
          .flatMap(([key, values]) =>
            (values as string[]).map((val) => `${key}=${encodeURIComponent(val)}`)
          )
          .join("&");

        const searchQuery = searchItem ? `searchTerm=${encodeURIComponent(searchItem)}` : "";
        const sortQuery = sort ? `sortBy=price&sortOrder=${sort}` : "";
        const pageQuery = `page=${page}`;
        const limitQuery = `limit=${limit}`;

        const finalQuery = [searchQuery, filterQuery, sortQuery, pageQuery, limitQuery]
          .filter(Boolean)
          .join("&");

        return {
          url: `/cars?${finalQuery}`,
        };
      },
      providesTags: ["Cars"],
    }),

    getPopularCar: builder.query({
      query: () => ({ 
        url: '/cars/orders/popular-car', 
        method: "GET" 
      }),
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
