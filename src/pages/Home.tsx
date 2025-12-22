import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movie';
import { toggleWishlist, getUserWishlist } from '../services/user'; 
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { Play, Calendar, Clock, Ticket, X, Info, Heart } from 'lucide-react'; 
import type { MovieData } from '../services/movie';


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingTrailerUrl, setPlayingTrailerUrl] = useState<string | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Helper Functions
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
        const videoId = url.split('v=')[1] || url.split('/').pop();
        const cleanId = videoId?.split('&')[0];
        return `https://www.youtube.com/embed/${cleanId}?autoplay=1`;
    } catch (e) {
        return url;
    }
  };

  const getAgeColor = (rated: string) => {
     if(rated === 'R' || rated === '18+') return 'bg-red-600';
     if(rated === 'PG-13') return 'bg-yellow-600';
     return 'bg-green-600';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovies();
        setMovies(movieData.reverse());

        if (user._id) {
            const wishlistData = await getUserWishlist(user._id);
            setWishlistIds(wishlistData.map((m: any) => m._id));
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleWishlist = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault(); 
    
    if (!user._id) {
        alert("Please login to add to watchlist!");
        return;
    }

    try {
        const res = await toggleWishlist(user._id, movieId);
        if (res.added) {
            setWishlistIds([...wishlistIds, movieId]); // Add to local state
        } else {
            setWishlistIds(wishlistIds.filter(id => id !== movieId)); // Remove from local state
        }
    } catch (error) {
        console.error("Error updating watchlist");
    }
  };

  // ===================== FILTER LOGIC =====================
  const today = new Date();

  const comingSoon = movies.filter(m => {
      const releaseDate = new Date(m.releaseDate);
      return m.status === 'Coming Soon' || releaseDate > today;
  });

  const allNowShowing = movies.filter(m => {
      const releaseDate = new Date(m.releaseDate);
      const isComingSoon = m.status === 'Coming Soon' || releaseDate > today;
      return !isComingSoon;
  });

  const heroMovies = allNowShowing.slice(0, 3);
  // ========================================================

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
    </div>

  //   Array.from({ length: 10 }).map((_, index) => (
  //                   <MovieCardSkeleton key={index} />
  //               ))
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      <section className="relative h-[500px] md:h-[650px]">
        <Swiper
          spaceBetween={0}
          effect={'fade'}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, EffectFade, Pagination]}
          className="h-full w-full"
        >
          {heroMovies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <div className="relative h-full w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${movie.coverUrl || movie.posterUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start z-10 container mx-auto">
                  <div className="flex gap-3 mb-4 animate-fade-in">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                        Now Showing
                    </span>
                    <span className={`${getAgeColor(movie.censorRating || 'G')} text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1`}>
                        <Info size={14}/> {movie.censorRating || 'G'}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl max-w-3xl">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base mb-8">
                    <span className="flex items-center gap-2"><Clock size={18} className="text-yellow-500"/> {movie.duration} min</span>
                    <span className="flex items-center gap-2"><Ticket size={18} className="text-yellow-500"/> {movie.genre}</span>
                  </div>

                  <div className="flex gap-4">
                    <Link 
                      to={`/movie/${movie._id}`} 
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                    >
                      <Ticket size={20} /> Book Tickets
                    </Link>
                    <button 
                      onClick={() => setPlayingTrailerUrl(movie.trailerUrl)}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold transition-all border border-white/20"
                    >
                      <Play size={20} /> Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 border-l-4 border-yellow-500 pl-4">Now Showing</h2>
                <p className="text-gray-400">Book your tickets for the latest blockbusters</p>
            </div>
            <Link to="/movies" className="text-yellow-500 hover:text-white transition">View All</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allNowShowing.map((movie) => (
                <Link to={`/movie/${movie._id}`} key={movie._id} className="group relative">
                    <div className="relative overflow-hidden rounded-xl aspect-[2/3] border border-gray-800">
                        
                        {/* Rating Badge (Top Right) */}
                        <div className="absolute top-2 right-2 z-10">
                            <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">
                                {movie.censorRating || 'G'}
                            </span>
                        </div>

                        <button 
                            onClick={(e) => handleToggleWishlist(e, movie._id!)}
                            className="absolute top-2 left-2 z-20 p-2 rounded-full bg-black/40 hover:bg-white backdrop-blur-sm transition-all duration-300 group/heart"
                        >
                            <Heart 
                                size={18} 
                                className={`${wishlistIds.includes(movie._id!) ? "fill-red-500 text-red-500" : "text-white group-hover/heart:text-red-500"}`} 
                            />
                        </button>

                        <img 
                            src={movie.posterUrl} 
                            alt={movie.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-3">Book Now</span>
                            <p className="text-gray-300 text-xs">{movie.genre}</p>
                            <p className="text-gray-300 text-xs mt-1">{movie.duration} min</p>
                        </div>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white group-hover:text-yellow-500 transition-colors truncate">{movie.title}</h3>
                    <p className="text-gray-500 text-sm">LKR {movie.ticketPrice}</p>
                </Link>
            ))}
        </div>
      </section>

      <section className="bg-gray-900/50 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-blue-500 pl-4">Coming Soon</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
                className="w-full"
            >
                {comingSoon.length > 0 ? (
                    comingSoon.map((movie) => (
                        <SwiperSlide key={movie._id}>
                            <div className="group cursor-pointer relative">
                                <div className="relative overflow-hidden rounded-xl aspect-[2/3] grayscale group-hover:grayscale-0 transition-all duration-500 border border-gray-700 group-hover:border-blue-500">
                                    
                                    <button 
                                        onClick={(e) => handleToggleWishlist(e, movie._id!)}
                                        className="absolute top-2 left-2 z-20 p-2 rounded-full bg-black/40 hover:bg-white backdrop-blur-sm transition-all duration-300 group/heart"
                                    >
                                        <Heart 
                                            size={18} 
                                            className={`${wishlistIds.includes(movie._id!) ? "fill-red-500 text-red-500" : "text-white group-hover/heart:text-red-500"}`} 
                                        />
                                    </button>

                                    <img 
                                        src={movie.posterUrl} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                                        <p className="text-white font-bold text-center text-xs md:text-sm flex items-center justify-center gap-2 bg-blue-600/80 py-1 rounded backdrop-blur-sm">
                                            <Calendar size={14}/>
                                            {new Date(movie.releaseDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-lg font-bold text-center text-gray-300 group-hover:text-white transition-colors">{movie.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-gray-500 col-span-full py-10 text-center w-full">No upcoming movies listed at this time.</div>
                )}
            </Swiper>
        </div>
      </section>

      <section className="relative py-20 bg-black overflow-hidden">
        
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-70 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          <div className="flex items-end justify-between mb-12">
            <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 uppercase tracking-wider">
                    Latest Trailers
                </h2>
                <div className="h-1 w-24 bg-yellow-500 mt-2 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
            </div>
            
            <div className="hidden md:flex gap-2 text-gray-500 text-sm font-mono">
                <span>DRAG</span><span>•</span><span>SWIPE</span>
            </div>
          </div>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={1.2}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3.5, spaceBetween: 40 },
            }}
            className="w-full py-10 !overflow-visible"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie._id}>
                <div 
                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/5 hover:border-yellow-500/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transform hover:-translate-y-2"
                    onClick={() => setSelectedTrailer(movie.trailerUrl)}
                >
                  <img src={movie.coverUrl || movie.posterUrl} alt={`${movie.title} trailer`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Official Trailer</span>
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{movie.duration} Min</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors drop-shadow-lg truncate">{movie.title}</h3>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 shadow-2xl">
                      <Play fill="currentColor" size={32} className="ml-1 text-white opacity-90 group-hover:text-white" />
                    </div>
                    <div className="absolute w-16 h-16 rounded-full border border-white/20 animate-ping group-hover:animate-none"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 👇 VIDEO MODAL (POPUP PLAYER) */}
      {selectedTrailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-lg p-4 animate-fade-in">
            <div className="absolute inset-0" onClick={() => setSelectedTrailer(null)}></div>
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                <button onClick={() => setSelectedTrailer(null)} className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-md border border-white/10">
                    <X size={24} />
                </button>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYouTubeId(selectedTrailer)}?autoplay=1&rel=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
      )}

      {playingTrailerUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setPlayingTrailerUrl(null)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button onClick={() => setPlayingTrailerUrl(null)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-red-600 p-2 rounded-full transition-all z-20">
              <X size={24} />
            </button>
            <iframe src={getEmbedUrl(playingTrailerUrl)} title="Movie Trailer" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;