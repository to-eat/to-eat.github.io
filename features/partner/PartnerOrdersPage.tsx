
import React, { useState } from 'react';
import { Clock, ChefHat, CheckCircle2, Bike, XCircle, AlertTriangle } from 'lucide-react';
import { Order, OrderStatus } from '@/types';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';
import { useDataStore } from '@/store/useDataStore';

const PartnerOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useDataStore();
  const [filter, setFilter] = useState<'active' | 'completed'>('active');
  const [delayModalOpen, setDelayModalOpen] = useState<string | null>(null);

  const activeStatuses = ['Placed', 'Confirmed', 'Preparing', 'Rider Assigned', 'Out for Delivery'];
  const completedStatuses = ['Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => 
    filter === 'active' 
      ? activeStatuses.includes(o.status) 
      : completedStatuses.includes(o.status)
  );

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order updated to ${newStatus}`);
  };

  const handleDelay = (orderId: string, minutes: number) => {
    toast.success(`Customer notified: Order delayed by ${minutes} mins`);
    setDelayModalOpen(null);
  };

  const renderActions = (order: Order) => {
    switch (order.status) {
      case 'Placed':
        return (
          <div className="flex gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus(order.id, 'Confirmed')}>
              Accept
            </Button>
            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => updateStatus(order.id, 'Cancelled')}>
              Reject
            </Button>
          </div>
        );
      case 'Confirmed':
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => updateStatus(order.id, 'Preparing')}>
              Start Preparing
            </Button>
            <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 bg-orange-50" onClick={() => setDelayModalOpen(order.id)}>
              Delay
            </Button>
          </div>
        );
      case 'Preparing':
        return (
          <div className="flex gap-2">
             <Button size="sm" onClick={() => updateStatus(order.id, 'Rider Assigned')}>
               Ready for Pickup
             </Button>
             <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 bg-orange-50" onClick={() => setDelayModalOpen(order.id)}>
               Delay
             </Button>
          </div>
        );
      case 'Rider Assigned':
        return (
          <Button size="sm" disabled className="opacity-50 cursor-not-allowed">
            Waiting for Rider
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="bg-white rounded-lg p-1 border border-gray-200 flex">
          <button 
            onClick={() => setFilter('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'active' ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'completed' ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
             No {filter} orders found.
           </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Order Header Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-lg font-bold text-gray-900">#{order.id.split('-')[1]}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      order.status === 'Placed' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Preparing' ? 'bg-orange-100 text-orange-700' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock size={14} /> {order.date}
                    </span>
                  </div>
                  
                  {/* Items List */}
                  <div className="space-y-1 pl-4 border-l-2 border-gray-100 mt-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          <span className="font-bold text-gray-900">{item.quantity}x</span> {item.title}
                        </span>
                        <span className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-brand-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions Column */}
                <div className="w-full md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                  <div className="text-sm text-gray-500 mb-2">
                    <p className="font-medium text-gray-900 mb-1">Customer</p>
                    <p>Mahros AL-Qabasy</p>
                    <p>+20 1015888272</p>
                  </div>
                  {renderActions(order)}
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Delay Modal */}
      {delayModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-in zoom-in-95">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Delay Order</h3>
             </div>
             <p className="text-gray-500 text-sm mb-6">
               Running late? Select a time to notify the customer. This will update their tracking status.
             </p>
             <div className="grid grid-cols-2 gap-3 mb-6">
               {[5, 10, 15, 30].map(min => (
                 <button 
                  key={min}
                  onClick={() => handleDelay(delayModalOpen, min)}
                  className="py-3 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 font-medium transition-colors"
                 >
                   +{min} mins
                 </button>
               ))}
             </div>
             <Button variant="ghost" className="w-full" onClick={() => setDelayModalOpen(null)}>
               Cancel
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerOrdersPage;
