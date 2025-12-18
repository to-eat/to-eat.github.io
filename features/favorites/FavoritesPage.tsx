
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Store } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDataStore } from '@/store/useDataStore';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { MealKitCard } from '@/features/feed/components/MealKitCard';
import { RestaurantCard } from '@/features/feed/components/RestaurantCard';
import { Button } from '@/components/atoms/Button';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const favorites = useStore((state) => state.favorites);
  const { mealKits, restaurants } = useDataStore();
  
  const favoriteMealKits = mealKits.filter(kit => favorites.includes(kit.id));
  const favoriteRestaurants = restaurants.filter(rest => favorites.includes(rest.id));
  
  const isEmpty = favoriteMealKits.length === 0 && favoriteRestaurants.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="mb-10 text-center md:text-left">
           <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Favorites</h1>
           <p className="text-gray-500 text-lg">The dishes and spots you love most.</p>
        </div>

        {isEmpty ? (
           <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
               <Heart size={36} fill="currentColor" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h2>
             <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
               Start exploring our feed and click the heart icon to save the items that make you hungry.
             </p>
             <Button size="lg" onClick={() => navigate('/feed')}>
               Start Exploring
             </Button>
           </div>
        ) : (
          <div className="space-y-16">
            {favoriteMealKits.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
                    <ShoppingBag size={24} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Saved Meal Kits
                  </h2>
                  <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {favoriteMealKits.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteMealKits.map(kit => (
                    <MealKitCard key={kit.id} item={kit} />
                  ))}
                </div>
              </section>
            )}

            {favoriteRestaurants.length > 0 && (
              <section>
                 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Store size={24} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Saved Restaurants
                  </h2>
                  <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {favoriteRestaurants.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteRestaurants.map(rest => (
                    <RestaurantCard key={rest.id} restaurant={rest} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
