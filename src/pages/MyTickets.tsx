import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserBookings } from '../services/booking'; 
import { generateTicketPDF } from '../utils/pdfGenerator';
import { Ticket, Calendar, MapPin, Download, Loader2 } from 'lucide-react';

const MyTickets: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Load User & Bookings
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userString);

    const fetchBookings = async () => {
      try {
        const data = await getUserBookings(user._id);
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // 2. Download Handler
  const handleDownload = (booking: any) => {
    generateTicketPDF({
        bookingId: booking._id,
        movieTitle: booking.movie?.title,
        hallName: booking.hall?.name,
        date: booking.date,
        time: booking.time,
        seats: booking.seats,
        price: booking.totalPrice,
        paymentDate: new Date(booking.createdAt).toLocaleDateString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-8 border-b border-gray-700 pb-4">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Ticket className="text-yellow-500" /> My Tickets
                </h1>
                <p className="text-gray-400 text-sm mt-1">View and download your booking history.</p>
            </div>
            <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                + Book New Ticket
            </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 className="animate-spin text-yellow-500" size={40} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed">
             <Ticket size={60} className="mx-auto text-gray-600 mb-4" />
             <h3 className="text-xl font-bold text-gray-300">No Tickets Found</h3>
             <p className="text-gray-500 mb-6">You haven't booked any movies yet.</p>
             <button 
                onClick={() => navigate('/')} 
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold transition"
             >
                Browse Movies
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col">
                
                <div className="relative h-40 overflow-hidden">
                    <img 
                        src={booking.movie?.posterUrl} 
                        alt={booking.movie?.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute bottom-3 left-4">
                        <h3 className="text-xl font-bold text-white shadow-sm truncate pr-2">{booking.movie?.title}</h3>
                    </div>
                </div>

                <div className="p-5 flex-grow">
                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-yellow-500" />
                            <span>{booking.date} <span className="text-gray-500">|</span> {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-yellow-500" />
                            <span>{booking.hall?.name}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Ticket size={16} className="text-yellow-500 mt-1" />
                            <span className="font-mono text-white bg-gray-700 px-2 py-0.5 rounded">
                                {booking.seats.join(', ')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-900 border-t border-gray-700 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                        <p className="text-lg font-bold text-yellow-400">LKR {booking.totalPrice}</p>
                    </div>
                    <button 
                        onClick={() => handleDownload(booking)}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Download size={16} /> Download
                    </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTickets;