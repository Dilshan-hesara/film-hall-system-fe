import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const [dates, setDates] = useState<{ day: string; date: string; fullDate: string }[]>([]);

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const ticketPrice = 1500;

  const showTimes = ["10:30 AM", "01:30 PM", "04:30 PM", "07:30 PM"];

  useEffect(() => {
    const generateNextThreeDays = () => {
      const daysArray = [];
      const today = new Date();
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      for (let i = 0; i < 3; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        daysArray.push({
          day: daysOfWeek[d.getDay()], 
          date: `${d.getDate()} ${months[d.getMonth()]}`, 
          fullDate: d.toISOString().split('T')[0] 
        });
      }
      setDates(daysArray);
      setSelectedDate(daysArray[0].fullDate);
    };

    generateNextThreeDays();
  }, []);

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please select Date, Time and Seats!");
      return;
    }
    alert(`Booking Confirmed!\nDate: ${selectedDate}\nTime: ${selectedTime}\nSeats: ${selectedSeats.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Book Your Tickets</h2>

      {/* --- SECTION 1: SELECT DATE --- */}
      <div className="w-full max-w-4xl mb-8">
        <h3 className="text-gray-400 mb-3 text-sm uppercase tracking-wider">Select Date</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {dates.map((item) => (
            <button
              key={item.fullDate}
              onClick={() => setSelectedDate(item.fullDate)}
              className={`
                flex flex-col items-center justify-center min-w-[100px] p-3 rounded-xl border transition-all duration-300
                ${selectedDate === item.fullDate 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                }
              `}
            >
              <span className="text-xs font-bold uppercase">{item.day}</span>
              <span className="text-lg font-bold">{item.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: SELECT TIME --- */}
      <div className="w-full max-w-4xl mb-8">
        <h3 className="text-gray-400 mb-3 text-sm uppercase tracking-wider">Select Time</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {showTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`
                py-3 rounded-lg border font-semibold transition-all duration-200
                ${selectedTime === time 
                  ? 'bg-transparent border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: THEATER SCREEN --- */}
      <div className="mb-10 w-full max-w-3xl flex flex-col items-center">
        <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded shadow-[0_0_20px_rgba(59,130,246,0.6)] mb-4"></div>
        <p className="text-gray-500 text-xs tracking-[0.3em]">SCREEN THIS WAY</p>
      </div>

      {/* --- SECTION 4: SEATS GRID --- */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 mb-8">
        <div className="grid grid-cols-8 gap-3 sm:gap-4"> 
          {rows.map((row) => (
            cols.map((col) => {
              const seatId = `${row}${col}`;
              const isSelected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  disabled={!selectedDate || !selectedTime} 
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg text-[10px] sm:text-xs font-bold transition-all duration-200
                    ${isSelected 
                      ? 'bg-green-500 text-black shadow-[0_0_15px_#22c55e] transform scale-110' 
                      : (!selectedDate || !selectedTime) 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-600 hover:bg-blue-600 text-gray-300'
                    }
                  `}
                >
                  {seatId}
                </button>
              );
            })
          ))}
        </div>
      </div>

      {/* --- SECTION 5: SUMMARY --- */}
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 fixed bottom-0 md:relative md:bottom-auto">
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="text-gray-400">
            <p>Date: <span className="text-white">{selectedDate || '-'}</span></p>
            <p>Time: <span className="text-white">{selectedTime || '-'}</span></p>
            <p>Seats: <span className="text-white">{selectedSeats.join(', ') || '-'}</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Total Price</p>
            <p className="text-2xl font-bold text-blue-400">LKR {selectedSeats.length * ticketPrice}</p>
          </div>
        </div>

        <button 
          onClick={handleBooking}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-all shadow-lg ${
            selectedSeats.length > 0 && selectedDate && selectedTime
              ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/30' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedSeats.length === 0 || !selectedDate || !selectedTime}
        >
          Confirm Booking
        </button>
      </div>

      <div className="h-32 md:hidden"></div>
    </div>
  );
};

export default Booking;