// import React from 'react';
// import { Menu, Bell, User } from 'lucide-react';

// interface TopbarProps {
//   toggleSidebar: () => void;
//   user: any;
// }

// const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, user }) => {
//   return (
//     <header className="h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 shadow-sm">
      
//       {/* Mobile Menu Button */}
//       <div className="flex items-center gap-4">
//         <button 
//             onClick={toggleSidebar} 
//             className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
//         >
//             <Menu size={24} />
//         </button>
        
//         {/* Breadcrumb / Title (Optional) */}
//         <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
//             Welcome back, <span className="text-yellow-500">{user?.username}</span> 👋
//         </h1>
//       </div>

//       {/* Right Side Icons */}
//       <div className="flex items-center gap-6">
        
//         {/* Notification Icon (Visual Only) */}
//         <button className="relative text-gray-400 hover:text-white transition">
//             <Bell size={22} />
//             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-900"></span>
//         </button>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
//             <div className="text-right hidden sm:block">
//                 <p className="text-sm font-bold text-white leading-none">{user?.username}</p>
//                 <p className="text-xs text-gray-500 uppercase mt-1">{user?.role}</p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
//                 {user?.profileImage ? (
//                     <img src={user.profileImage} alt="Admin" className="w-full h-full object-cover" />
//                 ) : (
//                     <User size={20} className="text-gray-400" />
//                 )}
//             </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Topbar;


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Menu, Bell, User, PlusCircle, 
//   LayoutDashboard, Film, Grid, CalendarPlus 
// } from 'lucide-react';

// interface TopbarProps {
//   toggleSidebar: () => void;
//   user: any;
// }

// const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, user }) => {
//   const location = useLocation();

//   // Helper for Shortcut Icons
//   const ShortcutBtn = ({ to, icon: Icon, label }: any) => {
//     const isActive = location.pathname === to;
//     return (
//       <Link 
//         to={to} 
//         title={label}
//         className={`p-2 rounded-lg transition-all duration-200 ${
//             isActive 
//             ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
//             : 'text-gray-400 hover:text-white hover:bg-gray-800'
//         }`}
//       >
//         <Icon size={20} />
//       </Link>
//     );
//   };

//   return (
//     <header className="h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 shadow-sm">
      
//       {/* LEFT SIDE: Mobile Menu & Welcome Text */}
//       <div className="flex items-center gap-4">
//         <button 
//             onClick={toggleSidebar} 
//             className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
//         >
//             <Menu size={24} />
//         </button>
        
//         <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
//             <span className="text-gray-500">Hello,</span> <span className="text-yellow-500">{user?.username}</span>
//         </h1>
//       </div>

//       {/* RIGHT SIDE: Shortcuts & Profile */}
//       <div className="flex items-center gap-6">
        
//         {/* 👇 QUICK SHORTCUTS BAR (New) */}
//         <div className="hidden md:flex items-center gap-2 pr-6 border-r border-gray-800">
//             <ShortcutBtn to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
//             <ShortcutBtn to="/admin/add-movie" icon={Film} label="Add Movie" />
//             <ShortcutBtn to="/admin/add-hall" icon={Grid} label="Add Hall" />
//             <ShortcutBtn to="/admin/add-showtime" icon={CalendarPlus} label="Schedule Show" />
//         </div>

//         {/* Notification Bell */}
//         <button className="relative text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800">
//             <Bell size={22} />
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
//         </button>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3">
//             <div className="text-right hidden sm:block">
//                 <p className="text-sm font-bold text-white leading-none capitalize">{user?.username}</p>
//                 <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider">{user?.role}</p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
//                 {user?.profileImage ? (
//                     <img src={user.profileImage} alt="Admin" className="w-full h-full object-cover" />
//                 ) : (
//                     <User size={20} className="text-gray-400" />
//                 )}
//             </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Topbar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Menu, Bell, User, 
//   LayoutDashboard, Film, Grid, CalendarPlus, 
//   Home // 👇 Home Icon එක import කරන්න
// } from 'lucide-react';

// interface TopbarProps {
//   toggleSidebar: () => void;
//   user: any;
// }

// const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, user }) => {
//   const location = useLocation();

//   // Helper for Shortcut Icons
//   const ShortcutBtn = ({ to, icon: Icon, label, highlight }: any) => {
//     const isActive = location.pathname === to;
//     return (
//       <Link 
//         to={to} 
//         title={label}
//         className={`p-2 rounded-lg transition-all duration-200 ${
//             isActive 
//             ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
//             : highlight 
//                 ? 'text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400' // Special Style for Home
//                 : 'text-gray-400 hover:text-white hover:bg-gray-800'
//         }`}
//       >
//         <Icon size={20} />
//       </Link>
//     );
//   };

//   return (
//     <header className="h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 shadow-sm">
      
//       {/* LEFT SIDE: Mobile Menu & Welcome Text */}
//       <div className="flex items-center gap-4">
//         <button 
//             onClick={toggleSidebar} 
//             className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
//         >
//             <Menu size={24} />
//         </button>
        
//         <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
//             <span className="text-gray-500">Hello,</span> <span className="text-yellow-500">{user?.username}</span>
//         </h1>
//       </div>

//       {/* RIGHT SIDE: Shortcuts & Profile */}
//       <div className="flex items-center gap-6">
        
//         {/* 👇 QUICK SHORTCUTS BAR */}
//         <div className="hidden md:flex items-center gap-2 pr-6 border-r border-gray-800">
            
//             {/* 🏠 HOME ICON (Website එකට යන්න) */}
//             <ShortcutBtn to="/" icon={Home} label="Go to Website" highlight={true} />
            
//             <div className="w-px h-6 bg-gray-700 mx-2"></div> {/* පොඩි ඉරක් වෙන් කරන්න */}

//             <ShortcutBtn to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
//             <ShortcutBtn to="/admin/add-movie" icon={Film} label="Add Movie" />
//             <ShortcutBtn to="/admin/add-hall" icon={Grid} label="Add Hall" />
//             <ShortcutBtn to="/admin/add-showtime" icon={CalendarPlus} label="Schedule Show" />
//         </div>

//         {/* Notification Bell */}
//         <button className="relative text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800">
//             <Bell size={22} />
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
//         </button>

//         {/* Profile Section */}
//         <div className="flex items-center gap-3">
//             <div className="text-right hidden sm:block">
//                 <p className="text-sm font-bold text-white leading-none capitalize">{user?.username}</p>
//                 <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider">{user?.role}</p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
//                 {user?.profileImage ? (
//                     <img src={user.profileImage} alt="Admin" className="w-full h-full object-cover" />
//                 ) : (
//                     <User size={20} className="text-gray-400" />
//                 )}
//             </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Topbar;



// v4

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, Bell, User, 
  LayoutDashboard, Film, Grid, CalendarPlus, 
  Home, Settings 
} from 'lucide-react';

interface TopbarProps {
  toggleSidebar: () => void;
  user: any;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, user }) => {
  const location = useLocation();

  // Helper Component: Shortcut Button
  const ShortcutBtn = ({ to, icon: Icon, label, highlight }: any) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        title={label}
        className={`p-2 rounded-lg transition-all duration-200 ${
            isActive 
            ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
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
      
      {/* LEFT SIDE: Mobile Menu Button & Welcome Text */}
      <div className="flex items-center gap-4">
        <button 
            onClick={toggleSidebar} 
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
        >
            <Menu size={24} />
        </button>
        
        <h1 className="text-lg font-semibold text-gray-200 hidden md:block">
            <span className="text-gray-500">Hello,</span> <span className="text-yellow-500 font-bold">{user?.username}</span>
        </h1>
      </div>

      {/* RIGHT SIDE: Shortcuts & Profile */}
      <div className="flex items-center gap-6">
        
        {/* 👇 QUICK SHORTCUTS BAR */}
        <div className="hidden md:flex items-center gap-2 pr-6 border-r border-gray-800">
            
            {/* Website Home */}
            <ShortcutBtn to="/" icon={Home} label="Go to Website" highlight={true} />
            
            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            {/* Admin Actions */}
            <ShortcutBtn to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <ShortcutBtn to="/admin/add-movie" icon={Film} label="Add Movie" />
            <ShortcutBtn to="/admin/add-hall" icon={Grid} label="Add Hall" />
            <ShortcutBtn to="/admin/add-showtime" icon={CalendarPlus} label="Schedule Show" />
            
            {/* 👇 SETTINGS ICON (New) */}
            <ShortcutBtn to="/admin/profile" icon={Settings} label="Account Settings" />
        </div>

        {/* Notification Bell */}
        <button className="relative text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></span>
        </button>

        {/* Profile Section */}
        <Link to="/admin/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none capitalize group-hover:text-yellow-500 transition">{user?.username}</p>
                <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider font-semibold">
                    {user?.role === 'superadmin' ? <span className="text-red-500">Super Admin</span> : 'Admin'}
                </p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-yellow-500 transition">
                {user?.profileImage ? (
                    <img src={user.profileImage} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                    <User size={20} className="text-gray-400 group-hover:text-yellow-500" />
                )}
            </div>
        </Link>

      </div>
    </header>
  );
};

export default Topbar;