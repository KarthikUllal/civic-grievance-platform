import api from "../axios/api";

export const sendOtp = async (email) => {
  const response = await api.post("/auth/send-otp", {
    email,
  });

  return response.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};