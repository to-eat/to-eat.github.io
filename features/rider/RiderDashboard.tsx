
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock, User } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';

const RiderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const orders = useDataStore((state) => state.orders);

  // Filter tasks: Riders look for 'Rider Assigned' or 'Ready' (Ready for Pickup)
  const tasks = orders.filter(o => ['Rider Assigned', 'Ready', 'Picked Up', 'Out for Delivery'].includes(o.status));
  const activeTask = tasks[0]; // For MVP, assume 1 active task at a time

  return (
    <div className="space-y-6">
      {/* Earnings Summary Card */}
      <div className="bg-brand-500 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-brand-100 text-sm font-medium mb-1">Today's Earnings</p>
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-bold">$42.50</h2>
          <div className="text-right">
             <p className="text-sm font-bold">5 Orders</p>
             <p className="text-xs text-brand-100">4h 20m Online</p>
          </div>
        </div>
      </div>

      {/* Current Task */}
      {activeTask ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
             <span className="font-bold text-orange-700 text-sm uppercase tracking-wide">
                {activeTask.status === 'Picked Up' || activeTask.status === 'Out for Delivery' ? 'Dropoff' : 'Pickup Task'}
             </span>
             <span className="text-xs font-bold bg-white text-orange-600 px-2 py-1 rounded">Est. Earn $5.50</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                   <img src={activeTask.items[0]?.image} className="w-full h-full rounded-full object-cover" />
                 </div>
                 <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                 <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                   <UserIcon size={16} />
                 </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900">{activeTask.items[0]?.restaurantName || 'Restaurant'}</h4>
                  <p className="text-gray-500 text-sm">Downtown, Cairo</p>
                  <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {activeTask.status}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{activeTask.customerName}</h4>
                  <p className="text-gray-500 text-sm">{activeTask.deliveryAddress || '123 Nile St, Cairo'}</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full gap-2" size="lg" onClick={() => navigate(`/rider/delivery/${activeTask.id}`)}>
              <Navigation size={18} />
              {activeTask.status === 'Out for Delivery' ? 'Navigate to Dropoff' : 'Navigate to Pickup'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
             <Navigation size={32} className="text-green-600" />
           </div>
           <h3 className="font-bold text-gray-900">Finding Orders...</h3>
           <p className="text-gray-500 text-sm mt-2">You are online. Stay in high-demand areas to get more requests.</p>
        </div>
      )}

      {/* Heatmap/Stats placeholder */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Hot Zones</h3>
        <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          <MapPin size={24} className="mr-2" /> Map View Unavailable
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default RiderDashboard;
