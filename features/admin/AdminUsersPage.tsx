
import React, { useState } from 'react';
import { Search, History, Ban, CheckCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { toast } from 'sonner';

const AdminUsersPage: React.FC = () => {
  const { users, toggleUserStatus } = useDataStore();
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (userId: string, currentStatus?: string) => {
    toggleUserStatus(userId);
    toast.success(`User ${currentStatus === 'Active' ? 'suspended' : 'activated'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button variant="outline">Export Users</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-white outline-none">
            <option>All Roles</option>
            <option>User</option>
            <option>Rider</option>
            <option>Partner</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const status = (user as any).status || 'Active';
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs border border-brand-200 overflow-hidden">
                          {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 rounded border border-gray-200 text-xs font-medium bg-gray-50 text-gray-600 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.memberSince || 'N/A'}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded" title="View History">
                           <History size={18} />
                         </button>
                         <button 
                            onClick={() => handleToggleStatus(user.id, status)}
                            className={`p-1.5 rounded transition-colors ${status === 'Active' ? 'text-red-400 hover:text-red-600 hover:bg-red-50' : 'text-green-400 hover:text-green-600 hover:bg-green-50'}`} 
                            title={status === 'Active' ? "Suspend User" : "Activate User"}
                         >
                           {status === 'Active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                         </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
