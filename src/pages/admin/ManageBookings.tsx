import React, { useEffect, useState } from 'react';
import { getAllBookings, cancelBooking } from '../../services/booking';
import { Search, Trash2, Calendar, User, Film, MapPin, CheckCircle } from 'lucide-react';

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Search Function 
  useEffect(() => {
    const results = bookings.filter((booking) =>
      booking.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movie?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(results);
  }, [searchTerm, bookings]);

  // 3. Cancel Booking Handler
  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to CANCEL this booking? This will free up the seats.")) {
      try {
        await cancelBooking(id);
        alert("Booking cancelled successfully!");
        fetchBookings(); 
      } catch (error) {
        alert("Failed to cancel booking.");
      }
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Bookings...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🎟️ Manage Bookings
            </h1>
            <p className="text-gray-400 text-sm">View and manage all customer reservations.</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
             <span className="text-gray-400 text-sm">Total Bookings:</span> <span className="text-white font-bold ml-2">{bookings.length}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by User, Movie or Booking ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Bookings Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Movie Info</th>
                  <th className="p-4">Showtime</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-700">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-700/30 transition">
                    
                    {/* ID */}
                    <td className="p-4 font-mono text-xs text-gray-500">
                        #{booking._id.slice(-6).toUpperCase()}
                    </td>

                    {/* User */}
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-700 p-1.5 rounded-full"><User size={14}/></div>
                            <div>
                                <p className="font-bold text-white">{booking.user?.username || 'Unknown'}</p>
                                <p className="text-xs text-gray-500">{booking.user?.email}</p>
                            </div>
                        </div>
                    </td>

                    {/* Movie */}
                    <td className="p-4">
                        <div className="flex items-center gap-2 text-blue-300">
                            <Film size={16}/> {booking.movie?.title || 'Unknown'}
                        </div>
                    </td>

                    {/* Date/Time */}
                    <td className="p-4">
                        <div className="text-gray-300 flex flex-col gap-1">
                            <span className="flex items-center gap-1 text-xs"><Calendar size={12}/> {booking.date}</span>
                            <span className="text-xs font-bold bg-gray-700 px-2 py-0.5 rounded w-fit">{booking.time}</span>
                            <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12}/> {booking.hall?.name}</span>
                        </div>
                    </td>

                    {/* Seats */}
                    <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                            {booking.seats.map((seat: string) => (
                                <span key={seat} className="bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded text-xs border border-blue-800">
                                    {seat}
                                </span>
                            ))}
                        </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4 font-bold text-yellow-400">
                        LKR {booking.totalPrice}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20 w-fit">
                            <CheckCircle size={12} /> Paid
                        </span>
                    </td>

                    {/* Action (Cancel) */}
                    <td className="p-4 text-center">
                        <button 
                            onClick={() => handleCancel(booking._id)}
                            className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition border border-red-600/30"
                            title="Cancel Booking"
                        >
                            <Trash2 size={18} />
                        </button>
                    </td>

                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageBookings;