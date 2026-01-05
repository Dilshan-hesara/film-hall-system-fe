import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, changeUserPassword } from '../../services/user'; 
import { 
  User, Lock, LogOut, Mail, ShieldCheck, Edit2, 
  LayoutDashboard, Monitor 
} from 'lucide-react';

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Eden",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight"
];

const ReceptionProfile: React.FC = () => {
  const navigate = useNavigate();
   
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
   
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(userString);
    
    if (userData.role !== 'receptionist') {
        navigate('/'); 
        return;
    }

    setUser(userData);
    setUsername(userData.username);
    setProfileImage(userData.profileImage || AVATAR_OPTIONS[0]);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile({
        userId: user._id,
        username,
        profileImage
      });
      const newUserObj = { ...user, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUserObj));
      setUser(newUserObj);
      alert('Profile Updated Successfully!');
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      await changeUserPassword({
        userId: user._id,
        currentPassword,
        newPassword
      });
      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to change password.');
    }
  };

  if (!user) return <div className="text-white text-center mt-20">Loading...</div>;

  const glowColor = 'bg-blue-600/10';
  const borderColor = 'border-blue-500';

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER CARD */}
        <div className={`bg-[#1e293b] p-8 rounded-2xl border border-blue-500/50 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 ${glowColor} rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>

          <div className="relative">
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${borderColor} bg-slate-800 shadow-lg p-1`}>
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg border-2 border-[#0f172a]" title="Receptionist">
                <Monitor size={16} />
            </div>
          </div>

          <div className="text-center md:text-left z-10">
            <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
               <Mail size={14} /> {user.email}
            </p>
            <div className="mt-3 inline-block">
               <span className="text-xs px-3 py-1 rounded-full font-bold shadow-lg uppercase tracking-widest flex items-center gap-1 bg-blue-600 text-white">
                  <ShieldCheck size={12}/> Reception Desk
               </span>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden shadow-lg">
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'profile' ? `bg-slate-700/50 ${borderColor} text-white` : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
                <User size={20} /> My Profile
              </button>
              <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'security' ? `bg-slate-700/50 ${borderColor} text-white` : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
                <Lock size={20} /> Security
              </button>
            </div>
            
            <button onClick={() => navigate('/reception/reception-dashboard')} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-all font-semibold">
              <LayoutDashboard size={20} /> Go to Dashboard
            </button>

            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-semibold">
              <LogOut size={20} /> Logout
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-6 md:p-8 min-h-[500px] shadow-xl">
              
              {/* TAB: PROFILE */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-4 flex items-center gap-2 text-blue-500">
                    <User /> Receptionist Details
                  </h2>
                  
                  <form onSubmit={handleUpdateProfile} className="max-w-2xl space-y-8">
                    {/* Avatar Selection */}
                    <div>
                        <label className="block text-sm text-slate-400 mb-3">Select Avatar</label>
                        <div className="flex gap-4 flex-wrap">
                            {AVATAR_OPTIONS.map((avatarUrl, index) => (
                                <div key={index} onClick={() => setProfileImage(avatarUrl)} className={`relative cursor-pointer w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${profileImage === avatarUrl ? `${borderColor} scale-110` : 'border-slate-600 opacity-60 hover:opacity-100'}`}>
                                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Display Name</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-slate-500 outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Email (Locked)</label>
                            <input type="email" value={user.email} disabled className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-500 cursor-not-allowed"/>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                        <button type="submit" className="px-8 py-3 rounded-lg font-bold transition shadow-lg flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-500">
                            <Edit2 size={18}/> Update Info
                        </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-4 flex items-center gap-2 text-blue-500">
                    <Lock /> Account Security
                  </h2>
                  
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/30 mb-8">
                    <h3 className="text-lg font-bold text-white mb-2">Change Password</h3>
                    <p className="text-slate-400 text-sm mb-6">Update your password to keep your account secure.</p>
                    
                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Current Password</label>
                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-white outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-white outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-white outline-none" required />
                        </div>
                        <button type="submit" className="bg-slate-200 text-black hover:bg-white px-6 py-3 rounded-lg font-bold transition mt-2">
                            Update Credentials
                        </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReceptionProfile;