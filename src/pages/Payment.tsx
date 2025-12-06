import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../services/booking';
import { CreditCard, Lock } from 'lucide-react'; // Icons
import { generateTicketPDF } from '../utils/pdfGenerator';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state; 

  const [loading, setLoading] = useState(false);

  // කාඩ් විස්තර සඳහා States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  if (!bookingData) {
    return <div className="text-white text-center mt-20">No booking details found.</div>;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
const response = await createBooking(bookingData); 
        generateTicketPDF({
            bookingId: response.booking._id, 
            movieTitle: bookingData.movieTitle,
            hallName: bookingData.hallName,
            date: bookingData.date,
            time: bookingData.time,
            seats: bookingData.seats,
            price: bookingData.totalPrice
        });

        await createBooking(bookingData);
        alert('Payment Successful! Ticket Booked.');
        navigate('/my-bookings'); 
      } catch (error) {
        alert('Payment Failed! Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        
        {/* LEFT SIDE: ORDER SUMMARY */}
        <div className="md:w-1/3 bg-gray-900 p-8 border-r border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-blue-400">Order Summary</h2>
          
          <div className="space-y-4 text-sm text-gray-300">
             <div>
                <p className="text-gray-500 text-xs uppercase">Movie</p>
                <p className="font-bold text-white text-lg">{bookingData.movieTitle}</p>
             </div>
             <div>
                <p className="text-gray-500 text-xs uppercase">Cinema</p>
                <p className="font-bold text-white">{bookingData.hallName}</p>
             </div>
             <div className="flex justify-between">
                <div>
                    <p className="text-gray-500 text-xs uppercase">Date</p>
                    <p className="font-bold text-white">{bookingData.date}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs uppercase">Time</p>
                    <p className="font-bold text-white">{bookingData.time}</p>
                </div>
             </div>
             <div>
                <p className="text-gray-500 text-xs uppercase">Seats</p>
                <p className="font-mono text-green-400 font-bold">{bookingData.seats.join(', ')}</p>
             </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4">
             <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-yellow-400">LKR {bookingData.totalPrice}</span>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: PAYMENT FORM */}
        <div className="md:w-2/3 p-8">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Details</h2>
              <div className="flex gap-2">
                 <div className="bg-white/10 p-1 rounded"><CreditCard size={24} /></div>
              </div>
           </div>

           <form onSubmit={handlePayment} className="space-y-6">
              
              {/* Card Number */}
              <div>
                 <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                 <div className="relative">
                    <input 
                        type="text" 
                        maxLength={19}
                        placeholder="0000 0000 0000 0000" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        required
                    />
                    <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {/* Expiry Date */}
                 <div>
                    <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                    <input 
                        type="text" 
                        placeholder="MM / YY" 
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none text-center"
                        required
                    />
                 </div>
                 {/* CVC */}
                 <div>
                    <label className="block text-sm text-gray-400 mb-2">CVC / CVV</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            maxLength={3}
                            placeholder="123" 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                 </div>
              </div>

              {/* Cardholder Name */}
              <div>
                 <label className="block text-sm text-gray-400 mb-2">Cardholder Name</label>
                 <input 
                    type="text" 
                    placeholder="ENTER NAME" 
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                 />
              </div>

              <button 
                 type="submit" 
                 disabled={loading}
                 className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex justify-center items-center gap-2
                    ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'}
                 `}
              >
                 {loading ? 'Processing...' : `Pay LKR ${bookingData.totalPrice}`}
              </button>

           </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;