import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // LocalStorage එකෙන් User දත්ත ගැනීම
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        // දත්ත මකා දැමීම
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Login එකට යැවීම
        navigate('/login');
        window.location.reload(); // Navbar එක refresh වෙන්න
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* 1. Logo */}
                    <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                        🎬 <span className="text-blue-500">MKD</span>Cinemas
                    </Link>

                    {/* 2. Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>

                        {/* User Log වෙලා ඉන්නවා නම් */}
                        {user ? (
                            <>
                                {/* Admin Links */}
                                {user.role === 'admin' && (
                                    <>
                                        <Link to="/admin/add-movie" className="text-gray-300 hover:text-purple-400">Add Movie</Link>
                                        <Link to="/admin/add-hall" className="text-gray-300 hover:text-purple-400">Add Hall</Link>
                                        <Link to="/admin/add-showtime" className="text-gray-300 hover:text-purple-400">Schedule</Link>
                                    </>
                                )}

                                {/* Normal User Links */}
                                {user.role === 'user' && (
                                    <Link to="/my-bookings" className="text-gray-300 hover:text-green-400">My Tickets</Link>
                                )}

                                {/* User Info & Logout */}
                                <span className="text-blue-400 font-semibold border border-blue-400 px-3 py-1 rounded-full text-sm">
                                    {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm font-bold transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            /* User Log වෙලා නැත්නම් */
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* 3. Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-700 pb-4 px-4">
                    <Link to="/" className="block py-2 text-gray-300 hover:text-white">Home</Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <>
                                    <Link to="/admin/add-movie" className="block py-2 text-gray-300 hover:text-purple-400">Add Movie</Link>
                                    <Link to="/admin/add-hall" className="block py-2 text-gray-300 hover:text-purple-400">Add Hall</Link>
                                    <Link to="/admin/add-showtime" className="block py-2 text-gray-300 hover:text-purple-400">Schedule</Link>
                                </>
                            )}
                            {user.role === 'user' && (
                                <Link to="/my-bookings" className="block py-2 text-gray-300 hover:text-green-400">My Tickets</Link>
                            )}
                            <div className="border-t border-gray-600 my-2 pt-2">
                                <p className="text-blue-400 text-sm mb-2">Signed in as: {user.username}</p>
                                <button onClick={handleLogout} className="w-full text-left py-2 text-red-400 hover:text-red-300">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 text-gray-300 hover:text-white">Login</Link>
                            <Link to="/register" className="block py-2 text-blue-400 hover:text-blue-300">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;