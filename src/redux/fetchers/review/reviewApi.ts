import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "/review/get-review",
        method: "GET",
      }),
    }),
    createReviews: builder.mutation({
      query: (payload) => ({
        url: "/review/create-review",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllReviewsQuery, useCreateReviewsMutation } = reviewApi;
