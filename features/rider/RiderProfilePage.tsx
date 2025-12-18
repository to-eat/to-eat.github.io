
import React, { useState } from 'react';
import { User, Shield, Bike, Star, FileText, ChevronRight, Settings, Bell, Map } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

const RiderProfilePage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  // Mock Rider Data
  const rider = {
    name: 'Mike R.',
    email: 'mike.rider@to-eat.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
    vehicle: 'Yamaha NMAX (2022)',
    plate: 'ABC-1234',
    rating: 4.9,
    deliveries: 1240,
    acceptanceRate: '98%',
    joined: 'Aug 2023'
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
            <img src={rider.avatar} alt={rider.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{rider.name}</h1>
            <p className="text-gray-500 text-sm">Rider ID: #R-9921</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-gray-500 mb-1">{isOnline ? 'Online' : 'Offline'}</span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isOnline ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{rider.rating}</p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" /> Rating
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{rider.deliveries}</p>
            <p className="text-xs text-gray-500">Trips</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{rider.acceptanceRate}</p>
            <p className="text-xs text-gray-500">Acceptance</p>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-700 flex items-center gap-2">
          <Bike size={18} /> Vehicle Details
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Vehicle Type</span>
            <span className="font-medium text-gray-900">Motorcycle</span>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Model</span>
            <span className="font-medium text-gray-900">{rider.vehicle}</span>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">License Plate</span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-800">{rider.plate}</span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-700 flex items-center gap-2">
          <Shield size={18} /> Compliance & Documents
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-green-50 rounded-lg text-green-600">
                 <FileText size={16} />
               </div>
               <div>
                 <p className="font-medium text-sm text-gray-900">Driver's License</p>
                 <p className="text-xs text-green-600">Verified</p>
               </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
           <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-green-50 rounded-lg text-green-600">
                 <FileText size={16} />
               </div>
               <div>
                 <p className="font-medium text-sm text-gray-900">Vehicle Insurance</p>
                 <p className="text-xs text-green-600">Verified</p>
               </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm text-gray-700 flex items-center gap-2">
          <Settings size={18} /> App Preferences
        </div>
        <div className="divide-y divide-gray-100">
           <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                 <Map size={16} />
               </div>
               <span className="font-medium text-sm text-gray-900">Navigation App</span>
            </div>
            <span className="text-sm text-brand-600 font-medium">Google Maps</span>
          </div>
           <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                 <Bell size={16} />
               </div>
               <span className="font-medium text-sm text-gray-900">Notifications</span>
            </div>
            <span className="text-sm text-brand-600 font-medium">On</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
        Log Out
      </Button>
    </div>
  );
};

export default RiderProfilePage;
