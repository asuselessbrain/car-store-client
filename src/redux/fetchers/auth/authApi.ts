import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo
      })
    }),
    verifyOTP: builder.mutation({
      query: (verifyOtp) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: verifyOtp
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyOTPMutation } = authApi;
