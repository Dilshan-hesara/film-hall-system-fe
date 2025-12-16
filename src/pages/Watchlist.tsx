import React, { useEffect, useState } from 'react';
import { getUserWishlist, toggleWishlist } from '../services/user';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Film, ArrowLeft } from 'lucide-react';

const Watchlist: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchWishlist = async () => {
    if (!user._id) return navigate('/login');
    try {
      const data = await getUserWishlist(user._id);
      setMovies(data);
    } catch (error) {
      console.error("Error loading watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (movieId: string) => {
    try {
      await toggleWishlist(user._id, movieId);
      setMovies(movies.filter(m => m._id !== movieId));
    } catch (error) {
      alert("Failed to remove movie");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Watchlist...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><ArrowLeft /></button>
            <h1 className="text-3xl font-bold text-red-500 flex items-center gap-2">
                <Heart fill="currentColor" /> My Watchlist
            </h1>
        </div>

        {movies.length === 0 ? (
            <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                <Film size={48} className="mx-auto text-gray-600 mb-4"/>
                <p className="text-gray-400 text-lg">Your watchlist is empty.</p>
                <Link to="/" className="text-blue-400 hover:underline mt-2 inline-block">Browse Movies</Link>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <div key={movie._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group relative">
                        <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
                        
                        {/* Remove Button (Top Right) */}
                        <button 
                            onClick={(e) => { e.preventDefault(); handleRemove(movie._id); }}
                            className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-red-500 hover:bg-white hover:scale-110 transition"
                            title="Remove from watchlist"
                        >
                            <Heart size={18} fill="currentColor" />
                        </button>

                        <div className="p-4">
                            <h3 className="font-bold text-white truncate">{movie.title}</h3>
                            <p className="text-gray-400 text-xs mb-3">{movie.genre}</p>
                            <Link to={`/movie/${movie._id}`} className="block w-full py-2 bg-blue-600 hover:bg-blue-500 text-center rounded text-sm font-bold text-white transition">
                                Buy Ticket
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default Watchlist;