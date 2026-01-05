import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { verifyTicketApi } from '../../services/booking';
import { QrCode, CheckCircle, XCircle, RefreshCw, User, Film, Calendar } from 'lucide-react';

const ScanTicket: React.FC = () => {
  const [data, setData] = useState<any>(null); // Scan Result Data
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('scanning');
  const [message, setMessage] = useState('');

  const handleScan = async (result: string) => {
    if (result) {
        try {
            const parsedData = JSON.parse(result);
            
            if(!parsedData.id) throw new Error("Invalid QR Code format");

            setStatus('idle'); // Stop scanning UI temporarily
            const response = await verifyTicketApi(parsedData.id);
            
            // 3. Success
            setData(response.booking);
            setMessage(response.message);
            setStatus('success');

        } catch (error: any) {
            // 4. Error (Invalid / Used)
            setStatus('error');
            setMessage(error.response?.data?.message || "Invalid or Unreadable QR Code");
            if(error.response?.data?.details) {
                setData(error.response.data.details);
            }
        }
    }
  };

  const resetScanner = () => {
    setData(null);
    setMessage('');
    setStatus('scanning');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                <QrCode className="text-yellow-500"/> Ticket Scanner
            </h1>
            <p className="text-gray-400 text-sm">Point camera at the customer's QR code</p>
        </div>

        {/* --- SCANNIG MODE --- */}
        {status === 'scanning' && (
    <div className="border-4 border-yellow-500 rounded-xl overflow-hidden shadow-2xl relative bg-gray-900">
                <Scanner 
                    onScan={(results: any) => {
                        if (results && results.length > 0) {
                            handleScan(results[0].rawValue);
                        }
                    }}
                    onError={(error: any) => console.log(error?.message)}
                    scanDelay={500}
                />
                
                <div className="absolute inset-0 border-2 border-white/20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-red-500 rounded-lg animate-pulse"></div>
                </div>
                <p className="text-center py-4 text-gray-400 animate-pulse">Scanning...</p>
            </div>
        )}

        {/* --- SUCCESS RESULT --- */}
        {status === 'success' && data && (
            <div className="bg-green-900/20 border border-green-500 rounded-2xl p-6 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/40">
                    <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">Valid Ticket!</h2>
                <p className="text-white text-sm mb-6">{message}</p>

                {/* Ticket Details */}
                <div className="bg-gray-900 rounded-xl p-4 text-left space-y-3 border border-gray-700">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400 text-xs uppercase">Movie</span>
                        <span className="font-bold text-white flex items-center gap-2"><Film size={14}/> {data.movie?.title}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400 text-xs uppercase">Customer</span>
                        <span className="font-bold text-white flex items-center gap-2"><User size={14}/> {data.user?.username}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400 text-xs uppercase">Hall</span>
                        <span className="font-bold text-yellow-400">{data.hall?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400 text-xs uppercase">Date</span>
                        <span className="font-bold text-white flex items-center gap-2"><Calendar size={14}/> {data.date} | {data.time}</span>
                    </div>
                    <div className="text-center pt-2">
                        <span className="text-gray-400 text-xs uppercase block mb-1">Seats</span>
                        <span className="text-xl font-mono font-bold text-green-400 bg-green-900/30 px-3 py-1 rounded">
                            {data.seats.join(', ')}
                        </span>
                    </div>
                </div>

                <button onClick={resetScanner} className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition">
                    <RefreshCw size={20}/> Scan Next Ticket
                </button>
            </div>
        )}

        {/* --- ERROR RESULT --- */}
        {status === 'error' && (
            <div className="bg-red-900/20 border border-red-500 rounded-2xl p-6 text-center animate-fade-in">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/40">
                    <XCircle size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied!</h2>
                <p className="text-white text-lg font-semibold mb-2">{message}</p>
                
                {data && (
                    <div className="text-xs text-gray-400 mt-2 bg-black/50 p-2 rounded">
                        Previously scanned at: <br/> {new Date(data.scannedAt).toLocaleString()}
                    </div>
                )}

                <button onClick={resetScanner} className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition">
                    <RefreshCw size={20}/> Try Again
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default ScanTicket;