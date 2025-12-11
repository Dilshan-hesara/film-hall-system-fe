import api from './api';

// export const getOccupiedSeats = async (movieId: string, date: string, time: string) => {
//   // Query params 
//   const response = await api.get(`/bookings/occupied?movieId=${movieId}&date=${date}&time=${time}`);
//   return response.data; // "A1", "A2"
// };

// export const createBooking = async (bookingData: any) => {
//   const response = await api.post('/bookings/create', bookingData);
//   return response.data;
// };

export const getOccupiedSeats = async (movieId: string, date: string, time: string, hallId: string) => {
  // Query hallId 
  const response = await api.get(`/bookings/occupied?movieId=${movieId}&date=${date}&time=${time}&hallId=${hallId}`);
  return response.data;
};

export const createBooking = async (bookingData: any) => {
  const response = await api.post('/bookings/create', bookingData);
  return response.data;
};

export const getUserBookings = async (userId: string) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

// Get All Bookings (Admin)
export const getAllBookings = async () => {
  const response = await api.get('/bookings/all');
  return response.data;
};

// Cancel Booking (Admin)
export const cancelBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

// Verify Ticket (Scan QR)
export const verifyTicketApi = async (bookingId: string) => {
  // අපි යවන්නේ JSON Object එකක් { bookingId: "..." }
  const response = await api.post('/bookings/scan', { bookingId });
  return response.data;
};


// Counter Booking API Call
export const createCounterBookingApi = async (data: any) => {
  const response = await api.post('/bookings/counter-book', data);
  return response.data;
};