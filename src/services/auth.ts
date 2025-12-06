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

// Verify OTP (OTP යවනවා, Token ගන්නවා)
export const verifyOtpApi = async (data: { email: string, otp: string }) => {
  const response = await api.post('/auth/verify-otp', data); // Backend Route එක හදාගන්න
  return response.data;
};