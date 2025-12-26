import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../services/booking';
import { generateTicketPDF } from '../utils/pdfGenerator';
import { CreditCard, Lock, CheckCircle, Loader2, Home } from 'lucide-react';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5); 

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    let timer: any;
    if (showSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showSuccess && countdown === 0) {
      navigate('/');
    }
    return () => clearInterval(timer);
  }, [showSuccess, countdown, navigate]);

  if (!bookingData) {
    return <div className="text-white text-center mt-20">No booking details found.</div>;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await createBooking(bookingData);
        
        await generateTicketPDF({
            bookingId: response.booking._id,
            movieTitle: bookingData.movieTitle,
            hallName: bookingData.hallName,
            date: bookingData.date,
            time: bookingData.time,
            seats: bookingData.seats,
            price: bookingData.totalPrice,
            paymentDate: new Date().toLocaleDateString()
        });

        setLoading(false);
        setShowSuccess(true);

      } catch (error) {
        alert('Payment Failed! Please try again.');
        setLoading(false);
        console.error(error);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-green-500/30 p-8 max-w-sm w-full text-center relative overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10 animate-bounce" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-400 text-sm mb-6">
                    Your ticket has been <b>sent to your email</b> and <b>downloaded</b> automatically.
                </p>

                <div className="bg-gray-900/50 rounded-lg p-3 mb-6 border border-gray-700">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Redirecting to Home</p>
                    <p className="text-xl font-mono text-yellow-400 font-bold">00:0{countdown}</p>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition flex items-center justify-center gap-2"
                >
                    <Home size={18} /> Go Home Now
                </button>
            </div>
        </div>
      )}


      <div className={`w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700 transition-opacity duration-500 ${showSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        <div className="md:w-1/3 bg-gray-900 p-8 border-r border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-blue-400">Order Summary</h2>
          <div className="space-y-4 text-sm text-gray-300">
             <div><p className="text-gray-500 text-xs uppercase">Movie</p><p className="font-bold text-white text-lg">{bookingData.movieTitle}</p></div>
             <div><p className="text-gray-500 text-xs uppercase">Cinema</p><p className="font-bold text-white">{bookingData.hallName}</p></div>
             <div className="flex justify-between">
                <div><p className="text-gray-500 text-xs uppercase">Date</p><p className="font-bold text-white">{bookingData.date}</p></div>
                <div><p className="text-gray-500 text-xs uppercase">Time</p><p className="font-bold text-white">{bookingData.time}</p></div>
             </div>
             <div><p className="text-gray-500 text-xs uppercase">Seats</p><p className="font-mono text-green-400 font-bold">{bookingData.seats.join(', ')}</p></div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-4">
             <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-yellow-400">LKR {bookingData.totalPrice}</span>
             </div>
          </div>
        </div>

        <div className="md:w-2/3 p-8 relative">
           {loading && (
             <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white">
                <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
                <p className="animate-pulse">Processing Payment...</p>
             </div>
           )}

           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Details</h2>
              <div className="bg-white/10 p-1 rounded"><CreditCard size={24} /></div>
           </div>

           <form onSubmit={handlePayment} className="space-y-6">
              <div>
                 <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                 <div className="relative">
                    <input type="text" maxLength={19} placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-12 focus:border-blue-500 outline-none font-mono" required />
                    <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-center focus:border-blue-500 outline-none" required />
                 </div>
                 <div>
                    <label className="block text-sm text-gray-400 mb-2">CVC / CVV</label>
                    <div className="relative">
                        <input type="password" maxLength={3} placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-10 focus:border-blue-500 outline-none" required />
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                 </div>
              </div>
              <div>
                 <label className="block text-sm text-gray-400 mb-2">Cardholder Name</label>
                 <input type="text" placeholder="ENTER NAME" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none" required />
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition shadow-lg mt-2">
                 Pay LKR {bookingData.totalPrice}
              </button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;