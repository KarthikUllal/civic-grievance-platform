import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, sendOtp } from "../services/authService";

export default function VerifyOtp({ onClose, onBack, onLoginSuccess, email }) {
  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRef4 = useRef(null);

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      localStorage.setItem("citizenToken", data.token);
      localStorage.setItem("citizenEmail", data.user.email);

      toast.success("Login successful");

      onLoginSuccess();
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "OTP verification failed");
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: sendOtp,

    onSuccess: () => {
      otpRef1.current.value = "";
      otpRef2.current.value = "";
      otpRef3.current.value = "";
      otpRef4.current.value = "";

      otpRef1.current.focus();

      toast.success("OTP resent successfully");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleVerifyOtp = () => {
    const otp =
      otpRef1.current.value +
      otpRef2.current.value +
      otpRef3.current.value +
      otpRef4.current.value;

    if (otp.length !== 4) {
      toast.info("Please enter 4 digit OTP");
      return;
    }

    verifyOtpMutation.mutate({
      email,
      otp,
    });
  };

  const handleResendOtp = () => {
    resendOtpMutation.mutate(email);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700">
          Verify OTP
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-2">
          Enter the 4-digit code sent to
        </p>

        <p className="text-center text-blue-600 font-medium mb-8">{email}</p>

        <div className="flex justify-center gap-4">
          <input
            ref={otpRef1}
            type="text"
            maxLength={1}
            onChange={() => otpRef2.current.focus()}
            className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg"
          />

          <input
            ref={otpRef2}
            type="text"
            maxLength={1}
            onChange={() => otpRef3.current.focus()}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && otpRef2.current.value === "") {
                otpRef1.current.focus();
              }
            }}
            className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg"
          />

          <input
            ref={otpRef3}
            type="text"
            maxLength={1}
            onChange={() => otpRef4.current.focus()}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && otpRef3.current.value === "") {
                otpRef2.current.focus();
              }
            }}
            className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg"
          />

          <input
            ref={otpRef4}
            type="text"
            maxLength={1}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && otpRef4.current.value === "") {
                otpRef3.current.focus();
              }
            }}
            className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={verifyOtpMutation.isPending}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {verifyOtpMutation.isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        <p className="text-center text-gray-500 mt-4">
          Didn't receive OTP?
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendOtpMutation.isPending}
            className="text-blue-600 ml-1 hover:underline disabled:opacity-60"
          >
            {resendOtpMutation.isPending ? "Resending..." : "Resend"}
          </button>
        </p>

        <button
          type="button"
          onClick={onBack}
          className="block mx-auto mt-3 text-sm text-gray-500 hover:text-blue-600"
        >
          Change Email
        </button>
      </div>
    </div>
  );
}
