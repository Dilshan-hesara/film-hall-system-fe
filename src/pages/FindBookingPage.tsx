import React, { useState } from 'react';
import axios from 'axios';
import { Search, XCircle, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';

const FindBookingPage = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bookingId) return;

    setLoading(true);
    setError('');
    setBookingDetails(null);

    try {

      const res = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookingDetails(res.data);
    } catch (err) {
      setError('Booking not found. Please check the ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingDetails._id}`);
      alert("Booking Cancelled Successfully & Seats Released!");
      
      const res = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookingDetails(res.data);
      
    } catch (err) {
      alert("Error cancelling booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Search className="text-blue-500" /> Find & Manage Booking
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter Booking ID (e.g., 65a...)"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg flex items-center gap-2 mb-6">
            <XCircle size={20} /> {error}
          </div>
        )}

        {bookingDetails && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
            
            {/* Status Header */}
            <div className="flex justify-between items-start mb-6 border-b border-gray-700 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-100">Booking Details</h2>
                <p className="text-gray-400 text-sm">ID: {bookingDetails._id}</p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1
                ${bookingDetails.status === 'Cancelled' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                {bookingDetails.status === 'Cancelled' ? <XCircle size={16}/> : <CheckCircle size={16}/>}
                {bookingDetails.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Movie</p>
                <p className="text-lg font-medium">{bookingDetails.showId?.movie?.title || bookingDetails.showId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Seats</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {bookingDetails.seats.map(seat => (
                    <span key={seat} className="bg-gray-700 px-2 py-1 rounded text-sm">{seat}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-xl font-bold text-yellow-400">Rs. {bookingDetails.totalPrice || bookingDetails.amount}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Payment Method</p>
                <p className="text-white">{bookingDetails.paymentMethod}</p>
              </div>
            </div>

            {bookingDetails.status !== 'Cancelled' ? (
              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center gap-3 mb-4 text-yellow-200 text-sm">
                  <AlertTriangle size={18} />
                  <span>Warning: Cancelling this will release the seats immediately.</span>
                </div>
                
                <button
                  onClick={handleCancel}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={20} />
                  Cancel Ticket & Refund
                </button>
              </div>
            ) : (
              <div className="text-center py-4 bg-red-900/20 rounded-lg text-red-300 border border-red-900">
                This ticket has been refunded/cancelled.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default FindBookingPage;