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


// Get All Users
export const getAllUsers = async () => {
  const response = await api.get('/users/all');
  return response.data;
};

// Update Role (Make Admin)
export const updateUserRole = async (id: string, role: 'user' | 'admin') => {
  const response = await api.put(`/users/role/${id}`, { role });
  return response.data;
};

// Delete User
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};


// Create New Admin
export const createAdmin = async (data: any) => {
  const response = await api.post('/users/admin/create', data);
  return response.data;
};

// Get All Admins
export const getAllAdmins = async () => {
  const response = await api.get('/users/admin/all');
  return response.data;
};

// Admin Force Reset Password
export const adminResetPassword = async (id: string, newPassword: string) => {
  const response = await api.put(`/users/admin/reset-password/${id}`, { newPassword });
  return response.data;
};


// Toggle Wishlist
export const toggleWishlist = async (userId: string, movieId: string) => {
  const response = await api.put('/users/wishlist/toggle', { userId, movieId });
  return response.data;
};

// Get Wishlist
export const getUserWishlist = async (userId: string) => {
  const response = await api.get(`/users/wishlist/${userId}`);
  return response.data;
};