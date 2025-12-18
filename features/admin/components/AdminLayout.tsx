
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Utensils, Shield, LogOut, Settings, ShoppingBag, Megaphone, FileText, Menu, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/orders', label: 'Global Orders', icon: ShoppingBag },
    { path: '/admin/restaurants', label: 'Restaurants', icon: Utensils },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/marketing', label: 'Marketing', icon: Megaphone },
    { path: '/admin/transactions', label: 'Transactions', icon: FileText },
    { path: '/admin/system', label: 'System Control', icon: Shield },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full hidden md:flex flex-col z-30">
        <div className="p-6 border-b border-gray-800">
          <h1 className="font-serif text-2xl font-bold text-white mb-1">To-Eat</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Admin Panel</p>
        </div>

        <div className="p-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-800">
          <button 
            onClick={() => navigate('/feed')}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm w-full"
          >
            <LogOut size={18} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">To-Eat</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Admin Panel</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-800 bg-gray-900">
          <button 
            onClick={() => handleNavigate('/feed')}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm w-full"
          >
            <LogOut size={18} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-gray-800 text-lg truncate">Platform Administration</h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500 hidden sm:block">Administrator</span>
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
               AD
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

export default AdminLayout;
