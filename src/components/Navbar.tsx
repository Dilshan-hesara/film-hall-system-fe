// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar: React.FC = () => {
//     const navigate = useNavigate();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     // LocalStorage එකෙන් User දත්ත ගැනීම
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     const handleLogout = () => {
//         // දත්ත මකා දැමීම
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');

//         // Login එකට යැවීම
//         navigate('/login');
//         window.location.reload(); // Navbar එක refresh වෙන්න
//     };

//     return (
//         <nav className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-50">
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-between items-center h-16">

//                     {/* 1. Logo */}
//                     <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
//                         🎬 <span className="text-blue-500">MKD</span>Cinemas
//                     </Link>

//                     {/* 2. Desktop Menu */}
//                     <div className="hidden md:flex items-center space-x-6">
//                         <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>

//                         {/* User Log වෙලා ඉන්නවා නම් */}
//                         {user ? (
//                             <>
//                                 {/* Admin Links */}
//                                 {user.role === 'admin' && (
//                                     <>
//                                         <Link to="/admin/add-movie" className="text-gray-300 hover:text-purple-400">Add Movie</Link>
//                                         <Link to="/admin/add-hall" className="text-gray-300 hover:text-purple-400">Add Hall</Link>
//                                         <Link to="/admin/add-showtime" className="text-gray-300 hover:text-purple-400">Schedule</Link>
//                                     </>
//                                 )}

//                                 {/* Normal User Links */}
//                                 {user.role === 'user' && (
//                                     <Link to="/my-bookings" className="text-gray-300 hover:text-green-400">My Tickets</Link>
//                                 )}

//                                 {/* User Info & Logout */}
//                                 <span className="text-blue-400 font-semibold border border-blue-400 px-3 py-1 rounded-full text-sm">
//                                     {user.username}
//                                 </span>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm font-bold transition"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             /* User Log වෙලා නැත්නම් */
//                             <>
//                                 <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
//                                 <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition">
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                     </div>

//                     {/* 3. Mobile Menu Button (Hamburger) */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                             className="text-gray-300 hover:text-white focus:outline-none"
//                         >
//                             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 {isMobileMenuOpen ? (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                 ) : (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                                 )}
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* 4. Mobile Menu Dropdown */}
//             {isMobileMenuOpen && (
//                 <div className="md:hidden bg-gray-700 pb-4 px-4">
//                     <Link to="/" className="block py-2 text-gray-300 hover:text-white">Home</Link>

//                     {user ? (
//                         <>
//                             {user.role === 'admin' && (
//                                 <>
//                                     <Link to="/admin/add-movie" className="block py-2 text-gray-300 hover:text-purple-400">Add Movie</Link>
//                                     <Link to="/admin/add-hall" className="block py-2 text-gray-300 hover:text-purple-400">Add Hall</Link>
//                                     <Link to="/admin/add-showtime" className="block py-2 text-gray-300 hover:text-purple-400">Schedule</Link>
//                                 </>
//                             )}
//                             {user.role === 'user' && (
//                                 <Link to="/my-bookings" className="block py-2 text-gray-300 hover:text-green-400">My Tickets</Link>
//                             )}
//                             <div className="border-t border-gray-600 my-2 pt-2">
//                                 <p className="text-blue-400 text-sm mb-2">Signed in as: {user.username}</p>
//                                 <button onClick={handleLogout} className="w-full text-left py-2 text-red-400 hover:text-red-300">Logout</button>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" className="block py-2 text-gray-300 hover:text-white">Login</Link>
//                             <Link to="/register" className="block py-2 text-blue-400 hover:text-blue-300">Register</Link>
//                         </>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;


// v3 


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Menu, X, User, LogOut, Ticket, Film, LayoutDashboard } from 'lucide-react';

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   // User Data එක LocalStorage එකෙන් ගන්න (Location වෙනස් වෙන හැම වෙලාවෙම Update වෙනවා)
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

//   // Active Link එකට පාට දාන්න Helper Function එකක්
//   const isActive = (path: string) => location.pathname === path ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-white';

//   return (
//     <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex justify-between items-center h-20">
          
//           {/* 1. LOGO */}
//           <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 tracking-wide">
//             <Film className="text-red-600" size={28} />
//             <span>
//               <span className="text-red-600">MKD</span> Cinemas
//             </span>
//           </Link>

//           {/* 2. DESKTOP MENU */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            
//             {user ? (
//               <>
//                 {/* --- ADMIN LINKS --- */}
//                 {/* {user.role === 'admin' && (
//                   <>
//                     <Link to="/admin/add-movie" className={`${isActive('/admin/add-movie')} transition-colors`}>Add Movie</Link>
//                     <Link to="/admin/add-hall" className={`${isActive('/admin/add-hall')} transition-colors`}>Add Hall</Link>
//                     <Link to="/admin/add-showtime" className={`${isActive('/admin/add-showtime')} transition-colors`}>Schedule</Link>
//                   </>
//                 )} */}

//                 {/* --- USER LINKS --- */}
//                 {user.role === 'user' && (
//                    <Link to="/my-tickets" className={`flex items-center gap-2 transition-colors ${isActive('/my-tickets')}`}>
//                       <Ticket size={18} /> My Tickets
//                    </Link>
//                 )}

//                 <div className="h-6 w-px bg-gray-700 mx-2"></div> {/* Divider */}

//                 {/* --- PROFILE SECTION --- */}
//                 <div className="flex items-center gap-4">
                    
//                     {/* Username & Avatar (Clickable) */}
//                     <Link to="/dashboard" className="flex items-center gap-3 group">
//                         <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-yellow-500 transition-all overflow-hidden">
//                             {/* 👇 Avatar Check Logic */}
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

//                     {/* Logout Button */}
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
//               /* --- GUEST LINKS --- */
//               <div className="flex items-center gap-4">
//                 <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Login</Link>
//                 <Link to="/register" className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition shadow-lg shadow-red-600/20">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* 3. MOBILE MENU BUTTON */}
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

//       {/* 4. MOBILE MENU DROPDOWN */}
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
//                    <Link to="/dashboard" className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl mb-4" onClick={() => setIsMobileMenuOpen(false)}>
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