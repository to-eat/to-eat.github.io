
import React from 'react';
import { useDataStore } from '@/store/useDataStore';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';

const PartnerKDSPage: React.FC = () => {
  const { orders, updateOrderStatus } = useDataStore();

  // KDS only cares about: Confirmed (To Prep) -> Preparing (Cooking) -> Rider Assigned (Ready)
  const activeOrders = orders.filter(o => 
    ['Confirmed', 'Preparing'].includes(o.status)
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleBump = (orderId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Confirmed' ? 'Preparing' : 'Rider Assigned';
    updateOrderStatus(orderId, nextStatus);
    toast.success(`Order #${orderId.split('-')[1]} moved to ${nextStatus}`);
  };

  const getTimerColor = (orderDate: string) => {
    // Mock logic: if order is "old", show red.
    // In real app, compare Date.now() with orderDate timestamp
    return 'text-green-600'; 
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
          <p className="text-gray-500 text-sm">Real-time ticket management for your kitchen staff.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-blue-500"></div>
             <span className="text-sm font-bold text-gray-700">New ({activeOrders.filter(o => o.status === 'Confirmed').length})</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-orange-500"></div>
             <span className="text-sm font-bold text-gray-700">Cooking ({activeOrders.filter(o => o.status === 'Preparing').length})</span>
           </div>
        </div>
      </div>

      {activeOrders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400">
           <CheckCircle2 size={64} className="mb-4 text-gray-300" />
           <h2 className="text-2xl font-bold">All Caught Up!</h2>
           <p>No active tickets in the queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-8">
          {activeOrders.map(order => (
            <div 
              key={order.id} 
              className={`flex flex-col rounded-xl border-t-4 shadow-sm bg-white overflow-hidden transition-all ${
                order.status === 'Confirmed' ? 'border-blue-500 ring-1 ring-blue-100' : 'border-orange-500 ring-1 ring-orange-100'
              }`}
            >
              {/* Ticket Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="font-mono text-xl font-bold text-gray-900">#{order.id.split('-')[1]}</h3>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 font-mono font-bold text-sm ${getTimerColor(order.date)}`}>
                    <Clock size={14} /> 12:00
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide ${
                    order.status === 'Confirmed' ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {order.status === 'Confirmed' ? 'To Prep' : 'Cooking'}
                  </span>
                </div>
              </div>

              {/* Ticket Items */}
              <div className="p-4 flex-1 overflow-y-auto min-h-[160px] space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-bold text-lg text-gray-900 w-6 text-center shrink-0">{item.quantity}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <p className="text-xs text-gray-500">
                           + {item.selectedOptions.join(', ')}
                        </p>
                      )}
                      {item.instructions && (
                        <div className="mt-1 bg-yellow-50 text-yellow-800 text-xs p-1.5 rounded border border-yellow-100 flex gap-1 items-start">
                          <AlertCircle size={10} className="mt-0.5 shrink-0" />
                          <span className="italic">{item.instructions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ticket Footer / Action */}
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <Button 
                  className={`w-full py-4 text-lg font-bold ${
                    order.status === 'Confirmed' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                  onClick={() => handleBump(order.id, order.status)}
                >
                  {order.status === 'Confirmed' ? 'Start Cooking' : 'Mark Ready'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerKDSPage;
