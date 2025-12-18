
import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { useDataStore } from '@/store/useDataStore';
import { CATEGORIES } from '@/data/constants';
import { MealKitCard } from '@/features/feed/components/MealKitCard';
import { RestaurantCard } from '@/features/feed/components/RestaurantCard';
import { ArrowRight, Sparkles, Clock, TrendingUp, Utensils } from 'lucide-react';
import * as Icons from 'lucide-react';

const DiscoverPage: React.FC = () => {
  const { mealKits, restaurants } = useDataStore();

  // Filter data for curated collections
  const quickEats = mealKits.filter(kit => kit.prepTime <= 30);
  const topRatedRest = restaurants.filter(r => r.rating >= 4.8);
  const healthyOptions = mealKits.filter(kit => kit.nutrition && parseInt(kit.nutrition.calories.toString()) < 500);

  // Background gradients for categories
  const gradients = [
    'from-orange-100 to-red-100 text-orange-600',
    'from-blue-100 to-indigo-100 text-blue-600',
    'from-green-100 to-emerald-100 text-green-600',
    'from-purple-100 to-pink-100 text-purple-600',
    'from-yellow-100 to-orange-100 text-yellow-600',
    'from-teal-100 to-cyan-100 text-teal-600',
    'from-rose-100 to-red-100 text-rose-600',
    'from-lime-100 to-green-100 text-lime-600',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
            alt="Discover Food" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
            <div className="max-w-2xl px-8 md:px-12 text-white">
              <div className="flex items-center gap-2 mb-4 text-brand-400 font-bold uppercase tracking-wider text-sm">
                <Sparkles size={16} />
                <span>Curated Collections</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover the World's<br/>Finest Flavors
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                Explore hand-picked recipes from top chefs and exclusive menus from the best local restaurants.
              </p>
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-brand-500/30">
                Start Exploring
              </button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Explore by Cuisine</h2>
            <button className="text-brand-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((cat, idx) => {
              const Icon = (Icons as any)[cat.iconName] || Icons.Utensils;
              const gradient = gradients[idx % gradients.length];
              return (
                <div 
                  key={cat.id} 
                  className={`bg-gradient-to-br ${gradient} p-4 rounded-2xl flex flex-col items-center justify-center gap-3 aspect-square cursor-pointer hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md group`}
                >
                  <div className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={20} className="opacity-90" />
                  </div>
                  <span className="font-bold text-sm text-gray-900">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick & Easy Collection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Clock size={20} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Under 30 Minutes</h2>
              <p className="text-gray-500 text-sm">Delicious meals ready in a flash</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickEats.map(kit => (
              <MealKitCard key={kit.id} item={kit} />
            ))}
          </div>
        </section>

        {/* Featured Restaurants Collection */}
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Top Rated Spots</h2>
              <p className="text-gray-500 text-sm">Locals love these restaurants</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRatedRest.map(rest => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </section>

        {/* Healthy & Fresh Collection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Utensils size={20} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">Healthy & Fresh</h2>
              <p className="text-gray-500 text-sm">Nutritious choices for a balanced lifestyle</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthyOptions.map(kit => (
              <MealKitCard key={kit.id} item={kit} />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="relative rounded-2xl overflow-hidden bg-brand-900 text-white p-12 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10 max-w-xl">
             <h2 className="font-serif text-3xl font-bold mb-4">Become a Pro Chef at Home</h2>
             <p className="text-brand-100 mb-6">Join our masterclass subscription to get exclusive video tutorials, secret recipes, and monthly ingredient boxes from world-renowned chefs.</p>
             <button className="bg-white text-brand-900 px-6 py-3 rounded-lg font-bold hover:bg-brand-50 transition-colors">
               Get Started
             </button>
           </div>
           <div className="relative z-10 w-full md:w-1/3">
             <img 
               src="https://picsum.photos/id/805/800/600" 
               alt="Chef Cooking" 
               className="rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
             />
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default DiscoverPage;
