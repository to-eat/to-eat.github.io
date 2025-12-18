
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Plus, Search } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { useStore } from '@/store/useStore';
import { Navbar } from '@/components/organisms/Navbar';
import { MenuItem } from '@/types';
import { ReviewsSection } from '@/features/reviews/ReviewsSection';
import { ProductModal } from '@/components/molecules/ProductModal';
import { Button } from '@/components/atoms/Button';

const RestaurantPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  
  // Use Global Store
  const { restaurants, reviews } = useDataStore();
  
  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantReviews = reviews.filter(r => r.targetId === id);
  
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!restaurant) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Restaurant not found</p>
        <Button onClick={() => navigate('/feed')}>Back to Feed</Button>
      </div>
    );
  }

  // Extract categories from menu
  const categories = ['All', ...Array.from(new Set(restaurant.menu?.map(item => item.category) || []))];

  const filteredMenu = activeCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu?.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem, quantity: number, options: string[], notes: string) => {
    addToCart({
      id: item.id,
      title: item.name,
      price: item.price, 
      image: item.image,
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
      quantity: quantity,
      selectedOptions: options,
      instructions: notes
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <img 
          src={restaurant.banner || restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <button 
            onClick={() => navigate('/feed')}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
             <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 shadow-sm">{restaurant.name}</h1>
             <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
               <span className="bg-green-500 px-2 py-0.5 rounded text-white flex items-center gap-1">
                 <Star size={12} fill="currentColor" /> {restaurant.rating}
               </span>
               <span className="flex items-center gap-1 opacity-90">
                 <MapPin size={14} /> {restaurant.distance} mi
               </span>
               <span className="flex items-center gap-1 opacity-90">
                 <Clock size={14} /> {restaurant.deliveryTime}
               </span>
               <span className="opacity-75">{restaurant.cuisine.join(' • ')}</span>
               <span className="opacity-75">{restaurant.priceRange}</span>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs Control */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'menu' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews ({restaurantReviews.length})
          </button>
        </div>

        {activeTab === 'menu' ? (
          <>
            {/* Menu Controls */}
            <div className="sticky top-20 z-30 bg-gray-50 pt-2 pb-6">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-bold text-gray-900">Full Menu</h2>
                 <div className="relative hidden md:block">
                   <input 
                     type="text" 
                     placeholder="Search menu..." 
                     className="pl-9 pr-4 py-2 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                   />
                   <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                 </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat 
                        ? 'bg-brand-900 text-white shadow-md' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
              {filteredMenu?.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 group hover:border-brand-200 transition-colors">
                  <div className="flex-1">
                     <div className="flex items-start justify-between mb-1">
                       <h3 className="font-bold text-gray-900">{item.name}</h3>
                       {item.popular && (
                         <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-wide">Popular</span>
                       )}
                     </div>
                     <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">{item.description}</p>
                     <div className="flex items-center justify-between mt-2">
                       <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                       <button 
                        onClick={() => setSelectedItem(item)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-brand-600 hover:bg-brand-500 hover:text-white transition-all"
                       >
                         <Plus size={18} />
                       </button>
                     </div>
                  </div>
                  <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
              {filteredMenu?.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-400">
                  No menu items found in this category.
                </div>
              )}
            </div>
          </>
        ) : (
          <ReviewsSection reviews={restaurantReviews} targetName={restaurant.name} />
        )}

      </main>

      {/* Product Customization Modal */}
      {selectedItem && (
        <ProductModal 
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default RestaurantPage;
