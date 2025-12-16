import React, { useEffect, useState } from 'react';
import { getAllHalls, updateHall, deleteHall, addHall,type HallData } from '../../services/hall'; // addHall import කරන්න
import { Edit, Trash2, Plus, X, Search, Grid, CheckCircle } from 'lucide-react';

const ManageHalls: React.FC = () => {
  const [halls, setHalls] = useState<HallData[]>([]);
  const [filteredHalls, setFilteredHalls] = useState<HallData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false); // 👇 Add Modal State
  
  const [editingHall, setEditingHall] = useState<HallData | null>(null);
  
  // New Hall State
  const [newHall, setNewHall] = useState({ name: '', rows: 5, columns: 8 });

  // 1. Fetch Halls
  const fetchHalls = async () => {
    try {
      const data = await getAllHalls();
      setHalls(data);
      setFilteredHalls(data);
    } catch (error) {
      console.error("Failed to load halls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHalls(); }, []);

  // 2. Search
  useEffect(() => {
    const results = halls.filter(hall => hall.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredHalls(results);
  }, [searchTerm, halls]);

  // 3. Delete Handler
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this hall?")) {
      try {
        await deleteHall(id);
        fetchHalls();
      } catch (error) {
        alert("Failed to delete hall.");
      }
    }
  };

  // 4. Edit Handler
  const openEditModal = (hall: HallData) => {
    setEditingHall(hall);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHall) return;
    try {
      await updateHall(editingHall._id!, editingHall);
      alert("Hall updated!");
      setIsEditOpen(false);
      fetchHalls();
    } catch (error) {
      alert("Failed to update.");
    }
  };

  // 5. Add Hall Handler
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addHall(newHall);
      alert("Hall added successfully!");
      setIsAddOpen(false);
      setNewHall({ name: '', rows: 5, columns: 8 }); // Reset
      fetchHalls();
    } catch (error) {
      alert("Failed to add hall.");
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Halls...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">🏛️ Manage Halls</h1>
          
          {/* 👇 Open Add Modal Button */}
          <button 
            onClick={() => setIsAddOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add New Hall
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" placeholder="Search halls..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHalls.map((hall) => (
            <div key={hall._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-yellow-500 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400 group-hover:text-yellow-400 group-hover:bg-yellow-900/20 transition-colors">
                    <Grid size={32} />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => openEditModal(hall)} className="p-2 bg-gray-700 hover:bg-blue-600 rounded text-gray-300 hover:text-white transition"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(hall._id!)} className="p-2 bg-gray-700 hover:bg-red-600 rounded text-gray-300 hover:text-white transition"><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{hall.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Screen Capacity: <span className="text-green-400 font-bold">{hall.rows * hall.columns} Seats</span></p>
              <div className="bg-gray-900 p-3 rounded border border-gray-700 flex justify-between text-sm">
                 <span>Rows: <b>{hall.rows}</b></span><span>Columns: <b>{hall.columns}</b></span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ADD HALL MODAL ================= */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              
              <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Plus size={24} className="text-green-500"/> Add New Hall</h2>
                <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <form onSubmit={handleAddSubmit} className="space-y-5">
                    <div><label className="block text-gray-400 text-sm mb-1">Hall Name</label><input type="text" value={newHall.name} onChange={(e) => setNewHall({...newHall, name: e.target.value})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-green-500" required placeholder="e.g. Screen 1"/></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-gray-400 text-sm mb-1">Rows</label><input type="number" min="1" max="20" value={newHall.rows} onChange={(e) => setNewHall({...newHall, rows: Number(e.target.value)})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-green-500"/></div>
                        <div><label className="block text-gray-400 text-sm mb-1">Cols</label><input type="number" min="1" max="50" value={newHall.columns} onChange={(e) => setNewHall({...newHall, columns: Number(e.target.value)})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-green-500"/></div>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30 text-center"><p className="text-gray-400 text-sm">Capacity</p><p className="text-3xl font-bold text-green-400">{newHall.rows * newHall.columns} Seats</p></div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold flex items-center gap-2"><CheckCircle size={18}/> Create Hall</button>
                    </div>
                </form>

                {/* Preview */}
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 flex flex-col items-center justify-center overflow-hidden">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Layout Preview</p>
                    <div className="w-full h-4 bg-gradient-to-b from-blue-500/50 to-transparent rounded-t-full mb-6"></div>
                    <div className="flex flex-col gap-1 max-h-[300px] overflow-auto p-2 custom-scrollbar">
                        {Array.from({ length: Math.min(newHall.rows, 15) }).map((_, r) => (
                            <div key={r} className="flex gap-1 justify-center">
                                {Array.from({ length: Math.min(newHall.columns, 15) }).map((_, c) => (
                                    <div key={c} className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL (EXISTING) ================= */}
        {isEditOpen && editingHall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Edit size={24} className="text-blue-500"/> Edit Hall</h2>
                <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Same Form Structure as Add Modal (but using editingHall state) */}
                <form onSubmit={handleEditSubmit} className="space-y-5">
                    <div><label className="block text-gray-400 text-sm mb-1">Hall Name</label><input type="text" value={editingHall.name} onChange={(e) => setEditingHall({...editingHall, name: e.target.value})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-gray-400 text-sm mb-1">Rows</label><input type="number" min="1" max="20" value={editingHall.rows} onChange={(e) => setEditingHall({...editingHall, rows: Number(e.target.value)})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                        <div><label className="block text-gray-400 text-sm mb-1">Cols</label><input type="number" min="1" max="50" value={editingHall.columns} onChange={(e) => setEditingHall({...editingHall, columns: Number(e.target.value)})} className="w-full bg-gray-700 p-3 rounded outline-none border border-gray-600 focus:border-blue-500"/></div>
                    </div>
                    <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 text-center"><p className="text-gray-400 text-sm">New Capacity</p><p className="text-3xl font-bold text-blue-400">{editingHall.rows * editingHall.columns} Seats</p></div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold">Save Changes</button>
                    </div>
                </form>

                {/* Preview Section (Same as Add Modal) */}
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 flex flex-col items-center justify-center overflow-hidden">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Layout Preview</p>
                    <div className="w-full h-4 bg-gradient-to-b from-blue-500/50 to-transparent rounded-t-full mb-6"></div>
                    <div className="flex flex-col gap-1 max-h-[300px] overflow-auto p-2 custom-scrollbar">
                        {Array.from({ length: Math.min(editingHall.rows, 15) }).map((_, r) => (
                            <div key={r} className="flex gap-1 justify-center">
                                {Array.from({ length: Math.min(editingHall.columns, 15) }).map((_, c) => (
                                    <div key={c} className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageHalls;