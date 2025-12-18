
import React, { useState } from 'react';
import { Search, AlertCircle, RefreshCcw, Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { toast } from 'sonner';

const AdminOrdersPage: React.FC = () => {
  const { orders, resolveDispute } = useDataStore();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'All' ? true : 
                          filter === 'Disputed' ? o.isDisputed && o.disputeStatus === 'Open' :
                          o.status === filter;
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const disputedCount = orders.filter(o => o.isDisputed && o.disputeStatus === 'Open').length;

  const handleResolve = (orderId: string, resolution: 'Refunded' | 'Resolved') => {
    resolveDispute(orderId, resolution);
    toast.success(`Order ${orderId} marked as ${resolution}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Global Orders</h1>
        <div className="flex gap-2">
           <Button 
             variant={filter === 'Disputed' ? 'primary' : 'outline'}
             className={`${filter === 'Disputed' ? 'bg-red-600 hover:bg-red-700 border-red-600' : 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100'}`}
             onClick={() => setFilter('Disputed')}
           >
             <AlertCircle size={16} className="mr-2" />
             Disputes ({disputedCount})
           </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by order ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-white outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Disputed">Active Disputes</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Restaurant</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${order.isDisputed && order.disputeStatus === 'Open' ? 'bg-red-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900 font-bold">#{order.id.split('-')[1]}</span>
                    {order.isDisputed && order.disputeStatus === 'Open' && (
                      <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">
                        Disputed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                     {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                     {order.items[0]?.restaurantName || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                    {order.disputeStatus && order.disputeStatus !== 'Open' && (
                      <span className="block text-[10px] text-gray-400 mt-1">
                        Dispute: {order.disputeStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex justify-end gap-2">
                       {/* Dispute Actions */}
                       {order.isDisputed && order.disputeStatus === 'Open' ? (
                         <>
                           <button 
                             onClick={() => handleResolve(order.id, 'Refunded')}
                             className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                             title={order.disputeReason}
                           >
                             Refund
                           </button>
                           <button 
                             onClick={() => handleResolve(order.id, 'Resolved')}
                             className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-colors"
                           >
                             Dismiss
                           </button>
                         </>
                       ) : (
                         <button className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-gray-100 rounded flex items-center gap-1 text-xs font-medium border border-gray-200">
                           <Eye size={14} /> View
                         </button>
                       )}
                     </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
