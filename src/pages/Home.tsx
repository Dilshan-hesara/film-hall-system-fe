import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movie';
import type { MovieData } from '../services/movie';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* 1. Hero Section (Banner) */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 py-16 px-6 text-center shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down">
          Welcome to <span className="text-blue-400">FilmHall</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">Book your tickets for the latest movies easily.</p>
        
        {/* Admin Link (Admin ) */}
        <Link to="/admin/add-movie" className="text-sm text-gray-500 hover:text-white underline">
          Admin: Add Movie
        </Link>
      </div>

      {/* 2. Movies Grid */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Now Showing</h2>

        {loading ? (
          // Loading State
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : movies.length === 0 ? (
          // Empty State
          <p className="text-center text-gray-500">No movies available at the moment.</p>
        ) : (
          // Movie Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;