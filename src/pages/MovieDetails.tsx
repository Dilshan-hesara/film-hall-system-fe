import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movie';
import { getShowtimes } from '../services/showtime';
import type { MovieData } from '../services/movie';
import type { ShowtimeData } from '../services/showtime';

const MovieDetails: React.FC = () => {
  const { id } = useParams(); // URL එකෙන් Movie ID එක ගන්නවා
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [showtimes, setShowtimes] = useState<ShowtimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);

        const showsData = await getShowtimes(id);
        setShowtimes(showsData);
      } catch (error) {
        console.error("Error fetching details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Showtime එකක් Click කළාම Booking Page එකට යවන්න
  const handleBooking = (showtime: ShowtimeData) => {
    // Booking Page එකට විස්තර යවන්න URL Query Params පාවිච්චි කරමු
    navigate(`/book/${id}?date=${showtime.showDate}&time=${showtime.showTime}&hallId=${showtime.hall._id}`);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Details...</div>;
  if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* 1. Hero Section (Backdrop) */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full container mx-auto flex gap-8 items-end">
          {/* Poster Image */}
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-48 rounded-lg shadow-2xl border-4 border-gray-800 hidden md:block"
          />
          
          {/* Movie Info */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            <div className="flex gap-4 text-sm text-gray-300 mb-4">
              <span className="bg-blue-600 px-2 py-1 rounded text-white font-bold">{movie.genre}</span>
              <span>⏱️ {movie.duration} min</span>
              <span>📅 Release: {new Date(movie.releaseDate).toDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Details & Showtimes Section */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: Description */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            {movie.description}
          </p>

          {/* Showtimes List */}
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-4">Select a Showtime</h2>
          
          {showtimes.length === 0 ? (
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              No showtimes scheduled yet.
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Showtimes Grouping logic can be added here, currently showing list */}
              {showtimes.map((show) => (
                <div 
                  key={show._id} 
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
                  onClick={() => handleBooking(show)}
                >
                  <div>
                    <p className="text-lg font-bold text-white">{show.showDate}</p>
                    <p className="text-sm text-gray-400">{show.hall.name}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-400">{show.showTime}</p>
                    <p className="text-xs text-gray-500">LKR {show.ticketPrice}</p>
                  </div>

                  <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold">
                    Book Seat
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Cast or Extra Info (Optional) */}
        <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Ticket Price</h3>
            <p className="text-3xl font-mono text-yellow-400 mb-2">LKR {movie.ticketPrice}</p>
            <p className="text-gray-400 text-sm">Base price per person</p>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;