import api from './api';

export interface MovieData {
  _id?: string; 
  title: string;
  description: string;
  genre: string;
  duration: number;
  releaseDate: string;
  posterUrl: string;
  coverUrl?: string;
  ticketPrice: number;
  status?: 'Now Showing' | 'Coming Soon';
  censorRating: 'U' | 'UA' | 'A' | 'S'; 
  trailerUrl: string;
}

export const addMovie = async (movieData: MovieData) => {
  const response = await api.post('/movies/add', movieData);
  return response.data;
};

export const getMovies = async () => {
  const response = await api.get('/movies/all');
  return response.data;
};

export const getMovieById = async (id: string) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};  