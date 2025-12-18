
import React from 'react';
import { Users, DollarSign, Utensils, AlertTriangle, TrendingUp, ShoppingBag, UserPlus } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { Order } from '@/types';

const AdminDashboard: React.FC = () => {
  const { orders, users, restaurants } = useDataStore();

  // Calculate Real-time Stats
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeUsers = users.filter(u => (u as any).status !== 'Suspended').length;
  const pendingRestaurants = 3; // Mock pending count
  
  // Calculate Growth (Mock logic comparing to "last month")
  const revenueGrowth = 12; 

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: 'bg-green-500' },
    { label: "Active Users", value: activeUsers.toString(), icon: Users, color: 'bg-blue-500' },
    { label: "Restaurants", value: restaurants.length.toString(), icon: Utensils, color: 'bg-orange-500' },
    { label: "Pending Approvals", value: pendingRestaurants.toString(), icon: AlertTriangle, color: 'bg-red-500' },
  ];

  // Derive Recent Activity from Orders and Users
  const recentOrders = orders.slice(0, 3).map(o => ({
    type: 'order',
    message: `New order #${o.id.split('-')[1]} placed by ${o.customerName}`,
    time: 'Just now', // In a real app, calculate relative time
    id: o.id
  }));

  const recentUsers = users.slice(0, 2).map(u => ({
    type: 'user',
    message: `New user registration: ${u.name}`,
    time: '2 hours ago',
    id: u.id
  }));

  const activityFeed = [...recentOrders, ...recentUsers].sort(() => Math.random() - 0.5); // Shuffle for demo feel

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl text-white shadow-lg shadow-gray-200 ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <TrendingUp size={12} className="mr-1" /> +{revenueGrowth}% from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Recent System Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.type === 'order' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {item.type === 'order' ? <ShoppingBag size={14} /> : <UserPlus size={14} />}
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">{item.message}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
            {activityFeed.length === 0 && (
              <p className="text-gray-400 text-sm">No recent activity.</p>
            )}
          </div>
        </div>

        {/* Operational Issues */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Operational Alerts</h3>
          <div className="space-y-4">
             <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
               <AlertTriangle className="text-red-500" size={20} />
               <div>
                 <p className="text-sm font-bold text-red-700">High Dispute Rate</p>
                 <p className="text-xs text-red-600">Region: Downtown Cairo (4 pending disputes)</p>
               </div>
               <button className="ml-auto text-xs bg-white px-2 py-1 rounded border border-red-200 text-red-700">View</button>
             </div>
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-center gap-3">
               <Users className="text-yellow-600" size={20} />
               <div>
                 <p className="text-sm font-bold text-yellow-800">Rider Shortage</p>
                 <p className="text-xs text-yellow-700">Area: New Cairo</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
