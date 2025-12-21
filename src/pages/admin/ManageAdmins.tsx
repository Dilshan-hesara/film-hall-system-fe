import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin, deleteUser, adminResetPassword } from '../../services/user';
import { 
  ShieldCheck, UserPlus, Trash2, Key, Search, X, 
  Mail, User, Calendar, Lock, Info 
} from 'lucide-react';

const ManageAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperAdmin = currentUser.role === 'superadmin';

  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const [newAdminData, setNewAdminData] = useState({ username: '', email: '', password: '', gender: 'Male' });
  const [resetPassword, setResetPassword] = useState('');

  // 1. Fetch Admins
  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins();
      setAdmins(data);
      setFilteredAdmins(data);
    } catch (error) {
      console.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 2. Search
  useEffect(() => {
    const results = admins.filter(admin =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(results);
  }, [searchTerm, admins]);

  // 3. Create Admin Handler
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin(newAdminData);
      alert('New Admin Created Successfully!');
      setShowAddModal(false);
      setNewAdminData({ username: '', email: '', password: '', gender: 'Male' });
      fetchAdmins();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create admin');
    }
  };

  // 4. Delete Handler
  const handleDelete = async (id: string) => {
    if (id === currentUser._id) {
        alert("You cannot delete your own account!");
        return;
    }
    
    // Normal Admins cannot delete Super Admin
    const targetAdmin = admins.find(a => a._id === id);
    if (targetAdmin?.role === 'superadmin') {
        alert("You cannot delete the Super Admin!");
        return;
    }

    if (window.confirm("Are you sure you want to remove this admin?")) {
      try {
        await deleteUser(id);
        alert("Admin removed successfully!");
        fetchAdmins();
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  // 5. Reset Password Handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdminId) return;
    
    try {
      await adminResetPassword(selectedAdminId, resetPassword);
      alert("Password reset successfully!");
      setShowResetModal(false);
      setResetPassword('');
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  const openResetModal = (id: string) => {
    setSelectedAdminId(id);
    setShowResetModal(true);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Admins...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-yellow-500" /> Manage Admins
            </h1>
            <p className="text-gray-400 text-sm">
                {isSuperAdmin ? "Super Admin Access: Full Control" : "Standard Admin Access"}
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-lg"
          >
            <UserPlus size={20} /> Add New Admin
          </button>
        </div>

        {!isSuperAdmin && (
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-8 flex items-start gap-3 animate-fade-in">
                <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-gray-300">
                    <p className="font-bold text-blue-100 mb-1">Password Reset Information</p>
                    <p className="leading-relaxed text-gray-400">
                        As a Standard Admin, you cannot force reset other users' passwords. 
                        If you forgot your own password, please use the <span className="text-white font-semibold underline">"Forgot Password?"</span> link on the Login screen 
                        to verify via email OTP, or contact the <span className="text-yellow-500 font-bold">Super Admin</span> for assistance.
                    </p>
                </div>
            </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search admins..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Admins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdmins.map((admin) => (
            <div key={admin._id} className={`bg-gray-800 p-6 rounded-xl border relative overflow-hidden group ${admin.role === 'superadmin' ? 'border-red-500/50 shadow-red-900/20' : 'border-gray-700'}`}>
                
                {/* Badges */}
                {admin.role === 'superadmin' && <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">SUPER ADMIN</div>}
                {admin._id === currentUser._id && <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">YOU</div>}

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                        {admin.profileImage ? (
                            <img src={admin.profileImage} alt="Avatar" className="w-full h-full rounded-full object-cover"/>
                        ) : (
                            <ShieldCheck size={28} className="text-gray-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">{admin.username}</h3>
                        <p className="text-xs text-gray-500">{admin.role.toUpperCase()}</p>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-6">
                    <p className="flex items-center gap-2"><Mail size={14}/> {admin.email}</p>
                    <p className="flex items-center gap-2"><User size={14}/> {admin.gender}</p>
                    <p className="flex items-center gap-2"><Calendar size={14}/> Joined: {new Date(admin.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-700">
                    
                    {isSuperAdmin ? (
                        <button 
                            onClick={() => openResetModal(admin._id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition text-sm font-medium"
                            title="Reset Password"
                        >
                            <Key size={16} /> Force Reset
                        </button>
                    ) : (
                        <div className="flex-1 text-center text-xs text-gray-600 flex items-center justify-center gap-1 cursor-not-allowed bg-gray-900/50 rounded-lg py-2 border border-gray-700">
                            <Lock size={12}/> Locked
                        </div>
                    )}
                    
                    {admin._id !== currentUser._id && admin.role !== 'superadmin' && (
                        <button 
                            onClick={() => handleDelete(admin._id)}
                            className="flex items-center justify-center p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                            title="Remove Admin"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>
          ))}
        </div>

{/* add Admins */}

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Add New Admin</h2>
                    <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
                </div>
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-gray-700 p-3 rounded-lg text-white outline-none focus:border-yellow-500 border border-gray-600" required
                        value={newAdminData.username} onChange={e => setNewAdminData({...newAdminData, username: e.target.value})}
                    />
                    <input type="email" placeholder="Email Address" className="w-full bg-gray-700 p-3 rounded-lg text-white outline-none focus:border-yellow-500 border border-gray-600" required
                        value={newAdminData.email} onChange={e => setNewAdminData({...newAdminData, email: e.target.value})}
                    />
                    <select className="w-full bg-gray-700 p-3 rounded-lg text-white outline-none border border-gray-600"
                        value={newAdminData.gender} onChange={e => setNewAdminData({...newAdminData, gender: e.target.value})}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="password" placeholder="Password" className="w-full bg-gray-700 p-3 rounded-lg text-white outline-none focus:border-yellow-500 border border-gray-600" required
                        value={newAdminData.password} onChange={e => setNewAdminData({...newAdminData, password: e.target.value})}
                    />
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition mt-2">
                        Create Account
                    </button>
                </form>
            </div>
          </div>
        )}

{/* rest pass */}

        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><Key size={20}/> Force Reset</h2>
                    <button onClick={() => setShowResetModal(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
                </div>
                <p className="text-gray-400 text-sm mb-4">Enter a new password for this admin.</p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <input type="password" placeholder="New Password" className="w-full bg-gray-700 p-3 rounded-lg text-white outline-none focus:border-blue-500 border border-gray-600" required
                        value={resetPassword} onChange={e => setResetPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">
                        Update Password
                    </button>
                </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageAdmins;