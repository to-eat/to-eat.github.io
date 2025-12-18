
import React from 'react';
import { DollarSign, ShoppingBag, Star, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';

const PartnerDashboard: React.FC = () => {
  const { orders } = useDataStore();

  // Calculate live stats
  const activeOrders = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status));
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: '+12%', color: 'bg-green-100 text-green-600' },
    { label: "Active Orders", value: activeOrders.length.toString(), icon: ShoppingBag, trend: 'High', color: 'bg-blue-100 text-blue-600' },
    { label: "Rating", value: '4.8', icon: Star, trend: '+0.1', color: 'bg-yellow-100 text-yellow-600' },
    { label: "Total Orders", value: orders.length.toString(), icon: TrendingUp, trend: '+24', color: 'bg-purple-100 text-purple-600' },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend} <ArrowUpRight size={12} className="ml-1" />
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Orders Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Live Activity</h3>
            <button className="text-brand-600 text-sm font-medium hover:underline">View All Orders</button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 border border-gray-200 font-mono text-xs">
                    #{order.id.split('-')[1] || order.id.slice(-4)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{order.customerName}</h4>
                    <p className="text-xs text-gray-500">{order.items.length} items • ${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                    <Clock size={12} className="mr-1" /> {order.date}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Widget */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Popular Items</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-bold text-gray-300 text-lg">0{i+1}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">Feteer Meshaltet</h4>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${80 - (i*20)}%` }}></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-600">82 sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
