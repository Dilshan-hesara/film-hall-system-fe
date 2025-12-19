import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings } from '../services/booking';
import { updateUserProfile, changeUserPassword } from '../services/user';
import { generateTicketPDF } from '../utils/pdfGenerator';
import { Download, User, Lock, Ticket, LogOut, Camera } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // User Data State
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'tickets' | 'profile' | 'security'>('tickets');

  // Booking Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile Form States
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  // Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Initial Load
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(userString);
    setUser(userData);
    setUsername(userData.username);
    setProfileImage(userData.profileImage || '');

    // Fetch Tickets
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings(userData._id);
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  // --- HANDLERS ---

  const handleDownload = (booking: any) => {
    generateTicketPDF({
        bookingId: booking._id,
        movieTitle: booking.movie?.title,
        hallName: booking.hall?.name,
        date: booking.date,
        time: booking.time,
        seats: booking.seats,
        price: booking.totalPrice,
        paymentDate: new Date(booking.createdAt).toLocaleDateString()
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile({
        userId: user._id,
        username,
        profileImage
      });
      
      // Update LocalStorage & State
      localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
      setUser({ ...user, ...updatedUser });
      alert('Profile updated successfully!');
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
      alert(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* === SIDEBAR === */}
        <div className="md:col-span-1 bg-gray-800 rounded-xl p-6 border border-gray-700 h-fit">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 mb-3 bg-gray-700">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={60} className="text-gray-400 m-auto mt-4" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white">{user.username}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('tickets')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              <Ticket size={20} /> My Tickets
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              <User size={20} /> Profile Details
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              <Lock size={20} /> Security
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 text-red-400 transition-all mt-4 border border-transparent hover:border-red-600"
            >
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </div>

        {/* === MAIN CONTENT AREA === */}
        <div className="md:col-span-3 bg-gray-800 rounded-xl p-6 border border-gray-700 min-h-[500px]">
          
          {/* TAB 1: TICKETS */}
          {activeTab === 'tickets' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Booking History</h2>
              {loading ? (
                <p className="text-gray-400">Loading tickets...</p>
              ) : bookings.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No bookings found.</p>
              ) : (
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-gray-900 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center border border-gray-700 hover:border-blue-500 transition-all">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img src={booking.movie?.posterUrl} alt="Poster" className="w-16 h-20 object-cover rounded" />
                        <div>
                          <h3 className="font-bold text-lg">{booking.movie?.title}</h3>
                          <p className="text-sm text-gray-400">{booking.hall?.name} • {booking.date} at {booking.time}</p>
                          <p className="text-sm text-green-400 font-mono mt-1">Seats: {booking.seats.join(', ')}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(booking)}
                        className="mt-4 sm:mt-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 transition-colors"
                      >
                        <Download size={16} /> Ticket
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Edit Profile</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-gray-400 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Profile Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      value={profileImage} 
                      onChange={(e) => setProfileImage(e.target.value)}
                      placeholder="https://example.com/my-photo.jpg"
                      className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                        <Camera size={20} className="text-gray-400"/>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Paste a direct image link (e.g., from Imgur or Google Photos).</p>
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded font-bold transition">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-gray-400 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded font-bold transition">
                  Update Password
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;