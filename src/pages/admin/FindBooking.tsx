import React, { useState } from 'react';
import { searchBookingsApi } from '../../services/booking';
import axios from 'axios';
import { Search, Printer, Calendar, Clock, User, Phone, Trash2, AlertTriangle } from 'lucide-react';

const FindBooking: React.FC = () => {
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Search Handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await searchBookingsApi(query);
      setBookings(data);
    } catch (error) {
      console.error("Search failed", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Cancel Handler (New Feature)
  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`);
      
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'Cancelled' } 
            : booking
        )
      );

      alert("Booking Cancelled Successfully!");

    } catch (error) {
      console.error("Cancellation failed", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      
      <h1 className="text-3xl font-bold text-yellow-500 mb-2 flex items-center gap-3">
        <Search size={32}/> Find & Manage Booking
      </h1>
      <p className="text-gray-400 mb-8">Search by Phone Number, Email, or Booking ID to manage tickets.</p>

      {/* 1. SEARCH BAR */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-10 max-w-2xl">
        <div className="relative w-full">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input 
                type="text" 
                placeholder="Enter Phone, Email, or Booking ID..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-yellow-500 outline-none text-lg"
            />
        </div>
        <button 
            type="submit" 
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl transition-all"
        >
            {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* 2. RESULTS AREA */}
      <div className="space-y-4">
        
        {/* No Results */}
        {searched && bookings.length === 0 && !loading && (
            <div className="text-center py-10 bg-gray-800 rounded-xl border border-dashed border-gray-700">
                <p className="text-gray-400 text-lg">No bookings found for "{query}"</p>
            </div>
        )}

        {/* Results List */}
        {bookings.map((booking) => (
            <div key={booking._id} className={`p-6 rounded-2xl border shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all
                ${booking.status === 'Cancelled' ? 'bg-gray-800/50 border-gray-700 opacity-70' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}>
                
                {/* Info Left */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                        {booking.movie?.title || 'Unknown Movie'}
                        {booking.status === 'Cancelled' && (
                            <span className="text-xs bg-red-900 text-red-200 px-2 py-1 rounded border border-red-700">CANCELLED</span>
                        )}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                        <span className="flex items-center gap-1"><Calendar size={14} className="text-yellow-500"/> {new Date(booking.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock size={14} className="text-yellow-500"/> {booking.time}</span>
                        <span className="flex items-center gap-1 text-white bg-gray-700 px-2 py-0.5 rounded">{booking.hall?.name}</span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-gray-700">
                            <User size={14} className="text-blue-400"/> 
                            {booking.user?.username || booking.guestInfo?.name || 'Guest'}
                        </div>
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-gray-700">
                            <Phone size={14} className="text-green-400"/> 
                            {booking.user?.phone || booking.guestInfo?.phone || 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Seats & Actions Right */}
                <div className="flex flex-col items-end gap-3 min-w-[200px]">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase">Seats</p>
                        <p className={`text-xl font-bold ${booking.status === 'Cancelled' ? 'text-gray-500 line-through' : 'text-yellow-500'}`}>
                            {booking.seats.join(', ')}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                        
                        {/* Print Button (Only if NOT cancelled) */}
                        {booking.status !== 'Cancelled' && (
                            <button 
                                onClick={handlePrint}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                            >
                                <Printer size={16}/> Print
                            </button>
                        )}

                        {/* Cancel Button (New Feature) */}
                        {booking.status !== 'Cancelled' ? (
                            <button 
                                onClick={() => handleCancel(booking._id)}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all border border-red-700"
                            >
                                <Trash2 size={16}/> Cancel
                            </button>
                        ) : (
                            <div className="flex items-center gap-1 text-red-500 text-sm font-semibold bg-red-900/20 px-3 py-2 rounded-lg border border-red-900">
                                <AlertTriangle size={14} /> Refunded
                            </div>
                        )}

                    </div>
                </div>

            </div>
        ))}

      </div>
    </div>
  );
};

export default FindBooking;