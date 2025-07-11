import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "/review/get-review",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getSingleCarReview: builder.query({
      query: (id) => ({
        url: `/review/single-car/${id}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getSingleUserReviews: builder.query({
      query: () => ({
        url: "/review/user-review",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    createReviews: builder.mutation({
      query: (payload) => ({
        url: "/review/create-review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation({
      query: (reviewData) => {
        return {
          url: `/review/${reviewData?.reviewInfo?.reviewId}`,
          method: "PUT",
          body: reviewData?.reviewInfo,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useCreateReviewsMutation, useGetSingleUserReviewsQuery, useGetSingleCarReviewQuery, useDeleteReviewMutation, useUpdateReviewMutation } = reviewApi;
