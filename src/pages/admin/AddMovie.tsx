import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../services/movie'; 
import type { MovieData } from '../../services/movie'; // import MovieData type from the service that exports it


const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<MovieData>({
    title: '',
    description: '',
    genre: '',
    duration: 0,
    releaseDate: '',
    posterUrl: '',
    ticketPrice: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addMovie(movie);
      alert('Movie Added Successfully!');
      navigate('/');
    } catch (err: any) {
      setError('Failed to add movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Add New Movie</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Movie Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Movie Title</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter movie name"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Short summary of the movie"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Genre</label>
            <select
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Duration (Minutes)</label>
            <input
              type="number"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 120"
              required
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Ticket Price */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Ticket Price (LKR)</label>
            <input
              type="number"
              name="ticketPrice"
              value={movie.ticketPrice}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1500"
              required
            />
          </div>

          {/* Poster URL */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Poster Image URL</label>
            <input
              type="url"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com/poster.jpg"
              required
            />
            <p className="text-xs text-gray-500 mt-1">* Paste an image link from Google or IMDB here</p>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 shadow-lg
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-[1.01]'
                }
              `}
            >
              {loading ? 'Adding Movie...' : 'Add Movie'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMovie;