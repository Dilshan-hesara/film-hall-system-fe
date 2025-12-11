// import React, { useState, useEffect } from 'react';
// import { getMovies } from '../../services/movie'; 
// import { getShowtimes } from '../../services/showtime'; 
// import { createCounterBookingApi, getOccupiedSeats } from '../../services/booking'; 
// import { Monitor, User, Phone, CheckCircle, Printer, Calendar, Clock, MapPin, Grid, AlertCircle } from 'lucide-react';

// const SEAT_PRICE = 1000;

// const CounterBooking: React.FC = () => {
//   // --- Helpers ---
//   // දිනය Local Timezone එකට අනුව YYYY-MM-DD විදියට ගන්න Function එක
//   const formatDateLocal = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // --- States ---
//   const [movies, setMovies] = useState<any[]>([]);
//   const [availableShowtimes, setAvailableShowtimes] = useState<any[]>([]);
//   const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  
//   // Selection
//   const [selectedMovie, setSelectedMovie] = useState<any>(null);
  
//   // අද දිනය (Local Time අනුව) - Backend එකේ showDate එක්ක මේක මැච් කරනවා
//   const [selectedDate] = useState<string>(formatDateLocal(new Date())); 
  
//   const [selectedShowtime, setSelectedShowtime] = useState<any>(null); 
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

//   // Form
//   const [guestName, setGuestName] = useState('');
//   const [guestPhone, setGuestPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successData, setSuccessData] = useState<any>(null);

//   // 1. Movies Load කිරීම
//   useEffect(() => {
//     getMovies().then(data => {
//         if(Array.isArray(data)) setMovies(data);
//         else setMovies(data.data || []);
//     });
//   }, []);

//   // 2. Movie එක තේරුවාම -> අද දවසට අදාළ Showtimes ෆිල්ටර් කිරීම
//   useEffect(() => {
//     if (selectedMovie) {
//         setAvailableShowtimes([]);
//         setSelectedShowtime(null);
//         setSelectedSeats([]);
        
//         getShowtimes(selectedMovie._id)
//             .then(data => {
//                 // 👇 Backend එකෙන් දවස් 3ක් එනවා, අපි අද දවස (Today) විතරක් ගන්නවා
//                 const todayShows = data.filter((show: any) => {
//                     // Backend එකේ තියෙන්නේ 'showDate' (e.g., "2025-12-11")
//                     return show.showDate === selectedDate; 
//                 });

//                 setAvailableShowtimes(todayShows);
//             })
//             .catch(err => console.error("Error loading showtimes:", err));
//     }
//   }, [selectedMovie]); 

//   // 3. Showtime එක Click කළාම -> Seats Load කිරීම
//   useEffect(() => {
//     if (selectedShowtime && selectedMovie) {
//         setLoading(true);
//         const hallId = selectedShowtime.hall?._id || selectedShowtime.hall; 

//         // Backend එකේ තියෙන්නේ 'showTime'
//         getOccupiedSeats(selectedMovie._id, hallId, selectedDate, selectedShowtime.showTime)
//             .then(seats => setOccupiedSeats(seats))
//             .catch(() => setOccupiedSeats([]))
//             .finally(() => setLoading(false));
//     }
//   }, [selectedShowtime]);

//   // Seat Select Logic
//   const toggleSeat = (seatNo: string) => {
//     if (occupiedSeats.includes(seatNo)) return; 
//     if (selectedSeats.includes(seatNo)) {
//       setSelectedSeats(selectedSeats.filter(s => s !== seatNo));
//     } else {
//       setSelectedSeats([...selectedSeats, seatNo]);
//     }
//   };

//   // Submit Booking
//   const handleBooking = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedShowtime || selectedSeats.length === 0) return alert("Please select seats.");

//     if(confirm(`Confirm cash payment of LKR ${selectedSeats.length * SEAT_PRICE}?`)) {
//         setLoading(true);
//         try {
//             const res = await createCounterBookingApi({
//                 movieId: selectedMovie._id,
//                 hallId: selectedShowtime.hall._id || selectedShowtime.hall,
//                 date: selectedDate,
//                 time: selectedShowtime.showTime, // 👇 showTime යවන්න
//                 seats: selectedSeats,
//                 totalPrice: selectedSeats.length * SEAT_PRICE,
//                 guestName,
//                 guestPhone
//             });
//             setSuccessData(res.booking);
//             setSelectedSeats([]);
//             setGuestName('');
//             setGuestPhone('');
//             setOccupiedSeats([...occupiedSeats, ...selectedSeats]);
//         } catch (error) {
//             alert("Booking Failed! Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }
//   };

//   const getRowLabel = (index: number) => String.fromCharCode(65 + index);

//   // Success View
//   if (successData) {
//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
//             <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
//                 <div className="flex justify-center mb-4"><CheckCircle size={60} className="text-green-600"/></div>
//                 <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
//                 {/* 👇 showTime භාවිතා කරන්න */}
//                 <p className="text-gray-600 mb-6 font-bold">{selectedShowtime?.hall?.name} | {selectedShowtime?.showTime}</p>
//                 <div className="bg-gray-100 p-4 rounded-lg text-left text-sm space-y-2 mb-6 border border-dashed border-gray-400">
//                     <p><strong>Movie:</strong> {selectedMovie?.title}</p>
//                     <p><strong>Seats:</strong> {successData.seats.join(', ')}</p>
//                     <p><strong>Amount:</strong> LKR {successData.totalPrice}</p>
//                 </div>
//                 <button onClick={() => window.print()} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"><Printer size={18}/> Print Ticket</button>
//                 <button onClick={() => setSuccessData(null)} className="w-full mt-2 text-gray-500 hover:text-black py-2 text-sm font-bold">New Booking</button>
//             </div>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col lg:flex-row gap-6">
      
//       {/* LEFT: SELECTION */}
//       <div className="flex-grow bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
//         <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
//             <Monitor /> POS / Counter Booking
//         </h2>
        
//         {/* FILTERS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-black/30 p-4 rounded-xl border border-gray-700">
//             <div>
//                 <label className="text-xs text-gray-400 uppercase mb-1 block">1. SELECT MOVIE</label>
//                 <select 
//                     value={selectedMovie?._id || ''} 
//                     onChange={e => setSelectedMovie(movies.find(m => m._id === e.target.value))} 
//                     className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg p-3 outline-none"
//                 >
//                     <option value="">-- Choose Movie --</option>
//                     {movies.map(m => (
//                         <option key={m._id} value={m._id}>{m.title}</option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label className="text-xs text-gray-400 uppercase mb-1 block">2. DATE (TODAY)</label>
//                 <div className="relative">
//                     <Calendar size={18} className="absolute left-3 top-3 text-gray-500"/>
//                     <input type="text" value={selectedDate} readOnly className="w-full bg-gray-800 text-gray-400 border border-gray-700 rounded-lg p-3 pl-10 cursor-not-allowed font-bold" />
//                 </div>
//             </div>
//         </div>

//         {/* SHOWTIMES */}
//         {selectedMovie && (
//             <div className="mb-6">
//                 <label className="text-sm text-gray-400 mb-2 flex items-center gap-2"><Clock size={16}/> 3. Select Showtime</label>
//                 <div className="flex gap-3 flex-wrap">
//                     {availableShowtimes.length > 0 ? availableShowtimes.map(show => (
//                         <button
//                             key={show._id}
//                             onClick={() => setSelectedShowtime(show)}
//                             className={`px-4 py-3 rounded-lg border text-sm font-bold transition-all flex flex-col items-center min-w-[120px]
//                                 ${selectedShowtime?._id === show._id 
//                                     ? 'bg-yellow-500 text-black border-yellow-500 transform scale-105 shadow-lg' 
//                                     : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
//                         >
//                             {/* 👇 මෙතන showTime පාවිච්චි කරන්න */}
//                             <span className="text-lg">{show.showTime}</span>
//                             <span className="text-[10px] opacity-80 font-normal uppercase flex items-center gap-1 mt-1">
//                                 <MapPin size={10}/> {show.hall?.name || 'Main Hall'}
//                             </span>
//                         </button>
//                     )) : (
//                         <div className="flex items-center gap-2 text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
//                             <AlertCircle size={16} /> No showtimes found for today.
//                         </div>
//                     )}
//                 </div>
//             </div>
//         )}

//         {/* SEAT GRID */}
//         {selectedShowtime ? (
//             <div className="bg-black/50 p-8 rounded-xl border border-gray-700 text-center overflow-auto flex-grow flex flex-col justify-center relative animate-fade-in">
//                 {loading && (
//                     <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-xl">
//                         <span className="text-yellow-500 animate-pulse">Loading Seats...</span>
//                     </div>
//                 )}

//                 <div className="w-2/3 h-2 bg-gray-600 mb-10 rounded shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-auto"></div> 
//                 <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Screen ({selectedShowtime.hall?.name})</p>
                
//                 <div className="inline-block mx-auto">
//                     <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedShowtime.hall?.columns || 8}, minmax(40px, 1fr))` }}>
//                         {Array.from({ length: selectedShowtime.hall?.rows || 5 }).map((_, rowIndex) => (
//                             Array.from({ length: selectedShowtime.hall?.columns || 8 }).map((_, colIndex) => {
//                                 const seatId = `${getRowLabel(rowIndex)}${colIndex + 1}`;
//                                 const isBooked = occupiedSeats.includes(seatId);
//                                 const isSelected = selectedSeats.includes(seatId);
                                
//                                 return (
//                                     <button
//                                         key={seatId}
//                                         onClick={() => toggleSeat(seatId)}
//                                         disabled={isBooked}
//                                         className={`h-10 w-full rounded-t-lg text-xs font-bold transition-all border border-white/5 
//                                             ${isBooked ? 'bg-red-900/50 text-red-500 cursor-not-allowed border-red-900' 
//                                             : isSelected ? 'bg-green-500 text-white transform scale-110 shadow-lg border-green-400' 
//                                             : 'bg-gray-700 hover:bg-gray-600 text-gray-400'}`}
//                                     >
//                                         {seatId}
//                                     </button>
//                                 );
//                             })
//                         ))}
//                     </div>
//                 </div>
                
//                 <div className="flex justify-center gap-6 mt-6 text-xs text-gray-400">
//                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-700 rounded"></div> Available</div>
//                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Selected</div>
//                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-900/50 border border-red-900 rounded"></div> Booked</div>
//                 </div>
//             </div>
//         ) : (
//             <div className="flex-grow flex items-center justify-center bg-black/20 rounded-xl border border-dashed border-gray-700 text-gray-500">
//                 <div className="text-center">
//                     <Grid size={40} className="mx-auto mb-2 opacity-30"/>
//                     <p>Select a movie & showtime to load seat plan</p>
//                 </div>
//             </div>
//         )}
//       </div>

//       {/* RIGHT: BILLING */}
//       <div className="w-full lg:w-96 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 h-fit">
//         <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Billing Details</h2>
//         <form onSubmit={handleBooking} className="space-y-4">
//             <div>
//                 <label className="text-xs text-gray-400 uppercase">Customer Name</label>
//                 <div className="relative mt-1">
//                     <User className="absolute left-3 top-3 text-gray-500" size={16}/>
//                     <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 pl-10 text-white focus:border-yellow-500 outline-none" placeholder="Enter Name" />
//                 </div>
//             </div>
//             <div>
//                 <label className="text-xs text-gray-400 uppercase">Phone Number</label>
//                 <div className="relative mt-1">
//                     <Phone className="absolute left-3 top-3 text-gray-500" size={16}/>
//                     <input type="text" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 pl-10 text-white focus:border-yellow-500 outline-none" placeholder="07x xxxxxxx" />
//                 </div>
//             </div>
            
//             <div className="bg-black/30 p-4 rounded-lg mt-6 space-y-2">
//                 <div className="flex justify-between text-gray-400 text-sm"><span>Hall</span><span className="text-white font-bold">{selectedShowtime?.hall?.name || '-'}</span></div>
//                 {/* 👇 showTime */}
//                 <div className="flex justify-between text-gray-400 text-sm"><span>Time</span><span className="text-white font-bold">{selectedShowtime?.showTime || '-'}</span></div>
//                 <div className="flex justify-between text-gray-400 text-sm"><span>Seats ({selectedSeats.length})</span><span>{selectedSeats.join(', ')}</span></div>
//                 <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700"><span>Total</span><span className="text-yellow-500">LKR {selectedSeats.length * SEAT_PRICE}</span></div>
//             </div>

//             <button type="submit" disabled={loading || selectedSeats.length === 0} className={`w-full py-4 rounded-xl font-bold text-lg mt-4 transition-all flex items-center justify-center gap-2 ${selectedSeats.length > 0 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>{loading ? 'Processing...' : '💵 Collect Cash'}</button>
//         </form>
//       </div>

//     </div>
//   );
// };

// export default CounterBooking;


import React, { useState, useEffect } from 'react';
import { getMovies } from '../../services/movie'; 
import { getShowtimes } from '../../services/showtime'; 
// 👇 මෙතන නම 'getOccupiedSeats' ලෙස වෙනස් කර ඇත (ඔබේ service එකට අනුව)
import { createCounterBookingApi, getOccupiedSeats } from '../../services/booking'; 
import { Monitor, User, Phone, CheckCircle, Printer, Calendar, Clock, MapPin, Grid, AlertCircle } from 'lucide-react';

const SEAT_PRICE = 1000;

const CounterBooking: React.FC = () => {
  
  // --- Helpers ---
  // දිනය Local Timezone එකට අනුව YYYY-MM-DD විදියට ගන්න Function එක
  const formatDateLocal = (dateString: string | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // --- States ---
  const [movies, setMovies] = useState<any[]>([]);
  const [availableShowtimes, setAvailableShowtimes] = useState<any[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]); // 🔴 Booked Seats
  
  // Selection States
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [selectedDate] = useState<string>(formatDateLocal(new Date())); // Today (Fixed)
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null); 
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Green Seats

  // Form States
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  // 1. Movies Load කිරීම
  useEffect(() => {
    getMovies().then(data => {
        if(Array.isArray(data)) setMovies(data);
        else setMovies(data.data || []);
    });
  }, []);

  // 2. Movie එක තේරුවාම -> අද දවසට අදාළ Showtimes ෆිල්ටර් කිරීම
  useEffect(() => {
    if (selectedMovie) {
        setAvailableShowtimes([]);
        setSelectedShowtime(null);
        setSelectedSeats([]);
        setOccupiedSeats([]); // Reset occupied seats
        
        getShowtimes(selectedMovie._id)
            .then(data => {
                const todayShows = data.filter((show: any) => {
                    // Backend එකේ showDate format එක අනුව මෙය සසඳන්න
                    return show.showDate === selectedDate; 
                });
                setAvailableShowtimes(todayShows);
            })
            .catch(err => console.error("Error loading showtimes:", err));
    }
  }, [selectedMovie]); 

  // 3. Showtime එක Click කළාම -> Book වී ඇති Seats ලබාගැනීම (UPDATED LOGIC)
  useEffect(() => {
    if (selectedShowtime && selectedMovie) {
        setLoading(true);
        const hallId = selectedShowtime.hall?._id || selectedShowtime.hall; 

        console.log("Fetching seats for:", {
            movie: selectedMovie._id,
            date: selectedDate,
            time: selectedShowtime.showTime,
            hall: hallId
        });

        // 👇 ඔබ දුන් logic එක මෙතන ක්‍රියාත්මක වේ
        getOccupiedSeats(selectedMovie._id, selectedDate, selectedShowtime.showTime, hallId)
            .then(seats => {
                console.log("Occupied Seats Received:", seats);
                setOccupiedSeats(seats); // රතු පාට වෙන්න ඕන සීට් ටික state එකට දානවා
            })
            .catch(err => {
                console.error("Error fetching occupied seats:", err);
                setOccupiedSeats([]);
            })
            .finally(() => setLoading(false));
    }
  }, [selectedShowtime]);

  // Seat Select Logic
  const toggleSeat = (seatNo: string) => {
    // 🔴 Booked නම් Click කරන්න දෙන්න එපා
    if (occupiedSeats.includes(seatNo)) return; 
    
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNo));
    } else {
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };

  // Submit Booking
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShowtime || selectedSeats.length === 0) return alert("Please select seats.");

    if(confirm(`Confirm cash payment of LKR ${selectedSeats.length * SEAT_PRICE}?`)) {
        setLoading(true);
        try {
            const res = await createCounterBookingApi({
                movieId: selectedMovie._id,
                hallId: selectedShowtime.hall._id || selectedShowtime.hall,
                date: selectedDate,
                time: selectedShowtime.showTime,
                seats: selectedSeats,
                totalPrice: selectedSeats.length * SEAT_PRICE,
                guestName,
                guestPhone
            });
            
            setSuccessData(res.booking);
            
            // Reset Form & Update Grid immediately
            setSelectedSeats([]);
            setGuestName('');
            setGuestPhone('');
            // අලුතෙන් බුක් කරපු ටිකත් Occupied ලිස්ට් එකට දානවා (Refresh නොකර පෙනෙන්න)
            setOccupiedSeats([...occupiedSeats, ...selectedSeats]);
            
        } catch (error) {
            alert("Booking Failed! Please try again.");
        } finally {
            setLoading(false);
        }
    }
  };

  const getRowLabel = (index: number) => String.fromCharCode(65 + index);

  // Success Receipt View
  if (successData) {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
                <div className="flex justify-center mb-4"><CheckCircle size={60} className="text-green-600"/></div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6 font-bold">{selectedShowtime?.hall?.name} | {selectedShowtime?.showTime}</p>
                <div className="bg-gray-100 p-4 rounded-lg text-left text-sm space-y-2 mb-6 border border-dashed border-gray-400">
                    <p><strong>Movie:</strong> {selectedMovie?.title}</p>
                    <p><strong>Seats:</strong> {successData.seats.join(', ')}</p>
                    <p><strong>Amount:</strong> LKR {successData.totalPrice}</p>
                </div>
                <button onClick={() => window.print()} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"><Printer size={18}/> Print Ticket</button>
                <button onClick={() => setSuccessData(null)} className="w-full mt-2 text-gray-500 hover:text-black py-2 text-sm font-bold">New Booking</button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col lg:flex-row gap-6">
      
      {/* LEFT: SELECTION & GRID */}
      <div className="flex-grow bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
        <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
            <Monitor /> POS / Counter Booking
        </h2>
        
        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-black/30 p-4 rounded-xl border border-gray-700">
            <div>
                <label className="text-xs text-gray-400 uppercase mb-1 block">1. SELECT MOVIE</label>
                <select 
                    value={selectedMovie?._id || ''} 
                    onChange={e => setSelectedMovie(movies.find(m => m._id === e.target.value))} 
                    className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg p-3 outline-none"
                >
                    <option value="">-- Choose Movie --</option>
                    {movies.map(m => (
                        <option key={m._id} value={m._id}>{m.title}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-xs text-gray-400 uppercase mb-1 block">2. DATE (TODAY)</label>
                <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-3 text-gray-500"/>
                    <input type="text" value={selectedDate} readOnly className="w-full bg-gray-800 text-gray-400 border border-gray-700 rounded-lg p-3 pl-10 cursor-not-allowed font-bold" />
                </div>
            </div>
        </div>

        {/* SHOWTIMES */}
        {selectedMovie && (
            <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 flex items-center gap-2"><Clock size={16}/> 3. Select Showtime</label>
                <div className="flex gap-3 flex-wrap">
                    {availableShowtimes.length > 0 ? availableShowtimes.map(show => (
                        <button
                            key={show._id}
                            onClick={() => setSelectedShowtime(show)}
                            className={`px-4 py-3 rounded-lg border text-sm font-bold transition-all flex flex-col items-center min-w-[120px]
                                ${selectedShowtime?._id === show._id 
                                    ? 'bg-yellow-500 text-black border-yellow-500 transform scale-105 shadow-lg' 
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
                        >
                            <span className="text-lg">{show.showTime}</span>
                            <span className="text-[10px] opacity-80 font-normal uppercase flex items-center gap-1 mt-1">
                                <MapPin size={10}/> {show.hall?.name || 'Main Hall'}
                            </span>
                        </button>
                    )) : (
                        <div className="flex items-center gap-2 text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
                            <AlertCircle size={16} /> No showtimes found for today.
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* SEAT GRID */}
        {selectedShowtime ? (
            <div className="bg-black/50 p-8 rounded-xl border border-gray-700 text-center overflow-auto flex-grow flex flex-col justify-center relative animate-fade-in">
                {loading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-xl">
                        <span className="text-yellow-500 animate-pulse">Loading Seats...</span>
                    </div>
                )}

                <div className="w-2/3 h-2 bg-gray-600 mb-10 rounded shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-auto"></div> 
                <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Screen ({selectedShowtime.hall?.name})</p>
                
                <div className="inline-block mx-auto">
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedShowtime.hall?.columns || 8}, minmax(40px, 1fr))` }}>
                        {Array.from({ length: selectedShowtime.hall?.rows || 5 }).map((_, rowIndex) => (
                            Array.from({ length: selectedShowtime.hall?.columns || 8 }).map((_, colIndex) => {
                                const seatId = `${getRowLabel(rowIndex)}${colIndex + 1}`;
                                const isBooked = occupiedSeats.includes(seatId); // 🔴 Check if booked
                                const isSelected = selectedSeats.includes(seatId);
                                
                                return (
                                    <button
                                        key={seatId}
                                        onClick={() => toggleSeat(seatId)}
                                        disabled={isBooked} // 🚫 Disable click
                                        className={`h-10 w-full rounded-t-lg text-xs font-bold transition-all border border-white/5 
                                            ${isBooked 
                                                ? 'bg-red-900/50 text-red-500 cursor-not-allowed border-red-900' // Red for Occupied
                                                : isSelected 
                                                    ? 'bg-green-500 text-white transform scale-110 shadow-lg border-green-400' 
                                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-400'}`}
                                    >
                                        {seatId}
                                    </button>
                                );
                            })
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-center gap-6 mt-6 text-xs text-gray-400">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-700 rounded"></div> Available</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Selected</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-900/50 border border-red-900 rounded"></div> Booked</div>
                </div>
            </div>
        ) : (
            <div className="flex-grow flex items-center justify-center bg-black/20 rounded-xl border border-dashed border-gray-700 text-gray-500">
                <div className="text-center">
                    <Grid size={40} className="mx-auto mb-2 opacity-30"/>
                    <p>Select a movie & showtime to load seat plan</p>
                </div>
            </div>
        )}
      </div>

      {/* RIGHT: BILLING */}
      <div className="w-full lg:w-96 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 h-fit">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Billing Details</h2>
        <form onSubmit={handleBooking} className="space-y-4">
            <div>
                <label className="text-xs text-gray-400 uppercase">Customer Name</label>
                <div className="relative mt-1">
                    <User className="absolute left-3 top-3 text-gray-500" size={16}/>
                    <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 pl-10 text-white focus:border-yellow-500 outline-none" placeholder="Enter Name" />
                </div>
            </div>
            <div>
                <label className="text-xs text-gray-400 uppercase">Phone Number</label>
                <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 text-gray-500" size={16}/>
                    <input type="text" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 pl-10 text-white focus:border-yellow-500 outline-none" placeholder="07x xxxxxxx" />
                </div>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg mt-6 space-y-2">
                <div className="flex justify-between text-gray-400 text-sm"><span>Hall</span><span className="text-white font-bold">{selectedShowtime?.hall?.name || '-'}</span></div>
                <div className="flex justify-between text-gray-400 text-sm"><span>Time</span><span className="text-white font-bold">{selectedShowtime?.showTime || '-'}</span></div>
                <div className="flex justify-between text-gray-400 text-sm"><span>Seats ({selectedSeats.length})</span><span>{selectedSeats.join(', ')}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700"><span>Total</span><span className="text-yellow-500">LKR {selectedSeats.length * SEAT_PRICE}</span></div>
            </div>

            <button type="submit" disabled={loading || selectedSeats.length === 0} className={`w-full py-4 rounded-xl font-bold text-lg mt-4 transition-all flex items-center justify-center gap-2 ${selectedSeats.length > 0 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>{loading ? 'Processing...' : '💵 Collect Cash'}</button>
        </form>
      </div>

    </div>
  );
};

export default CounterBooking;