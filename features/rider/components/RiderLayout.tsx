
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, List, User, LogOut } from 'lucide-react';

const RiderLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/rider/dashboard', label: 'Home', icon: Home },
    { path: '/rider/earnings', label: 'Earnings', icon: List },
    { path: '/rider/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-brand-900 text-white p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <h1 className="font-serif font-bold text-xl">To-Eat Rider</h1>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Online</span>
          <button onClick={() => navigate('/feed')} className="text-gray-400 ml-2">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-30 pb-safe">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              location.pathname === item.path ? 'text-brand-600' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} fill={location.pathname === item.path ? "currentColor" : "none"} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default RiderLayout;
