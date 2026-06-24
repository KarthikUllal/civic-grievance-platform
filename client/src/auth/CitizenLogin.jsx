import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import VerifyOtp from "./VerifyOtp";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../services/authService";

export default function CitizenLogin({ onClose, onLoginSuccess }) {
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [email, setEmail] = useState("");

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP sent to your email");
      setShowVerifyOtp(true);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    },
  });

  const handleSendOtp = () => {
    if (!email.trim()) {
      toast.info("Please enter your email");
      return;
    }

    sendOtpMutation.mutate(email);
  };

  if (showVerifyOtp) {
    return (
      <VerifyOtp
        email={email}
        onClose={() => setShowVerifyOtp(false)}
        onBack={() => setShowVerifyOtp(false)}
        onLoginSuccess={onLoginSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500 text-xl"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Citizen Login
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive OTP
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={sendOtpMutation.isPending}
            onClick={handleSendOtp}
          >
            {sendOtpMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
