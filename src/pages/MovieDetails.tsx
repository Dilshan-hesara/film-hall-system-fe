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



const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [showtimes, setShowtimes] = useState<ShowtimeData[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 Selected Date Filter එක
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);

        const showsData = await getShowtimes(id);
        setShowtimes(showsData);

        // 👇 Showtimes 
        const dates = Array.from(new Set(showsData.map((s: any) => s.showDate))).sort();
        setAvailableDates(dates as string[]);
        
        // (Today/Next available) select
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

  //  Showtimes 
  const filteredShowtimes = showtimes.filter((s) => s.showDate === selectedDate);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

  return (

    
    <div className="min-h-screen bg-gray-900 text-white">
      

        
      {/* Hero Section (Poster)  */}
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
      


      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="md:col-span-2">
          {/* Synopsis */}
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">{movie.description}</p>

          {/* 👇 DATE SELECTOR TABS */}
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-purple-500 pl-4">Select Date</h2>
          
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {availableDates.length > 0 ? (
                availableDates.map((date) => (
                <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all border border-gray-700
                    ${selectedDate === date 
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-105' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                    `}
                >
                    {/*  (Example: Fri, Dec 05) */}
                    {new Date(date).toDateString().slice(0, 10)}
                </button>
                ))
            ) : (
                <p className="text-gray-500 italic">No shows available for the next 3 days.</p>
            )}
          </div>

          {/* 👇 SHOWTIMES LIST (Filtered) */}
          <h3 className="text-xl font-bold mb-4 text-gray-300">Available Shows</h3>
          
          {filteredShowtimes.length === 0 ? (
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              Select a date to view showtimes.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredShowtimes.map((show) => (
                <div 
                  key={show._id} 
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
                  onClick={() => handleBooking(show)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-700 px-3 py-1 rounded text-gray-300 font-mono text-sm">
                        {show.hall.name}
                    </div>
                    <div>
                        {/* <p className="text-xl font-bold text-white">{show.showTime}</p> */}
                        <p className="text-xs text-gray-500">2D / Dolby</p>
                    </div>
                         <div className="text-right">
                    <p className="text-xl font-bold text-green-400">{show.showTime}</p>
                    <p className="text-xs text-gray-500">LKR {show.ticketPrice}</p>
                  </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div>
                        {/* <p className="text-lg font-bold text-yellow-400">LKR {show.ticketPrice}</p> */}
                    </div>
                    <button className="bg-blue-600 group-hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
                        Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>

        {/* Right Side ( Info) */}
<div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
    
    {/* Movie Details */}
    <h3 className="text-xl font-bold mb-4">Movie Info</h3>
    <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
            <span className="text-gray-400">Duration:</span>
            <span className="text-gray-200 font-medium">{movie.duration} mins</span>
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-400">Genre:</span>
            <span className="text-gray-200 font-medium">{movie.genre}</span>
        </div>
    </div>

    <div className="h-px bg-gray-700 my-4"></div> {/* Divider Line */}

    {/* Price Section */}
    <h3 className="text-xl font-bold mb-2">Ticket Price</h3>
    <div className="flex items-baseline gap-2 mb-1">
        <span className="text-gray-400 text-sm">From</span>
        <p className="text-3xl font-mono text-yellow-400">LKR {movie.ticketPrice}</p>
        <span className="text-gray-400 text-sm font-medium">Upwards</span>
    </div>
    <p className="text-gray-500 text-xs mb-6">*Price varies based on seat selection</p>

    {/* Modern Notices Section */}
    <div className="space-y-3">
        
        {/* Child Ticket Notice */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
            <span className="text-blue-400 text-lg mt-0.5">ℹ️</span>
            <div>
                <p className="text-blue-400 text-xs font-bold uppercase mb-0.5 tracking-wide">
                    Full Ticket Required
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                    No half tickets available. Children require a full ticket for admission.
                </p>
            </div>
        </div>

        {/* Refund Warning */}
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <span className="text-red-400 text-lg mt-0.5">⚠️</span>
            <div>
                <p className="text-red-400 text-xs font-bold uppercase mb-0.5 tracking-wide">
                    Non-Refundable
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                    Tickets cannot be cancelled, refunded, or exchanged once purchased.
                </p>
            </div>
        </div>

    </div>
</div>



      </div>
    </div>
  );
};

//         <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
// //             <h3 className="text-xl font-bold mb-4">Ticket Price</h3>
// //             <p className="text-3xl font-mono text-yellow-400 mb-2">LKR {movie.ticketPrice}</p>
// //             <p className="text-gray-400 text-sm">Base price per person</p>
// //         </div>

export default MovieDetails;