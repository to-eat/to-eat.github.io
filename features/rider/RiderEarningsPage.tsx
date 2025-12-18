
import React from 'react';
import { DollarSign, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';

const RiderEarningsPage: React.FC = () => {
  const orders = useDataStore(state => state.orders);

  // Filter completed orders for calculation
  const completedOrders = orders.filter(o => o.status === 'Delivered');
  
  // Basic earning calculation mock: 
  // Base fee $3.50 + $2.00 per item + Tip
  const calculateEarnings = (order: any) => {
    return 3.50 + (order.items.length * 2) + (order.tip || 0);
  };

  const totalEarnings = completedOrders.reduce((sum, order) => sum + calculateEarnings(order), 0);
  const totalTips = completedOrders.reduce((sum, order) => sum + (order.tip || 0), 0);

  // Generate dynamic chart data based on orders (simplified for demo to map to "days")
  // In a real app, group by date. Here we just mock distribution visually but use real total.
  const weeklyData = [
    { day: 'Mon', amount: totalEarnings * 0.1, height: '40%' },
    { day: 'Tue', amount: totalEarnings * 0.15, height: '50%' },
    { day: 'Wed', amount: totalEarnings * 0.2, height: '70%' },
    { day: 'Thu', amount: totalEarnings * 0.1, height: '40%' },
    { day: 'Fri', amount: totalEarnings * 0.25, height: '80%' },
    { day: 'Sat', amount: totalEarnings * 0.1, height: '30%' },
    { day: 'Sun', amount: totalEarnings * 0.1, height: '40%' },
  ];

  const recentTransactions = completedOrders.slice(0, 5).map(order => ({
    id: order.id,
    type: order.tip ? 'Delivery + Tip' : 'Delivery',
    date: order.date,
    amount: calculateEarnings(order)
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-gray-900 text-lg">Weekly Earnings</h2>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Calendar size={14} /> This Week
          </Button>
        </div>

        {/* Chart */}
        <div className="h-48 flex items-end justify-between gap-2 mb-6 px-2">
          {weeklyData.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
              <div 
                className="w-full bg-brand-100 rounded-t-lg relative group-hover:bg-brand-500 transition-colors"
                style={{ height: d.height }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  ${d.amount.toFixed(2)}
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{d.day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div>
            <p className="text-gray-500 text-xs">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Tips</p>
            <p className="text-2xl font-bold text-green-600">${totalTips.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No completed deliveries yet.</p>
          ) : (
            recentTransactions.map(tx => (
               <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                     <DollarSign size={18} />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm">{tx.type}</p>
                     <p className="text-xs text-gray-400">{tx.date}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-green-600">+${tx.amount.toFixed(2)}</span>
                   <ChevronRight size={16} className="text-gray-300" />
                 </div>
               </div>
            ))
          )}
        </div>
        <button className="w-full text-center text-sm font-bold text-brand-600 mt-4 py-2 hover:bg-brand-50 rounded-lg transition-colors">
          View Full History
        </button>
      </div>
    </div>
  );
};

export default RiderEarningsPage;
