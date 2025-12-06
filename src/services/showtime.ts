import api from './api';

export interface ShowtimeData {
  _id: string;
  movie: string;
  hall: {
    _id: string;
    name: string; // Hall Name එක ඕන වෙනවා UI එකට
  };
  showDate: string;
  showTime: string;
  ticketPrice: number;
}


///
export const addShowtime = async (data: ShowtimeData) => {
  const response = await api.post('/showtimes/add', data);
  return response.data;
};

// Movie එකකට අදාළ Showtimes ගන්න (Booking Page එකට පස්සේ ඕන වෙයි)
export const getShowtimes = async (movieId: string) => {
  const response = await api.get(`/showtimes/movie/${movieId}`);
  return response.data;
};


export const getScheduleByDate = async (date: string) => {
  const response = await api.get(`/showtimes/schedule?date=${date}`);
  return response.data;
};

// Show එකක් මකන්න
export const deleteShowtime = async (id: string) => {
  const response = await api.delete(`/showtimes/${id}`);
  return response.data;
};


