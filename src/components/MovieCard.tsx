import React, { useState, useEffect } from 'react';
import type { MovieData } from '../services/movie'; 
import { Link } from 'react-router-dom';
import '../index.css';
import { toggleWishlist, getUserWishlist } from '../services/user';
import { Heart } from 'lucide-react';

interface MovieCardProps {
  movie: MovieData;
}

const getRatingColor = (rating: string) => {
  if (rating === 'A') return 'bg-red-600';
  if (rating === 'UA') return 'bg-yellow-600 text-black';
  return 'bg-green-600';
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  //  State to track if this movie is in the wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  //  Check wishlist status on component mount
  useEffect(() => {
    if (user._id) {
      getUserWishlist(user._id).then((data: any[]) => {
        // Check if current movie ID exists in the fetched wishlist
        const exists = data.some((m: any) => m._id === movie._id);
        setIsWishlisted(exists);
      });
    }
  }, [movie._id, user._id]);

  //  Handle Heart Click
  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigating to details page
    if (!user._id) {
      alert("Please login to add to watchlist!");
      return;
    }

    try {
      const res = await toggleWishlist(user._id, movie._id!);
      setIsWishlisted(res.added); // Update state based on API response
    } catch (error) {
      console.error("Error updating watchlist", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 group relative">
      
      {/* 1. Movie Poster Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        
        {/* Rating Badge */}
        <div className={`absolute top-2 left-2 ${getRatingColor(movie.censorRating)} text-white text-xs font-bold px-2 py-1 rounded shadow-md`}>
          {movie.censorRating}
        </div>
        
        {/* Genre Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {movie.genre}
        </div>

        {/*  HEART BUTTON (Wishlist Toggle) */}
        <button 
            onClick={handleToggleWishlist}
            className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 hover:bg-white transition z-10 shadow-lg group-hover:scale-110"
            title={isWishlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        >
            <Heart 
                size={22} 
                className={`transition-colors duration-300 ${isWishlisted ? "text-red-500 fill-red-500" : "text-white hover:text-red-500"}`} 
            />
        </button>

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