import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, Bell, User, 
  LayoutDashboard, Monitor, Search, 
  Home 
} from 'lucide-react';

interface TopbarProps {
  toggleSidebar?: () => void;
  user: any;
}

const ReceptionTopbar: React.FC<TopbarProps> = ({ toggleSidebar, user }) => {
  const location = useLocation();

  // Shortcut Button Component
  const ShortcutBtn = ({ to, icon: Icon, label, highlight }: any) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        title={label}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
            isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
            : highlight 
                ? 'text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Icon size={20} />
      </Link>
    );
  };

  return (
    <header className="h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 shadow-sm">
      
      {/* LEFT SIDE: Menu & Welcome */}
      <div className="flex items-center gap-4">
        {toggleSidebar && (
            <button 
                onClick={toggleSidebar} 
                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            >
                <Menu size={24} />
            </button>
        )}
        
        <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
            <span className="text-gray-500">Welcome,</span> <span className="text-blue-400 font-bold">{user?.username || 'Receptionist'}</span>
        </h1>
      </div>

      {/* RIGHT SIDE: Shortcuts & Profile */}
      <div className="flex items-center gap-6 h-full">
        
        {/* SHORTCUTS CONTAINER (Flex Row & Centered) */}
        <div className="hidden md:flex items-center gap-2 pr-6 border-r border-gray-800 h-12 my-auto">
            
            {/* 1. Website Home Button */}
            <ShortcutBtn to="/" icon={Home} label="Go to Website" highlight={true} />
            
            {/* Divider Line (Vertical Center) */}
            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            {/* 2. Reception Actions */}
            <ShortcutBtn to="/reception/reception-dashboard" icon={LayoutDashboard} label="Dashboard" />
            <ShortcutBtn to="/reception/pos" icon={Monitor} label="POS (Counter)" />
            <ShortcutBtn to="/reception/find-booking" icon={Search} label="Find Booking" />
            
        </div>

        {/* Notification Bell */}
        <button className="relative text-gray-400 hover:text-white transition w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800">
            <Bell size={22} />
        </button>

        {/* PROFILE SECTION (Now Clickable & Links to Profile Page) */}
        <Link to="/reception/profile" className="flex items-center gap-3 group cursor-pointer">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none capitalize group-hover:text-blue-400 transition">{user?.username}</p>
                <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider font-semibold">
                    Reception Desk
                </p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition">
                {user?.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={20} className="text-gray-400 group-hover:text-blue-500" />
                )}
            </div>
        </Link>

      </div>
    </header>
  );
};

export default ReceptionTopbar;