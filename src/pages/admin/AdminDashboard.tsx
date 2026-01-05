import { getSalesData } from '../../services/admin'; 
import { exportToPDF, exportToExcel } from '../../utils/reportGenerator'; 
import { FileText, Table } from 'lucide-react'; 

import React, { useEffect, useState } from 'react';
import { getDashboardStats, getRecentBookings } from '../../services/admin';
import { 
  Ticket, DollarSign, Film, Users,  Calendar, 
  BarChart2, PieChart as PieChartIcon, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ 
    totalBookings: 0, totalUsers: 0, totalMovies: 0, totalIncome: 0,
    revenueChart: [], 
    movieChart: []    
  });
  


  const handleExport = async (type: 'pdf' | 'excel') => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthName = new Date().toLocaleString('default', { month: 'long' });

    if(window.confirm(`Download ${monthName} sales report as ${type.toUpperCase()}?`)) {
        try {
            const data = await getSalesData(currentMonth, currentYear);
            if (data.length === 0) {
                alert("No sales data found for this month.");
                return;
            }

            if (type === 'pdf') {
                exportToPDF(data, `${monthName} ${currentYear}`);
            } else {
                exportToExcel(data, `${monthName} ${currentYear}`);
            }
        } catch (error) {
            console.error("Export failed", error);
            alert("Failed to download report.");
        }
    }
  };

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const s = await getDashboardStats(); 
            setStats({
                ...s,
                revenueChart: s.revenueChart || [],
                movieChart: s.movieChart || []
            });

            const b = await getRecentBookings(); 
            setRecentBookings(b || []);
        } catch(e) {
            console.error("Dashboard Data Error:", e);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white p-8 text-center mt-20">Loading Dashboard...</div>;

  const EmptyState = ({ message, icon: Icon }: any) => (
    <div className="h-full w-full flex flex-col items-center justify-center text-gray-500 opacity-60 border-2 border-dashed border-gray-700 rounded-xl">
        <Icon size={48} className="mb-2" />
        <p className="text-sm font-medium">{message}</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-1">Welcome back! Here's your cinema performance.</p>
            </div>
            <p className="text-sm text-gray-500 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                {new Date().toDateString()}
            </p>

            <div className="flex gap-3 mt-4 md:mt-0">
                <button 
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg border border-red-600/30 transition-all font-semibold"
                >
                    <FileText size={18}/> PDF Report
                </button>
                <button 
                    onClick={() => handleExport('excel')}
                    className="flex items-center gap-2 bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg border border-green-600/30 transition-all font-semibold"
                >
                    <Table size={18}/> Excel Report
                </button>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Income Card */}
             <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <div className="flex justify-between">
                    <div><p className="text-gray-400 text-sm">Total Revenue</p><h3 className="text-3xl font-bold text-white mt-2">LKR {(stats.totalIncome / 1000).toFixed(1)}k</h3></div>
                    <div className="p-3 bg-yellow-500/20 text-yellow-500 rounded-xl"><DollarSign /></div>
                </div>
             </div>
             <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <div className="flex justify-between">
                    <div><p className="text-gray-400 text-sm">Bookings</p><h3 className="text-3xl font-bold text-white mt-2">{stats.totalBookings}</h3></div>
                    <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl"><Ticket /></div>
                </div>
             </div>
             <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <div className="flex justify-between">
                    <div><p className="text-gray-400 text-sm">Active Movies</p><h3 className="text-3xl font-bold text-white mt-2">{stats.totalMovies}</h3></div>
                    <div className="p-3 bg-purple-500/20 text-purple-500 rounded-xl"><Film /></div>
                </div>
             </div>
             <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <div className="flex justify-between">
                    <div><p className="text-gray-400 text-sm">Users</p><h3 className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</h3></div>
                    <div className="p-3 bg-green-500/20 text-green-500 rounded-xl"><Users /></div>
                </div>
             </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BAR CHART: Monthly Revenue */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Monthly Revenue</h3>
                <div className="flex-1 w-full min-h-0">
                    {stats.revenueChart && stats.revenueChart.length > 0 && stats.revenueChart.some((d:any) => d.income > 0) ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.revenueChart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                                <Bar dataKey="income" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyState message="No revenue data recorded yet" icon={BarChart2} />
                    )}
                </div>
            </div>

            {/* PIE CHART: Most Booked Movies */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6">Top Booked Movies</h3>
                <div className="flex-1 w-full min-h-0 flex justify-center">
                    {/* 👇 Check if Data Exists */}
                    {stats.movieChart && stats.movieChart.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.movieChart}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.movieChart.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyState message="No movie bookings yet" icon={PieChartIcon} />
                    )}
                </div>
            </div>

        </div>

        {/* 3. Recent Bookings Table */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar size={20} className="text-blue-400"/> Recent Bookings
                </h3>
                <Link to="/admin/manage-bookings" className="text-sm text-blue-400 hover:underline">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="p-5">User</th>
                            <th className="p-5">Movie</th>
                            <th className="p-5 text-right">Amount</th>
                            <th className="p-5 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-700">
                        {recentBookings && recentBookings.length > 0 ? recentBookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-700/30">
                                <td className="p-5 text-white font-bold">{booking.user?.username || 'Guest'}</td>
                                <td className="p-5 text-gray-300">{booking.movie?.title}</td>
                                <td className="p-5 text-right text-yellow-400 font-mono">LKR {booking.totalPrice}</td>
                                <td className="p-5 text-center"><span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">Paid</span></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="p-10 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500 opacity-60">
                                        <AlertCircle size={32} className="mb-2" />
                                        <p>No recent bookings found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
};


export default AdminDashboard;