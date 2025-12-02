import api from './api';

export interface MovieData {
  title: string;
  description: string;
  genre: string;
  duration: number;
  releaseDate: string;
  posterUrl: string;
  ticketPrice: number;
}

export const addMovie = async (movieData: MovieData) => {
  const response = await api.post('/movies/add', movieData);
  return response.data;
};