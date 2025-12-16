import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../../services/movie';
import { getAllHalls } from '../../services/hall'; 
import { addShowtime } from '../../services/showtime';
import type { MovieData } from '../../services/movie';
import type { HallData } from '../../services/hall';

const AddShowtime: React.FC = () => {
  const navigate = useNavigate();
  
  // Data Lists
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [halls, setHalls] = useState<HallData[]>([]); // Hall List 

  // Form States
  const [movieId, setMovieId] = useState('');
  const [hallId, setHallId] = useState('');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
        
        const hallsData = await getAllHalls(); 
        setHalls(hallsData);

      } catch (err) {
        console.error('Failed to fetch data', err);
        setError('Failed to load Movies or Halls. Please refresh.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addShowtime({
        movieId,
        hallId,
        showDate,
        showTime,

        ticketPrice: Number(ticketPrice),
      });
      alert('Showtime Added Successfully!');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add showtime');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Schedule Showtime</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Select Movie */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Select Movie</label>
            <select
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
              required
            >
              <option value="">-- Choose a Movie --</option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>{m.title}</option>
              ))}
            </select>
          </div>

          {/* Select Hall */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Select Hall</label>
            <select
              value={hallId}
              onChange={(e) => setHallId(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
              required
            >
              <option value="">-- Choose a Hall --</option>
              {halls.length > 0 ? (
                halls.map((h) => (
                  <option key={h._id} value={h._id}>{h.name}</option>
                ))
              ) : (
                <option disabled>No halls available</option>
              )}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
              <input
                type="time"
                value={showTime}
                onChange={(e) => setShowTime(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Ticket Price */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Price (LKR)</label>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
              placeholder="e.g. 1500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 shadow-lg mt-4
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'}
            `}
          >
            {loading ? 'Scheduling...' : 'Add Showtime'}
          </button>

        </form>
      </div>
    </div>
  );
};


export default AddShowtime;