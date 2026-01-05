import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../../services/user';
import { Search, Trash2, User, ShieldCheck, Mail, Shield } from 'lucide-react';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Search Logic
  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // 3. Change Role Handler (Make Admin / Revoke)
  const handleRoleChange = async (id: string, currentRole: string) => {
    if (id === currentUser._id) {
        alert("You cannot change your own role!");
        return;
    }

    const newRole = currentRole === 'user' ? 'admin' : 'user';
    const action = newRole === 'admin' ? "Make this user an ADMIN?" : "Remove ADMIN rights from this user?";

    if (window.confirm(action)) {
      try {
        await updateUserRole(id, newRole);
        alert(`User is now an ${newRole.toUpperCase()}`);
        fetchUsers();
      } catch (error) {
        alert("Failed to update role.");
      }
    }
  };

  // 4. Delete User Handler
  const handleDelete = async (id: string) => {
    if (id === currentUser._id) {
        alert("You cannot delete yourself!");
        return;
    }

    if (window.confirm("Are you sure you want to delete this user permanently?")) {
      try {
        await deleteUser(id);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        alert("Failed to delete user.");
      }
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Users...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              👥 User Management
            </h1>
            <p className="text-gray-400 text-sm">View, manage roles, and remove users.</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 flex gap-4">
             <span className="text-gray-400 text-sm">Total Users: <b className="text-white">{users.length}</b></span>
             <span className="text-gray-400 text-sm border-l border-gray-600 pl-4">Admins: <b className="text-yellow-500">{users.filter(u => u.role === 'admin').length}</b></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Name or Email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">User Info</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-700/30 transition">
                    
                    {/* User Info (Avatar + Name) */}
                    <td className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                                {user.profileImage ? (
                                    <img src={user.profileImage} alt="avatar" className="w-full h-full object-cover"/>
                                ) : (
                                    <User size={20} className="text-gray-400"/>
                                )}
                            </div>
                            <span className="font-bold text-white">{user.username}</span>
                        </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-300">
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-500"/> {user.email}
                        </div>
                    </td>

                    {/* Role Badge */}
                    <td className="p-4">
                        {user.role === 'admin' ? (
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-bold border border-yellow-500/30 w-fit">
                                <ShieldCheck size={12} /> Admin
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold border border-blue-500/30 w-fit">
                                <User size={12} /> User
                            </span>
                        )}
                    </td>

                    {/* Status (Verified/Not) */}
                    <td className="p-4">
                        {user.isVerified ? (
                            <span className="text-green-400 text-xs">Verified</span>
                        ) : (
                            <span className="text-red-400 text-xs">Pending</span>
                        )}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                        <div className="flex justify-center gap-3">
                            
                            {/* Make Admin Button */}
                            <button 
                                onClick={() => handleRoleChange(user._id, user.role)}
                                className={`p-2 rounded-lg transition border ${
                                    user.role === 'admin' 
                                    ? 'bg-gray-700 text-gray-400 border-gray-600 hover:text-white' 
                                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20'
                                }`}
                                title={user.role === 'admin' ? "Remove Admin Access" : "Make Admin"}
                            >
                                <Shield size={18} />
                            </button>

                            {/* Delete Button */}
                            <button 
                                onClick={() => handleDelete(user._id)}
                                className="p-2 bg-red-600/10 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition border border-red-600/20"
                                title="Delete User"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </td>

                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;