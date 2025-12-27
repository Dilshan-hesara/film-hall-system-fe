import React, { useEffect, useState } from 'react';
import { getReceptionStats } from '../../services/admin'; 
import { getDailyReportApi } from '../../services/booking';
import { useNavigate } from 'react-router-dom';
import { Film, Calendar, MapPin, PlayCircle, PlusCircle, Clock, Users, Ticket, DollarSign, History, Printer, Search, FileText, X } from 'lucide-react';

const ReceptionDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [shows, setShows] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({ cash: 0, tickets: 0 });
  const [loading, setLoading] = useState(true);

  // Report States
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    getReceptionStats()
      .then(data => {
          setShows(data.schedule || []);
          setRecentBookings(data.recentBookings || []);
          setStats({
              cash: data.totalCashToday || 0,
              tickets: data.totalTicketsToday || 0
          });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEndShift = async () => {
      try {
          const data = await getDailyReportApi();
          setReportData(data);
          setShowReport(true);
      } catch (error) {
          alert("Failed to load report");
      }
  };

  if (loading) return <div className="text-white p-10 text-center animate-pulse">Loading Dashboard...</div>;

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-gray-900 text-white relative">
        
        {/* HEADER AREA */}
        <div className="flex flex-col xl:flex-row gap-6">
            <header className="flex-grow bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-500">Reception Dashboard</h1>
                    <p className="text-gray-400 mt-1">Daily Operations</p>
                </div>
                
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button 
                        onClick={handleEndShift}
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
                    >
                        <FileText size={20}/> End Shift
                    </button>

                    <button 
                        onClick={() => navigate('/reception/find-booking')}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-gray-600"
                    >
                        <Search size={20}/> Find
                    </button>

                    <button 
                        onClick={() => navigate('/reception/pos')}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
                    >
                        <PlusCircle size={20}/> POS
                    </button>
                </div>
            </header>

            <div className="flex gap-4 min-w-[300px]">
                <div className="flex-1 bg-green-900/20 border border-green-500/30 p-4 rounded-2xl flex flex-col justify-center items-center">
                    <p className="text-gray-400 text-xs uppercase mb-1">Today's Cash</p>
                    <p className="text-2xl font-bold text-green-400 flex items-center"><DollarSign size={20}/> {stats.cash.toLocaleString()}</p>
                </div>
                <div className="flex-1 bg-blue-900/20 border border-blue-500/30 p-4 rounded-2xl flex flex-col justify-center items-center">
                    <p className="text-gray-400 text-xs uppercase mb-1">Tickets Sold</p>
                    <p className="text-2xl font-bold text-blue-400 flex items-center"><Ticket size={20} className="mr-2"/> {stats.tickets}</p>
                </div>
            </div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-gray-700 pb-2 mt-8">
            <Calendar size={20} className="text-yellow-500"/> Upcoming Shows
        </h2>
        
        {/* SHOWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shows.length === 0 ? (
                <div className="col-span-full text-center py-10 bg-gray-800 rounded-xl border border-dashed border-gray-700">
                    <p className="text-gray-400">No upcoming shows found.</p>
                </div>
            ) : (
                shows.map((show) => {
                    const percentage = Math.round((show.bookedSeats / show.totalSeats) * 100);
                    let progressColor = "bg-green-500";
                    if(percentage > 50) progressColor = "bg-yellow-500";
                    if(percentage > 80) progressColor = "bg-red-500";

                    return (
                        <div key={show._id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-all shadow-xl group flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-500 transition-colors truncate w-40" title={show.movieTitle}>{show.movieTitle}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold bg-gray-700 text-gray-300 px-2 py-0.5 rounded uppercase">{show.language}</span>
                                        <span className="text-[10px] text-yellow-400 font-mono border border-yellow-500/30 px-2 py-0.5 rounded">{show.showDate}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-white">{show.showTime}</div>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 flex-grow">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                                        <p className="text-[10px] text-gray-500 uppercase">Total</p>
                                        <p className="font-bold text-white">{show.totalSeats}</p>
                                    </div>
                                    <div className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                                        <p className="text-[10px] text-gray-500 uppercase">Booked</p>
                                        <p className="font-bold text-yellow-500">{show.bookedSeats}</p>
                                    </div>
                                    <div className="bg-green-900/20 p-2 rounded-lg border border-green-500/50">
                                        <p className="text-[10px] text-green-400 uppercase">Avail</p>
                                        <p className="font-bold text-green-400">{show.availableSeats}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full ${progressColor}`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-900/50 border-t border-gray-700">
                                <button onClick={() => navigate('/reception/pos')} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">
                                    <PlayCircle size={16}/> Book Now
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>

        {/* RECENT BOOKINGS TABLE */}
        <div className="pt-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <History size={20} className="text-blue-500"/> Recent Bookings
                </h2>
                <button onClick={() => navigate('/admin/find-booking')} className="text-sm text-blue-400 hover:text-white transition-colors">
                    View All / Search
                </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900 text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">Movie</th>
                            <th className="p-4">Date/Time</th>
                            <th className="p-4">Seats</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-700">
                        {recentBookings.map((bk) => (
                            <tr key={bk._id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-4 font-bold text-white">{bk.movie?.title || 'Unknown'}</td>
                                <td className="p-4 text-gray-300">
                                    <div>{bk.date}</div>
                                    <div className="text-xs text-gray-500">{bk.time}</div>
                                </td>
                                <td className="p-4 text-yellow-500 font-mono">{bk.seats.join(', ')}</td>
                                <td className="p-4 text-right font-bold text-green-400">LKR {bk.totalPrice}</td>
                                <td className="p-4 text-center">
                                    <button onClick={() => navigate('/admin/find-booking')} className="text-gray-400 hover:text-white"><Printer size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {showReport && reportData && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white text-gray-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                    
                    {/* Simple Header */}
                    <div className="bg-white border-b border-gray-200 p-5 flex justify-between items-center">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <FileText size={18} className="text-gray-500"/> Shift Summary
                        </h2>
                        <button onClick={() => setShowReport(false)} className="text-gray-400 hover:text-gray-800 transition">
                            <X size={20}/>
                        </button>
                    </div>

                    {/* Receipt Style Body */}
                    <div className="p-8 bg-gray-50" id="printable-report">
                        
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900">MKD CINEMAS</h3>
                            <p className="text-xs text-gray-500 mt-1">Daily Collection Report</p>
                            <div className="mt-2 text-sm font-mono text-gray-600 bg-white border border-gray-200 px-3 py-1 inline-block rounded-md">
                                {reportData.date}
                            </div>
                        </div>

                        {/* Summary Table */}
                        <div className="space-y-3 text-sm font-mono">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Active Cash Sales</span>
                                <span className="font-bold text-gray-800">LKR {reportData.cashSales.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Active Card Sales</span>
                                <span className="font-bold text-gray-800">LKR {reportData.cardSales.toLocaleString()}</span>
                            </div>
                            
                            {/* Cancelled Info (Gray/Subtle) */}
                            <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <span>Refunded / Cancelled</span>
                                <span>(LKR {reportData.cashRefunds.toLocaleString()})</span>
                            </div>
                        </div>

                        {/* Net Total Box (Clean Look) */}
                        <div className="mt-6 bg-white border-2 border-gray-200 p-4 rounded-lg text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Total Cash in Hand</p>
                            <p className="text-3xl font-bold text-gray-800">
                                LKR {reportData.netCashInHand.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-dashed border-gray-300 pt-4">
                            Generated at {new Date().toLocaleTimeString()} • Checked by Reception
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 bg-white border-t border-gray-200 flex gap-3">
                        <button onClick={() => window.print()} className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition">
                            <Printer size={16}/> Print Report
                        </button>
                        <button onClick={() => setShowReport(false)} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
};

export default ReceptionDashboard;