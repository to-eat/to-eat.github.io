
import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, CreditCard, History, Settings, LogOut, 
  Wallet, Package, Clock, CheckCircle2, XCircle, Bike, Shield, LifeBuoy, X, AlertCircle, Save, Bell, Lock, Plus, Trash2
} from 'lucide-react';
import { useDataStore } from '@/store/useDataStore'; // Use global store for orders
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DisputeModal } from '@/components/molecules/DisputeModal';
import { Order } from '@/types';

type Tab = 'orders' | 'addresses' | 'settings';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { user, logout, addToCart, addAddress, updateCurrentUser } = useStore();
  const { orders, updateUser } = useDataStore(); // Fetch live orders
  const navigate = useNavigate();

  // Dispute Modal State
  const [selectedOrderForDispute, setSelectedOrderForDispute] = useState<Order | null>(null);

  // Address Form State
  const [newAddressLabel, setNewAddressLabel] = useState('');
  const [newAddressValue, setNewAddressValue] = useState('');

  // Settings State
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [notifPreferences, setNotifPreferences] = useState({ orders: true, promos: true, security: true });
  const [savedCards, setSavedCards] = useState([
    { id: 1, last4: '4242', brand: 'Visa', exp: '12/25' },
    { id: 2, last4: '8833', brand: 'Mastercard', exp: '09/24' }
  ]);

  // Protect route & init form
  useEffect(() => {
    if (!user) {
      toast.error('Please login to view profile');
      navigate('/login');
    } else {
      setProfileForm({ name: user.name, email: user.email, phone: user.phone });
    }
  }, [user, navigate]);

  if (!user) return null;

  // Filter orders for this user
  const userOrders = orders.filter(o => o.userId === user.id);

  const handleReorder = (items: any[]) => {
    items.forEach(item => addToCart(item));
    toast.success('Items added to cart');
    navigate('/checkout');
  };

  const handleLogout = () => {
    logout();
    navigate('/feed');
  };
  
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddressLabel && newAddressValue) {
      addAddress({ label: newAddressLabel, fullAddress: newAddressValue });
      setShowAddressModal(false);
      setNewAddressLabel('');
      setNewAddressValue('');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser(profileForm); // Update session
    updateUser(user.id, profileForm); // Update DB
    toast.success('Profile updated successfully');
  };

  const handlePasswordChange = () => {
    toast.success('Password reset link sent to your email.');
  };

  const handleAddCard = () => {
    const newCard = { id: Date.now(), last4: Math.floor(1000 + Math.random() * 9000).toString(), brand: 'Visa', exp: '01/28' };
    setSavedCards([...savedCards, newCard]);
    toast.success('New card added');
  };

  const handleRemoveCard = (id: number) => {
    setSavedCards(savedCards.filter(c => c.id !== id));
    toast.success('Card removed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Preparing': return 'text-blue-600 bg-blue-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="w-24 h-24 rounded-full p-1 bg-white border-2 border-brand-100 z-10">
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-500 text-sm mt-1">
              <span>{user.email}</span>
              <span className="hidden md:inline">•</span>
              <span>{user.phone}</span>
              <span className="hidden md:inline">•</span>
              <span>Member since {user.memberSince}</span>
            </div>
          </div>
          <div className="flex gap-3 z-10">
            <Button variant="outline" size="sm" onClick={() => navigate('/wallet')} className="gap-2 border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100">
              <Wallet size={16} />
              Wallet: ${user.walletBalance.toFixed(2)}
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveTab('settings')}>
              <Settings size={16} />
              Edit Profile
            </Button>
          </div>
          
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col p-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'orders' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <History size={18} />
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'addresses' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} />
                  Saved Addresses
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'settings' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={18} />
                  Settings & Preferences
                </button>
                
                <button
                  onClick={() => navigate('/support')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LifeBuoy size={18} />
                  Help & Support
                </button>
                
                <div className="h-px bg-gray-100 my-2" />
                <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Demo Portals</p>
                
                <button 
                  onClick={() => navigate('/partner/dashboard')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Package size={18} />
                  Partner Portal
                </button>
                <button 
                  onClick={() => navigate('/rider/dashboard')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Bike size={18} />
                  Rider App
                </button>
                <button 
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Shield size={18} />
                  Admin Panel
                </button>

                <div className="h-px bg-gray-100 my-2" />

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Past Orders</h2>
                {userOrders.length === 0 && (
                  <p className="text-gray-500">No orders found.</p>
                )}
                {userOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 cursor-pointer hover:text-brand-600" onClick={() => navigate(`/tracking/${order.id}`)}>
                            Order #{order.id.split('-')[1]}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {order.status === 'Delivered' && <CheckCircle2 size={12} />}
                            {order.status === 'Preparing' && <Clock size={12} />}
                            {order.status === 'Cancelled' && <XCircle size={12} />}
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{order.date}</p>
                        {order.isDisputed && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded bg-red-100 text-red-700 text-xs font-bold">
                            <AlertCircle size={10} /> Dispute: {order.disputeStatus}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-gray-900 text-lg">${order.total.toFixed(2)}</p>
                         <p className="text-xs text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div className="flex-1">
                             <p className="text-sm font-medium text-gray-900">{item.title}</p>
                             <p className="text-xs text-gray-500">{item.restaurantName} • Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm text-gray-600">${item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 border-t border-gray-100 pt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleReorder(order.items)}
                        className="flex-1 md:flex-none"
                      >
                        Reorder All
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => navigate(`/tracking/${order.id}`)}>
                        Track Order
                      </Button>
                      
                      {/* Report Issue Button */}
                      {(!order.isDisputed && order.status !== 'Cancelled') && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-auto text-gray-400 hover:text-red-600 hidden md:flex"
                          onClick={() => setSelectedOrderForDispute(order)}
                        >
                          Report Issue
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                  <Button size="sm" variant="outline" onClick={() => setShowAddressModal(true)}>Add New</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map(addr => (
                    <div key={addr.id} className="bg-white rounded-xl border border-gray-200 p-6 relative group hover:border-brand-300 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                         {addr.label === 'Home' ? <User size={18} className="text-brand-500" /> : <Package size={18} className="text-brand-500" />}
                         <h3 className="font-bold text-gray-900">{addr.label}</h3>
                         {/* Mock Default Check */}
                         {addr.label === 'Home' && <Badge className="ml-auto bg-gray-100 text-gray-500">Default</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {addr.fullAddress}
                      </p>
                      <div className="flex gap-2">
                        <button className="text-xs font-medium text-brand-600 hover:text-brand-700">Edit</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-xs font-medium text-red-500 hover:text-red-600">Delete</button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Placeholder */}
                  <div 
                    onClick={() => setShowAddressModal(true)}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-brand-300 hover:text-brand-500 hover:bg-brand-50/50 transition-all cursor-pointer min-h-[160px]"
                  >
                    <MapPin size={32} className="mb-2" />
                    <span className="font-medium text-sm">Add New Address</span>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                
                {/* Personal Info */}
                <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <User className="text-brand-500" size={20} />
                    <h3 className="font-bold text-gray-900">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={profileForm.email}
                        onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={profileForm.phone}
                        onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="gap-2">
                      <Save size={16} /> Save Changes
                    </Button>
                  </div>
                </form>

                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <Bell className="text-brand-500" size={20} />
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Order Updates</p>
                        <p className="text-xs text-gray-500">Get notified about your order status.</p>
                      </div>
                      <input type="checkbox" checked={notifPreferences.orders} onChange={e => setNotifPreferences({...notifPreferences, orders: e.target.checked})} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Promotions & Offers</p>
                        <p className="text-xs text-gray-500">Receive emails about new sales.</p>
                      </div>
                      <input type="checkbox" checked={notifPreferences.promos} onChange={e => setNotifPreferences({...notifPreferences, promos: e.target.checked})} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Security Alerts</p>
                        <p className="text-xs text-gray-500">Notify me of login attempts.</p>
                      </div>
                      <input type="checkbox" checked={notifPreferences.security} onChange={e => setNotifPreferences({...notifPreferences, security: e.target.checked})} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <CreditCard className="text-brand-500" size={20} />
                    <h3 className="font-bold text-gray-900">Payment Methods</h3>
                  </div>
                  <div className="space-y-3 mb-6">
                    {savedCards.map(card => (
                      <div key={card.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <CreditCard size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{card.brand} •••• {card.last4}</p>
                            <p className="text-xs text-gray-500">Expires {card.exp}</p>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveCard(card.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2 border-dashed border-gray-300 text-gray-500 hover:text-brand-600 hover:border-brand-500 hover:bg-brand-50" onClick={handleAddCard}>
                    <Plus size={16} /> Add Payment Method
                  </Button>
                </div>

                {/* Security */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <Lock className="text-brand-500" size={20} />
                    <h3 className="font-bold text-gray-900">Security</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Password</p>
                      <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handlePasswordChange}>Change Password</Button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Add Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-gray-900">Add New Address</h3>
                 <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                 </button>
              </div>
              <form onSubmit={handleAddAddress}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g. Home, Office)</label>
                    <input 
                      required
                      type="text" 
                      value={newAddressLabel}
                      onChange={(e) => setNewAddressLabel(e.target.value)}
                      placeholder="Home"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <textarea 
                      required
                      value={newAddressValue}
                      onChange={(e) => setNewAddressValue(e.target.value)}
                      placeholder="123 Street, City, Country"
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowAddressModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Save Address</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
        {selectedOrderForDispute && (
          <DisputeModal 
            order={selectedOrderForDispute}
            isOpen={!!selectedOrderForDispute}
            onClose={() => setSelectedOrderForDispute(null)}
          />
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
