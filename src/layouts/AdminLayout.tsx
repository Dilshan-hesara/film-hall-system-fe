import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar'; 
import Topbar from '../components/admin/Topbar'; 

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Authentication Check
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        navigate('/login');
        return;
    }
    const userData = JSON.parse(userString);
    if(userData.role !== 'admin' && userData.role !== 'superadmin') {
        navigate('/'); // User 
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")){
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        handleLogout={handleLogout}
      />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* 2.1 TOPBAR */}
        <Topbar 
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
            user={user}
        />

        {/* 2.2 PAGE CONTENT (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-900 custom-scrollbar relative">
            <Outlet />
        </main>

      </div>

      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
};

export default AdminLayout;