import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, changeUserPassword } from '../../services/user';
import { 
  User, Lock, LogOut, Mail, ShieldCheck, Edit2, 
  CheckCircle, Ticket, Calendar, Download 
} from 'lucide-react';

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella"
];

const SuperAdminInfo: React.FC = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'bookings'>('profile');

  const [bookings] = useState<any[]>([]); 
  const [loadingBookings] = useState(false);

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
    
    if (userData.role !== 'superadmin') {
        navigate('/dashboard');
        return;
    }

    setUser(userData);
    setUsername(userData.username);
    setProfileImage(userData.profileImage || AVATAR_OPTIONS[0]);

  }, [navigate]);

  const generateTicketPDF = (details: any) => {
    console.log("Downloading PDF...", details);
    alert("PDF Download feature needs to be implemented!");
  };

  const handleLogout = () => {
    if (window.confirm("Logout from Super Admin Account?")) {
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
      alert('Super Admin Profile Updated!');
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

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER CARD */}
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-700 bg-slate-800 shadow-lg">
                <img src={user.profileImage || AVATAR_OPTIONS[0]} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-[#1e293b]"></div>
          </div>

          <div className="text-center md:text-left z-10">
            <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
               <Mail size={14} /> {user.email}
            </p>
             <div className="mt-3 flex gap-2 justify-center md:justify-start">
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">Member</span>
                <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">{bookings.length} Bookings</span>
             </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden shadow-lg">
              <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'bookings' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
                <Ticket size={20} /> My Tickets
              </button>
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'profile' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
                <User size={20} /> Personal Details
              </button>
              <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'security' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
                <ShieldCheck size={20} /> Security
              </button>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all font-semibold">
              <LogOut size={20} /> Logout
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-6 md:p-8 min-h-[500px] shadow-xl">
              
              {/* TAB: MY BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
                    <Ticket className="text-yellow-500"/> Booking History
                  </h2>
                  
                  {loadingBookings ? (
                    <div className="text-center py-20 text-slate-500 animate-pulse">Loading your tickets...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                        <Ticket size={48} className="mx-auto text-slate-600 mb-4"/>
                        <p className="text-slate-400 text-lg">You haven't booked any movies yet.</p>
                        <button onClick={() => navigate('/')} className="mt-4 text-yellow-500 hover:underline">Browse Movies</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="group bg-slate-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center border border-slate-700 hover:border-yellow-500/50 transition-all shadow-md">
                          
                          <div className="flex items-center gap-5 w-full">
                            <img 
                              src={booking.movie?.posterUrl || "https://via.placeholder.com/100x150"} 
                              className="w-16 h-24 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform" 
                              alt="Poster" 
                            />
                            <div>
                                <h3 className="font-bold text-lg text-white mb-1">{booking.movie?.title || "Unknown Movie"}</h3>
                                <div className="text-sm text-slate-400 space-y-1">
                                    <p className="flex items-center gap-2">
                                      <Calendar size={12}/> {booking.date} at {booking.time}
                                    </p>
                                    <p className="text-slate-500">{booking.hall?.name || "Cinema Hall"}</p>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-600 font-mono">
                                        Seats: {booking.seats.join(', ')}
                                    </span>
                                </div>
                            </div>
                          </div>

                          <div className="mt-4 md:mt-0 flex flex-col items-end gap-3 w-full md:w-auto min-w-[140px]">
                             <span className="text-xl font-bold text-yellow-400">LKR {booking.totalPrice}</span>
                             <button 
                                onClick={() => generateTicketPDF({
                                    bookingId: booking._id,
                                    movieTitle: booking.movie?.title,
                                    hallName: booking.hall?.name,
                                    date: booking.date,
                                    time: booking.time,
                                    seats: booking.seats,
                                    price: booking.totalPrice,
                                    paymentDate: new Date(booking.createdAt).toLocaleDateString()
                                })}
                                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 transition-all text-sm font-medium"
                             >
                                <Download size={16} /> Download
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PROFILE SETTINGS */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
                    <User className="text-yellow-500"/> Personal Details
                  </h2>
                  
                  <form onSubmit={handleUpdateProfile} className="max-w-2xl space-y-8">
                    {/* Avatar Section */}
                    <div>
                        <label className="block text-sm text-slate-400 mb-3">Choose Your Avatar</label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                            {AVATAR_OPTIONS.map((avatarUrl, index) => (
                                <div 
                                    key={index}
                                    onClick={() => setProfileImage(avatarUrl)}
                                    className={`
                                        relative cursor-pointer rounded-full overflow-hidden border-4 transition-all duration-200 bg-slate-800
                                        ${profileImage === avatarUrl 
                                            ? 'border-yellow-500 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                                            : 'border-transparent hover:border-slate-500 opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                    {profileImage === avatarUrl && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <CheckCircle className="text-yellow-500 bg-black rounded-full" size={20} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg flex items-center gap-2">
                            <Edit2 size={18}/> Save Changes
                        </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
                    <ShieldCheck className="text-yellow-500"/> Security Settings
                  </h2>
                  
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-8">
                    <h3 className="text-lg font-bold text-white mb-2">Change Password</h3>
                    <p className="text-slate-400 text-sm mb-6">Ensure your account is using a long, random password to stay secure.</p>
                    
                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Current Password</label>
                            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
                        </div>
                        <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition mt-2">
                            Update Password
                        </button>
                    </form>
                  </div>

                  <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/30 flex items-start gap-3">
                    <Lock className="text-yellow-500 mt-1" size={20} />
                    <div>
                        <h4 className="text-yellow-500 font-bold text-sm">Forgot your current password?</h4>
                        <p className="text-slate-400 text-sm mt-1">If you cannot remember your current password, please logout and use the <span className="text-white font-bold">"Forgot Password"</span> link on the login page.</p>
                    </div>
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

export default SuperAdminInfo;













// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { updateUserProfile, changeUserPassword } from '../../services/user';
// import { 
//   User, Lock, LogOut, Mail, ShieldCheck, Edit2, 
//   CheckCircle 
// } from 'lucide-react';

// const AVATAR_OPTIONS = [
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella"
// ];

// const SuperAdminInfo: React.FC = () => {
//   const navigate = useNavigate();
  
//   const [user, setUser] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

//   const [username, setUsername] = useState('');
//   const [profileImage, setProfileImage] = useState('');
  
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (!userString) {
//       navigate('/login');
//       return;
//     }
//     const userData = JSON.parse(userString);
    
//     if (userData.role !== 'superadmin') {
//         navigate('/dashboard');
//         return;
//     }

//     setUser(userData);
//     setUsername(userData.username);
//     setProfileImage(userData.profileImage || AVATAR_OPTIONS[0]);
//   }, [navigate]);

//   const handleLogout = () => {
//     if (window.confirm("Logout from Super Admin Account?")) {
//       localStorage.clear();
//       navigate('/login');
//     }
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const updatedUser = await updateUserProfile({
//         userId: user._id,
//         username,
//         profileImage
//       });
//       const newUserObj = { ...user, ...updatedUser };
//       localStorage.setItem('user', JSON.stringify(newUserObj));
//       setUser(newUserObj);
//       alert('Super Admin Profile Updated!');
//     } catch (error) {
//       alert('Failed to update profile.');
//     }
//   };

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match!");
//       return;
//     }
//     try {
//       await changeUserPassword({
//         userId: user._id,
//         currentPassword,
//         newPassword
//       });
//       alert('Password changed successfully!');
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (err: any) {
//       alert(err.response?.data?.message || 'Failed to change password.');
//     }
//   };

//   if (!user) return <div className="text-white text-center mt-20">Loading...</div>;



// return (
//     <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* HEADER CARD */}

//         <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
//           {/* Background Glow Effect */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

//           {/* Current Avatar Display */}
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-700 bg-slate-800 shadow-lg">
//                 <img src={user.profileImage || AVATAR_OPTIONS[0]} alt="Profile" className="w-full h-full object-cover" />
//             </div>
//             <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-[#1e293b]"></div>
//           </div>

//           <div className="text-center md:text-left z-10">
//             <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
//             <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
//                <Mail size={14} /> {user.email}
//             </p>
//              <div className="mt-3 flex gap-2 justify-center md:justify-start">
//                 <span className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">Member</span>
//                 <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">{bookings.length} Bookings</span>
//              </div>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
//           {/* SIDEBAR */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden shadow-lg">
//               <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'bookings' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
//                 <Ticket size={20} /> My Tickets
//               </button>
//               <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'profile' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
//                 <User size={20} /> Personal Details
//               </button>
//               <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'security' ? 'bg-slate-700/50 border-yellow-500 text-white' : 'border-transparent text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'}`}>
//                 <ShieldCheck size={20} /> Security
//               </button>
//             </div>
//             <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all font-semibold">
//               <LogOut size={20} /> Logout
//             </button>
//           </div>

//           {/* CONTENT AREA */}
//           <div className="lg:col-span-3">
//             {/* Main Content Box Color Change */}
//             <div className="bg-[#1e293b] rounded-xl border border-slate-700 p-6 md:p-8 min-h-[500px] shadow-xl">
              
//               {/* TAB: MY BOOKINGS */}
//               {activeTab === 'bookings' && (
//                 <div className="animate-fade-in">
//                   <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
//                     <Ticket className="text-yellow-500"/> Booking History
//                   </h2>
                  
//                   {loadingBookings ? (
//                     <div className="text-center py-20 text-slate-500 animate-pulse">Loading your tickets...</div>
//                   ) : bookings.length === 0 ? (
//                     <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
//                         <Ticket size={48} className="mx-auto text-slate-600 mb-4"/>
//                         <p className="text-slate-400 text-lg">You haven't booked any movies yet.</p>
//                         <button onClick={() => navigate('/')} className="mt-4 text-yellow-500 hover:underline">Browse Movies</button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {bookings.map((booking) => (
//                         <div key={booking._id} className="group bg-slate-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center border border-slate-700 hover:border-yellow-500/50 transition-all shadow-md">
                          
//                           <div className="flex items-center gap-5 w-full">
//                             <img 
//                               src={booking.movie?.posterUrl || "https://via.placeholder.com/100x150"} 
//                               className="w-16 h-24 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform" 
//                               alt="Poster" 
//                             />
//                             <div>
//                                 <h3 className="font-bold text-lg text-white mb-1">{booking.movie?.title || "Unknown Movie"}</h3>
//                                 <div className="text-sm text-slate-400 space-y-1">
//                                     <p className="flex items-center gap-2">
//                                       <Calendar size={12}/> {booking.date} at {booking.time}
//                                     </p>
//                                     <p className="text-slate-500">{booking.hall?.name || "Cinema Hall"}</p>
//                                 </div>
//                                 <div className="mt-2 flex gap-2">
//                                     <span className="text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-600 font-mono">
//                                         Seats: {booking.seats.join(', ')}
//                                     </span>
//                                 </div>
//                             </div>
//                           </div>

//                           <div className="mt-4 md:mt-0 flex flex-col items-end gap-3 w-full md:w-auto min-w-[140px]">
//                              <span className="text-xl font-bold text-yellow-400">LKR {booking.totalPrice}</span>
//                              <button 
//                                 onClick={() => generateTicketPDF({
//                                     bookingId: booking._id,
//                                     movieTitle: booking.movie?.title,
//                                     hallName: booking.hall?.name,
//                                     date: booking.date,
//                                     time: booking.time,
//                                     seats: booking.seats,
//                                     price: booking.totalPrice,
//                                     paymentDate: new Date(booking.createdAt).toLocaleDateString()
//                                 })}
//                                 className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 transition-all text-sm font-medium"
//                              >
//                                 <Download size={16} /> Download
//                              </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* TAB: PROFILE SETTINGS */}
//               {activeTab === 'profile' && (
//                 <div className="animate-fade-in">
//                   <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
//                     <User className="text-yellow-500"/> Personal Details
//                   </h2>
                  
//                   <form onSubmit={handleUpdateProfile} className="max-w-2xl space-y-8">
//                     {/* Avatar Section */}
//                     <div>
//                         <label className="block text-sm text-slate-400 mb-3">Choose Your Avatar</label>
//                         <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
//                             {AVATAR_OPTIONS.map((avatarUrl, index) => (
//                                 <div 
//                                     key={index}
//                                     onClick={() => setProfileImage(avatarUrl)}
//                                     className={`
//                                         relative cursor-pointer rounded-full overflow-hidden border-4 transition-all duration-200 bg-slate-800
//                                         ${profileImage === avatarUrl 
//                                             ? 'border-yellow-500 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
//                                             : 'border-transparent hover:border-slate-500 opacity-70 hover:opacity-100'}
//                                     `}
//                                 >
//                                     <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                                     {profileImage === avatarUrl && (
//                                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                                             <CheckCircle className="text-yellow-500 bg-black rounded-full" size={20} />
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm text-slate-400 mb-2">Full Name</label>
//                             <input 
//                                 type="text" 
//                                 value={username} 
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-slate-400 mb-2">Email Address</label>
//                             <input 
//                                 type="email" 
//                                 value={user.email} 
//                                 disabled
//                                 className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-500 cursor-not-allowed"
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-4 border-t border-slate-700">
//                         <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg flex items-center gap-2">
//                             <Edit2 size={18}/> Save Changes
//                         </button>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {/* TAB: SECURITY */}
//               {activeTab === 'security' && (
//                 <div className="animate-fade-in">
//                   <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4 flex items-center gap-2">
//                     <ShieldCheck className="text-yellow-500"/> Security Settings
//                   </h2>
                  
//                   <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-8">
//                     <h3 className="text-lg font-bold text-white mb-2">Change Password</h3>
//                     <p className="text-slate-400 text-sm mb-6">Ensure your account is using a long, random password to stay secure.</p>
                    
//                     <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
//                         <div>
//                             <label className="block text-sm text-slate-400 mb-1">Current Password</label>
//                             <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-slate-400 mb-1">New Password</label>
//                             <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
//                             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" required />
//                         </div>
//                         <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition mt-2">
//                             Update Password
//                         </button>
//                     </form>
//                   </div>

//                   <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/30 flex items-start gap-3">
//                     <Lock className="text-yellow-500 mt-1" size={20} />
//                     <div>
//                         <h4 className="text-yellow-500 font-bold text-sm">Forgot your current password?</h4>
//                         <p className="text-slate-400 text-sm mt-1">If you cannot remember your current password, please logout and use the <span className="text-white font-bold">"Forgot Password"</span> link on the login page.</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminInfo;







// v1

//   return (
//     <div className="min-h-screen bg-black text-white p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
        
//         <div className="bg-gradient-to-r from-red-900/40 to-black p-8 rounded-2xl border border-red-900/50 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

//           <div className="relative">
//             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 bg-gray-900 shadow-lg p-1">
//                 <img src={user.profileImage || AVATAR_OPTIONS[0]} alt="Profile" className="w-full h-full object-cover rounded-full" />
//             </div>
//             <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1.5 rounded-full shadow-lg border-2 border-black" title="Super Admin">
//                 <Crown size={16} fill="black" />
//             </div>
//           </div>

//           <div className="text-center md:text-left z-10">
//             <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
//             <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
//                <Mail size={14} /> {user.email}
//             </p>
//             <div className="mt-3 inline-block">
//                <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold shadow-lg shadow-red-900/50 uppercase tracking-widest flex items-center gap-1">
//                   <ShieldCheck size={12}/> Super Admin
//                </span>
//             </div>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
//           {/* SIDEBAR */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
//               <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'profile' ? 'bg-red-900/20 border-red-600 text-white' : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}>
//                 <User size={20} /> My Profile
//               </button>
//               <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-4 ${activeTab === 'security' ? 'bg-red-900/20 border-red-600 text-white' : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}>
//                 <Lock size={20} /> Security
//               </button>
//             </div>
            
//             <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-900/20 text-blue-400 hover:bg-blue-900/40 border border-blue-900/50 transition-all font-semibold">
//               <LayoutDashboard size={20} /> Go to Admin Panel
//             </button>

//             <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-red-900/30 text-red-400 hover:bg-red-900/20 transition-all font-semibold">
//               <LogOut size={20} /> Logout
//             </button>
//           </div>

//           {/* CONTENT AREA */}
//           <div className="lg:col-span-3">
//             <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8 min-h-[500px] shadow-xl">
              
//               {/* TAB: PROFILE */}
//               {activeTab === 'profile' && (
//                 <div className="animate-fade-in">
//                   <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
//                     <User className="text-red-500"/> Super Admin Details
//                   </h2>
                  
//                   <form onSubmit={handleUpdateProfile} className="max-w-2xl space-y-8">
//                     {/* Avatar Selection */}
//                     <div>
//                         <label className="block text-sm text-gray-400 mb-3">System Avatar</label>
//                         <div className="flex gap-4">
//                             {AVATAR_OPTIONS.map((avatarUrl, index) => (
//                                 <div key={index} onClick={() => setProfileImage(avatarUrl)} className={`relative cursor-pointer w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${profileImage === avatarUrl ? 'border-red-500 scale-110' : 'border-gray-600 opacity-60 hover:opacity-100'}`}>
//                                     <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Display Name</label>
//                             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 outline-none"/>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Email (Locked)</label>
//                             <input type="email" value={user.email} disabled className="w-full bg-black border border-gray-700 rounded-lg p-3 text-gray-500 cursor-not-allowed"/>
//                         </div>
//                     </div>

//                     <div className="pt-4 border-t border-gray-800">
//                         <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg flex items-center gap-2">
//                             <Edit2 size={18}/> Update Info
//                         </button>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {/* TAB: SECURITY */}
//               {activeTab === 'security' && (
//                 <div className="animate-fade-in">
//                   <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
//                     <Lock className="text-red-500"/> Super Admin Security
//                   </h2>
                  
//                   <div className="bg-black/50 p-6 rounded-xl border border-red-900/30 mb-8">
//                     <h3 className="text-lg font-bold text-white mb-2">Change Access Password</h3>
//                     <p className="text-gray-400 text-sm mb-6">As a Super Admin, your password controls the entire system. Keep it secure.</p>
                    
//                     <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Current Password</label>
//                             <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 outline-none" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">New Password</label>
//                             <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 outline-none" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
//                             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 outline-none" required />
//                         </div>
//                         <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-bold transition mt-2">
//                             Update Credentials
//                         </button>
//                     </form>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
