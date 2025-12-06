// // import React, { useEffect, useState } from 'react';
// // import { getMovies } from '../services/movie';
// // import type { MovieData } from '../services/movie';
// // import MovieCard from '../components/MovieCard';
// // import { Link } from 'react-router-dom';

// // const Home: React.FC = () => {
// //   const [movies, setMovies] = useState<MovieData[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchMovies = async () => {
// //       try {
// //         const data = await getMovies();
// //         setMovies(data);
// //       } catch (error) {
// //         console.error("Failed to fetch movies", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMovies();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white">
      
// //       {/* 1. Hero Section (Banner) */}
// //       <div className="bg-gradient-to-r from-blue-900 to-gray-900 py-16 px-6 text-center shadow-2xl">
// //         <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down">
// //           Welcome to <span className="text-blue-400">FilmHall</span>
// //         </h1>
// //         <p className="text-gray-300 text-lg mb-8">Book your tickets for the latest movies easily.</p>
        
// //         {/* Admin Link (Admin ) */}
// //         <Link to="/admin/add-movie" className="text-sm text-gray-500 hover:text-white underline">
// //           Admin: Add Movie
// //         </Link>
// //       </div>

// //       {/* 2. Movies Grid */}
// //       <div className="container mx-auto px-6 py-12">
// //         <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Now Showing</h2>

// //         {loading ? (
// //           // Loading State
// //           <div className="flex justify-center items-center h-64">
// //              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //           </div>
// //         ) : movies.length === 0 ? (
// //           // Empty State
// //           <p className="text-center text-gray-500">No movies available at the moment.</p>
// //         ) : (
// //           // Movie Grid
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //             {movies.map((movie) => (
// //               <MovieCard key={movie._id} movie={movie} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;



// import React, { useEffect, useState } from 'react';
// import { getMovies } from '../services/movie';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// import { Play, Calendar, Clock, Ticket, X } from 'lucide-react'; // Icons
// import type { MovieData } from '../services/movie';



// // Component එක ඇතුලේ මුලටම මේක දාන්න


// // Swiper Styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const Home: React.FC = () => {
//   const [movies, setMovies] = useState<MovieData[]>([]);
//   const [loading, setLoading] = useState(true);



  

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const data = await getMovies();
//         setMovies(data);
//       } catch (error) {
//         console.error("Failed to fetch movies", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   const [isTrailerOpen, setIsTrailerOpen] = useState(false);

// const [playingTrailerUrl, setPlayingTrailerUrl] = useState<string | null>(null);

//   // Filter Movies
//   const nowShowing = movies.filter(m => m.status === 'Now Showing' || !m.status); // Default to Now Showing if undefined
//   const comingSoon = movies.filter(m => m.status === 'Coming Soon');

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen bg-black">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-black text-white font-sans">
      
//       {/* ================= HERO SLIDER (Now Showing) ================= */}
//       <section className="relative h-[500px] md:h-[650px]">
//         <Swiper
//           spaceBetween={0}
//           effect={'fade'}
//           centeredSlides={true}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           modules={[Autoplay, EffectFade, Pagination]}
//           className="h-full w-full"
//         >
//           {nowShowing.map((movie) => (
//             <SwiperSlide key={movie._id}>
//               <div className="relative h-full w-full">
//                 {/* Background Image (Cover or Poster) */}
//                 <div 
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{ backgroundImage: `url(${movie.coverUrl || movie.posterUrl})` }}
//                 >
//                     {/* Gradient Overlay for Readability */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
//                 </div>

//                 {/* Content Overlay */}
//                 <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start z-10 container mx-auto">
//                   <span className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 animate-fade-in">
//                     Now Showing
//                   </span>
                  
//                   <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
//                     {movie.title}
//                   </h1>

//                   <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base mb-8">
//                     <span className="flex items-center gap-2"><Clock size={18} className="text-yellow-500"/> {movie.duration} min</span>
//                     <span className="flex items-center gap-2"><Ticket size={18} className="text-yellow-500"/> {movie.genre}</span>
//                     <span className="px-2 py-0.5 border border-gray-500 rounded text-xs">2D / 3D</span>
//                   </div>

//                   {/* <div className="flex gap-4">
//                     <Link 
//                         to={`/movie/${movie._id}`} 
//                         className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
//                     >
//                         <Ticket size={20} /> Book Tickets
//                     </Link>
//                     <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold transition-all">
      
//                         <Play size={20}  /> Watch Trailer
//                     </button>
//                   </div> */}
//                   <div className="flex gap-4">
//                     {/* Book Tickets Button */}
//                     <Link 
//                       to={`/movie/${movie._id}`} 
//                       className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
//                     >
//                       <Ticket size={20} /> Book Tickets
//                     </Link>

//                     {/* Watch Trailer Button */}
//                     {/* වෙනස්කම 2: මෙතනින් කෙලින්ම URL එක pass කරනවා */}
//                     <button 
//                       onClick={() => setPlayingTrailerUrl(movie.trailerUrl)}
//                       className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer"
//                     >
//                       <Play size={20} /> Watch Trailer
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>


//       {/* ================= NOW SHOWING GRID ================= */}
//       <section className="container mx-auto px-6 py-16">
//         <div className="flex justify-between items-end mb-10">
//             <div>
//                 <h2 className="text-3xl font-bold text-white mb-2 border-l-4 border-yellow-500 pl-4">Now Showing</h2>
//                 <p className="text-gray-400">Book your tickets for the latest blockbusters</p>
//             </div>
//             <Link to="/movies" className="text-yellow-500 hover:text-white transition">View All</Link>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {nowShowing.map((movie) => (
//                 <Link to={`/movie/${movie._id}`} key={movie._id} className="group relative">
//                     <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
//                         <img 
//                             src={movie.posterUrl} 
//                             alt={movie.title} 
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                         {/* Hover Effect */}
//                         <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
//                             <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-3">Book Now</span>
//                             <p className="text-gray-300 text-xs">{movie.genre}</p>
//                             <p className="text-gray-300 text-xs mt-1">{movie.duration} min</p>
//                         </div>
//                     </div>
//                     <h3 className="mt-3 text-lg font-bold text-white group-hover:text-yellow-500 transition-colors truncate">{movie.title}</h3>
//                     <p className="text-gray-500 text-sm">LKR {movie.ticketPrice}</p>
//                 </Link>
//             ))}
//         </div>
//       </section>


//       {/* ================= COMING SOON SECTION ================= */}
//       <section className="bg-gray-900 py-16">
//         <div className="container mx-auto px-6">
//             <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-blue-500 pl-4">Coming Soon</h2>
            
//             <Swiper
//                 spaceBetween={20}
//                 slidesPerView={2}
//                 breakpoints={{
//                     640: { slidesPerView: 3 },
//                     768: { slidesPerView: 4 },
//                     1024: { slidesPerView: 5 },
//                 }}
//                 className="w-full"
//             >
//                 {comingSoon.length > 0 ? (
//                     comingSoon.map((movie) => (
//                         <SwiperSlide key={movie._id}>
//                             <div className="group opacity-70 hover:opacity-100 transition-opacity duration-300">
//                                 <div className="relative overflow-hidden rounded-xl aspect-[2/3] grayscale group-hover:grayscale-0 transition-all duration-500">
//                                     <img 
//                                         src={movie.posterUrl} 
//                                         alt={movie.title} 
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
//                                         <p className="text-white font-bold text-center text-sm flex items-center justify-center gap-2">
//                                             <Calendar size={14} className="text-blue-500"/>
//                                             {new Date(movie.releaseDate).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <h3 className="mt-3 text-lg font-bold text-center">{movie.title}</h3>
//                             </div>
//                         </SwiperSlide>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No upcoming movies listed.</p>
//                 )}
//             </Swiper>
//         </div>
//       </section>

//     </div>
//   );
// };



// export default Home;

import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movie';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Play, Calendar, Clock, Ticket, X, Info } from 'lucide-react';
import type { MovieData } from '../services/movie';


import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation'; // Styles import කරන්න

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingTrailerUrl, setPlayingTrailerUrl] = useState<string | null>(null);

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
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data.reverse()); 
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // ===================== FILTER LOGIC (UPDATED) =====================
  const today = new Date();

  // 1. Coming Soon List (Future dates OR status is 'Coming Soon')
  const comingSoon = movies.filter(m => {
      const releaseDate = new Date(m.releaseDate);
      return m.status === 'Coming Soon' || releaseDate > today;
  });

  // 2. Now Showing List (Exclude anything that is in Coming Soon)
  const allNowShowing = movies.filter(m => {
      const releaseDate = new Date(m.releaseDate);
      // Check if it is a Coming Soon movie
      const isComingSoon = m.status === 'Coming Soon' || releaseDate > today;
      // If it is Coming Soon, DON'T show it here
      return !isComingSoon;
  });

  // Hero Section (Top 3 from Now Showing)
  const heroMovies = allNowShowing.slice(0, 3);
  // =================================================================

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* ================= HERO SLIDER ================= */}
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

      {/* ================= NOW SHOWING GRID ================= */}
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
                        <div className="absolute top-2 right-2 z-10">
                            <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">
                                {movie.censorRating || 'G'}
                            </span>
                        </div>
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

      {/* ================= COMING SOON SECTION ================= */}
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
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl aspect-[2/3] grayscale group-hover:grayscale-0 transition-all duration-500 border border-gray-700 group-hover:border-blue-500">
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

      {/* ================= LATEST TRAILERS SECTION ================= */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">Latest Trailers</h2>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={true} // Arrow keys පෙන්වන්න
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie._id}>
                {/* Card Container */}
                <div className="relative group rounded-xl overflow-hidden aspect-video border border-gray-800 hover:border-red-600 transition-all duration-300 shadow-2xl">
                  
                  {/* 1. Background Image (Cover URL) */}
                  <img 
                    src={movie.coverUrl || movie.posterUrl} 
                    alt={`${movie.title} trailer`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* 2. Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>

                  {/* 3. Play Button (Centered) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a 
                      href={movie.trailerUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-red-600/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] transform scale-90 group-hover:scale-110 transition-all duration-300"
                    >
                      {/* Play Icon (Lucide React) */}
                      <Play fill="currentColor" size={28} className="ml-1" />
                    </a>
                  </div>

                  {/* 4. Movie Title (Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white truncate">{movie.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Official Trailer</p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= TRAILER MODAL ================= */}
      {playingTrailerUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="absolute inset-0" 
            onClick={() => setPlayingTrailerUrl(null)} 
          />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setPlayingTrailerUrl(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-red-600 p-2 rounded-full transition-all z-20"
            >
              <X size={24} />
            </button>
            <iframe 
              src={getEmbedUrl(playingTrailerUrl)}
              title="Movie Trailer"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;