import React from 'react';
import type { MovieData } from '../services/movie'; 
import { Link } from 'react-router-dom';
import '../index.css' 
interface MovieCardProps {
  movie: MovieData;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 group">
      
      {/* 1. Movie Poster Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {/* Overlay Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {movie.genre}
        </div>
      </div>

      {/* 2. Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
          <span className="flex items-center gap-1">
            ⏱️ {movie.duration} min
          </span>
          <span className="font-semibold text-blue-400">
            LKR {movie.ticketPrice}
          </span>
        </div>

        {/* 3. Book Now Button */}
        {/* <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors">
          Book Now
        </button> */}

<Link 
  to={`/movie/${movie._id}`} 
  className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors"
>
  View Details & Book
</Link>
      </div>
    </div>
  );
};

export default MovieCard;