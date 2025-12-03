import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOccupiedSeats, createBooking } from '../services/booking';

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;
const TICKET_PRICE = 1500;

const BookingPage: React.FC = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // States
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [date, setDate] = useState('2025-10-25');
  const [time, setTime] = useState('10:30 AM'); 

  useEffect(() => {
    const fetchSeats = async () => {
      if (movieId) {
        try {
          const takenSeats = await getOccupiedSeats(movieId, date, time);
          setOccupiedSeats(takenSeats);
          setSelectedSeats([]); 
        } catch (error) {
          console.error("Failed to fetch seats", error);
        }
      }
    };
    fetchSeats();
  }, [movieId, date, time]); 

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return; // Book

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId)); // Deselect
    } else {
      setSelectedSeats([...selectedSeats, seatId]); // Select
    }
  };

  const handleConfirmBooking = async () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    try {
      await createBooking({
        userId: user._id, 
        movieId,
        date,
        time,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * TICKET_PRICE,
      });

      alert("Booking Successful!");
      navigate('/'); // 
    } catch (error) {
      alert("Booking Failed! Some seats might be taken.");
      // Refresh seats
      const takenSeats = await getOccupiedSeats(movieId!, date, time);
      setOccupiedSeats(takenSeats);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Select Seats</h2>

      {/* Selectors (Date & Time) */}
      <div className="flex gap-4 mb-8">
        <select 
          className="bg-gray-800 p-2 rounded border border-gray-600"
          value={time} onChange={(e) => setTime(e.target.value)}
        >
          <option>10:30 AM</option>
          <option>01:30 PM</option>
          <option>04:30 PM</option>
          <option>07:30 PM</option>
        </select>
        <input 
          type="date" 
          className="bg-gray-800 p-2 rounded border border-gray-600"
          value={date} onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Screen */}
      <div className="w-full max-w-lg mb-8">
        <div className="w-full h-12 bg-gradient-to-t from-blue-500/50 to-transparent rounded-t-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
        <p className="text-center text-xs text-gray-500 mt-2 tracking-[0.5em]">SCREEN</p>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col gap-3 mb-10">
        {ROWS.map((row) => (
          <div key={row} className="flex gap-3 justify-center">
            {Array.from({ length: SEATS_PER_ROW }).map((_, index) => {
              const seatId = `${row}${index + 1}`;
              const isOccupied = occupiedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <div
                  key={seatId}
                  onClick={() => handleSeatClick(seatId)}
                  className={`
                    w-10 h-10 rounded-t-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 border-b-4
                    ${isOccupied 
                      ? 'bg-red-600 border-red-800 text-white/50 cursor-not-allowed' 
                      : isSelected 
                        ? 'bg-green-500 border-green-700 text-white scale-110 shadow-lg' 
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'}
                  `}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700 shadow-xl">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Seats:</span>
          <span className="text-green-400 font-mono">{selectedSeats.join(', ') || '-'}</span>
        </div>
        <div className="flex justify-between mb-6 text-xl font-bold">
          <span>Total:</span>
          <span>LKR {selectedSeats.length * TICKET_PRICE}</span>
        </div>
        <button
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 rounded-lg font-bold transition-all
            ${selectedSeats.length === 0 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}
          `}
        >
          Confirm Booking
        </button>
      </div>

    </div>
  );
};

export default BookingPage;