import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Ticket, Film, LayoutDashboard, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload(); 
  };

  const isActive = (path: string) => location.pathname === path ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 tracking-wide">
            <Film className="text-red-600" size={28} />
            <span>
              <span className="text-red-600">MKD</span> Cinemas
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            
            {user ? (
              <>
                 {user.role === 'admin' && (
                  <>
                    <Link to="/admin/add-movie" className={`${isActive('/admin/add-movie')} transition-colors`}>Add Movie</Link>
                    <Link to="/admin/add-hall" className={`${isActive('/admin/add-hall')} transition-colors`}>Add Hall</Link>
                    <Link to="/admin/add-showtime" className={`${isActive('/admin/add-showtime')} transition-colors`}>Schedule</Link>
                  </>
                )} 

                {user.role === 'user' && (
                  <>
                   <Link to="/my-tickets" className={`flex items-center gap-2 transition-colors ${isActive('/my-tickets')}`}>
                      <Ticket size={18} /> My Tickets
                   </Link>

                    <Link to="/watchlist" className={`flex items-center gap-2 transition-colors ${isActive('/watchlist')}`}>
                       <Heart size={18} /> Watchlist
                    </Link>

                  </>
                )}

                <div className="h-6 w-px bg-gray-700 mx-2"></div>

                <div className="flex items-center gap-4">
                    
                    <Link to="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-yellow-500 transition-all overflow-hidden">
                            {user.profileImage && user.profileImage.startsWith('http') ? (
                                <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User size={20} className="text-gray-400 group-hover:text-yellow-500" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-semibold group-hover:text-yellow-500 transition-colors">
                                {user.username}
                            </span>
                            <span className="text-xs text-gray-500">Dashboard</span>
                        </div>
                    </Link>

                    <button 
                        onClick={handleLogout} 
                        className="bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white p-2.5 rounded-lg transition-all"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Login</Link>
                <Link to="/register" className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-lg shadow-red-600/20">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 absolute w-full left-0 shadow-2xl animate-fade-in z-50">
          <div className="px-6 py-6 space-y-4">
            <Link 
                to="/" 
                className="block text-gray-300 hover:text-white text-lg py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                Home
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <div className="space-y-3 pl-2 border-l-2 border-yellow-500">
                    <Link to="/admin/add-movie" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Add Movie</Link>
                    <Link to="/admin/add-hall" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Add Hall</Link>
                    <Link to="/admin/add-showtime" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Schedule</Link>
                  </div>
                )}
                
                {user.role === 'user' && (
                   <Link to="/my-tickets" className="flex items-center gap-2 text-gray-300 hover:text-green-400 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Ticket size={20} /> My Tickets
                   </Link>
                )}

                <div className="pt-4 mt-2">
                   <Link to="/dashboard" className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                            {user.profileImage && user.profileImage.startsWith('http') ? (
                                <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover"/>
                            ) : (
                                <User size={24} className="text-gray-400"/>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-white text-lg">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                   </Link>
                   
                   <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition font-semibold">
                       <LogOut size={20} /> Logout
                   </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 pt-2">
                <Link to="/login" className="block w-full text-center py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block w-full text-center py-3 rounded-lg bg-red-600 text-white hover:bg-red-500" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// V4 



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Menu, X, User, LogOut, Ticket, Film ,Home ,LayoutDashboard } from 'lucide-react';



// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   // User Data එක LocalStorage එකෙන් ගන්න
//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       setUser(JSON.parse(userString));
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//     window.location.reload(); 
//   };

//   const isActive = (path: string) => location.pathname === path ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-white';

//   const getDashboardLink = () => {
//     if (user?.role === 'admin' || user?.role === 'superadmin') return '/admin/dashboard';
//     return '/dashboard';
//   };

//   return (
//     <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex justify-between items-center h-20">
          
//           <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 tracking-wide">
//             <Film className="text-red-600" size={28} />
//             <span>
//               <span className="text-red-600">MKD</span> Cinemas
//             </span>
//           </Link>

//           {/* 2. DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
// <Link 
//   to="/" 
//   className={`${isActive('/')} transition-colors flex items-center gap-2`}
// >
//   <Home size={26} /> 
//   <span></span>
// </Link>

// {user && (user.role === 'admin' || user.role === 'superadmin') && (
//     <Link 
//         to="/admin/dashboard" 
//         className={`${isActive('/admin/dashboard')} transition-colors flex items-center gap-2`}
//     >
//         <LayoutDashboard size={26} />
//         <span>Dashboard</span>
//     </Link>
// )}
            
//             {user ? (
//               <>
//                 {/* --- USER LINKS --- */}
//                 {user.role === 'user' && (
//                    <Link to="/my-tickets" className={`flex items-center gap-2 transition-colors ${isActive('/my-tickets')}`}>
//                       <Ticket size={18} /> My Tickets
//                    </Link>
//                 )}

//                 <div className="h-6 w-px bg-gray-700 mx-2"></div> 

//                 <div className="flex items-center gap-4">
                    
//                     {/* Username & Avatar (Clickable) */}
//                     <Link to={getDashboardLink()} className="flex items-center gap-3 group">
//                         <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-yellow-500 transition-all overflow-hidden">
//                             {user.profileImage && user.profileImage.startsWith('http') ? (
//                                 <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover" />
//                             ) : (
//                                 <User size={20} className="text-gray-400 group-hover:text-yellow-500" />
//                             )}
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-white text-sm font-semibold group-hover:text-yellow-500 transition-colors">
//                                 {user.username}
//                             </span>
//                             <span className="text-xs text-gray-500">Dashboard</span>
//                         </div>
//                     </Link>

//                     <button 
//                         onClick={handleLogout} 
//                         className="bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white p-2.5 rounded-lg transition-all"
//                         title="Logout"
//                     >
//                         <LogOut size={18} />
//                     </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Login</Link>
//                 <Link to="/register" className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-lg shadow-red-600/20">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="md:hidden">
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-800"
//             >
//               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-gray-900 border-t border-gray-800 absolute w-full left-0 shadow-2xl animate-fade-in z-50">
//           <div className="px-6 py-6 space-y-4">
//             <Link 
//                 to="/" 
//                 className="block text-gray-300 hover:text-white text-lg py-2 border-b border-gray-800"
//                 onClick={() => setIsMobileMenuOpen(false)}
//             >
//                 Home
//             </Link>
            
//             {user ? (
//               <>
//                 {user.role === 'admin' && (
//                   <div className="space-y-3 pl-2 border-l-2 border-yellow-500">
//                     <Link to="/admin/add-movie" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Add Movie</Link>
//                     <Link to="/admin/add-hall" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Add Hall</Link>
//                     <Link to="/admin/add-showtime" className="block text-gray-400 hover:text-yellow-400" onClick={() => setIsMobileMenuOpen(false)}>Schedule</Link>
//                   </div>
//                 )}
                
//                 {user.role === 'user' && (
//                    <Link to="/my-tickets" className="flex items-center gap-2 text-gray-300 hover:text-green-400 py-2" onClick={() => setIsMobileMenuOpen(false)}>
//                       <Ticket size={20} /> My Tickets
//                    </Link>
//                 )}

//                 <div className="pt-4 mt-2">
//                    <Link to={getDashboardLink()} className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl mb-4" onClick={() => setIsMobileMenuOpen(false)}>
//                         <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
//                             {user.profileImage && user.profileImage.startsWith('http') ? (
//                                 <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover"/>
//                             ) : (
//                                 <User size={24} className="text-gray-400"/>
//                             )}
//                         </div>
//                         <div>
//                             <p className="font-bold text-white text-lg">{user.username}</p>
//                             <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                    </Link>
                   
//                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition font-semibold">
//                        <LogOut size={20} /> Logout
//                    </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col gap-4 pt-2">
//                 <Link to="/login" className="block w-full text-center py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
//                 <Link to="/register" className="block w-full text-center py-3 rounded-lg bg-red-600 text-white hover:bg-red-500" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;