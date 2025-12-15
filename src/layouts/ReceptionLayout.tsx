import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ReceptionSidebar from '../components/admin/ReceptionSidebar';
import ReceptionTopbar from '../components/admin/ReceptionTopbar'; // Import

const ReceptionLayout: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Sidebar */}
      <ReceptionSidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        
        <ReceptionTopbar user={user} />

        {/* Page Content (Scrollable) */}
        <div className="flex-grow overflow-y-auto bg-gray-900">
            <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ReceptionLayout;