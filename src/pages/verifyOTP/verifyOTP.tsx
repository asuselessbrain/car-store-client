import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useResendOTPMutation, useVerifyOTPMutation } from "../../redux/fetchers/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/fetchers/auth/authSlice";
import { decodeToken } from "../../utils/jwtDecode";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const context = location?.state?.context;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: resetLoading }] = useResendOTPMutation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/, '');
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    const otpInfo = {
      email,
      otp: fullOtp,
      context
    }

    try {
      const response = await verifyOTP(otpInfo);

      if (context === 'login' && response?.data?.success && response?.data?.data?.token) {
        const user = decodeToken(response?.data?.data?.token);
        dispatch(setUser({ user, token: response?.data?.data?.token }));
        await navigate(from, { replace: true });
        toast.success("Login successful");
      }
      if (context === "signup" && response?.data?.success) {
        toast.success("OTP verified successfully!");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await resendOTP({ email });

      const error = res?.error as { data?: { errorMessage?: string } };

      if (res?.data?.success) {
        toast.success('OTP has been resent successfully.');
      } else {
        toast.error(error?.data?.errorMessage || 'Failed to resend OTP.');
      }

    } catch (err: any) {
      // err.response instead of err.res
      toast.error(err?.response?.data?.message || 'Something went wrong while resending OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code sent to your email:{" "}
            <span className="font-medium">{email}</span>
          </p>
        </header>

        <form onSubmit={handleOtpVerification}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-14 text-center text-xl font-bold text-slate-900 bg-slate-100 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}
          </div>

          <div className="w-full mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded hover:bg-indigo-700 transition duration-200"
            >
              Verify Account
            </button>
          </div>
        </form>

        <div className="text-sm text-slate-500 mt-4">
          Didn’t receive code?{" "}
          <button
            disabled={resetLoading}
            className="font-medium text-indigo-500 hover:text-indigo-600"
            onClick={handleResendOTP}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
