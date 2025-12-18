
import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Bell, ShoppingBag, Tag, Info, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { useStore } from '@/store/useStore';
import { NotificationType } from '@/types';
import { EmptyState } from '@/components/molecules/EmptyState';

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationsAsRead } = useDataStore();
  const { user } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
           <EmptyState 
             icon={Bell} 
             title="Login Required" 
             description="Please login to view your notifications." 
           />
        </div>
      </div>
    );
  }

  const userNotifications = notifications.filter(n => 
    n.targetUserId === user.id || 
    (n.targetRole && n.targetRole === user.role) ||
    (!n.targetUserId && !n.targetRole) // System broadcast
  );

  const getIcon = (type: NotificationType) => {
    switch(type) {
      case 'order_update': return <ShoppingBag size={18} className="text-blue-500" />;
      case 'new_order': return <ShoppingBag size={18} className="text-green-500" />;
      case 'promo': return <Tag size={18} className="text-purple-500" />;
      case 'system': return <Info size={18} className="text-gray-500" />;
      case 'dispute_update': return <AlertCircle size={18} className="text-red-500" />;
      default: return <Bell size={18} className="text-gray-500" />;
    }
  };

  const getBg = (type: NotificationType) => {
    switch(type) {
      case 'order_update': return 'bg-blue-50';
      case 'new_order': return 'bg-green-50';
      case 'promo': return 'bg-purple-50';
      case 'dispute_update': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {userNotifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-brand-600 hover:text-brand-700"
              onClick={() => markNotificationsAsRead(user.id)}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {userNotifications.length === 0 ? (
            <div className="p-6">
              <EmptyState 
                icon={Bell} 
                title="No notifications yet" 
                description="We'll notify you when you have updates on your orders or new offers."
                className="border-none py-12"
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {userNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-5 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBg(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm font-bold text-gray-900 ${!notif.read && 'text-brand-900'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-gray-400">{notif.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
