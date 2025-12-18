
import React, { useState, useMemo } from 'react';
import { useFeed } from './hooks';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { SearchBar } from '@/components/molecules/SearchBar';
import { MealKitCard } from './components/MealKitCard';
import { RestaurantCard } from './components/RestaurantCard';
import { Sidebar } from './components/Sidebar';
import * as Icons from 'lucide-react';
import { CATEGORIES, DIETARY_PREFS } from '@/data/constants';
import { FilterModal, FilterState } from './components/FilterModal';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Skeleton } from '@/components/atoms/Skeleton';

const FeedPage: React.FC = () => {
  const { data, isLoading, error } = useFeed();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('trending');
  const { user } = useStore();
  
  // Filter Modal State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'recommended',
    priceRange: [],
    dietary: [],
    minRating: null
  });

  // Recommendation Logic
  const recommendedItems = useMemo(() => {
    if (!data) return [];
    // If no user, return random 2 items
    if (!user) return data.mealKits.slice(0, 2);
    return data.mealKits.slice(0, 2); 
  }, [data, user]);

  // Filtering Logic
  const filteredData = useMemo(() => {
    if (!data) return { mealKits: [], restaurants: [] };

    const query = searchQuery.toLowerCase();
    
    // Check main category logic
    const matchesCategory = (tags: string[] = [], cuisine: string[] = []) => {
      if (activeCategoryId === 'trending' || activeCategoryId === 'popular' || activeCategoryId === 'near_me') return true;
      const categoryLabel = CATEGORIES.find(c => c.id === activeCategoryId)?.label.toLowerCase();
      if (!categoryLabel) return true;
      return tags.some(t => t.toLowerCase().includes(categoryLabel)) || 
             cuisine.some(c => c.toLowerCase().includes(categoryLabel));
    };

    // Advanced Filtering Logic
    const matchesAdvancedFilters = (priceRangeString: string | undefined, price: number, rating: number, tags: string[] = []) => {
      // Price Range Filter ($ vs numeric price estimation for kits)
      if (filters.priceRange.length > 0) {
        let itemPriceSymbol = '$';
        if (priceRangeString) {
          itemPriceSymbol = priceRangeString;
        } else {
           if (price < 15) itemPriceSymbol = '$';
           else if (price < 25) itemPriceSymbol = '$$';
           else if (price < 40) itemPriceSymbol = '$$$';
           else itemPriceSymbol = '$$$$';
        }
        if (!filters.priceRange.includes(itemPriceSymbol)) return false;
      }

      // Rating Filter
      if (filters.minRating && rating < filters.minRating) return false;

      // Dietary Filter
      if (filters.dietary.length > 0) {
        const hasAllDietary = filters.dietary.every(diet => tags.some(t => t.toLowerCase() === diet.toLowerCase()));
        if (!hasAllDietary) return false;
      }

      return true;
    };

    let mealKits = data.mealKits.filter(kit => {
      const matchesSearch = kit.title.toLowerCase().includes(query) || kit.description.toLowerCase().includes(query);
      const matchesCat = matchesCategory(kit.tags, []);
      const matchesAdv = matchesAdvancedFilters(undefined, kit.price, 4.8 /* Mock rating for kits */, kit.tags); 
      return matchesSearch && matchesCat && matchesAdv;
    });

    let restaurants = data.restaurants.filter(rest => {
      const matchesSearch = rest.name.toLowerCase().includes(query) || rest.cuisine.some(c => c.toLowerCase().includes(query));
      const matchesCat = matchesCategory([], rest.cuisine);
      const matchesAdv = matchesAdvancedFilters(rest.priceRange, 0, rest.rating, rest.cuisine);
      return matchesSearch && matchesCat && matchesAdv;
    });

    // Sorting
    if (filters.sortBy === 'price: low to high') {
      mealKits.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'rating') {
       restaurants.sort((a, b) => b.rating - a.rating);
    }

    return { mealKits, restaurants };
  }, [data, searchQuery, activeCategoryId, filters]);

  
  if (error) return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-red-500 gap-4">
      <p className="font-bold">Error loading data</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-brand-500 text-white rounded-full text-sm hover:bg-brand-600 transition-colors">
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Filters */}
        <div className="mb-12 text-center relative z-20">
          <div className="mb-8 relative max-w-4xl mx-auto">
             <SearchBar value={searchQuery} onChange={setSearchQuery} />
             <div className="absolute top-1 right-1">
               <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors h-[40px] mt-[1px]"
               >
                  <SlidersHorizontal size={16} />
                  Filters
                  {(filters.dietary.length > 0 || filters.priceRange.length > 0 || filters.minRating) && (
                    <span className="bg-white text-brand-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">!</span>
                  )}
               </button>
             </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => {
              const IconComponent = (Icons as any)[cat.iconName] || Icons.Star;
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <IconComponent size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed Content */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* Loading State - Skeletons */}
            {isLoading && (
              <>
                <section>
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 h-[320px]">
                        <Skeleton className="h-48 w-full rounded-none" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-6 w-3/4" variant="text" />
                          <Skeleton className="h-4 w-1/2" variant="text" />
                          <Skeleton className="h-4 w-full" variant="text" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <Skeleton className="h-8 w-64 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 h-[300px]">
                        <Skeleton className="h-48 w-full rounded-none" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-6 w-3/4" variant="text" />
                          <Skeleton className="h-4 w-1/2" variant="text" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {!isLoading && data && (
              <>
                {/* Recommended Section (Only if user logged in and searching is empty) */}
                {user && searchQuery === '' && activeCategoryId === 'trending' && recommendedItems.length > 0 && (
                  <section className="bg-gradient-to-r from-brand-50 to-orange-50 p-6 rounded-2xl border border-brand-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={18} className="text-brand-500" />
                      <h2 className="font-serif text-xl font-bold text-gray-900">Picked for You, {user.name.split(' ')[0]}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendedItems.map(kit => (
                        <MealKitCard key={kit.id} item={kit} />
                      ))}
                    </div>
                  </section>
                )}
                
                {/* Meal Kits Section */}
                {filteredData.mealKits.length > 0 && (
                  <section>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-gray-900">Cook at Home Meal Kits</h2>
                        <p className="text-gray-500 text-sm mt-1">Fresh ingredients delivered with easy-to-follow recipes</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredData.mealKits.map(kit => (
                        <MealKitCard key={kit.id} item={kit} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Restaurants Section */}
                {filteredData.restaurants.length > 0 && (
                  <section>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-gray-900">Popular Restaurants Near You</h2>
                        <p className="text-gray-500 text-sm mt-1">Order directly from top rated local spots</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredData.restaurants.map(rest => (
                        <RestaurantCard key={rest.id} restaurant={rest} />
                      ))}
                    </div>
                  </section>
                )}

                {/* No Results State */}
                {filteredData.mealKits.length === 0 && filteredData.restaurants.length === 0 && (
                  <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 mb-2">No results found for your filters.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategoryId('trending'); setFilters({sortBy: 'recommended', priceRange: [], dietary: [], minRating: null}); }}
                      className="text-brand-600 font-medium hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
             <div className="sticky top-24">
                {isLoading || !data ? (
                  <div className="space-y-6">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                  </div>
                ) : (
                  <Sidebar trending={data.trending} chefs={data.chefs} />
                )}
             </div>
          </div>

        </div>
      </main>

      <Footer />
      
      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={setFilters}
        initialFilters={filters}
      />
    </div>
  );
};

export default FeedPage;
