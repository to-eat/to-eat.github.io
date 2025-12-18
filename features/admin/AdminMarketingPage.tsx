
import React, { useState } from 'react';
import { Plus, Trash2, Edit, Megaphone, Tag, Send, Bell } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';

type Tab = 'banners' | 'promos' | 'notifications';

const AdminMarketingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('banners');
  
  // Mock Data
  const banners = [
    { id: 1, title: 'Summer Sale', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600', status: 'Active' },
    { id: 2, title: 'Free Delivery Weekend', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600', status: 'Draft' },
  ];

  const promos = [
    { code: 'WELCOME50', discount: '50% OFF', usage: 1240, status: 'Active' },
    { code: 'FREESHIP', discount: 'Free Delivery', usage: 856, status: 'Active' },
    { code: 'LUNCH20', discount: '20% OFF', usage: 45, status: 'Expired' },
  ];

  // Notification State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');

  const handleSendNotification = () => {
    if (!notifTitle || !notifMessage) {
      toast.error('Please fill in title and message');
      return;
    }
    toast.success('Push notification sent to 8,432 users!');
    setNotifTitle('');
    setNotifMessage('');
  };

  return (
    <div className="space-y-8">
      
      {/* Tab Navigation */}
      <div className="flex gap-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('banners')}
          className={`pb-4 px-2 font-medium text-sm transition-colors ${activeTab === 'banners' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          App Banners
        </button>
        <button 
          onClick={() => setActiveTab('promos')}
          className={`pb-4 px-2 font-medium text-sm transition-colors ${activeTab === 'promos' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Promo Codes
        </button>
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`pb-4 px-2 font-medium text-sm transition-colors ${activeTab === 'notifications' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Push Notifications
        </button>
      </div>

      {/* Banners Content */}
      {activeTab === 'banners' && (
        <section className="animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Banners</h2>
            <Button size="sm" className="gap-2"><Plus size={16} /> New Banner</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map(banner => (
              <div key={banner.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm group">
                <div className="h-40 relative">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-white/90 backdrop-blur text-xs font-bold text-gray-800">
                    {banner.status}
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">{banner.title}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Promos Content */}
      {activeTab === 'promos' && (
        <section className="animate-in fade-in slide-in-from-bottom-2">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Promo Codes</h2>
            <Button size="sm" variant="outline" className="gap-2"><Plus size={16} /> Create Code</Button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Code</th>
                  <th className="px-6 py-4 font-semibold">Discount</th>
                  <th className="px-6 py-4 font-semibold">Usage</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promos.map(promo => (
                  <tr key={promo.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{promo.code}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">{promo.discount}</td>
                    <td className="px-6 py-4 text-gray-600">{promo.usage} times</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                         promo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                       }`}>
                         {promo.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Notifications Content */}
      {activeTab === 'notifications' && (
        <section className="animate-in fade-in slide-in-from-bottom-2 max-w-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Send Push Notification</h2>
            <p className="text-gray-500 text-sm">Send instant alerts to all users, riders, or partners.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                 <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                   <option>All Users</option>
                   <option>All Riders</option>
                   <option>All Partners</option>
                   <option>Inactive Users (30+ days)</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
                 <input 
                   type="text" 
                   value={notifTitle}
                   onChange={(e) => setNotifTitle(e.target.value)}
                   placeholder="e.g. Lunch Time Deal!" 
                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" 
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
                 <textarea 
                   rows={3} 
                   value={notifMessage}
                   onChange={(e) => setNotifMessage(e.target.value)}
                   placeholder="e.g. Get 50% off all burgers today only..." 
                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" 
                 />
               </div>
               
               <div className="pt-4 flex justify-end">
                 <Button onClick={handleSendNotification} className="flex items-center gap-2">
                   <Send size={16} /> Send Broadcast
                 </Button>
               </div>
             </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4">Recent Broadcasts</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                 <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                   <Bell size={16} />
                 </div>
                 <div>
                   <p className="font-bold text-sm text-gray-900">Free Delivery Weekend</p>
                   <p className="text-xs text-gray-500">Sent to: All Users • 2 days ago</p>
                 </div>
              </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                 <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                   <Megaphone size={16} />
                 </div>
                 <div>
                   <p className="font-bold text-sm text-gray-900">Rider Bonus: Rain Alert</p>
                   <p className="text-xs text-gray-500">Sent to: All Riders • 5 days ago</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default AdminMarketingPage;
