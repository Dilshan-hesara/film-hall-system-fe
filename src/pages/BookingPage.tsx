// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getOccupiedSeats, createBooking } from '../services/booking';
// import { useSearchParams } from 'react-router-dom'; // මේක import කරන්න
// const ROWS = ['A', 'B', 'C', 'D', 'E'];
// const SEATS_PER_ROW = 8;
// const TICKET_PRICE = 1500;


// // const BookingPage: React.FC = () => {
// //   const { movieId } = useParams();
// //   const [searchParams] = useSearchParams(); // URL Params කියවන්න

// //   // Default අගයන් විදියට URL එකෙන් එන ඒවා ගන්න
// //   const [date, setDate] = useState(searchParams.get('date') || '');
// //   const [time, setTime] = useState(searchParams.get('time') || '');

// const BookingPage: React.FC = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//     const [searchParams] = useSearchParams(); // URL Params කියවන්න


//   // States
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
//   // const [date, setDate] = useState('2025-10-25');
//   // const [time, setTime] = useState('10:30 AM'); 
//     const [date, setDate] = useState(searchParams.get('date') || '');
//   const [time, setTime] = useState(searchParams.get('time') || '');

//   useEffect(() => {
//     const fetchSeats = async () => {
//       if (movieId) {
//         try {
//           const takenSeats = await getOccupiedSeats(movieId, date, time);
//           setOccupiedSeats(takenSeats);
//           setSelectedSeats([]); 
//         } catch (error) {
//           console.error("Failed to fetch seats", error);
//         }
//       }
//     };
//     fetchSeats();
//   }, [movieId, date, time]); 

//   const handleSeatClick = (seatId: string) => {
//     if (occupiedSeats.includes(seatId)) return; // Book

//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seatId)); // Deselect
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]); // Select
//     }
//   };

//   const handleConfirmBooking = async () => {
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     if (!user) {
//       alert("Please login first!");
//       navigate('/login');
//       return;
//     }

//     try {
//       await createBooking({
//         userId: user._id, 
//         movieId,
//         date,
//         time,
//         seats: selectedSeats,
//         totalPrice: selectedSeats.length * TICKET_PRICE,
//       });

//       alert("Booking Successful!");
//       navigate('/'); // 
//     } catch (error) {
//       alert("Booking Failed! Some seats might be taken.");
//       // Refresh seats
//       const takenSeats = await getOccupiedSeats(movieId!, date, time);
//       setOccupiedSeats(takenSeats);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      
//       <h2 className="text-3xl font-bold mb-6 text-blue-400">Select Seats</h2>

//       {/* Selectors (Date & Time) */}
//       <div className="flex gap-4 mb-8">
//         <select 
//           className="bg-gray-800 p-2 rounded border border-gray-600"
//           value={time} onChange={(e) => setTime(e.target.value)}
//         >
//           <option>10:30 AM</option>
//           <option>01:30 PM</option>
//           <option>04:30 PM</option>
//           <option>07:30 PM</option>
//         </select>
//         <input 
//           type="date" 
//           className="bg-gray-800 p-2 rounded border border-gray-600"
//           value={date} onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {/* Screen */}
//       <div className="w-full max-w-lg mb-8">
//         <div className="w-full h-12 bg-gradient-to-t from-blue-500/50 to-transparent rounded-t-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
//         <p className="text-center text-xs text-gray-500 mt-2 tracking-[0.5em]">SCREEN</p>
//       </div>

//       {/* Seat Grid */}
//       <div className="flex flex-col gap-3 mb-10">
//         {ROWS.map((row) => (
//           <div key={row} className="flex gap-3 justify-center">
//             {Array.from({ length: SEATS_PER_ROW }).map((_, index) => {
//               const seatId = `${row}${index + 1}`;
//               const isOccupied = occupiedSeats.includes(seatId);
//               const isSelected = selectedSeats.includes(seatId);

//               return (
//                 <div
//                   key={seatId}
//                   onClick={() => handleSeatClick(seatId)}
//                   className={`
//                     w-10 h-10 rounded-t-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 border-b-4
//                     ${isOccupied 
//                       ? 'bg-red-600 border-red-800 text-white/50 cursor-not-allowed' 
//                       : isSelected 
//                         ? 'bg-green-500 border-green-700 text-white scale-110 shadow-lg' 
//                         : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'}
//                   `}
//                 >
//                   {seatId}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       {/* Summary Box */}
//       <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700 shadow-xl">
//         <div className="flex justify-between mb-2">
//           <span className="text-gray-400">Seats:</span>
//           <span className="text-green-400 font-mono">{selectedSeats.join(', ') || '-'}</span>
//         </div>
//         <div className="flex justify-between mb-6 text-xl font-bold">
//           <span>Total:</span>
//           <span>LKR {selectedSeats.length * TICKET_PRICE}</span>
//         </div>
//         <button
//           onClick={handleConfirmBooking}
//           disabled={selectedSeats.length === 0}
//           className={`w-full py-3 rounded-lg font-bold transition-all
//             ${selectedSeats.length === 0 
//               ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}
//           `}
//         >
//           Confirm Booking
//         </button>
//       </div>

//     </div>
//   );
// };

// export default BookingPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { getOccupiedSeats, createBooking } from '../services/booking';
// import { getHallById } from '../services/hall';

// const BookingPage: React.FC = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // URL Params - මේවා State එකේ තියාගන්නවා
//   const [date, setDate] = useState(searchParams.get('date') || '');
//   const [time, setTime] = useState(searchParams.get('time') || '');
//   const [hallId, setHallId] = useState(searchParams.get('hallId') || '');
//   const [ticketPrice, setTicketPrice] = useState(Number(searchParams.get('price')) || 0);

//   // States
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  
//   // Dynamic Rows & Columns
//   const [hallRows, setHallRows] = useState(0); 
//   const [hallCols, setHallCols] = useState(0);
//   const [hallName, setHallName] = useState('');
//   const [loading, setLoading] = useState(true);

//   // 1. Data Fetching Effect
//   useEffect(() => {
//     // URL එක වෙනස් වුණොත් අලුත් අගයන් State එකට දාගන්නවා (Safety Fix)
//     const currentPrice = Number(searchParams.get('price')) || 0;
//     setTicketPrice(currentPrice);
//     setDate(searchParams.get('date') || '');
//     setTime(searchParams.get('time') || '');
//     setHallId(searchParams.get('hallId') || '');

//     const fetchData = async () => {
//       const currentHallId = searchParams.get('hallId');
      
//       if (movieId && currentHallId) {
//         try {
//           setLoading(true);
//           // A. Hall එකේ විස්තර (Layout) ගන්න
//           const hallData = await getHallById(currentHallId);
//           setHallRows(hallData.rows);
//           setHallCols(hallData.columns);
//           setHallName(hallData.name);

//           // B. Occupied Seats ගන්න
//           const takenSeats = await getOccupiedSeats(movieId!, searchParams.get('date') || '', searchParams.get('time') || '', currentHallId);
//           setOccupiedSeats(takenSeats);
          
//           // Hall එක මාරු වුණොත් select කරපු seats අයින් කරන්න
//           setSelectedSeats([]);

//           console.log("Fetching seats for:", { movieId, date, time, hallId });

//           // const takenSeats = await getOccupiedSeats(movieId, date, time, hallId);
          
//           // 👇 මේ Log එක දාන්න: Backend එකෙන් එන දත්ත මොනවද?
//           console.log("Occupied Seats Received:", takenSeats);

//           setOccupiedSeats(takenSeats);

          
          
//         } catch (error) {
//           console.error("Failed to load data", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//   }, [movieId, searchParams]); // searchParams වෙනස් වෙනකොට මේක දුවනවා

//   // Row Letter Generator (0 -> A, 1 -> B)
//   const getRowLabel = (index: number) => {
//     return String.fromCharCode(65 + index);
//   };

//   // Seat Click Handler
//   const handleSeatClick = (seatId: string) => {
//     if (occupiedSeats.includes(seatId)) return;

//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   // 👇 MISSING FUNCTION එක මෙන්න (මේක අනිවාර්යයි)
//   const handleConfirmBooking = async () => {
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     if (!user) {
//       alert("Please login first!");
//       navigate('/login');
//       return;
//     }

//     try {
//       await createBooking({
//         userId: user._id,
//         movieId,
//         hallId,
//         date,
//         time,
//         seats: selectedSeats,
//         totalPrice: selectedSeats.length * ticketPrice,
//       });

//       alert("Booking Successful!");
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//       alert("Booking Failed! Some seats might be taken just now.");
//     }
//   };

//   if (loading) return <div className="text-white text-center mt-20 text-xl animate-pulse">Loading Cinema Layout...</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
//       <h2 className="text-3xl font-bold mb-4 text-blue-400">Select Seats</h2>
      
//       {/* Info Box */}
//       <div className="bg-gray-800 p-4 rounded-lg w-full max-w-lg mb-6 text-sm border border-gray-700 shadow-md">
//         <div className="flex justify-between mb-2 border-b border-gray-700 pb-2">
//             <span>Movie Hall:</span> <span className="font-bold text-blue-200">{hallName}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//             <span>Date:</span> <span className="font-bold">{date}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//             <span>Time:</span> <span className="font-bold">{time}</span>
//         </div>
//         <div className="flex justify-between pt-2 border-t border-gray-700">
//             <span>Ticket Price:</span> <span className="font-bold text-yellow-400">LKR {ticketPrice}</span>
//         </div>
//       </div>

//       {/* Screen Visual */}
//       <div className="w-full max-w-2xl mb-10 perspective-1000">
//         <div className="w-full h-16 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t-[50%] shadow-[0_-10px_30px_rgba(59,130,246,0.2)] transform rotate-x-12"></div>
//         <p className="text-center text-xs text-gray-500 mt-4 tracking-[0.5em] font-light">SCREEN</p>
//       </div>

//       {/* Dynamic Seat Grid */}
//       <div className="flex flex-col gap-3 mb-12 overflow-x-auto p-4 max-w-full">
//         {Array.from({ length: hallRows }).map((_, rowIndex) => {
//           const rowLabel = getRowLabel(rowIndex);

//           return (
//             <div key={rowLabel} className="flex gap-3 justify-center min-w-max">
//               {Array.from({ length: hallCols }).map((_, colIndex) => {
//                 const seatNumber = colIndex + 1;
//                 const seatId = `${rowLabel}${seatNumber}`;
//                 const isOccupied = occupiedSeats.includes(seatId);
//                 const isSelected = selectedSeats.includes(seatId);

//                 return (
//                   <button
//                     key={seatId}
//                     onClick={() => handleSeatClick(seatId)}
//                     disabled={isOccupied}
//                     className={`
//                       w-9 h-9 md:w-10 md:h-10 rounded-t-lg text-xs md:text-sm font-bold transition-all duration-200 border-b-2
//                       ${isOccupied 
//                         ? 'bg-gray-700 border-gray-800 text-gray-500 cursor-not-allowed opacity-50' 
//                         : isSelected 
//                           ? 'bg-green-500 border-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.6)] transform scale-110 -translate-y-1' 
//                           : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-300'}
//                     `}
//                     title={isOccupied ? "Occupied" : `Seat ${seatId}`}
//                   >
//                     {seatId}
//                   </button>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>

//       {/* Booking Summary Footer */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 shadow-2xl z-50">
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="text-center md:text-left">
//                 <p className="text-gray-400 text-sm">Selected Seats:</p>
//                 <p className="text-green-400 font-mono text-lg font-bold min-h-[1.5rem]">
//                     {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
//                 </p>
//             </div>
            
//             <div className="text-center md:text-right">
//                 <p className="text-gray-400 text-sm">Total Amount:</p>
//                 <p className="text-2xl font-bold text-white">LKR {selectedSeats.length * ticketPrice}</p>
//             </div>

//             <button
//                 onClick={handleConfirmBooking}
//                 disabled={selectedSeats.length === 0}
//                 className={`px-8 py-3 rounded-lg font-bold text-lg transition-all transform
//                     ${selectedSeats.length === 0 
//                     ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
//                     : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:scale-105 active:scale-95'}
//                 `}
//             >
//                 Confirm Booking
//             </button>
//         </div>
//       </div>
      
//       {/* Footer එක නිසා යටින් ඉඩක් තියන්න */}
//       <div className="h-24"></div> 
//     </div>
//   );
// };

// export default BookingPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { getOccupiedSeats, createBooking } from '../services/booking';
// import { getHallById } from '../services/hall';
// import { getMovieById } from '../services/movie'; // 👇 Movie service එක import කරගන්න

// const BookingPage: React.FC = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // URL Params
//   const [date] = useState(searchParams.get('date') || '');
//   const [time] = useState(searchParams.get('time') || '');
//   const [hallId] = useState(searchParams.get('hallId') || '');
//   const [ticketPrice, setTicketPrice] = useState(Number(searchParams.get('price')) || 0);

//   // States for Booking
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  
//   // States for Hall Layout
//   const [hallRows, setHallRows] = useState(0); 
//   const [hallCols, setHallCols] = useState(0);
//   const [hallName, setHallName] = useState('');
  
//   // 👇 New States for Movie Info & T&C
//   const [movieTitle, setMovieTitle] = useState('');
//   const [censorRating, setCensorRating] = useState('');
//   const [showTerms, setShowTerms] = useState(true); // Default true (Popup එක පෙන්වන්න)
//   const [loading, setLoading] = useState(true);

//   // 1. Data Fetching Effect
//   useEffect(() => {
//     // Price Update Safety
//     const currentPrice = Number(searchParams.get('price')) || 0;
//     setTicketPrice(currentPrice);

//     const fetchData = async () => {
//       const currentHallId = searchParams.get('hallId');
      
//       if (movieId && currentHallId) {
//         try {
//           setLoading(true);

//           // A. Movie Details ගන්න (Title & Rating සඳහා)
//           const movieData = await getMovieById(movieId);
//           setMovieTitle(movieData.title);
//           setCensorRating(movieData.censorRating);

//           // B. Hall Layout ගන්න
//           const hallData = await getHallById(currentHallId);
//           setHallRows(hallData.rows);
//           setHallCols(hallData.columns);
//           setHallName(hallData.name);

//           // C. Occupied Seats ගන්න
//           const takenSeats = await getOccupiedSeats(movieId, searchParams.get('date') || '', searchParams.get('time') || '', currentHallId);
//           setOccupiedSeats(takenSeats);
          
//           setSelectedSeats([]);
          
//         } catch (error) {
//           console.error("Failed to load data", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//   }, [movieId, searchParams]);

//   // Helper: Censor Rating Color
//   const getRatingColor = (rating: string) => {
//     switch (rating) {
//       case 'A': return 'bg-red-600';
//       case 'UA': return 'bg-yellow-500 text-black';
//       case 'S': return 'bg-blue-600';
//       default: return 'bg-green-600'; // U
//     }
//   };

//   const getRowLabel = (index: number) => String.fromCharCode(65 + index);

//   const handleSeatClick = (seatId: string) => {
//     if (occupiedSeats.includes(seatId)) return;
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   const handleConfirmBooking = async () => {
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     if (!user) {
//       alert("Please login first!");
//       navigate('/login');
//       return;
//     }

//     try {
//       await createBooking({
//         userId: user._id,
//         movieId,
//         hallId,
//         date,
//         time,
//         seats: selectedSeats,
//         totalPrice: selectedSeats.length * ticketPrice,
//       });

//       alert("Booking Successful!");
//       navigate('/my-bookings');
//     } catch (error) {
//       console.error(error);
//       alert("Booking Failed! Some seats might be taken just now.");
//     }
//   };

//   // 👇 T&C Handlers
//   const handleAcceptTerms = () => {
//     setShowTerms(false); // Modal එක වහන්න
//   };

//   const handleRejectTerms = () => {
//     navigate('/'); // Home එකට යවන්න
//   };

//   if (loading) return <div className="text-white text-center mt-20 text-xl animate-pulse">Loading Cinema Layout...</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      
//       {/* 👇 TERMS AND CONDITIONS MODAL */}
//       {showTerms && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-gray-700">
            
//             {/* Modal Header */}
//             <div className="p-6 border-b border-gray-700">
//               <h2 className="text-2xl font-bold text-red-500 text-center">MKD Cinemas - Terms and Conditions</h2>
//               <p className="text-gray-400 text-center text-sm mt-1">Please read carefully before proceeding.</p>
//             </div>

//             {/* Modal Content (Scrollable) */}
//             <div className="p-6 overflow-y-auto text-gray-300 text-sm space-y-4 leading-relaxed custom-scrollbar">
//               <p className="font-bold">By purchasing a ticket or entering MKD Cinemas, the patron agrees to the following terms and conditions:</p>

//               <div>
//                 <h3 className="font-bold text-white mb-1">1. Censor Ratings & Age Restrictions</h3>
//                 <p>It is mandatory to adhere to the Censor Board ratings. MKD Cinemas reserves the right to refuse entry if age proof is not provided when requested.</p>
//                 <ul className="mt-2 space-y-1 ml-4">
//                   <li>🟢 <span className="font-bold">U (Universal):</span> Suitable for all age groups.</li>
//                   <li>🟡 <span className="font-bold">UA (Parental Guidance):</span> Children below 12 years should be accompanied by a parent.</li>
//                   <li>🔴 <span className="font-bold">A (Adults Only):</span> Restricted to Adults (18+). Valid ID (NIC) is mandatory. No children allowed.</li>
//                   <li>🔵 <span className="font-bold">S (Specialized):</span> Restricted to a specialized audience.</li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-white mb-1">2. Ticketing & Admissions</h3>
//                 <ul className="list-disc ml-5 space-y-1">
//                   <li>Full Ticket Required: We do not offer half-tickets. Children require a full ticket.</li>
//                   <li>Tickets once purchased are <span className="text-red-400 font-bold">non-refundable, non-exchangeable, and non-transferable.</span></li>
//                   <li>Patrons must carry a valid physical ticket or the digital booking confirmation (QR Code) for entry.</li>
//                   <li>Rights of admission are reserved. Management may deny entry to anyone under the influence of alcohol/drugs.</li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-white mb-1">3. Security & Prohibited Items</h3>
//                 <ul className="list-disc ml-5 space-y-1">
//                   <li>Security checks (frisking/bag checks) may be conducted.</li>
//                   <li>Outside food and beverages are strictly prohibited.</li>
//                   <li>Dangerous items (weapons, sharp objects) are banned.</li>
//                   <li>Recording devices are strictly forbidden inside the auditorium.</li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-white mb-1">4. Code of Conduct</h3>
//                 <p>Mobile Phones must be on silent. No Smoking/Vaping allowed. Inappropriate behavior will result in removal without refund.</p>
//               </div>
//             </div>

//             {/* Modal Footer (Buttons) */}
//             <div className="p-6 border-t border-gray-700 flex gap-4">
//               <button 
//                 onClick={handleRejectTerms}
//                 className="flex-1 py-3 rounded-lg border border-red-500 text-red-500 font-bold hover:bg-red-500/10 transition"
//               >
//                 Reject & Exit
//               </button>
//               <button 
//                 onClick={handleAcceptTerms}
//                 className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition shadow-lg"
//               >
//                 Accept & Continue
//               </button>
//             </div>

//           </div>
//         </div>
//       )}


//       {/* MAIN CONTENT */}
//       <h2 className="text-3xl font-bold mb-4 text-blue-400">Select Seats</h2>
      
//       {/* 👇 Updated Info Box with Movie Title & Rating */}
//       <div className="bg-gray-800 p-5 rounded-lg w-full max-w-lg mb-6 text-sm border border-gray-700 shadow-md relative overflow-hidden">
        
//         {/* Movie Details Header */}
//         <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-700">
//            <div>
//               <p className="text-gray-400 text-xs uppercase tracking-wider">Movie</p>
//               <h3 className="text-xl font-bold text-white">{movieTitle}</h3>
//            </div>
//            {/* Censor Rating Badge */}
//            <div className={`px-3 py-1 rounded font-bold text-white shadow-sm ${getRatingColor(censorRating)}`}>
//               {censorRating}
//            </div>
//         </div>

//         <div className="space-y-2">
//             <div className="flex justify-between">
//                 <span className="text-gray-400">Cinema Hall:</span> <span className="font-bold text-blue-200">{hallName}</span>
//             </div>
//             <div className="flex justify-between">
//                 <span className="text-gray-400">Date:</span> <span className="font-bold">{date}</span>
//             </div>
//             <div className="flex justify-between">
//                 <span className="text-gray-400">Time:</span> <span className="font-bold">{time}</span>
//             </div>
//             <div className="flex justify-between pt-2 border-t border-gray-700 mt-2">
//                 <span className="text-gray-400">Price per Ticket:</span> <span className="font-bold text-yellow-400 text-base">LKR {ticketPrice}</span>
//             </div>
//         </div>
//       </div>

//       {/* Screen Visual */}
//       <div className="w-full max-w-2xl mb-10 perspective-1000">
//         <div className="w-full h-16 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t-[50%] shadow-[0_-10px_30px_rgba(59,130,246,0.2)] transform rotate-x-12"></div>
//         <p className="text-center text-xs text-gray-500 mt-4 tracking-[0.5em] font-light">SCREEN</p>
//       </div>

//       {/* Dynamic Seat Grid */}
//       <div className="flex flex-col gap-3 mb-12 overflow-x-auto p-4 max-w-full">
//         {Array.from({ length: hallRows }).map((_, rowIndex) => {
//           const rowLabel = getRowLabel(rowIndex);
//           return (
//             <div key={rowLabel} className="flex gap-3 justify-center min-w-max">
//               {Array.from({ length: hallCols }).map((_, colIndex) => {
//                 const seatNumber = colIndex + 1;
//                 const seatId = `${rowLabel}${seatNumber}`;
//                 const isOccupied = occupiedSeats.includes(seatId);
//                 const isSelected = selectedSeats.includes(seatId);

//                 return (
//                   <button
//                     key={seatId}
//                     onClick={() => handleSeatClick(seatId)}
//                     disabled={isOccupied}
//                     className={`
//                       w-9 h-9 md:w-10 md:h-10 rounded-t-lg text-xs md:text-sm font-bold transition-all duration-200 border-b-2
//                       ${isOccupied 
//                         ? 'bg-gray-700 border-gray-800 text-gray-500 cursor-not-allowed opacity-50' 
//                         : isSelected 
//                           ? 'bg-green-500 border-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.6)] transform scale-110 -translate-y-1' 
//                           : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-300'}
//                     `}
//                     title={isOccupied ? "Occupied" : `Seat ${seatId}`}
//                   >
//                     {seatId}
//                   </button>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>

//       {/* Booking Summary Footer */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 shadow-2xl z-40">
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="text-center md:text-left">
//                 <p className="text-gray-400 text-sm">Selected Seats:</p>
//                 <p className="text-green-400 font-mono text-lg font-bold min-h-[1.5rem]">
//                     {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
//                 </p>
//             </div>
            
//             <div className="text-center md:text-right">
//                 <p className="text-gray-400 text-sm">Total Amount:</p>
//                 <p className="text-2xl font-bold text-white">LKR {selectedSeats.length * ticketPrice}</p>
//             </div>

//             <button
//                 onClick={handleConfirmBooking}
//                 disabled={selectedSeats.length === 0}
//                 className={`px-8 py-3 rounded-lg font-bold text-lg transition-all transform
//                     ${selectedSeats.length === 0 
//                     ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
//                     : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:scale-105 active:scale-95'}
//                 `}
//             >
//                 Confirm Booking
//             </button>
//         </div>
//       </div>
//       <div className="h-24"></div> 
//     </div>
//   );
// };

// export default BookingPage;

//v3