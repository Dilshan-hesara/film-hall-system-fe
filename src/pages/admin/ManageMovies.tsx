import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie, updateMovie, addMovie, type MovieData } from '../../services/movie'; // addMovie import කරන්න
import { Edit, Trash2, Search, Plus, X, RefreshCw } from 'lucide-react';

const ManageMovies: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false); // 👇 Add Modal State
  
  const [editingMovie, setEditingMovie] = useState<MovieData | null>(null);
  
  // New Movie Form State
  const initialMovieState = {
    title: '', description: '', genre: '', duration: 0, releaseDate: '',
    posterUrl: '', coverUrl: '', trailerUrl: '', ticketPrice: 0,
    status: 'Now Showing' as const, censorRating: 'U' as const
  };
  const [newMovie, setNewMovie] = useState<MovieData>(initialMovieState);

  // Helper: Status Determination
  const determineStatus = (dateString: string | Date): 'Now Showing' | 'Coming Soon' => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const releaseDate = new Date(dateString); releaseDate.setHours(0, 0, 0, 0);
    return releaseDate > today ? 'Coming Soon' : 'Now Showing';
  };

  // 1. Fetch Movies
  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      const updatedData = data.map((movie: MovieData) => ({
        ...movie,
        autoStatus: determineStatus(movie.releaseDate) 
      }));
      setMovies(updatedData);
      setFilteredMovies(updatedData);
    } catch (error) {
      console.error("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  // 2. Search
  useEffect(() => {
    const results = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  // 3. Delete Handler
  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this movie?")) {
      try {
        await deleteMovie(id);
        alert("Movie deleted!");
        fetchMovies(); 
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  // 4. Status Toggle
  const handleStatusToggle = async (movie: MovieData) => {
    try {
      const newStatus = movie.status === 'Now Showing' ? 'Coming Soon' : 'Now Showing';
      await updateMovie(movie._id!, { status: newStatus });
      fetchMovies(); 
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  // 5. Edit Handler
  const openEditModal = (movie: MovieData) => {
    setEditingMovie(movie);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    try {
      const finalStatus = determineStatus(editingMovie.releaseDate);
      await updateMovie(editingMovie._id!, { ...editingMovie, status: finalStatus });
      alert("Movie updated!");
      setIsEditOpen(false);
      fetchMovies();
    } catch (error) {
      alert("Failed to update.");
    }
  };

  // 6. Add Movie Handler
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalStatus = determineStatus(newMovie.releaseDate);
      await addMovie({ ...newMovie, status: finalStatus });
      alert("Movie added successfully!");
      setIsAddOpen(false);
      setNewMovie(initialMovieState); // Reset form
      fetchMovies();
    } catch (error) {
      alert("Failed to add movie.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Movies...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">🎬 Manage Movies</h1>
          {/* 👇 Open Add Modal on Click */}
          <button 
            onClick={() => setIsAddOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add New Movie
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" placeholder="Search movies..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Movies Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase font-bold">
              <tr>
                <th className="p-4">Poster</th>
                <th className="p-4">Title</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Release Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-700">
              {filteredMovies.map((movie) => {
                const displayStatus = determineStatus(movie.releaseDate);
                return (
                  <tr key={movie._id} className="hover:bg-gray-700/30 transition">
                    <td className="p-4"><img src={movie.posterUrl} alt={movie.title} className="w-12 h-16 object-cover rounded shadow-md" /></td>
                    <td className="p-4 font-bold text-white">{movie.title}</td>
                    <td className="p-4 text-gray-300">{movie.genre}</td>
                    <td className="p-4 text-gray-400">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button onClick={() => handleStatusToggle(movie)} className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 transition ${displayStatus === 'Now Showing' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
                        <RefreshCw size={10} /> {displayStatus}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => openEditModal(movie)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(movie._id!)} className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= ADD MOVIE MODAL ================= */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Plus size={24} className="text-green-500"/> Add New Movie</h2>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                {/* Same Form Structure as Edit Modal */}
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Title</label><input type="text" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Genre</label><input type="text" value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                </div>
                <div><label className="block text-gray-400 text-sm mb-1">Description</label><textarea value={newMovie.description} onChange={e => setNewMovie({...newMovie, description: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500 h-24" required/></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Price (LKR)</label><input type="number" value={newMovie.ticketPrice} onChange={e => setNewMovie({...newMovie, ticketPrice: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Duration (Min)</label><input type="number" value={newMovie.duration} onChange={e => setNewMovie({...newMovie, duration: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Release Date</label>
                        <input type="date" value={newMovie.releaseDate} onChange={e => setNewMovie({...newMovie, releaseDate: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Rating</label>
                        <select value={newMovie.censorRating} onChange={e => setNewMovie({...newMovie, censorRating: e.target.value as any})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500">
                            <option value="U">U</option><option value="UA">UA</option><option value="A">A</option><option value="S">S</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Poster URL</label><input type="text" value={newMovie.posterUrl} onChange={e => setNewMovie({...newMovie, posterUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Cover URL</label><input type="text" value={newMovie.coverUrl} onChange={e => setNewMovie({...newMovie, coverUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>
                </div>
                <div><label className="block text-gray-400 text-sm mb-1">Trailer URL</label><input type="text" value={newMovie.trailerUrl} onChange={e => setNewMovie({...newMovie, trailerUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-green-500" required/></div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold">Add Movie</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL (EXISTING) ================= */}
        {isEditOpen && editingMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Edit size={24} className="text-blue-500"/> Edit Movie</h2>
                <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                 {/* ... (Same Fields as Add Modal but with editingMovie State) ... */}
                 {/* Title */}
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Title</label><input type="text" value={editingMovie.title} onChange={e => setEditingMovie({...editingMovie, title: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Genre</label><input type="text" value={editingMovie.genre} onChange={e => setEditingMovie({...editingMovie, genre: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                 </div>
                 {/* Description */}
                 <div><label className="block text-gray-400 text-sm mb-1">Description</label><textarea value={editingMovie.description} onChange={e => setEditingMovie({...editingMovie, description: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500 h-24"/></div>
                 {/* Price & Duration */}
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Price</label><input type="number" value={editingMovie.ticketPrice} onChange={e => setEditingMovie({...editingMovie, ticketPrice: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Duration</label><input type="number" value={editingMovie.duration} onChange={e => setEditingMovie({...editingMovie, duration: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                 </div>
                 {/* Release Date & Status */}
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Release Date</label><input type="date" value={new Date(editingMovie.releaseDate).toISOString().split('T')[0]} onChange={e => {const d = e.target.value; setEditingMovie({...editingMovie, releaseDate: d, status: determineStatus(d)})}} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Status (Auto)</label><select value={editingMovie.status} onChange={e => setEditingMovie({...editingMovie, status: e.target.value as any})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"><option value="Now Showing">Now Showing</option><option value="Coming Soon">Coming Soon</option></select></div>
                 </div>
                 {/* URLs */}
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-gray-400 text-sm mb-1">Poster URL</label><input type="text" value={editingMovie.posterUrl} onChange={e => setEditingMovie({...editingMovie, posterUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    <div><label className="block text-gray-400 text-sm mb-1">Cover URL</label><input type="text" value={editingMovie.coverUrl || ''} onChange={e => setEditingMovie({...editingMovie, coverUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                 </div>
                 <div><label className="block text-gray-400 text-sm mb-1">Trailer URL</label><input type="text" value={editingMovie.trailerUrl || ''} onChange={e => setEditingMovie({...editingMovie, trailerUrl: e.target.value})} className="w-full bg-gray-700 p-2 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>

                 <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold">Save Changes</button>
                 </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageMovies;