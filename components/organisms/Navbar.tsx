
import React, { useState } from 'react';
import { Bell, MessageSquare, ShoppingBag, LogIn, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDataStore } from '@/store/useDataStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { SearchOverlay } from '@/components/organisms/SearchOverlay';

export const Navbar: React.FC = () => {
  const { getCartCount, user } = useStore();
  const { notifications } = useDataStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartCount();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Calculate unread notifications for current user
  const unreadCount = user ? notifications.filter(n => 
    !n.read && (
      n.targetUserId === user.id || 
      (n.targetRole && n.targetRole === user.role) ||
      (!n.targetUserId && !n.targetRole)
    )
  ).length : 0;

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
    }`;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Links */}
            <div className="flex items-center gap-8">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/feed'); }} className="flex-shrink-0 flex items-center cursor-pointer">
                <span className="font-serif text-2xl font-bold text-brand-500">To-Eat</span>
              </a>
              <div className="hidden md:flex space-x-6">
                <button onClick={() => navigate('/feed')} className={getLinkClass('/feed')}>Feed</button>
                <button onClick={() => navigate('/discover')} className={getLinkClass('/discover')}>Discover</button>
                <button onClick={() => navigate('/offers')} className={getLinkClass('/offers')}>Offers</button>
                <button onClick={() => navigate('/chefs')} className={getLinkClass('/chefs')}>Chefs</button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-400 hover:text-brand-600 transition-colors p-1"
                title="Search"
              >
                <Search size={20} />
              </button>
              
              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {user ? (
                <>
                  <button 
                    onClick={() => navigate('/notifications')}
                    className={`text-gray-400 hover:text-gray-600 relative transition-colors ${location.pathname === '/notifications' ? 'text-brand-500' : ''}`}
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => navigate('/support')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MessageSquare size={20} />
                  </button>
                </>
              ) : null}
              
               <button onClick={() => navigate('/checkout')} className="text-gray-400 hover:text-brand-600 relative transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <button 
                  onClick={() => navigate('/profile')}
                  className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 hover:ring-2 hover:ring-brand-500 transition-all ml-2"
                >
                  <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                </button>
              ) : (
                <Button size="sm" onClick={() => navigate('/login')} className="!px-4 flex items-center gap-2 ml-2">
                  <LogIn size={16} />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};