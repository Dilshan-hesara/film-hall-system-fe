import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { LayoutDashboard, Monitor, Search, LogOut, QrCode, User } from 'lucide-react';

const ReceptionSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { path: '/reception/reception-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/reception/pos', icon: Monitor, label: 'Counter booking (POS)' },
    
    { path: '/reception/scan-tickets', icon: QrCode, label: 'Scan Tickets' },
    
    { path: '/reception/find-booking', icon: Search, label: 'Find booking' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col text-white flex-shrink-0">
      
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl">M</div>
        <span className="text-xl font-bold tracking-wide">MKD <span className="text-red-500">CINEMA</span></span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Reception Menu</p>
        
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              isActive(item.path)
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>             


      {/* User Info */}
      <div className="p-4 border-t border-gray-800">
<Link 
          to="/reception/profile" 
          className="flex items-center gap-3 px-4 py-2 mb-4 rounded-xl hover:bg-gray-800 transition-all cursor-pointer group"
          title="Go to Profile"
        >
<div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
  <LayoutDashboard size={20} className="text-gray-300 group-hover:text-white"/>
</div>
           <div>
             <p className="font-bold group-hover:text-blue-400 transition-colors">Receptionist</p>
             <p className="text-xs text-gray-500">Counter Operator</p>
           </div>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 hover:border-red-500 hover:text-red-500 text-gray-300 py-3 rounded-xl transition-all font-bold"
        >
          <LogOut size={18}/> Logout Session
        </button>
      </div>
    </div>
  );
};

export default ReceptionSidebar;