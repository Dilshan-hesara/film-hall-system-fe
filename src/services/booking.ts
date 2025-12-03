import api from './api';

export const getOccupiedSeats = async (movieId: string, date: string, time: string) => {
  // Query params 
  const response = await api.get(`/bookings/occupied?movieId=${movieId}&date=${date}&time=${time}`);
  return response.data; // "A1", "A2"
};

export const createBooking = async (bookingData: any) => {
  const response = await api.post('/bookings/create', bookingData);
  return response.data;
};