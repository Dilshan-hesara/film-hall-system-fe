import React, { useEffect, useState } from 'react';
import { searchMoviesApi, type MovieData } from '../services/movie';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton';
import { Search, Filter, X } from 'lucide-react';

const GENRES = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Adventure", "Romance", "Thriller"];
const LANGUAGES = ["All", "English", "Sinhala", "Tamil", "Hindi", "Malayalam"];

const ExploreMovies: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Fetch Function
  const fetchFilteredMovies = async () => {
    setLoading(true);
    try {
      const data = await searchMoviesApi(searchText, selectedGenre, selectedLanguage);
      setMovies(data);
    } catch (error) {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Auto Search with Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
        fetchFilteredMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, selectedGenre, selectedLanguage]);

  // Reset Filters
  const clearFilters = () => {
    setSearchText('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & FILTERS */}
        <div className="mb-10">
            <h1 className="text-4xl font-bold text-yellow-500 mb-6 text-center md:text-left">Explore Movies</h1>
            
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* 1. Search Input */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
                    <input 
                        type="text" 
                        placeholder="Search by movie title..." 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-500"
                    />
                </div>

                {/* 2. Dropdowns */}
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto">
                    {/* Genre Dropdown */}
                    <div className="relative">
                        <select 
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="appearance-none bg-gray-900 border border-gray-600 text-white px-5 py-3 pr-10 rounded-xl focus:border-yellow-500 outline-none cursor-pointer min-w-[140px]"
                        >
                            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <Filter className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16}/>
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <select 
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="appearance-none bg-gray-900 border border-gray-600 text-white px-5 py-3 pr-10 rounded-xl focus:border-yellow-500 outline-none cursor-pointer min-w-[140px]"
                        >
                            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <Filter className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16}/>
                    </div>
                </div>

                {/* 3. Reset Button */}
                {(searchText || selectedGenre !== 'All' || selectedLanguage !== 'All') && (
                    <button 
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold px-4 py-2 rounded-lg hover:bg-red-900/20 transition"
                    >
                        <X size={18}/> Clear
                    </button>
                )}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            
            {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))
            ) : movies.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                    <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
                    <button onClick={clearFilters} className="text-blue-400 hover:underline mt-2">Clear filters</button>
                </div>
            ) : (
                movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))
            )}
            
        </div>

      </div>
    </div>
  );
};

export default ExploreMovies;