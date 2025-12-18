
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Settings, LogOut, DollarSign, Bell, Star, Menu, X, Monitor } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDataStore } from '@/store/useDataStore';

const PartnerLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useStore(state => state.user);
  const restaurants = useDataStore(state => state.restaurants);

  // Link Partner to Restaurant
  const restaurant = restaurants.find(r => r.id === user?.restaurantId) || restaurants[0];

  const navItems = [
    { path: '/partner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/partner/orders', label: 'Orders List', icon: ShoppingBag },
    { path: '/partner/kds', label: 'Kitchen Display', icon: Monitor },
    { path: '/partner/menu', label: 'Menu Management', icon: UtensilsCrossed },
    { path: '/partner/reviews', label: 'Reviews', icon: Star },
    { path: '/partner/finance', label: 'Financials', icon: DollarSign },
    { path: '/partner/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-brand-900 text-white fixed h-full hidden md:flex flex-col z-30">
        <div className="p-6 border-b border-brand-800">
          <h1 className="font-serif text-2xl font-bold text-white mb-1">To-Eat</h1>
          <p className="text-xs text-brand-200 uppercase tracking-widest font-semibold">Partner Portal</p>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-lg object-cover border border-brand-700" />
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate text-white">{restaurant.name}</h3>
              <p className="text-xs text-brand-300">Online</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' : 'text-brand-100 hover:bg-brand-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-brand-800">
          <button 
            onClick={() => navigate('/feed')}
            className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors text-sm w-full"
          >
            <LogOut size={18} />
            Switch to User App
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-brand-900 text-white z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-brand-800 flex justify-between items-center">
           <div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">To-Eat</h1>
            <p className="text-xs text-brand-200 uppercase tracking-widest font-semibold">Partner Portal</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
           <div className="flex items-center gap-3 mb-8">
            <img src={restaurant.image} alt={restaurant.name} className="w-10 h-10 rounded-lg object-cover border border-brand-700" />
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate text-white">{restaurant.name}</h3>
              <p className="text-xs text-brand-300">Online</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' : 'text-brand-100 hover:bg-brand-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
         <div className="absolute bottom-0 left-0 w-full p-6 border-t border-brand-800 bg-brand-900">
          <button 
            onClick={() => navigate('/feed')}
            className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors text-sm w-full"
          >
            <LogOut size={18} />
            Switch to User App
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-gray-800 text-lg truncate">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
             <button className="relative text-gray-500 hover:text-brand-600 transition-colors">
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs shrink-0">
               {user?.name?.slice(0, 2).toUpperCase() || 'PT'}
             </div>
          </div>
        </header>
        <main className="p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;
