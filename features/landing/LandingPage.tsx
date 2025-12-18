
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, ShoppingBag, Bike, Shield, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white">
              <ChefHat size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-brand-900">To-Eat</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Delicious Food,<br />Delivered Your Way.
          </h1>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            The all-in-one platform for food lovers, chefs, riders, and restaurants.
            Experience the future of food delivery today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg" onClick={() => navigate('/feed')}>
              Order Food Now
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => navigate('/partner/dashboard')}>
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Portals Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Eater Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/feed')}>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Eaters</h3>
            <p className="text-gray-500 mb-6 flex-1">
              Browse top-rated restaurants and chef-curated meal kits.
            </p>
            <span className="text-brand-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Start Ordering <ArrowRight size={18} />
            </span>
          </div>

          {/* Partner Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/partner/dashboard')}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <ChefHat size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Partners</h3>
            <p className="text-gray-500 mb-6 flex-1">
              Manage your restaurant, menu, and orders in one place.
            </p>
            <span className="text-brand-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Partner Dashboard <ArrowRight size={18} />
            </span>
          </div>

          {/* Rider Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/rider/dashboard')}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <Bike size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Riders</h3>
            <p className="text-gray-500 mb-6 flex-1">
              Deliver happiness and earn money on your own schedule.
            </p>
            <span className="text-brand-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Rider App <ArrowRight size={18} />
            </span>
          </div>

          {/* Admin Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Panel</h3>
            <p className="text-gray-500 mb-6 flex-1">
              Monitor system health, manage users, and oversee operations.
            </p>
            <span className="text-brand-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              System Control <ArrowRight size={18} />
            </span>
          </div>

        </div>
      </section>

      {/* Features/Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-bold text-brand-500 mb-2">10k+</div>
              <p className="text-gray-600 font-medium">Happy Eaters</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-500 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Restaurant Partners</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-500 mb-2">30 mins</div>
              <p className="text-gray-600 font-medium">Average Delivery Time</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">Created with &hearts; by <code>0xQ4B4S</code></p>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
