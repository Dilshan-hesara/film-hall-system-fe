import api from './api';

interface LoginData {
  email: string;
  password: string;
}




export const loginUser = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user)); // User Data
    localStorage.setItem('accessToken', response.data.accessToken);   // Access Token
    localStorage.setItem('refreshToken', response.data.refreshToken); // Refresh Token
  }
  
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Verify OTP for Registration
export const verifyOtpApi = async (data: { email: string, otp: string }) => {
  const response = await api.post('/auth/verify-otp', data);
  return response.data;
};


// 1. Send OTP for Password Reset
export const forgotPasswordApi = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// 2. Reset Password with OTP
export const resetPasswordApi = async (data: { email: string, otp: string, newPassword: string }) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};