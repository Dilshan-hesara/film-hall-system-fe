import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movie';
import { getShowtimes } from '../services/showtime';
import type { MovieData } from '../services/movie';
import type { ShowtimeData } from '../services/showtime';

// const MovieDetails: React.FC = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();

//   const [movie, setMovie] = useState<MovieData | null>(null);
//   const [showtimes, setShowtimes] = useState<ShowtimeData[]>([]);
//   const [loading, setLoading] = useState(true);



//   useEffect(() => {
//     const fetchData = async () => {
//       if (!id) return;
//       try {
//         const movieData = await getMovieById(id);
//         setMovie(movieData);

//         const showsData = await getShowtimes(id);
//         setShowtimes(showsData);
//       } catch (error) {
//         console.error("Error fetching details", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleBooking = (showtime: ShowtimeData) => {
//     navigate(`/book/${id}?date=${showtime.showDate}&time=${showtime.showTime}&hallId=${showtime.hall._id}`);

//      navigate(
//       `/book/${id}?date=${showtime.showDate}&time=${showtime.showTime}&hallId=${showtime.hall._id}&price=${showtime.ticketPrice}&hallName=${showtime.hall.name}`
//     );
// };

//   if (loading) return <div className="text-white text-center mt-20">Loading Details...</div>;
//   if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">

//       {/* 1. Hero Section (Backdrop) */}
//       <div 
//         className="relative h-[400px] bg-cover bg-center"
//         style={{ backgroundImage: `url(${movie.posterUrl})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

//         <div className="absolute bottom-0 left-0 p-8 w-full container mx-auto flex gap-8 items-end">
//           {/* Poster Image */}
//           <img 
//             src={movie.posterUrl} 
//             alt={movie.title} 
//             className="w-48 rounded-lg shadow-2xl border-4 border-gray-800 hidden md:block"
//           />

//           {/* Movie Info */}
//           <div className="mb-4">
//             <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
//             <div className="flex gap-4 text-sm text-gray-300 mb-4">
//               <span className="bg-blue-600 px-2 py-1 rounded text-white font-bold">{movie.genre}</span>
//               <span>⏱️ {movie.duration} min</span>
//               <span>📅 Release: {new Date(movie.releaseDate).toDateString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Details & Showtimes Section */}
//       <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">

//         {/* Left: Description */}
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Synopsis</h2>
//           <p className="text-gray-300 leading-relaxed text-lg mb-8">
//             {movie.description}
//           </p>

//           {/* Showtimes List */}
//           <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-4">Select a Showtime</h2>

//           {showtimes.length === 0 ? (
//             <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
//               No showtimes scheduled yet.
//             </div>
//           ) : (
//             <div className="grid gap-6">
//               {/* Showtimes Grouping logic can be added here, currently showing list */}
//               {showtimes.map((show) => (
//                 <div 
//                   key={show._id} 
//                   className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
//                   onClick={() => handleBooking(show)}
//                 >
//                   <div>
//                     <p className="text-lg font-bold text-white">{show.showDate}</p>
//                     <p className="text-sm text-gray-400">{show.hall.name}</p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-xl font-bold text-green-400">{show.showTime}</p>
//                     <p className="text-xs text-gray-500">LKR {show.ticketPrice}</p>
//                   </div>

//                   <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold">
//                     Book Seat
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right: Cast or Extra Info (Optional) */}
//         <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
//             <h3 className="text-xl font-bold mb-4">Ticket Price</h3>
//             <p className="text-3xl font-mono text-yellow-400 mb-2">LKR {movie.ticketPrice}</p>
//             <p className="text-gray-400 text-sm">Base price per person</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MovieDetails;



// const MovieDetails: React.FC = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [movie, setMovie] = useState<MovieData | null>(null);
//     const [showtimes, setShowtimes] = useState<ShowtimeData[]>([]);
//     const [loading, setLoading] = useState(true);

//     // 👇 Selected Date Filter එක
//     const [selectedDate, setSelectedDate] = useState<string>('');
//     const [availableDates, setAvailableDates] = useState<string[]>([]);

    
//     useEffect(() => {
//         const fetchData = async () => {
//             if (!id) return;
//             try {
//                 const movieData = await getMovieById(id);
//                 setMovie(movieData);

//                 const showsData = await getShowtimes(id);
//                 setShowtimes(showsData);

//                 // 👇 Showtimes 
//                 const dates = Array.from(new Set(showsData.map((s: any) => s.showDate))).sort();
//                 setAvailableDates(dates as string[]);

//                 // (Today/Next available) select
//                 if (dates.length > 0) {
//                     setSelectedDate(dates[0] as string);
//                 }

//             } catch (error) {
//                 console.error("Error fetching details", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [id]);

//     const handleBooking = (showtime: ShowtimeData) => {
//         navigate(
//             `/book/${id}?date=${showtime.showDate}&time=${showtime.showTime}&hallId=${showtime.hall._id}&price=${showtime.ticketPrice}&hallName=${showtime.hall.name}`
//         );
//     };

//     //  Showtimes 
//     const filteredShowtimes = showtimes.filter((s) => s.showDate === selectedDate);

//     if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
//     if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

//     return (


//         <div className="min-h-screen bg-gray-900 text-white">



//             {/* Hero Section (Poster)  */}
//             {/* 1. Hero Section (Backdrop) */}
//             <div
//                 className="relative h-[400px] bg-cover bg-center"
//                 style={{ backgroundImage: `url(${movie.posterUrl})` }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

//                 <div className="absolute bottom-0 left-0 p-8 w-full container mx-auto flex gap-8 items-end">
//                     {/* Poster Image */}
//                     <img
//                         src={movie.posterUrl}
//                         alt={movie.title}
//                         className="w-48 rounded-lg shadow-2xl border-4 border-gray-800 hidden md:block"
//                     />

//                     {/* Movie Info */}
//                     <div className="mb-4">
//                         <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
//                         <div className="flex gap-4 text-sm text-gray-300 mb-4">
//                             <span className="bg-blue-600 px-2 py-1 rounded text-white font-bold">{movie.genre}</span>
//                             <span>⏱️ {movie.duration} min</span>
//                             <span>📅 Release: {new Date(movie.releaseDate).toDateString()}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//             <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">

//                 <div className="md:col-span-2">
//                     {/* Synopsis */}
//                     <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Synopsis</h2>
//                     <p className="text-gray-300 leading-relaxed text-lg mb-8">{movie.description}</p>

//                     {/* 👇 DATE SELECTOR TABS */}
//                     <h2 className="text-2xl font-bold mb-4 border-l-4 border-purple-500 pl-4">Select Date</h2>

//                     <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
//                         {availableDates.length > 0 ? (
//                             availableDates.map((date) => (
//                                 <button
//                                     key={date}
//                                     onClick={() => setSelectedDate(date)}
//                                     className={`px-6 py-3 rounded-lg font-bold transition-all border border-gray-700
//                     ${selectedDate === date
//                                             ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-105'
//                                             : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
//                     `}
//                                 >
//                                     {/*  (Example: Fri, Dec 05) */}
//                                     {new Date(date).toDateString().slice(0, 10)}
//                                 </button>
//                             ))
//                         ) : (
//                             <p className="text-gray-500 italic">No shows available for the next 3 days.</p>
//                         )}
//                     </div>

//                     {/* 👇 SHOWTIMES LIST (Filtered) */}
//                     <h3 className="text-xl font-bold mb-4 text-gray-300">Available Shows</h3>




//                     {filteredShowtimes.length === 0 ? (
//                         <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
//                             Select a date to view showtimes.
//                         </div>
//                     ) : (

//                         <div className="grid gap-4">
//                             {filteredShowtimes.map((show) => (

                                
//                                 // <div 
//                                 //   key={show._id} 
//                                 //   className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
//                                 //   onClick={() => handleBooking(show)}
//                                 // >
//                                 //   <div className="flex items-center gap-4">
//                                 //     <div className="bg-gray-700 px-3 py-1 rounded text-gray-300 font-mono text-sm">
//                                 //         {show.hall.name}
//                                 //     </div>
//                                 //     <div>
//                                 //         {/* <p className="text-xl font-bold text-white">{show.showTime}</p> */}
//                                 //         <p className="text-xs text-gray-500">2D / Dolby</p>
//                                 //     </div>
//                                 //          <div className="text-right">
//                                 //     <p className="text-xl font-bold text-green-400">{show.showTime}</p>
//                                 //     <p className="text-xs text-gray-500">LKR {show.ticketPrice}</p>
//                                 //   </div>
//                                 //   </div>

//                                 //   <div className="text-right flex items-center gap-4">
//                                 //     <div>
//                                 //         {/* <p className="text-lg font-bold text-yellow-400">LKR {show.ticketPrice}</p> */}
//                                 //     </div>
//                                 //     <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
//                                 //         Book
//                                 //     </button>
//                                 //   </div>
//                                 // </div>

//                                 <div
//                                     key={show._id}
//                                     className="bg-gray-800 p-4 rounded-xl flex justify-between items-center border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition-all cursor-pointer group shadow-lg"
//                                     onClick={() => handleBooking(show)}
//                                 >
//                                     {/* Left Side: Time & Tech Specs */}
//                                     <div className="flex flex-col min-w-[100px]">
//                                         <p className="text-2xl font-bold text-green-400 tracking-tight">{show.showTime}</p>
//                                         <div className="flex items-center gap-2 mt-1">
//                                             <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">2D</span>
//                                             <span className="text-xs text-gray-500">Dolby 7.1</span>
//                                         </div>
//                                     </div>

//                                     {/* Center: Hall Information (Highlighted) */}
//                                     <div className="flex flex-col items-start pl-6 border-l border-gray-700">
//                                         <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Venue</p>
//                                         <div className="flex items-center gap-2 text-gray-200">
//                                             {/* Location Icon to identify Hall */}
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                                             </svg>
//                                             <span className="font-medium text-base group-hover:text-white transition-colors">
//                                                 {show.hall.name}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     {/* Right Side: Price & Button */}
//                                     <div className="flex items-center gap-5">
//                                         <div className="text-right">
//                                             <p className="text-xs text-gray-400 mb-0.5">Per Ticket</p>
//                                             <p className="text-lg font-bold text-yellow-400 font-mono">LKR {show.ticketPrice}</p>
//                                         </div>

//                                         <div className={`absolute top-2 left-2 ${getRatingColor(movie.censorRating)} text-white text-xs font-bold px-2 py-1 rounded shadow-md`}>
//           {movie.censorRating}
//         </div>

//                                         <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-900/20 transition-all transform group-hover:scale-105 active:scale-95">
//                                             Book
//                                         </button>
//                                     </div>
//                                 </div>

//                             ))}
//                         </div>
//                     )}





//                 </div>

//                 {/* infrooo */}

//                 {/* Right Side ( Info) */}
//                 <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">

//                     {/* Movie Details */}
//                     <h3 className="text-xl font-bold mb-4">Movie Info</h3>
//                     <div className="space-y-2 mb-6">
//                         <div className="flex justify-between text-sm">
//                             <span className="text-gray-400">Duration:</span>
//                             <span className="text-gray-200 font-medium">{movie.duration} mins</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                             <span className="text-gray-400">Genre:</span>
//                             <span className="text-gray-200 font-medium">{movie.genre}</span>
//                         </div>
//                     </div>

//                     <div className="h-px bg-gray-700 my-4"></div> {/* Divider Line */}

//                     {/* Price Section */}
//                     <h3 className="text-xl font-bold mb-2">Ticket Price</h3>
//                     <div className="flex items-baseline gap-2 mb-1">
//                         <span className="text-gray-400 text-sm">From</span>
//                         <p className="text-3xl font-mono text-yellow-400">LKR {movie.ticketPrice}</p>
//                         <span className="text-gray-400 text-sm font-medium">Upwards</span>
//                     </div>
//                     <p className="text-gray-500 text-xs mb-6">*Price varies based on seat selection</p>

//                     {/* Modern Notices Section */}
//                     <div className="space-y-3">

//                         {/* Child Ticket Notice */}
//                         <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
//                             <span className="text-blue-400 text-lg mt-0.5">ℹ️</span>
//                             <div>
//                                 <p className="text-blue-400 text-xs font-bold uppercase mb-0.5 tracking-wide">
//                                     Full Ticket Required
//                                 </p>
//                                 <p className="text-gray-400 text-xs leading-relaxed">
//                                     No half tickets available. Children require a full ticket for admission.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Refund Warning */}
//                         <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
//                             <span className="text-red-400 text-lg mt-0.5">⚠️</span>
//                             <div>
//                                 <p className="text-red-400 text-xs font-bold uppercase mb-0.5 tracking-wide">
//                                     Non-Refundable
//                                 </p>
//                                 <p className="text-gray-400 text-xs leading-relaxed">
//                                     Tickets cannot be cancelled, refunded, or exchanged once purchased.
//                                 </p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>



//             </div>
//         </div>
//     );
// };

// //         <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
// // //             <h3 className="text-xl font-bold mb-4">Ticket Price</h3>
// // //             <p className="text-3xl font-mono text-yellow-400 mb-2">LKR {movie.ticketPrice}</p>
// // //             <p className="text-gray-400 text-sm">Base price per person</p>
// // //         </div>


// const getRatingColor = (rating: string) => {
//   switch (rating) {
//     case 'U': return 'bg-green-600';      // ළමයින්ට සුදුසුයි (කොළ)
//     case 'UA': return 'bg-yellow-600';    // දෙමාපිය අවසරය (කහ)
//     case 'A': return 'bg-red-600';        // වැඩිහිටි (රතු)
//     default: return 'bg-gray-600';
//   }
// };
// export default MovieDetails;

import { Play, X, Clock, Calendar, Ticket } from 'lucide-react'; // Icons

// Age Rating Color Helper Function
const getRatingColor = (rating: string) => {
    switch (rating) {
        case 'U': return 'bg-green-600';      // General
        case 'UA': return 'bg-yellow-600';    // Parental Guidance
        case 'A': return 'bg-red-600';        // Adult
        case '18+': return 'bg-red-700';      // Adult
        case 'R': return 'bg-red-700';        // Restricted
        default: return 'bg-gray-600';
    }
};

const MovieDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieData | null>(null);
    const [showtimes, setShowtimes] = useState<ShowtimeData[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);

    // Trailer Modal State
    const [playingTrailerUrl, setPlayingTrailerUrl] = useState<string | null>(null);

    // YouTube URL Helper
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

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const movieData = await getMovieById(id);
                setMovie(movieData);

                const showsData = await getShowtimes(id);
                setShowtimes(showsData);

                // Extract Unique Dates
                const dates = Array.from(new Set(showsData.map((s: any) => s.showDate))).sort();
                setAvailableDates(dates as string[]);

                // Select first available date
                if (dates.length > 0) {
                    setSelectedDate(dates[0] as string);
                }

            } catch (error) {
                console.error("Error fetching details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleBooking = (showtime: ShowtimeData) => {
        navigate(
            `/book/${id}?date=${showtime.showDate}&time=${showtime.showTime}&hallId=${showtime.hall._id}&price=${showtime.ticketPrice}&hallName=${showtime.hall.name}`
        );
    };

    // Filter Showtimes
    const filteredShowtimes = showtimes.filter((s) => s.showDate === selectedDate);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
    );
    
    if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">

            {/* ================= HERO SECTION ================= */}
            <div
                className="relative h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.posterUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 w-full container mx-auto flex flex-col md:flex-row gap-8 items-end">
                    {/* Poster Image (Visible on Desktop) */}
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-56 rounded-xl shadow-2xl border-4 border-gray-800 hidden md:block hover:scale-105 transition-transform duration-300"
                    />

                    {/* Movie Info */}
                    <div className="mb-4 w-full">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-xl">{movie.title}</h1>
                        
                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                            
                            {/* Age Rating Badge (NEW) */}
                            <span className={`${getRatingColor(movie.censorRating || 'U')} text-white px-3 py-1 rounded font-bold shadow-sm`}>
                                {movie.censorRating || 'U'}
                            </span>

                            {/* Genre Badge */}
                            <span className="bg-gray-700/80 backdrop-blur border border-gray-600 px-3 py-1 rounded text-white font-semibold">
                                {movie.genre}
                            </span>

                            <span className="flex items-center gap-1"><Clock size={16} className="text-yellow-500"/> {movie.duration} min</span>
                            <span className="flex items-center gap-1"><Calendar size={16} className="text-blue-500"/> {new Date(movie.releaseDate).toDateString()}</span>
                        </div>

                        {/* Watch Trailer Button (NEW) */}
                        <button 
                            onClick={() => setPlayingTrailerUrl(movie.trailerUrl)}
className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg"                        >
                            <Play size={22} className="fill-current group-hover:scale-110 transition-transform"/> 
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= CONTENT GRID ================= */}
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="md:col-span-2">
                    {/* Synopsis */}
                    <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-4">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed text-lg mb-10">{movie.description}</p>

                    {/* Date Selector */}
                    <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Select Date</h2>

                    <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                        {availableDates.length > 0 ? (
                            availableDates.map((date) => (
                                <button
                                    key={date}
                                    onClick={() => setSelectedDate(date)}
                                    className={`flex flex-col items-center px-6 py-3 rounded-xl font-bold transition-all border border-gray-700 min-w-[100px]
                                        ${selectedDate === date
                                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/40 transform scale-105'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:border-gray-500'}
                                    `}
                                >
                                    <span className="text-xs uppercase">{new Date(date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-2xl">{new Date(date).getDate()}</span>
                                    <span className="text-xs font-normal">{new Date(date).toLocaleString('default', { weekday: 'short' })}</span>
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No shows available for the next 3 days.</p>
                        )}
                    </div>

                    {/* Showtimes List */}
                    <h3 className="text-xl font-bold mb-6 text-gray-200 flex items-center gap-2">
                        <Ticket className="text-yellow-500"/> Available Shows
                    </h3>

                    {filteredShowtimes.length === 0 ? (
                        <div className="bg-gray-800/50 border border-gray-700 p-10 rounded-xl text-center text-gray-400">
                            Select a date to view available showtimes.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredShowtimes.map((show) => (
                                <div
                                    key={show._id}
                                    className="bg-gray-800 p-5 rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition-all cursor-pointer group shadow-lg"
                                    onClick={() => handleBooking(show)}
                                >
                                    {/* Time */}
                                    <div className="flex flex-col min-w-[100px] mb-2 md:mb-0">
                                        <p className="text-2xl font-bold text-green-400 tracking-tight">{show.showTime}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">2D</span>
                                            <span className="text-xs text-gray-500">Dolby 7.1</span>
                                        </div>
                                    </div>

                                    {/* Hall Info */}
                                    <div className="flex flex-col items-start pl-0 md:pl-6 border-l-0 md:border-l border-gray-700 mb-2 md:mb-0 flex-grow">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Venue</p>
                                        <div className="flex items-center gap-2 text-gray-200">
                                            <span className="font-medium text-lg group-hover:text-blue-400 transition-colors">
                                                {show.hall.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & Button */}
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 mb-0.5">Price</p>
                                            <p className="text-xl font-bold text-yellow-400 font-mono">LKR {show.ticketPrice}</p>
                                        </div>
                                        <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-blue-900/20 transition-all transform group-hover:translate-x-1">
                                            Book
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ================= SIDEBAR INFO ================= */}
                <div className="h-fit">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 sticky top-24">
                        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Movie Info</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Duration</span>
                                <span className="text-gray-200 font-medium">{movie.duration} mins</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Genre</span>
                                <span className="text-gray-200 font-medium">{movie.genre}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Rating</span>
                                <span className={`${getRatingColor(movie.censorRating || 'U')} text-white text-xs px-2 py-0.5 rounded font-bold`}>
                                    {movie.censorRating || 'U'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 p-4 rounded-lg mb-6 border border-gray-700/50">
                            <p className="text-gray-400 text-xs mb-1">Ticket Price From</p>
                            <p className="text-3xl font-mono text-yellow-400">LKR {movie.ticketPrice}</p>
                        </div>

                        {/* Notices */}
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
                                <span className="text-blue-400">ℹ️</span>
                                <div>
                                    <p className="text-blue-400 text-xs font-bold uppercase mb-0.5">Full Ticket Required</p>
                                    <p className="text-gray-400 text-xs">No half tickets available. Children require a full ticket.</p>
                                </div>
                            </div>

                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                                <span className="text-red-400">⚠️</span>
                                <div>
                                    <p className="text-red-400 text-xs font-bold uppercase mb-0.5">Non-Refundable</p>
                                    <p className="text-gray-400 text-xs">Tickets cannot be cancelled or exchanged.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ================= TRAILER MODAL ================= */}
            {playingTrailerUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    {/* Click Outside to Close */}
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setPlayingTrailerUrl(null)} 
                    />

                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        {/* Close Button */}
                        <button 
                            onClick={() => setPlayingTrailerUrl(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-red-600 p-2 rounded-full transition-all z-20"
                        >
                            <X size={24} />
                        </button>

                        {/* YouTube Player */}
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

export default MovieDetails;