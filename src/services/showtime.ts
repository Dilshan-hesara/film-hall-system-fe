import api from './api';

export interface ShowtimeData {
  _id: string;
  movie: string;
  hall: {
    _id: string;
    name: string; 
  };
  showDate: string;
  showTime: string;
  ticketPrice: number;
}




// export interface ShowtimeData {
//   _id: string;
//   movie: { title: string; duration: number }; // Populated Object
//   hall: { name: string }; // Populated Object
//   showDate: string;
//   showTime: string;
//   ticketPrice: number;
// }

// export interface ShowtimeInput {
//   movieId: string;
//   hallId: string;
//   showDate: string;
//   showTime: string;
//   ticketPrice: number;
// }



export const addShowtime = async (data: ShowtimeData) => {
  const response = await api.post('/showtimes/add', data);
  return response.data;
};

export const getShowtimes = async (movieId: string) => {
  const response = await api.get(`/showtimes/movie/${movieId}`);
  return response.data;
};


export const getScheduleByDate = async (date: string) => {
  const response = await api.get(`/showtimes/schedule?date=${date}`);
  return response.data;
};

export const deleteShowtime = async (id: string) => {
  const response = await api.delete(`/showtimes/${id}`);
  return response.data;
};


export const getShowtimesApi = async (date: string, movieId?: string) => {
  let url = `/showtimes/filter?date=${date}`;
  if (movieId) url += `&movieId=${movieId}`;
  
  const response = await api.get(url);
  return response.data; 
};