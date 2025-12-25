import React, { useEffect, useState } from 'react';
import { getScheduleByDate, deleteShowtime, addShowtime } from '../../services/showtime';
import { getMovies, type MovieData } from '../../services/movie';
import { getAllHalls,type HallData } from '../../services/hall';
import { Trash2, Calendar as CalendarIcon, Clock, MapPin, Film, PlusCircle, X, CheckCircle } from 'lucide-react';

const ManageSchedule: React.FC = () => {
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const todayObj = new Date();
  const tomorrowObj = new Date(todayObj); tomorrowObj.setDate(todayObj.getDate() + 1);
  const dayAfterObj = new Date(todayObj); dayAfterObj.setDate(todayObj.getDate() + 2);

  const quickDates = [
    { label: "Today", value: formatDate(todayObj) },
    { label: "Tomorrow", value: formatDate(tomorrowObj) },
    { label: new Date(dayAfterObj).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }), value: formatDate(dayAfterObj) }
  ];

  const [selectedDate, setSelectedDate] = useState(formatDate(todayObj));
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [halls, setHalls] = useState<HallData[]>([]);

  const [newShow, setNewShow] = useState({
    movieId: '',
    hallId: '',
    showDate: selectedDate, // Default to selected date
    showTime: '',
    ticketPrice: ''
  });

  // 1. Fetch Schedule (Main List)
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const data = await getScheduleByDate(selectedDate);
      setSchedule(data);
    } catch (error) {
      console.error("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedule(); }, [selectedDate]);

  // 2. Fetch Data for Modal (Only when modal opens)
  useEffect(() => {
    if (isAddOpen) {
      const loadModalData = async () => {
        try {
          const mData = await getMovies();
          const hData = await getAllHalls();
          setMovies(mData);
          setHalls(hData);
          setNewShow(prev => ({ ...prev, showDate: selectedDate })); 
        } catch (err) {
          console.error("Failed to load form data");
        }
      };
      loadModalData();
    }
  }, [isAddOpen, selectedDate]);

  // 3. Delete Handler
  const handleDelete = async (id: string) => {
    if (window.confirm("Cancel this showtime?")) {
      try {
        await deleteShowtime(id);
        fetchSchedule(); 
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  // 4. Add Show Handler
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
 await addShowtime({
        ...newShow,
        ticketPrice: Number(newShow.ticketPrice)
      } as any)
      alert('Showtime Added Successfully!');
      setIsAddOpen(false);
      setNewShow({ movieId: '', hallId: '', showDate: selectedDate, showTime: '', ticketPrice: '' }); // Reset
      fetchSchedule(); 
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add showtime');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">📅 Manage Schedule</h1>
            <p className="text-gray-400 text-sm">View and manage daily showtimes.</p>
          </div>
          
          <button 
            onClick={() => setIsAddOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition shadow-lg flex items-center gap-2"
          >
            <PlusCircle size={20} /> Add New Show
          </button>
        </div>

        {/* Date Selection Bar */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex gap-3 w-full md:w-auto">
                    {quickDates.map((dateItem) => (
                        <button key={dateItem.value} onClick={() => setSelectedDate(dateItem.value)} className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold transition-all border ${selectedDate === dateItem.value ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'}`}>{dateItem.label}</button>
                    ))}
                </div>
                <div className="hidden md:block h-10 w-px bg-gray-600"></div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-gray-400 text-sm font-semibold whitespace-nowrap">Select Date:</span>
                    <div className="relative w-full">
                        <CalendarIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-gray-900 border border-gray-600 text-white p-2.5 pl-10 rounded-lg outline-none focus:border-yellow-500 transition-colors cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>

        {/* Schedule Grid */}
        {loading ? (
            <div className="text-center py-20 text-gray-500 animate-pulse">Loading schedule...</div>
        ) : schedule.length === 0 ? (
            <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                <CalendarIcon size={48} className="mx-auto text-gray-600 mb-4"/>
                <p className="text-gray-400 text-lg">No shows scheduled for <span className="text-yellow-500 font-bold">{selectedDate}</span>.</p>
                <button onClick={() => setIsAddOpen(true)} className="text-blue-400 hover:underline mt-2 inline-block">Schedule a Show Now</button>
            </div>
        ) : (
            <div className="grid gap-4">
                <div className="flex justify-between text-gray-500 text-xs uppercase font-bold px-4">
                    <span>Time & Location</span><span>Movie Details</span><span>Actions</span>
                </div>
                {schedule.map((show) => (
                    <div key={show._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row items-center justify-between shadow-lg hover:border-blue-500 transition-all group">
                        <div className="flex items-center gap-6 w-full md:w-1/4">
                            <div className="text-center bg-gray-900 p-3 rounded-lg border border-gray-600 min-w-[90px]">
                                <p className="text-xl font-bold text-yellow-400">{show.showTime}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Start</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-300 font-semibold"><MapPin size={16} className="text-blue-500"/> {show.hall?.name}</div>
                                <div className="text-xs text-green-400 mt-1">LKR {show.ticketPrice}</div>
                            </div>
                        </div>
                        <div className="flex-1 border-l border-gray-700 pl-6 my-4 md:my-0">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3"><Film size={20} className="text-purple-500"/>{show.movie?.title}</h3>
                            <div className="flex gap-3 mt-2">
                                <span className="text-xs font-normal bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-600">{show.movie?.duration} min</span>
                                <span className="text-xs font-normal bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-600">2D</span>
                            </div>
                        </div>
                        <div className="md:w-auto flex justify-end">
                            <button onClick={() => handleDelete(show._id)} className="flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition border border-red-600/20 group-hover:border-red-600">
                                <Trash2 size={18} /> Cancel Show
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* ================= ADD SHOW MODAL ================= */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-lg p-6">
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><Clock className="text-blue-500"/> Schedule New Show</h2>
                    <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-5">
                    
                    {/* Select Movie */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Select Movie</label>
                        <select value={newShow.movieId} onChange={e => setNewShow({...newShow, movieId: e.target.value})} className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 outline-none" required>
                            <option value="">-- Choose Movie --</option>
                            {movies.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                        </select>
                    </div>

                    {/* Select Hall */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Select Hall</label>
                        <select value={newShow.hallId} onChange={e => setNewShow({...newShow, hallId: e.target.value})} className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 outline-none" required>
                            <option value="">-- Choose Hall --</option>
                            {halls.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Date</label>
                            <input type="date" value={newShow.showDate} onChange={e => setNewShow({...newShow, showDate: e.target.value})} className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 outline-none" required/>
                        </div>
                        {/* Time */}
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Time</label>
                            <input type="time" value={newShow.showTime} onChange={e => setNewShow({...newShow, showTime: e.target.value})} className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 outline-none" required/>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Ticket Price (LKR)</label>
                        <input type="number" value={newShow.ticketPrice} onChange={e => setNewShow({...newShow, ticketPrice: e.target.value})} className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 outline-none" placeholder="e.g. 1500" required/>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition mt-4 flex justify-center items-center gap-2">
                        <CheckCircle size={20}/> Confirm Schedule
                    </button>

                </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageSchedule;