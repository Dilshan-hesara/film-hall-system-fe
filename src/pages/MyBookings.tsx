import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../services/booking';
import { useNavigate } from 'react-router-dom';

// Types define කරමු (Typescript නිසා)
interface Booking {
  _id: string;
  movie: { title: string; posterUrl: string };
  hall: { name: string };
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;

      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const data = await getUserBookings(user._id);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div className="text-white text-center mt-20">Loading tickets...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center border-b border-gray-700 pb-4">My Tickets</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-xl">You haven't booked any tickets yet.</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 text-white"
          >
            Explore Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col hover:border-blue-500 transition-all">
              
              {/* Ticket Header (Movie Image & Title) */}
              <div className="relative h-40">
                <img 
                  src={booking.movie?.posterUrl} 
                  alt={booking.movie?.title} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white shadow-md">{booking.movie?.title}</h3>
                  <p className="text-sm text-blue-400">{booking.hall?.name}</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400 text-sm">Date</span>
                  <span className="font-semibold">{booking.date}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400 text-sm">Time</span>
                  <span className="font-semibold">{booking.time}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400 text-sm">Seats</span>
                  <span className="font-mono text-green-400 font-bold">
                    {booking.seats.join(', ')}
                  </span>
                </div>
                
                {/* QR Code Placeholder (ලස්සනට පේන්න) */}
                <div className="flex justify-between items-center pt-2">
                   <div>
                      <p className="text-xs text-gray-500">Booking ID</p>
                      <p className="text-xs font-mono text-gray-300">#{booking._id.slice(-6).toUpperCase()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xl font-bold text-white">LKR {booking.totalPrice}</p>
                   </div>
                </div>

                {/* Status Badge */}
                <div className="mt-2 text-center bg-green-900/50 text-green-400 text-xs py-1 rounded border border-green-800">
                  CONFIRMED
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;