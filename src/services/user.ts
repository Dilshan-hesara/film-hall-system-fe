import api from './api';

// Profile Update
// export const updateUserProfile = async (data: { userId: string, username: string, profileImage: string }) => {
//   const response = await api.put('/users/profile', data);
//   return response.data;
// };

// // Password Change
// export const changeUserPassword = async (data: any) => {
//   const response = await api.put('/users/password', data);
//   return response.data;
// };



// 1. Profile Update (Name & Image)
export const updateUserProfile = async (data: { userId: string, username: string, profileImage: string }) => {
  const response = await api.put('/users/profile', data);
  return response.data;
};

// 2. Change Password (Logged In User)
export const changeUserPassword = async (data: any) => {
  const response = await api.put('/users/password', data);
  return response.data;
};