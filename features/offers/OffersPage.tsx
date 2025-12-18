
import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { MealKitCard } from '@/features/feed/components/MealKitCard';
import { db } from '@/data/db';
import { Tag, Copy, Clock } from 'lucide-react';
import { toast } from 'sonner';

const OffersPage: React.FC = () => {
  const deals = db.mealKits.slice(0, 3); // Mock deals
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Special Offers & Deals</h1>

        {/* Featured Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800" 
              alt="Summer Sale" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">Limited Time</span>
              <h3 className="text-3xl font-bold mb-2">Summer Cravings</h3>
              <p className="text-gray-200 mb-4">Get 50% off refreshing summer salads and drinks.</p>
              <button 
                onClick={() => handleCopy('SUMMER50')}
                className="bg-white text-brand-900 font-bold px-6 py-2 rounded-lg text-sm w-fit flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <Tag size={16} /> Code: SUMMER50 <Copy size={14} className="opacity-50" />
              </button>
            </div>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-brand-900">
             <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
               <h3 className="text-3xl font-bold mb-2">Free Delivery</h3>
               <p className="text-brand-200 mb-6">On all orders over $30 this weekend.</p>
               <div className="flex items-center gap-3">
                 <div className="border-2 border-dashed border-brand-500 bg-brand-800/50 px-4 py-2 rounded-lg font-mono text-xl tracking-widest text-brand-400">
                   FREESHIP
                 </div>
                 <button 
                    onClick={() => handleCopy('FREESHIP')}
                    className="p-3 bg-brand-600 rounded-lg hover:bg-brand-500 transition-colors text-white"
                 >
                   <Copy size={20} />
                 </button>
               </div>
               <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                 <Clock size={12} /> Ends Sunday at midnight
               </p>
             </div>
             <img 
              src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=400" 
              alt="Delivery"
              className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20"
             />
          </div>
        </div>

        {/* Discounted Items Grid */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Tag size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Hot Deals</h2>
              <p className="text-gray-500 text-sm">Best prices on top rated meals.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map(item => (
              <div key={item.id} className="relative">
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
                  20% OFF
                </div>
                <MealKitCard item={{...item, price: Number((item.price * 0.8).toFixed(2))}} />
                <div className="mt-2 flex items-center gap-2 px-1">
                  <span className="text-sm text-gray-400 line-through">${item.price}</span>
                  <span className="text-sm font-bold text-red-600">Save ${(item.price * 0.2).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OffersPage;
