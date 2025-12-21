import api from './api';

// // Stats for Dashboard
// export const getDashboardStats = async () => {
//   const response = await api.get('/admin/stats');
//   return response.data;
// };

// // Recent Bookingsgett
// export const getRecentBookings = async () => {
//   const response = await api.get('/admin/recent-bookings');
//   return response.data;
// };



// Dashboard Stats (Cards + Charts)
export const getDashboardStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

// Recent Bookings (Table)
export const getRecentBookings = async () => {
  const response = await api.get('/admin/recent');
  return response.data;
};


// Get Report Data
export const getSalesData = async (month: number, year: number) => {
  const response = await api.get(`/admin/reports/sales?month=${month}&year=${year}`);
  return response.data;
};

export const getReceptionStats = async () => {
  const response = await api.get('/admin/reception-dashboard');
  return response.data;
};