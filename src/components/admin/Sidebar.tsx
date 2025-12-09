import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Film, Users, Ticket, Settings, 
  ShieldCheck, Calendar, LogOut, X, Film as FilmIcon 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const location = useLocation();

  // Helper for Links
  const NavItem = ({ to, icon: Icon, label }: any) => (
    <Link 
        to={to} 
        onClick={toggleSidebar} 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
            location.pathname === to 
            ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
    >
        <Icon size={20} className={location.pathname === to ? 'text-white' : 'text-gray-500 group-hover:text-white'} /> 
        <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex flex-col h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
        {/* LOGO AREA */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
                <FilmIcon className="text-red-600" size={28} />
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">MKD <span className="text-red-600">ADMIN</span></h2>
                </div>
            </Link>
            {/* Close Button (Mobile Only) */}
            <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">
                <X size={24} />
            </button>
        </div>
        
        {/* MENU LINKS */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            <div className="text-xs font-bold text-gray-500 uppercase px-3 mb-3 mt-4 tracking-wider">Overview</div>
            <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
            
            <div className="text-xs font-bold text-gray-500 uppercase px-3 mb-3 mt-6 tracking-wider">Cinema</div>
            <NavItem to="/admin/manage-movies" icon={Film} label="Movies" />
            <NavItem to="/admin/manage-halls" icon={Settings} label="Halls" />
            <NavItem to="/admin/manage-schedule" icon={Calendar} label="Schedule" />
            
            <div className="text-xs font-bold text-gray-500 uppercase px-3 mb-3 mt-6 tracking-wider">Operations</div>
            <NavItem to="/admin/manage-bookings" icon={Ticket} label="Bookings" />
            <NavItem to="/admin/manage-users" icon={Users} label="Users" />
            <NavItem to="/admin/manage-admins" icon={ShieldCheck} label="Admins" />
        </nav>

        {/* BOTTOM LOGOUT */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition font-semibold border border-red-900/30 hover:border-red-500/50"
            >
                <LogOut size={18} /> Logout Session
            </button>
        </div>
    </aside>
  );
};

export default Sidebar;